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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import Timeout from 'await-timeout';
import { ethers as real_ethers } from 'ethers';
import { assert, eq, } from './shared_backend';
import { replaceableThunk, debug, getViewsHelper, deferContract, makeRandom, argsSplit, ensureConnectorAvailable, make_newTestAccounts, make_waitUntilX, checkTimeout, } from './shared_impl';
import { bigNumberify, bigNumberToNumber, } from './shared_user';
import ETHstdlib from './stdlib_sol';
var reachBackendVersion = 1;
var reachEthBackendVersion = 1;
function isNone(m) {
    return m.length === 0;
}
function isSome(m) {
    return !isNone(m);
}
var Some = function (m) { return [m]; };
var None = [];
void (isSome);
// TODO: add return type once types are in place
export function makeEthLike(ethLikeArgs) {
    var _this = this;
    // ...............................................
    var ethLikeCompiled = ethLikeArgs.ethLikeCompiled, ethers = ethLikeArgs.ethers, _a = ethLikeArgs.standardDigits, standardDigits = _a === void 0 ? 18 : _a, providerLib = ethLikeArgs.providerLib, isIsolatedNetwork = ethLikeArgs.isIsolatedNetwork, canGetDefaultAccount = ethLikeArgs.canGetDefaultAccount, 
    // isWindowProvider,
    _getDefaultNetworkAccount = ethLikeArgs._getDefaultNetworkAccount, _getDefaultFaucetNetworkAccount = ethLikeArgs._getDefaultFaucetNetworkAccount, _b = ethLikeArgs._warnTxNoBlockNumber, _warnTxNoBlockNumber = _b === void 0 ? true : _b, _c = ethLikeArgs._specialFundFromFaucet, _specialFundFromFaucet = _c === void 0 ? function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, null];
    }); }); } : _c, canFundFromFaucet = ethLikeArgs.canFundFromFaucet, standardUnit = ethLikeArgs.standardUnit, atomicUnit = ethLikeArgs.atomicUnit, validQueryWindow = ethLikeArgs.validQueryWindow;
    var getProvider = providerLib.getProvider;
    var stdlib = ethLikeCompiled.stdlib;
    var T_Address = stdlib.T_Address, T_Tuple = stdlib.T_Tuple, T_UInt = stdlib.T_UInt, addressEq = stdlib.addressEq;
    var reachStdlib = stdlib;
    var _d = replaceableThunk(function () { return 0; }), _getQueryLowerBound = _d[0], _setQueryLowerBound = _d[1];
    function getQueryLowerBound() {
        return bigNumberify(_getQueryLowerBound());
    }
    function setQueryLowerBound(networkTime) {
        networkTime = typeof networkTime === 'number' ? networkTime
            : networkTime._isBigNumber ? networkTime.toNumber()
                : networkTime;
        if (!(typeof networkTime === 'number')) {
            throw Error("Expected number or BigNumber, but got " + networkTime + " : " + typeof networkTime);
        }
        _setQueryLowerBound(networkTime);
    }
    /** @description convenience function for drilling down to the actual address */
    var getAddr = function (acc) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!acc.networkAccount)
                        throw Error("Expected acc.networkAccount");
                    // TODO better type design here
                    // @ts-ignore
                    if (acc.networkAccount.address) {
                        // @ts-ignore
                        return [2 /*return*/, acc.networkAccount.address];
                    }
                    if (!acc.networkAccount.getAddress) return [3 /*break*/, 2];
                    return [4 /*yield*/, acc.networkAccount.getAddress()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: throw Error("Expected acc.networkAccount.address or acc.networkAccount.getAddress");
            }
        });
    }); };
    var rejectInvalidReceiptFor = function (txHash, r) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    return !r ? reject("No receipt for txHash: " + txHash) :
                        r.transactionHash !== txHash ? reject("Bad txHash; " + txHash + " !== " + r.transactionHash) :
                            !r.status ? reject("Transaction: " + txHash + " was reverted by EVM\n" + r) :
                                resolve(r);
                })];
        });
    }); };
    var fetchAndRejectInvalidReceiptFor = function (txHash) { return __awaiter(_this, void 0, void 0, function () {
        var provider, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProvider()];
                case 1:
                    provider = _a.sent();
                    return [4 /*yield*/, provider.getTransactionReceipt(txHash)];
                case 2:
                    r = _a.sent();
                    return [4 /*yield*/, rejectInvalidReceiptFor(txHash, r)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var getNetworkTimeNumber = function () { return __awaiter(_this, void 0, void 0, function () {
        var provider, ans;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProvider()];
                case 1:
                    provider = _a.sent();
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 2:
                    ans = _a.sent();
                    return [2 /*return*/, ans];
            }
        });
    }); };
    var initOrDefaultArgs = function (init) { return ({
        argsMay: init ? Some(init.args) : None,
        value: init ? init.value : bigNumberify(0)
    }); };
    // ****************************************************************************
    // Event Cache
    // ****************************************************************************
    var getMinBlock = function (logs) {
        return logs.reduce(function (acc, x) {
            return (x.blockNumber == acc.blockNumber)
                ? (x.logIndex < acc.logIndex ? x : acc)
                : (x.blockNumber.toString() < acc.blockNumber.toString() ? x : acc);
        }, logs[0]);
    };
    var getMaxBlock = function (logs) {
        return logs.reduce(function (acc, x) {
            return (x.blockNumber == acc.blockNumber)
                ? (x.logIndex > acc.logIndex ? x : acc)
                : (x.blockNumber.toString() > acc.blockNumber.toString() ? x : acc);
        }, logs[0]);
    };
    var EventCache = /** @class */ (function () {
        function EventCache() {
            this.cache = [];
            this.lastQueryTime = 0;
            this.currentBlock = _getQueryLowerBound();
            this.cache = [];
            this.theAddress = undefined;
        }
        EventCache.prototype.checkAddress = function (address) {
            if (this.theAddress !== undefined) {
                assert(address == this.theAddress, "address must match: " + address + " != " + this.theAddress);
            }
            else {
                this.theAddress = address;
            }
        };
        EventCache.prototype.query = function (dhead, getC, fromBlock, timeoutAt, evt) {
            return __awaiter(this, void 0, void 0, function () {
                var ethersC;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getC()];
                        case 1:
                            ethersC = _a.sent();
                            return [4 /*yield*/, this.queryContract(dhead, ethersC.address, ethersC.interface, fromBlock, timeoutAt, evt)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        EventCache.prototype.queryContract = function (dhead, address, iface, fromBlock, timeoutAt, evt) {
            return __awaiter(this, void 0, void 0, function () {
                var topic;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            topic = iface.getEventTopic(evt);
                            this.checkAddress(address);
                            return [4 /*yield*/, this.query_(dhead, fromBlock, timeoutAt, topic)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        EventCache.prototype.query_ = function (dhead, fromBlock, timeoutAt, topic) {
            return __awaiter(this, void 0, void 0, function () {
                var lab, h, maxTime, maxSecs, showCache, searchLogs, initLogs, failed, leftOver, provider, fromBlock_act, currentTime, toBlock, res, e_1, foundLogs;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            lab = "EventCache.query";
                            debug(dhead, lab, { fromBlock: fromBlock, timeoutAt: timeoutAt, topic: topic });
                            h = function (mode) { return timeoutAt && timeoutAt[0] === mode ? bigNumberToNumber(timeoutAt[1]) : undefined; };
                            maxTime = h('time');
                            maxSecs = h('secs');
                            debug(dhead, lab, { maxTime: maxTime, maxSecs: maxSecs });
                            showCache = function (when) {
                                debug(dhead, lab, { when: when, current: _this.currentBlock, len: _this.cache.length });
                            };
                            showCache("pre from");
                            this.cache = this.cache.filter(function (x) { return x.blockNumber >= fromBlock; });
                            showCache("post from");
                            searchLogs = function (source) { return __awaiter(_this, void 0, void 0, function () {
                                var res, _i, source_1, x, block, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            res = [];
                                            _i = 0, source_1 = source;
                                            _c.label = 1;
                                        case 1:
                                            if (!(_i < source_1.length)) return [3 /*break*/, 7];
                                            x = source_1[_i];
                                            block = x.blockNumber;
                                            _a = x.topics.includes(topic.toString())
                                                && (maxTime ? block <= maxTime : true);
                                            if (!_a) return [3 /*break*/, 5];
                                            if (!maxSecs) return [3 /*break*/, 3];
                                            return [4 /*yield*/, getTimeSecs(block)];
                                        case 2:
                                            _b = (_c.sent()).lte(maxSecs);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            _b = true;
                                            _c.label = 4;
                                        case 4:
                                            _a = (_b);
                                            _c.label = 5;
                                        case 5:
                                            if (_a) {
                                                res.push(x);
                                            }
                                            _c.label = 6;
                                        case 6:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 7: return [2 /*return*/, res];
                                    }
                                });
                            }); };
                            return [4 /*yield*/, searchLogs(this.cache)];
                        case 1:
                            initLogs = _a.sent();
                            if (initLogs.length > 0) {
                                debug(dhead, lab, "in cache");
                                return [2 /*return*/, { succ: true, evt: getMinBlock(initLogs) }];
                            }
                            debug(dhead, lab, "not in cache");
                            failed = function () { return ({ succ: false, block: _this.currentBlock }); };
                            debug(dhead, lab, "querying");
                            leftOver = this.lastQueryTime + 1000 - Date.now();
                            if (!(leftOver > 0)) return [3 /*break*/, 3];
                            debug(dhead, lab, "waiting...", leftOver);
                            return [4 /*yield*/, Timeout.set(leftOver)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            this.lastQueryTime = Date.now();
                            return [4 /*yield*/, getProvider()];
                        case 4:
                            provider = _a.sent();
                            fromBlock_act = Math.max(fromBlock, this.currentBlock);
                            return [4 /*yield*/, getNetworkTimeNumber()];
                        case 5:
                            currentTime = _a.sent();
                            debug(dhead, lab, { fromBlock_act: fromBlock_act, currentTime: currentTime });
                            if (fromBlock_act > currentTime) {
                                debug(dhead, lab, "no contact, from block in future");
                                return [2 /*return*/, failed()];
                            }
                            toBlock = validQueryWindow === true
                                ? currentTime
                                : Math.min(currentTime, fromBlock_act + validQueryWindow);
                            debug(dhead, lab, { fromBlock_act: fromBlock_act, currentTime: currentTime, toBlock: toBlock });
                            assert(fromBlock <= toBlock, "from <= to");
                            res = [];
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, provider.getLogs({
                                    fromBlock: fromBlock_act,
                                    toBlock: toBlock,
                                    address: this.theAddress
                                })];
                        case 7:
                            res = _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            e_1 = _a.sent();
                            debug(dhead, lab, 'getLogs err', e_1);
                            return [2 /*return*/, failed()];
                        case 9:
                            debug(dhead, lab, 'getLogs succ', res);
                            this.cache = res;
                            this.currentBlock =
                                (this.cache.length == 0)
                                    ? toBlock
                                    : getMaxBlock(this.cache).blockNumber;
                            debug(dhead, lab, 'got network', this.currentBlock);
                            return [4 /*yield*/, searchLogs(this.cache)];
                        case 10:
                            foundLogs = _a.sent();
                            if (foundLogs.length > 0) {
                                debug(dhead, lab, "in network");
                                return [2 /*return*/, { succ: true, evt: getMinBlock(foundLogs) }];
                            }
                            debug(dhead, lab, "not in network");
                            return [2 /*return*/, failed()];
                    }
                });
            });
        };
        return EventCache;
    }());
    // ****************************************************************************
    // Common Interface Exports
    // ****************************************************************************
    var _e = makeRandom(32), randomUInt = _e.randomUInt, hasRandom = _e.hasRandom;
    var balanceOf = function (acc, token) {
        if (token === void 0) { token = false; }
        return __awaiter(_this, void 0, void 0, function () {
            var networkAccount, _a, addr, provider, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        networkAccount = acc.networkAccount;
                        if (!networkAccount) {
                            throw Error("acc.networkAccount missing. Got: " + acc);
                        }
                        if (!(!token && networkAccount.getBalance)) return [3 /*break*/, 2];
                        _a = bigNumberify;
                        return [4 /*yield*/, networkAccount.getBalance()];
                    case 1: return [2 /*return*/, _a.apply(void 0, [_c.sent()])];
                    case 2: return [4 /*yield*/, getAddr(acc)];
                    case 3:
                        addr = _c.sent();
                        if (!addr) {
                            throw Error("address missing. Got: " + networkAccount);
                        }
                        if (!!token) return [3 /*break*/, 6];
                        return [4 /*yield*/, getProvider()];
                    case 4:
                        provider = _c.sent();
                        _b = bigNumberify;
                        return [4 /*yield*/, provider.getBalance(addr)];
                    case 5: return [2 /*return*/, _b.apply(void 0, [_c.sent()])];
                    case 6: return [4 /*yield*/, balanceOf_token(networkAccount, addr, token)];
                    case 7: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    var ReachToken_ABI = ETHstdlib["contracts"]["stdlib.sol:ReachToken"]["abi"];
    var ERC20_ABI = ETHstdlib["contracts"]["stdlib.sol:IERC20"]["abi"];
    var balanceOf_token = function (networkAccount, address, tok) { return __awaiter(_this, void 0, void 0, function () {
        var tokCtc, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tokCtc = new ethers.Contract(tok, ERC20_ABI, networkAccount);
                    _a = bigNumberify;
                    return [4 /*yield*/, tokCtc["balanceOf"](address)];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        });
    }); };
    var doTxn = function (dhead, tp) { return __awaiter(_this, void 0, void 0, function () {
        var rt, rm, ro;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debug(__assign(__assign({}, dhead), { step: "pre call" }));
                    return [4 /*yield*/, tp];
                case 1:
                    rt = _a.sent();
                    debug(__assign(__assign({}, dhead), { rt: rt, step: "pre wait" }));
                    return [4 /*yield*/, rt.wait()];
                case 2:
                    rm = _a.sent();
                    debug(__assign(__assign({}, dhead), { rt: rt, rm: rm, step: "pre receipt" }));
                    assert(rm !== null, "receipt wait null");
                    return [4 /*yield*/, fetchAndRejectInvalidReceiptFor(rm.transactionHash)];
                case 3:
                    ro = _a.sent();
                    debug(__assign(__assign({}, dhead), { rt: rt, rm: rm, ro: ro, step: "post receipt" }));
                    // ro's blockNumber might be interesting
                    void (ro);
                    return [2 /*return*/];
            }
        });
    }); };
    var doCall = function (dhead, ctc, funcName, args, value, gasLimit) { return __awaiter(_this, void 0, void 0, function () {
        var dpre;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dpre = __assign(__assign({}, dhead), { funcName: funcName, args: args, value: value });
                    debug(__assign(__assign({}, dpre), { step: "pre call" }));
                    return [4 /*yield*/, doTxn(dpre, ctc[funcName].apply(ctc, __spreadArray(__spreadArray([], args), [{ value: value, gasLimit: gasLimit }])))];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    /** @description Arg order follows "src before dst" convention */
    var transfer = function (from, to, value, token) {
        if (token === void 0) { token = false; }
        return __awaiter(_this, void 0, void 0, function () {
            var sender, receiver, valueb, dhead, txn, tokCtc, gl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = from.networkAccount;
                        return [4 /*yield*/, getAddr(to)];
                    case 1:
                        receiver = _a.sent();
                        valueb = bigNumberify(value);
                        dhead = { kind: 'transfer' };
                        if (!!token) return [3 /*break*/, 3];
                        txn = { to: receiver, value: valueb };
                        debug('sender.sendTransaction(', txn, ')');
                        return [4 /*yield*/, doTxn(dhead, sender.sendTransaction(txn))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        tokCtc = new ethers.Contract(token, ERC20_ABI, sender);
                        gl = from.getGasLimit ? from.getGasLimit() : undefined;
                        return [4 /*yield*/, doCall(dhead, tokCtc, "transfer", [receiver, valueb], bigNumberify(0), gl)];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var connectAccount = function (networkAccount) { return __awaiter(_this, void 0, void 0, function () {
        function setDebugLabel(newLabel) {
            label = newLabel;
            // @ts-ignore
            return this;
        }
        function tokenAccept(token) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    debug("tokenAccept: Unnecessary on ETH", token);
                    return [2 /*return*/];
                });
            });
        }
        var _a, address, shad, label, iam, selfAddress, gasLimit, setGasLimit, getGasLimit, deploy, attach, tokenMetadata;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(networkAccount.getAddress && !networkAccount.address)) return [3 /*break*/, 2];
                    // @ts-ignore
                    _a = networkAccount;
                    return [4 /*yield*/, getAddr({ networkAccount: networkAccount })];
                case 1:
                    // @ts-ignore
                    _a.address = _b.sent();
                    _b.label = 2;
                case 2: return [4 /*yield*/, getAddr({ networkAccount: networkAccount })];
                case 3:
                    address = _b.sent();
                    if (!address) {
                        throw Error("Expected networkAccount.address: " + networkAccount);
                    }
                    shad = address.substring(2, 6);
                    label = shad;
                    iam = function (some_addr) {
                        if (addressEq(some_addr, address)) {
                            return address;
                        }
                        else {
                            throw Error("I should be " + some_addr + ", but am " + address);
                        }
                    };
                    selfAddress = function () {
                        return address;
                    };
                    setGasLimit = function (ngl) {
                        gasLimit = bigNumberify(ngl);
                    };
                    getGasLimit = function () { return gasLimit; };
                    deploy = function (bin) {
                        ensureConnectorAvailable(bin, 'ETH', reachBackendVersion, reachEthBackendVersion);
                        if (!ethers.Signer.isSigner(networkAccount)) {
                            throw Error("Signer required to deploy, " + networkAccount);
                        }
                        var _a = (function () {
                            var resolveInfo = function (info) { void (info); };
                            var infoP = new Promise(function (resolve) {
                                resolveInfo = resolve;
                            });
                            return { infoP: infoP, resolveInfo: resolveInfo };
                        })(), infoP = _a.infoP, resolveInfo = _a.resolveInfo;
                        var performDeploy = function (init) {
                            debug(shad, ': performDeploy with', init);
                            var _a = initOrDefaultArgs(init), argsMay = _a.argsMay, value = _a.value;
                            var _b = bin._Connectors.ETH, ABI = _b.ABI, Bytecode = _b.Bytecode;
                            debug(shad, ': making contract factory');
                            var factory = new ethers.ContractFactory(ABI, Bytecode, networkAccount);
                            (function () { return __awaiter(_this, void 0, void 0, function () {
                                var contract, deploy_r, info;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            debug(shad, ": deploying factory");
                                            return [4 /*yield*/, factory.deploy.apply(factory, __spreadArray(__spreadArray([], argsMay), [{ value: value, gasLimit: gasLimit }]))];
                                        case 1:
                                            contract = _a.sent();
                                            debug(shad, ": deploying factory; done:", contract.address);
                                            debug(shad, ": waiting for receipt:", contract.deployTransaction.hash);
                                            return [4 /*yield*/, contract.deployTransaction.wait()];
                                        case 2:
                                            deploy_r = _a.sent();
                                            debug(shad, ": got receipt;", deploy_r.blockNumber);
                                            info = contract.address;
                                            // XXX creation_block: deploy_r.blockNumber,
                                            // XXX transactionHash: deploy_r.transactionHash,
                                            resolveInfo(info);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })();
                            return attach(bin, infoP);
                        };
                        var attachDeferDeploy = function () {
                            var setImpl;
                            var implP = new Promise(function (resolve) { setImpl = resolve; });
                            var implNow = {
                                stdlib: stdlib,
                                sendrecv: function (srargs) { return __awaiter(_this, void 0, void 0, function () {
                                    var funcNum, evt_cnt, out_tys, args, pay, onlyIf, soloSend, timeoutAt, value, toks;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                funcNum = srargs.funcNum, evt_cnt = srargs.evt_cnt, out_tys = srargs.out_tys, args = srargs.args, pay = srargs.pay, onlyIf = srargs.onlyIf, soloSend = srargs.soloSend, timeoutAt = srargs.timeoutAt;
                                                debug(shad, ":", label, 'sendrecv m', funcNum, "(deferred deploy)");
                                                value = pay[0], toks = pay[1];
                                                // The following must be true for the first sendrecv.
                                                try {
                                                    assert(onlyIf, "verifyContract: onlyIf must be true");
                                                    assert(soloSend, "verifyContract: soloSend must be true");
                                                    assert(eq(funcNum, 1), "verifyContract: funcNum must be 1");
                                                    assert(!timeoutAt, "verifyContract: no timeout");
                                                    assert(toks.length == 0, "verifyContract: no tokens");
                                                }
                                                catch (e) {
                                                    throw Error("impossible: Deferred deploy sendrecv assumptions violated.\n" + e);
                                                }
                                                // shim impl is replaced with real impl
                                                setImpl(performDeploy({ args: [[0], args], value: value }));
                                                return [4 /*yield*/, infoP];
                                            case 1:
                                                _a.sent(); // Wait for the deploy to actually happen.
                                                return [4 /*yield*/, impl.recv({ funcNum: funcNum, evt_cnt: evt_cnt, out_tys: out_tys, waitIfNotPresent: false, timeoutAt: timeoutAt })];
                                            case 2: // Wait for the deploy to actually happen.
                                            // simulated recv
                                            return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                }); }
                            };
                            var impl = deferContract(true, implP, implNow);
                            return impl;
                        };
                        var deployMode = bin._Connectors.ETH.deployMode;
                        switch (deployMode) {
                            case 'DM_firstMsg':
                                return attachDeferDeploy();
                            case 'DM_constructor':
                                return performDeploy();
                            default:
                                throw Error("Unrecognized deployMode: " + deployMode);
                        }
                        ;
                    };
                    attach = function (bin, infoP) {
                        ensureConnectorAvailable(bin, 'ETH', reachBackendVersion, reachEthBackendVersion);
                        var eventCache = new EventCache();
                        var ABI = JSON.parse(bin._Connectors.ETH.ABI);
                        // Attached state
                        var _a = (function () {
                            var lastBlock = null;
                            var setLastBlock = function (n) {
                                if (typeof n !== 'number') {
                                    throw Error("Expected lastBlock number, got " + lastBlock + ": " + typeof lastBlock);
                                }
                                debug("lastBlock from", lastBlock, "to", n);
                                lastBlock = n;
                            };
                            var getLastBlock = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (typeof lastBlock === 'number') {
                                                return [2 /*return*/, lastBlock];
                                            }
                                            // This causes lastBlock to be set
                                            return [4 /*yield*/, getC()];
                                        case 1:
                                            // This causes lastBlock to be set
                                            _a.sent();
                                            return [4 /*yield*/, getLastBlock()];
                                        case 2: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); };
                            return { getLastBlock: getLastBlock, setLastBlock: setLastBlock };
                        })(), getLastBlock = _a.getLastBlock, setLastBlock = _a.setLastBlock;
                        var updateLast = function (o) {
                            if (!o.blockNumber) {
                                console.log(o);
                                throw Error("Expected blockNumber in " + Object.keys(o));
                            }
                            setLastBlock(o.blockNumber);
                        };
                        var theCreationTime = undefined;
                        var getC = (function () {
                            var _ethersC = null;
                            return function () { return __awaiter(_this, void 0, void 0, function () {
                                var info, creation_block, address;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (_ethersC) {
                                                return [2 /*return*/, _ethersC];
                                            }
                                            return [4 /*yield*/, infoP];
                                        case 1:
                                            info = _a.sent();
                                            return [4 /*yield*/, verifyContract_(info, bin, eventCache, label)];
                                        case 2:
                                            creation_block = (_a.sent()).creation_block;
                                            theCreationTime = creation_block;
                                            setLastBlock(creation_block);
                                            address = info;
                                            debug(shad, ": contract verified");
                                            if (!ethers.Signer.isSigner(networkAccount)) {
                                                throw Error("networkAccount must be a Signer (read: Wallet). " + networkAccount);
                                            }
                                            // TODO: remove "as" when we figure out how to type the interface for ctors
                                            _ethersC = new ethers.Contract(address, ABI, networkAccount);
                                            return [2 /*return*/, _ethersC];
                                    }
                                });
                            }); };
                        })();
                        var callC = function (dhead, funcName, arg, pay) { return __awaiter(_this, void 0, void 0, function () {
                            var value, toks, ethersC, zero, actualCall, callTok, maybePayTok;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        value = pay[0], toks = pay[1];
                                        return [4 /*yield*/, getC()];
                                    case 1:
                                        ethersC = _a.sent();
                                        zero = bigNumberify(0);
                                        actualCall = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, doCall(__assign(__assign({}, dhead), { kind: 'reach' }), ethersC, funcName, [arg], value, gasLimit)];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        }); }); };
                                        callTok = function (tok, amt) { return __awaiter(_this, void 0, void 0, function () {
                                            var tokBalance, tokCtc;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, balanceOf_token(networkAccount, address, tok)];
                                                    case 1:
                                                        tokBalance = _a.sent();
                                                        debug(__assign(__assign({}, dhead), { kind: 'token' }), 'balanceOf', tokBalance);
                                                        assert(tokBalance.gte(amt), "local account token balance is insufficient: " + tokBalance + " < " + amt);
                                                        tokCtc = new ethers.Contract(tok, ERC20_ABI, networkAccount);
                                                        return [4 /*yield*/, doCall(__assign(__assign({}, dhead), { kind: 'token' }), tokCtc, "approve", [ethersC.address, amt], zero, gasLimit)];
                                                    case 2:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); };
                                        maybePayTok = function (i) { return __awaiter(_this, void 0, void 0, function () {
                                            var _a, amt, tok, e_2;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0:
                                                        if (!(i < toks.length)) return [3 /*break*/, 7];
                                                        _a = toks[i], amt = _a[0], tok = _a[1];
                                                        return [4 /*yield*/, callTok(tok, amt)];
                                                    case 1:
                                                        _b.sent();
                                                        _b.label = 2;
                                                    case 2:
                                                        _b.trys.push([2, 4, , 6]);
                                                        return [4 /*yield*/, maybePayTok(i + 1)];
                                                    case 3:
                                                        _b.sent();
                                                        return [3 /*break*/, 6];
                                                    case 4:
                                                        e_2 = _b.sent();
                                                        return [4 /*yield*/, callTok(tok, zero)];
                                                    case 5:
                                                        _b.sent();
                                                        throw e_2;
                                                    case 6: return [3 /*break*/, 9];
                                                    case 7: return [4 /*yield*/, actualCall()];
                                                    case 8:
                                                        _b.sent();
                                                        _b.label = 9;
                                                    case 9: return [2 /*return*/];
                                                }
                                            });
                                        }); };
                                        return [4 /*yield*/, maybePayTok(0)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        var getEventData = function (ok_evt, ok_e) { return __awaiter(_this, void 0, void 0, function () {
                            var ethersC, ok_args_abi, args;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getC()];
                                    case 1:
                                        ethersC = _a.sent();
                                        ok_args_abi = ethersC.interface.getEvent(ok_evt).inputs;
                                        args = ethersC.interface.parseLog(ok_e).args;
                                        return [2 /*return*/, ok_args_abi.map(function (a) { return args[a.name]; })];
                                }
                            });
                        }); };
                        var getLog = function (fromBlock, toBlock, ok_evt) { return __awaiter(_this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, eventCache.query('getLog', getC, fromBlock, ['time', bigNumberify(toBlock)], ok_evt)];
                                    case 1:
                                        res = _a.sent();
                                        if (!res.succ) {
                                            return [2 /*return*/, undefined];
                                        }
                                        return [2 /*return*/, res.evt];
                                }
                            });
                        }); };
                        var getInfo = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, infoP];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); };
                        var sendrecv = function (srargs) { return __awaiter(_this, void 0, void 0, function () {
                            var funcNum, evt_cnt, tys, args, pay, out_tys, onlyIf, soloSend, timeoutAt, doRecv, funcName, dhead, _a, args_svs, args_msg, _b, tys_svs, tys_msg, arg_ty, arg, lastBlock, block_send_attempt, block_repeat_count, e_3, current_block, error;
                            var _this = this;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        funcNum = srargs.funcNum, evt_cnt = srargs.evt_cnt, tys = srargs.tys, args = srargs.args, pay = srargs.pay, out_tys = srargs.out_tys, onlyIf = srargs.onlyIf, soloSend = srargs.soloSend, timeoutAt = srargs.timeoutAt;
                                        doRecv = function (waitIfNotPresent) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, recv({ funcNum: funcNum, evt_cnt: evt_cnt, out_tys: out_tys, waitIfNotPresent: waitIfNotPresent, timeoutAt: timeoutAt })];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        }); }); };
                                        if (!!onlyIf) return [3 /*break*/, 2];
                                        return [4 /*yield*/, doRecv(true)];
                                    case 1: return [2 /*return*/, _c.sent()];
                                    case 2:
                                        funcName = "m" + funcNum;
                                        if (tys.length !== args.length) {
                                            throw Error("tys.length (" + tys.length + ") !== args.length (" + args.length + ")");
                                        }
                                        dhead = [shad, label, 'send', funcName, timeoutAt, 'SEND'];
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['ARGS', args]));
                                        _a = argsSplit(args, evt_cnt), args_svs = _a[0], args_msg = _a[1];
                                        _b = argsSplit(tys, evt_cnt), tys_svs = _b[0], tys_msg = _b[1];
                                        arg_ty = T_Tuple([T_Tuple(tys_svs), T_Tuple(tys_msg)]);
                                        arg = arg_ty.munge([args_svs, args_msg]);
                                        // Make sure the ctc is available and verified (before we get into try/catch)
                                        // https://github.com/reach-sh/reach-lang/issues/134
                                        return [4 /*yield*/, getC()];
                                    case 3:
                                        // Make sure the ctc is available and verified (before we get into try/catch)
                                        // https://github.com/reach-sh/reach-lang/issues/134
                                        _c.sent();
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['START', arg]));
                                        return [4 /*yield*/, getLastBlock()];
                                    case 4:
                                        lastBlock = _c.sent();
                                        block_send_attempt = lastBlock;
                                        block_repeat_count = 0;
                                        _c.label = 5;
                                    case 5: return [4 /*yield*/, checkTimeout(getTimeSecs, timeoutAt, block_send_attempt)];
                                    case 6:
                                        if (!!(_c.sent())) return [3 /*break*/, 16];
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['TRY']));
                                        _c.label = 7;
                                    case 7:
                                        _c.trys.push([7, 9, , 14]);
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['ARG', arg, pay]));
                                        return [4 /*yield*/, callC(dhead, funcName, arg, pay)];
                                    case 8:
                                        _c.sent();
                                        return [3 /*break*/, 14];
                                    case 9:
                                        e_3 = _c.sent();
                                        if (!!soloSend) return [3 /*break*/, 10];
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ["SKIPPING", e_3]));
                                        return [3 /*break*/, 13];
                                    case 10:
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ["ERROR", { stack: e_3.stack }]));
                                        // XXX What should we do...? If we fail, but there's no timeout delay... then we should just die
                                        return [4 /*yield*/, Timeout.set(1)];
                                    case 11:
                                        // XXX What should we do...? If we fail, but there's no timeout delay... then we should just die
                                        _c.sent();
                                        return [4 /*yield*/, getNetworkTimeNumber()];
                                    case 12:
                                        current_block = _c.sent();
                                        if (current_block == block_send_attempt) {
                                            block_repeat_count++;
                                        }
                                        block_send_attempt = current_block;
                                        if (block_repeat_count > 32) {
                                            if (e_3.code === 'UNPREDICTABLE_GAS_LIMIT') {
                                                error = e_3;
                                                while (error.error) {
                                                    error = error.error;
                                                }
                                                console.log("impossible: The message you are trying to send appears to be invalid.");
                                                console.log(error);
                                            }
                                            console.log("args:");
                                            console.log(arg);
                                            throw Error(dhead + " REPEAT @ " + block_send_attempt + " x " + block_repeat_count);
                                        }
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ["TRY FAIL", lastBlock, current_block, block_repeat_count, block_send_attempt]));
                                        return [3 /*break*/, 5];
                                    case 13: return [3 /*break*/, 14];
                                    case 14:
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['SUCC']));
                                        return [4 /*yield*/, doRecv(false)];
                                    case 15: return [2 /*return*/, _c.sent()];
                                    case 16:
                                        // XXX If we were trying to join, but we got sniped, then we'll
                                        // think that there is a timeout and then we'll wait forever for
                                        // the timeout message.
                                        debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ["FAIL/TIMEOUT"]));
                                        return [2 /*return*/, { didTimeout: true }];
                                }
                            });
                        }); };
                        // https://docs.ethers.io/ethers.js/html/api-contract.html#configuring-events
                        var recv = function (rargs) { return __awaiter(_this, void 0, void 0, function () {
                            var funcNum, out_tys, waitIfNotPresent, timeoutAt, isFirstMsgDeploy, lastBlock, ok_evt, dhead, fromBlock, _loop_1, state_1;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        funcNum = rargs.funcNum, out_tys = rargs.out_tys, waitIfNotPresent = rargs.waitIfNotPresent, timeoutAt = rargs.timeoutAt;
                                        isFirstMsgDeploy = (funcNum == 1) && (bin._Connectors.ETH.deployMode == 'DM_firstMsg');
                                        return [4 /*yield*/, getLastBlock()];
                                    case 1:
                                        lastBlock = _a.sent();
                                        ok_evt = "e" + funcNum;
                                        dhead = { t: 'recv', label: label, ok_evt: ok_evt };
                                        debug(dhead, "START");
                                        fromBlock = lastBlock + (isFirstMsgDeploy ? 0 : 1);
                                        _loop_1 = function () {
                                            var res, currentTime, ok_e, ok_r, ok_t, theBlock_1, ok_ed, ok_vals, data, _getLog_1, getOutput, theBlockBN, from, theSecsBN;
                                            return __generator(this, function (_b) {
                                                switch (_b.label) {
                                                    case 0: return [4 /*yield*/, eventCache.query(dhead, getC, fromBlock, timeoutAt, ok_evt)];
                                                    case 1:
                                                        res = _b.sent();
                                                        if (!!res.succ) return [3 /*break*/, 7];
                                                        currentTime = res.block;
                                                        return [4 /*yield*/, checkTimeout(getTimeSecs, timeoutAt, currentTime)];
                                                    case 2:
                                                        if (_b.sent()) {
                                                            debug(dhead, '--- RECVD timeout', { timeoutAt: timeoutAt, currentTime: currentTime });
                                                            return [2 /*return*/, { value: { didTimeout: true } }];
                                                        }
                                                        if (!waitIfNotPresent) return [3 /*break*/, 4];
                                                        return [4 /*yield*/, waitUntilTime(bigNumberify(currentTime + 1))];
                                                    case 3:
                                                        _b.sent();
                                                        return [3 /*break*/, 6];
                                                    case 4: 
                                                    // Ideally we'd wait until after time has advanced
                                                    return [4 /*yield*/, Timeout.set(500)];
                                                    case 5:
                                                        // Ideally we'd wait until after time has advanced
                                                        _b.sent();
                                                        _b.label = 6;
                                                    case 6: return [2 /*return*/, "continue"];
                                                    case 7:
                                                        ok_e = res.evt;
                                                        debug(dhead, "OKAY");
                                                        return [4 /*yield*/, fetchAndRejectInvalidReceiptFor(ok_e.transactionHash)];
                                                    case 8:
                                                        ok_r = _b.sent();
                                                        debug(dhead, 'ok_r', ok_r);
                                                        return [4 /*yield*/, getProvider()];
                                                    case 9: return [4 /*yield*/, (_b.sent()).getTransaction(ok_e.transactionHash)];
                                                    case 10:
                                                        ok_t = _b.sent();
                                                        debug(dhead, 'ok_t', ok_t);
                                                        // The .gas field doesn't exist on this anymore, apparently?
                                                        // debug(`${ok_evt} gas was ${ok_t.gas} ${ok_t.gasPrice}`);
                                                        if (ok_t.blockNumber) {
                                                            assert(ok_t.blockNumber == ok_r.blockNumber, 'recept & transaction block numbers should match');
                                                            if (ok_e.blockNumber) {
                                                                assert(ok_t.blockNumber == ok_e.blockNumber, 'event & transaction block numbers should match');
                                                            }
                                                        }
                                                        else {
                                                            // XXX For some reason ok_t sometimes doesn't have blockNumber
                                                            if (_warnTxNoBlockNumber) {
                                                                console.log("WARNING: no blockNumber on transaction.");
                                                                console.log(ok_t);
                                                            }
                                                        }
                                                        theBlock_1 = ok_r.blockNumber;
                                                        debug(dhead, "AT", theBlock_1);
                                                        updateLast(ok_r);
                                                        return [4 /*yield*/, getEventData(ok_evt, ok_e)];
                                                    case 11:
                                                        ok_ed = _b.sent();
                                                        debug(dhead, "DATA", ok_ed);
                                                        ok_vals = ok_ed[0][1];
                                                        debug(dhead, "MSG", ok_vals);
                                                        data = T_Tuple(out_tys).unmunge(ok_vals);
                                                        _getLog_1 = function (l_evt, l_ctc) { return __awaiter(_this, void 0, void 0, function () {
                                                            var dheadl, l_e, l_ed, l_edu;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0:
                                                                        dheadl = [dhead, 'getLog', l_evt, l_ctc];
                                                                        debug(dheadl);
                                                                        return [4 /*yield*/, getLog(theBlock_1, theBlock_1, l_evt)];
                                                                    case 1:
                                                                        l_e = (_a.sent());
                                                                        dheadl = __spreadArray(__spreadArray([], dheadl), ['log', l_e]);
                                                                        debug(dheadl);
                                                                        return [4 /*yield*/, getEventData(l_evt, l_e)];
                                                                    case 2:
                                                                        l_ed = (_a.sent())[0];
                                                                        dheadl = __spreadArray(__spreadArray([], dheadl), ['data', l_ed]);
                                                                        debug(dheadl);
                                                                        l_edu = l_ctc.unmunge(l_ed);
                                                                        dheadl = __spreadArray(__spreadArray([], dheadl), ['unmunge', l_edu]);
                                                                        debug(dheadl);
                                                                        return [2 /*return*/, l_edu];
                                                                }
                                                            });
                                                        }); };
                                                        getOutput = function (o_mode, o_lab, o_ctc) {
                                                            void (o_mode);
                                                            return _getLog_1("oe_" + o_lab, o_ctc);
                                                        };
                                                        debug(dhead, "OKAY", ok_vals);
                                                        theBlockBN = bigNumberify(theBlock_1);
                                                        from = ok_t.from;
                                                        return [4 /*yield*/, getTimeSecs(theBlockBN)];
                                                    case 12:
                                                        theSecsBN = _b.sent();
                                                        return [2 /*return*/, { value: {
                                                                    data: data, getOutput: getOutput, from: from,
                                                                    didTimeout: false,
                                                                    time: theBlockBN,
                                                                    secs: theSecsBN
                                                                } }];
                                                }
                                            });
                                        };
                                        _a.label = 2;
                                    case 2:
                                        if (!true) return [3 /*break*/, 4];
                                        return [5 /*yield**/, _loop_1()];
                                    case 3:
                                        state_1 = _a.sent();
                                        if (typeof state_1 === "object")
                                            return [2 /*return*/, state_1.value];
                                        return [3 /*break*/, 2];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); };
                        var creationTime = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, getC()];
                                    case 1:
                                        _a.sent();
                                        // @ts-ignore
                                        return [2 /*return*/, bigNumberify(theCreationTime)];
                                }
                            });
                        }); };
                        var creationSecs = function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = getTimeSecs;
                                    return [4 /*yield*/, creationTime()];
                                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                                case 2: return [2 /*return*/, _b.sent()];
                            }
                        }); }); };
                        var viewlib = {
                            viewMapRef: function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        void (args);
                                        throw Error('viewMapRef not used by ETH backend');
                                    });
                                });
                            }
                        };
                        var views_bin = bin._getViews({ reachStdlib: reachStdlib }, viewlib);
                        var views_namesm = bin._Connectors.ETH.views;
                        var getView1 = function (vs, v, k, vim) {
                            return function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                return __awaiter(_this, void 0, void 0, function () {
                                    var ty, ethersC, vkn, val, e_4;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                void (vs);
                                                ty = vim.ty;
                                                return [4 /*yield*/, getC()];
                                            case 1:
                                                ethersC = _a.sent();
                                                vkn = views_namesm[v][k];
                                                debug('getView1', v, k, 'args', args, vkn, ty);
                                                _a.label = 2;
                                            case 2:
                                                _a.trys.push([2, 4, , 5]);
                                                return [4 /*yield*/, ethersC[vkn].apply(ethersC, args)];
                                            case 3:
                                                val = _a.sent();
                                                debug('getView1', v, k, 'val', val);
                                                return [2 /*return*/, ['Some', ty.unmunge(val)]];
                                            case 4:
                                                e_4 = _a.sent();
                                                debug('getView1', v, k, 'error', e_4);
                                                return [2 /*return*/, ['None', null]];
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                });
                            };
                        };
                        var getViews = getViewsHelper(views_bin, getView1);
                        return { getInfo: getInfo, creationTime: creationTime, creationSecs: creationSecs, sendrecv: sendrecv, recv: recv, waitTime: waitUntilTime, waitSecs: waitUntilSecs, iam: iam, selfAddress: selfAddress, getViews: getViews, stdlib: stdlib };
                    };
                    ;
                    ;
                    tokenMetadata = function (token) { return __awaiter(_this, void 0, void 0, function () {
                        var tokCtc, md, go;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    debug("tokenMetadata", token);
                                    tokCtc = new ethers.Contract(token, ReachToken_ABI, networkAccount);
                                    md = {};
                                    go = function (t, f, m) {
                                        if (m === void 0) { m = f; }
                                        return __awaiter(_this, void 0, void 0, function () {
                                            var rv, v, e_5;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        debug('tokenMetadata', { f: f, m: m });
                                                        _a.label = 1;
                                                    case 1:
                                                        _a.trys.push([1, 3, , 4]);
                                                        return [4 /*yield*/, tokCtc[m]()];
                                                    case 2:
                                                        rv = _a.sent();
                                                        debug('tokenMetadata', { f: f, m: m, rv: rv });
                                                        v = t ? t.unmunge(rv) : rv;
                                                        debug('tokenMetadata', { f: f, m: m, v: v });
                                                        md[f] = v;
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        e_5 = _a.sent();
                                                        debug('tokenMetadata', { f: f, m: m, e: e_5 });
                                                        return [3 /*break*/, 4];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        });
                                    };
                                    return [4 /*yield*/, go(false, 'name')];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, go(false, 'symbol')];
                                case 2:
                                    _a.sent();
                                    return [4 /*yield*/, go(false, 'url')];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, go(false, 'metadata')];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, go(T_UInt, 'supply', 'totalSupply')];
                                case 5:
                                    _a.sent();
                                    debug("tokenMetadata", token, md);
                                    return [2 /*return*/, md];
                            }
                        });
                    }); };
                    return [2 /*return*/, { deploy: deploy, attach: attach, networkAccount: networkAccount, setGasLimit: setGasLimit, getGasLimit: getGasLimit, getAddress: selfAddress, stdlib: stdlib, setDebugLabel: setDebugLabel, tokenAccept: tokenAccept, tokenMetadata: tokenMetadata }];
            }
        });
    }); };
    var newAccountFromSecret = function (secret) { return __awaiter(_this, void 0, void 0, function () {
        var provider, networkAccount, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProvider()];
                case 1:
                    provider = _a.sent();
                    networkAccount = (new ethers.Wallet(secret)).connect(provider);
                    return [4 /*yield*/, connectAccount(networkAccount)];
                case 2:
                    acc = _a.sent();
                    return [2 /*return*/, acc];
            }
        });
    }); };
    var newAccountFromMnemonic = function (phrase) { return __awaiter(_this, void 0, void 0, function () {
        var provider, networkAccount, acc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getProvider()];
                case 1:
                    provider = _a.sent();
                    networkAccount = ethers.Wallet.fromMnemonic(phrase).connect(provider);
                    return [4 /*yield*/, connectAccount(networkAccount)];
                case 2:
                    acc = _a.sent();
                    return [2 /*return*/, acc];
            }
        });
    }); };
    var getDefaultAccount = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    debug("getDefaultAccount");
                    if (!canGetDefaultAccount())
                        throw Error("Default account not available");
                    _a = connectAccount;
                    return [4 /*yield*/, _getDefaultNetworkAccount()];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        });
    }); };
    // TODO: Should users be able to access this directly?
    // TODO: define a faucet on Ropsten & other testnets?
    var _f = replaceableThunk(function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = connectAccount;
                    return [4 /*yield*/, _getDefaultFaucetNetworkAccount()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    }); }), getFaucet = _f[0], setFaucet = _f[1];
    var createAccount = function () { return __awaiter(_this, void 0, void 0, function () {
        var provider, networkAccount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debug("createAccount with 0 balance.");
                    return [4 /*yield*/, getProvider()];
                case 1:
                    provider = _a.sent();
                    networkAccount = ethers.Wallet.createRandom().connect(provider);
                    return [4 /*yield*/, connectAccount(networkAccount)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var fundFromFaucet = function (account, value) { return __awaiter(_this, void 0, void 0, function () {
        var f, faucet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _specialFundFromFaucet()];
                case 1:
                    f = _a.sent();
                    if (!f) return [3 /*break*/, 3];
                    return [4 /*yield*/, f(account, value)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [4 /*yield*/, getFaucet()];
                case 4:
                    faucet = _a.sent();
                    return [4 /*yield*/, transfer(faucet, account, value)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var newTestAccount = function (startingBalance) { return __awaiter(_this, void 0, void 0, function () {
        var acc, to, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debug('newTestAccount(', startingBalance, ')');
                    return [4 /*yield*/, createAccount()];
                case 1:
                    acc = _a.sent();
                    return [4 /*yield*/, getAddr(acc)];
                case 2:
                    to = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    debug('newTestAccount awaiting transfer:', to);
                    return [4 /*yield*/, fundFromFaucet(acc, startingBalance)];
                case 4:
                    _a.sent();
                    debug('newTestAccount got transfer:', to);
                    return [2 /*return*/, acc];
                case 5:
                    e_6 = _a.sent();
                    console.log("newTestAccount: Trouble with account " + to);
                    throw e_6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var newTestAccounts = make_newTestAccounts(newTestAccount);
    var getNetworkTime = function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = bigNumberify;
                    return [4 /*yield*/, getNetworkTimeNumber()];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        });
    }); };
    var getTimeSecs = function (now_bn) { return __awaiter(_this, void 0, void 0, function () {
        var now, provider, timestamp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = bigNumberToNumber(now_bn);
                    return [4 /*yield*/, getProvider()];
                case 1:
                    provider = _a.sent();
                    return [4 /*yield*/, provider.getBlock(now)];
                case 2:
                    timestamp = (_a.sent()).timestamp;
                    return [2 /*return*/, bigNumberify(timestamp)];
            }
        });
    }); };
    var getNetworkSecs = function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getTimeSecs;
                return [4 /*yield*/, getNetworkTime()];
            case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
            case 2: return [2 /*return*/, _b.sent()];
        }
    }); }); };
    var stepTime = function (target) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    void (target);
                    if (!isIsolatedNetwork()) return [3 /*break*/, 3];
                    _a = fundFromFaucet;
                    return [4 /*yield*/, getFaucet()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent(), 0])];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, Timeout.set(500)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [4 /*yield*/, getNetworkTime()];
                case 6: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    var waitUntilTime = make_waitUntilX('time', getNetworkTime, stepTime);
    var stepSecs = function (target) { return __awaiter(_this, void 0, void 0, function () {
        var now, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    void (target);
                    _a = stepTime;
                    return [4 /*yield*/, getNetworkTime()];
                case 1: return [4 /*yield*/, _a.apply(void 0, [(_b.sent()).add(1)])];
                case 2:
                    now = _b.sent();
                    return [4 /*yield*/, getTimeSecs(now)];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    var waitUntilSecs = make_waitUntilX('secs', getNetworkSecs, stepSecs);
    // onProgress callback is optional, it will be given an obj
    // {currentTime, targetTime}
    var wait = function (delta, onProgress) { return __awaiter(_this, void 0, void 0, function () {
        var now;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getNetworkTime()];
                case 1:
                    now = _a.sent();
                    return [4 /*yield*/, waitUntilTime(now.add(delta), onProgress)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var verifyContract = function (ctcInfo, backend) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, verifyContract_(ctcInfo, backend, new EventCache(), 'stdlib')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    var verifyContract_ = function (ctcInfo, backend, eventCache, label) { return __awaiter(_this, void 0, void 0, function () {
        var _a, ABI, Bytecode, deployMode, address, iface, dhead, chk, chkeq, provider, now, lookupLog, e0log, creation_block, dt, ctorArgs, actual, expected;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = backend._Connectors.ETH, ABI = _a.ABI, Bytecode = _a.Bytecode, deployMode = _a.deployMode;
                    address = ctcInfo;
                    iface = new real_ethers.utils.Interface(ABI);
                    dhead = ['verifyContract', label];
                    debug(dhead, { address: address });
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
                    return [4 /*yield*/, getProvider()];
                case 1:
                    provider = _b.sent();
                    return [4 /*yield*/, getNetworkTimeNumber()];
                case 2:
                    now = _b.sent();
                    lookupLog = function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var res;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    debug(dhead, 'lookupLog', { event: event, now: now });
                                    _a.label = 1;
                                case 1:
                                    if (!(eventCache.currentBlock <= now)) return [3 /*break*/, 3];
                                    return [4 /*yield*/, eventCache.queryContract(dhead, address, iface, 0, ['time', bigNumberify(now)], event)];
                                case 2:
                                    res = _a.sent();
                                    if (!res.succ) {
                                        return [3 /*break*/, 1];
                                    }
                                    return [2 /*return*/, res.evt];
                                case 3:
                                    chk(false, "Contract was claimed to be deployed, but the current block is " + now + " (cached @ " + eventCache.currentBlock + ") and it hasn't been deployed yet.");
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    return [4 /*yield*/, lookupLog('e0')];
                case 3:
                    e0log = _b.sent();
                    creation_block = e0log.blockNumber;
                    debug(dhead, "checking code...");
                    return [4 /*yield*/, provider.getTransaction(e0log.transactionHash)];
                case 4:
                    dt = _b.sent();
                    debug(dhead, 'dt', dt);
                    return [4 /*yield*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, e1log, e1p;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _a = deployMode;
                                        switch (_a) {
                                            case 'DM_firstMsg': return [3 /*break*/, 1];
                                            case 'DM_constructor': return [3 /*break*/, 3];
                                        }
                                        return [3 /*break*/, 4];
                                    case 1: return [4 /*yield*/, lookupLog('e1')];
                                    case 2:
                                        e1log = _b.sent();
                                        e1p = iface.parseLog(e1log);
                                        debug("e1p", e1p);
                                        return [2 /*return*/, e1p.args];
                                    case 3: return [2 /*return*/, []];
                                    case 4: throw Error("Unrecognized deployMode: " + deployMode);
                                }
                            });
                        }); })()];
                case 5:
                    ctorArgs = _b.sent();
                    actual = dt.data;
                    expected = Bytecode + iface.encodeDeploy(ctorArgs).slice(2);
                    chkeq(actual, expected, "Contract bytecode does not match expected bytecode.");
                    // We are not checking the balance or the contract storage, because we know
                    // that the code is correct and we know that the code mandates the way that
                    // those things are initialized
                    return [2 /*return*/, { creation_block: creation_block }];
            }
        });
    }); };
    /**
     * @description  Parse currency by network
     * @param amt  value in the {@link standardUnit} for the network.
     * @returns  the amount in the {@link atomicUnit} of the network.
     * @example  parseCurrency(100).toString() // => '100000000000000000000'
     */
    function parseCurrency(amt) {
        return bigNumberify(real_ethers.utils.parseUnits(amt.toString(), standardDigits));
    }
    var minimumBalance = parseCurrency(0);
    /**
     * @description  Format currency by network
     * @param amt  the amount in the {@link atomicUnit} of the network.
     * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
     *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
     *   This argument defaults to maximum precision.
     * @returns  a string representation of that amount in the {@link standardUnit} for that network.
     * @example  formatCurrency(bigNumberify('100000000000000000000')); // => '100'
     */
    function formatCurrency(amt, decimals) {
        if (decimals === void 0) { decimals = standardDigits; }
        // Recall that 1 WEI = 10e18 ETH
        if (!(Number.isInteger(decimals) && 0 <= decimals)) {
            throw Error("Expected decimals to be a nonnegative integer, but got " + decimals + ".");
        }
        // Truncate
        decimals = Math.min(decimals, standardDigits);
        var decimalsToForget = standardDigits - decimals;
        var divAmt = bigNumberify(amt)
            .div(bigNumberify(10).pow(decimalsToForget));
        var amtStr = real_ethers.utils.formatUnits(divAmt, decimals);
        // If the str ends with .0, chop it off
        if (amtStr.slice(amtStr.length - 2) == ".0") {
            return amtStr.slice(0, amtStr.length - 2);
        }
        else {
            return amtStr;
        }
    }
    /**
     * Formats an account's address in the way users expect to see it.
     * @param acc Account, NetworkAccount, or hex-encoded address
     * @returns the address formatted as a hex-encoded string
     */
    function formatAddress(acc) {
        return T_Address.canonicalize(acc); // TODO: typing
    }
    // TODO: restore type ann once types are in place
    // const ethLike: EthLike = {
    var ethLike = __assign(__assign(__assign({}, ethLikeCompiled), providerLib), { getQueryLowerBound: getQueryLowerBound,
        setQueryLowerBound: setQueryLowerBound,
        getFaucet: getFaucet,
        setFaucet: setFaucet,
        randomUInt: randomUInt,
        hasRandom: hasRandom,
        balanceOf: balanceOf,
        transfer: transfer,
        connectAccount: connectAccount,
        newAccountFromSecret: newAccountFromSecret,
        newAccountFromMnemonic: newAccountFromMnemonic,
        getDefaultAccount: getDefaultAccount,
        createAccount: createAccount,
        canFundFromFaucet: canFundFromFaucet,
        fundFromFaucet: fundFromFaucet,
        newTestAccount: newTestAccount,
        newTestAccounts: newTestAccounts,
        getNetworkTime: getNetworkTime,
        waitUntilTime: waitUntilTime,
        wait: wait,
        getNetworkSecs: getNetworkSecs,
        waitUntilSecs: waitUntilSecs,
        verifyContract: verifyContract,
        standardUnit: standardUnit,
        atomicUnit: atomicUnit,
        parseCurrency: parseCurrency,
        minimumBalance: minimumBalance,
        formatCurrency: formatCurrency,
        formatAddress: formatAddress,
        reachStdlib: reachStdlib });
    return ethLike;
}
//# sourceMappingURL=ETH_like.js.map