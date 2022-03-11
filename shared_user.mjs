// This can depend on the shared backend and impl
import ethers from 'ethers';
import { bigNumberify, bigNumberToNumber } from './CBR.mjs';
import { hexlify, hexToBigNumber, } from './shared_impl.mjs';
import { isHex, stringToHex, } from './shared_backend.mjs';
export { isHex, stringToHex, bigNumberify, bigNumberToNumber, hexToBigNumber };
var BigNumber = ethers.BigNumber;
export var isBigNumber = BigNumber.isBigNumber;
export var bigNumberToBigInt = function(x) { return BigInt(bigNumberify(x).toHexString()); };
export var uintToBytes = function(i) { return bigNumberToHex(i); };
export var bigNumberToHex = function(u, size) {
  if (size === void 0) { size = 32; }
  var width = 8 * size;
  var format = "ufixed".concat(width, "x0");
  var nPos = bigNumberify(u).toTwos(width);
  // They took away padZeros so we have to use FixedNumber
  var nFix = ethers.FixedNumber.from(nPos.toString(), format);
  // XXX why do we slice off the 0x?
  return hexlify(nFix).slice(2);
};
export var parseFixedPoint = function(x) {
  return parseInt({ sign: x.sign, i: x.i.i }) / bigNumberify(x.i.scale).toNumber();
};
export var parseInt = function(x) {
  return bigNumberify(x.i).toNumber() * (x.sign ? 1 : (-1));
};
export var hasConsoleLogger = {
  log: console.log
};
export var numberToFixedPoint = function(n) {
  var ns = n.toString();
  var decs = ns.includes('.') ?
    ns.split('.')[1].length :
    0;
  var scale = Math.pow(10, decs);
  return {
    sign: n >= 0,
    i: { scale: bigNumberify(scale), i: bigNumberify(n * scale) }
  };
};
export var numberToInt = function(n) {
  var sign = n >= 0;
  var i = bigNumberify(sign ? n : (-n));
  return { sign: sign, i: i };
};
//# sourceMappingURL=shared_user.js.map
