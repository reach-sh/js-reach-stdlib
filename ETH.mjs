import Timeout from 'await-timeout';
import ethers from 'ethers';
import http from 'http';
import url from 'url';
import waitPort from 'wait-port';
import { window, process } from './shim.mjs';
import { getConnectorMode } from './ConnectorMode.mjs';
import { add, assert, bigNumberify, debug, ge, eq, getDEBUG, isBigNumber, digest, lt } from './shared.mjs';
export * from './shared.mjs';

function isNone(m) {
  return m.length === 0;
}

function isSome(m) {
  return !isNone(m);
}
const Some = (m) => [m];
const None = [];
void(isSome);
const connectorMode = getConnectorMode();
// Certain functions either behave differently,
// or are only available on an "isolated" network.
// Note: ETH-test-browser-window is NOT considered isolated.
const isIsolatedNetwork = connectorMode.startsWith('ETH-test-dockerized') ||
  connectorMode.startsWith('ETH-test-embedded');
const networkDesc = connectorMode == 'ETH-test-embedded-ganache' ? {
  type: 'embedded-ganache',
} : connectorMode == 'ETH-test-dockerized-geth' ? {
  type: 'uri',
  uri: process.env.ETH_NODE_URI || 'http://localhost:8545',
  network: process.env.ETH_NODE_NETWORK || 'unspecified',
} : connectorMode == 'ETH-test-browser-window' ? {
  type: 'window',
} : {
  type: 'skip',
};
const protocolPort = {
  'https:': 443,
  'http:': 80,
};
/**
 * @description Only perform side effects from thunk on the first call.
 */
function memoizeThunk(thunk) {
  let called = false;
  let res = null;
  return () => {
    if (called === false) {
      res = thunk();
      called = true;
    }
    return res;
  };
}
const getPortConnection = memoizeThunk(async () => {
  debug('getPortConnection');
  if (networkDesc.type != 'uri') {
    return;
  }
  const { hostname, port, protocol } = url.parse(networkDesc.uri);
  if (!(protocol === 'http:' || protocol === 'https:')) {
    throw Error(`Unsupported protocol ${protocol}`);
  }
  const args = {
    host: hostname || undefined,
    port: (port && parseInt(port, 10)) || protocolPort[protocol],
    output: 'silent',
    timeout: 1000 * 60 * 1,
  };
  debug('waitPort');
  if (getDEBUG()) {
    console.log(args);
  }
  await waitPort(args);
  debug('waitPort complete');
});
// XXX: doesn't even retry, just returns the first attempt
const doHealthcheck = async () => {
  debug('doHealthcheck');
  if (networkDesc.type != 'uri') {
    return;
  }
  const uriObj = url.parse(networkDesc.uri);
  // XXX the code below only supports http
  if (uriObj.protocol !== 'http:') {
    return;
  }
  await new Promise((resolve, reject) => {
    const data = JSON.stringify({
      jsonrpc: '2.0',
      method: 'web3_clientVersion',
      params: [],
      id: 67,
    });
    debug('Sending health check request...');
    const opts = {
      ...uriObj,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };
    const req = http.request(opts, (res) => {
      debug(`statusCode: ${res.statusCode}`);
      res.on('data', (d) => {
        debug('rpc health check succeeded');
        if (getDEBUG()) {
          process.stdout.write(d);
        }
        resolve({ res, d });
      });
    });
    req.on('error', (e) => {
      console.log('rpc health check failed');
      console.log(e);
      reject(e);
    });
    req.write(data);
    debug('attached all the handlers...');
    req.end();
    debug('req.end...');
  });
};
const getDevnet = memoizeThunk(async () => {
  await getPortConnection();
  return await doHealthcheck();
});
const getProvider = memoizeThunk(async () => {
  if (networkDesc.type == 'uri') {
    await getDevnet();
    const provider = new ethers.providers.JsonRpcProvider(networkDesc.uri);
    provider.pollingInterval = 500; // ms
    return provider;
  } else if (networkDesc.type == 'embedded-ganache') {
    const { default: ganache } = await import('ganache-core');
    const default_balance_ether = 999999999;
    const ganachep = ganache.provider({ default_balance_ether });
    // @ts-ignore
    return new ethers.providers.Web3Provider(ganachep);
  } else if (networkDesc.type == 'window') {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // The proper way to ask MetaMask to enable itself is eth_requestAccounts
      // https://eips.ethereum.org/EIPS/eip-1102
      await provider.send('eth_requestAccounts', []);
      return provider;
    } else {
      throw Error(`window.ethereum is not defined`);
    }
  } else {
    // This lib was imported, but not for its net connection.
    throw Error(`Using stdlib/ETH is incompatible with REACH_CONNECTOR_MODE=${connectorMode}`);
  }
});
// XXX expose setProvider
const ethersBlockOnceP = async () => {
  const provider = await getProvider();
  return new Promise((resolve) => provider.once('block', (n) => resolve(n)));
};
/** @description convenience function for drilling down to the actual address */
const getAddr = async (acc) => {
  if (!acc.networkAccount)
    throw Error(`Expected acc.networkAccount`);
  // TODO better type design here
  // @ts-ignore
  if (acc.networkAccount.address) {
    // @ts-ignore
    return acc.networkAccount.address;
  }
  if (acc.networkAccount.getAddress) {
    return await acc.networkAccount.getAddress();
  }
  throw Error(`Expected acc.networkAccount.address or acc.networkAccount.getAddress`);
};
export const balanceOf = async (acc) => {
  const { networkAccount } = acc;
  if (!networkAccount)
    throw Error(`acc.networkAccount missing. Got: ${acc}`);
  if (networkAccount.getBalance) {
    return bigNumberify(await networkAccount.getBalance());
  }
  const addr = await getAddr(acc);
  if (addr) {
    const provider = await getProvider();
    return bigNumberify(await provider.getBalance(addr));
  }
  throw Error(`address missing. Got: ${networkAccount}`);
};
/** @description Arg order follows "src before dst" convention */
export const transfer = async (from, to, value) => {
  if (!isBigNumber(value))
    throw Error(`Expected a BigNumber: ${value}`);
  const sender = from.networkAccount;
  const receiver = getAddr(to);
  const txn = { to: receiver, value };
  if (!sender || !sender.sendTransaction)
    throw Error(`Expected from.networkAccount.sendTransaction: ${from}`);
  debug(`sender.sendTransaction(${JSON.stringify(txn)})`);
  return await sender.sendTransaction(txn);
};
const rejectInvalidReceiptFor = async (txHash, r) => new Promise((resolve, reject) => !r ? reject(`No receipt for txHash: ${txHash}`) :
  r.transactionHash !== txHash ? reject(`Bad txHash; ${txHash} !== ${r.transactionHash}`) :
  !r.status ? reject(`Transaction: ${txHash} was reverted by EVM\n${r}`) :
  resolve(r));
const fetchAndRejectInvalidReceiptFor = async (txHash) => {
  const provider = await getProvider();
  const r = await provider.getTransactionReceipt(txHash);
  return await rejectInvalidReceiptFor(txHash, r);
};
export const connectAccount = async (networkAccount) => {
  // XXX networkAccount MUST be a Wallet or Signer to deploy/attach
  const provider = await getProvider();
  const address = await getAddr({ networkAccount });
  if (!address) {
    throw Error(`Expected networkAccount.address: ${networkAccount}`);
  }
  const shad = address.substring(2, 6);
  const iam = (some_addr) => {
    if (some_addr == address) {
      return address;
    } else {
      throw Error(`I should be ${some_addr}, but am ${address}`);
    }
  };
  const deploy = (bin) => {
    if (!ethers.Signer.isSigner(networkAccount)) {
      throw Error(`Signer required to deploy, ${networkAccount}`);
    }
    const { infoP, resolveInfo } = (() => {
      let resolveInfo = (info) => { void(info); };
      const infoP = new Promise(resolve => {
        resolveInfo = resolve;
      });
      return { infoP, resolveInfo };
    })();
    const performDeploy = (init) => {
      debug(`${shad}: performDeploy with ${JSON.stringify(init)}`);
      const { argsMay, value } = initOrDefaultArgs(init);
      const { ABI, Bytecode } = bin._Connectors.ETH;
      const factory = new ethers.ContractFactory(ABI, Bytecode, networkAccount);
      (async () => {
        const contract = await factory.deploy(...argsMay, { value });
        const deploy_r = await contract.deployTransaction.wait();
        const info = {
          address: contract.address,
          creation_block: deploy_r.blockNumber,
          creator: address,
          transactionHash: deploy_r.transactionHash,
          init,
        };
        resolveInfo(info);
      })();
      return attach(bin, infoP);
    };
    const attachDeferDeploy = () => {
      // impl starts with a shim that deploys on first sendrecv,
      // then replaces itself with the real impl once deployed.
      let impl = {
        recv: async (...args) => {
          void(args);
          throw Error(`Cannot recv yet; contract is not actually deployed`);
        },
        wait: async (...args) => {
          // Wait times are relative to contract events
          // Wait without an initial contract event is nonsense
          void(args);
          throw Error(`Cannot wait yet; contract is not actually deployed`);
        },
        sendrecv: async (label, funcNum, evt_cnt, tys, args, value, out_tys, timeout_delay, sim_p) => {
          debug(`${shad}: ${label} sendrecv m${funcNum} (deferred deploy)`);
          void(evt_cnt);
          void(sim_p);
          // TODO: munge/unmunge roundtrip?
          void(tys);
          void(out_tys);
          // The following must be true for the first sendrecv.
          try {
            assert(eq(funcNum, 1));
            assert(!timeout_delay);
          } catch (e) {
            throw Error(`impossible: Deferred deploy sendrecv assumptions violated.\n${e}`);
          }
          // shim impl is replaced with real impl
          impl = performDeploy({ args, value });
          await infoP; // Wait for the deploy to actually happen.
          // simulated recv
          // return {
          //   didTimeout: false,
          //   // should be the final "evt_cnt" number of args,
          //   // not all args
          //   data: args,
          //   value,
          //   // Because this is the 1st sendrecv, balance = value
          //   balance: value,
          //   from: address,
          // };
          return await impl.recv(label, funcNum, evt_cnt, out_tys, timeout_delay);
        },
        getInfo: async () => {
          // Danger: deadlock possible
          return await infoP;
        },
        // iam doesn't make sense to check before ctc deploy, but it is harmless.
        iam,
      };
      // Return a wrapper around the impl. This obj and its fields do not mutate,
      // but the fields are closures around a mutating ref to impl.
      return {
        sendrecv: (...args) => impl.sendrecv(...args),
        recv: (...args) => impl.recv(...args),
        wait: (...args) => impl.wait(...args),
        getInfo: (...args) => impl.getInfo(...args),
        iam: (...args) => impl.iam(...args),
      };
    };
    switch (bin._Connectors.ETH.deployMode) {
      case 'DM_firstMsg':
        return attachDeferDeploy();
      case 'DM_constructor':
        return performDeploy();
      default:
        throw Error(`Unrecognized deployMode: ${bin._Connectors.ETH.deployMode}`);
    }
  };
  const attach = (bin, infoP) => {
    // unofficially: infoP can also be Contract
    // This should be considered deprecated
    // TODO: remove at next Reach version bump?
    // @ts-ignore
    if (infoP.getInfo) {
      console.log(`Calling attach with another Contract is deprecated.` +
        ` Please replace accBob.attach(backend, ctcAlice)` +
        ` with accBob.attach(bin, ctcAlice.getInfo())`);
      // @ts-ignore
      infoP = infoP.getInfo();
    }
    const ABI = JSON.parse(bin._Connectors.ETH.ABI);
    // Attached state
    const { getLastBlock, setLastBlock } = (() => {
      let lastBlock = null;
      const setLastBlock = (n) => {
        lastBlock = n;
      };
      const getLastBlock = async () => {
        if (typeof lastBlock === 'number') {
          return lastBlock;
        }
        const info = await infoP;
        setLastBlock(info.creation_block);
        return info.creation_block;
      };
      return { getLastBlock, setLastBlock };
    })();
    const updateLast = (o) => {
      if (!o.blockNumber) {
        throw Error(`Expected blockNumber, ${o}`);
      }
      setLastBlock(o.blockNumber);
    };
    const getC = (() => {
      let _ethersC = null;
      return async () => {
        if (_ethersC) {
          return _ethersC;
        }
        const info = await infoP;
        await verifyContract(info, bin);
        if (!ethers.Signer.isSigner(networkAccount)) {
          throw Error(`networkAccount must be a Signer (read: Wallet). ${networkAccount}`);
        }
        _ethersC = new ethers.Contract(info.address, ABI, networkAccount);
        return _ethersC;
      };
    })();
    const callC = async (funcName, lastBlock, args, value) => {
      return (await getC())[funcName]([lastBlock, ...args], { value });
    };
    const getEventData = async (ok_evt, ok_e) => {
      const ethersC = await getC();
      const ok_args_abi = ethersC.interface.getEvent(ok_evt).inputs;
      const { args } = ethersC.interface.parseLog(ok_e);
      return ok_args_abi.map(a => args[a.name]);
    };
    const getLogs = async (fromBlock, toBlock, ok_evt) => {
      const ethersC = await getC();
      return await provider.getLogs({
        fromBlock,
        toBlock,
        address: ethersC.address,
        topics: [ethersC.interface.getEventTopic(ok_evt)],
      });
    };
    const getInfo = async () => await infoP;
    const sendrecv_impl = async (label, funcNum, tys, args, value, out_tys, timeout_delay) => {
      const funcName = `m${funcNum}`;
      if (tys.length !== args.length) {
        throw Error(`tys.length (${tys.length}) !== args.length (${args.length})`);
      }
      const munged = args.map((m, i) => tys[i].munge(tys[i].canonicalize(m)));
      debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- START --- ${JSON.stringify(munged)}`);
      const lastBlock = await getLastBlock();
      let block_send_attempt = lastBlock;
      let block_repeat_count = 0;
      while (!timeout_delay || lt(block_send_attempt, add(lastBlock, timeout_delay))) {
        let r_maybe = null;
        debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- TRY`);
        try {
          const r_fn = await callC(funcName, lastBlock, munged, value);
          r_maybe = await r_fn.wait();
        } catch (e) {
          debug(e);
          // XXX What should we do...? If we fail, but there's no timeout delay... then we should just die
          await Timeout.set(1);
          const current_block = await getNetworkTimeNumber();
          if (current_block == block_send_attempt) {
            block_repeat_count++;
          }
          block_send_attempt = current_block;
          if ( /* timeout_delay && */ block_repeat_count > 32) {
            if (e.code === 'UNPREDICTABLE_GAS_LIMIT') {
              let error = e;
              while (error.error) {
                error = error.error;
              }
              console.log(`impossible: The message you are trying to send appears to be invalid.`);
              console.log(error);
            }
            console.log(`args:`);
            console.log(munged);
            throw Error(`${shad}: ${label} send ${funcName} ${timeout_delay} --- REPEAT @ ${block_send_attempt} x ${block_repeat_count}`);
          }
          debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- TRY FAIL --- ${lastBlock} ${current_block} ${block_repeat_count} ${block_send_attempt}`);
          continue;
        }
        assert(r_maybe !== null);
        const ok_r = await fetchAndRejectInvalidReceiptFor(r_maybe.transactionHash);
        debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- OKAY`);
        // XXX It might be a little dangerous to rely on the polling to just work
        // It may be the case that the next line could speed things up?
        // last_block = ok_r.blockNumber;
        // XXX ^ but do not globally mutate lastBlock.
        // wait relies on lastBlock to refer to the last ctc event
        void(ok_r);
        return await recv_impl(label, funcNum, out_tys, timeout_delay);
      }
      // XXX If we were trying to join, but we got sniped, then we'll
      // think that there is a timeout and then we'll wait forever for
      // the timeout message.
      debug(`${shad}: ${label} send ${funcName} ${timeout_delay} --- FAIL/TIMEOUT`);
      return { didTimeout: true };
    };
    const sendrecv = async (label, funcNum, evt_cnt, tys, args, value, out_tys, timeout_delay, sim_p) => {
      void(evt_cnt);
      void(sim_p);
      return await sendrecv_impl(label, funcNum, tys, args, value, out_tys, timeout_delay);
    };
    // https://docs.ethers.io/ethers.js/html/api-contract.html#configuring-events
    const recv_impl = async (label, okNum, out_tys, timeout_delay) => {
      const lastBlock = await getLastBlock();
      const ok_evt = `e${okNum}`;
      debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- START`);
      let block_poll_start = lastBlock;
      let block_poll_end = block_poll_start;
      while (!timeout_delay || lt(block_poll_start, add(lastBlock, timeout_delay))) {
        // console.log(
        //   `~~~ ${label} is polling [${block_poll_start}, ${block_poll_end}]\n` +
        //     `  ~ ${label} will stop polling at ${last_block} + ${timeout_delay} = ${last_block + timeout_delay}`,
        // );
        const es = await getLogs(block_poll_start, block_poll_end, ok_evt);
        if (es.length == 0) {
          debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- RETRY`);
          block_poll_start = block_poll_end;
          await Timeout.set(1);
          void(ethersBlockOnceP); // This might be a better option too, because we won't need to delay
          block_poll_end = await getNetworkTimeNumber();
          continue;
        } else {
          debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- OKAY`);
          const ok_e = es[0];
          const ok_r = await fetchAndRejectInvalidReceiptFor(ok_e.transactionHash);
          void(ok_r);
          const ok_t = await provider.getTransaction(ok_e.transactionHash);
          // The .gas field doesn't exist on this anymore, apparently?
          // debug(`${ok_evt} gas was ${ok_t.gas} ${ok_t.gasPrice}`);
          updateLast(ok_t);
          const ok_vals = await getEventData(ok_evt, ok_e);
          if (ok_vals.length !== out_tys.length) {
            throw Error(`Expected ${out_tys.length} values from event data, but got ${ok_vals.length}.`);
          }
          const data = ok_vals.map((v, i) => out_tys[i].unmunge(v));
          debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- OKAY --- ${JSON.stringify(ok_vals)}`);
          return { didTimeout: false, data, value: ok_t.value, from: ok_t.from };
        }
      }
      debug(`${shad}: ${label} recv ${ok_evt} ${timeout_delay} --- TIMEOUT`);
      return { didTimeout: true };
    };
    const recv = async (label, okNum, ok_cnt, out_tys, timeout_delay) => {
      void(ok_cnt);
      return await recv_impl(label, okNum, out_tys, timeout_delay);
    };
    const wait = async (delta) => {
      const lastBlock = await getLastBlock();
      // Don't wait from current time, wait from last_block
      debug(`=====Waiting ${delta} from ${lastBlock}: ${address}`);
      const p = await waitUntilTime(add(lastBlock, delta));
      debug(`=====Done waiting ${delta} from ${lastBlock}: ${address}`);
      return p;
    };
    // Note: wait is the local one not the global one of the same name.
    return { getInfo, sendrecv, recv, wait, iam };
  };
  return { deploy, attach, networkAccount };
};
export const newAccountFromMnemonic = async (phrase) => {
  const provider = await getProvider();
  const networkAccount = ethers.Wallet.fromMnemonic(phrase).connect(provider);
  const acc = await connectAccount(networkAccount);
  return acc;
};
const getSigner = memoizeThunk(async () => {
  requireIsolatedNetwork('getSigner');
  const provider = await getProvider();
  // TODO: teach ts what the specialized type is here
  // @ts-ignore
  return provider.getSigner();
});
export const newTestAccount = async (startingBalance) => {
  debug(`newTestAccount(${startingBalance})`);
  requireIsolatedNetwork('newTestAccount');
  const provider = await getProvider();
  const signer = await getSigner();
  const networkAccount = ethers.Wallet.createRandom().connect(provider);
  const to = networkAccount.address;
  try {
    debug(`awaiting transfer: ${to}`);
    await transfer({ networkAccount: signer }, { networkAccount }, startingBalance);
    debug(`got transfer. awaiting connectAccount: ${to}`);
    const acc = await connectAccount(networkAccount);
    debug(`got connectAccount: ${to}`);
    return acc;
  } catch (e) {
    console.log(`Trouble with account ${to}`);
    throw e;
  }
};
const getNetworkTimeNumber = async () => {
  const provider = await getProvider();
  return await provider.getBlockNumber();
};
export const getNetworkTime = async () => {
  return bigNumberify(await getNetworkTimeNumber());
};
// onProgress callback is optional, it will be given an obj
// {currentTime, targetTime}
export const wait = async (delta, onProgress) => {
  const now = await getNetworkTime();
  return await waitUntilTime(add(now, delta), onProgress);
};
// onProgress callback is optional, it will be given an obj
// {currentTime, targetTime}
export const waitUntilTime = async (targetTime, onProgress) => {
  targetTime = bigNumberify(targetTime);
  if (isIsolatedNetwork) {
    return await fastForwardTo(targetTime, onProgress);
  } else {
    return await actuallyWaitUntilTime(targetTime, onProgress);
  }
};
// onProgress callback is optional, it will be given an obj
// {currentTime, targetTime}
const actuallyWaitUntilTime = async (targetTime, onProgress) => {
  const onProg = onProgress || (() => {});
  const provider = await getProvider();
  return await new Promise((resolve) => {
    const onBlock = async (currentTimeNum) => {
      const currentTime = bigNumberify(currentTimeNum);
      // Does not block on the progress fn if it is async
      onProg({ currentTime, targetTime });
      if (ge(currentTime, targetTime)) {
        provider.off('block', onBlock);
        resolve(currentTime);
      }
    };
    provider.on('block', onBlock);
    // Also "re-emit" the current block
    // Note: this sometimes causes the starting block
    // to be processed twice, which should be harmless.
    getNetworkTime().then(onBlock);
  });
};
const fastForwardTo = async (targetTime, onProgress) => {
  // console.log(`>>> FFWD TO: ${targetTime}`);
  const onProg = onProgress || (() => {});
  requireIsolatedNetwork('fastForwardTo');
  let currentTime;
  while (lt(currentTime = await getNetworkTime(), targetTime)) {
    onProg({ currentTime, targetTime });
    await stepTime();
  }
  // Also report progress at completion time
  onProg({ currentTime, targetTime });
  // console.log(`<<< FFWD TO: ${targetTime} complete. It's ${currentTime}`);
  return currentTime;
};
const requireIsolatedNetwork = (label) => {
  if (!isIsolatedNetwork) {
    throw Error(`Invalid operation ${label} in REACH_CONNECTOR_MODE=${connectorMode}`);
  }
};
const getDummyAccount = memoizeThunk(async () => {
  const provider = await getProvider();
  const networkAccount = ethers.Wallet.createRandom().connect(provider);
  const acc = await connectAccount(networkAccount);
  return acc;
});
const stepTime = async () => {
  requireIsolatedNetwork('stepTime');
  const signer = await getSigner();
  const acc = await getDummyAccount();
  return await transfer({ networkAccount: signer }, acc, parseCurrency(0));
};
// Check the contract info and the associated deployed bytecode;
// Verify that:
// * it matches the bytecode you are expecting.
// * it was deployed at exactly creation_block.
// Throws an Error if any verifications fail
export const verifyContract = async (ctcInfo, backend) => {
  const { ABI, Bytecode } = backend._Connectors.ETH;
  const { address, creation_block, init, creator } = ctcInfo;
  const { argsMay, value } = initOrDefaultArgs(init);
  const factory = new ethers.ContractFactory(ABI, Bytecode);
  // TODO: is there a way to get the creation_block & bytecode with a single api call?
  // https://docs.ethers.io/v5/api/providers/provider/#Provider-getCode
  const provider = await getProvider();
  const nocode = await provider.getCode(address, creation_block - 1);
  if (nocode !== '0x') {
    throw Error(`Contract was deployed earlier than ${creation_block} (as was claimed)`);
  }
  const actual = await provider.getCode(address, creation_block);
  // XXX should this also pass {value}, like factory.deploy() does?
  const deployData = factory.getDeployTransaction(...argsMay).data;
  if (typeof deployData !== 'string') {
    // TODO: could also be Ethers.utils.bytes, apparently? Or undefined... why?
    throw Error(`Impossible: deployData is not string ${deployData}`);
  }
  if (!deployData.startsWith(backend._Connectors.ETH.Bytecode)) {
    throw Error(`Impossible: contract with args is not prefixed by backend Bytecode`);
  }
  // FIXME this is based on empirical observation, feels hacky
  // deployData looks like this: [init][setup][body][teardown]
  // actual looks like this:     [init][body]
  // XXX the labels "init", "setup", and "teardown" are probably misleading
  // FIXME: for 0-arg contract deploys, it appears that:
  // * "init" is of length 13
  // * "setup" is not consistent in content, but is of length 156
  // * "teardown" is of length 0
  // FIXME: for n-arg contract deploys, it appears that:
  // * "init" is of length 13
  // * "setup" is of length >= 0 (and probably >= 156)
  // * "teardown" is of length >= 0
  const initLen = 13;
  const setupLen = 156;
  const expected = deployData.slice(0, initLen) + deployData.slice(initLen + setupLen);
  if (expected.length <= 0) {
    throw Error(`Impossible: contract expectation is empty`);
  }
  if (actual !== expected) {
    // FIXME: Empirical observation says that 0-arg contract deploys
    // should === expected. However, this is fragile (?), so it's ok
    // to only pass the next check.
    // FIXME: the 13-char header is also fragile, but we're just
    // running with that assumption for now.
    const deployNoInit = deployData.slice(initLen);
    const actualNoInit = actual.slice(initLen);
    if (actualNoInit.length === 0 || !deployNoInit.includes(actualNoInit)) {
      // FIXME: this display is not so helful for the n-arg contract deploy case.
      const displayLen = 60;
      console.log('--------------------------------------------');
      console.log('expected start: ' + expected.slice(0, displayLen));
      console.log('actual   start: ' + actual.slice(0, displayLen));
      console.log('--------------------------------------------');
      console.log('expected   end: ' + expected.slice(expected.length - displayLen));
      console.log('actual     end: ' + actual.slice(actual.length - displayLen));
      console.log('--------------------------------------------');
      console.log('expected   len: ' + expected.length);
      console.log('actual     len: ' + actual.length);
      console.log('--------------------------------------------');
      throw Error(`Contract bytecode does not match expected bytecode.`);
    }
  }
  const bal = await provider.getBalance(address, creation_block);
  // bal is allowed to exceed expectations, for example,
  // if someone spuriously transferred extra money to the contract
  if (!ge(bal, value)) {
    console.log('bal expected: ' + value);
    console.log('bal actual  : ' + bal);
    throw Error(`Contract initial balance does not match expected initial balance`);
  }
  if (isNone(argsMay)) {
    const st = await provider.getStorageAt(address, 0, creation_block);
    const expectedSt = digest(0, creation_block);
    if (st !== expectedSt) {
      console.log('st expected: ' + expectedSt);
      console.log('st actual  : ' + st);
      throw Error(`Contract initial state does not match expected initial state.`);
    }
  } else {
    // TODO: figure out freeVars using creator and args
    void(creator);
    // const expectedSt = keccak256(1, creation_block, ...freeVars)
    // if st !== expectedSt throw Error
  }
  return true;
};
/** @description the display name of the standard unit of currency for the network */
export const standardUnit = 'ETH';
/** @description the display name of the atomic (smallest) unit of currency for the network */
export const atomicUnit = 'WEI';
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100000000000000000000'
 */
export function parseCurrency(amt) {
  return bigNumberify(ethers.utils.parseUnits(amt.toString(), 'ether'));
}
const initOrDefaultArgs = (init) => ({
  argsMay: init ? Some(init.args) : None,
  value: init ? init.value : bigNumberify(0),
});
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000000000000000')); // => '100'
 */
export function formatCurrency(amt, decimals = 18) {
  // Recall that 1 WEI = 10e18 ETH
  if (!(Number.isInteger(decimals) && 0 <= decimals)) {
    throw Error(`Expected decimals to be a nonnegative integer, but got ${decimals}.`);
  }
  // Truncate
  decimals = Math.min(decimals, 18);
  const decimalsToForget = 18 - decimals;
  const divAmt = amt.div(bigNumberify(10).pow(decimalsToForget));
  const amtStr = ethers.utils.formatUnits(divAmt, decimals);
  // If the str ends with .0, chop it off
  if (amtStr.slice(amtStr.length - 2) == '.0') {
    return amtStr.slice(0, amtStr.length - 2);
  } else {
    return amtStr;
  }
}
