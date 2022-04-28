var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// This can depend on the shared backend and impl
import { ethers } from 'ethers';
import { bigNumberify, bigNumberToNumber } from './CBR';
import { hexlify, hexToBigNumber, } from './shared_impl';
import { isHex, stringToHex, } from './shared_backend';
export { isHex, stringToHex, bigNumberify, bigNumberToNumber, hexToBigNumber };
var BigNumber = ethers.BigNumber;
export var isBigNumber = BigNumber.isBigNumber;
export var bigNumberToBigInt = function (x) { return BigInt(bigNumberify(x).toHexString()); };
export var uintToBytes = function (i) { return bigNumberToHex(i); };
export var bigNumberToHex = function (u, size) {
    if (size === void 0) { size = 32; }
    var width = 8 * size;
    var format = "ufixed".concat(width, "x0");
    var nPos = bigNumberify(u).toTwos(width);
    // They took away padZeros so we have to use FixedNumber
    var nFix = ethers.FixedNumber.from(nPos.toString(), format);
    // XXX why do we slice off the 0x?
    return hexlify(nFix).slice(2);
};
export var parseFixedPoint = function (x) {
    return parseInt({ sign: x.sign, i: x.i.i }) / bigNumberify(x.i.scale).toNumber();
};
export var parseInt = function (x) {
    return bigNumberify(x.i).toNumber() * (x.sign ? 1 : (-1));
};
export var hasConsoleLogger = {
    log: console.log
};
export var numberToFixedPoint = function (n) {
    var ns = n.toString();
    var decs = ns.includes('.')
        ? ns.split('.')[1].length
        : 0;
    var scale = Math.pow(10, decs);
    return {
        sign: n >= 0,
        i: { scale: bigNumberify(scale), i: bigNumberify(n * scale) }
    };
};
export var numberToInt = function (n) {
    var sign = n >= 0;
    var i = bigNumberify(sign ? n : (-n));
    return { sign: sign, i: i };
};
var disconnectSymbol = Symbol("Reach disconnect");
export var withDisconnect = function (f) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, f()];
            case 1: return [2 /*return*/, (_a.sent())];
            case 2:
                e_1 = _a.sent();
                if (Array.isArray(e_1) && e_1[0] === disconnectSymbol) {
                    return [2 /*return*/, e_1[1]];
                }
                else {
                    throw e_1;
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var disconnect = function (t) { throw [disconnectSymbol, t]; };
//# sourceMappingURL=shared_user.js.map