"use strict";
exports.__esModule = true;
exports.hasConsoleLogger = exports.parseInt = exports.parseFixedPoint = exports.bigNumberToHex = exports.uintToBytes = exports.isBigNumber = exports.hexToBigNumber = exports.bigNumberToNumber = exports.bigNumberify = exports.stringToHex = exports.isHex = void 0;
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
var uintToBytes = function (i) { return exports.bigNumberToHex(i); };
exports.uintToBytes = uintToBytes;
var bigNumberToHex = function (u, size) {
    if (size === void 0) { size = 32; }
    var width = 8 * size;
    var format = "ufixed" + width + "x0";
    var nPos = CBR_1.bigNumberify(u).toTwos(width);
    // They took away padZeros so we have to use FixedNumber
    var nFix = ethers_1.ethers.FixedNumber.from(nPos.toString(), format);
    // XXX why do we slice off the 0x?
    return shared_impl_1.hexlify(nFix).slice(2);
};
exports.bigNumberToHex = bigNumberToHex;
var parseFixedPoint = function (x) {
    return exports.parseInt({ sign: x.sign, i: x.i.i }) / CBR_1.bigNumberify(x.i.scale).toNumber();
};
exports.parseFixedPoint = parseFixedPoint;
var parseInt = function (x) {
    return CBR_1.bigNumberify(x.i).toNumber() * (x.sign ? 1 : (-1));
};
exports.parseInt = parseInt;
exports.hasConsoleLogger = {
    log: console.log
};
//# sourceMappingURL=shared_user.js.map