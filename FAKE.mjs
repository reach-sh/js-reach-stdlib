// ****************************************************************************
// standard library for Javascript users
// ****************************************************************************
import Timeout from 'await-timeout';
import ethers from 'ethers';
import * as stdlib from './shared.mjs';
export * from './shared.mjs';
import { stdlib as compiledStdlib, typeDefs } from './FAKE_compiled.mjs';
// ****************************************************************************
// Helpers
// ****************************************************************************
// This can be exposed to the user for checking the trace of blocks
// for testing.
const BLOCKS = [];
// key: Address, but ts doesn't like aliases here
const BALANCES = {};
const toAcct = (address) => ({
  networkAccount: { address },
});
const STATES = {};
const checkStateTransition = async (label, which, prevSt, nextSt) => {
  await Timeout.set(Math.random() < 0.5 ? 20 : 0);
  const cur = STATES[which];
  debug(`${label} cst prevSt(${JSON.stringify(prevSt)}) on cur(${JSON.stringify(cur)}) to ${JSON.stringify(nextSt)} --- check`);
  if (!stdlib.bytesEq(cur, prevSt)) {
    return false;
  }
  debug(`${label} cst prevSt(${JSON.stringify(prevSt)}) on cur(${JSON.stringify(STATES[which])}) to ${JSON.stringify(nextSt)} --- assign`);
  STATES[which] = nextSt;
  return true;
};
/**
 * @description performs a transfer; no block created
 */
const transfer_ = (froma, toa, value, is_ctc) => {
  if (is_ctc) {
    debug('transfer_: contract is paying out to someone');
  }
  stdlib.assert(stdlib.le(value, BALANCES[froma]));
  debug(`transfer_ ${froma} -> ${toa} of ${value}`);
  BALANCES[toa] = stdlib.add(BALANCES[toa], value);
  BALANCES[froma] = stdlib.sub(BALANCES[froma], value);
};
const makeAccount = () => {
  const address = ethers.Wallet.createRandom().address;
  BALANCES[address] = stdlib.bigNumberify(0);
  return { address };
};
// ****************************************************************************
// Common Interface Exports
// ****************************************************************************
export const { addressEq, digest } = compiledStdlib;
export const { T_Null, T_Bool, T_UInt, T_Tuple, T_Array, T_Object, T_Data, T_Bytes, T_Address, T_Digest } = typeDefs;
export const debug = (msg) => {
  stdlib.debug(`${BLOCKS.length}: ${msg}}`);
};
export const { randomUInt, hasRandom } = stdlib.makeRandom(32);
export const balanceOf = async (acc) => {
  return BALANCES[acc.networkAccount.address];
};
export const fundFromFaucet = async (toa, value) => {
  const faucet = await getFaucet();
  const faucetAddress = faucet.networkAccount.address;
  const faucetFunds = BALANCES[faucetAddress] || stdlib.bigNumberify(0);
  // For FAKE, the faucet may need to add funds on demand,
  // if the user created an account without a starting balance.
  if (stdlib.le(faucetFunds, value)) {
    BALANCES[faucetAddress] = faucetFunds.add(value);
  }
  transfer(faucet, toa, value);
};
/**
 * @description performs a transfer & creates a transfer block
 */
export const transfer = async (from, to, value) => {
  const toa = to.networkAccount.address;
  const froma = from.networkAccount.address;
  transfer_(froma, toa, value);
  const block = { type: 'transfer', to: toa, from: froma, value };
  debug(`transfer: ${JSON.stringify(block)}`);
  BLOCKS.push(block);
};
export const connectAccount = async (networkAccount) => {
  const { address } = networkAccount;
  const attach = (bin, infoP) => {
    void(bin);
    // state
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
    const iam = (some_addr) => {
      if (some_addr === address) {
        return address;
      } else {
        throw Error(`I should be ${some_addr}, but am ${address}`);
      }
    };
    const selfAddress = () => {
      return address;
    };
    const wait = async (delta) => {
      // Don't wait from current time, wait from last_block
      return waitUntilTime(stdlib.add(await getLastBlock(), delta));
    };
    const sendrecv = async (label, funcNum, evt_cnt, tys, args, value, out_tys, onlyIf, soloSend, timeout_delay, sim_p) => {
      const doRecv = async (waitIfNotPresent) => await recv(label, funcNum, evt_cnt, out_tys, waitIfNotPresent, timeout_delay);
      if (!onlyIf) {
        return await doRecv(true);
      }
      void(tys);
      stdlib.assert(args.length === tys.length, {
        expected: args.length,
        actual: tys.length,
        message: 'tys does not have expected length',
      });
      const data = stdlib.argsSlice(args, evt_cnt);
      const last_block = await getLastBlock();
      const timeout_until_block = timeout_delay && stdlib.add(last_block, timeout_delay);
      debug(`${label} send ${funcNum} --- timeout is ${timeout_delay}, not sending unless ${BLOCKS.length} less than ${timeout_until_block}`);
      const ctcInfo = await infoP;
      if (!timeout_until_block || stdlib.lt(BLOCKS.length, timeout_until_block)) {
        debug(`${label} send ${funcNum} --- post`);
        const stubbedRecv = {
          didTimeout: false,
          data,
          value,
          from: address,
        };
        const { prevSt, nextSt, txns } = sim_p(stubbedRecv);
        if (await checkStateTransition(label, ctcInfo.address, prevSt, nextSt)) {
          debug(`${label} send ${funcNum} --- post succeeded`);
          transfer({ networkAccount }, toAcct(ctcInfo.address), value);
          // Instead of processing these atomically & rolling back on failure
          // it is just assumed that using FAKE means it is all in one JS
          // thread.  (A failed transfer will crash the whole thing.)
          for (const txn of txns) {
            transfer_(ctcInfo.address, txn.to, txn.amt, true);
          }
          const theBlockNum = BLOCKS.length - 1;
          const transferBlock = BLOCKS[theBlockNum];
          if (transferBlock.type !== 'transfer') {
            throw Error(`impossible: intervening block ${JSON.stringify(BLOCKS)}`);
          }
          const event = { ...stubbedRecv, funcNum, txns };
          const block = { ...transferBlock, type: 'event', event, time: theBlockNum };
          debug(`sendrecv: ${theBlockNum} transforming transfer block into event block: ${JSON.stringify(block)}`);
          BLOCKS[theBlockNum] = block;
          return await doRecv(false);
        } else {
          debug(`${label} send ${funcNum} --- post failed`);
          if (soloSend) {
            throw Error(`post failed`);
          } else {
            return await doRecv(true);
          }
        }
      } else {
        debug(`${label} send ${funcNum} --- timeout`);
        return { didTimeout: true };
      }
    };
    const findBlock = (from, to, funcNum) => {
      for (let i = from; i <= to; i++) {
        const b = BLOCKS[i];
        if (!b || b.type !== 'event' || !b.event || !stdlib.eq(b.event.funcNum, funcNum)) {
          continue;
        } else {
          return b;
        }
      }
      return false;
    };
    const recv = async (label, funcNum, ok_cnt, out_tys, waitIfNotPresent, timeout_delay) => {
      void(ok_cnt);
      void(out_tys);
      const last_block = await getLastBlock();
      const timeout_until_block = timeout_delay && stdlib.add(last_block, timeout_delay);
      debug(`${label} recv ${funcNum} --- timeout is ${timeout_delay}, waiting until ${timeout_until_block}`);
      // look after the last block
      let check_block = last_block + 1;
      while (!timeout_until_block || stdlib.lt(BLOCKS.length, timeout_until_block)) {
        debug(`${label} recv ${funcNum} --- check ${last_block} ${check_block}`);
        const b = findBlock(last_block + 1, check_block, funcNum);
        if (!b) {
          debug(`${label} recv ${funcNum} --- wait (${waitIfNotPresent})`);
          await Timeout.set(20);
          if (waitIfNotPresent) {
            check_block++;
            if (check_block >= BLOCKS.length - 1) {
              await waitUntilTime(check_block);
            }
          } else {
            check_block = Math.min(check_block + 1, BLOCKS.length - 1);
          }
          continue;
        } else {
          const found_block = b.time;
          debug(`${label} recv ${funcNum} --- AT ${found_block}`);
          setLastBlock(found_block);
          const evt = b.event;
          return { didTimeout: false, data: evt.data, value: evt.value, from: evt.from };
        }
      }
      debug(`${label} recv ${funcNum} --- timeout`);
      return { didTimeout: true };
    };
    const getInfo = async () => await infoP;
    return { getInfo, sendrecv, recv, iam, selfAddress, wait, stdlib: compiledStdlib };
  };
  const deploy = (bin) => {
    const contract = makeAccount();
    debug(`new contract: ${contract.address}`);
    STATES[contract.address] =
      // @ts-ignore XXX
      digest(T_Tuple([T_UInt]), [stdlib.bigNumberify(0)]);
    BLOCKS.push({ type: 'contract', address: contract.address });
    return attach(bin, {
      ...contract,
      creation_block: BLOCKS.length - 1,
    });
  };
  return { deploy, attach, networkAccount, stdlib: compiledStdlib };
};
const REACHY_RICH_P = (async () => {
  return await connectAccount({ address: T_Address.defaultValue });
})();
export async function getDefaultAccount() {
  return REACHY_RICH_P;
}
export async function getFaucet() {
  return REACHY_RICH_P;
}
export const newTestAccount = async (startingBalance) => {
  const account = await createAccount();
  debug(`new account: ${account.networkAccount.address}`);
  await fundFromFaucet(account, startingBalance);
  return account;
};
export const createAccount = async () => {
  // Create account without any starting balance
  const networkAccount = makeAccount();
  debug(`createAccount: ${networkAccount.address}`);
  return await connectAccount(networkAccount);
};
export function getNetworkTime() {
  return stdlib.bigNumberify(BLOCKS.length);
}
export function wait(delta, onProgress) {
  return waitUntilTime(stdlib.add(getNetworkTime(), delta), onProgress);
}
export function waitUntilTime(targetTime, onProgress) {
  targetTime = stdlib.bigNumberify(targetTime);
  debug(`waitUntilTime: ${targetTime}`);
  const onProg = onProgress || (() => {});
  // FAKE is basically synchronous,
  // so it doesn't make sense to actually "wait" idly.
  let currentTime;
  while (stdlib.lt((currentTime = getNetworkTime()), targetTime)) {
    debug(`waitUntilTime: waited`);
    onProg({ currentTime, targetTime });
    BLOCKS.push({ type: 'wait', currentTime, targetTime });
  }
  // Also report progress at completion time
  onProg({ currentTime, targetTime });
  return currentTime;
}
export const newAccountFromSecret = false; // XXX
export const newAccountFromMnemonic = false; // XXX
export const verifyContract = false; // XXX
/** @description the display name of the standard unit of currency for the network */
export const standardUnit = 'FAKE';
/** @description the display name of the atomic (smallest) unit of currency for the network */
export const atomicUnit = 'FAKE';
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100'
 */
export function parseCurrency(amt) {
  return stdlib.bigNumberify(amt.toString());
}
export const minimumBalance = parseCurrency(0);
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100')); // => '100'
 */
export function formatCurrency(amt, decimals = 0) {
  if (!(Number.isInteger(decimals) && 0 <= decimals)) {
    throw Error(`Expected decimals to be a nonnegative integer, but got ${decimals}.`);
  }
  void(decimals); // There are no fractional quantities in FAKE
  return amt.toString();
}
export const setFaucet = false; // XXX
