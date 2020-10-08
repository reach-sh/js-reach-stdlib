// XXX: do not import any types from algosdk; instead copy/paste them below
// XXX: can stop doing this workaround once @types/algosdk is shippable
import algosdk from 'algosdk';
import base32 from 'hi-base32';
import ethers from 'ethers';
import Timeout from 'await-timeout';
import { debug, isBigNumber, bigNumberify, bigNumberToHex, hexToBigNumber, T_UInt256, T_Bool, T_Digest, setDigestWidth, getDEBUG } from './shared.mjs';
export * from './shared.mjs';
// ctc[ALGO] = {
//   address: string
//   appId: confirmedTxn.TransactionResults.CreatedAppIndex; // ?
//   creationRound: int // bigint?
//   logic_sig: LogicSig
//
//   // internal fields
//   // * not required to call acc.attach(bin, ctc)
//   // * required by backend
//   sendrecv: function
//   recv: function
// }
// Common interface exports
// TODO: read token from scripts/algorand-devnet/algorand_data/algod.token
const token = process.env.ALGO_TOKEN || 'c87f5580d7a866317b4bfe9e8b8d1dda955636ccebfa88c12b414db208dd9705';
const server = process.env.ALGO_SERVER || 'http://localhost';
const port = process.env.ALGO_PORT || 4180;
const algodClient = new algosdk.Algodv2(token, server, port);
const itoken = process.env.ALGO_INDEXER_TOKEN || 'reach-devnet';
const iserver = process.env.ALGO_INDEXER_SERVER || 'http://localhost';
const iport = process.env.ALGO_INDEXER_PORT || 8980;
const indexer = new algosdk.Indexer(itoken, iserver, iport);
// eslint-disable-next-line max-len
const FAUCET = algosdk.mnemonicToSecretKey((process.env.ALGO_FAUCET_PASSPHRASE || 'pulp abstract olive name enjoy trick float comfort verb danger eternal laptop acquire fetch message marble jump level spirit during benefit sure dry absent history'));
// if using the default:
// assert(FAUCET.addr === 'EYTSJVJIMJDUSRRNTMVLORTLTOVDWZ6SWOSY77JHPDWSD7K3P53IB3GUPQ');
// Helpers
const getLastRound = async () => (await algodClient.status().do())['last-round'];
const waitForConfirmation = async (txId, untilRound) => {
  let lastRound = null;
  do {
    const lastRoundAfterCall = lastRound ?
      algodClient.statusAfterBlock(lastRound) :
      algodClient.status();
    lastRound = (await lastRoundAfterCall.do())['last-round'];
    const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
    const confirmedRound = pendingInfo['confirmed-round'];
    if (confirmedRound && confirmedRound > 0) {
      return pendingInfo;
    }
  } while (lastRound < untilRound);
  throw { type: 'waitForConfirmation', txId, untilRound, lastRound };
};
const sendAndConfirm = async (stx_or_stxs, txn) => {
  const txID = txn.txID().toString();
  const untilRound = txn.lastRound;
  const req = algodClient.sendRawTransaction(stx_or_stxs);
  // @ts-ignore XXX
  debug(`sendAndConfirm: ${base64ify(req.txnBytesToPost)}`);
  try {
    await req.do();
  } catch (e) {
    throw { type: 'sendRawTransaction', e };
  }
  return await waitForConfirmation(txID, untilRound);
};
// // Backend
const compileTEAL = async (label, code) => {
  debug(`compile ${label}`);
  let s, r;
  try {
    r = await algodClient.compile(code).do();
    s = 200;
  } catch (e) {
    s = typeof e === 'object' ? e.statusCode : 'not object';
    r = e;
  }
  if (s == 200) {
    debug(`compile ${label} succeeded: ${JSON.stringify(r)}`);
    r.src = code;
    r.result = new Uint8Array(Buffer.from(r.result, 'base64'));
    // debug(`compile transformed: ${JSON.stringify(r)}`);
    return r;
  } else {
    throw Error(`compile ${label} failed: ${s}: ${JSON.stringify(r)}`);
  }
};
const getTxnParams = async () => {
  debug(`fillTxn: getting params`);
  while (true) {
    const params = await algodClient.getTransactionParams().do();
    debug(`fillTxn: got params: ${JSON.stringify(params)}`);
    if (params.firstRound !== 0) {
      return params;
    }
    debug(`...but firstRound is 0, so let's wait and try again.`);
    // Assumption: firstRound will move past 0 on its own.
    await Timeout.set(1000);
  }
};
const sign_and_send_sync = async (label, sk, txn) => {
  const txn_s = txn.signTxn(sk);
  try {
    return await sendAndConfirm(txn_s, txn);
  } catch (e) {
    throw Error(`${label} txn failed:\n${JSON.stringify(txn)}\nwith:\n${JSON.stringify(e)}`);
  }
};
// const fillTxn = async (round_width, txn) => {
//   return fillTxnWithParams(false, round_width, await getTxnParams(), txn);
// };
export const transfer = async (from, to, value) => {
  const valuen = value.toNumber();
  const sender = from.networkAccount;
  const receiver = to.networkAccount.addr;
  const note = algosdk.encodeObj('@reach-sh/ALGO.mjs transfer');
  return await sign_and_send_sync(`transfer ${JSON.stringify(from)} ${JSON.stringify(to)} ${valuen}`, sender.sk, algosdk.makePaymentTxnWithSuggestedParams(sender.addr, receiver, valuen, undefined, note, await getTxnParams()));
};
// XXX I'd use x.replaceAll if I could (not supported in this node version), but it would be better to extend ConnectorInfo so these are functions
const replaceAll = (orig, what, whatp) => {
  const once = orig.replace(what, whatp);
  if (once === orig) {
    return orig;
  } else {
    return replaceAll(once, what, whatp);
  }
};
const replaceUint8Array = (label, arr, x) => replaceAll(x, `"{{${label}}}"`, `base32(${base32.encode(arr).toString()})`);
const replaceAddr = (label, addr, x) => replaceUint8Array(label, algosdk.decodeAddress(addr).publicKey, x);

function must_be_supported(bin) {
  const algob = bin._Connectors.ALGO;
  const { unsupported } = algob;
  if (unsupported) {
    throw Error(`This Reach application is not supported on Algorand.`);
  }
}
async function compileFor(bin, ApplicationID) {
  must_be_supported(bin);
  const algob = bin._Connectors.ALGO;
  const { appApproval, appClear, ctc, steps } = algob;
  const subst_appid = (x) => replaceUint8Array('ApplicationID',
    // @ts-ignore XXX
    safeify(T_UInt256, bigNumberify(ApplicationID)), x);
  const ctc_bin = await compileTEAL('ctc_subst', subst_appid(ctc));
  const subst_ctc = (x) => replaceAddr('ContractAddr', ctc_bin.hash, x);
  let appApproval_subst = appApproval;
  const stepCode_bin = await Promise.all(steps.map(async (mc, mi) => {
    if (!mc) {
      return null;
    }
    const mN = `m${mi}`;
    const mc_subst = subst_ctc(subst_appid(mc));
    const cr = await compileTEAL(mN, mc_subst);
    appApproval_subst =
      replaceAddr(mN, cr.hash, appApproval_subst);
    return cr;
  }));
  const appApproval_bin = await compileTEAL('appApproval_subst', appApproval_subst);
  const appClear_bin = await compileTEAL('appClear', appClear);
  return {
    appApproval: appApproval_bin,
    appClear: appClear_bin,
    ctc: ctc_bin,
    steps: stepCode_bin,
  };
}
const ui8z = new Uint8Array();
// XXX I'm using this to inspect the msgpack struct, but maybe just do a round-trip through encode/decode and see what I get?
const base64ify = (x) => Buffer.from(x).toString('base64');
const format_failed_request = (e) => {
  const ep = JSON.parse(JSON.stringify(e));
  const db64 = ep.req ?
    (ep.req.data ? base64ify(ep.req.data) :
      `no data, but ${JSON.stringify(Object.keys(ep.req))}`) :
    `no req, but ${JSON.stringify(Object.keys(ep))}`;
  const msg = e.text ? JSON.parse(e.text) : e;
  return `\n${db64}\n${JSON.stringify(msg)}`;
};
const presafeify = (ty, x) => {
  if (ty.name === 'Address') {
    return '0x' + Buffer.from(x).toString('hex');
  }
  return x;
};
const safeify = (ty, x) => {
  if (ty.name === 'Address') {
    return Buffer.from(x.slice(2), 'hex');
  }
  if (isBigNumber(x)) {
    // XXX Does it matter that this is not msgpacked as an int?
    const size = x.lt(bigNumberify(2).pow(64)) ? 8 : 32;
    const h = '0x' + bigNumberToHex(x, size);
    debug(`${x} =${size}> ${h}`);
    const r = ethers.utils.arrayify(h);
    return r;
  }
  if (typeof x === 'boolean') {
    return safeify(T_UInt256, bigNumberify(x ? 1 : 0));
  }
  if (typeof x === 'string') {
    return ethers.utils.arrayify(x);
  }
  throw Error(`can't safeify ${JSON.stringify(x)}`);
};
const desafeify = (ty, v) => {
  if (ty.name === 'UInt256') {
    return hexToBigNumber('0x' + v.toString('hex'));
  }
  if (ty.name == 'Bytes') {
    return '0x' + v.toString('hex');
  }
  throw Error(`can't desafeify ${JSON.stringify(ty)} and ${JSON.stringify(v)}`);
};
const doQuery = async (dhead, query) => {
  //debug(`${dhead} --- QUERY = ${JSON.stringify(query)}`);
  let res;
  try {
    res = await query.do();
  } catch (e) {
    throw Error(`${dhead} --- QUERY FAIL: ${JSON.stringify(e)}`);
  }
  if (res.transactions.length == 0) {
    // debug(`${dhead} --- RESULT = empty`);
    // XXX Look at the round in res and wait for a new round
    return null;
  }
  debug(`${dhead} --- RESULT = ${JSON.stringify(res)}`);
  // @ts-ignore XXX
  const txn = res.transactions[0];
  return txn;
};
export const connectAccount = async (networkAccount) => {
  const thisAcc = networkAccount;
  const shad = thisAcc.addr.substring(2, 6);
  const pk = algosdk.decodeAddress(thisAcc.addr).publicKey;
  debug(`${shad}: connectAccount`);
  const iam = (some_addr) => {
    if (some_addr == pk) {
      return pk;
    } else {
      throw Error(`I should be ${some_addr}, but am ${pk}`);
    }
  };
  const attachP = async (bin, ctcInfoP) => {
    const ctcInfo = await ctcInfoP;
    const getInfo = async () => ctcInfo;
    const ApplicationID = ctcInfo.ApplicationID;
    let lastRound = ctcInfo.creationRound;
    debug(`${shad}: attach ${ApplicationID} created at ${lastRound}`);
    const bin_comp = await compileFor(bin, ApplicationID);
    // XXX check that the application bytecode is what we expect
    const ctc_prog = algosdk.makeLogicSig(bin_comp.ctc.result, []);
    const wait = async (delta) => {
      void(delta);
      throw Error(`XXX Not implemented: wait`);
    };
    const sendrecv = async (label, funcNum, evt_cnt, tys, args, value, out_tys, timeout_delay, sim_p) => {
      const funcName = `m${funcNum}`;
      const dhead = `${shad}: ${label} sendrecv ${funcName} ${timeout_delay}`;
      debug(`${dhead} --- START`);
      const handler = bin_comp.steps[funcNum];
      if (!handler) {
        throw Error(`${dhead} Internal error: reference to undefined handler: ${funcName}`);
      }
      // XXX become the monster
      setDigestWidth(8);
      const fake_res = {
        didTimeout: false,
        data: args,
        value: value,
        from: pk,
      };
      const sim_r = sim_p(fake_res);
      const isHalt = sim_r.isHalt;
      const sim_txns = sim_r.txns;
      while (true) {
        const params = await getTxnParams();
        if (timeout_delay) {
          const tdn = timeout_delay.toNumber();
          params.lastRound = lastRound + tdn;
          if (params.firstRound > params.lastRound) {
            debug(`${dhead} --- FAIL/TIMEOUT`);
            return { didTimeout: true };
          }
        }
        debug(`${dhead} --- ASSEMBLE w/ ${JSON.stringify(params)}`);
        const txnFromContracts = sim_txns.map((txn_nfo) => algosdk.makePaymentTxnWithSuggestedParams(bin_comp.ctc.hash, algosdk.encodeAddress(txn_nfo.to), txn_nfo.amt.toNumber(), undefined, ui8z, params));
        const totalFromFee = txnFromContracts.reduce(((sum, txn) => sum + txn.fee), 0);
        debug(`${dhead} --- totalFromFee = ${JSON.stringify(totalFromFee)}`);
        debug(`${dhead} --- isHalt = ${JSON.stringify(isHalt)}`);
        const actual_args = [sim_r.prevSt, sim_r.nextSt, isHalt, bigNumberify(totalFromFee), lastRound, ...args];
        const actual_tys = [T_Digest, T_Digest, T_Bool, T_UInt256, T_UInt256, ...tys];
        debug(`${dhead} --- ARGS = ${JSON.stringify(actual_args)}`);
        const munged_args =
          // XXX this needs to be customized for Algorand, so I don't have to safeify. Ideally munge would return Uint8Array for everything.
          actual_args.map((m, i) => actual_tys[i].munge(actual_tys[i].canonicalize(presafeify(actual_tys[i], m))));
        const safe_args = munged_args.map((m, i) => safeify(actual_tys[i], m));
        safe_args.forEach((x) => {
          if (!(typeof x === 'string' || x instanceof Uint8Array)) {
            throw Error(`expect safe program argument, got ${JSON.stringify(x)}`);
          }
        });
        debug(`${dhead} --- PREPARE`); // XXX display safe_args usefully
        const handler_with_args = algosdk.makeLogicSig(handler.result, safe_args);
        debug(`${dhead} --- PREPARED`); // XXX display handler_with_args usefully, like with base64ify toBytes
        const whichAppl = isHalt ?
          // We are treating it like any party can delete the application, but the docs say it may only be possible for the creator. The code appears to not care: https://github.com/algorand/go-algorand/blob/0e9cc6b0c2ddc43c3cfa751d61c1321d8707c0da/ledger/apply/application.go#L589
          algosdk.makeApplicationDeleteTxn :
          algosdk.makeApplicationNoOpTxn;
        // XXX if it is a halt, generate closeremaindertos for all the handlers and the contract account
        const txnAppl = whichAppl(thisAcc.addr, params, ApplicationID);
        const txnFromHandler = algosdk.makePaymentTxnWithSuggestedParams(handler.hash, thisAcc.addr, 0, undefined, ui8z, params);
        debug(`${dhead} --- txnFromHandler = ${JSON.stringify(txnFromHandler)}`);
        const txnToHandler = algosdk.makePaymentTxnWithSuggestedParams(thisAcc.addr, handler.hash, txnFromHandler.fee, undefined, ui8z, params);
        debug(`${dhead} --- txnToHandler = ${JSON.stringify(txnToHandler)}`);
        const txnToContract = algosdk.makePaymentTxnWithSuggestedParams(thisAcc.addr, bin_comp.ctc.hash, value.toNumber() + totalFromFee, undefined, ui8z, params);
        const txns = [
          txnAppl,
          txnToHandler,
          txnFromHandler,
          txnToContract,
          ...txnFromContracts,
        ];
        algosdk.assignGroupID(txns);
        const sign_me = (x) => x.signTxn(thisAcc.sk);
        const txnAppl_s = sign_me(txnAppl);
        const txnFromHandler_s = algosdk.signLogicSigTransactionObject(txnFromHandler, handler_with_args).blob;
        debug(`txnFromHandler_s: ${base64ify(txnFromHandler_s)}`);
        const txnToHandler_s = sign_me(txnToHandler);
        const txnToContract_s = sign_me(txnToContract);
        const txnFromContracts_s = txnFromContracts.map((txn) => algosdk.signLogicSigTransactionObject(txn, ctc_prog).blob);
        const txns_s = [
          txnAppl_s,
          txnToHandler_s,
          txnFromHandler_s,
          txnToContract_s,
          ...txnFromContracts_s,
        ];
        debug(`${dhead} --- SEND: ${txns_s.length}`);
        let res;
        try {
          res = await sendAndConfirm(txns_s, txnAppl);
        } catch (e) {
          if (e.type == 'sendRawTransaction') {
            // XXX when this fails, it is dropping the lsig txn
            throw Error(`${dhead} --- FAIL:\n${format_failed_request(e.e)}`);
          } else {
            throw Error(`${dhead} --- FAIL:\n${JSON.stringify(e)}`);
          }
        }
        // XXX we should inspect res and if we failed because we didn't get picked out of the queue, then we shouldn't error, but should retry and let the timeout logic happen.
        debug(`${dhead} --- SUCCESS: ${JSON.stringify(res)}`);
        return await recv(label, funcNum, evt_cnt, out_tys, timeout_delay);
      }
    };
    const recv = async (label, funcNum, evt_cnt, tys, timeout_delay) => {
      const funcName = `m${funcNum}`;
      const dhead = `${shad}: ${label} recv ${funcName} ${timeout_delay}`;
      debug(`${dhead} --- START`);
      const handler = bin_comp.steps[funcNum];
      if (!handler) {
        throw Error(`${dhead} Internal error: reference to undefined handler: ${funcName}`);
      }
      const timeoutRound = timeout_delay ?
        lastRound + timeout_delay.toNumber() :
        undefined;
      while (true) {
        const currentRound = await getLastRound();
        if (timeoutRound && timeoutRound < currentRound) {
          return { didTimeout: true };
        }
        let query = indexer.searchForTransactions()
          .address(handler.hash)
          .addressRole('sender')
          .minRound(lastRound);
        if (timeoutRound) {
          query = query.maxRound(timeoutRound);
        }
        const txn = await doQuery(dhead, query);
        if (!txn) {
          // XXX perhaps wait until a new round has happened
          await Timeout.set(2000);
          continue;
        }
        const ctc_args =
          // @ts-ignore XXX
          txn.signature.logicsig.args;
        debug(`${dhead} --- ctc_args = ${JSON.stringify(ctc_args)}`);
        const args = evt_cnt == 0 ? [] : ctc_args.slice(-1 * evt_cnt);
        debug(`${dhead} --- args = ${JSON.stringify(args)}`);
        const args_bufs = args.map((x) => Buffer.from(x, 'base64'));
        debug(`${dhead} --- args_bufs = ${JSON.stringify(args_bufs)}`);
        const args_un = args_bufs.map((v, i) => desafeify(tys[i], v));
        debug(`${dhead} --- args_un = ${JSON.stringify(args_un)}`);
        const totalFromFee = desafeify(T_UInt256, Buffer.from(ctc_args[3], 'base64'));
        debug(`${dhead} --- totalFromFee = ${JSON.stringify(totalFromFee)}`);
        const fromAddr = txn['payment-transaction'].receiver;
        const from = algosdk.decodeAddress(fromAddr).publicKey;
        debug(`${dhead} --- from = ${JSON.stringify(from)} = ${fromAddr}`);
        const oldLastRound = lastRound;
        lastRound = txn['confirmed-round'];
        debug(`${dhead} --- updating round from ${oldLastRound} to ${lastRound}`);
        // XXX ideally we'd get the whole transaction group before and not need to do this.
        const ptxn = await doQuery(dhead, indexer.searchForTransactions()
          .address(bin_comp.ctc.hash)
          .addressRole('receiver')
          .round(lastRound));
        const value = bigNumberify(ptxn['payment-transaction'].amount)
          .sub(totalFromFee);
        debug(`${dhead} --- value = ${JSON.stringify(value)}`);
        return {
          didTimeout: false,
          data: args_un,
          value,
          from,
        };
      }
    };
    return { getInfo, sendrecv, recv, iam, wait };
  };
  const deployP = async (bin) => {
    must_be_supported(bin);
    debug(`${shad} deploy`);
    const algob = bin._Connectors.ALGO;
    const { appApproval0, appClear } = algob;
    const appApproval0_subst = replaceAddr('Deployer', thisAcc.addr, appApproval0);
    const appApproval0_bin = await compileTEAL('appApproval0', appApproval0_subst);
    const appClear_bin = await compileTEAL('appClear', appClear);
    const createRes = await sign_and_send_sync('ApplicationCreate', thisAcc.sk, algosdk.makeApplicationCreateTxn(thisAcc.addr, await getTxnParams(), algosdk.OnApplicationComplete.NoOpOC, appApproval0_bin.result, appClear_bin.result, 0, 0, 2, 1));
    const ApplicationID = createRes['application-index'];
    if (!ApplicationID) {
      throw Error(`No application-index in ${JSON.stringify(createRes)}`);
    }
    const bin_comp = await compileFor(bin, ApplicationID);
    const minBalance = 100000; // XXX get from SDK
    const params = await getTxnParams();
    const txnUpdate = algosdk.makeApplicationUpdateTxn(thisAcc.addr, params, ApplicationID, bin_comp.appApproval.result, appClear_bin.result);
    const txnToContract = algosdk.makePaymentTxnWithSuggestedParams(thisAcc.addr, bin_comp.ctc.hash, minBalance, undefined, ui8z, params);
    const txnToHandlers = bin_comp.steps.flatMap((sc) => {
      if (!sc) {
        return [];
      }
      return [algosdk.makePaymentTxnWithSuggestedParams(thisAcc.addr, sc.hash, minBalance, undefined, ui8z, params)];
    });
    const txns = [
      txnUpdate,
      txnToContract,
      ...txnToHandlers,
    ];
    algosdk.assignGroupID(txns);
    const txnUpdate_s = txnUpdate.signTxn(thisAcc.sk);
    const txnToContract_s = txnToContract.signTxn(thisAcc.sk);
    const txnToHandlers_s = txnToHandlers.map((tx) => tx.signTxn(thisAcc.sk));
    const txns_s = [
      txnUpdate_s,
      txnToContract_s,
      ...txnToHandlers_s,
    ];
    let updateRes;
    try {
      updateRes = await sendAndConfirm(txns_s, txnUpdate);
    } catch (e) {
      throw Error(`deploy: ${JSON.stringify(e)}`);
    }
    const creationRound = updateRes['confirmed-round'];
    const getInfo = async () => ({ ApplicationID, creationRound });
    debug(`${shad} application created`);
    return await attachP(bin, getInfo());
  };
  /**
   * @description Push await down into the functions of a ContractAttached
   * @param implP A promise of an implementation of ContractAttached
   */
  const deferP = (implP) => {
    return {
      getInfo: async () => (await implP).getInfo(),
      sendrecv: async (...args) => (await implP).sendrecv(...args),
      recv: async (...args) => (await implP).recv(...args),
      wait: async (...args) => (await implP).wait(...args),
      iam,
    };
  };
  const attach = (bin, ctcInfoP) => {
    return deferP(attachP(bin, ctcInfoP));
  };
  const deploy = (bin) => {
    return deferP(deployP(bin));
  };
  return { deploy, attach, networkAccount };
};
const getBalanceAt = async (addr, round) => {
  void(round);
  // FIXME: Don't ignore round, but this requires 'the next indexer version' (Max on 2020/05/05)
  return (await algodClient.accountInformation(addr).do()).amount;
};
export const balanceOf = async (acc) => {
  const { networkAccount } = acc;
  if (!networkAccount)
    throw Error(`acc.networkAccount missing. Got: ${acc}`);
  return bigNumberify(await getBalanceAt(networkAccount.addr, await getLastRound()));
};
const showBalance = async (note, networkAccount) => {
  const bal = await balanceOf({ networkAccount });
  const showBal = formatCurrency(bal, 2);
  console.log('%s: balance: %s algos', note, showBal);
};
export const newTestAccount = async (startingBalance) => {
  const networkAccount = algosdk.generateAccount();
  if (getDEBUG()) {
    await showBalance('before', networkAccount);
  }
  await transfer({ networkAccount: FAUCET }, { networkAccount }, startingBalance);
  if (getDEBUG()) {
    await showBalance('after', networkAccount);
  }
  return await connectAccount(networkAccount);
};
/** @description the display name of the standard unit of currency for the network */
export const standardUnit = 'ALGO';
/** @description the display name of the atomic (smallest) unit of currency for the network */
export const atomicUnit = 'μALGO';
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100000000'
 */
export function parseCurrency(amt) {
  const numericAmt = isBigNumber(amt) ? amt.toNumber() :
    typeof amt === 'string' ? parseFloat(amt) :
    amt;
  return bigNumberify(algosdk.algosToMicroalgos(numericAmt));
}
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000')); // => '100'
 */
export function formatCurrency(amt, decimals = 6) {
  // Recall that 1 algo = 10^6 microalgos
  if (!(Number.isInteger(decimals) && 0 <= decimals)) {
    throw Error(`Expected decimals to be a nonnegative integer, but got ${decimals}.`);
  }
  // Use decimals+1 and then slice it off to truncate instead of round
  const algosStr = algosdk.microalgosToAlgos(amt.toNumber()).toFixed(decimals + 1);
  // Have to roundtrip thru Number to drop trailing zeroes
  return Number(algosStr.slice(0, algosStr.length - 1)).toString();
}
export const newAccountFromMnemonic = false; // XXX
export const getNetworkTime = getLastRound;
export const waitUntilTime = false; // XXX
export const wait = false; // XXX
export const verifyContract = false; // XXX
