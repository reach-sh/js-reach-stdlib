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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
exports.__esModule = true;
exports.setProviderByName = exports.providerEnvByName = exports.setProviderByEnv = exports.setProvider = exports.getProvider = exports.setIndexer = exports.getIndexer = exports.setAlgodClient = exports.getAlgodClient = exports.setLedger = exports.getLedger = exports.hasRandom = exports.randomUInt = exports.T_Token = exports.T_Struct = exports.T_Digest = exports.T_Address = exports.T_Bytes = exports.T_Data = exports.T_Object = exports.T_Array = exports.T_Tuple = exports.T_UInt = exports.T_Bool = exports.T_Null = exports.digest = exports.tokenEq = exports.addressEq = exports.getTxnParams = exports.waitForConfirmation = exports.setAlgoSigner = exports.setSignStrategy = exports.getSignStrategy = exports.setWaitPort = exports.digestEq = exports.bytesEq = exports.lt = exports.le = exports.gt = exports.ge = exports.eq = exports.Array_set = exports.assert = exports.protect = exports.div = exports.mul = exports.mod = exports.sub = exports.add = exports.connector = void 0;
exports.reachStdlib = exports.formatAddress = exports.verifyContract = exports.wait = exports.waitUntilTime = exports.getNetworkTime = exports.newAccountFromAlgoSigner = exports.newAccountFromSecret = exports.newAccountFromMnemonic = exports.getDefaultAccount = exports.formatCurrency = exports.minimumBalance = exports.parseCurrency = exports.atomicUnit = exports.standardUnit = exports.newTestAccount = exports.fundFromFaucet = exports.createAccount = exports.balanceOf = exports.connectAccount = exports.transfer = exports.setFaucet = exports.getFaucet = void 0;
exports.connector = 'ALGO';
// XXX: use @types/algosdk when we can
var algosdk_1 = __importDefault(require("algosdk"));
var hi_base32_1 = __importDefault(require("hi-base32"));
var ethers_1 = require("ethers");
var await_timeout_1 = __importDefault(require("await-timeout"));
var buffer_1 = __importDefault(require("buffer"));
var msgpack = __importStar(require("@msgpack/msgpack"));
// DEBUG: uncomment this for debugging in browser
// @ts-ignore
// import algosdk__src__transaction from 'algosdk/src/transaction';
var Buffer = buffer_1["default"].Buffer;
var version_1 = require("./version");
var shared_impl_1 = require("./shared_impl");
var shared_backend_1 = require("./shared_backend");
var shared_user_1 = require("./shared_user");
var waitPort_1 = __importDefault(require("./waitPort"));
var ALGO_compiled_1 = require("./ALGO_compiled");
var shim_1 = require("./shim");
exports.add = ALGO_compiled_1.stdlib.add, exports.sub = ALGO_compiled_1.stdlib.sub, exports.mod = ALGO_compiled_1.stdlib.mod, exports.mul = ALGO_compiled_1.stdlib.mul, exports.div = ALGO_compiled_1.stdlib.div, exports.protect = ALGO_compiled_1.stdlib.protect, exports.assert = ALGO_compiled_1.stdlib.assert, exports.Array_set = ALGO_compiled_1.stdlib.Array_set, exports.eq = ALGO_compiled_1.stdlib.eq, exports.ge = ALGO_compiled_1.stdlib.ge, exports.gt = ALGO_compiled_1.stdlib.gt, exports.le = ALGO_compiled_1.stdlib.le, exports.lt = ALGO_compiled_1.stdlib.lt, exports.bytesEq = ALGO_compiled_1.stdlib.bytesEq, exports.digestEq = ALGO_compiled_1.stdlib.digestEq;
__exportStar(require("./shared_user"), exports);
var reachAlgoBackendVersion = 1;
// Helpers
// Parse CBR into Public Key
var cbr2algo_addr = function (x) {
    return algosdk_1["default"].encodeAddress(Buffer.from(x.slice(2), 'hex'));
};
function uint8ArrayToStr(a, enc) {
    if (enc === void 0) { enc = 'utf8'; }
    if (!(a instanceof Uint8Array)) {
        console.log(a);
        throw Error("Expected Uint8Array, got " + a);
    }
    return Buffer.from(a).toString(enc);
}
var _e = shared_impl_1.replaceableThunk(function () { return true; }), getWaitPort = _e[0], setWaitPort = _e[1];
exports.setWaitPort = setWaitPort;
function wait1port(server, port) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!getWaitPort())
                        return [2 /*return*/];
                    return [4 /*yield*/, waitPort_1["default"](server, port)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
;
// type SignStrategy = 'mnemonic' | 'AlgoSigner' | 'MyAlgo';
var _f = shared_impl_1.replaceableThunk(function () { return 'mnemonic'; }), getSignStrategy = _f[0], setSignStrategy = _f[1];
exports.getSignStrategy = getSignStrategy;
exports.setSignStrategy = setSignStrategy;
var _g = shared_impl_1.replaceableThunk(function () { return __awaiter(void 0, void 0, void 0, function () {
    var AlgoSigner;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!shim_1.window.AlgoSigner) return [3 /*break*/, 2];
                AlgoSigner = shim_1.window.AlgoSigner;
                return [4 /*yield*/, AlgoSigner.connect()];
            case 1:
                _a.sent();
                return [2 /*return*/, AlgoSigner];
            case 2: 
            // TODO: wait for a few seconds and try again before giving up
            throw Error("Can't find AlgoSigner. Please refresh the page and try again.");
        }
    });
}); }), getAlgoSigner = _g[0], setAlgoSigner = _g[1];
exports.setAlgoSigner = setAlgoSigner;
if (shim_1.process.env.REACH_CONNECTOR_MODE == 'ALGO-browser'
    // Yes, this is dumb. TODO something better
    || shim_1.process.env.REACH_CONNECTOR_MODE === 'ETH-browser') {
    setWaitPort(false);
}
var rawDefaultToken = 'c87f5580d7a866317b4bfe9e8b8d1dda955636ccebfa88c12b414db208dd9705';
var rawDefaultItoken = 'reach-devnet';
var getLastRound = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, exports.getAlgodClient()];
        case 1: return [4 /*yield*/, (_a.sent()).status()["do"]()];
        case 2: return [2 /*return*/, (_a.sent())['last-round']];
    }
}); }); };
var waitForConfirmation = function (txId, untilRound) { return __awaiter(void 0, void 0, void 0, function () {
    var doOrDie, checkTooLate, dhead, client, checkAlgod, checkIndexer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                doOrDie = function (p) { return __awaiter(void 0, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                return [4 /*yield*/, p];
                            case 1: return [2 /*return*/, _a.sent()];
                            case 2:
                                e_1 = _a.sent();
                                return [2 /*return*/, { 'exn': e_1 }];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                checkTooLate = function (lastLastRound) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, c, msg, lastRound;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = lastLastRound > 0 ?
                                    [client.statusAfterBlock(lastLastRound),
                                        "waiting until after " + lastLastRound] :
                                    [client.status(),
                                        "looking up current round"], c = _a[0], msg = _a[1];
                                shared_impl_1.debug.apply(void 0, __spreadArray(__spreadArray([], dhead), [msg]));
                                return [4 /*yield*/, c["do"]()];
                            case 1:
                                lastRound = (_b.sent())['last-round'];
                                if (untilRound && untilRound < lastRound) {
                                    throw Error("waitForConfirmation: Too late: " + lastRound + " > " + untilRound);
                                }
                                else {
                                    return [2 /*return*/, lastRound];
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                dhead = ['waitForConfirmation', txId];
                return [4 /*yield*/, exports.getAlgodClient()];
            case 1:
                client = _a.sent();
                checkAlgod = function (lastLastRound) { return __awaiter(void 0, void 0, void 0, function () {
                    var lastRound, info;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, checkTooLate(lastLastRound)];
                            case 1:
                                lastRound = _a.sent();
                                return [4 /*yield*/, doOrDie(client.pendingTransactionInformation(txId)["do"]())];
                            case 2:
                                info = _a.sent();
                                shared_impl_1.debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['info', info]));
                                if (!info['exn']) return [3 /*break*/, 4];
                                shared_impl_1.debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['switching to indexer on error']));
                                return [4 /*yield*/, checkIndexer(lastRound)];
                            case 3: return [2 /*return*/, _a.sent()];
                            case 4:
                                if (!(info['confirmed-round'] > 0)) return [3 /*break*/, 5];
                                shared_impl_1.debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['confirmed']));
                                return [2 /*return*/, info];
                            case 5:
                                if (!(info['pool-error'] === '')) return [3 /*break*/, 7];
                                shared_impl_1.debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['still in pool, trying again']));
                                return [4 /*yield*/, checkAlgod(lastRound)];
                            case 6: return [2 /*return*/, _a.sent()];
                            case 7: throw Error("waitForConfirmation: error confirming: " + JSON.stringify(info));
                        }
                    });
                }); };
                checkIndexer = function (lastLastRound) { return __awaiter(void 0, void 0, void 0, function () {
                    var lastRound, indexer, q, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, checkTooLate(lastLastRound)];
                            case 1:
                                lastRound = _a.sent();
                                return [4 /*yield*/, exports.getIndexer()];
                            case 2:
                                indexer = _a.sent();
                                q = indexer.lookupTransactionByID(txId);
                                return [4 /*yield*/, doOrDie(doQuery_(JSON.stringify(dhead), q))];
                            case 3:
                                res = _a.sent();
                                shared_impl_1.debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['indexer', res]));
                                if (!res['exn']) return [3 /*break*/, 5];
                                shared_impl_1.debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['indexer failed, trying again']));
                                return [4 /*yield*/, checkIndexer(lastRound)];
                            case 4: return [2 /*return*/, _a.sent()];
                            case 5: return [2 /*return*/, res['transaction']];
                        }
                    });
                }); };
                return [4 /*yield*/, checkAlgod(0)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.waitForConfirmation = waitForConfirmation;
var sendAndConfirm = function (stxs) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, lastRound, txID, sendme, client, req, e_2, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = stxs[0], lastRound = _a.lastRound, txID = _a.txID;
                sendme = stxs.map(function (stx) { return stx.tx; });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, exports.getAlgodClient()];
            case 2:
                client = _b.sent();
                req = client.sendRawTransaction(sendme);
                // @ts-ignore
                shared_impl_1.debug('sendAndConfirm:', base64ify(req.txnBytesToPost));
                return [4 /*yield*/, req["do"]()];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                e_2 = _b.sent();
                throw { type: 'sendRawTransaction', e: e_2 };
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, exports.waitForConfirmation(txID, lastRound)];
            case 6: return [2 /*return*/, _b.sent()];
            case 7:
                e_3 = _b.sent();
                throw { type: 'waitForConfirmation', e: e_3 };
            case 8: return [2 /*return*/];
        }
    });
}); };
// Backend
var compileTEAL = function (label, code) { return __awaiter(void 0, void 0, void 0, function () {
    var s, r, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shared_impl_1.debug('compile', label);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, exports.getAlgodClient()];
            case 2: return [4 /*yield*/, (_a.sent()).compile(code)["do"]()];
            case 3:
                r = _a.sent();
                s = 200;
                return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                s = typeof e_4 === 'object' ? e_4.statusCode : 'not object';
                r = e_4;
                return [3 /*break*/, 5];
            case 5:
                if (s == 200) {
                    shared_impl_1.debug('compile', label, 'succeeded:', r);
                    r.src = code;
                    r.result = base64ToUI8A(r.result);
                    // debug('compile transformed:', r);
                    return [2 /*return*/, r];
                }
                else {
                    throw Error("compile " + label + " failed: " + s + ": " + JSON.stringify(r));
                }
                return [2 /*return*/];
        }
    });
}); };
var getTxnParams = function () { return __awaiter(void 0, void 0, void 0, function () {
    var params;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shared_impl_1.debug("fillTxn: getting params");
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 5];
                return [4 /*yield*/, exports.getAlgodClient()];
            case 2: return [4 /*yield*/, (_a.sent()).getTransactionParams()["do"]()];
            case 3:
                params = _a.sent();
                shared_impl_1.debug('fillTxn: got params:', params);
                if (params.firstRound !== 0) {
                    return [2 /*return*/, params];
                }
                shared_impl_1.debug("...but firstRound is 0, so let's wait and try again.");
                // Assumption: firstRound will move past 0 on its own.
                return [4 /*yield*/, await_timeout_1["default"].set(1000)];
            case 4:
                // Assumption: firstRound will move past 0 on its own.
                _a.sent();
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getTxnParams = getTxnParams;
function regroup(thisAcc, txns) {
    // Sorry this is so dumb.
    // Basically, if these go thru AlgoSigner,
    // it will mangle them,
    //  so we need to recalculate the group hash.
    if (thisAcc.AlgoSigner) {
        var roundtrip_txns = txns
            .map(function (x) { return clean_for_AlgoSigner(x); })
            .map(function (x) { return unclean_for_AlgoSigner(x); });
        // console.log(`deployP: group`);
        // console.log(txns[0].group);
        // console.log(Buffer.from(txns[0].group, 'base64').toString('base64'));
        // console.log({...txns[0]});
        algosdk_1["default"].assignGroupID(roundtrip_txns);
        // console.log(`deploy: roundtrip group`);
        // console.log(Buffer.from(roundtrip_txns[0].group, 'base64').toString('base64'));
        var group = roundtrip_txns[0].group;
        // The same thing, but more paranoid:
        // const group = Buffer.from(roundtrip_txns[0].group, 'base64').toString('base64');
        for (var _i = 0, txns_1 = txns; _i < txns_1.length; _i++) {
            var txn = txns_1[_i];
            txn.group = group;
        }
        // console.log({...txns[0]});
        return roundtrip_txns;
    }
    else {
        return txns;
    }
}
// A copy/paste of some logic from AlgoSigner
// packages/extension/src/background/messaging/task.ts
function unclean_for_AlgoSigner(txnOrig) {
    var txn = __assign({}, txnOrig);
    Object.keys(__assign({}, txnOrig)).forEach(function (key) {
        if (txn[key] === undefined || txn[key] === null) {
            delete txn[key];
        }
    });
    // Modify base64 encoded fields
    if ('note' in txn && txn.note !== undefined) {
        txn.note = new Uint8Array(Buffer.from(txn.note));
    }
    // Application transactions only
    if (txn && txn.type === 'appl') {
        if ('appApprovalProgram' in txn) {
            txn.appApprovalProgram = base64ToUI8A(txn.appApprovalProgram);
        }
        if ('appClearProgram' in txn) {
            txn.appClearProgram = base64ToUI8A(txn.appClearProgram);
        }
        if ('appArgs' in txn) {
            var tempArgs = [];
            txn.appArgs.forEach(function (element) {
                tempArgs.push(base64ToUI8A(element));
            });
            txn.appArgs = tempArgs;
        }
    }
    // Note: this part is not copy/pasted from AlgoSigner,
    // and isn't even strictly necessary,
    // but it is nice for getting the same signatures from algosdk & AlgoSigner
    if ('group' in txn) {
        txn.group = base64ToUI8A(txn.group);
    }
    return txn;
}
var clean_for_AlgoSigner = function (txnOrig) {
    // Make a copy with just the properties, because reasons
    var txn = __assign({}, txnOrig);
    // AlgoSigner does weird things with fees if you don't specify flatFee
    txn.flatFee = true;
    // "Creation of PaymentTx has extra or invalid fields: name,tag,appArgs."
    delete txn.name;
    delete txn.tag;
    // uncaught (in promise) lease must be a Uint8Array.
    // it is... but how about we just delete it instead
    // This is presumed safe when lease is empty
    if (txn.lease instanceof Uint8Array && txn.lease.length === 0) {
        delete txn.lease;
    }
    else {
        console.log(txn.lease);
        throw Error("Impossible: non-empty lease");
    }
    // Creation of ApplTx has extra or invalid fields: nonParticipation
    if (!txn.nonParticipation) {
        delete txn.nonParticipation;
    }
    else {
        throw Error("Impossible: expected falsy nonParticipation, got: " + txn.nonParticipation);
    }
    // "Creation of ApplTx has extra or invalid fields: name,tag."
    if (txn.type !== 'appl') {
        delete txn.appArgs;
    }
    else {
        if (txn.appArgs) {
            if (txn.appArgs.length === 0) {
                txn.appArgs = [];
            }
            else {
                txn.appArgs = txn.appArgs.map(function (arg) { return uint8ArrayToStr(arg, 'base64'); });
            }
        }
    }
    // Validation failed for transaction because of invalid properties [from,to]
    // closeRemainderTo can cause an error w/ js-algorand-sdk addr parsing
    for (var _i = 0, _a = ['from', 'to', 'closeRemainderTo']; _i < _a.length; _i++) {
        var field = _a[_i];
        if (txn[field] && txn[field].publicKey) {
            txn[field] = algosdk_1["default"].encodeAddress(txn[field].publicKey);
        }
    }
    // Weirdly, AlgoSigner *requires* the note to be a string
    // note is the only field that needs to be utf8-encoded, so far...
    for (var _b = 0, _c = ['note']; _b < _c.length; _b++) {
        var field = _c[_b];
        if (txn[field] && typeof txn[field] !== 'string') {
            txn[field] = uint8ArrayToStr(txn[field], 'utf8');
        }
    }
    // Uncaught (in promise) First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.
    // No idea what it's talking about, but probably GenesisHash?
    // And some more uint8Array BS
    for (var _d = 0, _e = ['genesisHash', 'appApprovalProgram', 'appClearProgram', 'group']; _d < _e.length; _d++) {
        var field = _e[_d];
        if (txn[field] && typeof txn[field] !== 'string') {
            txn[field] = uint8ArrayToStr(txn[field], 'base64');
        }
    }
    return txn;
};
var sign_and_send_sync = function (label, networkAccount, txn) { return __awaiter(void 0, void 0, void 0, function () {
    var txn_s, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, signTxn(networkAccount, txn)];
            case 1:
                txn_s = _a.sent();
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, sendAndConfirm([txn_s])];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                e_5 = _a.sent();
                console.log(e_5);
                throw Error(label + " txn failed:\n" + JSON.stringify(txn) + "\nwith:\n" + JSON.stringify(e_5));
            case 5: return [2 /*return*/];
        }
    });
}); };
// XXX I'd use x.replaceAll if I could (not supported in this node version), but it would be better to extend ConnectorInfo so these are functions
var replaceAll = function (orig, what, whatp) {
    var once = orig.replace(what, whatp);
    if (once === orig) {
        return orig;
    }
    else {
        return replaceAll(once, what, whatp);
    }
};
var replaceUint8Array = function (label, arr, x) {
    return replaceAll(x, "\"{{" + label + "}}\"", "base32(" + hi_base32_1["default"].encode(arr).toString() + ")");
};
var replaceAddr = function (label, addr, x) {
    return replaceUint8Array(label, algosdk_1["default"].decodeAddress(addr).publicKey, x);
};
function must_be_supported(bin) {
    var algob = bin._Connectors.ALGO;
    var unsupported = algob.unsupported, version = algob.version;
    if (version !== reachAlgoBackendVersion) {
        throw Error("This Reach compiled backend does not match the expectations of this Reach standard library: expected " + reachAlgoBackendVersion + ", but got " + version + "; update your compiler and recompile!");
    }
    if (unsupported.length > 0) {
        var reasons = unsupported.map(function (s) { return " * " + s; }).join('\n');
        throw Error("This Reach application is not supported on Algorand for the following reasons:\n" + reasons);
    }
}
// Get these from stdlib
var MaxTxnLife = 1000;
var LogicSigMaxSize = 1000;
var MaxAppArgs = 16;
var MaxAppTotalArgLen = 2048;
var MaxAppProgramLen = 1024;
var MaxAppTxnAccounts = 4;
var HowManyAccounts = MaxAppTxnAccounts + 1;
function compileFor(bin, info) {
    return __awaiter(this, void 0, void 0, function () {
        var ApplicationID, Deployer, algob, appApproval, appClear, ctc, steps, stepargs, subst_appid, subst_creator, checkLen, ctc_bin, subst_ctc, appApproval_subst, stepCode_bin, appApproval_bin, appClear_bin;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ApplicationID = info.ApplicationID, Deployer = info.Deployer;
                    must_be_supported(bin);
                    algob = bin._Connectors.ALGO;
                    appApproval = algob.appApproval, appClear = algob.appClear, ctc = algob.ctc, steps = algob.steps, stepargs = algob.stepargs;
                    subst_appid = function (x) {
                        return replaceUint8Array('ApplicationID', exports.T_UInt.toNet(shared_user_1.bigNumberify(ApplicationID)), x);
                    };
                    subst_creator = function (x) {
                        return replaceAddr('Deployer', Deployer, x);
                    };
                    checkLen = function (label, actual, expected) {
                        shared_impl_1.debug("checkLen", { label: label, actual: actual, expected: expected });
                        if (actual > expected) {
                            throw Error("This Reach application is not supported by Algorand: " + label + " length is " + actual + ", but should be less than " + expected + ".");
                        }
                    };
                    return [4 /*yield*/, compileTEAL('ctc_subst', subst_creator(subst_appid(ctc)))];
                case 1:
                    ctc_bin = _a.sent();
                    checkLen("Escrow Contract", ctc_bin.result.length, LogicSigMaxSize);
                    subst_ctc = function (x) {
                        return replaceAddr('ContractAddr', ctc_bin.hash, x);
                    };
                    appApproval_subst = appApproval;
                    return [4 /*yield*/, Promise.all(steps.map(function (mc, mi) { return __awaiter(_this, void 0, void 0, function () {
                            var mN, mc_subst, cr, sa;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!mc) {
                                            return [2 /*return*/, null];
                                        }
                                        mN = "m" + mi;
                                        mc_subst = subst_creator(subst_ctc(subst_appid(mc)));
                                        return [4 /*yield*/, compileTEAL(mN, mc_subst)];
                                    case 1:
                                        cr = _a.sent();
                                        checkLen(mN + " Contract", cr.result.length, LogicSigMaxSize);
                                        sa = stepargs[mi];
                                        if (sa) {
                                            checkLen(mN + " Contract Arguments Count", sa.count, MaxAppArgs);
                                            checkLen(mN + " Contract Arguments Length", sa.size, MaxAppTotalArgLen);
                                        }
                                        appApproval_subst =
                                            replaceAddr(mN, cr.hash, appApproval_subst);
                                        return [2 /*return*/, cr];
                                }
                            });
                        }); }))];
                case 2:
                    stepCode_bin = _a.sent();
                    return [4 /*yield*/, compileTEAL('appApproval_subst', appApproval_subst)];
                case 3:
                    appApproval_bin = _a.sent();
                    checkLen("Approval Contract", appApproval_bin.result.length, MaxAppProgramLen);
                    return [4 /*yield*/, compileTEAL('appClear', appClear)];
                case 4:
                    appClear_bin = _a.sent();
                    checkLen("Clear Contract", appClear_bin.result.length, MaxAppProgramLen);
                    return [2 /*return*/, { appApproval: appApproval_bin,
                            appClear: appClear_bin,
                            ctc: ctc_bin,
                            steps: stepCode_bin
                        }];
            }
        });
    });
}
// const ui8z = new Uint8Array();
var base64ToUI8A = function (x) { return Uint8Array.from(Buffer.from(x, 'base64')); };
var base64ify = function (x) { return Buffer.from(x).toString('base64'); };
var format_failed_request = function (e) {
    var ep = JSON.parse(JSON.stringify(e));
    var db64 = ep.req ?
        (ep.req.data ? base64ify(ep.req.data) :
            "no data, but " + JSON.stringify(Object.keys(ep.req))) :
        "no req, but " + JSON.stringify(Object.keys(ep));
    var msg = e.text ? JSON.parse(e.text) : e;
    return "\n" + db64 + "\n" + JSON.stringify(msg);
};
var doQuery_ = function (dhead, query) { return __awaiter(void 0, void 0, void 0, function () {
    var retries, res, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shared_impl_1.debug(dhead, '--- QUERY =', query);
                retries = 10;
                _a.label = 1;
            case 1:
                if (!(retries > 0)) return [3 /*break*/, 9];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 8]);
                return [4 /*yield*/, query["do"]()];
            case 3:
                res = _a.sent();
                return [3 /*break*/, 9];
            case 4:
                e_6 = _a.sent();
                if (!(e_6.errno === -111)) return [3 /*break*/, 6];
                shared_impl_1.debug(dhead, '--- NO CONNECTION, RETRYING', retries--);
                return [4 /*yield*/, await_timeout_1["default"].set(500)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6: throw Error(dhead + " --- QUERY FAIL: " + JSON.stringify(e_6));
            case 7: return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 1];
            case 9:
                shared_impl_1.debug(dhead, '--- RESULT =', res);
                return [2 /*return*/, res];
        }
    });
}); };
var doQuery = function (dhead, query, pred) {
    if (pred === void 0) { pred = (function (x) { void (x); return true; }); }
    return __awaiter(void 0, void 0, void 0, function () {
        var res, txns, ptxns, txn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, doQuery_(dhead, query)];
                case 1:
                    res = _a.sent();
                    txns = res.transactions;
                    ptxns = txns.filter(pred);
                    if (ptxns.length == 0) {
                        return [2 /*return*/, { succ: false, round: res['current-round'] }];
                    }
                    txn = ptxns.reduce(function (accum, x) {
                        return (x['confirmed-round'] < accum['confirmed-round']) ? x : accum;
                    }, ptxns[0]);
                    return [2 /*return*/, { succ: true, txn: txn }];
            }
        });
    });
};
// ****************************************************************************
// Common Interface Exports
// ****************************************************************************
exports.addressEq = ALGO_compiled_1.stdlib.addressEq, exports.tokenEq = ALGO_compiled_1.stdlib.tokenEq, exports.digest = ALGO_compiled_1.stdlib.digest;
exports.T_Null = ALGO_compiled_1.typeDefs.T_Null, exports.T_Bool = ALGO_compiled_1.typeDefs.T_Bool, exports.T_UInt = ALGO_compiled_1.typeDefs.T_UInt, exports.T_Tuple = ALGO_compiled_1.typeDefs.T_Tuple, exports.T_Array = ALGO_compiled_1.typeDefs.T_Array, exports.T_Object = ALGO_compiled_1.typeDefs.T_Object, exports.T_Data = ALGO_compiled_1.typeDefs.T_Data, exports.T_Bytes = ALGO_compiled_1.typeDefs.T_Bytes, exports.T_Address = ALGO_compiled_1.typeDefs.T_Address, exports.T_Digest = ALGO_compiled_1.typeDefs.T_Digest, exports.T_Struct = ALGO_compiled_1.typeDefs.T_Struct, exports.T_Token = ALGO_compiled_1.typeDefs.T_Token;
exports.randomUInt = (_a = shared_impl_1.makeRandom(8), _a.randomUInt), exports.hasRandom = _a.hasRandom;
exports.getLedger = (_b = shared_impl_1.replaceableThunk(function () { return DEFAULT_ALGO_LEDGER; }), _b[0]), exports.setLedger = _b[1];
function getLedgerFromAlgoSigner(AlgoSigner) {
    // XXX: get AlgoSigner to tell us what Ledger is "currently selected"
    // since that ability doesn't actually exist, we operate based off of setLedger()
    void (AlgoSigner);
    return exports.getLedger();
}
function waitIndexerFromEnv(env) {
    return __awaiter(this, void 0, void 0, function () {
        var ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT, ALGO_INDEXER_TOKEN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ALGO_INDEXER_SERVER = env.ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT = env.ALGO_INDEXER_PORT, ALGO_INDEXER_TOKEN = env.ALGO_INDEXER_TOKEN;
                    return [4 /*yield*/, wait1port(ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new algosdk_1["default"].Indexer(ALGO_INDEXER_TOKEN, ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT)];
            }
        });
    });
}
function waitAlgodClientFromEnv(env) {
    return __awaiter(this, void 0, void 0, function () {
        var ALGO_SERVER, ALGO_PORT, ALGO_TOKEN;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ALGO_SERVER = env.ALGO_SERVER, ALGO_PORT = env.ALGO_PORT, ALGO_TOKEN = env.ALGO_TOKEN;
                    return [4 /*yield*/, wait1port(ALGO_SERVER, ALGO_PORT)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, new algosdk_1["default"].Algodv2(ALGO_TOKEN, ALGO_SERVER, ALGO_PORT)];
            }
        });
    });
}
// TODO: read token from scripts/algorand-devnet/algorand_data/algod.token
exports.getAlgodClient = (_c = shared_impl_1.replaceableThunk(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shared_impl_1.debug("Setting algod client to default");
                return [4 /*yield*/, waitAlgodClientFromEnv(envDefaultsALGO(shim_1.process.env))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }), _c[0]), exports.setAlgodClient = _c[1];
exports.getIndexer = (_d = shared_impl_1.replaceableThunk(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                shared_impl_1.debug("setting indexer to default");
                return [4 /*yield*/, waitIndexerFromEnv(envDefaultsALGO(shim_1.process.env))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }), _d[0]), exports.setIndexer = _d[1];
function getProvider() {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = {};
                    return [4 /*yield*/, exports.getAlgodClient()];
                case 1:
                    _a.algodClient = _b.sent();
                    return [4 /*yield*/, exports.getIndexer()];
                case 2: return [2 /*return*/, (_a.indexer = _b.sent(),
                        _a.ledger = exports.getLedger(),
                        _a)];
            }
        });
    });
}
exports.getProvider = getProvider;
function setProvider(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, provider];
                case 1:
                    provider = _a.sent();
                    // XXX doesn't waitPort these, because these are opaque to us.
                    // should we do something similar where we wait for /health to give us a 200 response?
                    exports.setAlgodClient((function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, provider.algodClient];
                    }); }); })());
                    exports.setIndexer((function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, provider.indexer];
                    }); }); })());
                    exports.setLedger(provider.ledger);
                    return [2 /*return*/];
            }
        });
    });
}
exports.setProvider = setProvider;
var localhostProviderEnv = {
    ALGO_LEDGER: 'Reach Devnet',
    ALGO_SERVER: 'http://localhost',
    ALGO_PORT: '4180',
    ALGO_TOKEN: rawDefaultToken,
    ALGO_INDEXER_SERVER: 'http://localhost',
    ALGO_INDEXER_PORT: '8980',
    ALGO_INDEXER_TOKEN: rawDefaultItoken
};
var DEFAULT_ALGO_LEDGER = localhostProviderEnv.ALGO_LEDGER;
var DEFAULT_ALGO_SERVER = localhostProviderEnv.ALGO_SERVER;
var DEFAULT_ALGO_PORT = localhostProviderEnv.ALGO_PORT;
var DEFAULT_ALGO_TOKEN = localhostProviderEnv.ALGO_TOKEN;
var DEFAULT_ALGO_INDEXER_SERVER = localhostProviderEnv.ALGO_INDEXER_SERVER;
var DEFAULT_ALGO_INDEXER_PORT = localhostProviderEnv.ALGO_INDEXER_PORT;
var DEFAULT_ALGO_INDEXER_TOKEN = localhostProviderEnv.ALGO_INDEXER_TOKEN;
function serverLooksLikeRandlabs(server) {
    return server.toLowerCase().includes('algoexplorerapi.io');
}
function envDefaultALGOPort(port, defaultPort, server) {
    // Some simple guessing
    return port !== undefined ? port
        : serverLooksLikeRandlabs(server) ? ''
            : defaultPort;
}
function envDefaultALGOToken(token, defaultToken, server, port) {
    // Some simple guessing
    // port is not currently used for this guessing, but could be in the future
    void (port);
    return token !== undefined ? token
        : serverLooksLikeRandlabs(server) ? ''
            : defaultToken;
}
function guessRandlabsLedger(server) {
    if (server === undefined)
        return undefined;
    server = server.toLowerCase();
    if (server.startsWith('https://algoexplorerapi.io')) {
        return 'MainNet';
    }
    else if (server.startsWith('https://testnet.algoexplorerapi.io')) {
        return 'TestNet';
    }
    else if (server.startsWith('https://betanet.algoexplorerapi.io')) {
        return 'BetaNet';
    }
    return undefined;
}
function envDefaultALGOLedger(ledger, defaultLedger, server, port) {
    // Some simple guessing
    // port is not currently used for this guessing, but could be in the future
    void (port);
    return ledger !== undefined ? ledger
        : serverLooksLikeRandlabs(server) ? guessRandlabsLedger(ledger)
            : defaultLedger;
}
function envDefaultsALGO(env) {
    var ALGO_SERVER = shared_impl_1.envDefault(env.ALGO_SERVER, DEFAULT_ALGO_SERVER);
    var ALGO_PORT = envDefaultALGOPort(env.ALGO_PORT, DEFAULT_ALGO_PORT, ALGO_SERVER);
    var ALGO_TOKEN = envDefaultALGOToken(env.ALGO_TOKEN, DEFAULT_ALGO_TOKEN, ALGO_SERVER, ALGO_PORT);
    var ALGO_LEDGER = envDefaultALGOLedger(env.ALGO_LEDGER, DEFAULT_ALGO_LEDGER, ALGO_SERVER, ALGO_PORT);
    var ALGO_INDEXER_SERVER = shared_impl_1.envDefault(env.ALGO_INDEXER_SERVER, DEFAULT_ALGO_INDEXER_SERVER);
    var ALGO_INDEXER_PORT = envDefaultALGOPort(env.ALGO_INDEXER_PORT, DEFAULT_ALGO_INDEXER_PORT, ALGO_INDEXER_SERVER);
    var ALGO_INDEXER_TOKEN = envDefaultALGOToken(env.ALGO_INDEXER_TOKEN, DEFAULT_ALGO_INDEXER_TOKEN, ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT);
    return {
        ALGO_LEDGER: ALGO_LEDGER,
        ALGO_SERVER: ALGO_SERVER,
        ALGO_PORT: ALGO_PORT,
        ALGO_TOKEN: ALGO_TOKEN,
        ALGO_INDEXER_SERVER: ALGO_INDEXER_SERVER,
        ALGO_INDEXER_PORT: ALGO_INDEXER_PORT,
        ALGO_INDEXER_TOKEN: ALGO_INDEXER_TOKEN
    };
}
function setProviderByEnv(env) {
    // Note: This doesn't just immediately call setProviderByEnv,
    // because here we can actually take the opportunity to wait1port.
    var fullEnv = envDefaultsALGO(env);
    exports.setAlgodClient(waitAlgodClientFromEnv(fullEnv));
    exports.setIndexer(waitIndexerFromEnv(fullEnv));
    exports.setLedger(fullEnv.ALGO_LEDGER);
}
exports.setProviderByEnv = setProviderByEnv;
function randlabsProviderEnv(ALGO_LEDGER) {
    var prefix = ALGO_LEDGER === 'MainNet' ? '' : ALGO_LEDGER.toLowerCase() + ".";
    var RANDLABS_BASE = "https://" + prefix + "algoexplorerapi.io";
    return {
        ALGO_LEDGER: ALGO_LEDGER,
        ALGO_SERVER: RANDLABS_BASE,
        ALGO_PORT: '',
        ALGO_TOKEN: '',
        ALGO_INDEXER_SERVER: RANDLABS_BASE + "/idx2",
        ALGO_INDEXER_PORT: '',
        ALGO_INDEXER_TOKEN: ''
    };
}
function providerEnvByName(providerName) {
    switch (providerName) {
        case 'MainNet': return randlabsProviderEnv('MainNet');
        case 'TestNet': return randlabsProviderEnv('TestNet');
        case 'BetaNet': return randlabsProviderEnv('BetaNet');
        case 'randlabs/MainNet': return randlabsProviderEnv('MainNet');
        case 'randlabs/TestNet': return randlabsProviderEnv('TestNet');
        case 'randlabs/BetaNet': return randlabsProviderEnv('BetaNet');
        case 'LocalHost': return localhostProviderEnv;
        default: throw Error("Unrecognized provider name: " + providerName);
    }
}
exports.providerEnvByName = providerEnvByName;
function setProviderByName(providerName) {
    return setProviderByEnv(providerEnvByName(providerName));
}
exports.setProviderByName = setProviderByName;
// eslint-disable-next-line max-len
var rawFaucetDefaultMnemonic = 'husband sock drift razor piece february loop nose crew object salon come sketch frost grocery capital young strategy catalog dial seminar sword betray absent army';
var _h = shared_impl_1.replaceableThunk(function () { return __awaiter(void 0, void 0, void 0, function () {
    var ledger, FAUCET;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ledger = exports.getLedger();
                if (ledger !== localhostProviderEnv.ALGO_LEDGER) {
                    throw Error("Cannot automatically use faucet for ledger '" + ledger + "'; if you want to use a custom faucet, use setFaucet");
                }
                FAUCET = algosdk_1["default"].mnemonicToSecretKey(shared_impl_1.envDefault(shim_1.process.env.ALGO_FAUCET_PASSPHRASE, rawFaucetDefaultMnemonic));
                return [4 /*yield*/, exports.connectAccount(FAUCET)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); }), getFaucet = _h[0], setFaucet = _h[1];
exports.getFaucet = getFaucet;
exports.setFaucet = setFaucet;
var NOTE_Reach = new Uint8Array(Buffer.from("Reach " + version_1.VERSION));
var makeTransferTxn = function (from, to, value, token, ps, closeTo) {
    if (closeTo === void 0) { closeTo = undefined; }
    var valuen = shared_user_1.bigNumberToNumber(value);
    var txn = token ?
        algosdk_1["default"].makeAssetTransferTxnWithSuggestedParams(from, to, closeTo, undefined, valuen, NOTE_Reach, shared_user_1.bigNumberToNumber(token), ps)
        :
            algosdk_1["default"].makePaymentTxnWithSuggestedParams(from, to, valuen, closeTo, NOTE_Reach, ps);
    return txn;
};
var transfer = function (from, to, value, token) {
    if (token === void 0) { token = undefined; }
    return __awaiter(void 0, void 0, void 0, function () {
        var sender, receiver, valuebn, ps, txn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sender = from.networkAccount;
                    receiver = to.networkAccount.addr;
                    valuebn = shared_user_1.bigNumberify(value);
                    return [4 /*yield*/, exports.getTxnParams()];
                case 1:
                    ps = _a.sent();
                    txn = makeTransferTxn(sender.addr, receiver, valuebn, token, ps);
                    return [4 /*yield*/, sign_and_send_sync("transfer " + JSON.stringify(from) + " " + JSON.stringify(to) + " " + valuebn, sender, txn)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
exports.transfer = transfer;
function signTxn(networkAccount, txnOrig) {
    return __awaiter(this, void 0, void 0, function () {
        var sk, AlgoSigner, tx, ret, txn, stx_obj, ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sk = networkAccount.sk, AlgoSigner = networkAccount.AlgoSigner;
                    if (!(sk && !AlgoSigner)) return [3 /*break*/, 1];
                    tx = txnOrig.signTxn(sk);
                    ret = {
                        tx: tx,
                        txID: txnOrig.txID().toString(),
                        lastRound: txnOrig.lastRound
                    };
                    shared_impl_1.debug('signed sk_ret');
                    shared_impl_1.debug({ txID: ret.txID });
                    shared_impl_1.debug(msgpack.decode(ret.tx));
                    return [2 /*return*/, ret];
                case 1:
                    if (!AlgoSigner) return [3 /*break*/, 3];
                    txn = clean_for_AlgoSigner(txnOrig);
                    // Note: don't delete the following,
                    // it is extremely useful for debugging when stuff changes wrt AlgoSigner/algosdk clashes
                    // if (sk) {
                    //   const re_tx = txnOrig.signTxn ? txnOrig : new algosdk__src__transaction.Transaction(txnOrig);
                    //   re_tx.group = txnOrig.group;
                    //   const sk_tx = re_tx.signTxn(sk);
                    //   const sk_ret = {
                    //     tx: sk_tx,
                    //     txID: re_tx.txID().toString(),
                    //     lastRound: txnOrig.lastRound,
                    //   };
                    //   console.log('signed sk_ret');
                    //   console.log({txID: sk_ret.txID});
                    //   console.log(msgpack.decode(sk_ret.tx));
                    // }
                    shared_impl_1.debug('AlgoSigner.sign ...');
                    return [4 /*yield*/, AlgoSigner.sign(txn)];
                case 2:
                    stx_obj = _a.sent();
                    shared_impl_1.debug('...signed');
                    shared_impl_1.debug({ stx_obj: stx_obj });
                    ret = {
                        tx: Buffer.from(stx_obj.blob, 'base64'),
                        txID: stx_obj.txID,
                        lastRound: txnOrig.lastRound
                    };
                    shared_impl_1.debug('signed AlgoSigner');
                    shared_impl_1.debug({ txID: ret.txID });
                    shared_impl_1.debug(msgpack.decode(ret.tx));
                    return [2 /*return*/, ret];
                case 3: throw Error("networkAccount has neither sk nor AlgoSigner: " + JSON.stringify(networkAccount));
            }
        });
    });
}
var connectAccount = function (networkAccount) { return __awaiter(void 0, void 0, void 0, function () {
    function setDebugLabel(newLabel) {
        label = newLabel;
        // @ts-ignore
        return this;
    }
    function tokenAccept(token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shared_impl_1.debug("tokenAccept", token);
                        // @ts-ignore
                        return [4 /*yield*/, exports.transfer(this, this, 0, token)];
                    case 1:
                        // @ts-ignore
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var thisAcc, shad, label, pks, selfAddress, iam, attachP, deployP, implNow, attach, deploy, tokenMetadata;
    return __generator(this, function (_a) {
        thisAcc = networkAccount;
        shad = thisAcc.addr.substring(2, 6);
        label = shad;
        pks = exports.T_Address.canonicalize(thisAcc);
        shared_impl_1.debug(shad, ': connectAccount');
        selfAddress = function () {
            return pks;
        };
        iam = function (some_addr) {
            if (some_addr === pks) {
                return some_addr;
            }
            else {
                throw Error("I should be " + some_addr + ", but am " + pks);
            }
        };
        attachP = function (bin, ctcInfoP) { return __awaiter(void 0, void 0, void 0, function () {
            var ctcInfo, getInfo, Deployer, ApplicationID, lastRound, bin_comp, escrowAddr, ctc_prog, _a, viewSize, viewKeys, mapDataKeys, mapDataSize, hasMaps, mapDataTy, mapRecordTy, mapArgTy, emptyMapDataTy, emptyMapData, getLocalState, didOptIn, doOptIn, ensuredOptIn, ensureOptIn, wait, sendrecv, recv, creationTime, recoverSplitBytes, viewlib, views_bin, getView1, getViews;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ctcInfoP];
                    case 1:
                        ctcInfo = _b.sent();
                        getInfo = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, ctcInfo];
                        }); }); };
                        Deployer = ctcInfo.Deployer, ApplicationID = ctcInfo.ApplicationID;
                        lastRound = ctcInfo.creationRound;
                        shared_impl_1.debug(shad, ': attach', ApplicationID, 'created at', lastRound);
                        return [4 /*yield*/, compileFor(bin, ctcInfo)];
                    case 2:
                        bin_comp = _b.sent();
                        escrowAddr = bin_comp.ctc.hash;
                        void (ALGO_compiled_1.addressToHex);
                        // XXX const escrowAddrRaw = T_Address.canonicalize(addressToHex(escrowAddr));
                        return [4 /*yield*/, exports.verifyContract(ctcInfo, bin)];
                    case 3:
                        // XXX const escrowAddrRaw = T_Address.canonicalize(addressToHex(escrowAddr));
                        _b.sent();
                        ctc_prog = algosdk_1["default"].makeLogicSig(bin_comp.ctc.result, []);
                        _a = bin._Connectors.ALGO, viewSize = _a.viewSize, viewKeys = _a.viewKeys, mapDataKeys = _a.mapDataKeys, mapDataSize = _a.mapDataSize;
                        hasMaps = mapDataKeys > 0;
                        mapDataTy = bin._getMaps({ reachStdlib: ALGO_compiled_1.stdlib }).mapDataTy;
                        mapRecordTy = exports.T_Tuple([exports.T_Bool, mapDataTy, mapDataTy, exports.T_Address]);
                        mapArgTy = exports.T_Array(mapRecordTy, HowManyAccounts);
                        emptyMapDataTy = exports.T_Bytes(mapDataTy.netSize);
                        emptyMapData = 
                        // This is a bunch of Nones
                        mapDataTy.fromNet(emptyMapDataTy.toNet(emptyMapDataTy.canonicalize('')));
                        shared_impl_1.debug({ emptyMapData: emptyMapData });
                        getLocalState = function (a) { return __awaiter(void 0, void 0, void 0, function () {
                            var client, ai, als;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.getAlgodClient()];
                                    case 1:
                                        client = _a.sent();
                                        return [4 /*yield*/, client.accountInformation(a)["do"]()];
                                    case 2:
                                        ai = _a.sent();
                                        shared_impl_1.debug("getLocalState", ai);
                                        als = ai['apps-local-state'].find(function (x) { return (x.id === ApplicationID); });
                                        shared_impl_1.debug("getLocalState", als);
                                        return [2 /*return*/, als ? als['key-value'] : undefined];
                                }
                            });
                        }); };
                        didOptIn = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, getLocalState(thisAcc.addr)];
                                case 1: return [2 /*return*/, ((_a.sent()) !== undefined)];
                            }
                        }); }); };
                        doOptIn = function () { return __awaiter(void 0, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f;
                            return __generator(this, function (_g) {
                                switch (_g.label) {
                                    case 0:
                                        _a = sign_and_send_sync;
                                        _b = ['ApplicationOptIn',
                                            thisAcc];
                                        _d = (_c = algosdk_1["default"]).makeApplicationOptInTxn;
                                        _e = [thisAcc.addr];
                                        return [4 /*yield*/, exports.getTxnParams()];
                                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_d.apply(_c, _e.concat([_g.sent(),
                                                ApplicationID,
                                                undefined, undefined, undefined, undefined,
                                                NOTE_Reach]))]))];
                                    case 2:
                                        _g.sent();
                                        _f = exports.assert;
                                        return [4 /*yield*/, didOptIn()];
                                    case 3:
                                        _f.apply(void 0, [_g.sent(), "didOptIn after doOptIn"]);
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        ensuredOptIn = false;
                        ensureOptIn = function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!!ensuredOptIn) return [3 /*break*/, 4];
                                        return [4 /*yield*/, didOptIn()];
                                    case 1:
                                        if (!!(_a.sent())) return [3 /*break*/, 3];
                                        return [4 /*yield*/, doOptIn()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        ensuredOptIn = true;
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        wait = function (delta) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, exports.waitUntilTime(shared_user_1.bigNumberify(lastRound).add(delta))];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        sendrecv = function (funcNum, evt_cnt, hasLastTime, tys, args, pay, out_tys, onlyIf, soloSend, timeout_delay, sim_p) { return __awaiter(void 0, void 0, void 0, function () {
                            var ltidx, doRecv, value, toks, funcName, dhead, handler, _a, svs, msg, _b, svs_tys, msg_tys, fake_res, sim_r, isHalt, sim_txns, _c, view_ty, view_v, view_tysz, padding, padding_ty, padding_v, _d, view_typ, view_vp, mapRefs, mapsPrev, mapsNext, mapAccts, mapArg, emptyRec, getMapData, mkMapRecord, missingAccts, zero_caddr, i, mapAcctsReal, _loop_1, state_1;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0:
                                        if (hasLastTime !== false) {
                                            ltidx = hasLastTime.toNumber();
                                            tys.splice(ltidx, 1);
                                            args.splice(ltidx, 1);
                                        }
                                        doRecv = function (waitIfNotPresent) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, recv(funcNum, evt_cnt, out_tys, waitIfNotPresent, timeout_delay)];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        }); }); };
                                        if (!!onlyIf) return [3 /*break*/, 2];
                                        return [4 /*yield*/, doRecv(true)];
                                    case 1: return [2 /*return*/, _e.sent()];
                                    case 2:
                                        value = pay[0], toks = pay[1];
                                        void (toks); // <-- rely on simulation because of ordering
                                        funcName = "m" + funcNum;
                                        dhead = shad + ": " + label + " sendrecv " + funcName + " " + timeout_delay;
                                        shared_impl_1.debug(dhead, '--- START');
                                        handler = bin_comp.steps[funcNum];
                                        if (!handler) {
                                            throw Error(dhead + " Internal error: reference to undefined handler: " + funcName);
                                        }
                                        _a = shared_impl_1.argsSplit(args, evt_cnt), svs = _a[0], msg = _a[1];
                                        _b = shared_impl_1.argsSplit(tys, evt_cnt), svs_tys = _b[0], msg_tys = _b[1];
                                        fake_res = {
                                            didTimeout: false,
                                            data: msg,
                                            time: shared_user_1.bigNumberify(0),
                                            value: value,
                                            from: pks,
                                            getOutput: (function (o_lab, o_ctc) { return __awaiter(void 0, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    void (o_lab);
                                                    void (o_ctc);
                                                    throw Error("Algorand does not support remote calls, and Reach should not have generated a call to this function");
                                                });
                                            }); })
                                        };
                                        return [4 /*yield*/, sim_p(fake_res)];
                                    case 3:
                                        sim_r = _e.sent();
                                        shared_impl_1.debug(dhead, '--- SIMULATE', sim_r);
                                        isHalt = sim_r.isHalt;
                                        sim_txns = sim_r.txns;
                                        _c = sim_r.view, view_ty = _c[0], view_v = _c[1];
                                        shared_impl_1.debug(dhead, 'VIEW', { view_ty: view_ty, view_v: view_v });
                                        view_tysz = view_ty.netSize;
                                        padding = Math.max(viewSize - view_tysz, 0);
                                        padding_ty = exports.T_Bytes(padding);
                                        padding_v = padding_ty.canonicalize('');
                                        _d = viewSize > 0 ?
                                            [exports.T_Tuple([view_ty, padding_ty]), [view_v, padding_v]] :
                                            [padding_ty, padding_v], view_typ = _d[0], view_vp = _d[1];
                                        shared_impl_1.debug(dhead, 'VIEWP', { view_typ: view_typ, view_vp: view_vp });
                                        mapRefs = sim_r.mapRefs, mapsPrev = sim_r.mapsPrev, mapsNext = sim_r.mapsNext;
                                        mapAccts = [];
                                        mapArg = [];
                                        emptyRec = function (caddr) {
                                            return [false, emptyMapData, emptyMapData, caddr];
                                        };
                                        getMapData = function (maps, addr) {
                                            return maps.map(function (m) { return shared_backend_1.mapRef(m, addr); });
                                        };
                                        mkMapRecord = function (isSender) { return function (addr) {
                                            var caddr = exports.T_Address.canonicalize(addr);
                                            var addrIdx = mapArg.findIndex(function (mr) { return exports.addressEq(mr[3], caddr); });
                                            var present = addrIdx !== -1;
                                            if (present) {
                                                return;
                                            }
                                            var refIdx = mapRefs.findIndex(function (other) { return exports.addressEq(other, caddr); });
                                            var used = refIdx !== -1;
                                            var record = function (rec) {
                                                mapArg.push(rec);
                                                if (!isSender) {
                                                    mapAccts.push(addr);
                                                }
                                            };
                                            if (used) {
                                                record([true, getMapData(mapsPrev, caddr), getMapData(mapsNext, caddr), caddr]);
                                            }
                                            else if (isSender) {
                                                record(emptyRec(caddr));
                                            }
                                        }; };
                                        mkMapRecord(true)(thisAcc.addr);
                                        mapRefs.map(cbr2algo_addr).forEach(mkMapRecord(false));
                                        missingAccts = (HowManyAccounts - mapArg.length);
                                        zero_caddr = exports.T_Address.canonicalize('0x00');
                                        for (i = 0; i < missingAccts; i++) {
                                            mapArg.push(emptyRec(zero_caddr));
                                        }
                                        shared_impl_1.debug(dhead, 'MAP', { mapArg: mapArg, mapArgTy: mapArgTy, mapAccts: mapAccts });
                                        shared_impl_1.debug(dhead, 'MAPARG', mapArg);
                                        if (!hasMaps) return [3 /*break*/, 5];
                                        return [4 /*yield*/, ensureOptIn()];
                                    case 4:
                                        _e.sent();
                                        _e.label = 5;
                                    case 5:
                                        mapAcctsReal = (mapAccts.length === 0) ? undefined : mapAccts;
                                        _loop_1 = function () {
                                            var params, tdn, txnToContract_value_idx, totalFromFee, txnExtraTxns, actual_args, actual_tys, safe_args, ui8h, handler_sig, whichAppl, txnAppl, txnFromHandler, txnToHandler, txns, signLSTO, sign_me, txnAppl_s, txnFromHandler_s, txnToHandler_s, txnExtraTxns_s, txns_s, res, e_7, _f, _g;
                                            return __generator(this, function (_h) {
                                                switch (_h.label) {
                                                    case 0: return [4 /*yield*/, exports.getTxnParams()];
                                                    case 1:
                                                        params = _h.sent();
                                                        if (timeout_delay) {
                                                            tdn = Math.min(MaxTxnLife, timeout_delay.toNumber());
                                                            params.lastRound = lastRound + tdn;
                                                            shared_impl_1.debug(dhead, '--- TIMECHECK', { params: params, timeout_delay: timeout_delay, tdn: tdn });
                                                            if (params.firstRound > params.lastRound) {
                                                                shared_impl_1.debug(dhead, '--- FAIL/TIMEOUT');
                                                                return [2 /*return*/, { value: { didTimeout: true } }];
                                                            }
                                                        }
                                                        shared_impl_1.debug(dhead, '--- ASSEMBLE w/', params);
                                                        txnToContract_value_idx = -1;
                                                        totalFromFee = 0;
                                                        txnExtraTxns = sim_txns.map(function (t, i) {
                                                            var tok = t.tok;
                                                            var amt = shared_user_1.bigNumberify(0);
                                                            var from = escrowAddr;
                                                            var to = escrowAddr;
                                                            var closeTo = undefined;
                                                            if (t.kind === 'from') {
                                                                from = escrowAddr;
                                                                // @ts-ignore
                                                                to = cbr2algo_addr(t.to);
                                                                amt = t.amt;
                                                            }
                                                            else if (t.kind === 'init') {
                                                                from = escrowAddr;
                                                                to = escrowAddr;
                                                                totalFromFee += raw_minimumBalance;
                                                                amt = t.amt;
                                                            }
                                                            else if (t.kind === 'halt') {
                                                                from = escrowAddr;
                                                                to = Deployer;
                                                                closeTo = Deployer;
                                                            }
                                                            else if (t.kind === 'to') {
                                                                from = thisAcc.addr;
                                                                to = escrowAddr;
                                                                amt = t.amt;
                                                            }
                                                            else {
                                                                exports.assert(false, 'sim txn kind');
                                                            }
                                                            var txn = makeTransferTxn(from, to, amt, tok, params, closeTo);
                                                            if (from === escrowAddr) {
                                                                totalFromFee += txn.fee;
                                                            }
                                                            if (t.kind === 'to' && !tok) {
                                                                txnToContract_value_idx = i;
                                                            }
                                                            return txn;
                                                        });
                                                        shared_impl_1.debug(dhead, '--- totalFromFee =', totalFromFee);
                                                        exports.assert(txnToContract_value_idx !== -1, 'sim txn no value');
                                                        txnExtraTxns[txnToContract_value_idx] =
                                                            makeTransferTxn(thisAcc.addr, escrowAddr, value.add(totalFromFee), undefined, params);
                                                        actual_args = [sim_r.prevSt_noPrevTime, sim_r.nextSt_noTime, view_vp, isHalt, shared_user_1.bigNumberify(totalFromFee), lastRound, svs, msg, mapArg];
                                                        actual_tys = [exports.T_Digest, exports.T_Digest, view_typ, exports.T_Bool, exports.T_UInt, exports.T_UInt, exports.T_Tuple(svs_tys), exports.T_Tuple(msg_tys), mapArgTy];
                                                        shared_impl_1.debug(dhead, '--- ARGS =', actual_args);
                                                        safe_args = actual_args.map(
                                                        // @ts-ignore
                                                        function (m, i) { return actual_tys[i].toNet(m); });
                                                        safe_args.forEach(function (x) {
                                                            if (!(x instanceof Uint8Array)) {
                                                                // The types say this is impossible now,
                                                                // but we'll leave it in for a while just in case...
                                                                throw Error("expect safe program argument, got " + JSON.stringify(x));
                                                            }
                                                        });
                                                        ui8h = function (x) { return Buffer.from(x).toString('hex'); };
                                                        shared_impl_1.debug(dhead, '--- PREPARE:', safe_args.map(ui8h));
                                                        handler_sig = algosdk_1["default"].makeLogicSig(handler.result, []);
                                                        shared_impl_1.debug(dhead, '--- PREPARED');
                                                        whichAppl = isHalt ?
                                                            // We are treating it like any party can delete the application, but the docs say it may only be possible for the creator. The code appears to not care: https://github.com/algorand/go-algorand/blob/0e9cc6b0c2ddc43c3cfa751d61c1321d8707c0da/ledger/apply/application.go#L589
                                                            algosdk_1["default"].makeApplicationDeleteTxn :
                                                            algosdk_1["default"].makeApplicationNoOpTxn;
                                                        txnAppl = whichAppl(thisAcc.addr, params, ApplicationID, safe_args, mapAcctsReal, undefined, undefined, NOTE_Reach);
                                                        txnFromHandler = algosdk_1["default"].makePaymentTxnWithSuggestedParams(handler.hash, thisAcc.addr, 0, thisAcc.addr, NOTE_Reach, params);
                                                        shared_impl_1.debug(dhead, '--- txnFromHandler =', txnFromHandler);
                                                        txnToHandler = algosdk_1["default"].makePaymentTxnWithSuggestedParams(thisAcc.addr, handler.hash, txnFromHandler.fee + raw_minimumBalance, undefined, NOTE_Reach, params);
                                                        shared_impl_1.debug(dhead, '--- txnToHandler =', txnToHandler);
                                                        txns = __spreadArray([
                                                            txnAppl,
                                                            txnToHandler,
                                                            txnFromHandler
                                                        ], txnExtraTxns);
                                                        algosdk_1["default"].assignGroupID(txns);
                                                        regroup(thisAcc, txns);
                                                        signLSTO = function (txn, ls) {
                                                            var tx_obj = algosdk_1["default"].signLogicSigTransactionObject(txn, ls);
                                                            return {
                                                                tx: tx_obj.blob,
                                                                txID: tx_obj.txID,
                                                                lastRound: txn.lastRound
                                                            };
                                                        };
                                                        sign_me = function (x) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, signTxn(thisAcc, x)];
                                                                case 1: return [2 /*return*/, _a.sent()];
                                                            }
                                                        }); }); };
                                                        return [4 /*yield*/, sign_me(txnAppl)];
                                                    case 2:
                                                        txnAppl_s = _h.sent();
                                                        txnFromHandler_s = signLSTO(txnFromHandler, handler_sig);
                                                        return [4 /*yield*/, sign_me(txnToHandler)];
                                                    case 3:
                                                        txnToHandler_s = _h.sent();
                                                        return [4 /*yield*/, Promise.all(txnExtraTxns.map(function (t, i) { return __awaiter(void 0, void 0, void 0, function () {
                                                                var st, t_s, _a;
                                                                return __generator(this, function (_b) {
                                                                    switch (_b.label) {
                                                                        case 0:
                                                                            st = sim_txns[i];
                                                                            shared_impl_1.debug('txnExtraTxns_s', { t: t, i: i, st: st });
                                                                            if (!(st.kind === 'to')) return [3 /*break*/, 2];
                                                                            return [4 /*yield*/, sign_me(t)];
                                                                        case 1:
                                                                            _a = _b.sent();
                                                                            return [3 /*break*/, 3];
                                                                        case 2:
                                                                            _a = signLSTO(t, ctc_prog);
                                                                            _b.label = 3;
                                                                        case 3:
                                                                            t_s = _a;
                                                                            return [2 /*return*/, t_s];
                                                                    }
                                                                });
                                                            }); }))];
                                                    case 4:
                                                        txnExtraTxns_s = _h.sent();
                                                        txns_s = __spreadArray([
                                                            txnAppl_s,
                                                            txnToHandler_s,
                                                            txnFromHandler_s
                                                        ], txnExtraTxns_s);
                                                        shared_impl_1.debug(dhead, '--- SEND:', txns_s.length);
                                                        res = void 0;
                                                        _h.label = 5;
                                                    case 5:
                                                        _h.trys.push([5, 7, , 10]);
                                                        return [4 /*yield*/, sendAndConfirm(txns_s)];
                                                    case 6:
                                                        res = _h.sent();
                                                        // XXX we should inspect res and if we failed because we didn't get picked out of the queue, then we shouldn't error, but should retry and let the timeout logic happen.
                                                        shared_impl_1.debug(dhead, '--- SUCCESS:', res);
                                                        return [3 /*break*/, 10];
                                                    case 7:
                                                        e_7 = _h.sent();
                                                        if (e_7.type == 'sendRawTransaction') {
                                                            shared_impl_1.debug(dhead, '--- FAIL:', format_failed_request(e_7.e));
                                                        }
                                                        else {
                                                            shared_impl_1.debug(dhead, '--- FAIL:', e_7);
                                                        }
                                                        if (!!soloSend) return [3 /*break*/, 9];
                                                        _f = {};
                                                        return [4 /*yield*/, doRecv(false)];
                                                    case 8: return [2 /*return*/, (_f.value = _h.sent(), _f)];
                                                    case 9:
                                                        if (timeout_delay) {
                                                            return [2 /*return*/, "continue"];
                                                        }
                                                        else {
                                                            // Otherwise, something bad is happening
                                                            throw Error(dhead + " --- ABORT");
                                                        }
                                                        return [3 /*break*/, 10];
                                                    case 10:
                                                        _g = {};
                                                        return [4 /*yield*/, doRecv(false)];
                                                    case 11: return [2 /*return*/, (_g.value = _h.sent(), _g)];
                                                }
                                            });
                                        };
                                        _e.label = 6;
                                    case 6:
                                        if (!true) return [3 /*break*/, 8];
                                        return [5 /*yield**/, _loop_1()];
                                    case 7:
                                        state_1 = _e.sent();
                                        if (typeof state_1 === "object")
                                            return [2 /*return*/, state_1.value];
                                        return [3 /*break*/, 6];
                                    case 8: return [2 /*return*/];
                                }
                            });
                        }); };
                        recv = function (funcNum, evt_cnt, tys, waitIfNotPresent, timeout_delay) { return __awaiter(void 0, void 0, void 0, function () {
                            var indexer, funcName, dhead, handler, timeoutRound, _loop_2, state_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        // Ignoring this, because no ALGO dev node
                                        void (waitIfNotPresent);
                                        return [4 /*yield*/, exports.getIndexer()];
                                    case 1:
                                        indexer = _a.sent();
                                        funcName = "m" + funcNum;
                                        dhead = shad + ": " + label + " recv " + funcName + " " + timeout_delay;
                                        shared_impl_1.debug(dhead, '--- START');
                                        handler = bin_comp.steps[funcNum];
                                        if (!handler) {
                                            throw Error(dhead + " Internal error: reference to undefined handler: " + funcName);
                                        }
                                        timeoutRound = timeout_delay ?
                                            lastRound + timeout_delay.toNumber() :
                                            undefined;
                                        _loop_2 = function () {
                                            var hquery, hres, currentRound, htxn, theRound, query, res, txn, ctc_args_all, argMsg, ctc_args_s, reNetify, msgTy, ctc_args, args_un, argFeeAmount, totalFromFee, fromAddr, from, oldLastRound, getOutput;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        hquery = indexer.searchForTransactions()
                                                            .address(handler.hash)
                                                            .addressRole('sender')
                                                            // Look at the next one after the last message
                                                            // XXX when we implement firstMsg, this won't work on the first
                                                            // message
                                                            .minRound(lastRound + 1);
                                                        if (timeoutRound) {
                                                            hquery = hquery.maxRound(timeoutRound);
                                                        }
                                                        return [4 /*yield*/, doQuery(dhead, hquery)];
                                                    case 1:
                                                        hres = _b.sent();
                                                        if (!!hres.succ) return [3 /*break*/, 3];
                                                        currentRound = hres.round;
                                                        if (timeoutRound && timeoutRound < currentRound) {
                                                            shared_impl_1.debug(dhead, '--- RECVD timeout', { timeoutRound: timeoutRound, currentRound: currentRound });
                                                            return [2 /*return*/, { value: { didTimeout: true } }];
                                                        }
                                                        // XXX perhaps wait until a new round has happened using wait
                                                        return [4 /*yield*/, await_timeout_1["default"].set(2000)];
                                                    case 2:
                                                        // XXX perhaps wait until a new round has happened using wait
                                                        _b.sent();
                                                        return [2 /*return*/, "continue"];
                                                    case 3:
                                                        htxn = hres.txn;
                                                        shared_impl_1.debug(dhead, '--- htxn =', htxn);
                                                        theRound = htxn['confirmed-round'];
                                                        query = indexer.searchForTransactions()
                                                            .applicationID(ApplicationID)
                                                            .txType('appl')
                                                            .round(theRound);
                                                        // XXX move predicate into indexer query
                                                        return [4 /*yield*/, doQuery(dhead, query, (function (x) { return x.group === htxn.group; }))];
                                                    case 4:
                                                        res = 
                                                        // XXX move predicate into indexer query
                                                        _b.sent();
                                                        if (!res.succ) {
                                                            return [2 /*return*/, "continue"];
                                                        }
                                                        txn = res.txn;
                                                        shared_impl_1.debug(dhead, '--- txn =', txn);
                                                        ctc_args_all = txn['application-transaction']['application-args'];
                                                        shared_impl_1.debug(dhead, { ctc_args_all: ctc_args_all });
                                                        argMsg = 7;
                                                        ctc_args_s = ctc_args_all[argMsg];
                                                        reNetify = function (x) {
                                                            var s = Buffer.from(x, 'base64').toString('hex');
                                                            shared_impl_1.debug(dhead, '--- reNetify(', x, ') = ', s);
                                                            return ethers_1.ethers.utils.arrayify('0x' + s);
                                                        };
                                                        shared_impl_1.debug(dhead, '--- tys =', tys);
                                                        msgTy = exports.T_Tuple(tys);
                                                        ctc_args = msgTy.fromNet(reNetify(ctc_args_s));
                                                        shared_impl_1.debug(dhead, { ctc_args: ctc_args });
                                                        args_un = shared_impl_1.argsSlice(ctc_args, evt_cnt);
                                                        shared_impl_1.debug(dhead, '--- args_un =', args_un);
                                                        argFeeAmount = 3;
                                                        totalFromFee = exports.T_UInt.fromNet(reNetify(ctc_args_all[argFeeAmount]));
                                                        shared_impl_1.debug(dhead, '--- totalFromFee =', totalFromFee);
                                                        fromAddr = htxn['payment-transaction'].receiver;
                                                        from = exports.T_Address.canonicalize({ addr: fromAddr });
                                                        shared_impl_1.debug(dhead, '--- from =', from, '=', fromAddr);
                                                        oldLastRound = lastRound;
                                                        lastRound = theRound;
                                                        shared_impl_1.debug(dhead, '--- RECVD updating round from', oldLastRound, 'to', lastRound);
                                                        getOutput = function (o_lab, o_ctc) {
                                                            void (o_lab);
                                                            void (o_ctc);
                                                            throw Error("Algorand does not support remote calls");
                                                        };
                                                        return [2 /*return*/, { value: {
                                                                    didTimeout: false,
                                                                    data: args_un,
                                                                    time: shared_user_1.bigNumberify(lastRound),
                                                                    from: from, getOutput: getOutput
                                                                } }];
                                                }
                                            });
                                        };
                                        _a.label = 2;
                                    case 2:
                                        if (!true) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_2()];
                                    case 3:
                                        state_2 = _a.sent();
                                        if (typeof state_2 === "object")
                                            return [2 /*return*/, state_2.value];
                                        return [3 /*break*/, 2];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        creationTime = function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = shared_user_1.bigNumberify;
                                    return [4 /*yield*/, getInfo()];
                                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).creationRound])];
                            }
                        }); }); };
                        recoverSplitBytes = function (prefix, size, howMany, src) {
                            var bs = new Uint8Array(size);
                            var offset = 0;
                            var _loop_3 = function (i) {
                                shared_impl_1.debug({ i: i });
                                var ik = base64ify("" + prefix + i);
                                shared_impl_1.debug({ ik: ik });
                                var st = (src.find(function (x) { return x.key === ik; })).value;
                                shared_impl_1.debug({ st: st });
                                var bsi = base64ToUI8A(st.bytes);
                                shared_impl_1.debug({ bsi: bsi });
                                if (bsi.length == 0) {
                                    return { value: undefined };
                                }
                                bs.set(bsi, offset);
                                offset += bsi.length;
                            };
                            for (var i = 0; i < howMany; i++) {
                                var state_3 = _loop_3(i);
                                if (typeof state_3 === "object")
                                    return state_3.value;
                            }
                            return bs;
                        };
                        viewlib = {
                            viewMapRef: function (mapi, a) { return __awaiter(void 0, void 0, void 0, function () {
                                var ls, mbs, md, mr;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            shared_impl_1.debug('viewMapRef', { mapi: mapi, a: a });
                                            return [4 /*yield*/, getLocalState(cbr2algo_addr(a))];
                                        case 1:
                                            ls = _a.sent();
                                            exports.assert(ls !== undefined, 'viewMapRef ls undefined');
                                            mbs = recoverSplitBytes('m', mapDataSize, mapDataKeys, ls);
                                            shared_impl_1.debug('viewMapRef', { mbs: mbs });
                                            md = mapDataTy.fromNet(mbs);
                                            shared_impl_1.debug('viewMapRef', { md: md });
                                            mr = md[mapi];
                                            exports.assert(mr !== undefined, 'viewMapRef mr undefined');
                                            return [2 /*return*/, mr];
                                    }
                                });
                            }); }
                        };
                        views_bin = bin._getViews({ reachStdlib: ALGO_compiled_1.stdlib }, viewlib);
                        getView1 = function (vs, v, k, vim) {
                            return function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return __awaiter(void 0, void 0, void 0, function () {
                                    var decode, client, appInfo, e_8, appSt, vvn, vin, vi, vtys, vty, vvs, vres, e_9;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                shared_impl_1.debug('getView1', v, k, args);
                                                decode = vim.decode;
                                                return [4 /*yield*/, exports.getAlgodClient()];
                                            case 1:
                                                client = _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                _a.trys.push([2, 4, , 5]);
                                                return [4 /*yield*/, client.getApplicationByID(ApplicationID)["do"]()];
                                            case 3:
                                                appInfo = _a.sent();
                                                return [3 /*break*/, 5];
                                            case 4:
                                                e_8 = _a.sent();
                                                shared_impl_1.debug('getApplicationById', e_8);
                                                return [2 /*return*/, ['None', null]];
                                            case 5:
                                                appSt = appInfo['params']['global-state'];
                                                vvn = recoverSplitBytes('v', viewSize, viewKeys, appSt);
                                                if (vvn === undefined) {
                                                    return [2 /*return*/, ['None', null]];
                                                }
                                                vin = exports.T_UInt.fromNet(vvn.slice(0, exports.T_UInt.netSize));
                                                vi = shared_user_1.bigNumberToNumber(vin);
                                                shared_impl_1.debug({ vi: vi });
                                                vtys = vs[vi];
                                                shared_impl_1.debug({ vtys: vtys });
                                                if (!vtys) {
                                                    return [2 /*return*/, ['None', null]];
                                                }
                                                vty = exports.T_Tuple(__spreadArray([exports.T_UInt], vtys));
                                                shared_impl_1.debug({ vty: vty });
                                                vvs = vty.fromNet(vvn);
                                                shared_impl_1.debug({ vvs: vvs });
                                                _a.label = 6;
                                            case 6:
                                                _a.trys.push([6, 8, , 9]);
                                                return [4 /*yield*/, decode(vi, vvs.slice(1), args)];
                                            case 7:
                                                vres = _a.sent();
                                                shared_impl_1.debug({ vres: vres });
                                                return [2 /*return*/, ['Some', vres]];
                                            case 8:
                                                e_9 = _a.sent();
                                                shared_impl_1.debug("getView1", v, k, 'error', e_9);
                                                return [2 /*return*/, ['None', null]];
                                            case 9: return [2 /*return*/];
                                        }
                                    });
                                });
                            };
                        };
                        getViews = shared_impl_1.getViewsHelper(views_bin, getView1);
                        return [2 /*return*/, { getInfo: getInfo, creationTime: creationTime, sendrecv: sendrecv, recv: recv, wait: wait, iam: iam, selfAddress: selfAddress, getViews: getViews, stdlib: ALGO_compiled_1.stdlib }];
                }
            });
        }); };
        deployP = function (bin) { return __awaiter(void 0, void 0, void 0, function () {
            var algob, appApproval0, appClear, viewKeys, mapDataKeys, Deployer, appApproval0_subst, appApproval0_bin, appClear_bin, createRes, _a, _b, _c, _d, _e, ApplicationID, bin_comp, escrowAddr, params, txnUpdate, txnToContract, txns, txnUpdate_s, txnToContract_s, txns_s, updateRes, e_10, creationRound, getInfo;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        must_be_supported(bin);
                        shared_impl_1.debug(shad, 'deploy');
                        algob = bin._Connectors.ALGO;
                        appApproval0 = algob.appApproval0, appClear = algob.appClear, viewKeys = algob.viewKeys, mapDataKeys = algob.mapDataKeys;
                        Deployer = thisAcc.addr;
                        appApproval0_subst = replaceAddr('Deployer', Deployer, appApproval0);
                        return [4 /*yield*/, compileTEAL('appApproval0', appApproval0_subst)];
                    case 1:
                        appApproval0_bin = _f.sent();
                        return [4 /*yield*/, compileTEAL('appClear', appClear)];
                    case 2:
                        appClear_bin = _f.sent();
                        _a = sign_and_send_sync;
                        _b = ['ApplicationCreate',
                            thisAcc];
                        _d = (_c = algosdk_1["default"]).makeApplicationCreateTxn;
                        _e = [thisAcc.addr];
                        return [4 /*yield*/, exports.getTxnParams()];
                    case 3: return [4 /*yield*/, _a.apply(void 0, _b.concat([_d.apply(_c, _e.concat([_f.sent(),
                                algosdk_1["default"].OnApplicationComplete.NoOpOC,
                                appApproval0_bin.result,
                                appClear_bin.result,
                                appLocalStateNumUInt, mapDataKeys, appGlobalStateNumUInt, 1 + viewKeys,
                                undefined, undefined, undefined, undefined,
                                NOTE_Reach]))]))];
                    case 4:
                        createRes = _f.sent();
                        ApplicationID = createRes['application-index'];
                        if (!ApplicationID) {
                            throw Error("No application-index in " + JSON.stringify(createRes));
                        }
                        return [4 /*yield*/, compileFor(bin, { ApplicationID: ApplicationID, Deployer: Deployer, creationRound: 0 })];
                    case 5:
                        bin_comp = _f.sent();
                        escrowAddr = bin_comp.ctc.hash;
                        return [4 /*yield*/, exports.getTxnParams()];
                    case 6:
                        params = _f.sent();
                        txnUpdate = algosdk_1["default"].makeApplicationUpdateTxn(thisAcc.addr, params, ApplicationID, bin_comp.appApproval.result, appClear_bin.result, undefined, undefined, undefined, undefined, NOTE_Reach);
                        txnToContract = algosdk_1["default"].makePaymentTxnWithSuggestedParams(thisAcc.addr, escrowAddr, raw_minimumBalance, undefined, NOTE_Reach, params);
                        txns = [
                            txnUpdate,
                            txnToContract,
                        ];
                        algosdk_1["default"].assignGroupID(txns);
                        regroup(thisAcc, txns);
                        return [4 /*yield*/, signTxn(thisAcc, txnUpdate)];
                    case 7:
                        txnUpdate_s = _f.sent();
                        return [4 /*yield*/, signTxn(thisAcc, txnToContract)];
                    case 8:
                        txnToContract_s = _f.sent();
                        txns_s = [
                            txnUpdate_s,
                            txnToContract_s,
                        ];
                        _f.label = 9;
                    case 9:
                        _f.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, sendAndConfirm(txns_s)];
                    case 10:
                        updateRes = _f.sent();
                        return [3 /*break*/, 12];
                    case 11:
                        e_10 = _f.sent();
                        throw Error("deploy: " + JSON.stringify(e_10));
                    case 12:
                        creationRound = updateRes['confirmed-round'];
                        getInfo = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, ({ ApplicationID: ApplicationID, creationRound: creationRound, Deployer: Deployer })];
                        }); }); };
                        shared_impl_1.debug(shad, 'application created');
                        return [4 /*yield*/, attachP(bin, getInfo())];
                    case 13: return [2 /*return*/, _f.sent()];
                }
            });
        }); };
        implNow = { stdlib: ALGO_compiled_1.stdlib };
        attach = function (bin, ctcInfoP) {
            shared_impl_1.ensureConnectorAvailable(bin._Connectors, exports.connector);
            return shared_impl_1.deferContract(false, attachP(bin, ctcInfoP), implNow);
        };
        deploy = function (bin) {
            shared_impl_1.ensureConnectorAvailable(bin._Connectors, exports.connector);
            return shared_impl_1.deferContract(false, deployP(bin), implNow);
        };
        ;
        tokenMetadata = function (token) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                shared_impl_1.debug("XXX tokenMetadata", token);
                return [2 /*return*/, {}];
            });
        }); };
        return [2 /*return*/, { deploy: deploy, attach: attach, networkAccount: networkAccount, getAddress: selfAddress, stdlib: ALGO_compiled_1.stdlib, setDebugLabel: setDebugLabel, tokenAccept: tokenAccept, tokenMetadata: tokenMetadata }];
    });
}); };
exports.connectAccount = connectAccount;
var balanceOf = function (acc, token) {
    if (token === void 0) { token = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var networkAccount, client, info, _i, _a, ai;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    networkAccount = acc.networkAccount;
                    if (!networkAccount) {
                        throw Error("acc.networkAccount missing. Got: " + acc);
                    }
                    return [4 /*yield*/, exports.getAlgodClient()];
                case 1:
                    client = _b.sent();
                    return [4 /*yield*/, client.accountInformation(networkAccount.addr)["do"]()];
                case 2:
                    info = _b.sent();
                    if (!token) {
                        return [2 /*return*/, shared_user_1.bigNumberify(info.amount)];
                    }
                    else {
                        for (_i = 0, _a = info.assets; _i < _a.length; _i++) {
                            ai = _a[_i];
                            if (ai['asset-id'] === token) {
                                return [2 /*return*/, ai['amount']];
                            }
                        }
                        return [2 /*return*/, shared_user_1.bigNumberify(0)];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.balanceOf = balanceOf;
var createAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var networkAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                networkAccount = algosdk_1["default"].generateAccount();
                return [4 /*yield*/, exports.connectAccount(networkAccount)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createAccount = createAccount;
var fundFromFaucet = function (account, value) { return __awaiter(void 0, void 0, void 0, function () {
    var faucet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getFaucet()];
            case 1:
                faucet = _a.sent();
                return [4 /*yield*/, exports.transfer(faucet, account, value)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.fundFromFaucet = fundFromFaucet;
var newTestAccount = function (startingBalance) { return __awaiter(void 0, void 0, void 0, function () {
    var account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.createAccount()];
            case 1:
                account = _a.sent();
                return [4 /*yield*/, exports.fundFromFaucet(account, startingBalance)];
            case 2:
                _a.sent();
                return [2 /*return*/, account];
        }
    });
}); };
exports.newTestAccount = newTestAccount;
/** @description the display name of the standard unit of currency for the network */
exports.standardUnit = 'ALGO';
/** @description the display name of the atomic (smallest) unit of currency for the network */
exports.atomicUnit = 'μALGO';
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100000000'
 */
function parseCurrency(amt) {
    var numericAmt = shared_user_1.isBigNumber(amt) ? amt.toNumber()
        : typeof amt === 'string' ? parseFloat(amt)
            : amt;
    return shared_user_1.bigNumberify(algosdk_1["default"].algosToMicroalgos(numericAmt));
}
exports.parseCurrency = parseCurrency;
// XXX get from SDK
var raw_minimumBalance = 100000;
exports.minimumBalance = shared_user_1.bigNumberify(raw_minimumBalance);
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000')); // => '100'
 */
function formatCurrency(amt, decimals) {
    if (decimals === void 0) { decimals = 6; }
    // Recall that 1 algo = 10^6 microalgos
    if (!(Number.isInteger(decimals) && 0 <= decimals)) {
        throw Error("Expected decimals to be a nonnegative integer, but got " + decimals + ".");
    }
    // Use decimals+1 and then slice it off to truncate instead of round
    var algosStr = algosdk_1["default"]
        .microalgosToAlgos(shared_user_1.bigNumberify(amt).toNumber())
        .toFixed(decimals + 1);
    // Have to roundtrip thru Number to drop trailing zeroes
    return Number(algosStr.slice(0, algosStr.length - 1)).toString();
}
exports.formatCurrency = formatCurrency;
// XXX The getDefaultAccount pattern doesn't really work w/ AlgoSigner
// AlgoSigner does not expose a "currently-selected account"
function getDefaultAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var signStrategy, mnemonic, AlgoSigner, ledger, addr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!shim_1.window.prompt) {
                        throw Error("Cannot prompt the user for default account with window.prompt");
                    }
                    signStrategy = getSignStrategy();
                    if (!(signStrategy === 'mnemonic')) return [3 /*break*/, 5];
                    mnemonic = shim_1.window.prompt("Please paste the mnemonic for your account, or cancel to generate a new one");
                    if (!mnemonic) return [3 /*break*/, 2];
                    shared_impl_1.debug("Creating account from user-provided mnemonic");
                    return [4 /*yield*/, exports.newAccountFromMnemonic(mnemonic)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    shared_impl_1.debug("No mnemonic provided. Randomly generating a new account secret instead.");
                    return [4 /*yield*/, exports.createAccount()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!(signStrategy === 'AlgoSigner')) return [3 /*break*/, 8];
                    return [4 /*yield*/, getAlgoSigner()];
                case 6:
                    AlgoSigner = _a.sent();
                    ledger = getLedgerFromAlgoSigner(AlgoSigner);
                    if (ledger === undefined)
                        throw Error("Ledger is undefined; this is required by AlgoSigner");
                    addr = shim_1.window.prompt("Please paste your account's address. (This account must be listed in AlgoSigner.)");
                    if (!addr) {
                        throw Error("No address provided");
                    }
                    return [4 /*yield*/, exports.newAccountFromAlgoSigner(addr, AlgoSigner, ledger)];
                case 7: return [2 /*return*/, _a.sent()];
                case 8:
                    if (signStrategy === 'MyAlgo') {
                        throw Error("MyAlgo wallet support is not yet implemented");
                    }
                    else {
                        throw Error("signStrategy '" + signStrategy + "' not recognized. Valid options are 'mnemonic', 'AlgoSigner', and 'MyAlgo'.");
                    }
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.getDefaultAccount = getDefaultAccount;
/**
 * @param mnemonic 25 words, space-separated
 */
var newAccountFromMnemonic = function (mnemonic) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.connectAccount(algosdk_1["default"].mnemonicToSecretKey(mnemonic))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.newAccountFromMnemonic = newAccountFromMnemonic;
/**
 * @param secret a Uint8Array, or its hex string representation
 */
var newAccountFromSecret = function (secret) { return __awaiter(void 0, void 0, void 0, function () {
    var sk, mnemonic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sk = ethers_1.ethers.utils.arrayify(secret);
                mnemonic = algosdk_1["default"].secretKeyToMnemonic(sk);
                return [4 /*yield*/, exports.newAccountFromMnemonic(mnemonic)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.newAccountFromSecret = newAccountFromSecret;
var newAccountFromAlgoSigner = function (addr, AlgoSigner, ledger) { return __awaiter(void 0, void 0, void 0, function () {
    var accts, networkAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!AlgoSigner) {
                    throw Error("AlgoSigner is falsy");
                }
                return [4 /*yield*/, AlgoSigner.accounts({ ledger: ledger })];
            case 1:
                accts = _a.sent();
                if (!Array.isArray(accts)) {
                    throw Error("AlgoSigner.accounts('" + ledger + "') is not an array: " + accts);
                }
                if (!accts.map(function (x) { return x.address; }).includes(addr)) {
                    throw Error("Address " + addr + " not found in AlgoSigner accounts");
                }
                networkAccount = { addr: addr, AlgoSigner: AlgoSigner };
                return [4 /*yield*/, exports.connectAccount(networkAccount)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.newAccountFromAlgoSigner = newAccountFromAlgoSigner;
var getNetworkTime = function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            _a = shared_user_1.bigNumberify;
            return [4 /*yield*/, getLastRound()];
        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
    }
}); }); };
exports.getNetworkTime = getNetworkTime;
var waitUntilTime = function (targetTime, onProgress) { return __awaiter(void 0, void 0, void 0, function () {
    var onProg, currentTime, status;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                onProg = onProgress || (function () { });
                return [4 /*yield*/, exports.getNetworkTime()];
            case 1:
                currentTime = _a.sent();
                _a.label = 2;
            case 2:
                if (!currentTime.lt(targetTime)) return [3 /*break*/, 5];
                shared_impl_1.debug('waitUntilTime: iteration:', currentTime, '->', targetTime);
                return [4 /*yield*/, exports.getAlgodClient()];
            case 3: return [4 /*yield*/, (_a.sent()).statusAfterBlock(currentTime.toNumber())["do"]()];
            case 4:
                status = _a.sent();
                currentTime = shared_user_1.bigNumberify(status['last-round']);
                onProg({ currentTime: currentTime, targetTime: targetTime });
                return [3 /*break*/, 2];
            case 5:
                shared_impl_1.debug('waitUntilTime: ended:', currentTime, '->', targetTime);
                return [2 /*return*/, currentTime];
        }
    });
}); };
exports.waitUntilTime = waitUntilTime;
var wait = function (delta, onProgress) { return __awaiter(void 0, void 0, void 0, function () {
    var now;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getNetworkTime()];
            case 1:
                now = _a.sent();
                shared_impl_1.debug('wait: delta=', delta, 'now=', now, 'until=', now.add(delta));
                return [4 /*yield*/, exports.waitUntilTime(now.add(delta), onProgress)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.wait = wait;
var appLocalStateNumUInt = 0;
var appGlobalStateNumUInt = 2;
var verifyContract = function (info, bin) { return __awaiter(void 0, void 0, void 0, function () {
    var ApplicationID, Deployer, creationRound, compiled, appApproval, appClear, _a, mapDataKeys, viewKeys, dhead, chk, chkeq, client, appInfo, appInfo_p, indexer, cquery, ctxn, cres, fmtp, appInfo_LocalState, appInfo_GlobalState, catxn;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ApplicationID = info.ApplicationID, Deployer = info.Deployer, creationRound = info.creationRound;
                return [4 /*yield*/, compileFor(bin, info)];
            case 1:
                compiled = _b.sent();
                appApproval = compiled.appApproval, appClear = compiled.appClear;
                _a = bin._Connectors.ALGO, mapDataKeys = _a.mapDataKeys, viewKeys = _a.viewKeys;
                dhead = "verifyContract";
                chk = function (p, msg) {
                    if (!p) {
                        throw Error("verifyContract failed: " + msg);
                    }
                };
                chkeq = function (a, e, msg) {
                    var as = JSON.stringify(a);
                    var es = JSON.stringify(e);
                    chk(as === es, msg + ": expected " + es + ", got " + as);
                };
                return [4 /*yield*/, exports.getAlgodClient()];
            case 2:
                client = _b.sent();
                return [4 /*yield*/, client.getApplicationByID(ApplicationID)["do"]()];
            case 3:
                appInfo = _b.sent();
                appInfo_p = appInfo['params'];
                shared_impl_1.debug(dhead, '-- appInfo_p =', appInfo_p);
                return [4 /*yield*/, exports.getIndexer()];
            case 4:
                indexer = _b.sent();
                cquery = indexer.searchForTransactions()
                    .applicationID(ApplicationID)
                    .txType('appl')
                    .round(creationRound);
                ctxn = null;
                _b.label = 5;
            case 5:
                if (!!ctxn) return [3 /*break*/, 12];
                return [4 /*yield*/, doQuery(dhead, cquery)];
            case 6:
                cres = _b.sent();
                if (!!cres.succ) return [3 /*break*/, 10];
                if (!(cres.round < creationRound)) return [3 /*break*/, 8];
                shared_impl_1.debug(dhead, '-- waiting for creationRound');
                return [4 /*yield*/, await_timeout_1["default"].set(1000)];
            case 7:
                _b.sent();
                return [3 /*break*/, 5];
            case 8:
                chk(false, "Not created in stated round");
                return [3 /*break*/, 12];
            case 9: return [3 /*break*/, 11];
            case 10:
                ctxn = cres.txn;
                return [3 /*break*/, 12];
            case 11: return [3 /*break*/, 5];
            case 12:
                shared_impl_1.debug(dhead, '-- ctxn =', ctxn);
                fmtp = function (x) { return uint8ArrayToStr(x.result, 'base64'); };
                chk(ctxn, "Cannot query for creationRound accuracy");
                chk(appInfo_p, "Cannot lookup ApplicationId");
                chkeq(appInfo_p['approval-program'], fmtp(appApproval), "Approval program does not match Reach backend");
                chkeq(appInfo_p['clear-state-program'], fmtp(appClear), "ClearState program does not match Reach backend");
                chkeq(appInfo_p['creator'], Deployer, "Deployer does not match contract information");
                appInfo_LocalState = appInfo_p['local-state-schema'];
                chkeq(appInfo_LocalState['num-byte-slice'], mapDataKeys, "Num of byte-slices in local state schema does not match Reach backend");
                chkeq(appInfo_LocalState['num-uint'], appLocalStateNumUInt, "Num of uints in local state schema does not match Reach backend");
                appInfo_GlobalState = appInfo_p['global-state-schema'];
                chkeq(appInfo_GlobalState['num-byte-slice'], 1 + viewKeys, "Num of byte-slices in global state schema does not match Reach backend");
                chkeq(appInfo_GlobalState['num-uint'], appGlobalStateNumUInt, "Num of uints in global state schema does not match Reach backend");
                catxn = ctxn['application-transaction'];
                chkeq(catxn['approval-program'], appInfo_p['approval-program'], "creationRound Approval program");
                chkeq(catxn['clear-state-program'], appInfo_p['clear-state-program'], "creationRound ClearState program");
                chkeq(catxn['on-completion'], 'update', "creationRound on-completion");
                chkeq(ctxn['sender'], Deployer, "creationRound Deployer");
                // Note: (after deployMode:firstMsg is implemented)
                // 1. (above) attach initial args to ContractInfo
                // 2. verify contract storage matches expectations based on initial args
                return [2 /*return*/, true];
        }
    });
}); };
exports.verifyContract = verifyContract;
/**
 * Formats an account's address in the way users expect to see it.
 * @param acc Account, NetworkAccount, base32-encoded address, or hex-encoded address
 * @returns the address formatted as a base32-encoded string with checksum
 */
function formatAddress(acc) {
    return ALGO_compiled_1.addressFromHex(exports.T_Address.canonicalize(acc));
}
exports.formatAddress = formatAddress;
exports.reachStdlib = ALGO_compiled_1.stdlib;
//# sourceMappingURL=ALGO.js.map