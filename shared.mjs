import crypto from 'crypto';
import ethers from 'ethers';
import util from 'util';
export const getViewsHelper = (views, getView1) => () => objectMap(views.infos, ((v, vm) => objectMap(vm, ((k, vi) => getView1(views.views, v, k, vi)))));
export const deferContract = (shouldError, implP, implNow) => {
  const not_yet = (which) => (...args) => {
    void(args);
    throw Error(`Cannot ${which} yet; contract is not actually deployed`);
  };
  const delay = (which) => async (...args) =>
    // @ts-ignore
    (await implP)[which](...args);
  const thenow = shouldError ? not_yet : delay;
  const mnow = (which) => implNow[which] === undefined ? thenow(which) : implNow[which];
  // impl starts with a shim that deploys on first sendrecv,
  // then replaces itself with the real impl once deployed.
  let impl = {
    getInfo: delay('getInfo'),
    // @ts-ignore
    creationTime: delay('creationTime'),
    // @ts-ignore
    sendrecv: mnow('sendrecv'),
    // @ts-ignore
    recv: mnow('recv'),
    // @ts-ignore
    wait: mnow('wait'),
    // @ts-ignore
    iam: mnow('iam'),
    // @ts-ignore
    selfAddress: mnow('selfAddress'),
    // @ts-ignore
    getViews: mnow('getViews'),
    stdlib: (() => {
      if (implNow.stdlib === undefined) {
        throw Error(`stdlib not defined`);
      }
      return implNow.stdlib;
    })(),
  };
  implP.then((x) => { impl = x; });
  const wrap = (which) => (...args) =>
    // @ts-ignore
    impl[which](...args);
  // Return a wrapper around the impl. This obj and its fields do not mutate,
  // but the fields are closures around a mutating ref to impl.
  return {
    sendrecv: wrap('sendrecv'),
    recv: wrap('recv'),
    wait: wrap('wait'),
    getInfo: wrap('getInfo'),
    creationTime: wrap('creationTime'),
    iam: wrap('iam'),
    selfAddress: wrap('selfAddress'),
    getViews: wrap('getViews'),
    stdlib: impl.stdlib,
  };
};
// ****************************************************************************
// Helpers
// ****************************************************************************
let DEBUG = process.env.REACH_DEBUG ? true : false;
const { hexlify, toUtf8Bytes, toUtf8String, isHexString } = ethers.utils;
const BigNumber = ethers.BigNumber;
// Hex helpers
// const un0x           = h => h.replace(/^0x/, ''); // unused
const hexTo0x = (h) => '0x' + h.replace(/^0x/, '');
const byteToHex = (b) => (b & 0xFF).toString(16).padStart(2, '0');
const byteArrayToHex = (b) => Array.from(b, byteToHex).join('');
const format_ai = (ai) => JSON.stringify(ai);
const forceHex = (x) => isHex(x) ? x : stringToHex(x);
// ****************************************************************************
// Utility exports
// ****************************************************************************
export const envDefault = (v, d) => (v === undefined || v === null) ? d : v;
export const setDEBUG = (b) => {
  if (b === false || b === true) {
    DEBUG = b;
  } else {
    throw Error(`Expected bool, got ${JSON.stringify(b)}`);
  }
};
export const getDEBUG = () => { return DEBUG; };
export const debug = (...msgs) => {
  if (getDEBUG()) {
    // Print arrays/objects in full instead of the default depth of 2
    const betterMsgs = msgs.map((msg) => ['object', 'array'].includes(typeof msg) ?
      util.inspect(msg, false, null, true) :
      msg);
    void(betterMsgs);
    // Print objects for indentation, colors, etc...
    console.log(new Date(), `DEBUG:`, ...msgs);
  }
};
export const assert = (d, ai = null) => {
  if (!d) {
    throw Error(format_ai(ai));
  }
};
export const { isBigNumber } = BigNumber;
export const bigNumberify = (x) => BigNumber.from(x);
export const bigNumberToNumber = (x) => bigNumberify(x).toNumber();
export const checkedBigNumberify = (at, m, x) => {
  const xb = bigNumberify(x);
  if (xb.gte(0) && xb.lte(m)) {
    return xb;
  }
  throw Error(`bigNumberify: ${x} out of range [0, ${m}] at ${at}`);
};
// Contracts
// .canonicalize turns stuff into the "canonical backend representation"
export function protect(ctc, v, ai = null) {
  try {
    return ctc.canonicalize(v);
  } catch (e) {
    console.log(`Protect failed: expected ${ctc.name} but got ${JSON.stringify(v)} ${format_ai(ai)}`);
    throw e;
  }
}
export const isHex = isHexString;
export const hexToString = toUtf8String;
export const stringToHex = (x) => hexlify(toUtf8Bytes(x));
export const makeDigest = (prep) => (t, v) => {
  const args = [t, v];
  debug('digest(', args, ') =>');
  const kekCat = prep(t, v);
  debug('digest(', args, ') => internal(', hexlify(kekCat), ')');
  const r = ethers.utils.keccak256(kekCat);
  debug('keccak(', args, ') => internal(', hexlify(kekCat), ') => ', r);
  return r;
};
export const hexToBigNumber = (h) => bigNumberify(hexTo0x(h));
export const uintToBytes = (i) => bigNumberToHex(i);
export const bigNumberToHex = (u, size = 32) => {
  const width = 8 * size;
  const format = `ufixed${width}x0`;
  const nPos = bigNumberify(u).toTwos(width);
  // They took away padZeros so we have to use FixedNumber
  const nFix = ethers.FixedNumber.from(nPos.toString(), format);
  // XXX why do we slice off the 0x?
  return hexlify(nFix).slice(2);
};
export const bytesEq = (x, y) => {
  debug('bytesEq(', x, ',', y, ')');
  return forceHex(x) === forceHex(y);
};
export const digestEq = bytesEq;
export const makeRandom = (width) => {
  const randomUInt = () => hexToBigNumber(byteArrayToHex(crypto.randomBytes(width)));
  const hasRandom = {
    random: randomUInt,
  };
  return { randomUInt, hasRandom };
};
export const eq = (a, b) => bigNumberify(a).eq(bigNumberify(b));
export const add = (a, b) => bigNumberify(a).add(bigNumberify(b));
export const sub = (a, b) => bigNumberify(a).sub(bigNumberify(b));
export const mod = (a, b) => bigNumberify(a).mod(bigNumberify(b));
export const mul = (a, b) => bigNumberify(a).mul(bigNumberify(b));
export const div = (a, b) => bigNumberify(a).div(bigNumberify(b));
export const ge = (a, b) => bigNumberify(a).gte(bigNumberify(b));
export const gt = (a, b) => bigNumberify(a).gt(bigNumberify(b));
export const le = (a, b) => bigNumberify(a).lte(bigNumberify(b));
export const lt = (a, b) => bigNumberify(a).lt(bigNumberify(b));
// Array helpers
export const argsSlice = (args, cnt) => cnt == 0 ? [] : args.slice(-1 * cnt);
export const argsSplit = (args, cnt) => cnt == 0 ? [args, []] : [args.slice(0, args.length - cnt), args.slice(-1 * cnt)];
export function Array_set(arr, idx, elem) {
  const arrp = arr.slice();
  arrp[idx] = elem;
  return arrp;
}
export const Array_zip = (x, y) => x.map((e, i) => [e, y[i]]);
export const mapRef = (m, f) => {
  const v = m[f];
  // console.log(`Reading map ${JSON.stringify(m)} field ${JSON.stringify(f)} => ${JSON.stringify(v)}`);
  if (v === undefined) {
    return ['None', null];
  } else {
    return ['Some', v];
  }
};
export const objectMap = (object, mapFn) => Object.keys(object).reduce(function(result, key) {
  result[key] = mapFn(key, object[key]);
  return result;
}, {});
// XXX this doesn't really belong here, but hard to relocate due to dep on bytesEq
export const mkAddressEq = (T_Address) => (x, y) => bytesEq(T_Address.canonicalize(x), T_Address.canonicalize(y));
export const parseFixedPoint = (x) => parseInt({ sign: x.sign, i: x.i.i }) / bigNumberify(x.i.scale).toNumber();
export const parseInt = (x) => bigNumberify(x.i).toNumber() * (x.sign ? 1 : (-1));
