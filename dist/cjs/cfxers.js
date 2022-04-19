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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Wallet = exports.BrowserWallet = exports.ContractFactory = exports.Contract = exports.Signer = exports.providers = exports.utils = exports.BigNumber = void 0;
// This file immitates the ethers.js API
var js_conflux_sdk_1 = __importDefault(require("js-conflux-sdk"));
var await_timeout_1 = __importDefault(require("await-timeout"));
var format = js_conflux_sdk_1["default"].format;
var ethers_1 = require("ethers");
var BigNumber = ethers_1.ethers.BigNumber, utils = ethers_1.ethers.utils;
exports.BigNumber = BigNumber;
exports.utils = utils;
var CFX_util_1 = require("./CFX_util");
var shared_impl_1 = require("./shared_impl");
var CFX_compiled_impl_1 = require("./CFX_compiled_impl");
var attachBlockNumbers = function (conflux, xs) { return __awaiter(void 0, void 0, void 0, function () {
    var actuallyLookup, cache, lookup, attachBlockNumber, out, _a, _b, _i, i, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                actuallyLookup = function (blockHash) { return __awaiter(void 0, void 0, void 0, function () {
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
                }); };
                cache = {};
                lookup = function (blockHash) { return __awaiter(void 0, void 0, void 0, function () {
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
                }); };
                attachBlockNumber = function (x) { return __awaiter(void 0, void 0, void 0, function () {
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
                            case 3: throw Error("No blockNumber or blockHash on log: ".concat(Object.keys(x)));
                        }
                    });
                }); };
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
}); };
var ethifyOkReceipt = function (receipt) {
    if (receipt.outcomeStatus !== 0) {
        throw Error("Receipt outcomeStatus is nonzero: ".concat(receipt.outcomeStatus));
    }
    return __assign({ status: 'ok' }, receipt);
};
var ethifyTxn = function (txn) {
    if (txn.status !== 0) {
        throw Error("Txn status is not 0: ".concat(txn.status));
    }
    // It would appear that no eth-ification is actully necessary at this moment.
    // It might be nice to have blockNumber on here,
    // but it's not required.
    // Accomplishing that would require another API call...
    return txn;
};
var providers;
(function (providers) {
    // XXX bi: BigInt
    var bi2bn = function (bi) {
        return ethers_1.ethers.BigNumber.from(bi.toString());
    };
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
                var r, _a, rbn;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.conflux.getTransactionReceipt(transactionHash)];
                        case 1:
                            r = _b.sent();
                            if (!r)
                                return [2 /*return*/, r];
                            return [4 /*yield*/, attachBlockNumbers(this.conflux, [r])];
                        case 2:
                            _a = __read.apply(void 0, [_b.sent(), 1]), rbn = _a[0];
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
        Provider.prototype.getLogs = function (iopts) {
            return __awaiter(this, void 0, void 0, function () {
                var opts, logs, alogs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            opts = iopts;
                            // {fromBlock: number, toBlock: number, address: string, topics: string[]}
                            (0, shared_impl_1.debug)("getLogs", "opts", opts);
                            if (opts.fromBlock === 0) {
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
        Provider.prototype.waitForTransaction = function (txnHash) {
            return __awaiter(this, void 0, void 0, function () {
                var dhead, r, howMany;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            dhead = "waitForTransaction";
                            r = undefined;
                            howMany = 0;
                            _a.label = 1;
                        case 1:
                            if (!!r) return [3 /*break*/, 5];
                            if (!(howMany++ > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, await_timeout_1["default"].set(500)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            (0, shared_impl_1.debug)(dhead, txnHash);
                            return [4 /*yield*/, this.getTransactionReceipt(txnHash)];
                        case 4:
                            r = _a.sent();
                            (0, shared_impl_1.debug)(dhead, txnHash, r);
                            return [3 /*break*/, 1];
                        case 5:
                            if (r.outcomeStatus !== 0) {
                                throw Error("Transaction failed, outcomeStatus: ".concat(r.outcomeStatus));
                            }
                            return [2 /*return*/, r];
                    }
                });
            });
        };
        return Provider;
    }());
    providers.Provider = Provider;
})(providers = exports.providers || (exports.providers = {}));
;
// Recursively stringify BigNumbers
var unbn = function (arg) {
    var e_1, _a;
    if (!arg)
        return arg;
    if (arg._isBigNumber)
        return arg.toString();
    if (Array.isArray(arg))
        return arg.map(unbn);
    if (typeof arg === 'string')
        return arg;
    if (Object.keys(arg).length > 0) {
        var newArg = {};
        try {
            for (var _b = __values(Object.keys(arg)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var k = _c.value;
                newArg[k] = unbn(arg[k]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return newArg;
    }
    return arg;
};
var booleanize = function (arg) {
    if (typeof arg === 'boolean')
        return arg;
    if (typeof arg === 'number')
        return arg !== 0;
    // I don't quite understand why bools get represented this way sometimes, but they do.
    if (Array.isArray(arg) && arg.length === 1)
        return booleanize(arg[0]);
    // XXX handle more stuff
    throw Error("don't know how to booleanize '".concat(arg, "': ").concat(typeof arg));
};
var conform = function (args, tys) {
    // XXX find a better way to do this stuff.
    args = unbn(args);
    if (Array.isArray(args)) {
        if (args.length !== tys.length) {
            (0, shared_impl_1.debug)("conform", "err", { args: args, tys: tys });
            throw Error("impossible: number of args (".concat(args.length, ") does not match number of tys (").concat(tys.length, ")"));
        }
        for (var i in tys) {
            var ty = tys[i].type;
            if (ty === 'tuple') {
                args[i] = conform(args[i], tys[i].components);
            }
            else if (ty === 'bool') {
                args[i] = booleanize(args[i]);
            }
            else if (ty === 'address') {
                args[i] = CFX_compiled_impl_1.T_Address.munge(CFX_compiled_impl_1.T_Address.canonicalize(args[i]));
            }
            else {
                // XXX handle more stuff
                (0, shared_impl_1.debug)("conform untouched:", args[i], tys[i]);
            }
        }
    }
    return args;
};
var prepForConfluxPortal = function (txnOrig) {
    var e_2, _a;
    var hexStringify = function (n) { return '0x' + BigInt(n || '0').toString(16); };
    var txn = __assign({}, txnOrig);
    // value should always be present
    txn.value = hexStringify(txnOrig.value);
    try {
        // These fields are transformed if present
        // TODO: is it safe just to turn all number fields into hex strings?
        // Where is the "real" Conflux Portal source code to check this?
        for (var _b = __values(['storageLimit', 'gas', 'nonce']), _c = _b.next(); !_c.done; _c = _b.next()) {
            var field = _c.value;
            if (txn[field] !== undefined)
                txn[field] = hexStringify(txnOrig[field]);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return txn;
};
var addEstimates = function (cfx, txn) { return __awaiter(void 0, void 0, void 0, function () {
    var dhead, numy, f, gas, storage, est, est_err, n, e_3, e_4, g, h, gasu;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dhead = 'addEstimates';
                (0, shared_impl_1.debug)(dhead, "1: start:", txn);
                numy = function (n) { return BigInt((n === null || n === void 0 ? void 0 : n.toString()) || '0'); };
                f = function (xf) {
                    var x = txn[xf];
                    delete txn[xf];
                    return numy(x);
                };
                gas = f("gas");
                storage = f("storageLimit");
                (0, shared_impl_1.debug)(dhead, "2:  orig:", { gas: gas, storage: storage });
                est = undefined;
                est_err = undefined;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cfx.getNextNonce(txn.from)];
            case 2:
                n = _a.sent();
                txn.nonce = n;
                (0, shared_impl_1.debug)(dhead, "n:nonce:", { n: n });
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                (0, shared_impl_1.debug)(dhead, "n:nonce:", { e: e_3 });
                return [3 /*break*/, 4];
            case 4:
                _a.trys.push([4, 6, , 7]);
                return [4 /*yield*/, cfx.estimateGasAndCollateral(txn)];
            case 5:
                est = _a.sent();
                return [3 /*break*/, 7];
            case 6:
                e_4 = _a.sent();
                est_err = e_4;
                return [3 /*break*/, 7];
            case 7:
                (0, shared_impl_1.debug)(dhead, "3:   est:", { est: est, est_err: est_err });
                if (est) {
                    g = function (x, y) { return ((y > x) ? y : x); };
                    gas = g(gas, numy(est === null || est === void 0 ? void 0 : est.gasUsed));
                    storage = g(storage, numy(est === null || est === void 0 ? void 0 : est.storageCollateralized));
                }
                (0, shared_impl_1.debug)(dhead, "4: eused:", { gas: gas, storage: storage });
                if (storage === undefined || storage === numy(0)) {
                    storage = numy(2048);
                }
                (0, shared_impl_1.debug)(dhead, "5:  non0:", { gas: gas, storage: storage });
                h = function (x, y) { return numy(format.big(x).times(y).toFixed(0)); };
                gas = h(gas, cfx.defaultGasRatio);
                storage = h(storage, cfx.defaultStorageRatio);
                (0, shared_impl_1.debug)(dhead, "6: ratio:", { gas: gas, storage: storage });
                gasu = gas;
                if (gas === numy('0')) {
                    gasu = undefined;
                }
                (0, shared_impl_1.debug)(dhead, "7:   und:", { gasu: gasu, storage: storage });
                txn.gas = gasu === null || gasu === void 0 ? void 0 : gasu.toString();
                txn.storageLimit = storage.toString();
                return [2 /*return*/, txn];
        }
    });
}); };
var Signer = /** @class */ (function () {
    function Signer() {
    }
    Signer.isSigner = function (x) {
        // XXX
        return x && x.sendTransaction instanceof Function;
    };
    return Signer;
}());
exports.Signer = Signer;
// compare to ethers.Contract
var Contract = /** @class */ (function () {
    function Contract(address, abi, wallet, receiptP, transactionHash) {
        var e_5, _a;
        var _this = this;
        this.address = address || undefined;
        var blacklist = Object.keys(this).filter(function (s) { return s[0] === '_'; });
        this._abi = (typeof abi === 'string') ? JSON.parse(abi) : abi;
        this._wallet = wallet;
        this._receiptP = receiptP;
        // @ts-ignore // ???
        this._contract = this._wallet.provider.conflux.Contract({
            abi: this._abi, address: this.address
        });
        var self = this;
        this.deployTransaction = {
            // @ts-ignore
            transactionHash: transactionHash,
            wait: function () { return __awaiter(_this, void 0, void 0, function () {
                var r, rcc, rth, dt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, shared_impl_1.debug)("cfxers:Contract.wait", "start");
                            if (!receiptP) {
                                throw Error("No receipt promise to wait on");
                            }
                            return [4 /*yield*/, self._receiptP];
                        case 1:
                            r = _a.sent();
                            (0, shared_impl_1.debug)("cfxers:Contract.wait", "got receipt", r);
                            rcc = (0, CFX_util_1.address_cfxStandardize)(r.contractCreated);
                            if (self.address && self.address !== rcc) {
                                throw Error("Impossible: ctc addresses don't match: ".concat(self.address, " vs ").concat(rcc));
                            }
                            self.address = self.address || rcc;
                            rth = r.transactionHash;
                            dt = self.deployTransaction;
                            if (dt.transactionHash && dt.transactionHash !== rth) {
                                throw Error("Impossible: txn hashes don't match: ".concat(dt.transactionHash, " vs ").concat(rth));
                            }
                            dt.transactionHash = rth;
                            return [2 /*return*/, ethifyOkReceipt(r)];
                    }
                });
            }); }
        };
        this.interface = new ethers_1.ethers.utils.Interface(this._abi);
        try {
            for (var _b = __values(this._abi), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                if (item.type === 'function') {
                    if (!blacklist.includes(item.name) && item.name !== 'address' && item.name !== 'deployTransaction' && item.name !== 'interface') {
                        this[item.name] = this._makeHandler(item);
                    }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    }
    Contract.prototype._makeHandler = function (abiFn) {
        var _this = this;
        var _a = this, _wallet = _a._wallet, iface = _a.interface;
        var fname = abiFn.name;
        var mut = abiFn.stateMutability;
        var from = _wallet.getAddress();
        var self = this;
        // XXX this should always be safe but maybe error handling around it just in case?
        // XXX handle the case where the same method name can have multiple input sizes/types?
        var inputs = iface.fragments.filter(function (x) { return x.name == fname; })[0].inputs;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var txn, argsConformed, cfc, to, data;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            (0, shared_impl_1.debug)("cfxers:handler", fname, 'call', { args: args });
                            txn = { from: from, value: '0' };
                            if (args.length === inputs.length + 1) {
                                txn = unbn(args.pop());
                                txn = __assign(__assign({ from: from }, txn), { value: (txn.value || '0').toString() });
                            }
                            args = unbn(args);
                            if (txn.gasLimit !== undefined) {
                                txn.gas = txn.gasLimit;
                            }
                            delete txn.gasLimit;
                            (0, shared_impl_1.debug)("cfxers:handler", fname, 'txn', { txn: txn, args: args });
                            argsConformed = conform(args, inputs);
                            (0, shared_impl_1.debug)("cfxers:handler", fname, 'conform', argsConformed);
                            if (!(mut !== 'view' && mut !== 'pure')) return [3 /*break*/, 3];
                            (0, shared_impl_1.debug)("cfxers:handler", fname, "waitable");
                            cfc = (_a = self._contract[fname]).call.apply(_a, __spreadArray([], __read(argsConformed), false));
                            (0, shared_impl_1.debug)("cfxers:handler", fname, "cfc", cfc);
                            to = cfc.to, data = cfc.data;
                            to = to || self.address;
                            txn = __assign(__assign({}, txn), { to: to, data: data });
                            return [4 /*yield*/, addEstimates(this._wallet.provider.conflux, txn)];
                        case 1:
                            // @ts-ignore
                            txn = _c.sent();
                            (0, shared_impl_1.debug)("cfxers:handler", fname, "txn", txn);
                            return [4 /*yield*/, _wallet.sendTransaction(txn)];
                        case 2: return [2 /*return*/, _c.sent()];
                        case 3:
                            (0, shared_impl_1.debug)("cfxers:handler", fname, 'view');
                            return [4 /*yield*/, (_b = self._contract[fname]).call.apply(_b, __spreadArray([], __read(argsConformed), false))];
                        case 4: 
                        // In this case it doesn't return something with `wait`, it just
                        // returns the result. Weird design choice, ethers. =/
                        // @ts-ignore
                        return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
    };
    return Contract;
}());
exports.Contract = Contract;
var ContractFactory = /** @class */ (function () {
    function ContractFactory(abi, bytecode, wallet) {
        this.abi = (typeof abi === 'string') ? JSON.parse(abi) : abi;
        this.bytecode = bytecode;
        this.wallet = wallet;
        this.interface = new ethers_1.ethers.utils.Interface(this.abi);
    }
    // compare/contrast
    // https://github.com/ethers-io/ethers.js/blob/master/packages/contracts/src.ts/index.ts
    // XXX this code can return Contract directly
    // Should it wait?
    ContractFactory.prototype.deploy = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a, abi, wallet, conflux, deployTxn, resultP, hash, receiptP, txnRes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, abi = _a.abi, wallet = _a.wallet;
                        (0, shared_impl_1.debug)("deploy", { wallet: wallet });
                        wallet._requireConnected();
                        if (!wallet.provider)
                            throw Error("Impossible: provider is undefined");
                        conflux = wallet.provider.conflux;
                        deployTxn = this.getDeployTransaction.apply(this, __spreadArray([], __read(args), false));
                        resultP = wallet.sendTransaction(deployTxn);
                        return [4 /*yield*/, resultP];
                    case 1:
                        hash = (_b.sent()).transactionHash;
                        receiptP = wallet.provider.waitForTransaction(hash);
                        return [4 /*yield*/, conflux.getTransactionByHash(hash)];
                    case 2:
                        txnRes = _b.sent();
                        (0, shared_impl_1.debug)("deploy result", { hash: hash, txnRes: txnRes });
                        return [2 /*return*/, new Contract(undefined, abi, wallet, receiptP, hash)];
                }
            });
        });
    };
    ;
    // XXX Unlike ethers, this requires having a wallet
    ContractFactory.prototype.getDeployTransaction = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        // Note: can't bind keyword "interface"
        var _b = this, abi = _b.abi, bcode = _b.bytecode, iface = _b.interface, wallet = _b.wallet;
        (0, shared_impl_1.debug)("getDeployTransaction", { wallet: wallet });
        var bytecode = bcode.slice(0, 2) === '0x' || bcode === '' ? bcode : '0x' + bcode;
        if (!wallet.provider)
            throw Error("Impossible: provider is undefined");
        var conflux = wallet.provider.conflux;
        // XXX reduce duplication with _makeHandler
        var txnOverrides = {};
        if (args.length === iface.deploy.inputs.length + 1) {
            txnOverrides = unbn(args.pop());
        }
        var expectedLen = iface.deploy.inputs.length;
        if (args.length !== expectedLen) {
            throw Error("cfxers: contract deployment expected ".concat(expectedLen, " args but got ").concat(args.length));
        }
        var contract = conflux.Contract({ abi: abi, bytecode: bytecode });
        var from = wallet.getAddress();
        var value = BigNumber.from(0).toString();
        var txn = __assign({ from: from, value: value }, txnOverrides);
        var argsConformed = conform(args, iface.deploy.inputs);
        (0, shared_impl_1.debug)("cfxers:Contract.deploy", { argsConformed: argsConformed, txn: txn });
        // Note: this usage of `.call` here is because javascript is insane.
        // XXX 2021-06-07 Dan: This works for the cjs compilation target, but does it work for the other targets?
        // @ts-ignore
        var ccc = (_a = contract.constructor).call.apply(_a, __spreadArray([], __read(argsConformed), false));
        // debug(`cfxers:Contract.deploy`, `cfx ctc constructed`, ccc);
        var data = ccc.data;
        return __assign(__assign({}, txn), { data: data });
    };
    return ContractFactory;
}());
exports.ContractFactory = ContractFactory;
var BrowserWallet = /** @class */ (function () {
    // Call await cp.enable() before this
    function BrowserWallet(cp, address, provider) {
        this.cp = cp;
        this.address = (0, CFX_util_1.address_cfxStandardize)(address);
        this.provider = provider; // XXX just use cp?
    }
    BrowserWallet.prototype.connect = function (provider) {
        if (this.provider) {
            throw Error("impossible: BrowserWallet already connected");
        }
        this.provider = provider;
        return this;
    };
    BrowserWallet.prototype._requireConnected = function () {
        if (!this.provider) {
            throw Error("Wallet has no Provider, please call .connect()");
        }
    };
    BrowserWallet.prototype.getAddress = function () { return this.address; };
    BrowserWallet.prototype.sendTransaction = function (txnOrig) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, provider, from, txn, value, data, transactionHash;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._requireConnected();
                        _a = this, provider = _a.provider, from = _a.address;
                        if (!provider)
                            throw Error("Impossible: provider is undefined");
                        txn = prepForConfluxPortal(__assign(__assign({}, txnOrig), { from: from }));
                        value = txn.value;
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return _this.cp.sendAsync({
                                from: from,
                                value: value,
                                method: 'cfx_sendTransaction',
                                params: [txn]
                            }, function (err, data) {
                                if (err)
                                    reject(err);
                                else
                                    resolve(data);
                            }); })];
                    case 1:
                        data = _b.sent();
                        (0, shared_impl_1.debug)('sendTransaction', { txn: txn, data: data });
                        if (!data) {
                            throw Error("No data returned from ConfluxPortal.sendAsync");
                        }
                        transactionHash = data.result;
                        return [2 /*return*/, {
                                transactionHash: transactionHash,
                                wait: function () { return provider.waitForTransaction(transactionHash); }
                            }];
                }
            });
        });
    };
    return BrowserWallet;
}());
exports.BrowserWallet = BrowserWallet;
// Because Conflux doesn't like it when you add the same thing twice
var accsByPk = {};
function addAcc(conflux, privateKey) {
    var acc = accsByPk[privateKey];
    if (!acc) {
        acc = conflux.wallet.addPrivateKey(privateKey);
        accsByPk[privateKey] = acc;
    }
    return acc;
}
var Wallet = /** @class */ (function () {
    function Wallet(privateKey, provider, mnem) {
        this.privateKey = privateKey;
        if (mnem) {
            this._mnemonic = function () { return ({ phrase: mnem }); };
        }
        if (provider) {
            this.connect(provider);
        }
    }
    Wallet.prototype.connect = function (provider) {
        if (this.provider) {
            throw Error("Wallet already connected");
        }
        this.provider = provider;
        if (this.privateKey) {
            this.account = addAcc(this.provider.conflux, this.privateKey);
        }
        else {
            throw Error("no privateKey given");
        }
        return this;
    };
    Wallet.prototype._requireConnected = function () {
        if (!this.provider) {
            throw Error("Wallet has no Provider, please call .connect()");
        }
        if (!this.account) {
            throw Error("Wallet has no Account, please call .connect()");
        }
    };
    Wallet.prototype.getAddress = function () {
        this._requireConnected();
        if (!this.account)
            throw Error("Impossible: account is undefined");
        return (0, CFX_util_1.address_cfxStandardize)(this.account.toString());
    };
    Wallet.prototype.sendTransaction = function (txn) {
        return __awaiter(this, void 0, void 0, function () {
            var p, from, _a, dhead, howMany, _loop_1, state_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._requireConnected();
                        p = this.provider;
                        if (!p)
                            throw Error("Impossible: provider is undefined");
                        from = this.getAddress();
                        txn = __assign(__assign({ from: from }, txn), { value: (txn.value || '0').toString() });
                        return [4 /*yield*/, addEstimates(p.conflux, txn)];
                    case 1:
                        txn = _b.sent();
                        if (!(txn.to instanceof Promise)) return [3 /*break*/, 3];
                        _a = txn;
                        return [4 /*yield*/, txn.to];
                    case 2:
                        _a.to = _b.sent();
                        _b.label = 3;
                    case 3:
                        dhead = "retryingSendTxn";
                        howMany = 0;
                        _loop_1 = function () {
                            var txnMut, th_1, got, howMany_1, e_6, es;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        if (!(howMany++ > 0)) return [3 /*break*/, 2];
                                        return [4 /*yield*/, await_timeout_1["default"].set(500)];
                                    case 1:
                                        _c.sent();
                                        _c.label = 2;
                                    case 2:
                                        (0, shared_impl_1.debug)(dhead, "attempt", howMany, txn);
                                        txnMut = __assign({}, txn);
                                        _c.label = 3;
                                    case 3:
                                        _c.trys.push([3, 9, , 10]);
                                        return [4 /*yield*/, p.conflux.sendTransaction(txnMut)];
                                    case 4:
                                        th_1 = _c.sent();
                                        (0, shared_impl_1.debug)(dhead, "sent", { txn: txn, txnMut: txnMut, th: th_1 });
                                        got = null;
                                        howMany_1 = 0;
                                        _c.label = 5;
                                    case 5:
                                        if (!!(got && got.blockHash)) return [3 /*break*/, 8];
                                        if (howMany_1++ > 2 * 60 * 5) {
                                            throw Error("".concat(dhead, " timeout in mining ").concat(th_1));
                                        }
                                        (0, shared_impl_1.debug)(dhead, 'get', howMany_1, th_1);
                                        return [4 /*yield*/, await_timeout_1["default"].set(500)];
                                    case 6:
                                        _c.sent();
                                        return [4 /*yield*/, p.conflux.getTransactionByHash(th_1)];
                                    case 7:
                                        // @ts-ignore
                                        got = _c.sent();
                                        return [3 /*break*/, 5];
                                    case 8: return [2 /*return*/, { value: __assign(__assign({}, got), { transactionHash: th_1, wait: function () { return p.waitForTransaction(th_1); } }) }];
                                    case 9:
                                        e_6 = _c.sent();
                                        es = (0, shared_impl_1.j2s)(e_6);
                                        (0, shared_impl_1.debug)(dhead, "err", { txn: txn, e: e_6, es: es });
                                        //if ( es.includes("stale nonce") || es.includes("same nonce") || es.includes('tx already exist') ) {
                                        //  debug(dhead, `nonce error`);
                                        if (e_6.code === -32077) {
                                            (0, shared_impl_1.debug)(dhead, 'catchingUp');
                                        }
                                        else {
                                            throw e_6;
                                        }
                                        return [3 /*break*/, 10];
                                    case 10: return [2 /*return*/];
                                }
                            });
                        };
                        _b.label = 4;
                    case 4:
                        if (!true) return [3 /*break*/, 6];
                        return [5 /*yield**/, _loop_1()];
                    case 5:
                        state_1 = _b.sent();
                        if (typeof state_1 === "object")
                            return [2 /*return*/, state_1.value];
                        return [3 /*break*/, 4];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Wallet.createRandom = function () {
        var mnem = ethers_1.ethers.Wallet.createRandom()._mnemonic().phrase;
        return Wallet.fromMnemonic(mnem);
    };
    Wallet.fromMnemonic = function (mnemonic, provider) {
        var sk = ethers_1.ethers.Wallet.fromMnemonic(mnemonic)._signingKey().privateKey;
        return new Wallet(sk, provider, mnemonic);
    };
    return Wallet;
}());
exports.Wallet = Wallet;
;
//# sourceMappingURL=cfxers.js.map