"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Provider = exports.ethifyTxn = exports.ethifyOkReceipt = void 0;
var ethers_1 = require("ethers");
var await_timeout_1 = __importDefault(require("await-timeout"));
var CFX_util_1 = require("./CFX_util");
function epochToBlockNumber(x) {
    return __assign({ blockNumber: x.epochNumber }, x);
}
function ethifyOkReceipt(receipt) {
    if (receipt.outcomeStatus !== 0) {
        throw Error("Receipt outcomeStatus is nonzero: " + receipt.outcomeStatus);
    }
    return epochToBlockNumber(__assign({ status: 'ok' }, receipt));
}
exports.ethifyOkReceipt = ethifyOkReceipt;
function ethifyTxn(txn) {
    if (txn.status !== 0) {
        throw Error("Txn status is not 0: " + txn.status);
    }
    // It would appear that no eth-ification is actully necessary at this moment.
    // It might be nice to have blockNumber on here,
    // but it's not required.
    // Accomplishing that would require another API call...
    return txn;
}
exports.ethifyTxn = ethifyTxn;
// XXX bi: BigInt
function bi2bn(bi) {
    return ethers_1.ethers.BigNumber.from(bi.toString());
}
var Provider = /** @class */ (function () {
    function Provider(conflux) {
        this.conflux = conflux;
    }
    Provider.prototype.getBalance = function (address, epochNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = bi2bn;
                        return [4 /*yield*/, this.conflux.getBalance(address, epochNumber)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    Provider.prototype.getBlockNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Arbitrarily make the user wait.
                    // This is just because we tend to spam this a lot.
                    // It can help to increase this to 1000 or more if you need to debug.
                    return [4 /*yield*/, await_timeout_1["default"].set(50)];
                    case 1:
                        // Arbitrarily make the user wait.
                        // This is just because we tend to spam this a lot.
                        // It can help to increase this to 1000 or more if you need to debug.
                        _a.sent();
                        return [4 /*yield*/, this.conflux.getEpochNumber(CFX_util_1.defaultEpochTag)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Provider.prototype.getTransactionReceipt = function (transactionHash) {
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conflux.getTransactionReceipt(transactionHash)];
                    case 1:
                        r = _a.sent();
                        return [2 /*return*/, ethifyOkReceipt(r)];
                }
            });
        });
    };
    Provider.prototype.on = function () {
        var argz = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argz[_i] = arguments[_i];
        }
        void (argz);
        throw Error("on not yet implemented");
        // XXX
    };
    Provider.prototype.off = function () {
        var argz = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            argz[_i] = arguments[_i];
        }
        void (argz);
        throw Error("off not yet implemented");
        // XXX
    };
    Provider.prototype.getLogs = function (opts) {
        return __awaiter(this, void 0, void 0, function () {
            var cfxOpts, max_tries, e, tries, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cfxOpts = {
                            fromEpoch: opts.fromBlock,
                            toEpoch: opts.toBlock,
                            address: opts.address,
                            topics: opts.topics
                        };
                        max_tries = 20;
                        e = null;
                        tries = 1;
                        _a.label = 1;
                    case 1:
                        if (!(tries <= max_tries)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 6]);
                        return [4 /*yield*/, this.conflux.getLogs(cfxOpts)];
                    case 3: return [2 /*return*/, (_a.sent()).map(epochToBlockNumber)];
                    case 4:
                        err_1 = _a.sent();
                        e = err_1;
                        // XXX be pickier about which errs we are willing to catch
                        // XXX find some way to be sure more that `toEpoch` has been executed before trying again
                        return [4 /*yield*/, await_timeout_1["default"].set(50)];
                    case 5:
                        // XXX be pickier about which errs we are willing to catch
                        // XXX find some way to be sure more that `toEpoch` has been executed before trying again
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        tries++;
                        return [3 /*break*/, 1];
                    case 7: throw e;
                }
            });
        });
    };
    Provider.prototype.getTransaction = function (txnHash) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = ethifyTxn;
                        return [4 /*yield*/, this.conflux.getTransactionByHash(txnHash)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                }
            });
        });
    };
    return Provider;
}());
exports.Provider = Provider;
//# sourceMappingURL=cfxers_providers.js.map