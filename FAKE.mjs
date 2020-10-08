import Timeout from 'await-timeout';
import * as stdlib from './shared.mjs';
export * from './shared.mjs';
export const debug = (msg) => {
  stdlib.debug(`${BLOCKS.length}: ${msg}}`);
};
// This can be exposed to the user for checking the trace of blocks
// for testing.
const BLOCKS = [];
// key: Address, but ts doesn't like aliases here
const BALANCES = {};
const toAcct = (address) => ({
  networkAccount: { address },
});
const REACHY_RICH = toAcct('reachy_rich');
export const balanceOf = async (acc) => {
  return BALANCES[acc.networkAccount.address];
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
    const wait = async (delta) => {
      // Don't wait from current time, wait from last_block
      return waitUntilTime(stdlib.add(await getLastBlock(), delta));
    };
    const sendrecv = async (label, funcNum, evt_cnt, tys, args, value, out_tys, timeout_delay, sim_p) => {
      void(tys);
      stdlib.assert(args.length === tys.length, {
        expected: args.length,
        actual: tys.length,
        message: 'tys does not have expected length',
      });
      const data = args.slice(args.length - evt_cnt).map((v, i) => {
        return out_tys[i].munge(v);
      });
      const last_block = await getLastBlock();
      const ctcInfo = await infoP;
      if (!timeout_delay || stdlib.lt(BLOCKS.length, stdlib.add(last_block, timeout_delay))) {
        debug(`${label} send ${funcNum} --- post`);
        transfer({ networkAccount }, toAcct(ctcInfo.address), value);
        const stubbedRecv = {
          didTimeout: false,
          data,
          value,
          from: address,
        };
        const { txns } = sim_p(stubbedRecv);
        // Instead of processing these atomically & rolling back on failure
        // it is just assumed that using FAKE means it is all in one JS thread.
        // (A failed transfer will crash the whole thing.)
        for (const txn of txns) {
          transfer_(ctcInfo.address, txn.to, txn.amt, true);
        }
        const transferBlock = BLOCKS[BLOCKS.length - 1];
        if (transferBlock.type !== 'transfer') {
          throw Error('impossible: intervening block');
        }
        const event = { ...stubbedRecv, funcNum, txns };
        const block = { ...transferBlock, type: 'event', event };
        debug(`sendrecv: transforming transfer block into event block: ${JSON.stringify(block)}`);
        BLOCKS[BLOCKS.length - 1] = block;
        return await recv(label, funcNum, evt_cnt, out_tys, timeout_delay);
      } else {
        debug(`${label} send ${funcNum} --- timeout`);
        return { didTimeout: true };
      }
    };
    const recv = async (label, funcNum, ok_cnt, out_tys, timeout_delay) => {
      void(ok_cnt);
      void(out_tys);
      const last_block = await getLastBlock();
      let check_block = last_block;
      while (!timeout_delay || stdlib.lt(check_block, stdlib.add(last_block, timeout_delay))) {
        debug(`${label} recv ${funcNum} --- check ${check_block}`);
        const b = BLOCKS[check_block];
        if (!b || b.type !== 'event' || !b.event || !stdlib.eq(b.event.funcNum, funcNum)) {
          debug(`${label} recv ${funcNum} --- wait`);
          check_block = Math.min(check_block + 1, BLOCKS.length);
          await Timeout.set(1);
          continue;
        } else {
          debug(`${label} recv ${funcNum} --- recv`);
          setLastBlock(check_block);
          const evt = b.event;
          return { didTimeout: false, data: evt.data, value: evt.value, from: evt.from };
        }
      }
      debug(`${label} recv ${funcNum} --- timeout`);
      return { didTimeout: true };
    };
    const getInfo = async () => await infoP;
    return { getInfo, sendrecv, recv, iam, wait };
  };
  const deploy = (bin) => {
    const contract = makeAccount();
    debug(`new contract: ${contract.address}`);
    BLOCKS.push({ type: 'contract', address: contract.address });
    return attach(bin, {
      ...contract,
      creation_block: BLOCKS.length - 1,
    });
  };
  return { deploy, attach, networkAccount };
};
const makeAccount = () => {
  const address = stdlib.toHex(stdlib.randomUInt256());
  BALANCES[address] = stdlib.bigNumberify(0);
  return { address };
};
export const newTestAccount = async (startingBalance) => {
  const networkAccount = makeAccount();
  debug(`new account: ${networkAccount.address}`);
  BALANCES[REACHY_RICH.networkAccount.address] = startingBalance;
  transfer(REACHY_RICH, { networkAccount }, startingBalance);
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
  const onProg = onProgress || (() => {});
  // FAKE is basically synchronous,
  // so it doesn't make sense to actually "wait" idly.
  let currentTime;
  while (stdlib.lt((currentTime = getNetworkTime()), targetTime)) {
    onProg({ currentTime, targetTime });
    BLOCKS.push({ type: 'wait', currentTime, targetTime });
  }
  // Also report progress at completion time
  onProg({ currentTime, targetTime });
  return currentTime;
}
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
