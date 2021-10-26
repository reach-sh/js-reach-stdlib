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
var shared_impl_1 = require("./shared_impl");
var waitMs = 1;
function attachBlockNumbers(conflux, xs) {
    return __awaiter(this, void 0, void 0, function () {
        function actuallyLookup(blockHash) {
            return __awaiter(this, void 0, void 0, function () {
                var block;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, shared_impl_1.debug)("actuallyLookup", { blockHash: blockHash });
                            return [4 /*yield*/, conflux.getBlockByHash(blockHash)];
                        case 1:
                            block = _a.sent();
                            (0, shared_impl_1.debug)("actuallyLookup", { blockHash: blockHash }, 'res', block);
                            // @ts-ignore // XXX requires an update to js-conflux-sdk types
                            return [2 /*return*/, parseInt(block.blockNumber)];
                    }
                });
            });
        }
        function lookup(blockHash) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!!(blockHash in cache)) return [3 /*break*/, 2];
                            _a = cache;
                            _b = blockHash;
                            return [4 /*yield*/, actuallyLookup(blockHash)];
                        case 1:
                            _a[_b] = _c.sent();
                            _c.label = 2;
                        case 2: return [2 /*return*/, cache[blockHash]];
                    }
                });
            });
        }
        function attachBlockNumber(x) {
            return __awaiter(this, void 0, void 0, function () {
                var blockHash, blockNumber;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!x.blockNumber) return [3 /*break*/, 1];
                            return [2 /*return*/, x];
                        case 1:
                            if (!x.blockHash) return [3 /*break*/, 3];
                            blockHash = x.blockHash;
                            return [4 /*yield*/, lookup(blockHash)];
                        case 2:
                            blockNumber = _a.sent();
                            return [2 /*return*/, __assign(__assign({}, x), { blockNumber: blockNumber })];
                        case 3: throw Error("No blockNumber or blockHash on log: " + Object.keys(x));
                    }
                });
            });
        }
        var cache, out, _a, _b, _i, i, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    ;
                    cache = {};
                    out = [];
                    _a = [];
                    for (_b in xs)
                        _a.push(_b);
                    _i = 0;
                    _e.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    i = _a[_i];
                    _c = out;
                    _d = i;
                    return [4 /*yield*/, attachBlockNumber(xs[i])];
                case 2:
                    _c[_d] = _e.sent();
                    _e.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, out];
            }
        });
    });
}
function ethifyOkReceipt(receipt) {
    if (receipt.outcomeStatus !== 0) {
        throw Error("Receipt outcomeStatus is nonzero: " + receipt.outcomeStatus);
    }
    return __assign({ status: 'ok' }, receipt);
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
            var epochNumber, block;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conflux.getEpochNumber(CFX_util_1.defaultEpochTag)];
                    case 1:
                        epochNumber = _a.sent();
                        return [4 /*yield*/, this.conflux.getBlockByEpochNumber(epochNumber, true)];
                    case 2:
                        block = _a.sent();
                        // @ts-ignore
                        (0, shared_impl_1.debug)('getBlockNumber', epochNumber, block.epochNumber, block.blockNumber);
                        // @ts-ignore
                        return [2 /*return*/, parseInt(block.blockNumber)];
                }
            });
        });
    };
    Provider.prototype.getBlock = function (which) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, shared_impl_1.debug)("getBlock", which);
                        return [4 /*yield*/, this.conflux.getBlockByBlockNumber(which, true)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Provider.prototype.getTransactionReceipt = function (transactionHash) {
        return __awaiter(this, void 0, void 0, function () {
            var r, rbn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Arbitrarily make the user wait.
                    return [4 /*yield*/, await_timeout_1["default"].set(waitMs)];
                    case 1:
                        // Arbitrarily make the user wait.
                        _a.sent();
                        return [4 /*yield*/, this.conflux.getTransactionReceipt(transactionHash)];
                    case 2:
                        r = _a.sent();
                        if (!r)
                            return [2 /*return*/, r];
                        return [4 /*yield*/, attachBlockNumbers(this.conflux, [r])];
                    case 3:
                        rbn = (_a.sent())[0];
                        return [2 /*return*/, ethifyOkReceipt(rbn)];
                }
            });
        });
    };
    Provider.prototype.getCode = function (address, defaultEpoch) {
        if (defaultEpoch === void 0) { defaultEpoch = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.conflux.getCode(address, defaultEpoch)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ;
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
            var logs, alogs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, shared_impl_1.debug)("getLogs", "opts", opts);
                        if (opts.fromBlock == 0) {
                            opts.fromBlock = 1;
                            (0, shared_impl_1.debug)("getLogs", "opts", opts);
                        }
                        return [4 /*yield*/, this.conflux.getLogs(opts)];
                    case 1:
                        logs = _a.sent();
                        (0, shared_impl_1.debug)("getLogs", "result", logs);
                        return [4 /*yield*/, attachBlockNumbers(this.conflux, logs)];
                    case 2:
                        alogs = _a.sent();
                        (0, shared_impl_1.debug)("getLogs", "aresult", alogs);
                        return [2 /*return*/, alogs];
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