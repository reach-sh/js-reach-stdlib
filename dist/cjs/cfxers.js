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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.Wallet = exports.BrowserWallet = exports.ContractFactory = exports.Contract = exports.Signer = exports.cfxsdk = exports.providers = exports.utils = exports.BigNumber = void 0;
var js_conflux_sdk_1 = __importDefault(require("js-conflux-sdk"));
exports.cfxsdk = js_conflux_sdk_1["default"];
var format = js_conflux_sdk_1["default"].format;
var ethers_1 = require("ethers");
var providers = __importStar(require("./cfxers_providers"));
exports.providers = providers;
var BigNumber = ethers_1.ethers.BigNumber, utils = ethers_1.ethers.utils;
exports.BigNumber = BigNumber;
exports.utils = utils;
var CFX_util_1 = require("./CFX_util");
var await_timeout_1 = __importDefault(require("await-timeout"));
var shared_impl_1 = require("./shared_impl");
// This file immitates the ethers.js API
var waitMs = 25;
// Recursively stringify BigNumbers
function unbn(arg) {
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
        for (var _i = 0, _a = Object.keys(arg); _i < _a.length; _i++) {
            var k = _a[_i];
            newArg[k] = unbn(arg[k]);
        }
        return newArg;
    }
    return arg;
}
function booleanize(arg) {
    if (typeof arg === 'boolean')
        return arg;
    if (typeof arg === 'number')
        return arg !== 0;
    // I don't quite understand why bools get represented this way sometimes, but they do.
    if (Array.isArray(arg) && arg.length === 1)
        return booleanize(arg[0]);
    // XXX handle more stuff
    throw Error("don't know how to booleanize '" + arg + "': " + typeof arg);
}
function conform(args, tys) {
    // XXX find a better way to do this stuff.
    args = unbn(args);
    if (Array.isArray(args)) {
        if (args.length !== tys.length) {
            (0, shared_impl_1.debug)("conform", "err", { args: args, tys: tys });
            throw Error("impossible: number of args (" + args.length + ") does not match number of tys (" + tys.length + ")");
        }
        for (var i in tys) {
            if (tys[i].type === 'tuple') {
                args[i] = conform(args[i], tys[i].components);
            }
            else if (tys[i].type === 'bool') {
                args[i] = booleanize(args[i]);
            }
            else {
                // XXX handle more stuff
                // debug(`conform untouched:`, args[i], tys[i])
            }
        }
    }
    return args;
}
function prepForConfluxPortal(txnOrig) {
    var hexStringify = function (n) { return '0x' + BigInt(n || '0').toString(16); };
    var txn = __assign({}, txnOrig);
    // value should always be present
    txn.value = hexStringify(txnOrig.value);
    // These fields are transformed if present
    // TODO: is it safe just to turn all number fields into hex strings?
    // Where is the "real" Conflux Portal source code to check this?
    for (var _i = 0, _a = ['storageLimit', 'gas']; _i < _a.length; _i++) {
        var field = _a[_i];
        if (txn[field] !== undefined)
            txn[field] = hexStringify(txnOrig[field]);
    }
    return txn;
}
var addEstimates = function (cfx, txn) { return __awaiter(void 0, void 0, void 0, function () {
    var numy, f, gas, storage, est, est_err, e_1, g, h, gasu;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, shared_impl_1.debug)("addEstimates 1: start:", txn);
                numy = function (n) { return BigInt((n === null || n === void 0 ? void 0 : n.toString()) || '0'); };
                f = function (xf) {
                    var x = txn[xf];
                    delete txn[xf];
                    return numy(x);
                };
                gas = f("gas");
                storage = f("storageLimit");
                (0, shared_impl_1.debug)("addEstimates 2:  orig:", { gas: gas, storage: storage });
                est = undefined;
                est_err = undefined;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cfx.estimateGasAndCollateral(txn)];
            case 2:
                est = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                est_err = e_1;
                return [3 /*break*/, 4];
            case 4:
                (0, shared_impl_1.debug)("addEstimates 3:   est:", { est: est, est_err: est_err });
                if (est) {
                    g = function (x, y) { return ((y > x) ? y : x); };
                    gas = g(gas, numy(est === null || est === void 0 ? void 0 : est.gasUsed));
                    storage = g(storage, numy(est === null || est === void 0 ? void 0 : est.storageCollateralized));
                }
                (0, shared_impl_1.debug)("addEstimates 4: eused:", { gas: gas, storage: storage });
                if (storage === undefined || storage === numy(0)) {
                    storage = numy(2048);
                }
                (0, shared_impl_1.debug)("addEstimates 5:  non0:", { gas: gas, storage: storage });
                h = function (x, y) { return numy(format.big(x).times(y).toFixed(0)); };
                gas = h(gas, cfx.defaultGasRatio);
                storage = h(storage, cfx.defaultStorageRatio);
                (0, shared_impl_1.debug)("addEstimates 6: ratio:", { gas: gas, storage: storage });
                gasu = gas;
                if (gas === numy('0')) {
                    gasu = undefined;
                }
                (0, shared_impl_1.debug)("addEstimates 7:   und:", { gasu: gasu, storage: storage });
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
    // {
    //   getEventTopic: (name: string) => string, // ?
    //   getEvent: (name: string) => {inputs: {name: string}[]},
    //   parseLog: (log: Log) => {args: {[k: string]: any}},
    // }
    function Contract(address, abi, wallet, receiptP, hash) {
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
            hash: hash,
            wait: function () { return __awaiter(_this, void 0, void 0, function () {
                var receipt, rcc;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, shared_impl_1.debug)("cfxers:Contract.wait", "start");
                            if (!receiptP) {
                                throw Error("No receipt promise to wait on");
                            }
                            return [4 /*yield*/, self._receiptP];
                        case 1:
                            receipt = _a.sent();
                            (0, shared_impl_1.debug)("cfxers:Contract.wait", "got receipt", receipt);
                            rcc = (0, CFX_util_1.address_cfxStandardize)(receipt.contractCreated);
                            if (self.address && self.address !== rcc) {
                                throw Error("Impossible: ctc addresses don't match: " + self.address + " vs " + rcc);
                            }
                            self.address = self.address || rcc;
                            if (self.deployTransaction.hash && self.deployTransaction.hash !== receipt.transactionHash) {
                                throw Error("Impossible: txn hashes don't match: " + self.deployTransaction.hash + " vs " + receipt.transactionHash);
                            }
                            self.deployTransaction.hash = self.deployTransaction.hash || receipt.transactionHash;
                            return [2 /*return*/, providers.ethifyOkReceipt(receipt)];
                    }
                });
            }); }
        };
        this.interface = new ethers_1.ethers.utils.Interface(this._abi);
        for (var _i = 0, _a = this._abi; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.type === 'function') {
                if (!blacklist.includes(item.name) && item.name !== 'address' && item.name !== 'deployTransaction' && item.name !== 'interface') {
                    this[item.name] = this._makeHandler(item);
                }
            }
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
                var txn, argsConformed, cfc, to, data, txnDat, res, transactionHash_1;
                var _a, _b;
                var _this = this;
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
                            if (!(mut !== 'view' && mut !== 'pure')) return [3 /*break*/, 4];
                            (0, shared_impl_1.debug)("cfxers:handler", fname, "waitable");
                            cfc = (_a = self._contract[fname]).call.apply(_a, argsConformed);
                            (0, shared_impl_1.debug)("cfxers:handler", fname, "cfc", cfc);
                            return [4 /*yield*/, addEstimates(this._wallet.provider.conflux, txn)];
                        case 1:
                            // @ts-ignore
                            txn = _c.sent();
                            to = cfc.to, data = cfc.data;
                            txnDat = __assign(__assign({}, txn), { to: to, data: data });
                            (0, shared_impl_1.debug)("cfxers:handler", fname, "txnDat", txnDat);
                            return [4 /*yield*/, _wallet.sendTransaction(__assign({}, txnDat))];
                        case 2:
                            res = _c.sent();
                            return [4 /*yield*/, res.wait()];
                        case 3:
                            transactionHash_1 = (_c.sent()).transactionHash;
                            // debug(`cfxers:handler`, fname, 'receipt');
                            // debug(transactionReceipt);
                            // const { transactionHash } = transactionReceipt;
                            return [2 /*return*/, {
                                    // XXX not sure what the distinction is supposed to be here
                                    wait: function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            (0, shared_impl_1.debug)('cfxers:handler', fname, 'wait');
                                            return [2 /*return*/, {
                                                    transactionHash: transactionHash_1
                                                }];
                                        });
                                    }); }
                                }];
                        case 4:
                            (0, shared_impl_1.debug)("cfxers:handler", fname, 'view');
                            return [4 /*yield*/, (_b = self._contract[fname]).call.apply(_b, argsConformed)];
                        case 5: 
                        // XXX in this case it doesn't return something with `wait`,
                        // it just returns the result. Weird design choice, ethers. =/
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
                        deployTxn = this.getDeployTransaction.apply(this, args);
                        resultP = wallet.sendTransaction(deployTxn);
                        return [4 /*yield*/, resultP];
                    case 1:
                        hash = (_b.sent()).transactionHash;
                        receiptP = waitReceipt(wallet.provider, hash);
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
            throw Error("cfxers: contract deployment expected " + expectedLen + " args but got " + args.length);
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
        var ccc = (_a = contract.constructor).call.apply(_a, argsConformed);
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
            var _a, provider, from, txn, value;
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
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this.cp.sendAsync({
                                    method: 'cfx_sendTransaction',
                                    params: [txn],
                                    from: from,
                                    value: value
                                }, function (err, data) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else {
                                        var transactionHash_2 = data.result;
                                        resolve({
                                            transactionHash: transactionHash_2,
                                            wait: function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, waitReceipt(provider, transactionHash_2)
                                                            // XXX return the whole receipt?
                                                        ];
                                                        case 1:
                                                            _a.sent();
                                                            // XXX return the whole receipt?
                                                            return [2 /*return*/, { transactionHash: transactionHash_2 }];
                                                    }
                                                });
                                            }); }
                                        });
                                    }
                                    ;
                                });
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return BrowserWallet;
}());
exports.BrowserWallet = BrowserWallet;
var Wallet = /** @class */ (function () {
    function Wallet(privateKey, provider) {
        this.privateKey = privateKey;
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
            this.account = this.provider.conflux.wallet.addPrivateKey(this.privateKey);
        }
        else {
            this.account = this.provider.conflux.wallet.addRandom();
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
            var from, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._requireConnected();
                        if (!this.provider)
                            throw Error("Impossible: provider is undefined");
                        from = this.getAddress();
                        txn = __assign(__assign({ from: from }, txn), { value: (txn.value || '0').toString() });
                        return [4 /*yield*/, addEstimates(this.provider.conflux, txn)];
                    case 1:
                        txn = _b.sent();
                        if (!(txn.to instanceof Promise)) return [3 /*break*/, 3];
                        _a = txn;
                        return [4 /*yield*/, txn.to];
                    case 2:
                        _a.to = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, _retryingSendTxn(this.provider, txn)];
                }
            });
        });
    };
    Wallet.createRandom = function () {
        return new Wallet();
    };
    Wallet.fromMnemonic = function (mnemonic, provider) {
        var sk = ethers_1.ethers.Wallet.fromMnemonic(mnemonic)._signingKey().privateKey;
        return new Wallet(sk, provider);
    };
    return Wallet;
}());
exports.Wallet = Wallet;
// XXX This is nutty
// Remember the last epoch that a given sender has sent
// and don't try to send again until it is later than that epoch.
// Note: requires addrs to be canonicalized first.
var lastEpochSent = {};
var epochWaitLock = {};
// XXX implement a queue, maybe?
function tryGetLock(obj, k) {
    if (!obj[k]) {
        // XXX is this actually threadsafe?
        obj[k] = true;
        return true;
    }
    return false;
}
function releaseLock(obj, k) {
    obj[k] = false;
}
function getLastSentAt(addr) {
    return lastEpochSent[addr] || -1;
}
function updateSentAt(addr, epoch) {
    lastEpochSent[addr] = Math.max(getLastSentAt(addr), epoch);
}
// Note: this relies on epochs moving on their own
// If there's ever a devnet where this is not the case,
// this will need to be adjusted.
var waitUntilSendableEpoch = function (provider, addr) { return __awaiter(void 0, void 0, void 0, function () {
    var current;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!tryGetLock(epochWaitLock, addr)) return [3 /*break*/, 2];
                // XXX fail after waiting too long?
                return [4 /*yield*/, await_timeout_1["default"].set(waitMs)];
            case 1:
                // XXX fail after waiting too long?
                _a.sent();
                return [3 /*break*/, 0];
            case 2: return [4 /*yield*/, provider.getBlockNumber()];
            case 3:
                if (!((current = _a.sent()) <= getLastSentAt(addr))) return [3 /*break*/, 5];
                return [4 /*yield*/, await_timeout_1["default"].set(waitMs)];
            case 4:
                _a.sent();
                return [3 /*break*/, 2];
            case 5:
                updateSentAt(addr, current);
                releaseLock(epochWaitLock, addr);
                return [2 /*return*/];
        }
    });
}); };
function _retryingSendTxn(provider, txnOrig) {
    return __awaiter(this, void 0, void 0, function () {
        var max_tries, addr, err, txnMut, _loop_1, out_tries_1, tries, state_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    max_tries = 2;
                    addr = txnOrig.from;
                    err = null;
                    txnMut = __assign({}, txnOrig);
                    _loop_1 = function (tries) {
                        var transactionHashP_1, transactionHash_3, e_2, es;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, waitUntilSendableEpoch(provider, addr)];
                                case 1:
                                    _b.sent();
                                    if (!err) return [3 /*break*/, 3];
                                    // XXX is this still needed?
                                    return [4 /*yield*/, await_timeout_1["default"].set(waitMs)];
                                case 2:
                                    // XXX is this still needed?
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    _b.trys.push([3, 5, , 6]);
                                    // Note: {...txn} because conflux is going to mutate it >=[
                                    txnMut = __assign({}, txnOrig);
                                    (0, shared_impl_1.debug)("_retryingSendTxn attempt", txnOrig);
                                    transactionHashP_1 = provider.conflux.sendTransaction(txnMut);
                                    return [4 /*yield*/, transactionHashP_1];
                                case 4:
                                    transactionHash_3 = _b.sent();
                                    (0, shared_impl_1.debug)("_retryingSendTxn sent", { txnOrig: txnOrig, txnMut: txnMut, transactionHash: transactionHash_3 });
                                    updateSentAt(addr, txnMut.epochHeight);
                                    return [2 /*return*/, { value: {
                                                transactionHash: transactionHash_3,
                                                wait: function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var r, e_3, r;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 4]);
                                                                return [4 /*yield*/, transactionHashP_1.confirmed({ delta: 1000, timeout: 60 * 1000 })];
                                                            case 1:
                                                                r = _a.sent();
                                                                (0, shared_impl_1.debug)("_retryingSendTxn receipt good", r);
                                                                return [2 /*return*/, { transactionHash: transactionHash_3 }];
                                                            case 2:
                                                                e_3 = _a.sent();
                                                                return [4 /*yield*/, provider.conflux.getTransactionReceipt(transactionHash_3)];
                                                            case 3:
                                                                r = _a.sent();
                                                                (0, shared_impl_1.debug)("_retryingSendTxn receipt bad", r);
                                                                throw e_3;
                                                            case 4: return [2 /*return*/];
                                                        }
                                                    });
                                                }); }
                                            } }];
                                case 5:
                                    e_2 = _b.sent();
                                    err = e_2;
                                    es = JSON.stringify(e_2);
                                    if (es.includes("stale nonce") || es.includes("same nonce")) {
                                        (0, shared_impl_1.debug)("_retryingSendTxn: nonce error, giving more tries");
                                        tries--;
                                    }
                                    (0, shared_impl_1.debug)("_retryingSendTxn fail", {
                                        txnOrig: txnOrig,
                                        txnMut: txnMut,
                                        e: e_2,
                                        tries: tries,
                                        max_tries: max_tries
                                    });
                                    return [2 /*return*/, (out_tries_1 = tries, "continue")];
                                case 6:
                                    out_tries_1 = tries;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    tries = 1;
                    _a.label = 1;
                case 1:
                    if (!(tries <= max_tries)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(tries)];
                case 2:
                    state_1 = _a.sent();
                    tries = out_tries_1;
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    _a.label = 3;
                case 3:
                    tries++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!err)
                        throw Error("impossible: no error to throw after " + max_tries + " failed attempts.");
                    throw err;
            }
        });
    });
}
function waitReceipt(provider, txnHash) {
    return __awaiter(this, void 0, void 0, function () {
        var maxTries, tries, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maxTries = 800;
                    tries = 1;
                    _a.label = 1;
                case 1:
                    if (!(tries <= maxTries)) return [3 /*break*/, 5];
                    return [4 /*yield*/, provider.getTransactionReceipt(txnHash)];
                case 2:
                    r = _a.sent();
                    if (r) {
                        if (r.outcomeStatus !== 0) {
                            throw Error("Transaction failed, outcomeStatus: " + r.outcomeStatus);
                        }
                        return [2 /*return*/, r];
                    }
                    return [4 /*yield*/, await_timeout_1["default"].set(waitMs)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    tries++;
                    return [3 /*break*/, 1];
                case 5: throw Error("Transaction timed out after " + maxTries * waitMs + " ms");
            }
        });
    });
}
//# sourceMappingURL=cfxers.js.map