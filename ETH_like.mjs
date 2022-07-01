var __assign = (this && this.__assign) || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
  return new(P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
    f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

  function verb(n) { return function(v) { return step([n, v]); }; }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
            t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2];
            _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e];
      y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __read = (this && this.__read) || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r, ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) { e = { error: error }; } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally { if (e) throw e.error; }
  }
  return ar;
};
var __values = (this && this.__values) || function(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
import Timeout from 'await-timeout';
import real_ethers from 'ethers';
import { assert, protect, } from './shared_backend.mjs';
import { apiStateMismatchError, replaceableThunk, debug, stdContract, stdVerifyContract, stdGetABI, stdAccount, makeRandom, argsSplit, ensureConnectorAvailable, make_newTestAccounts, make_waitUntilX, checkTimeout, makeEventQueue, makeEventStream, makeSigningMonitor, j2s, j2sf, handleFormat, makeParseCurrency, } from './shared_impl.mjs';
import { bigNumberify, bigNumberToNumber, } from './shared_user.mjs';
import ETHstdlib from './stdlib_sol.mjs';
import { setQueryLowerBound, getQueryLowerBound, formatWithDecimals } from './shared_impl.mjs';
export { setQueryLowerBound, getQueryLowerBound };
// Note: if you want your programs to exit fail
// on unhandled promise rejection, use:
// node --unhandled-rejections=strict
var reachBackendVersion = 17;
var reachEthBackendVersion = 7;
var reachPublish = function(m) { return "_reach_m".concat(m); };
var reachEvent = function(e) { return "_reach_e".concat(e); };
var reachOutputEvent = function(e) { return "_reach_oe_".concat(e); };
// TODO: add return type once types are in place
export function makeEthLike(ethLikeArgs) {
  var _this = this;
  // ...............................................
  var ethLikeCompiled = ethLikeArgs.ethLikeCompiled,
    ethers = ethLikeArgs.ethers,
    _a = ethLikeArgs.standardDigits,
    standardDigits = _a === void 0 ? 18 : _a,
    providerLib = ethLikeArgs.providerLib,
    isIsolatedNetwork = ethLikeArgs.isIsolatedNetwork,
    canGetDefaultAccount = ethLikeArgs.canGetDefaultAccount,
    // isWindowProvider,
    _getDefaultNetworkAccount = ethLikeArgs._getDefaultNetworkAccount,
    _getDefaultFaucetNetworkAccount = ethLikeArgs._getDefaultFaucetNetworkAccount,
    _b = ethLikeArgs._specialFundFromFaucet,
    _specialFundFromFaucet = _b === void 0 ? function() {
      return __awaiter(_this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2 /*return*/ , null];
        });
      });
    } : _b,
    canFundFromFaucet = ethLikeArgs.canFundFromFaucet,
    standardUnit = ethLikeArgs.standardUnit,
    atomicUnit = ethLikeArgs.atomicUnit,
    validQueryWindowDefault = ethLikeArgs.validQueryWindow;
  var _c = __read(replaceableThunk(function() { return validQueryWindowDefault; }), 2),
    getValidQueryWindow = _c[0],
    setValidQueryWindow = _c[1];
  var getProvider = providerLib.getProvider;
  var stdlib = ethLikeCompiled.stdlib;
  var T_Address = stdlib.T_Address,
    T_Tuple = stdlib.T_Tuple,
    T_UInt = stdlib.T_UInt,
    T_Contract = stdlib.T_Contract,
    addressEq = stdlib.addressEq;
  var reachStdlib = stdlib;
  /** @description convenience function for drilling down to the actual address */
  var getAddr = function(acc) {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (typeof acc === 'string') {
              return [2 /*return*/ , acc];
            }
            if (!acc.networkAccount)
              throw Error("Expected acc.networkAccount");
            // TODO better type design here
            // @ts-ignore
            if (acc.networkAccount.address) {
              // @ts-ignore
              return [2 /*return*/ , acc.networkAccount.address];
            }
            if (!acc.networkAccount.getAddress) return [3 /*break*/ , 2];
            return [4 /*yield*/ , acc.networkAccount.getAddress()];
          case 1:
            return [2 /*return*/ , _a.sent()];
          case 2:
            throw Error("Expected acc.networkAccount.address or acc.networkAccount.getAddress");
        }
      });
    });
  };
  // Helpers for sendrecv and recv
  var fetchAndRejectInvalidReceiptFor = function(txHash) {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, r, reject;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            return [4 /*yield*/ , provider.getTransactionReceipt(txHash)];
          case 2:
            r = _a.sent();
            reject = function(x) { throw Error(x); };
            if (!r) {
              reject("No receipt for txHash: ".concat(txHash));
            }
            if (r.transactionHash !== txHash) {
              reject("Bad txHash; ".concat(txHash, " !== ").concat(r.transactionHash));
            }
            if (!r.status) {
              reject("Transaction: ".concat(txHash, " was reverted by EVM\n").concat(r));
            }
            return [2 /*return*/ , r];
        }
      });
    });
  };
  var getNetworkTimeNumber = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, ans;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            return [4 /*yield*/ , provider.getBlockNumber()];
          case 2:
            ans = _a.sent();
            return [2 /*return*/ , ans];
        }
      });
    });
  };
  var sendRecv_prepArg = function(lct, args, tys, evt_cnt) {
    var _a = __read(argsSplit(args, evt_cnt), 2),
      _args_svs = _a[0],
      args_msg = _a[1];
    var _b = __read(argsSplit(tys, evt_cnt), 2),
      _tys_svs = _b[0],
      tys_msg = _b[1];
    void(_args_svs);
    void(_tys_svs);
    // @ts-ignore
    var arg_ty = T_Tuple([T_UInt, T_Tuple(tys_msg)]);
    return arg_ty.munge([lct, args_msg]);
  };
  var bnMax = function(x, y) {
    return x.lt(y) ? y : x;
  };
  var bnMin = function(x, y) {
    return x.lt(y) ? x : y;
  };
  var getTxnTime = function(x) { return bigNumberify(x.blockNumber); };
  var newEventQueue = function() {
    var getTxns = function(lab, initArgs, ctime, howMany) {
      return __awaiter(_this, void 0, void 0, function() {
        var dhead, address, creationBlock, fromBlock, qw, toBlock, toBlock_act, provider, logs, e_1, es, txn_hm, txn_hs, txns;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              dhead = "".concat(lab, " getTxns");
              address = initArgs.ctcAddress, creationBlock = initArgs.creationBlock;
              fromBlock = ctime.eq(0) ? creationBlock : ctime.add(1);
              qw = getValidQueryWindow();
              debug(dhead, { address: address, fromBlock: fromBlock, qw: qw, howMany: howMany });
              if (!(howMany > 0)) return [3 /*break*/ , 2];
              return [4 /*yield*/ , Timeout.set(1000)];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:
              return [4 /*yield*/ , getNetworkTime()];
            case 3:
              toBlock = _a.sent();
              if (qw !== true) {
                toBlock = bnMin(toBlock, fromBlock.add(qw));
              }
              toBlock_act = bnMax(fromBlock, toBlock);
              return [4 /*yield*/ , getProvider()];
            case 4:
              provider = _a.sent();
              debug(dhead, { toBlock: toBlock, toBlock_act: toBlock_act });
              logs = [];
              _a.label = 5;
            case 5:
              _a.trys.push([5, 7, , 8]);
              return [4 /*yield*/ , provider.getLogs({
                fromBlock: bigNumberToNumber(fromBlock),
                toBlock: bigNumberToNumber(toBlock_act),
                address: address
              })];
            case 6:
              logs = _a.sent();
              return [3 /*break*/ , 8];
            case 7:
              e_1 = _a.sent();
              es = "".concat(e_1);
              debug(dhead, "err", e_1, es);
              if (es.includes('Unable to find block hash')) {
                debug(dhead, 'ignore');
                toBlock = undefined;
              } else {
                throw e_1;
              }
              return [3 /*break*/ , 8];
            case 8:
              debug(dhead, { logs: logs });
              txn_hm = {};
              logs.forEach(function(x) { txn_hm[x.transactionHash] = true; });
              txn_hs = Object.keys(txn_hm);
              debug(dhead, { txn_hs: txn_hs });
              return [4 /*yield*/ , Promise.all(txn_hs.map(function(x) { return provider.waitForTransaction(x); }))];
            case 9:
              txns = _a.sent();
              debug(dhead, { txns: txns });
              return [2 /*return*/ , { txns: txns, gtime: toBlock }];
          }
        });
      });
    };
    return makeEventQueue({
      raw2proc: (function(x) { return x; }),
      alwaysIgnored: function(x) { return (void(x), false); },
      getTxns: getTxns,
      getTxnTime: getTxnTime
    });
  };;
  var makeLogRep = function(getCtcAddress, iface, evt, tys) {
    debug("makeLogRep", { evt: evt, tys: tys });
    var parse = function(log) {
      var address = log.address;
      var ctcAddress = getCtcAddress();
      debug("parse", { evt: evt, log: log, ctcAddress: ctcAddress, address: address });
      if (!addressEq(address, ctcAddress)) {
        return undefined;
      }
      var _a = iface.parseLog(log),
        name = _a.name,
        args = _a.args;
      debug("parse", { name: name, args: args });
      if (name !== evt) {
        return undefined;
      }
      if (tys === undefined) {
        return args;
      }
      var unargs = tys.map(function(ty, i) { return ty.unmunge(args[i]); });
      debug("parse", { unargs: unargs });
      return unargs;
    };
    var parseA = function(txn) {
      var e_2, _a;
      try {
        for (var _b = __values(txn.logs), _c = _b.next(); !_c.done; _c = _b.next()) {
          var l = _c.value;
          var p = parse(l);
          debug("parseA", { l: l, p: p });
          if (p) {
            return p;
          }
        }
      } catch (e_2_1) { e_2 = { error: e_2_1 }; } finally {
        try {
          if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        } finally { if (e_2) throw e_2.error; }
      }
      return undefined;
    };
    var parseAb = function(txn) { return parseA(txn) !== undefined; };
    return { parse: parse, parseA: parseA, parseAb: parseAb };
  };
  var makeLogRepFor = function(getCtcAddress, iface, i, tys) {
    debug("hasLogFor", i, tys);
    return makeLogRep(getCtcAddress, iface, reachEvent(i), [
      T_Address,
      T_Tuple([T_UInt, T_Tuple(tys)])
    ]);
  };
  var makeHasLogFor = function(getCtcAddress, iface, i, tys) {
    return makeLogRepFor(getCtcAddress, iface, i, tys).parseAb;
  };
  var _d = makeRandom(32),
    randomUInt = _d.randomUInt,
    hasRandom = _d.hasRandom;
  var minimumBalanceOf = function(acc) {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        void acc;
        return [2 /*return*/ , zeroBn];
      });
    });
  };
  var balancesOf = function(acc, tokens) {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/ , Promise.all(tokens.map(function(tok) { return balanceOf(acc, tok !== null && tok !== void 0 ? tok : false); }))];
      });
    });
  };
  var balanceOf = function(acc, token) {
    if (token === void 0) { token = false; }
    return __awaiter(_this, void 0, void 0, function() {
      var addressable;
      return __generator(this, function(_a) {
        addressable = (typeof acc == 'string') ? acc : acc.networkAccount;
        if (!addressable) {
          throw Error("Cannot get the address of: ".concat(acc));
        }
        return [2 /*return*/ , balanceOfNetworkAccount(addressable, token)];
      });
    });
  };
  var balanceOfNetworkAccount = function(arg, token) {
    if (token === void 0) { token = false; }
    return __awaiter(_this, void 0, void 0, function() {
      var argIsString, addr, _a, _b, provider, _c, networkAccount, _d;
      return __generator(this, function(_e) {
        switch (_e.label) {
          case 0:
            argIsString = typeof arg === 'string';
            if (!argIsString) return [3 /*break*/ , 1];
            _a = arg;
            return [3 /*break*/ , 3];
          case 1:
            return [4 /*yield*/ , getAddr({ networkAccount: arg })];
          case 2:
            _a = _e.sent();
            _e.label = 3;
          case 3:
            addr = _a;
            if (!addr) {
              throw Error("balanceOfNetworkAccount: address missing on ".concat(arg));
            }
            if (!(!token && !argIsString && arg.getBalance)) return [3 /*break*/ , 5];
            _b = bigNumberify;
            return [4 /*yield*/ , arg.getBalance()];
          case 4:
            return [2 /*return*/ , _b.apply(void 0, [_e.sent()])];
          case 5:
            if (!!token) return [3 /*break*/ , 8];
            return [4 /*yield*/ , getProvider()];
          case 6:
            provider = _e.sent();
            _c = bigNumberify;
            return [4 /*yield*/ , provider.getBalance(addr)];
          case 7:
            return [2 /*return*/ , _c.apply(void 0, [_e.sent()])];
          case 8:
            if (!!argIsString) return [3 /*break*/ , 9];
            _d = arg;
            return [3 /*break*/ , 11];
          case 9:
            return [4 /*yield*/ , createNetworkAccount()];
          case 10:
            _d = _e.sent();
            _e.label = 11;
          case 11:
            networkAccount = _d;
            return [4 /*yield*/ , balanceOf_token(networkAccount, addr, token)];
          case 12:
            return [2 /*return*/ , _e.sent()];
        }
      });
    });
  };
  var ReachToken_ABI = ETHstdlib["contracts"]["sol/stdlib.sol:ReachToken"]["abi"];
  var ERC20_ABI = ETHstdlib["contracts"]["sol/stdlib.sol:IERC20"]["abi"];
  var balanceOf_token = function(networkAccount, address, tok) {
    return __awaiter(_this, void 0, void 0, function() {
      var tokCtc, _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            tokCtc = new ethers.Contract(tok, ERC20_ABI, networkAccount);
            _a = bigNumberify;
            return [4 /*yield*/ , tokCtc["balanceOf"](address)];
          case 1:
            return [2 /*return*/ , _a.apply(void 0, [_b.sent()])];
        }
      });
    });
  };
  var _e = __read(makeSigningMonitor(), 2),
    setSigningMonitor = _e[0],
    notifySend = _e[1];
  var doTxn = function(dhead, tp) {
    return __awaiter(_this, void 0, void 0, function() {
      var notifySendp, _a, rt, notifyComplete, rm, ro;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            debug(dhead, { step: "pre call" });
            notifySendp = notifySend;
            return [4 /*yield*/ , notifySendp(dhead, tp)];
          case 1:
            _a = __read.apply(void 0, [_b.sent(), 2]), rt = _a[0], notifyComplete = _a[1];
            debug(dhead, { rt: rt, step: "pre wait" });
            return [4 /*yield*/ , notifyComplete(rt.wait())];
          case 2:
            rm = _b.sent();
            debug(dhead, { rt: rt, rm: rm, step: "pre receipt" });
            assert(rm !== null, "receipt wait null");
            return [4 /*yield*/ , fetchAndRejectInvalidReceiptFor(rm.transactionHash)];
          case 3:
            ro = _b.sent();
            debug(dhead, { rt: rt, rm: rm, ro: ro, step: "post receipt" });
            return [2 /*return*/ , ro];
        }
      });
    });
  };
  var doCall = function(dhead, ctc, funcName, args, value, gasLimit, storageLimit) {
    return __awaiter(_this, void 0, void 0, function() {
      var dpre, tx;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            dpre = "".concat(dhead, " call ").concat(funcName);
            debug(dpre, { args: args, value: value, step: "pre call" });
            tx = { value: value, gasLimit: gasLimit };
            if (storageLimit !== undefined) {
              tx = __assign(__assign({}, tx), { storageLimit: storageLimit });
            }
            return [4 /*yield*/ , doTxn(dpre, ctc[funcName].apply(ctc, __spreadArray(__spreadArray([], __read(args), false), [tx], false)))];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  /** @description Arg order follows "src before dst" convention */
  var transfer = function(from, to, value, token) {
    if (token === void 0) { token = false; }
    return __awaiter(_this, void 0, void 0, function() {
      var sender, receiver, _a, valueb, dhead, txn, tokCtc, gl, sl;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            sender = from.networkAccount;
            if (!(typeof to == 'string')) return [3 /*break*/ , 1];
            _a = to;
            return [3 /*break*/ , 3];
          case 1:
            return [4 /*yield*/ , getAddr(to)];
          case 2:
            _a = _b.sent();
            _b.label = 3;
          case 3:
            receiver = _a;
            valueb = bigNumberify(value);
            dhead = 'transfer';
            if (!!token) return [3 /*break*/ , 5];
            txn = { to: receiver, value: valueb };
            debug('sender.sendTransaction(', txn, ')');
            return [4 /*yield*/ , doTxn(dhead, sender.sendTransaction(txn))];
          case 4:
            return [2 /*return*/ , _b.sent()];
          case 5:
            tokCtc = new ethers.Contract(token, ERC20_ABI, sender);
            gl = from.getGasLimit ? from.getGasLimit() : undefined;
            sl = from.getStorageLimit ? from.getStorageLimit() : undefined;
            return [4 /*yield*/ , doCall(dhead, tokCtc, "transfer", [receiver, valueb], zeroBn, gl, sl)];
          case 6:
            return [2 /*return*/ , _b.sent()];
        }
      });
    });
  };
  var connectAccount = function(networkAccount) {
    return __awaiter(_this, void 0, void 0, function() {
      function setDebugLabel(newLabel) {
        label = newLabel;
        debug('setDebugLabel', { newLabel: newLabel, address: address });
        // @ts-ignore
        return this;
      }
      var _a, address, shad, label, iam, selfAddress, gasLimit, setGasLimit, getGasLimit, storageLimit, setStorageLimit, getStorageLimit, contract, tokenAccepted, tokenAccept, tokenMetadata, accObj, acc, balanceOf_, balancesOf_;
      var _this = this;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            if (!(networkAccount.getAddress && !networkAccount.address)) return [3 /*break*/ , 2];
            // @ts-ignore
            _a = networkAccount;
            return [4 /*yield*/ , getAddr({ networkAccount: networkAccount })];
          case 1:
            // @ts-ignore
            _a.address = _b.sent();
            _b.label = 2;
          case 2:
            return [4 /*yield*/ , getAddr({ networkAccount: networkAccount })];
          case 3:
            address = _b.sent();
            if (!address) {
              throw Error("Expected networkAccount.address: ".concat(networkAccount));
            }
            shad = address.substring(2, 6);
            label = shad;
            iam = function(some_addr) {
              if (addressEq(some_addr, address)) {
                return address;
              } else {
                throw Error("I should be ".concat(some_addr, ", but am ").concat(address));
              }
            };
            selfAddress = function() {
              return address;
            };
            setGasLimit = function(ngl) {
              gasLimit = bigNumberify(ngl);
            };
            getGasLimit = function() { return gasLimit; };
            setStorageLimit = function(bn) {
              storageLimit = bigNumberify(bn);
            };
            getStorageLimit = function() { return storageLimit; };
            contract = function(bin, givenInfoP) {
              ensureConnectorAvailable(bin, 'ETH', reachBackendVersion, reachEthBackendVersion);
              var ABI = JSON.parse(bin._Connectors.ETH.ABI);
              var iface = new real_ethers.utils.Interface(ABI);
              var makeGetC = function(setupViewArgs, eq) {
                var getInfo = setupViewArgs.getInfo;
                var _ethersC = null;
                return function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    var info, creationBlock, ctcAddress;
                    var _this = this;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          if (_ethersC) {
                            return [2 /*return*/ , _ethersC];
                          }
                          return [4 /*yield*/ , getInfo()];
                        case 1:
                          info = _a.sent();
                          return [4 /*yield*/ , stdVerifyContract(setupViewArgs, (function() {
                            return __awaiter(_this, void 0, void 0, function() {
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    return [4 /*yield*/ , verifyContract_(info, bin, eq, label)];
                                  case 1:
                                    return [2 /*return*/ , _a.sent()];
                                }
                              });
                            });
                          }))];
                        case 2:
                          creationBlock = (_a.sent()).creationBlock;
                          ctcAddress = info;
                          if (!eq.isInited()) {
                            eq.init({ ctcAddress: ctcAddress, creationBlock: creationBlock });
                          }
                          debug(label, "contract verified");
                          return [2 /*return*/ , (_ethersC = new ethers.Contract(ctcAddress, ABI, networkAccount))];
                      }
                    });
                  });
                };
              };
              var _setup = function(setupArgs) {
                var setInfo = setupArgs.setInfo,
                  getInfo = setupArgs.getInfo,
                  setTrustedVerifyResult = setupArgs.setTrustedVerifyResult;
                var eq = newEventQueue();
                // Attached state
                var getC = makeGetC(setupArgs, eq);
                var callC = function(dhead, funcName, arg, pay) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var _a, value, toks, ethersC, actualCall, callTok, maybePayTok;
                    var _this = this;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          _a = __read(pay, 2), value = _a[0], toks = _a[1];
                          return [4 /*yield*/ , getC()];
                        case 1:
                          ethersC = _b.sent();
                          actualCall = function() {
                            return __awaiter(_this, void 0, void 0, function() {
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    return [4 /*yield*/ , doCall("".concat(dhead, " callC::reach"), ethersC, funcName, [arg], value, gasLimit, storageLimit)];
                                  case 1:
                                    return [2 /*return*/ , _a.sent()];
                                }
                              });
                            });
                          };
                          callTok = function(tok, amt) {
                            return __awaiter(_this, void 0, void 0, function() {
                              var tokBalance, tokCtc;
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    return [4 /*yield*/ , balanceOf_token(networkAccount, address, tok)];
                                  case 1:
                                    tokBalance = _a.sent();
                                    debug(__assign(__assign({}, dhead), { kind: 'token' }), 'balanceOf', tokBalance);
                                    assert(tokBalance.gte(amt), "local account token balance is insufficient: ".concat(tokBalance, " < ").concat(amt));
                                    tokCtc = new ethers.Contract(tok, ERC20_ABI, networkAccount);
                                    return [4 /*yield*/ , doCall("".concat(dhead, " callC::token"), tokCtc, "approve", [ethersC.address, amt], zeroBn, gasLimit, storageLimit)];
                                  case 2:
                                    _a.sent();
                                    return [2 /*return*/ ];
                                }
                              });
                            });
                          };
                          maybePayTok = function(i) {
                            return __awaiter(_this, void 0, void 0, function() {
                              var _a, amt, tok, e_3;
                              return __generator(this, function(_b) {
                                switch (_b.label) {
                                  case 0:
                                    if (!(i < toks.length)) return [3 /*break*/ , 10];
                                    _a = __read(toks[i], 2), amt = _a[0], tok = _a[1];
                                    if (!amt.gt(0)) return [3 /*break*/ , 7];
                                    return [4 /*yield*/ , callTok(tok, amt)];
                                  case 1:
                                    _b.sent();
                                    _b.label = 2;
                                  case 2:
                                    _b.trys.push([2, 4, , 6]);
                                    return [4 /*yield*/ , maybePayTok(i + 1)];
                                  case 3:
                                    return [2 /*return*/ , _b.sent()];
                                  case 4:
                                    e_3 = _b.sent();
                                    return [4 /*yield*/ , callTok(tok, zeroBn)];
                                  case 5:
                                    _b.sent();
                                    throw e_3;
                                  case 6:
                                    return [3 /*break*/ , 9];
                                  case 7:
                                    return [4 /*yield*/ , maybePayTok(i + 1)];
                                  case 8:
                                    return [2 /*return*/ , _b.sent()];
                                  case 9:
                                    return [3 /*break*/ , 12];
                                  case 10:
                                    return [4 /*yield*/ , actualCall()];
                                  case 11:
                                    return [2 /*return*/ , _b.sent()];
                                  case 12:
                                    return [2 /*return*/ ];
                                }
                              });
                            });
                          };
                          return [4 /*yield*/ , maybePayTok(0)];
                        case 2:
                          return [2 /*return*/ , _b.sent()];
                      }
                    });
                  });
                };
                var codec = real_ethers.utils.defaultAbiCoder;
                var decodeEm = function(ty, bs) {
                  var dhead = [label, 'decodeEm'];
                  debug(dhead, ty, bs);
                  var _a = __read(codec.decode([ty.paramType], bs), 1),
                    de = _a[0];
                  debug(dhead, de);
                  var un = ty.unmunge(de);
                  debug(dhead, un);
                  return un;
                };
                var isAPI = false;
                var getState = function(vibne, tys) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var _a, vibna, vsbs, ty, res;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          isAPI = true;
                          return [4 /*yield*/ , getGlobalState()];
                        case 1:
                          _a = __read.apply(void 0, [_b.sent(), 2]), vibna = _a[0], vsbs = _a[1];
                          debug("getState", { vibne: vibne, vibna: vibna, vsbs: vsbs });
                          if (!vibne.eq(vibna)) {
                            throw apiStateMismatchError(bin, vibne, vibna);
                          }
                          ty = T_Tuple(tys);
                          res = decodeEm(ty, vsbs);
                          debug("getState", res);
                          // @ts-ignore
                          return [2 /*return*/ , res];
                      }
                    });
                  });
                };
                var apiMapRef = function(i, ty) {
                  return function(f) {
                    return __awaiter(_this, void 0, void 0, function() {
                      var dhead, ethersC, mf, mfv, res;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            dhead = [label, 'apiMapRef'];
                            debug(dhead, { i: i, ty: ty, f: f });
                            return [4 /*yield*/ , getC()];
                          case 1:
                            ethersC = _a.sent();
                            mf = "_reachMap".concat(i, "Ref");
                            debug(dhead, mf);
                            return [4 /*yield*/ , ethersC[mf](f)];
                          case 2:
                            mfv = _a.sent();
                            debug(dhead, { mfv: mfv });
                            res = ty.unmunge(mfv);
                            debug(dhead, res);
                            // @ts-ignore
                            return [2 /*return*/ , res];
                        }
                      });
                    });
                  };
                };
                var canIWin = function(lct) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var ethersC, ret, val, e_4;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          if (lct.eq(0)) {
                            return [2 /*return*/ , true];
                          }
                          return [4 /*yield*/ , getC()];
                        case 1:
                          ethersC = _a.sent();
                          ret = true;
                          _a.label = 2;
                        case 2:
                          _a.trys.push([2, 4, , 5]);
                          return [4 /*yield*/ , ethersC["_reachCurrentTime"]()];
                        case 3:
                          val = _a.sent();
                          ret = lct.eq(val);
                          debug(label, "canIWin", { lct: lct, val: val });
                          return [3 /*break*/ , 5];
                        case 4:
                          e_4 = _a.sent();
                          debug(label, "canIWin", { e: e_4 });
                          return [3 /*break*/ , 5];
                        case 5:
                          debug(label, "canIWin", { ret: ret });
                          return [2 /*return*/ , ret];
                      }
                    });
                  });
                };
                var getGlobalState = function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    var ethersC;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          return [4 /*yield*/ , getC()];
                        case 1:
                          ethersC = _a.sent();
                          return [4 /*yield*/ , ethersC["_reachCurrentState"]()];
                        case 2:
                          return [2 /*return*/ , _a.sent()];
                      }
                    });
                  });
                };
                var sendrecv = function(srargs) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var funcNum, evt_cnt, lct, tys, args, pay, out_tys, onlyIf, soloSend, timeoutAt, doRecv, funcName, dhead, trustedRecv, arg, Bytecode, factory, _a, value, toks, overrides, notifySendp, _b, contract_1, notifyComplete, deploy_r, ctcAddress, creationBlock, _c, _d, _e, _f, ok_r, e_5, jes;
                    var _this = this;
                    return __generator(this, function(_g) {
                      switch (_g.label) {
                        case 0:
                          funcNum = srargs.funcNum, evt_cnt = srargs.evt_cnt, lct = srargs.lct, tys = srargs.tys, args = srargs.args, pay = srargs.pay, out_tys = srargs.out_tys, onlyIf = srargs.onlyIf, soloSend = srargs.soloSend, timeoutAt = srargs.timeoutAt;
                          doRecv = function(didSend, waitIfNotPresent, msg) {
                            return __awaiter(_this, void 0, void 0, function() {
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    debug(dhead, "doRecv", msg);
                                    if (!didSend && lct.eq(0)) {
                                      throw new Error("API call failed: ".concat(msg));
                                    }
                                    return [4 /*yield*/ , recv({ funcNum: funcNum, evt_cnt: evt_cnt, out_tys: out_tys, didSend: didSend, waitIfNotPresent: waitIfNotPresent, timeoutAt: timeoutAt })];
                                  case 1:
                                    return [2 /*return*/ , _a.sent()];
                                }
                              });
                            });
                          };
                          if (!!onlyIf) return [3 /*break*/ , 2];
                          return [4 /*yield*/ , doRecv(false, true, "onlyIf false")];
                        case 1:
                          return [2 /*return*/ , _g.sent()];
                        case 2:
                          funcName = reachPublish(funcNum);
                          dhead = "".concat(label, " send ").concat(funcName, " ").concat(timeoutAt);
                          trustedRecv = function(ok_r) {
                            return __awaiter(_this, void 0, void 0, function() {
                              var didSend, ethersC_1, correctStep;
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    didSend = true;
                                    if (!!isAPI) return [3 /*break*/ , 2];
                                    return [4 /*yield*/ , doRecv(didSend, false, "succeeded")];
                                  case 1:
                                    return [2 /*return*/ , _a.sent()];
                                  case 2:
                                    return [4 /*yield*/ , getC()];
                                  case 3:
                                    ethersC_1 = _a.sent();
                                    correctStep = makeHasLogFor((function() { return ethersC_1.address; }), iface, funcNum, out_tys);
                                    eq.pushIgnore(correctStep);
                                    return [4 /*yield*/ , recvFrom({ dhead: dhead, out_tys: out_tys, didSend: didSend, funcNum: funcNum, ok_r: ok_r })];
                                  case 4:
                                    return [2 /*return*/ , _a.sent()];
                                }
                              });
                            });
                          };
                          debug(dhead, 'ARGS', args);
                          arg = sendRecv_prepArg(lct, args, tys, evt_cnt);
                          debug(dhead, 'START', arg);
                          if (!(funcNum == 0)) return [3 /*break*/ , 6];
                          debug(dhead, "deploying");
                          Bytecode = bin._Connectors.ETH.Bytecode;
                          debug(label, 'making contract factory');
                          factory = new ethers.ContractFactory(ABI, Bytecode, networkAccount);
                          debug(label, "deploying factory");
                          _a = __read(pay, 2), value = _a[0], toks = _a[1];
                          void(toks);
                          overrides = { value: value, gasLimit: gasLimit };
                          if (storageLimit !== undefined) {
                            // @ts-ignore
                            overrides.storageLimit = storageLimit;
                          }
                          notifySendp = notifySend;
                          return [4 /*yield*/ , notifySendp("".concat(dhead, " deploy"), factory.deploy(arg, overrides))];
                        case 3:
                          _b = __read.apply(void 0, [_g.sent(), 2]), contract_1 = _b[0], notifyComplete = _b[1];
                          debug(label, "waiting for receipt:", contract_1.deployTransaction.hash);
                          return [4 /*yield*/ , notifyComplete(contract_1.deployTransaction.wait())];
                        case 4:
                          deploy_r = _g.sent();
                          ctcAddress = contract_1.address;
                          creationBlock = bigNumberify(deploy_r.blockNumber);
                          debug(label, "deployed", { ctcAddress: ctcAddress, creationBlock: creationBlock });
                          eq.init({ ctcAddress: ctcAddress, creationBlock: creationBlock });
                          setTrustedVerifyResult({ creationBlock: creationBlock });
                          setInfo(ctcAddress);
                          return [4 /*yield*/ , trustedRecv(deploy_r)];
                        case 5:
                          return [2 /*return*/ , _g.sent()];
                        case 6:
                          // Make sure the ctc is available and verified (before we get into try/catch)
                          // https://github.com/reach-sh/reach-lang/issues/134
                          return [4 /*yield*/ , getC()];
                        case 7:
                          // Make sure the ctc is available and verified (before we get into try/catch)
                          // https://github.com/reach-sh/reach-lang/issues/134
                          _g.sent();
                          _g.label = 8;
                        case 8:
                          if (!true) return [3 /*break*/ , 24];
                          debug(dhead, 'TIMECHECK', { timeoutAt: timeoutAt });
                          _c = checkTimeout;
                          _d = [isIsolatedNetwork, getTimeSecs, timeoutAt];
                          _e = bigNumberify;
                          return [4 /*yield*/ , getNetworkTimeNumber()];
                        case 9:
                          return [4 /*yield*/ , _c.apply(void 0, _d.concat([(_e.apply(void 0, [_g.sent()])).add(1)]))];
                        case 10:
                          if (!_g.sent()) return [3 /*break*/ , 12];
                          debug(dhead, 'FAIL/TIMEOUT');
                          return [4 /*yield*/ , doRecv(false, false, "timeout")];
                        case 11:
                          return [2 /*return*/ , _g.sent()];
                        case 12:
                          _f = !soloSend;
                          if (!_f) return [3 /*break*/ , 14];
                          return [4 /*yield*/ , canIWin(lct)];
                        case 13:
                          _f = !(_g.sent());
                          _g.label = 14;
                        case 14:
                          if (!_f) return [3 /*break*/ , 16];
                          debug(dhead, "CANNOT WIN");
                          return [4 /*yield*/ , doRecv(false, false, "cannot win ".concat(lct))];
                        case 15:
                          return [2 /*return*/ , _g.sent()];
                        case 16:
                          ok_r = void 0;
                          _g.label = 17;
                        case 17:
                          _g.trys.push([17, 19, , 22]);
                          debug(dhead, 'ARG', arg, pay);
                          return [4 /*yield*/ , callC(dhead, funcName, arg, pay)];
                        case 18:
                          ok_r = _g.sent();
                          return [3 /*break*/ , 22];
                        case 19:
                          e_5 = _g.sent();
                          debug(dhead, "ERROR", { stack: e_5.stack }, e_5);
                          jes = j2s(e_5);
                          if (!!soloSend) return [3 /*break*/ , 21];
                          debug(dhead, "LOST");
                          return [4 /*yield*/ , doRecv(false, false, jes)];
                        case 20:
                          return [2 /*return*/ , _g.sent()];
                        case 21:
                          if (timeoutAt) {
                            // If there can be a timeout, then keep waiting for it
                            debug(dhead, "CONTINUE");
                            return [3 /*break*/ , 8];
                          } else {
                            // Otherwise, something bad is happening
                            throw Error("".concat(label, " failed to call ").concat(funcName, ": ").concat(jes));
                          }
                          return [3 /*break*/ , 22];
                        case 22:
                          debug(dhead, 'SUCC');
                          return [4 /*yield*/ , trustedRecv(ok_r)];
                        case 23:
                          return [2 /*return*/ , _g.sent()];
                        case 24:
                          return [2 /*return*/ ];
                      }
                    });
                  });
                };
                var recvFrom = function(rfargs) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var dhead, out_tys, didSend, funcNum, ok_r, theBlock, ethersC, getCtcAddress, ep, from, data, theBlockBN, theSecsBN, getOutput;
                    var _this = this;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          dhead = rfargs.dhead, out_tys = rfargs.out_tys, didSend = rfargs.didSend, funcNum = rfargs.funcNum, ok_r = rfargs.ok_r;
                          debug(dhead, 'OKR', ok_r);
                          debug(dhead, 'OKR.L', ok_r.logs);
                          theBlock = ok_r.blockNumber;
                          debug(dhead, "AT", theBlock);
                          return [4 /*yield*/ , getC()];
                        case 1:
                          ethersC = _a.sent();
                          getCtcAddress = function() { return ethersC.address; };
                          ep = makeLogRepFor(getCtcAddress, iface, funcNum, out_tys).parseA(ok_r);
                          if (!ep) {
                            throw Error("no event log");
                          }
                          debug(dhead, 'Event', ep);
                          from = ep[0];
                          data = ep[1][1];
                          debug(dhead, "OKAY", data);
                          theBlockBN = bigNumberify(theBlock);
                          debug(dhead, 'from', { from: from });
                          return [4 /*yield*/ , getTimeSecs(theBlockBN)];
                        case 2:
                          theSecsBN = _a.sent();
                          getOutput = function(o_mode, o_lab, l_ctc, o_val) {
                            return __awaiter(_this, void 0, void 0, function() {
                              var l_evt, lr, _a, _b, l, r;
                              var e_6, _c;
                              return __generator(this, function(_d) {
                                void(o_mode);
                                void(o_val);
                                l_evt = reachOutputEvent(o_lab);
                                lr = makeLogRep(getCtcAddress, iface, l_evt, [l_ctc]);
                                try {
                                  for (_a = __values(ok_r.logs), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    l = _b.value;
                                    r = lr.parse(l);
                                    debug(dhead, 'getOutput', l_evt, r);
                                    if (r) {
                                      return [2 /*return*/ , r[0]];
                                    }
                                  }
                                } catch (e_6_1) { e_6 = { error: e_6_1 }; } finally {
                                  try {
                                    if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                                  } finally { if (e_6) throw e_6.error; }
                                }
                                throw Error("no log for ".concat(l_evt));
                              });
                            });
                          };
                          return [2 /*return*/ , {
                            data: data,
                            getOutput: getOutput,
                            from: from,
                            didSend: didSend,
                            didTimeout: false,
                            time: theBlockBN,
                            secs: theSecsBN
                          }];
                      }
                    });
                  });
                };
                // XXX stupidly the same as ALGO.ts's version
                var recv = function(rargs) {
                  return __awaiter(_this, void 0, void 0, function() {
                    var funcNum, out_tys, didSend, timeoutAt, waitIfNotPresent, funcName, dhead, ethersC, didTimeout, res, correctStep, good, txn;
                    var _this = this;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          funcNum = rargs.funcNum, out_tys = rargs.out_tys, didSend = rargs.didSend, timeoutAt = rargs.timeoutAt, waitIfNotPresent = rargs.waitIfNotPresent;
                          funcName = "m".concat(funcNum);
                          dhead = "".concat(label, ": recv ").concat(funcName, " ").concat(timeoutAt);
                          debug(dhead, 'start');
                          return [4 /*yield*/ , getC()];
                        case 1:
                          ethersC = _a.sent();
                          didTimeout = function(cr_bn) {
                            return __awaiter(_this, void 0, void 0, function() {
                              var crp, r;
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    crp = cr_bn.add(1);
                                    debug(dhead, 'TIMECHECK', { timeoutAt: timeoutAt, cr_bn: cr_bn, crp: crp });
                                    return [4 /*yield*/ , checkTimeout(isIsolatedNetwork, getTimeSecs, timeoutAt, crp)];
                                  case 1:
                                    r = _a.sent();
                                    debug(dhead, 'TIMECHECK', { r: r, waitIfNotPresent: waitIfNotPresent });
                                    if (!(!r && waitIfNotPresent)) return [3 /*break*/ , 3];
                                    return [4 /*yield*/ , waitUntilTime(crp)];
                                  case 2:
                                    _a.sent();
                                    _a.label = 3;
                                  case 3:
                                    return [2 /*return*/ , r];
                                }
                              });
                            });
                          };
                          return [4 /*yield*/ , eq.peq(dhead, didTimeout)];
                        case 2:
                          res = _a.sent();
                          debug(dhead, "res", res);
                          correctStep = makeHasLogFor((function() { return ethersC.address; }), iface, funcNum, out_tys);
                          good = (!res.timeout) && correctStep(res.txn);
                          if (!good) return [3 /*break*/ , 5];
                          return [4 /*yield*/ , eq.deq(dhead)];
                        case 3:
                          _a.sent();
                          txn = res.txn;
                          return [4 /*yield*/ , recvFrom({ dhead: dhead, out_tys: out_tys, didSend: didSend, funcNum: funcNum, ok_r: txn })];
                        case 4:
                          return [2 /*return*/ , _a.sent()];
                        case 5:
                          if (timeoutAt) {
                            debug(dhead, "timeout");
                            return [2 /*return*/ , { didTimeout: true }];
                          } else {
                            throw Error("impossible: not good, but no timeout");
                          }
                          _a.label = 6;
                        case 6:
                          return [2 /*return*/ ];
                      }
                    });
                  });
                };
                // Returns address of a Reach contract
                var getContractAddress = getInfo;
                var getContractInfo = getInfo;
                var getBalance = function(mtok) {
                  if (mtok === void 0) { mtok = false; }
                  return balanceOfNetworkAccount(networkAccount, mtok);
                };
                var getContractCompanion = function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      return [2 /*return*/ , ['None', null]];
                    });
                  });
                };
                var getCurrentStep = function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    var _a, cs, _;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          return [4 /*yield*/ , getGlobalState()];
                        case 1:
                          _a = __read.apply(void 0, [_b.sent(), 2]), cs = _a[0], _ = _a[1];
                          return [2 /*return*/ , cs];
                      }
                    });
                  });
                };
                return { getContractInfo: getContractInfo, getContractAddress: getContractAddress, getContractCompanion: getContractCompanion, getBalance: getBalance, getCurrentStep: getCurrentStep, sendrecv: sendrecv, recv: recv, getState: getState, apiMapRef: apiMapRef };
              };
              var setupView = function(setupViewArgs) {
                var eq = newEventQueue();
                var getC = makeGetC(setupViewArgs, eq);
                var viewLib = {
                  viewMapRef: function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    return __awaiter(_this, void 0, void 0, function() {
                      return __generator(this, function(_a) {
                        void(args);
                        throw Error('viewMapRef not used by ETH backend');
                      });
                    });
                  }
                };
                var views_namesm = bin._Connectors.ETH.views;
                var getView1 = function(vs, v, k, vim, isSafe) {
                  if (isSafe === void 0) { isSafe = true; }
                  return function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    return __awaiter(_this, void 0, void 0, function() {
                      var ty, ethersC, vnv, vkn, val, uv, e_7;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            void(vs);
                            ty = vim.ty;
                            return [4 /*yield*/ , getC()];
                          case 1:
                            ethersC = _a.sent();
                            vnv = views_namesm[v];
                            vkn = (typeof vnv === 'string') ? vnv : vnv[k];
                            debug(label, 'getView1', v, k, 'args', args, vkn, ty);
                            _a.label = 2;
                          case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/ , ethersC[vkn].apply(ethersC, __spreadArray([], __read(args), false))];
                          case 3:
                            val = _a.sent();
                            debug(label, 'getView1', v, k, 'val', val);
                            uv = ty.unmunge(val);
                            return [2 /*return*/ , isSafe ? ['Some', uv] : uv];
                          case 4:
                            e_7 = _a.sent();
                            debug(label, 'getView1', v, k, 'error', e_7);
                            if (isSafe) {
                              return [2 /*return*/ , ['None', null]];
                            } else {
                              throw Error("View ".concat(v, ".").concat(k, " is not set."));
                            }
                            return [3 /*break*/ , 5];
                          case 5:
                            return [2 /*return*/ ];
                        }
                      });
                    });
                  };
                };
                return { getView1: getView1, viewLib: viewLib };
              };
              var setupEvents = function(setupArgs) {
                var createEventStream = function(evt, tys) {
                  var eq = newEventQueue();
                  var getC = makeGetC(setupArgs, eq);
                  var ca = '';
                  var sync = function() {
                    return __awaiter(_this, void 0, void 0, function() {
                      var c;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            return [4 /*yield*/ , getC()];
                          case 1:
                            c = _a.sent();
                            ca = c.address;
                            return [2 /*return*/ ];
                        }
                      });
                    });
                  };
                  var getLogs = function(r) { return r.logs; };
                  var lr = makeLogRep((function() { return ca; }), iface, evt, tys);
                  var parseLog = lr.parse;
                  return makeEventStream({
                    eq: eq,
                    getTxnTime: getTxnTime,
                    sync: sync,
                    getNetworkTime: getNetworkTime,
                    getLogs: getLogs,
                    parseLog: parseLog
                  });
                };
                return { createEventStream: createEventStream };
              };
              var getABI = stdGetABI(ABI);
              return stdContract({ bin: bin, getABI: getABI, waitUntilTime: waitUntilTime, waitUntilSecs: waitUntilSecs, selfAddress: selfAddress, iam: iam, stdlib: stdlib, setupView: setupView, setupEvents: setupEvents, _setup: _setup, givenInfoP: givenInfoP });
            };;
            tokenAccepted = function(token) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  debug("tokenAccepted: Unnecessary on ETHlike", token);
                  return [2 /*return*/ , true];
                });
              });
            };
            tokenAccept = function(token) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  debug("tokenAccept: Unnecessary on ETHlike", token);
                  return [2 /*return*/ ];
                });
              });
            };
            tokenMetadata = function(token) {
              return __awaiter(_this, void 0, void 0, function() {
                var lab, tokCtc, get, md, go;
                var _a;
                var _this = this;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                    case 0:
                      lab = "tokenMetadata";
                      debug(lab, token);
                      tokCtc = new ethers.Contract(token, ReachToken_ABI, networkAccount);
                      get = function(t, m) {
                        return __awaiter(_this, void 0, void 0, function() {
                          var rv, v;
                          return __generator(this, function(_a) {
                            switch (_a.label) {
                              case 0:
                                debug(lab, { m: m });
                                return [4 /*yield*/ , tokCtc[m]()];
                              case 1:
                                rv = _a.sent();
                                debug(lab, { m: m, rv: rv });
                                v = t ? t.unmunge(rv) : rv;
                                debug(lab, { m: m, v: v });
                                return [2 /*return*/ , v];
                            }
                          });
                        });
                      };
                      _a = {};
                      return [4 /*yield*/ , get(T_UInt, 'totalSupply')];
                    case 1:
                      md = (_a.supply = _b.sent(),
                        _a);
                      go = function(t, f, m) {
                        if (m === void 0) { m = f; }
                        return __awaiter(_this, void 0, void 0, function() {
                          var _a, _b, e_8;
                          return __generator(this, function(_c) {
                            switch (_c.label) {
                              case 0:
                                _c.trys.push([0, 2, , 3]);
                                _a = md;
                                _b = f;
                                return [4 /*yield*/ , get(t, m)];
                              case 1:
                                _a[_b] = _c.sent();
                                return [3 /*break*/ , 3];
                              case 2:
                                e_8 = _c.sent();
                                debug(lab, { f: f, m: m, e: e_8 });
                                return [3 /*break*/ , 3];
                              case 3:
                                return [2 /*return*/ ];
                            }
                          });
                        });
                      };
                      return [4 /*yield*/ , go(false, 'name')];
                    case 2:
                      _b.sent();
                      return [4 /*yield*/ , go(false, 'symbol')];
                    case 3:
                      _b.sent();
                      return [4 /*yield*/ , go(false, 'url')];
                    case 4:
                      _b.sent();
                      return [4 /*yield*/ , go(false, 'metadata')];
                    case 5:
                      _b.sent();
                      return [4 /*yield*/ , go(T_UInt, 'decimals')];
                    case 6:
                      _b.sent();
                      debug(lab, token, md);
                      return [2 /*return*/ , md];
                  }
                });
              });
            };
            accObj = { networkAccount: networkAccount, getAddress: selfAddress, stdlib: stdlib, setDebugLabel: setDebugLabel, tokenAccepted: tokenAccepted, tokenAccept: tokenAccept, tokenMetadata: tokenMetadata, contract: contract, setGasLimit: setGasLimit, getGasLimit: getGasLimit, setStorageLimit: setStorageLimit, getStorageLimit: getStorageLimit };
            acc = accObj;
            balanceOf_ = function(token) { return balanceOf(acc, token); };
            balancesOf_ = function(tokens) { return balancesOf(acc, tokens); };
            return [2 /*return*/ , stdAccount(__assign(__assign({}, accObj), { balanceOf: balanceOf_, balancesOf: balancesOf_ }))];
        }
      });
    });
  };
  var newAccountFromSecret = function(secret) {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, networkAccount, acc;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            networkAccount = (new ethers.Wallet(secret)).connect(provider);
            return [4 /*yield*/ , connectAccount(networkAccount)];
          case 2:
            acc = _a.sent();
            return [2 /*return*/ , acc];
        }
      });
    });
  };
  var newAccountFromMnemonic = function(phrase) {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, networkAccount, acc;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            networkAccount = ethers.Wallet.fromMnemonic(phrase).connect(provider);
            return [4 /*yield*/ , connectAccount(networkAccount)];
          case 2:
            acc = _a.sent();
            return [2 /*return*/ , acc];
        }
      });
    });
  };
  var getDefaultAccount = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            debug("getDefaultAccount");
            if (!canGetDefaultAccount())
              throw Error("Default account not available");
            _a = connectAccount;
            return [4 /*yield*/ , _getDefaultNetworkAccount()];
          case 1:
            return [2 /*return*/ , _a.apply(void 0, [_b.sent()])];
        }
      });
    });
  };
  // TODO: Should users be able to access this directly?
  // TODO: define a faucet on Ropsten & other testnets?
  var _f = __read(replaceableThunk(function() {
      return __awaiter(_this, void 0, void 0, function() {
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _a = connectAccount;
              return [4 /*yield*/ , _getDefaultFaucetNetworkAccount()];
            case 1:
              return [4 /*yield*/ , _a.apply(void 0, [_b.sent()])];
            case 2:
              return [2 /*return*/ , _b.sent()];
          }
        });
      });
    }), 2),
    getFaucet = _f[0],
    setFaucet = _f[1];
  var createNetworkAccount = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var provider;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            return [2 /*return*/ , ethers.Wallet.createRandom().connect(provider)];
        }
      });
    });
  };
  var createAccount = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var networkAccount;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            debug("createAccount with 0 balance.");
            return [4 /*yield*/ , createNetworkAccount()];
          case 1:
            networkAccount = _a.sent();
            return [4 /*yield*/ , connectAccount(networkAccount)];
          case 2:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var fundFromFaucet = function(account, value) {
    return __awaiter(_this, void 0, void 0, function() {
      var f, faucet;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , _specialFundFromFaucet()];
          case 1:
            f = _a.sent();
            if (!f) return [3 /*break*/ , 3];
            return [4 /*yield*/ , f(account, value)];
          case 2:
            return [2 /*return*/ , _a.sent()];
          case 3:
            return [4 /*yield*/ , getFaucet()];
          case 4:
            faucet = _a.sent();
            return [4 /*yield*/ , transfer(faucet, account, value)];
          case 5:
            _a.sent();
            _a.label = 6;
          case 6:
            return [2 /*return*/ ];
        }
      });
    });
  };
  var newTestAccount = function(startingBalance) {
    return __awaiter(_this, void 0, void 0, function() {
      var acc, to, e_9;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            debug('newTestAccount(', startingBalance, ')');
            return [4 /*yield*/ , createAccount()];
          case 1:
            acc = _a.sent();
            return [4 /*yield*/ , getAddr(acc)];
          case 2:
            to = _a.sent();
            if (!zeroBn.lt(startingBalance)) return [3 /*break*/ , 6];
            _a.label = 3;
          case 3:
            _a.trys.push([3, 5, , 6]);
            debug('newTestAccount awaiting transfer:', to);
            return [4 /*yield*/ , fundFromFaucet(acc, startingBalance)];
          case 4:
            _a.sent();
            debug('newTestAccount got transfer:', to);
            return [3 /*break*/ , 6];
          case 5:
            e_9 = _a.sent();
            console.log("newTestAccount: Trouble with account ".concat(to));
            throw e_9;
          case 6:
            return [2 /*return*/ , acc];
        }
      });
    });
  };
  var newTestAccounts = make_newTestAccounts(newTestAccount).serial;
  var getNetworkTime = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = bigNumberify;
            return [4 /*yield*/ , getNetworkTimeNumber()];
          case 1:
            return [2 /*return*/ , _a.apply(void 0, [_b.sent()])];
        }
      });
    });
  };
  var getTimeSecs = function(now_bn) {
    return __awaiter(_this, void 0, void 0, function() {
      var now, provider, timestamp;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            now = bigNumberToNumber(now_bn);
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            return [4 /*yield*/ , provider.getBlock(now)];
          case 2:
            timestamp = (_a.sent()).timestamp;
            return [2 /*return*/ , bigNumberify(timestamp)];
        }
      });
    });
  };
  var getNetworkSecs = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = getTimeSecs;
            return [4 /*yield*/ , getNetworkTime()];
          case 1:
            return [4 /*yield*/ , _a.apply(void 0, [_b.sent()])];
          case 2:
            return [2 /*return*/ , _b.sent()];
        }
      });
    });
  };
  var stepTime = function(target) {
    return __awaiter(_this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            void(target);
            if (!isIsolatedNetwork()) return [3 /*break*/ , 3];
            _a = fundFromFaucet;
            return [4 /*yield*/ , getFaucet()];
          case 1:
            return [4 /*yield*/ , _a.apply(void 0, [_b.sent(), 0])];
          case 2:
            _b.sent();
            return [3 /*break*/ , 5];
          case 3:
            return [4 /*yield*/ , Timeout.set(500)];
          case 4:
            _b.sent();
            _b.label = 5;
          case 5:
            return [4 /*yield*/ , getNetworkTime()];
          case 6:
            return [2 /*return*/ , _b.sent()];
        }
      });
    });
  };
  var waitUntilTime = make_waitUntilX('time', getNetworkTime, stepTime);
  var stepSecs = function(target) {
    return __awaiter(_this, void 0, void 0, function() {
      var now, _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            void(target);
            _a = stepTime;
            return [4 /*yield*/ , getNetworkTime()];
          case 1:
            return [4 /*yield*/ , _a.apply(void 0, [(_b.sent()).add(1)])];
          case 2:
            now = _b.sent();
            return [4 /*yield*/ , getTimeSecs(now)];
          case 3:
            return [2 /*return*/ , _b.sent()];
        }
      });
    });
  };
  var waitUntilSecs = make_waitUntilX('secs', getNetworkSecs, stepSecs);
  // onProgress callback is optional, it will be given an obj
  // {currentTime, targetTime}
  var wait = function(delta, onProgress) {
    return __awaiter(_this, void 0, void 0, function() {
      var now;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getNetworkTime()];
          case 1:
            now = _a.sent();
            return [4 /*yield*/ , waitUntilTime(now.add(delta), onProgress)];
          case 2:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  // Check the contract info and the associated deployed bytecode;
  // Verify that:
  // * it matches the bytecode you are expecting.
  var verifyContract = function(ctcInfo, backend) {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , verifyContract_(ctcInfo, backend, newEventQueue(), 'stdlib')];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var verifyContract_ = function(ctcInfo, backend, eq, label) {
    return __awaiter(_this, void 0, void 0, function() {
      var dhead, _a, ABI, Bytecode, ctcAddress, iface, chk, creationBlock, tmpAccount, ctc, creation_time_raw, creation_time, e_10, chkeq, r0, e0rec, lr, ctorArg_r, ctorArg, provider, dt, actual, expected;
      var _this = this;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            dhead = "".concat(label, ": verifyContract");
            debug(dhead, { ctcInfo: ctcInfo });
            _a = backend._Connectors.ETH, ABI = _a.ABI, Bytecode = _a.Bytecode;
            ctcAddress = protect(T_Contract, ctcInfo);
            iface = new real_ethers.utils.Interface(ABI);
            debug(dhead, { ctcAddress: ctcAddress });
            chk = function(p, msg) {
              if (!p) {
                throw Error("verifyContract failed: ".concat(msg));
              }
            };
            creationBlock = zeroBn;
            _b.label = 1;
          case 1:
            _b.trys.push([1, 4, , 5]);
            return [4 /*yield*/ , createAccount()];
          case 2:
            tmpAccount = _b.sent();
            ctc = new ethers.Contract(ctcAddress, ABI, tmpAccount.networkAccount);
            return [4 /*yield*/ , ctc["_reachCreationTime"]()];
          case 3:
            creation_time_raw = _b.sent();
            creation_time = T_UInt.unmunge(creation_time_raw);
            creationBlock = bigNumberify(creation_time);
            return [3 /*break*/ , 5];
          case 4:
            e_10 = _b.sent();
            chk(false, "Failed to call the '_reachCreationTime' method on the contract ".concat(ctcAddress, " during contract bytecode verification. This could mean that there is a general network fault, or it could mean that the given address is not a Reach contract and does not provide this function. The internal error we caught is: ").concat(e_10));
            return [3 /*break*/ , 5];
          case 5:
            eq.init({ ctcAddress: ctcAddress, creationBlock: creationBlock });
            chkeq = function(a, e, msg) {
              var as = j2sf(a);
              var es = j2sf(e);
              chk(as === es, "".concat(msg, ": expected ").concat(es, ", got ").concat(as));
            };
            return [4 /*yield*/ , eq.peq(dhead, (function(bn) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  return [2 /*return*/ , bn.gt(creationBlock)];
                });
              });
            }))];
          case 6:
            r0 = _b.sent();
            debug(dhead, { r0: r0 });
            if (r0.timeout) {
              chk(false, "Contract was claimed to be deployed, but the current block is ".concat(r0.time, " and it hasn't been deployed yet."));
              throw Error("impossible");
            }
            e0rec = r0.txn;
            lr = makeLogRep(function() { return ctcAddress; }, iface, reachEvent(0));
            ctorArg_r = lr.parseA(e0rec);
            debug(dhead, { e0rec: e0rec, ctorArg_r: ctorArg_r });
            if (!ctorArg_r) {
              chk(false, "Contract deployment doesn't have first event");
              throw Error("impossible");
            }
            ctorArg = ctorArg_r.slice(1);
            debug(dhead, { ctorArg: ctorArg });
            return [4 /*yield*/ , getProvider()];
          case 7:
            provider = _b.sent();
            return [4 /*yield*/ , provider.getTransaction(e0rec.transactionHash)];
          case 8:
            dt = _b.sent();
            debug(dhead, { dt: dt });
            actual = dt.data;
            expected = Bytecode + iface.encodeDeploy(ctorArg).slice(2);
            chkeq(actual, expected, "Contract bytecode does not match expected bytecode.");
            // We are not checking the balance or the contract storage, because we know
            // that the code is correct and we know that the code mandates the way that
            // those things are initialized
            return [2 /*return*/ , { creationBlock: creationBlock }];
        }
      });
    });
  };
  /**
   * @description  Parse currency by network
   * @param amt  value in the {@link standardUnit} for the network.
   * @param {number} [decimals] how many "decimal places" the target currency has. Defaults to the network standard.
   * @returns  the amount in the {@link atomicUnit} of the network.
   * @example  parseCurrency(100).toString() // => '100000000000000000000'
   */
  var parseCurrency = makeParseCurrency(standardDigits);
  var zeroBn = bigNumberify(0);
  var minimumBalance = zeroBn;
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
    return handleFormat(amt, decimals, 18);
  }
  /**
   * Formats an account's address in the way users expect to see it.
   * @param acc Account, NetworkAccount, or hex-encoded address
   * @returns the address formatted as a hex-encoded string
   */
  function formatAddress(acc) {
    return T_Address.canonicalize(acc); // TODO: typing
  }

  function launchToken(accCreator, name, sym, opts) {
    var _a, _b;
    if (opts === void 0) { opts = {}; }
    return __awaiter(this, void 0, void 0, function() {
      var addr, remoteCtc, remoteABI, remoteBytecode, factory, supply, decimals, url, metadataHash, contract, deploy_r, id, mint, optOut;
      var _this = this;
      return __generator(this, function(_c) {
        switch (_c.label) {
          case 0:
            debug("Launching token, ".concat(name, " (").concat(sym, ")"));
            addr = function(acc) { return acc.networkAccount.address; };
            remoteCtc = ETHstdlib["contracts"]["sol/stdlib.sol:ReachToken"];
            remoteABI = remoteCtc["abi"];
            remoteBytecode = remoteCtc["bin"];
            factory = new ethers.ContractFactory(remoteABI, remoteBytecode, accCreator.networkAccount);
            debug("".concat(sym, ": deploy"));
            supply = (opts.supply && bigNumberify(opts.supply)) || bigNumberify(2).pow(256).sub(1);
            decimals = opts.decimals !== undefined ? opts.decimals : standardDigits;
            url = (_a = opts.url) !== null && _a !== void 0 ? _a : '';
            metadataHash = (_b = opts.metadataHash) !== null && _b !== void 0 ? _b : '';
            return [4 /*yield*/ , factory.deploy(name, sym, url, metadataHash, supply, decimals)];
          case 1:
            contract = _c.sent();
            debug("".concat(sym, ": wait for deploy: ").concat(contract.deployTransaction.hash));
            return [4 /*yield*/ , contract.deployTransaction.wait()];
          case 2:
            deploy_r = _c.sent();
            debug("".concat(sym, ": saw deploy: ").concat(deploy_r.blockNumber));
            id = contract.address;
            debug("".concat(sym, ": deployed: ").concat(id));
            mint = function(accTo, amt) {
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      debug("".concat(sym, ": transferring ").concat(amt, " ").concat(sym, " for ").concat(addr(accTo)));
                      return [4 /*yield*/ , transfer(accCreator, accTo, amt, id)];
                    case 1:
                      _a.sent();
                      return [2 /*return*/ ];
                  }
                });
              });
            };
            optOut = function(accFrom, accTo) {
              if (accTo === void 0) { accTo = accCreator; }
              return __awaiter(_this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  debug("".concat(sym, ": optOut unnecessary on ETHlike"), accFrom, accTo);
                  return [2 /*return*/ ];
                });
              });
            };
            return [2 /*return*/ , { name: name, sym: sym, id: id, mint: mint, optOut: optOut }];
        }
      });
    });
  };

  function unsafeGetMnemonic(acc) {
    // @ts-ignore
    var networkAccount = acc.networkAccount || acc;
    if (networkAccount._mnemonic) {
      return networkAccount._mnemonic().phrase;
    } else {
      throw Error("unsafeGetMnemonic: Secret key not accessible for account");
    }
  }

  function setMinMillisBetweenRequests() {
    console.warn("setMinMillisBetweenRequests is not supported on this connector");
  }

  function setCustomHttpEventHandler() {
    console.warn("setCustomHttpEventHandler is not supported on this connector");
  }
  // TODO: restore type ann once types are in place
  // const ethLike: EthLike = {
  var ethLike = __assign(__assign(__assign({}, ethLikeCompiled), providerLib), { doCall: doCall, getQueryLowerBound: getQueryLowerBound, setQueryLowerBound: setQueryLowerBound, getValidQueryWindow: getValidQueryWindow, setValidQueryWindow: setValidQueryWindow, getFaucet: getFaucet, setFaucet: setFaucet, randomUInt: randomUInt, hasRandom: hasRandom, balanceOf: balanceOf, balancesOf: balancesOf, minimumBalanceOf: minimumBalanceOf, transfer: transfer, connectAccount: connectAccount, newAccountFromSecret: newAccountFromSecret, newAccountFromMnemonic: newAccountFromMnemonic, getDefaultAccount: getDefaultAccount, createAccount: createAccount, canFundFromFaucet: canFundFromFaucet, fundFromFaucet: fundFromFaucet, newTestAccount: newTestAccount, newTestAccounts: newTestAccounts, getNetworkTime: getNetworkTime, waitUntilTime: waitUntilTime, wait: wait, getNetworkSecs: getNetworkSecs, waitUntilSecs: waitUntilSecs, verifyContract: verifyContract, standardUnit: standardUnit, atomicUnit: atomicUnit, parseCurrency: parseCurrency, minimumBalance: minimumBalance, formatCurrency: formatCurrency, formatAddress: formatAddress, formatWithDecimals: formatWithDecimals, unsafeGetMnemonic: unsafeGetMnemonic, launchToken: launchToken, reachStdlib: reachStdlib, setMinMillisBetweenRequests: setMinMillisBetweenRequests, setCustomHttpEventHandler: setCustomHttpEventHandler, setSigningMonitor: setSigningMonitor, getTimeSecs: getTimeSecs });
  return ethLike;
}
//# sourceMappingURL=ETH_like.js.map
