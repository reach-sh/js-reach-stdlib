import crypto from 'crypto';
import ethers from 'ethers';
import { labelMaps } from './shared_impl.mjs';
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
// const hexOf = x =>
//       typeof x === 'string' && x.slice(0, 2) === '0x'
//       ? un0x(toHex(x))
//       : un0x(toHex(`0x${x}`));
const hexOf = (x) => toHex(x);
// TODO: why was this stripping off the 0x?
// Why was it slapping 0x on non-hex strings?
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
// Massage the arg into a form keccak256 will handle correctly
let digestWidth = 32;
export const setDigestWidth = (sz) => {
  digestWidth = sz;
};
const kek = (arg) => {
  if (typeof(arg) === 'string') {
    if (isHex(arg)) {
      return arg;
    } else {
      return toUtf8Bytes(arg);
    }
  } else if (typeof(arg) === 'boolean') {
    return kek(arg ? 1 : 0);
  } else if (typeof(arg) === 'number') {
    return '0x' + bigNumberToHex(arg, digestWidth);
  } else if (isBigNumber(arg)) {
    return '0x' + bigNumberToHex(arg, digestWidth);
  } else if (arg && arg.constructor && arg.constructor.name == 'Uint8Array') {
    return arg;
  } else if (arg && arg.constructor && arg.constructor.name == 'Buffer') {
    return '0x' + arg.toString('hex');
  } else if (Array.isArray(arg)) {
    return ethers.utils.concat(arg.map((x) => ethers.utils.arrayify(kek(x))));
  } else if (Object.keys(arg).length > 0) {
    if (Object.keys(arg).length > 1) {
      // XXX
      console.log(`WARNING: digest known not to match solidity keccak256` +
        ` on objects with more than 1 field.` +
        ` This can cause: "The message you are trying to send appears to be invalid"`);
    }
    const { ascLabels } = labelMaps(arg);
    return kek(ascLabels.map((label => arg[label])));
  } else {
    throw Error(`Can't kek this: ${JSON.stringify(arg)}`);
  }
};
export const toHex = (x) => hexlify(kek(x));
export const isHex = isHexString;
export const hexToString = toUtf8String;
// XXX the JS backend expects this to be a BigNumber
export const digest = (...args) => {
  debug(`digest(${JSON.stringify(args)}) =>`);
  const kekCat = kek(args);
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
export const bytesEq = (x, y) => hexOf(x) === hexOf(y);
export const digestEq = bytesEq;
export const randomUInt = () => hexToBigNumber(byteArrayToHex(crypto.randomBytes(digestWidth)));
export const hasRandom = {
  random: randomUInt,
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
export function Array_set(arr, idx, elem) {
  const arrp = arr.slice();
  arrp[idx] = elem;
  return arrp;
}
export const Array_zip = (x, y) => x.map((e, i) => [e, y[i]]);
// XXX this doesn't really belong here, but hard to relocate due to dep on bytesEq
export const mkAddressEq = (T_Address) => (x, y) => bytesEq(T_Address.canonicalize(x), T_Address.canonicalize(y));
