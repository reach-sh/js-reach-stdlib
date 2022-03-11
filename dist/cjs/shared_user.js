"use strict";
exports.__esModule = true;
exports.numberToInt = exports.numberToFixedPoint = exports.hasConsoleLogger = exports.parseInt = exports.parseFixedPoint = exports.bigNumberToHex = exports.uintToBytes = exports.bigNumberToBigInt = exports.isBigNumber = exports.hexToBigNumber = exports.bigNumberToNumber = exports.bigNumberify = exports.stringToHex = exports.isHex = void 0;
// This can depend on the shared backend and impl
var ethers_1 = require("ethers");
var CBR_1 = require("./CBR");
exports.bigNumberify = CBR_1.bigNumberify;
exports.bigNumberToNumber = CBR_1.bigNumberToNumber;
var shared_impl_1 = require("./shared_impl");
exports.hexToBigNumber = shared_impl_1.hexToBigNumber;
var shared_backend_1 = require("./shared_backend");
exports.isHex = shared_backend_1.isHex;
exports.stringToHex = shared_backend_1.stringToHex;
var BigNumber = ethers_1.ethers.BigNumber;
exports.isBigNumber = BigNumber.isBigNumber;
var bigNumberToBigInt = function (x) { return BigInt((0, CBR_1.bigNumberify)(x).toHexString()); };
exports.bigNumberToBigInt = bigNumberToBigInt;
var uintToBytes = function (i) { return (0, exports.bigNumberToHex)(i); };
exports.uintToBytes = uintToBytes;
var bigNumberToHex = function (u, size) {
    if (size === void 0) { size = 32; }
    var width = 8 * size;
    var format = "ufixed".concat(width, "x0");
    var nPos = (0, CBR_1.bigNumberify)(u).toTwos(width);
    // They took away padZeros so we have to use FixedNumber
    var nFix = ethers_1.ethers.FixedNumber.from(nPos.toString(), format);
    // XXX why do we slice off the 0x?
    return (0, shared_impl_1.hexlify)(nFix).slice(2);
};
exports.bigNumberToHex = bigNumberToHex;
var parseFixedPoint = function (x) {
    return (0, exports.parseInt)({ sign: x.sign, i: x.i.i }) / (0, CBR_1.bigNumberify)(x.i.scale).toNumber();
};
exports.parseFixedPoint = parseFixedPoint;
var parseInt = function (x) {
    return (0, CBR_1.bigNumberify)(x.i).toNumber() * (x.sign ? 1 : (-1));
};
exports.parseInt = parseInt;
exports.hasConsoleLogger = {
    log: console.log
};
var numberToFixedPoint = function (n) {
    var ns = n.toString();
    var decs = ns.includes('.')
        ? ns.split('.')[1].length
        : 0;
    var scale = Math.pow(10, decs);
    return {
        sign: n >= 0,
        i: { scale: (0, CBR_1.bigNumberify)(scale), i: (0, CBR_1.bigNumberify)(n * scale) }
    };
};
exports.numberToFixedPoint = numberToFixedPoint;
var numberToInt = function (n) {
    var sign = n >= 0;
    var i = (0, CBR_1.bigNumberify)(sign ? n : (-n));
    return { sign: sign, i: i };
};
exports.numberToInt = numberToInt;
//# sourceMappingURL=shared_user.js.map