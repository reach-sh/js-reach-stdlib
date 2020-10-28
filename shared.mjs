import crypto from 'crypto';
import ethers from 'ethers';
const BigNumber = ethers.BigNumber;
let DEBUG = process.env.REACH_DEBUG ? true : false;
export const setDEBUG = (b) => {
  if (b === false || b === true) {
    DEBUG = b;
  } else {
    throw Error(`Expected bool, got ${JSON.stringify(b)}`);
  }
};
export const getDEBUG = () => { return DEBUG; };
export const debug = (msg) => {
  if (getDEBUG()) {
    console.log(`[${(new Date()).toISOString()}] DEBUG: ${msg}`);
  }
};
export const assert = (d, ai = null) => {
  if (!d) {
    throw Error(format_ai(ai));
  }
};
const { hexlify, toUtf8Bytes, toUtf8String, isHexString } = ethers.utils;
export const { isBigNumber } = BigNumber;
export const bigNumberify = (x) => BigNumber.from(x);
export const checkedBigNumberify = (at, m, x) => {
  const xb = bigNumberify(x);
  if (xb.gte(0) && xb.lte(m)) {
    return xb;
  }
  throw Error(`bigNumberify: ${x} out of range [0, ${m}] at ${at}`);
};
// Hex helpers
// const un0x           = h => h.replace(/^0x/, ''); // unused
const hexTo0x = (h) => '0x' + h.replace(/^0x/, '');
const byteToHex = (b) => (b & 0xFF).toString(16).padStart(2, '0');
const byteArrayToHex = (b) => Array.from(b, byteToHex).join('');
// Contracts
// .canonicalize turns stuff into the "canonical backend representation"
const format_ai = (ai) => JSON.stringify(ai);
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
  debug(`digest(${JSON.stringify(args)}) =>`);
  const kekCat = prep(t, v);
  debug(`digest(${JSON.stringify(args)}) => internal(${hexlify(kekCat)})`);
  const r = ethers.utils.keccak256(kekCat);
  debug(`keccak(${JSON.stringify(args)}) => internal(${hexlify(kekCat)} => ${JSON.stringify(r)}`);
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
const forceHex = (x) => isHex(x) ? x : stringToHex(x);
export const bytesEq = (x, y) => {
  debug(`bytesEq '${x}' '${y}'`);
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
export function Array_set(arr, idx, elem) {
  const arrp = arr.slice();
  arrp[idx] = elem;
  return arrp;
}
export const Array_zip = (x, y) => x.map((e, i) => [e, y[i]]);
// XXX this doesn't really belong here, but hard to relocate due to dep on bytesEq
export const mkAddressEq = (T_Address) => (x, y) => bytesEq(T_Address.canonicalize(x), T_Address.canonicalize(y));
