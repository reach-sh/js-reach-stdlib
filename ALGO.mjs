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
var _a, _b, _c;
export var connector = 'ALGO';
import algosdk from 'algosdk';
import ethers from 'ethers';
import Timeout from 'await-timeout';
import buffer from 'buffer';
var Buffer = buffer.Buffer;
import { VERSION } from './version.mjs';
import { stdContract, stdVerifyContract, stdAccount, debug, envDefault, argsSplit, makeRandom, replaceableThunk, ensureConnectorAvailable, bigNumberToBigInt, argMax, argMin, make_newTestAccounts, make_waitUntilX, checkTimeout, truthyEnv, Signal, Lock, } from './shared_impl.mjs';
import { isBigNumber, bigNumberify, bigNumberToNumber, } from './shared_user.mjs';
import waitPort from './waitPort.mjs';
import { addressFromHex, stdlib, typeDefs, } from './ALGO_compiled.mjs';
import { window, process } from './shim.mjs';
export var add = stdlib.add,
  sub = stdlib.sub,
  mod = stdlib.mod,
  mul = stdlib.mul,
  div = stdlib.div,
  protect = stdlib.protect,
  assert = stdlib.assert,
  Array_set = stdlib.Array_set,
  eq = stdlib.eq,
  ge = stdlib.ge,
  gt = stdlib.gt,
  le = stdlib.le,
  lt = stdlib.lt,
  bytesEq = stdlib.bytesEq,
  digestEq = stdlib.digestEq;
export * from './shared_user.mjs';
var reachBackendVersion = 5;
var reachAlgoBackendVersion = 5;
// Helpers
// Parse CBR into Public Key
var cbr2algo_addr = function(x) {
  return algosdk.encodeAddress(Buffer.from(x.slice(2), 'hex'));
};
var txnFromAddress = function(t) {
  return algosdk.encodeAddress(t.from.publicKey);
};

function uint8ArrayToStr(a, enc) {
  if (enc === void 0) { enc = 'utf8'; }
  if (!(a instanceof Uint8Array)) {
    console.log(a);
    throw Error("Expected Uint8Array, got " + a);
  }
  return Buffer.from(a).toString(enc);
}
// TODO: read token from scripts/devnet-algo/algorand_data/algod.token
var rawDefaultToken = 'c87f5580d7a866317b4bfe9e8b8d1dda955636ccebfa88c12b414db208dd9705';
var rawDefaultItoken = 'reach-devnet';
var indexerTxn2RecvTxn = function(txn) {
  var ait = txn['application-transaction'] || {};
  var aargs = ait['application-args'] || [];
  var aidx = ait['application-id'];
  return {
    'confirmed-round': txn['confirmed-round'],
    'sender': txn['sender'],
    'logs': (txn['logs'] || []),
    'application-args': aargs,
    'application-index': aidx
  };
};
var waitForConfirmation = function(txId, untilRound) {
  return __awaiter(void 0, void 0, void 0, function() {
    var doOrDie, checkTooLate, dhead, client, checkAlgod, checkIndexer;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          doOrDie = function(p) {
            return __awaiter(void 0, void 0, void 0, function() {
              var e_1;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/ , p];
                  case 1:
                    return [2 /*return*/ , _a.sent()];
                  case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/ , { 'exn': e_1 }];
                  case 3:
                    return [2 /*return*/ ];
                }
              });
            });
          };
          checkTooLate = function(lastLastRound) {
            return __awaiter(void 0, void 0, void 0, function() {
              var _a, c, msg, lastRound;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    _a = lastLastRound > 0 ? [client.statusAfterBlock(lastLastRound), "waiting until after " + lastLastRound] : [client.status(), "looking up current round"], c = _a[0], msg = _a[1];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), [msg], false));
                    return [4 /*yield*/ , c["do"]()];
                  case 1:
                    lastRound = (_b.sent())['last-round'];
                    if (untilRound && untilRound < lastRound) {
                      throw Error("waitForConfirmation: Too late: " + lastRound + " > " + untilRound);
                    } else {
                      return [2 /*return*/ , lastRound];
                    }
                    return [2 /*return*/ ];
                }
              });
            });
          };
          dhead = ['waitForConfirmation', txId];
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          client = _a.sent();
          checkAlgod = function(lastLastRound) {
            return __awaiter(void 0, void 0, void 0, function() {
              var lastRound, info, cr, l, dtxn;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/ , checkTooLate(lastLastRound)];
                  case 1:
                    lastRound = _a.sent();
                    return [4 /*yield*/ , doOrDie(client.pendingTransactionInformation(txId)["do"]())];
                  case 2:
                    info = (_a.sent());
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), ['info', info], false));
                    if (!('exn' in info)) return [3 /*break*/ , 4];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), ['switching to indexer on error'], false));
                    return [4 /*yield*/ , checkIndexer(lastRound)];
                  case 3:
                    return [2 /*return*/ , _a.sent()];
                  case 4:
                    cr = info['confirmed-round'];
                    if (!(cr !== undefined && cr > 0)) return [3 /*break*/ , 5];
                    l = info['logs'] === undefined ? [] : info['logs'];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), ['confirmed'], false));
                    dtxn = algosdk.Transaction.from_obj_for_encoding(info['txn']['txn']);
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), ['confirmed', dtxn], false));
                    return [2 /*return*/ , {
                      'confirmed-round': cr,
                      'logs': l,
                      'application-index': info['application-index'],
                      'sender': txnFromAddress(dtxn),
                      'application-args': (dtxn.appArgs || []).map(function(x) { return uint8ArrayToStr(x, 'base64'); })
                    }];
                  case 5:
                    if (!(info['pool-error'] === '')) return [3 /*break*/ , 7];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), ['still in pool, trying again'], false));
                    return [4 /*yield*/ , checkAlgod(lastRound)];
                  case 6:
                    return [2 /*return*/ , _a.sent()];
                  case 7:
                    throw Error("waitForConfirmation: error confirming: " + JSON.stringify(info));
                }
              });
            });
          };
          checkIndexer = function(lastLastRound) {
            return __awaiter(void 0, void 0, void 0, function() {
              var lastRound, indexer, q, res;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/ , checkTooLate(lastLastRound)];
                  case 1:
                    lastRound = _a.sent();
                    return [4 /*yield*/ , getIndexer()];
                  case 2:
                    indexer = _a.sent();
                    q = indexer.lookupTransactionByID(txId);
                    return [4 /*yield*/ , doOrDie(doQuery_(JSON.stringify(dhead), q))];
                  case 3:
                    res = (_a.sent());
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), ['indexer', res], false));
                    if (!('exn' in res)) return [3 /*break*/ , 5];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead, false), ['indexer failed, trying again'], false));
                    return [4 /*yield*/ , checkIndexer(lastRound)];
                  case 4:
                    return [2 /*return*/ , _a.sent()];
                  case 5:
                    return [2 /*return*/ , indexerTxn2RecvTxn(res['transaction'])];
                }
              });
            });
          };
          return [4 /*yield*/ , checkAlgod(0)];
        case 2:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
var decodeB64Txn = function(ts) {
  var tb = Buffer.from(ts, 'base64');
  return algosdk.decodeUnsignedTransaction(tb);
};
var doSignTxnToB64 = function(t, sk) {
  var sb = Buffer.from(t.signTxn(sk));
  return sb.toString('base64');
};
var doSignTxn = function(ts, sk) {
  return doSignTxnToB64(decodeB64Txn(ts), sk);
};
var signSendAndConfirm = function(acc, txns) {
  return __awaiter(void 0, void 0, void 0, function() {
    var p, e_2, N, tN, e_3;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (acc.sk !== undefined) {
            txns.forEach(function(t) {
              // XXX this comparison is probably wrong, because the addresses are the
              // wrong type
              if (acc.sk !== undefined && !t.stxn && t.signers !== undefined && t.signers.length === 1 && t.signers[0] === acc.addr) {
                debug('signSendAndConfirm', 'signing one');
                t.stxn = doSignTxn(t.txn, acc.sk);
              }
            });
          }
          return [4 /*yield*/ , getProvider()];
        case 1:
          p = _a.sent();
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [4 /*yield*/ , p.signAndPostTxns(txns)];
        case 3:
          _a.sent();
          return [3 /*break*/ , 5];
        case 4:
          e_2 = _a.sent();
          throw { type: 'signAndPost', e: e_2 };
        case 5:
          N = txns.length - 1;
          tN = decodeB64Txn(txns[N].txn);
          _a.label = 6;
        case 6:
          _a.trys.push([6, 8, , 9]);
          return [4 /*yield*/ , waitForConfirmation(tN.txID(), tN.lastRound)];
        case 7:
          return [2 /*return*/ , _a.sent()];
        case 8:
          e_3 = _a.sent();
          throw { type: 'waitForConfirmation', e: e_3 };
        case 9:
          return [2 /*return*/ ];
      }
    });
  });
};
var encodeUnsignedTransaction = function(t) {
  return Buffer.from(algosdk.encodeUnsignedTransaction(t)).toString('base64');
};
var toWTxn = function(t) {
  return {
    txn: encodeUnsignedTransaction(t),
    signers: [txnFromAddress(t)]
  };
};
// Backend
var compileTEAL = function(label, code) {
  return __awaiter(void 0, void 0, void 0, function() {
    var s, r, e_4;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug('compile', label);
          _a.label = 1;
        case 1:
          _a.trys.push([1, 4, , 5]);
          return [4 /*yield*/ , getAlgodClient()];
        case 2:
          return [4 /*yield*/ , (_a.sent()).compile(code)["do"]()];
        case 3:
          r = _a.sent();
          s = 200;
          return [3 /*break*/ , 5];
        case 4:
          e_4 = _a.sent();
          s = (e_4 && typeof e_4 === 'object') ? e_4.statusCode : 'not object';
          r = e_4;
          return [3 /*break*/ , 5];
        case 5:
          if (s == 200) {
            debug('compile', label, 'succeeded:', r);
            r.src = code;
            r.result = base64ToUI8A(r.result);
            // debug('compile transformed:', r);
            return [2 /*return*/ , r];
          } else {
            throw Error("compile " + label + " failed: " + s + ": " + JSON.stringify(r));
          }
          return [2 /*return*/ ];
      }
    });
  });
};
var getTxnParams = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var client, params;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug("fillTxn: getting params");
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          client = _a.sent();
          _a.label = 2;
        case 2:
          if (!true) return [3 /*break*/ , 5];
          return [4 /*yield*/ , client.getTransactionParams()["do"]()];
        case 3:
          params = _a.sent();
          debug('fillTxn: got params:', params);
          if (params.firstRound !== 0) {
            return [2 /*return*/ , params];
          }
          debug("...but firstRound is 0, so let's wait and try again.");
          return [4 /*yield*/ , client.statusAfterBlock(1)["do"]()];
        case 4:
          _a.sent();
          return [3 /*break*/ , 2];
        case 5:
          return [2 /*return*/ ];
      }
    });
  });
};
var sign_and_send_sync = function(label, acc, txn) {
  return __awaiter(void 0, void 0, void 0, function() {
    var e_5;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/ , signSendAndConfirm(acc, [txn])];
        case 1:
          return [2 /*return*/ , _a.sent()];
        case 2:
          e_5 = _a.sent();
          console.log(e_5);
          throw Error(label + " txn failed:\n" + JSON.stringify(txn) + "\nwith:\n" + JSON.stringify(e_5));
        case 3:
          return [2 /*return*/ ];
      }
    });
  });
};
// XXX I'd use x.replaceAll if I could (not supported in this node version), but it would be better to extend ConnectorInfo so these are functions
var replaceAll = function(orig, what, whatp) {
  var once = orig.replace(what, whatp);
  if (once === orig) {
    return orig;
  } else {
    return replaceAll(once, what, whatp);
  }
};

function must_be_supported(bin) {
  var algob = bin._Connectors.ALGO;
  var unsupported = algob.unsupported;
  if (unsupported.length > 0) {
    var reasons = unsupported.map(function(s) { return " * " + s; }).join('\n');
    throw Error("This Reach application is not supported on Algorand for the following reasons:\n" + reasons);
  }
}
// Get these from stdlib
// const MaxTxnLife = 1000;
var LogicSigMaxSize = 1000;
var MaxAppProgramLen = 2048;
var MaxAppTxnAccounts = 4;
var MaxExtraAppProgramPages = 3;

function compileFor(bin, info) {
  return __awaiter(this, void 0, void 0, function() {
    var ApplicationID, _a, appApproval, appClear, escrow, subst_appid, checkLen, appApproval_bin, appClear_bin, escrow_bin;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          debug("compileFor", info, typeof(info), Number.isInteger(info));
          ApplicationID = bigNumberToNumber(T_Contract.canonicalize(info));
          must_be_supported(bin);
          _a = bin._Connectors.ALGO, appApproval = _a.appApproval, appClear = _a.appClear, escrow = _a.escrow;
          subst_appid = function(x) {
            return replaceAll(x, '{{ApplicationID}}', "" + ApplicationID);
          };
          checkLen = function(label, actual, expected) {
            debug("checkLen", { label: label, actual: actual, expected: expected });
            if (actual > expected) {
              throw Error("This Reach application is not supported by Algorand: " + label + " length is " + actual + ", but should be less than " + expected + ".");
            }
          };
          return [4 /*yield*/ , compileTEAL('appApproval_subst', appApproval)];
        case 1:
          appApproval_bin = _b.sent();
          return [4 /*yield*/ , compileTEAL('appClear', appClear)];
        case 2:
          appClear_bin = _b.sent();
          checkLen("App Program Length", (appClear_bin.result.length + appApproval_bin.result.length), (1 + MaxExtraAppProgramPages) * MaxAppProgramLen);
          return [4 /*yield*/ , compileTEAL('escrow_subst', subst_appid(escrow))];
        case 3:
          escrow_bin = _b.sent();
          checkLen("Escrow Contract", escrow_bin.result.length, LogicSigMaxSize);
          return [2 /*return*/ , {
            ApplicationID: ApplicationID,
            appApproval: appApproval_bin,
            appClear: appClear_bin,
            escrow: escrow_bin
          }];
      }
    });
  });
}
var ui8h = function(x) { return Buffer.from(x).toString('hex'); };
var base64ToUI8A = function(x) { return Uint8Array.from(Buffer.from(x, 'base64')); };
var base64ify = function(x) { return Buffer.from(x).toString('base64'); };
var format_failed_request = function(e) {
  var ep = JSON.parse(JSON.stringify(e));
  var db64 = ep.req ?
    (ep.req.data ? base64ify(ep.req.data) :
      "no data, but " + JSON.stringify(Object.keys(ep.req))) :
    "no req, but " + JSON.stringify(Object.keys(ep));
  var msg = e.text ? JSON.parse(e.text) : e;
  return "\n" + db64 + "\n" + JSON.stringify(msg);
};

function looksLikeAccountingNotInitialized(e) {
  var _a;
  var responseText = ((_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.text) || null;
  // TODO: trust the response to be json and parse it?
  // const json = JSON.parse(responseText) || {};
  // const msg: string = (json.message || '').toLowerCase();
  var msg = (responseText || '').toLowerCase();
  return msg.includes("accounting not initialized");
}
var doQuery_ = function(dhead, query, alwaysRetry) {
  if (alwaysRetry === void 0) { alwaysRetry = false; }
  return __awaiter(void 0, void 0, void 0, function() {
    var retries, res, e_6;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug(dhead, '--- QUERY =', query);
          retries = 10;
          _a.label = 1;
        case 1:
          if (!(retries > 0)) return [3 /*break*/ , 7];
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 6]);
          return [4 /*yield*/ , query["do"]()];
        case 3:
          res = _a.sent();
          return [3 /*break*/ , 7];
        case 4:
          e_6 = _a.sent();
          if ((e_6 === null || e_6 === void 0 ? void 0 : e_6.errno) === -111 || (e_6 === null || e_6 === void 0 ? void 0 : e_6.code) === "ECONNRESET") {
            debug(dhead, 'NO CONNECTION');
          } else if (looksLikeAccountingNotInitialized(e_6)) {
            debug(dhead, 'ACCOUNTING NOT INITIALIZED');
          } else if (!alwaysRetry || retries <= 0) {
            throw Error(dhead + " --- QUERY FAIL: " + JSON.stringify(e_6)); // `
          }
          debug(dhead, 'RETRYING', retries--, { e: e_6 });
          return [4 /*yield*/ , Timeout.set(500)];
        case 5:
          _a.sent();
          return [3 /*break*/ , 6];
        case 6:
          return [3 /*break*/ , 1];
        case 7:
          if (!res) {
            throw Error("impossible: query res is empty");
          }
          debug(dhead, 'RESULT', res);
          return [2 /*return*/ , res];
      }
    });
  });
};
// ****************************************************************************
// Event Cache
// ****************************************************************************
var chooseMinRoundTxn = function(ptxns) {
  return argMin(ptxns, function(x) { return x['confirmed-round']; });
};
var chooseMaxRoundTxn = function(ptxns) {
  return argMax(ptxns, function(x) { return x['confirmed-round']; });
};
var _d = replaceableThunk(function() { return 0; }),
  _getQueryLowerBound = _d[0],
  _setQueryLowerBound = _d[1];
var _e = replaceableThunk(function() { return true; }),
  getValidQueryWindow = _e[0],
  _setValidQueryWindow = _e[1];
export { getValidQueryWindow };
export function setValidQueryWindow(n) {
  if (typeof n === 'number') {
    // TODO?
    throw Error("Only setValidQueryWindow(true) is supported on Algorand");
  }
  _setValidQueryWindow(n);
}
export function getQueryLowerBound() {
  return bigNumberify(_getQueryLowerBound());
}
export function setQueryLowerBound(networkTime) {
  networkTime = typeof networkTime === 'number' ? networkTime :
    networkTime._isBigNumber ? networkTime.toNumber() :
    networkTime;
  if (!(typeof networkTime === 'number')) {
    throw Error("Expected number or BigNumber, but got " + networkTime + " : " + typeof networkTime);
  }
  _setQueryLowerBound(networkTime);
}
var EventCache = /** @class */ (function() {
  function EventCache() {
    this.cache = [];
    this.currentRound = _getQueryLowerBound();
    this.cache = [];
  }
  EventCache.prototype.query = function(dhead, ApplicationID, roundInfo, pred) {
    return __awaiter(this, void 0, void 0, function() {
      var minRound, timeoutAt, specRound, h, maxRound, maxSecs, filterRound, filterFn, initPtxns, txn_1, failed, indexer, query, res, ptxns, txn;
      var _this = this;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            minRound = roundInfo.minRound, timeoutAt = roundInfo.timeoutAt, specRound = roundInfo.specRound;
            h = function(mode) { return timeoutAt && timeoutAt[0] === mode ? bigNumberToNumber(timeoutAt[1]) : undefined; };
            maxRound = h('time');
            maxSecs = h('secs');
            debug(dhead, "EventCache.query", { ApplicationID: ApplicationID, minRound: minRound, specRound: specRound, timeoutAt: timeoutAt, maxRound: maxRound, maxSecs: maxSecs }, this.currentRound);
            filterRound = minRound !== null && minRound !== void 0 ? minRound : specRound;
            this.cache = this.cache.filter(function(txn) {
              var notTooOld = txn['confirmed-round'] >= filterRound;
              var emptyOptIn = ((txn['application-transaction']['on-completion'] === 'optin') &&
                (txn['application-transaction']['application-args'].length == 0));
              return notTooOld && (!emptyOptIn);
            });
            filterFn = function(x) {
              return pred(x) &&
                (maxRound ? x['confirmed-round'] <= maxRound : true) &&
                (maxSecs ? x['round-time'] <= maxSecs : true) &&
                (specRound ? x['confirmed-round'] == specRound : true);
            };
            initPtxns = this.cache.filter(filterFn);
            if (initPtxns.length != 0) {
              debug("Found transaction in Event Cache");
              txn_1 = chooseMinRoundTxn(initPtxns);
              return [2 /*return*/ , { succ: true, txn: txn_1 }];
            }
            debug("transaction not in event cache");
            failed = function() { return ({ succ: false, round: _this.currentRound }); };
            if (this.cache.length != 0) {
              debug("cache not empty, contains some other message from future, not querying...", this.cache);
              return [2 /*return*/ , failed()];
            }
            debug("querying network...");
            return [4 /*yield*/ , getIndexer()];
          case 1:
            indexer = _a.sent();
            query = indexer.searchForTransactions()
              .applicationID(ApplicationID)
              .txType('appl');
            if (filterRound) {
              // If cache has: [100, 200]
              // & querying  : [150, 1000]
              // We already searched cache for [150, 200] so query network for [201, 1000]
              query = query.minRound(Math.max(this.currentRound + 1, filterRound));
            }
            return [4 /*yield*/ , doQuery_(dhead, query)];
          case 2:
            res = _a.sent();
            this.cache = res.transactions;
            // Update current round
            this.currentRound =
              (res.transactions.length == 0) ?
              (maxRound ? Math.min(res['current-round'], maxRound) : res['current-round']) :
              chooseMaxRoundTxn(res.transactions)['confirmed-round'];
            ptxns = this.cache.filter(filterFn);
            if (ptxns.length == 0) {
              return [2 /*return*/ , failed()];
            }
            txn = chooseMinRoundTxn(ptxns);
            return [2 /*return*/ , { succ: true, txn: txn }];
        }
      });
    });
  };
  return EventCache;
}());
// ****************************************************************************
// Common Interface Exports
// ****************************************************************************
export var addressEq = stdlib.addressEq,
  tokenEq = stdlib.tokenEq,
  digest = stdlib.digest;
export var T_Null = typeDefs.T_Null,
  T_Bool = typeDefs.T_Bool,
  T_UInt = typeDefs.T_UInt,
  T_Tuple = typeDefs.T_Tuple,
  T_Array = typeDefs.T_Array,
  T_Contract = typeDefs.T_Contract,
  T_Object = typeDefs.T_Object,
  T_Data = typeDefs.T_Data,
  T_Bytes = typeDefs.T_Bytes,
  T_Address = typeDefs.T_Address,
  T_Digest = typeDefs.T_Digest,
  T_Struct = typeDefs.T_Struct,
  T_Token = typeDefs.T_Token;
export var randomUInt = (_a = makeRandom(8), _a.randomUInt),
  hasRandom = _a.hasRandom;

function waitIndexerFromEnv(env) {
  return __awaiter(this, void 0, void 0, function() {
    var ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT, ALGO_INDEXER_TOKEN;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          ALGO_INDEXER_SERVER = env.ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT = env.ALGO_INDEXER_PORT, ALGO_INDEXER_TOKEN = env.ALGO_INDEXER_TOKEN;
          return [4 /*yield*/ , waitPort(ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT)];
        case 1:
          _a.sent();
          return [2 /*return*/ , new algosdk.Indexer(ALGO_INDEXER_TOKEN, ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT)];
      }
    });
  });
}

function waitAlgodClientFromEnv(env) {
  return __awaiter(this, void 0, void 0, function() {
    var ALGO_SERVER, ALGO_PORT, ALGO_TOKEN;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          ALGO_SERVER = env.ALGO_SERVER, ALGO_PORT = env.ALGO_PORT, ALGO_TOKEN = env.ALGO_TOKEN;
          return [4 /*yield*/ , waitPort(ALGO_SERVER, ALGO_PORT)];
        case 1:
          _a.sent();
          return [2 /*return*/ , new algosdk.Algodv2(ALGO_TOKEN, ALGO_SERVER, ALGO_PORT)];
      }
    });
  });
}
// This function should be provided by the indexer, but it isn't so we simulate
// something decent. This function is allowed to "fail" by not really waiting
// until the round
var indexer_statusAfterBlock = function(round) {
  return __awaiter(void 0, void 0, void 0, function() {
    var client, now, tries, _a;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          debug('indexer_statusAfterBlock', { round: round });
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          client = _b.sent();
          now = bigNumberify(0);
          tries = 0;
          _b.label = 2;
        case 2:
          _a = (tries++ < 10);
          if (!_a) return [3 /*break*/ , 4];
          return [4 /*yield*/ , getNetworkTime()];
        case 3:
          _a = (now = _b.sent()).lt(round);
          _b.label = 4;
        case 4:
          if (!_a) return [3 /*break*/ , 7];
          debug('indexer_statusAfterBlock', { round: round, now: now });
          return [4 /*yield*/ , client.statusAfterBlock(round)];
        case 5:
          _b.sent();
          // XXX Get the indexer to index one and wait
          return [4 /*yield*/ , Timeout.set(500)];
        case 6:
          // XXX Get the indexer to index one and wait
          _b.sent();
          return [3 /*break*/ , 2];
        case 7:
          return [2 /*return*/ , now];
      }
    });
  });
};;
var makeProviderByWallet = function(wallet) {
  return __awaiter(void 0, void 0, void 0, function() {
    var walletOpts, enabledNetwork, enabledAccounts, enabled, algodClient, indexer, getDefaultAddress, signAndPostTxns, isIsolatedNetwork;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug("making provider with wallet");
          walletOpts = { 'network': process.env['ALGO_NETWORK'] };
          if (!(wallet.enableNetwork === undefined && wallet.enableAccounts === undefined)) return [3 /*break*/ , 2];
          return [4 /*yield*/ , wallet.enable(walletOpts)];
        case 1:
          enabled = _a.sent();
          enabledNetwork = enabled;
          enabledAccounts = enabled;
          return [3 /*break*/ , 5];
        case 2:
          if (!(wallet.enableNetwork === undefined || wallet.enableAccounts === undefined)) return [3 /*break*/ , 3];
          throw new Error('must have enableNetwork AND enableAccounts OR neither');
        case 3:
          return [4 /*yield*/ , wallet.enableNetwork(walletOpts)];
        case 4:
          enabledNetwork = _a.sent();
          _a.label = 5;
        case 5:
          void enabledNetwork;
          return [4 /*yield*/ , wallet.getAlgodv2()];
        case 6:
          algodClient = _a.sent();
          return [4 /*yield*/ , wallet.getIndexer()];
        case 7:
          indexer = _a.sent();
          getDefaultAddress = function() {
            return __awaiter(void 0, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    if (!(enabledAccounts === undefined)) return [3 /*break*/ , 2];
                    if (wallet.enableAccounts === undefined) {
                      throw new Error('impossible: no wallet.enableAccounts');
                    }
                    return [4 /*yield*/ , wallet.enableAccounts(walletOpts)];
                  case 1:
                    enabledAccounts = _a.sent();
                    if (enabledAccounts === undefined) {
                      throw new Error('Could not enable accounts');
                    }
                    _a.label = 2;
                  case 2:
                    return [2 /*return*/ , enabledAccounts.accounts[0]];
                }
              });
            });
          };
          signAndPostTxns = wallet.signAndPostTxns;
          isIsolatedNetwork = truthyEnv(process.env['REACH_ISOLATED_NETWORK']);
          return [2 /*return*/ , { algodClient: algodClient, indexer: indexer, getDefaultAddress: getDefaultAddress, isIsolatedNetwork: isIsolatedNetwork, signAndPostTxns: signAndPostTxns }];
      }
    });
  });
};
export var setWalletFallback = function(wf) {
  if (!window.algorand) {
    window.algorand = wf();
  }
};
var doWalletFallback_signOnly = function(opts, getAddr, signTxns) {
  var p = undefined;
  var enableNetwork = function(eopts) {
    return __awaiter(void 0, void 0, void 0, function() {
      var base, baseEnv;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            void(eopts);
            base = opts['providerEnv'];
            baseEnv = process.env;
            if (!base) return [3 /*break*/ , 3];
            if (!(typeof base === 'string')) return [3 /*break*/ , 2];
            return [4 /*yield*/ , providerEnvByName(base)];
          case 1:
            // @ts-ignore
            baseEnv = _a.sent();
            return [3 /*break*/ , 3];
          case 2:
            baseEnv = base;
            _a.label = 3;
          case 3:
            return [4 /*yield*/ , makeProviderByEnv(baseEnv)];
          case 4:
            p = _a.sent();
            return [2 /*return*/ , {}];
        }
      });
    });
  };
  var enableAccounts = function(eopts) {
    return __awaiter(void 0, void 0, void 0, function() {
      var addr;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            void(eopts);
            return [4 /*yield*/ , getAddr()];
          case 1:
            addr = _a.sent();
            return [2 /*return*/ , { accounts: [addr] }];
        }
      });
    });
  };
  var enable = function(eopts) {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , enableNetwork(eopts)];
          case 1:
            _a.sent();
            return [4 /*yield*/ , enableAccounts(eopts)];
          case 2:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var getAlgodv2 = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (!p) {
          throw new Error("must call enable");
        };
        return [2 /*return*/ , p.algodClient];
      });
    });
  };
  var getIndexer = function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        if (!p) {
          throw new Error("must call enable");
        };
        return [2 /*return*/ , p.indexer];
      });
    });
  };
  var signAndPostTxns = function(txns, sopts) {
    return __awaiter(void 0, void 0, void 0, function() {
      var to_sign, signed, _a, stxns, bs;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            if (!p) {
              throw new Error("must call enable");
            };
            void(sopts);
            debug("fallBack: signAndPostTxns", { txns: txns });
            to_sign = [];
            txns.forEach(function(txn) {
              if (!txn.stxn) {
                to_sign.push(txn.txn);
              }
            });
            debug("fallBack: signAndPostTxns", { to_sign: to_sign });
            if (!(to_sign.length == 0)) return [3 /*break*/ , 1];
            _a = [];
            return [3 /*break*/ , 3];
          case 1:
            return [4 /*yield*/ , signTxns(to_sign)];
          case 2:
            _a = _b.sent();
            _b.label = 3;
          case 3:
            signed = _a;
            debug("fallBack: signAndPostTxns", { signed: signed });
            stxns = txns.map(function(txn) {
              if (txn.stxn) {
                return txn.stxn;
              }
              var s = signed.shift();
              if (!s) {
                throw new Error("txn not signed");
              }
              return s;
            });
            bs = stxns.map(function(stxn) { return Buffer.from(stxn, 'base64'); });
            debug("fallBack: signAndPostTxns", bs);
            return [4 /*yield*/ , p.algodClient.sendRawTransaction(bs)["do"]()];
          case 4:
            _b.sent();
            return [2 /*return*/ , {}];
        }
      });
    });
  };
  return { enable: enable, enableNetwork: enableNetwork, enableAccounts: enableAccounts, getAlgodv2: getAlgodv2, getIndexer: getIndexer, signAndPostTxns: signAndPostTxns };
};
var walletFallback_mnemonic = function(opts) {
  return function() {
    debug("using mnemonic wallet fallback");
    var getAddr = function() {
      return __awaiter(void 0, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2 /*return*/ , window.prompt("Please paste the address of your account:")];
        });
      });
    };
    var signTxns = function(txns) {
      return __awaiter(void 0, void 0, void 0, function() {
        return __generator(this, function(_a) {
          return [2 /*return*/ , txns.map(function(ts) {
            var t = decodeB64Txn(ts);
            var addr = txnFromAddress(t);
            var mn = window.prompt("Please paste the mnemonic for the address, " + addr + ". It will not be saved.");
            var acc = algosdk.mnemonicToSecretKey(mn);
            return doSignTxnToB64(t, acc.sk);
          })];
        });
      });
    };
    return doWalletFallback_signOnly(opts, getAddr, signTxns);
  };
};
var walletFallback_MyAlgoWallet = function(MyAlgoConnect, opts) {
  return function() {
    debug("using MyAlgoWallet wallet fallback");
    // @ts-ignore
    var mac = new MyAlgoConnect();
    // MyAlgoConnect uses a global popup object for managing, so we need to
    // guarantee there is only one in flight at a time.
    var lock = new Lock();
    var getAddr = function() {
      return __awaiter(void 0, void 0, void 0, function() {
        var accts;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/ , lock.runWith(function() {
                return __awaiter(void 0, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/ , mac.connect({ shouldSelectOneAccount: true })];
                      case 1:
                        return [2 /*return*/ , _a.sent()];
                    }
                  });
                });
              })];
            case 1:
              accts = _a.sent();
              return [2 /*return*/ , accts[0].address];
          }
        });
      });
    };
    var signTxns = function(txns) {
      return __awaiter(void 0, void 0, void 0, function() {
        var stxns;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              debug("MAW signTransaction ->", txns);
              return [4 /*yield*/ , lock.runWith(function() {
                return __awaiter(void 0, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/ , mac.signTransaction(txns)];
                      case 1:
                        return [2 /*return*/ , _a.sent()];
                    }
                  });
                });
              })];
            case 1:
              stxns = _a.sent();
              debug("MAW signTransaction <-", stxns);
              return [2 /*return*/ , stxns.map(function(sts) { return Buffer.from(sts.blob).toString('base64'); })];
          }
        });
      });
    };
    return doWalletFallback_signOnly(opts, getAddr, signTxns);
  };
};
var walletFallback_WalletConnect = function(WalletConnect, opts) {
  return function() {
    debug("using WalletConnect wallet fallback");
    var wc = new WalletConnect();
    return doWalletFallback_signOnly(opts, (function() { return wc.getAddr(); }), (function(ts) { return wc.signTxns(ts); }));
  };
};
export var walletFallback = function(opts) {
  debug("using wallet fallback with", opts);
  var mac = opts.MyAlgoConnect;
  if (mac) {
    return walletFallback_MyAlgoWallet(mac, opts);
  }
  var wc = opts.WalletConnect;
  if (wc) {
    return walletFallback_WalletConnect(wc, opts);
  }
  // This could be implemented with walletFallback_signOnly and the residue
  // from the old version.
  //  return walletFallback_AlgoSigner(opts);
  return walletFallback_mnemonic(opts);
};
export var getProvider = (_b = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!window.algorand) return [3 /*break*/ , 2];
            return [4 /*yield*/ , makeProviderByWallet(window.algorand)];
          case 1:
            // @ts-ignore
            return [2 /*return*/ , _a.sent()];
          case 2:
            debug("making default provider based on process.env");
            return [4 /*yield*/ , makeProviderByEnv(process.env)];
          case 3:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  }), _b[0]),
  setProvider = _b[1];
var getAlgodClient = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getProvider()];
        case 1:
          return [2 /*return*/ , (_a.sent()).algodClient];
      }
    });
  });
};
var getIndexer = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getProvider()];
        case 1:
          return [2 /*return*/ , (_a.sent()).indexer];
      }
    });
  });
};
var localhostProviderEnv = {
  ALGO_SERVER: 'http://localhost',
  ALGO_PORT: '4180',
  ALGO_TOKEN: rawDefaultToken,
  ALGO_INDEXER_SERVER: 'http://localhost',
  ALGO_INDEXER_PORT: '8980',
  ALGO_INDEXER_TOKEN: rawDefaultItoken,
  REACH_ISOLATED_NETWORK: 'yes'
};

function envDefaultsALGO(env) {
  var denv = localhostProviderEnv;
  // @ts-ignore
  var ret = {};
  for (var _i = 0, _a = ['ALGO_SERVER', 'ALGO_PORT', 'ALGO_TOKEN', 'ALGO_INDEXER_SERVER', 'ALGO_INDEXER_PORT', 'ALGO_INDEXER_TOKEN', 'REACH_ISOLATED_NETWORK']; _i < _a.length; _i++) {
    var f = _a[_i];
    // @ts-ignore
    ret[f] = envDefault(env[f], denv[f]);
  }
  return ret;
};

function makeProviderByEnv(env) {
  return __awaiter(this, void 0, void 0, function() {
    var fullEnv, algodClient, indexer, isIsolatedNetwork, lab, getDefaultAddress, signAndPostTxns;
    var _this = this;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug("makeProviderByEnv", env);
          fullEnv = envDefaultsALGO(env);
          debug("makeProviderByEnv defaulted", fullEnv);
          return [4 /*yield*/ , waitAlgodClientFromEnv(fullEnv)];
        case 1:
          algodClient = _a.sent();
          return [4 /*yield*/ , waitIndexerFromEnv(fullEnv)];
        case 2:
          indexer = _a.sent();
          isIsolatedNetwork = truthyEnv(fullEnv.REACH_ISOLATED_NETWORK);
          lab = "Providers created by environment";
          getDefaultAddress = function() {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                throw new Error(lab + " do not have default addresses");
              });
            });
          };
          signAndPostTxns = function(txns, opts) {
            return __awaiter(_this, void 0, void 0, function() {
              var stxns, bs;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    void(opts);
                    stxns = txns.map(function(txn) {
                      if (txn.stxn) {
                        return txn.stxn;
                      }
                      throw new Error(lab + " cannot interactively sign");
                    });
                    bs = stxns.map(function(stxn) { return Buffer.from(stxn, 'base64'); });
                    debug("signAndPostTxns", bs);
                    return [4 /*yield*/ , algodClient.sendRawTransaction(bs)["do"]()];
                  case 1:
                    _a.sent();
                    return [2 /*return*/ ];
                }
              });
            });
          };
          return [2 /*return*/ , { algodClient: algodClient, indexer: indexer, isIsolatedNetwork: isIsolatedNetwork, getDefaultAddress: getDefaultAddress, signAndPostTxns: signAndPostTxns }];
      }
    });
  });
};
export function setProviderByEnv(env) {
  setProvider(makeProviderByEnv(env));
};

function randlabsProviderEnv(net) {
  var prefix = net === 'MainNet' ? '' : net.toLowerCase() + ".";
  var RANDLABS_BASE = "https://" + prefix + "algoexplorerapi.io";
  return {
    ALGO_SERVER: RANDLABS_BASE,
    ALGO_PORT: '',
    ALGO_TOKEN: '',
    ALGO_INDEXER_SERVER: RANDLABS_BASE + "/idx2",
    ALGO_INDEXER_PORT: '',
    ALGO_INDEXER_TOKEN: '',
    REACH_ISOLATED_NETWORK: 'no'
  };
}
export function providerEnvByName(providerName) {
  switch (providerName) {
    case 'MainNet':
      return randlabsProviderEnv('MainNet');
    case 'TestNet':
      return randlabsProviderEnv('TestNet');
    case 'BetaNet':
      return randlabsProviderEnv('BetaNet');
    case 'randlabs/MainNet':
      return randlabsProviderEnv('MainNet');
    case 'randlabs/TestNet':
      return randlabsProviderEnv('TestNet');
    case 'randlabs/BetaNet':
      return randlabsProviderEnv('BetaNet');
    case 'LocalHost':
      return localhostProviderEnv;
    default:
      throw Error("Unrecognized provider name: " + providerName);
  }
}
export function setProviderByName(providerName) {
  return setProviderByEnv(providerEnvByName(providerName));
}
// eslint-disable-next-line max-len
var rawFaucetDefaultMnemonic = 'frown slush talent visual weather bounce evil teach tower view fossil trip sauce express moment sea garbage pave monkey exercise soap lawn army above dynamic';
export var getFaucet = (_c = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var FAUCET;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            FAUCET = algosdk.mnemonicToSecretKey(envDefault(process.env.ALGO_FAUCET_PASSPHRASE, rawFaucetDefaultMnemonic));
            return [4 /*yield*/ , connectAccount(FAUCET)];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  }), _c[0]),
  setFaucet = _c[1];
var str2note = function(x) { return new Uint8Array(Buffer.from(x)); };
var NOTE_Reach_str = "Reach " + VERSION;
var NOTE_Reach = str2note(NOTE_Reach_str);
var NOTE_Reach_tag = function(tag) { return tag ? str2note(NOTE_Reach_str + (" " + tag + ")")) : NOTE_Reach; };
var makeTransferTxn = function(from, to, value, token, ps, closeTo, tag) {
  if (closeTo === void 0) { closeTo = undefined; }
  if (tag === void 0) { tag = undefined; }
  var valuen = bigNumberToBigInt(value);
  var note = NOTE_Reach_tag(tag);
  var txn = token ?
    algosdk.makeAssetTransferTxnWithSuggestedParams(from, to, closeTo, undefined, valuen, note, bigNumberToNumber(token), ps) :
    algosdk.makePaymentTxnWithSuggestedParams(from, to, valuen, closeTo, note, ps);
  return txn;
};
export var transfer = function(from, to, value, token, tag) {
  if (token === void 0) { token = undefined; }
  if (tag === void 0) { tag = undefined; }
  return __awaiter(void 0, void 0, void 0, function() {
    var sender, receiver, valuebn, ps, txn;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          sender = from.networkAccount;
          receiver = to.networkAccount.addr;
          valuebn = bigNumberify(value);
          return [4 /*yield*/ , getTxnParams()];
        case 1:
          ps = _a.sent();
          txn = toWTxn(makeTransferTxn(sender.addr, receiver, valuebn, token, ps, undefined, tag));
          return [4 /*yield*/ , sign_and_send_sync("transfer " + JSON.stringify(from) + " " + JSON.stringify(to) + " " + valuebn, sender, txn)];
        case 2:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
// XXX need to make this a log
var makeIsMethod = function(i) {
  return function(txn) {
    var act = txn['application-transaction']['application-args'][0];
    var exp = base64ify([i]);
    var r = act === exp;
    //debug(`makeIsMethod`, {txn,i,act,exp,r});
    return r;
  };
};
/** @description base64->hex->arrayify */
var reNetify = function(x) {
  var s = Buffer.from(x, 'base64').toString('hex');
  return ethers.utils.arrayify('0x' + s);
};
export var connectAccount = function(networkAccount) {
  return __awaiter(void 0, void 0, void 0, function() {
    function setDebugLabel(newLabel) {
      label = newLabel;
      // @ts-ignore
      return this;
    }

    function tokenAccept(token) {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              debug("tokenAccept", token);
              // @ts-ignore
              return [4 /*yield*/ , transfer(this, this, 0, token)];
            case 1:
              // @ts-ignore
              _a.sent();
              return [2 /*return*/ ];
          }
        });
      });
    }
    var thisAcc, label, pks, selfAddress, iam, contract, tokenMetadata;
    return __generator(this, function(_a) {
      thisAcc = networkAccount;
      label = thisAcc.addr.substring(2, 6);
      pks = T_Address.canonicalize(thisAcc);
      debug(label, 'connectAccount');
      selfAddress = function() {
        return pks;
      };
      iam = function(some_addr) {
        if (some_addr === pks) {
          return some_addr;
        } else {
          throw Error("I should be " + some_addr + ", but am " + pks);
        }
      };
      contract = function(bin, givenInfoP) {
        ensureConnectorAvailable(bin, 'ALGO', reachBackendVersion, reachAlgoBackendVersion);
        must_be_supported(bin);
        var _a = bin._Connectors.ALGO,
          stateSize = _a.stateSize,
          stateKeys = _a.stateKeys,
          mapDataKeys = _a.mapDataKeys,
          mapDataSize = _a.mapDataSize;
        var hasMaps = mapDataKeys > 0;
        var mapDataTy = bin._getMaps({ reachStdlib: stdlib }).mapDataTy;
        var emptyMapDataTy = T_Bytes(mapDataTy.netSize);
        var emptyMapData =
          // This is a bunch of Nones
          mapDataTy.fromNet(emptyMapDataTy.toNet(emptyMapDataTy.canonicalize('')));
        debug({ emptyMapData: emptyMapData });
        var makeGetC = function(setupViewArgs, eventCache) {
          var fake_getInfo = setupViewArgs.getInfo;
          var _theC = undefined;
          return function() {
            return __awaiter(void 0, void 0, void 0, function() {
              var ctcInfo, _a, compiled, ApplicationID, startRound, Deployer, realLastRound, getLastRound, setLastRound, escrowAddr, escrow_prog, getLocalState, didOptIn, doOptIn, ensuredOptIn, ensureOptIn, getAppState, getGlobalState, canIWin, isin, isIsolatedNetwork;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    if (_theC) {
                      return [2 /*return*/ , _theC];
                    }
                    return [4 /*yield*/ , fake_getInfo()];
                  case 1:
                    ctcInfo = _b.sent();
                    return [4 /*yield*/ , stdVerifyContract(setupViewArgs, (function() {
                      return __awaiter(void 0, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              return [4 /*yield*/ , verifyContract_(label, ctcInfo, bin, eventCache)];
                            case 1:
                              return [2 /*return*/ , _a.sent()];
                          }
                        });
                      });
                    }))];
                  case 2:
                    _a = _b.sent(), compiled = _a.compiled, ApplicationID = _a.ApplicationID, startRound = _a.startRound, Deployer = _a.Deployer;
                    debug(label, 'getC', { ApplicationID: ApplicationID, startRound: startRound });
                    realLastRound = startRound;
                    getLastRound = function() { return realLastRound; };
                    setLastRound = function(x) { return (realLastRound = x); };
                    escrowAddr = compiled.escrow.hash;
                    escrow_prog = algosdk.makeLogicSig(compiled.escrow.result, []);
                    getLocalState = function(a) {
                      return __awaiter(void 0, void 0, void 0, function() {
                        var client, ai, als;
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              return [4 /*yield*/ , getAlgodClient()];
                            case 1:
                              client = _a.sent();
                              return [4 /*yield*/ , client.accountInformation(a)["do"]()];
                            case 2:
                              ai = _a.sent();
                              debug("getLocalState", ai);
                              als = ai['apps-local-state'].find(function(x) { return (x.id === ApplicationID); });
                              debug("getLocalState", als);
                              return [2 /*return*/ , als ? als['key-value'] : undefined];
                          }
                        });
                      });
                    };
                    didOptIn = function() {
                      return __awaiter(void 0, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              return [4 /*yield*/ , getLocalState(thisAcc.addr)];
                            case 1:
                              return [2 /*return*/ , ((_a.sent()) !== undefined)];
                          }
                        });
                      });
                    };
                    doOptIn = function() {
                      return __awaiter(void 0, void 0, void 0, function() {
                        var _a, _b, _c, _d, _e, _f, _g;
                        return __generator(this, function(_h) {
                          switch (_h.label) {
                            case 0:
                              debug("doOptIn");
                              _a = sign_and_send_sync;
                              _b = ['ApplicationOptIn',
                                thisAcc
                              ];
                              _c = toWTxn;
                              _e = (_d = algosdk).makeApplicationOptInTxn;
                              _f = [thisAcc.addr];
                              return [4 /*yield*/ , getTxnParams()];
                            case 1:
                              return [4 /*yield*/ , _a.apply(void 0, _b.concat([_c.apply(void 0, [_e.apply(_d, _f.concat([_h.sent(), ApplicationID,
                                undefined, undefined, undefined, undefined,
                                NOTE_Reach
                              ]))])]))];
                            case 2:
                              _h.sent();
                              _g = assert;
                              return [4 /*yield*/ , didOptIn()];
                            case 3:
                              _g.apply(void 0, [_h.sent(), "didOptIn after doOptIn"]);
                              return [2 /*return*/ ];
                          }
                        });
                      });
                    };
                    ensuredOptIn = false;
                    ensureOptIn = function() {
                      return __awaiter(void 0, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              if (!!ensuredOptIn) return [3 /*break*/ , 4];
                              return [4 /*yield*/ , didOptIn()];
                            case 1:
                              if (!!(_a.sent())) return [3 /*break*/ , 3];
                              return [4 /*yield*/ , doOptIn()];
                            case 2:
                              _a.sent();
                              _a.label = 3;
                            case 3:
                              ensuredOptIn = true;
                              _a.label = 4;
                            case 4:
                              return [2 /*return*/ ];
                          }
                        });
                      });
                    };
                    getAppState = function() {
                      return __awaiter(void 0, void 0, void 0, function() {
                        var lab, client, appInfo, e_7, appSt;
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              lab = "getAppState";
                              return [4 /*yield*/ , getAlgodClient()];
                            case 1:
                              client = _a.sent();
                              _a.label = 2;
                            case 2:
                              _a.trys.push([2, 4, , 5]);
                              return [4 /*yield*/ , client.getApplicationByID(ApplicationID)["do"]()];
                            case 3:
                              appInfo = _a.sent();
                              return [3 /*break*/ , 5];
                            case 4:
                              e_7 = _a.sent();
                              debug(lab, { e: e_7 });
                              return [2 /*return*/ , undefined];
                            case 5:
                              appSt = appInfo['params']['global-state'];
                              debug(lab, { appSt: appSt });
                              return [2 /*return*/ , appSt];
                          }
                        });
                      });
                    };
                    getGlobalState = function(appSt_g) {
                      return __awaiter(void 0, void 0, void 0, function() {
                        var appSt, _a, gsbs, gty;
                        return __generator(this, function(_b) {
                          switch (_b.label) {
                            case 0:
                              _a = appSt_g;
                              if (_a) return [3 /*break*/ , 2];
                              return [4 /*yield*/ , getAppState()];
                            case 1:
                              _a = (_b.sent());
                              _b.label = 2;
                            case 2:
                              appSt = _a;
                              if (!appSt) {
                                return [2 /*return*/ , undefined];
                              }
                              gsbs = readStateBytes('', [], appSt);
                              if (!gsbs) {
                                return [2 /*return*/ , undefined];
                              }
                              gty = T_Tuple([T_UInt, T_UInt, T_Address]);
                              // @ts-ignore
                              return [2 /*return*/ , gty.fromNet(gsbs)];
                          }
                        });
                      });
                    };
                    canIWin = function(lct) {
                      return __awaiter(void 0, void 0, void 0, function() {
                        var gs, r;
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              if (lct.eq(0)) {
                                return [2 /*return*/ , true];
                              }
                              return [4 /*yield*/ , getGlobalState()];
                            case 1:
                              gs = _a.sent();
                              r = !gs || lct.eq(gs[1]);
                              debug("canIWin", { lct: lct, gs: gs, r: r });
                              return [2 /*return*/ , r];
                          }
                        });
                      });
                    };
                    return [4 /*yield*/ , getProvider()];
                  case 3:
                    isin = (_b.sent()).isIsolatedNetwork;
                    isIsolatedNetwork = function() { return isin; };
                    return [2 /*return*/ , (_theC = { ApplicationID: ApplicationID, Deployer: Deployer, escrowAddr: escrowAddr, escrow_prog: escrow_prog, getLastRound: getLastRound, setLastRound: setLastRound, getLocalState: getLocalState, getAppState: getAppState, getGlobalState: getGlobalState, ensureOptIn: ensureOptIn, canIWin: canIWin, isIsolatedNetwork: isIsolatedNetwork })];
                }
              });
            });
          };
        };
        var getState_ = function(getC, lookup) {
          return __awaiter(void 0, void 0, void 0, function() {
            var _a, getAppState, getGlobalState, appSt, gs, vvn, vi, vtys, vty, vvs;
            return __generator(this, function(_b) {
              switch (_b.label) {
                case 0:
                  return [4 /*yield*/ , getC()];
                case 1:
                  _a = _b.sent(), getAppState = _a.getAppState, getGlobalState = _a.getGlobalState;
                  return [4 /*yield*/ , getAppState()];
                case 2:
                  appSt = _b.sent();
                  if (!appSt) {
                    throw Error("getState: no appSt");
                  }
                  return [4 /*yield*/ , getGlobalState(appSt)];
                case 3:
                  gs = _b.sent();
                  if (!gs) {
                    throw Error("getState: no gs");
                  }
                  vvn = recoverSplitBytes('v', stateSize, stateKeys, appSt);
                  if (vvn === undefined) {
                    throw Error("getState: no vvn");
                  }
                  vi = gs[0];
                  vtys = lookup(vi);
                  vty = T_Tuple(vtys);
                  vvs = vty.fromNet(vvn);
                  return [2 /*return*/ , vvs];
              }
            });
          });
        };
        var _setup = function(setupArgs) {
          var setInfo = setupArgs.setInfo,
            getInfo = setupArgs.getInfo,
            setTrustedVerifyResult = setupArgs.setTrustedVerifyResult;
          var didSet = new Signal();
          var fake_info = undefined;
          var fake_setInfo = function(x) {
            fake_info = x;
            didSet.notify();
          };
          var ctorRan = new Signal();
          ctorRan.wait().then(function() {
            if (fake_info !== undefined) {
              setInfo(fake_info);
            }
          });
          var fake_getInfo = function() {
            return __awaiter(void 0, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    if (!givenInfoP) return [3 /*break*/ , 2];
                    return [4 /*yield*/ , getInfo()];
                  case 1:
                    return [2 /*return*/ , _a.sent()];
                  case 2:
                    return [4 /*yield*/ , didSet.wait()];
                  case 3:
                    _a.sent();
                    if (fake_info === undefined) {
                      throw Error("impossible fake_info");
                    }
                    return [2 /*return*/ , fake_info];
                }
              });
            });
          };
          var eventCache = new EventCache();
          var fake_setupArgs = __assign(__assign({}, setupArgs), { getInfo: fake_getInfo });
          var getC = makeGetC(fake_setupArgs, eventCache);
          // Returns address of a Reach contract
          var getContractAddress = function() {
            return __awaiter(void 0, void 0, void 0, function() {
              var escrowAddr;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/ , getC()];
                  case 1:
                    escrowAddr = (_a.sent()).escrowAddr;
                    return [2 /*return*/ , T_Address.canonicalize(escrowAddr)];
                }
              });
            });
          };
          var getState = function(vibne, vtys) {
            return __awaiter(void 0, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/ , getState_(getC, function(vibna) {
                      if (vibne.eq(vibna)) {
                        return vtys;
                      }
                      throw Error("Expected state " + vibne + ", got " + vibna);
                    })];
                  case 1:
                    return [2 /*return*/ , _a.sent()];
                }
              });
            });
          };
          var sendrecv = function(srargs) {
            return __awaiter(void 0, void 0, void 0, function() {
              var funcNum, evt_cnt, lct, tys, args, pay, out_tys, onlyIf, soloSend, timeoutAt, sim_p, isCtor, doRecv, funcName, dhead, trustedRecv, _a, appApproval, appClear, extraPages, Deployer_1, createRes, _b, _c, _d, _e, _f, _g, allocRound, ApplicationID_1, ctcInfo, compiled, _h, ApplicationID, Deployer, escrowAddr, escrow_prog, ensureOptIn, canIWin, isIsolatedNetwork, value, toks, _j, _svs, msg, _k, _svs_tys, msg_tys, fake_res, sim_r, isHalt, mapRefs, mapAccts, mapAcctsReal, _loop_1, state_1;
              return __generator(this, function(_l) {
                switch (_l.label) {
                  case 0:
                    funcNum = srargs.funcNum, evt_cnt = srargs.evt_cnt, lct = srargs.lct, tys = srargs.tys, args = srargs.args, pay = srargs.pay, out_tys = srargs.out_tys, onlyIf = srargs.onlyIf, soloSend = srargs.soloSend, timeoutAt = srargs.timeoutAt, sim_p = srargs.sim_p;
                    isCtor = (funcNum === 0);
                    doRecv = function(didSend, waitIfNotPresent) {
                      return __awaiter(void 0, void 0, void 0, function() {
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              if (!didSend && lct.eq(0)) {
                                throw new Error("API call failed");
                              }
                              return [4 /*yield*/ , recv({ funcNum: funcNum, evt_cnt: evt_cnt, out_tys: out_tys, didSend: didSend, waitIfNotPresent: waitIfNotPresent, timeoutAt: timeoutAt })];
                            case 1:
                              return [2 /*return*/ , _a.sent()];
                          }
                        });
                      });
                    };
                    if (!!onlyIf) return [3 /*break*/ , 2];
                    return [4 /*yield*/ , doRecv(false, true)];
                  case 1:
                    return [2 /*return*/ , _l.sent()];
                  case 2:
                    funcName = "m" + funcNum;
                    dhead = label + ": sendrecv " + funcName + " " + timeoutAt;
                    trustedRecv = function(txn) {
                      return __awaiter(void 0, void 0, void 0, function() {
                        var didSend;
                        return __generator(this, function(_a) {
                          switch (_a.label) {
                            case 0:
                              didSend = true;
                              if (!isCtor) return [3 /*break*/ , 2];
                              return [4 /*yield*/ , doRecv(didSend, false)];
                            case 1:
                              // If this is the constructor, then we are going to need to notify
                              // the ctorRan signal, but we can only do that once the constructor
                              // is visible on the indexer, thus we can't rely on a trusted
                              // receive. I originally thought we could do this in the
                              // background, but the ctorRan signal is representative of what
                              // could happen in a real non-test program, so we should really
                              // double check with the indexer in a real deployment too.
                              return [2 /*return*/ , _a.sent()];
                            case 2:
                              return [4 /*yield*/ , recvFrom({ dhead: dhead, out_tys: out_tys, didSend: didSend, funcNum: funcNum, txn: txn })];
                            case 3:
                              return [2 /*return*/ , _a.sent()];
                          }
                        });
                      });
                    };
                    if (!isCtor) return [3 /*break*/ , 7];
                    debug(label, 'deploy');
                    return [4 /*yield*/ , compileFor(bin, 0)];
                  case 3:
                    _a = _l.sent(), appApproval = _a.appApproval, appClear = _a.appClear;
                    extraPages = Math.ceil((appClear.result.length + appApproval.result.length) / MaxAppProgramLen) - 1;
                    debug("deploy", { extraPages: extraPages });
                    Deployer_1 = thisAcc.addr;
                    _b = sign_and_send_sync;
                    _c = ['ApplicationCreate',
                      thisAcc
                    ];
                    _d = toWTxn;
                    _f = (_e = algosdk).makeApplicationCreateTxn;
                    _g = [Deployer_1];
                    return [4 /*yield*/ , getTxnParams()];
                  case 4:
                    return [4 /*yield*/ , _b.apply(void 0, _c.concat([_d.apply(void 0, [_f.apply(_e, _g.concat([_l.sent(), algosdk.OnApplicationComplete.NoOpOC,
                      appApproval.result,
                      appClear.result,
                      appLocalStateNumUInt, appLocalStateNumBytes + mapDataKeys,
                      appGlobalStateNumUInt, appGlobalStateNumBytes + stateKeys,
                      undefined, undefined, undefined, undefined,
                      NOTE_Reach, undefined, undefined, extraPages
                    ]))])]))];
                  case 5:
                    createRes = _l.sent();
                    allocRound = createRes['confirmed-round'];
                    ApplicationID_1 = createRes['application-index'];
                    if (!ApplicationID_1) {
                      throw Error("No application-index in " + JSON.stringify(createRes));
                    }
                    debug("created", { ApplicationID: ApplicationID_1 });
                    ctcInfo = ApplicationID_1;
                    return [4 /*yield*/ , compileFor(bin, ctcInfo)];
                  case 6:
                    compiled = _l.sent();
                    // We are adding one to the allocRound because we want querying to
                    // start at the first place it possibly could, which is going to
                    // eliminate the allocation from the event cache.
                    // Once we make it so the allocation event is actually needed, then
                    // we will modify this.
                    setTrustedVerifyResult({ compiled: compiled, ApplicationID: ApplicationID_1, startRound: allocRound + 1, Deployer: Deployer_1 });
                    fake_setInfo(ctcInfo);
                    _l.label = 7;
                  case 7:
                    return [4 /*yield*/ , getC()];
                  case 8:
                    _h = _l.sent(), ApplicationID = _h.ApplicationID, Deployer = _h.Deployer, escrowAddr = _h.escrowAddr, escrow_prog = _h.escrow_prog, ensureOptIn = _h.ensureOptIn, canIWin = _h.canIWin, isIsolatedNetwork = _h.isIsolatedNetwork;
                    value = pay[0], toks = pay[1];
                    void(toks); // <-- rely on simulation because of ordering
                    debug(dhead, '--- START');
                    _j = argsSplit(args, evt_cnt), _svs = _j[0], msg = _j[1];
                    _k = argsSplit(tys, evt_cnt), _svs_tys = _k[0], msg_tys = _k[1];
                    void(_svs);
                    void(_svs_tys);
                    fake_res = {
                      didSend: true,
                      didTimeout: false,
                      data: msg,
                      time: bigNumberify(0),
                      secs: bigNumberify(0),
                      value: value,
                      from: pks,
                      getOutput: (function(o_mode, o_lab, o_ctc, o_val) {
                        return __awaiter(void 0, void 0, void 0, function() {
                          return __generator(this, function(_a) {
                            void(o_mode);
                            void(o_lab);
                            void(o_ctc);
                            return [2 /*return*/ , o_val];
                          });
                        });
                      })
                    };
                    return [4 /*yield*/ , sim_p(fake_res)];
                  case 9:
                    sim_r = _l.sent();
                    debug(dhead, '--- SIMULATE', sim_r);
                    if (isCtor) {
                      msg.unshift(T_Address.canonicalize(escrowAddr));
                      msg_tys.unshift(T_Address);
                      sim_r.txns.unshift({
                        kind: 'to',
                        amt: minimumBalance,
                        tok: undefined
                      });
                    }
                    isHalt = sim_r.isHalt;
                    mapRefs = sim_r.mapRefs;
                    mapAccts = [];
                    mapRefs.forEach(function(caddr) {
                      var addr = cbr2algo_addr(caddr);
                      if (addressEq(thisAcc.addr, addr)) {
                        return;
                      }
                      var addrIdx = mapAccts.findIndex(function(other) { return addressEq(other, addr); });
                      var present = addrIdx !== -1;
                      if (present) {
                        return;
                      }
                      mapAccts.push(addr);
                    });
                    if (mapAccts.length > MaxAppTxnAccounts) {
                      throw Error("Application references too many local state cells in one step. Reach should catch this problem statically.");
                    }
                    debug(dhead, 'MAP', { mapAccts: mapAccts });
                    if (!hasMaps) return [3 /*break*/ , 11];
                    return [4 /*yield*/ , ensureOptIn()];
                  case 10:
                    _l.sent();
                    _l.label = 11;
                  case 11:
                    mapAcctsReal = (mapAccts.length === 0) ? undefined : mapAccts;
                    _loop_1 = function() {
                      var params, _m, _o, _p, extraFees, txnExtraTxns, sim_i, processSimTxn, actual_args, actual_tys, safe_args, whichAppl, txnAppl, rtxns, wtxns, res, e_8, _q, _r;
                      return __generator(this, function(_s) {
                        switch (_s.label) {
                          case 0:
                            return [4 /*yield*/ , getTxnParams()];
                          case 1:
                            params = _s.sent();
                            // We add one, because the firstRound field is actually the current
                            // round, which we couldn't possibly be in, because it already
                            // happened.
                            debug(dhead, '--- TIMECHECK', { params: params, timeoutAt: timeoutAt });
                            return [4 /*yield*/ , checkTimeout(isIsolatedNetwork, getTimeSecs, timeoutAt, params.firstRound + 1)];
                          case 2:
                            if (!_s.sent()) return [3 /*break*/ , 4];
                            debug(dhead, '--- FAIL/TIMEOUT');
                            _m = {};
                            return [4 /*yield*/ , doRecv(false, false)];
                          case 3:
                            return [2 /*return*/ , (_m.value = _s.sent(), _m)];
                          case 4:
                            _o = !soloSend;
                            if (!_o) return [3 /*break*/ , 6];
                            return [4 /*yield*/ , canIWin(lct)];
                          case 5:
                            _o = !(_s.sent());
                            _s.label = 6;
                          case 6:
                            if (!_o) return [3 /*break*/ , 8];
                            debug(dhead, "CANNOT WIN");
                            _p = {};
                            return [4 /*yield*/ , doRecv(false, false)];
                          case 7:
                            return [2 /*return*/ , (_p.value = _s.sent(), _p)];
                          case 8:
                            debug(dhead, '--- ASSEMBLE w/', params);
                            extraFees = 0;
                            txnExtraTxns = [];
                            sim_i = 0;
                            processSimTxn = function(t) {
                              var escrow = true;
                              var txn;
                              if (t.kind === 'tokenNew') {
                                processSimTxn({
                                  kind: 'to',
                                  amt: minimumBalance,
                                  tok: undefined
                                });
                                var zaddr = undefined;
                                var ap = bigNumberToBigInt(t.p);
                                debug("tokenNew", t.p, ap);
                                var decimals = t.d !== undefined ? t.d.toNumber() : 6;
                                txn = algosdk.makeAssetCreateTxnWithSuggestedParams(escrowAddr, NOTE_Reach_tag(sim_i++), ap, decimals, false, escrowAddr, zaddr, zaddr, zaddr, t.s, t.n, t.u, t.m, params);
                              } else if (t.kind === 'tokenBurn') {
                                // There's no burning on Algorand
                                return;
                              } else if (t.kind === 'tokenDestroy') {
                                txn = algosdk.makeAssetDestroyTxnWithSuggestedParams(escrowAddr, NOTE_Reach_tag(sim_i++), bigNumberToNumber(t.tok), params);
                                // XXX We could get the minimum balance back after
                              } else {
                                var tok = t.tok;
                                var always = false;
                                var amt = bigNumberify(0);
                                var from = escrowAddr;
                                var to = escrowAddr;
                                var closeTo = undefined;
                                if (t.kind === 'from') {
                                  from = escrowAddr;
                                  to = cbr2algo_addr(t.to);
                                  amt = t.amt;
                                } else if (t.kind === 'init') {
                                  processSimTxn({
                                    kind: 'to',
                                    amt: minimumBalance,
                                    tok: undefined
                                  });
                                  from = escrowAddr;
                                  to = escrowAddr;
                                  always = true;
                                  amt = t.amt;
                                } else if (t.kind === 'halt') {
                                  from = escrowAddr;
                                  to = Deployer;
                                  closeTo = Deployer;
                                  always = true;
                                } else if (t.kind === 'to') {
                                  from = thisAcc.addr;
                                  to = escrowAddr;
                                  amt = t.amt;
                                  escrow = false;
                                } else {
                                  assert(false, 'sim txn kind');
                                }
                                if (!always && amt.eq(0)) {
                                  return;
                                }
                                txn = makeTransferTxn(from, to, amt, tok, params, closeTo, sim_i++);
                              }
                              extraFees += txn.fee;
                              txn.fee = 0;
                              txnExtraTxns.push({ txn: txn, escrow: escrow });
                            };
                            sim_r.txns.forEach(processSimTxn);
                            debug(dhead, 'txnExtraTxns', txnExtraTxns);
                            debug(dhead, '--- extraFee =', extraFees);
                            actual_args = [lct, msg];
                            actual_tys = [T_UInt, T_Tuple(msg_tys)];
                            debug(dhead, '--- ARGS =', actual_args);
                            safe_args = actual_args.map(
                              // @ts-ignore
                              function(m, i) { return actual_tys[i].toNet(m); });
                            safe_args.unshift(new Uint8Array([funcNum]));
                            safe_args.forEach(function(x) {
                              if (!(x instanceof Uint8Array)) {
                                // The types say this is impossible now,
                                // but we'll leave it in for a while just in case...
                                throw Error("expect safe program argument, got " + JSON.stringify(x));
                              }
                            });
                            debug(dhead, '--- PREPARE:', safe_args.map(ui8h));
                            whichAppl = isHalt ?
                              // We are treating it like any party can delete the application, but the docs say it may only be possible for the creator. The code appears to not care: https://github.com/algorand/go-algorand/blob/0e9cc6b0c2ddc43c3cfa751d61c1321d8707c0da/ledger/apply/application.go#L589
                              algosdk.makeApplicationDeleteTxn :
                              algosdk.makeApplicationNoOpTxn;
                            txnAppl = whichAppl(thisAcc.addr, params, ApplicationID, safe_args, mapAcctsReal, undefined, undefined, NOTE_Reach);
                            txnAppl.fee += extraFees;
                            rtxns = __spreadArray(__spreadArray([], txnExtraTxns, true), [{ txn: txnAppl, escrow: false }], false);
                            debug(dhead, "assigning", { rtxns: rtxns });
                            algosdk.assignGroupID(rtxns.map(function(x) { return x.txn; }));
                            wtxns = rtxns.map(function(pwt) {
                              var txn = pwt.txn,
                                escrow = pwt.escrow;
                              if (escrow) {
                                var stxn = algosdk.signLogicSigTransactionObject(txn, escrow_prog);
                                return {
                                  txn: encodeUnsignedTransaction(txn),
                                  signers: [],
                                  stxn: Buffer.from(stxn.blob).toString('base64')
                                };
                              } else {
                                return toWTxn(txn);
                              }
                            });
                            debug(dhead, 'signing', { wtxns: wtxns });
                            res = void 0;
                            _s.label = 9;
                          case 9:
                            _s.trys.push([9, 11, , 14]);
                            return [4 /*yield*/ , signSendAndConfirm(thisAcc, wtxns)];
                          case 10:
                            res = _s.sent();
                            return [3 /*break*/ , 14];
                          case 11:
                            e_8 = _s.sent();
                            if (e_8.type === 'sendRawTransaction') {
                              debug(dhead, '--- FAIL:', format_failed_request(e_8 === null || e_8 === void 0 ? void 0 : e_8.e));
                            } else {
                              debug(dhead, '--- FAIL:', e_8);
                            }
                            if (!!soloSend) return [3 /*break*/ , 13];
                            // If there is no soloSend, then someone else "won", so let's
                            // listen for their message
                            debug(dhead, 'LOST');
                            _q = {};
                            return [4 /*yield*/ , doRecv(false, false)];
                          case 12:
                            return [2 /*return*/ , (_q.value = _s.sent(), _q)];
                          case 13:
                            if (timeoutAt) {
                              // If there can be a timeout, then keep waiting for it
                              debug(dhead, "CONTINUE");
                              return [2 /*return*/ , "continue"];
                            } else {
                              // Otherwise, something bad is happening
                              throw Error(label + " failed to call " + funcName + ": " + e_8);
                            }
                            return [3 /*break*/ , 14];
                          case 14:
                            debug(dhead, 'SUCCESS', res);
                            _r = {};
                            return [4 /*yield*/ , trustedRecv(res)];
                          case 15:
                            return [2 /*return*/ , (_r.value = _s.sent(), _r)];
                        }
                      });
                    };
                    _l.label = 12;
                  case 12:
                    if (!true) return [3 /*break*/ , 14];
                    return [5 /*yield**/ , _loop_1()];
                  case 13:
                    state_1 = _l.sent();
                    if (typeof state_1 === "object")
                      return [2 /*return*/ , state_1.value];
                    return [3 /*break*/ , 12];
                  case 14:
                    return [2 /*return*/ ];
                }
              });
            });
          };
          var recvFrom = function(rfargs) {
            return __awaiter(void 0, void 0, void 0, function() {
              var dhead, out_tys, didSend, funcNum, txn, _a, escrowAddr, getLastRound, setLastRound, isCtor, theRound, theSecs, ctc_args_all, argMsg, ctc_args_s, msgTy, ctc_args, shouldBeEscrow, fromAddr, from, oldLastRound, getOutput;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    dhead = rfargs.dhead, out_tys = rfargs.out_tys, didSend = rfargs.didSend, funcNum = rfargs.funcNum, txn = rfargs.txn;
                    return [4 /*yield*/ , getC()];
                  case 1:
                    _a = _b.sent(), escrowAddr = _a.escrowAddr, getLastRound = _a.getLastRound, setLastRound = _a.setLastRound;
                    isCtor = (funcNum == 0);
                    debug(dhead, '--- txn =', txn);
                    theRound = txn['confirmed-round'];
                    return [4 /*yield*/ , getTimeSecs(bigNumberify(theRound - 0))];
                  case 2:
                    theSecs = _b.sent();
                    ctc_args_all = txn['application-args'];
                    debug(dhead, { ctc_args_all: ctc_args_all });
                    argMsg = 2;
                    ctc_args_s = ctc_args_all[argMsg];
                    debug(dhead, 'out_tys', out_tys.map(function(x) { return x.name; }));
                    if (isCtor) {
                      out_tys.unshift(T_Address);
                      debug(dhead, 'ctor, adding address', out_tys.map(function(x) { return x.name; }));
                    }
                    msgTy = T_Tuple(out_tys);
                    ctc_args = msgTy.fromNet(reNetify(ctc_args_s));
                    debug(dhead, { ctc_args: ctc_args });
                    if (isCtor) {
                      shouldBeEscrow = ctc_args.shift();
                      debug(dhead, "dropped escrow addr", { shouldBeEscrow: shouldBeEscrow, escrowAddr: escrowAddr, ctc_args: ctc_args });
                    }
                    fromAddr = txn['sender'];
                    from = T_Address.canonicalize({ addr: fromAddr });
                    debug(dhead, { from: from, fromAddr: fromAddr });
                    oldLastRound = getLastRound();
                    setLastRound(theRound);
                    debug(dhead, { oldLastRound: oldLastRound, theRound: theRound });
                    getOutput = function(o_mode, o_lab, o_ctc, o_val) {
                      return __awaiter(void 0, void 0, void 0, function() {
                        var f_ctc, _i, _a, l, lb, ln, ls, ld, o;
                        return __generator(this, function(_b) {
                          debug("getOutput", { o_mode: o_mode, o_lab: o_lab, o_ctc: o_ctc, o_val: o_val });
                          f_ctc = T_Tuple([T_UInt, o_ctc]);
                          for (_i = 0, _a = txn['logs']; _i < _a.length; _i++) {
                            l = _a[_i];
                            lb = reNetify(l);
                            ln = T_UInt.fromNet(lb);
                            ls = "v" + ln;
                            debug("getOutput", { l: l, lb: lb, ln: ln, ls: ls });
                            if (ls === o_lab) {
                              ld = f_ctc.fromNet(lb);
                              o = ld[1];
                              debug("getOutput", { ld: ld, o: o });
                              return [2 /*return*/ , o];
                            }
                          }
                          throw Error("no log for " + o_lab);
                        });
                      });
                    };
                    return [2 /*return*/ , {
                      didSend: didSend,
                      didTimeout: false,
                      data: ctc_args,
                      time: bigNumberify(getLastRound()),
                      secs: bigNumberify(theSecs),
                      from: from,
                      getOutput: getOutput
                    }];
                }
              });
            });
          };
          var recv = function(rargs) {
            return __awaiter(void 0, void 0, void 0, function() {
              var funcNum, out_tys, didSend, waitIfNotPresent, timeoutAt, isCtor, fromBlock_summand, funcName, dhead, _a, ApplicationID, getLastRound, isIsolatedNetwork, correctStep, minRound, res, currentRound, txn;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    funcNum = rargs.funcNum, out_tys = rargs.out_tys, didSend = rargs.didSend, waitIfNotPresent = rargs.waitIfNotPresent, timeoutAt = rargs.timeoutAt;
                    isCtor = (funcNum == 0);
                    fromBlock_summand = isCtor ? 0 : 1;
                    funcName = "m" + funcNum;
                    dhead = label + ": " + label + " recv " + funcName + " " + timeoutAt;
                    debug(dhead, '--- START');
                    return [4 /*yield*/ , getC()];
                  case 1:
                    _a = _b.sent(), ApplicationID = _a.ApplicationID, getLastRound = _a.getLastRound, isIsolatedNetwork = _a.isIsolatedNetwork;
                    _b.label = 2;
                  case 2:
                    if (!true) return [3 /*break*/ , 11];
                    correctStep = makeIsMethod(funcNum);
                    minRound = getLastRound() + fromBlock_summand;
                    return [4 /*yield*/ , eventCache.query(dhead, ApplicationID, { minRound: minRound, timeoutAt: timeoutAt }, correctStep)];
                  case 3:
                    res = _b.sent();
                    debug("EventCache res: ", res);
                    if (!!res.succ) return [3 /*break*/ , 9];
                    currentRound = res.round;
                    debug(dhead, 'TIMECHECK', { timeoutAt: timeoutAt, minRound: minRound, currentRound: currentRound });
                    return [4 /*yield*/ , checkTimeout(isIsolatedNetwork, getTimeSecs, timeoutAt, currentRound + 1)];
                  case 4:
                    if (_b.sent()) {
                      debug(dhead, 'TIMEOUT');
                      return [2 /*return*/ , { didTimeout: true }];
                    }
                    if (!waitIfNotPresent) return [3 /*break*/ , 6];
                    return [4 /*yield*/ , waitUntilTime(bigNumberify(currentRound + 1))];
                  case 5:
                    _b.sent();
                    return [3 /*break*/ , 8];
                  case 6:
                    return [4 /*yield*/ , indexer_statusAfterBlock(currentRound + 1)];
                  case 7:
                    _b.sent();
                    _b.label = 8;
                  case 8:
                    return [3 /*break*/ , 2];
                  case 9:
                    if (isCtor) {
                      ctorRan.notify();
                    }
                    txn = indexerTxn2RecvTxn(res.txn);
                    return [4 /*yield*/ , recvFrom({ dhead: dhead, out_tys: out_tys, didSend: didSend, funcNum: funcNum, txn: txn })];
                  case 10:
                    return [2 /*return*/ , _b.sent()];
                  case 11:
                    return [2 /*return*/ ];
                }
              });
            });
          };
          return { getContractAddress: getContractAddress, getState: getState, sendrecv: sendrecv, recv: recv };
        };
        var readStateBytes = function(prefix, key, src) {
          debug({ prefix: prefix, key: key });
          var ik = base64ify(new Uint8Array(key));
          debug({ ik: ik });
          var ste = src.find(function(x) { return x.key === ik; });
          debug({ ste: ste });
          if (ste === undefined) {
            return [];
          };
          var st = ste.value;
          debug({ st: st });
          if (st.bytes === undefined) {
            return [];
          };
          var bsi = base64ToUI8A(st.bytes);
          debug({ bsi: bsi });
          return bsi;
        };
        var recoverSplitBytes = function(prefix, size, howMany, src) {
          var bs = new Uint8Array(size);
          var offset = 0;
          for (var i = 0; i < howMany; i++) {
            var bsi = readStateBytes(prefix, [i], src);
            if (bsi.length == 0) {
              return undefined;
            }
            bs.set(bsi, offset);
            offset += bsi.length;
          }
          return bs;
        };
        var setupView = function(setupViewArgs) {
          var eventCache = new EventCache();
          var getC = makeGetC(setupViewArgs, eventCache);
          var viewLib = {
            viewMapRef: function(mapi, a) {
              return __awaiter(void 0, void 0, void 0, function() {
                var getLocalState, ls, mbs, md, mr;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      return [4 /*yield*/ , getC()];
                    case 1:
                      getLocalState = (_a.sent()).getLocalState;
                      debug('viewMapRef', { mapi: mapi, a: a });
                      return [4 /*yield*/ , getLocalState(cbr2algo_addr(a))];
                    case 2:
                      ls = _a.sent();
                      assert(ls !== undefined, 'viewMapRef ls undefined');
                      debug('viewMapRef', { ls: ls });
                      mbs = recoverSplitBytes('m', mapDataSize, mapDataKeys, ls);
                      debug('viewMapRef', { mbs: mbs });
                      md = mapDataTy.fromNet(mbs);
                      debug('viewMapRef', { md: md });
                      mr = md[mapi];
                      assert(mr !== undefined, 'viewMapRef mr undefined');
                      return [2 /*return*/ , mr];
                  }
                });
              });
            }
          };
          var getView1 = function(vs, v, k, vim) {
            return function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              return __awaiter(void 0, void 0, void 0, function() {
                var decode, vi_1, vvs, vres, e_9;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      debug('getView1', v, k, args);
                      decode = vim.decode;
                      _a.label = 1;
                    case 1:
                      _a.trys.push([1, 4, , 5]);
                      vi_1 = 0;
                      return [4 /*yield*/ , getState_(getC, function(vibna) {
                        vi_1 = bigNumberToNumber(vibna);
                        var vtys = vs[vi_1];
                        if (!vtys) {
                          throw Error("no views for state " + vibna);
                        }
                        return vtys;
                      })];
                    case 2:
                      vvs = _a.sent();
                      return [4 /*yield*/ , decode(vi_1, vvs, args)];
                    case 3:
                      vres = _a.sent();
                      debug({ vres: vres });
                      return [2 /*return*/ , ['Some', vres]];
                    case 4:
                      e_9 = _a.sent();
                      debug("getView1", v, k, 'error', e_9);
                      return [2 /*return*/ , ['None', null]];
                    case 5:
                      return [2 /*return*/ ];
                  }
                });
              });
            };
          };
          return { getView1: getView1, viewLib: viewLib };
        };
        return stdContract({ bin: bin, waitUntilTime: waitUntilTime, waitUntilSecs: waitUntilSecs, selfAddress: selfAddress, iam: iam, stdlib: stdlib, setupView: setupView, _setup: _setup, givenInfoP: givenInfoP });
      };;
      tokenMetadata = function(token) {
        return __awaiter(void 0, void 0, void 0, function() {
          var client, tokenRes, tokenInfo, p, name, symbol, url, metadata, supply, decimals;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                debug("tokenMetadata", token);
                return [4 /*yield*/ , getAlgodClient()];
              case 1:
                client = _a.sent();
                return [4 /*yield*/ , client.getAssetByID(bigNumberToNumber(token))["do"]()];
              case 2:
                tokenRes = _a.sent();
                debug({ tokenRes: tokenRes });
                tokenInfo = tokenRes['params'];
                debug({ tokenInfo: tokenInfo });
                p = function(n, x) {
                  return x ? T_Bytes(n).fromNet(reNetify(x)) : undefined;
                };
                name = p(32, tokenInfo['name-b64']);
                symbol = p(8, tokenInfo['unit-name-b64']);
                url = p(96, tokenInfo['url-b64']);
                metadata = p(32, tokenInfo['metadata-hash']);
                supply = bigNumberify(tokenInfo['total']);
                decimals = bigNumberify(tokenInfo['decimals']);
                return [2 /*return*/ , { name: name, symbol: symbol, url: url, metadata: metadata, supply: supply, decimals: decimals }];
            }
          });
        });
      };
      return [2 /*return*/ , stdAccount({ networkAccount: networkAccount, getAddress: selfAddress, stdlib: stdlib, setDebugLabel: setDebugLabel, tokenAccept: tokenAccept, tokenMetadata: tokenMetadata, contract: contract })];
    });
  });
};
export var balanceOf = function(acc, token) {
  if (token === void 0) { token = false; }
  return __awaiter(void 0, void 0, void 0, function() {
    var networkAccount, client, info, _i, _a, ai;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          networkAccount = acc.networkAccount;
          if (!networkAccount) {
            throw Error("acc.networkAccount missing. Got: " + acc);
          }
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          client = _b.sent();
          return [4 /*yield*/ , client.accountInformation(networkAccount.addr)["do"]()];
        case 2:
          info = _b.sent();
          if (!token) {
            return [2 /*return*/ , bigNumberify(info.amount)];
          } else {
            for (_i = 0, _a = info.assets; _i < _a.length; _i++) {
              ai = _a[_i];
              if (ai['asset-id'] === token) {
                return [2 /*return*/ , ai['amount']];
              }
            }
            return [2 /*return*/ , bigNumberify(0)];
          }
          return [2 /*return*/ ];
      }
    });
  });
};
export var createAccount = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var networkAccount;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          networkAccount = algosdk.generateAccount();
          return [4 /*yield*/ , connectAccount(networkAccount)];
        case 1:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
export var canFundFromFaucet = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var faucet, algodClient, txnParams, act, exp, fbal;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getFaucet()];
        case 1:
          faucet = _a.sent();
          return [4 /*yield*/ , getAlgodClient()];
        case 2:
          algodClient = _a.sent();
          debug('ALGO:canFundFromFaucet: check genesis');
          return [4 /*yield*/ , algodClient.getTransactionParams()["do"]()];
        case 3:
          txnParams = _a.sent();
          act = txnParams.genesisID;
          exp = 'devnet-v1';
          if (act !== exp) {
            debug("ALGO:canFundFromFaucet: expected '" + exp + "' !== actual '" + act + "'");
            return [2 /*return*/ , false];
          }
          debug('ALGO:canFundFromFaucet: check balance');
          return [4 /*yield*/ , balanceOf(faucet)];
        case 4:
          fbal = _a.sent();
          debug("ALGO:canFundFromFaucet: faucet balance = " + formatCurrency(fbal, 4) + " " + standardUnit);
          return [2 /*return*/ , gt(fbal, 0)];
      }
    });
  });
};
export var fundFromFaucet = function(account, value) {
  return __awaiter(void 0, void 0, void 0, function() {
    var faucet, tag;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getFaucet()];
        case 1:
          faucet = _a.sent();
          debug('fundFromFaucet');
          tag = Math.round(Math.random() * (Math.pow(2, 32)));
          return [4 /*yield*/ , transfer(faucet, account, value, undefined, tag)];
        case 2:
          _a.sent();
          return [2 /*return*/ ];
      }
    });
  });
};
export var newTestAccount = function(startingBalance) {
  return __awaiter(void 0, void 0, void 0, function() {
    var account;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , createAccount()];
        case 1:
          account = _a.sent();
          return [4 /*yield*/ , fundFromFaucet(account, startingBalance)];
        case 2:
          _a.sent();
          return [2 /*return*/ , account];
      }
    });
  });
};
export var newTestAccounts = make_newTestAccounts(newTestAccount);
/** @description the display name of the standard unit of currency for the network */
export var standardUnit = 'ALGO';
/** @description the display name of the atomic (smallest) unit of currency for the network */
export var atomicUnit = 'μALGO';
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100000000'
 */
export function parseCurrency(amt) {
  // @ts-ignore
  var numericAmt = isBigNumber(amt) ? amt.toNumber() :
    typeof amt === 'string' ? parseFloat(amt) :
    typeof amt === 'bigint' ? Number(amt) :
    amt;
  return bigNumberify(algosdk.algosToMicroalgos(numericAmt));
}
// XXX get from SDK
var raw_minimumBalance = 100000;
export var minimumBalance = bigNumberify(raw_minimumBalance);
// lol I am not importing leftpad for this
/** @example lpad('asdf', '0', 6); // => '00asdf' */
function lpad(str, padChar, nChars) {
  var padding = padChar.repeat(Math.max(nChars - str.length, 0));
  return padding + str;
}
/** @example rdrop('asfdfff', 'f'); // => 'asfd' */
function rdrop(str, char) {
  while (str[str.length - 1] === char) {
    str = str.slice(0, str.length - 1);
  }
  return str;
}
/** @example ldrop('007', '0'); // => '7' */
function ldrop(str, char) {
  while (str[0] === char) {
    str = str.slice(1);
  }
  return str;
}
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeros will be omitted. Excess decimal places will be truncated (not rounded).
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000')); // => '100'
 * @example  formatCurrency(bigNumberify('9999998799987000')); // => '9999998799.987'
 */
export function formatCurrency(amt, decimals) {
  if (decimals === void 0) { decimals = 6; }
  if (!(Number.isInteger(decimals) && 0 <= decimals)) {
    throw Error("Expected decimals to be a nonnegative integer, but got " + decimals + ".");
  }
  var amtStr = bigNumberify(amt).toString();
  var splitAt = Math.max(amtStr.length - 6, 0);
  var lPredropped = amtStr.slice(0, splitAt);
  var l = ldrop(lPredropped, '0') || '0';
  if (decimals === 0) {
    return l;
  }
  var rPre = lpad(amtStr.slice(splitAt), '0', 6);
  var rSliced = rPre.slice(0, decimals);
  var r = rdrop(rSliced, '0');
  return r ? l + "." + r : l;
}
export function getDefaultAccount() {
  return __awaiter(this, void 0, void 0, function() {
    var addr;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getProvider()];
        case 1:
          return [4 /*yield*/ , (_a.sent()).getDefaultAddress()];
        case 2:
          addr = _a.sent();
          return [4 /*yield*/ , connectAccount({ addr: addr })];
        case 3:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
}
/**
 * @param mnemonic 25 words, space-separated
 */
export var newAccountFromMnemonic = function(mnemonic) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , connectAccount(algosdk.mnemonicToSecretKey(mnemonic))];
        case 1:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
/**
 * @param secret a Uint8Array, or its hex string representation
 */
export var newAccountFromSecret = function(secret) {
  return __awaiter(void 0, void 0, void 0, function() {
    var sk, mnemonic;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          sk = ethers.utils.arrayify(secret);
          mnemonic = algosdk.secretKeyToMnemonic(sk);
          return [4 /*yield*/ , newAccountFromMnemonic(mnemonic)];
        case 1:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
export var getNetworkTime = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var indexer, hc;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getIndexer()];
        case 1:
          indexer = _a.sent();
          return [4 /*yield*/ , indexer.makeHealthCheck()["do"]()];
        case 2:
          hc = _a.sent();
          return [2 /*return*/ , bigNumberify(hc['round'])];
      }
    });
  });
};
var getTimeSecs = function(now_bn) {
  return __awaiter(void 0, void 0, void 0, function() {
    var now, client, binfo, e_10, indexer, info;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          now = bigNumberToNumber(now_bn);
          _a.label = 1;
        case 1:
          _a.trys.push([1, 4, , 7]);
          return [4 /*yield*/ , getAlgodClient()];
        case 2:
          client = _a.sent();
          return [4 /*yield*/ , client.block(now)["do"]()];
        case 3:
          binfo = _a.sent();
          debug("getTimeSecs", "node", binfo);
          return [2 /*return*/ , bigNumberify(binfo.block.ts)];
        case 4:
          e_10 = _a.sent();
          debug("getTimeSecs", "node failed", e_10);
          return [4 /*yield*/ , getIndexer()];
        case 5:
          indexer = _a.sent();
          return [4 /*yield*/ , indexer.lookupBlock(now)["do"]()];
        case 6:
          info = _a.sent();
          debug("getTimeSecs", "indexer", info);
          return [2 /*return*/ , bigNumberify(info['timestamp'])];
        case 7:
          return [2 /*return*/ ];
      }
    });
  });
};
export var getNetworkSecs = function() {
  return __awaiter(void 0, void 0, void 0, function() {
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
  return __awaiter(void 0, void 0, void 0, function() {
    var _a;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/ , getProvider()];
        case 1:
          if (!(_b.sent()).isIsolatedNetwork) return [3 /*break*/ , 4];
          _a = fundFromFaucet;
          return [4 /*yield*/ , getFaucet()];
        case 2:
          return [4 /*yield*/ , _a.apply(void 0, [_b.sent(), 0])];
        case 3:
          _b.sent();
          _b.label = 4;
        case 4:
          return [4 /*yield*/ , indexer_statusAfterBlock(bigNumberToNumber(target))];
        case 5:
          return [2 /*return*/ , _b.sent()];
      }
    });
  });
};
export var waitUntilTime = make_waitUntilX('time', getNetworkTime, stepTime);
var stepSecs = function(target) {
  return __awaiter(void 0, void 0, void 0, function() {
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
export var waitUntilSecs = make_waitUntilX('secs', getNetworkSecs, stepSecs);
export var wait = function(delta, onProgress) {
  return __awaiter(void 0, void 0, void 0, function() {
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
var appLocalStateNumUInt = 0;
var appLocalStateNumBytes = 0;
var appGlobalStateNumUInt = 0;
var appGlobalStateNumBytes = 1;
export var verifyContract = function(info, bin) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2 /*return*/ , verifyContract_('', info, bin, new EventCache())];
    });
  });
};
var verifyContract_ = function(label, info, bin, eventCache) {
  return __awaiter(void 0, void 0, void 0, function() {
    var compiled, ApplicationID, appApproval, appClear, _a, mapDataKeys, stateKeys, dhead, chk, chkeq, fmtp, client, appInfo, err, e_11, appInfo_p, Deployer, appInfo_LocalState, appInfo_GlobalState, indexer, ilq, ilr, appInfo_i, allocRound, iar, iat, iatat, isCtor, icr, ict, ctorRound, ictat, aescrow_b64, aescrow_ui8, aescrow_cbr, aescrow_algo;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/ , compileFor(bin, info)];
        case 1:
          compiled = _b.sent();
          ApplicationID = compiled.ApplicationID, appApproval = compiled.appApproval, appClear = compiled.appClear;
          _a = bin._Connectors.ALGO, mapDataKeys = _a.mapDataKeys, stateKeys = _a.stateKeys;
          dhead = label + ": verifyContract";
          chk = function(p, msg) {
            if (!p) {
              throw Error(dhead + " failed: " + msg);
            }
          };
          chkeq = function(a, e, msg) {
            var as = JSON.stringify(a);
            var es = JSON.stringify(e);
            chk(as === es, msg + ": expected " + es + ", got " + as);
          };
          fmtp = function(x) { return uint8ArrayToStr(x.result, 'base64'); };
          return [4 /*yield*/ , getAlgodClient()];
        case 2:
          client = _b.sent();
          _b.label = 3;
        case 3:
          _b.trys.push([3, 5, , 6]);
          return [4 /*yield*/ , client.getApplicationByID(ApplicationID)["do"]()];
        case 4:
          appInfo = _b.sent();
          return [3 /*break*/ , 6];
        case 5:
          e_11 = _b.sent();
          err = e_11;
          return [3 /*break*/ , 6];
        case 6:
          if (appInfo === undefined) {
            throw Error(dhead + " failed: failed to lookup application (" + ApplicationID + "): " + JSON.stringify(err));
          }
          appInfo_p = appInfo['params'];
          debug(dhead, { appInfo_p: appInfo_p });
          chk(appInfo_p, "Cannot lookup ApplicationId");
          chkeq(appInfo_p['approval-program'], fmtp(appApproval), "Approval program does not match Reach backend");
          chkeq(appInfo_p['clear-state-program'], fmtp(appClear), "ClearState program does not match Reach backend");
          Deployer = appInfo_p['creator'];
          appInfo_LocalState = appInfo_p['local-state-schema'];
          chkeq(appInfo_LocalState['num-byte-slice'], appLocalStateNumBytes + mapDataKeys, "Num of byte-slices in local state schema does not match Reach backend");
          chkeq(appInfo_LocalState['num-uint'], appLocalStateNumUInt, "Num of uints in local state schema does not match Reach backend");
          appInfo_GlobalState = appInfo_p['global-state-schema'];
          chkeq(appInfo_GlobalState['num-byte-slice'], appGlobalStateNumBytes + stateKeys, "Num of byte-slices in global state schema does not match Reach backend");
          chkeq(appInfo_GlobalState['num-uint'], appGlobalStateNumUInt, "Num of uints in global state schema does not match Reach backend");
          return [4 /*yield*/ , getIndexer()];
        case 7:
          indexer = _b.sent();
          ilq = indexer.lookupApplications(ApplicationID).includeAll();
          return [4 /*yield*/ , doQuery_(dhead + " app lookup", ilq, true)];
        case 8:
          ilr = _b.sent();
          debug(dhead, { ilr: ilr });
          appInfo_i = ilr.application;
          debug(dhead, { appInfo_i: appInfo_i });
          chkeq(appInfo_i['deleted'], false, "Application must not be deleted");
          allocRound = appInfo_i['created-at-round'];
          return [4 /*yield*/ , eventCache.query(dhead, ApplicationID, { specRound: allocRound }, function(_) { return true; })];
        case 9:
          iar = _b.sent();
          iat = iar.txn;
          chk(iat, "Cannot query for allocation transaction");
          debug({ iat: iat });
          iatat = iat['application-transaction'];
          debug({ iatat: iatat });
          chkeq(iatat['approval-program'], appInfo_p['approval-program'], "ApprovalProgram unchanged since creation");
          chkeq(iatat['clear-state-program'], appInfo_p['clear-state-program'], "ClearStateProgram unchanged since creation");
          isCtor = makeIsMethod(0);
          return [4 /*yield*/ , eventCache.query(dhead + " ctor", ApplicationID, { minRound: 0 }, isCtor)];
        case 10:
          icr = _b.sent();
          debug({ icr: icr });
          ict = icr.txn;
          chk(ict, "Cannot query for constructor transaction");
          debug({ ict: ict });
          ctorRound = ict['confirmed-round'];
          ictat = ict['application-transaction'];
          debug({ ictat: ictat });
          aescrow_b64 = ictat['application-args'][2];
          aescrow_ui8 = reNetify(aescrow_b64);
          aescrow_cbr = T_Tuple([T_Address]).fromNet(aescrow_ui8);
          aescrow_algo = cbr2algo_addr(aescrow_cbr[0]);
          chkeq(aescrow_algo, compiled.escrow.hash, "Must be constructed with proper escrow account address");
          return [2 /*return*/ , { compiled: compiled, ApplicationID: ApplicationID, startRound: ctorRound, Deployer: Deployer }];
      }
    });
  });
};
/**
 * Formats an account's address in the way users expect to see it.
 * @param acc Account, NetworkAccount, base32-encoded address, or hex-encoded address
 * @returns the address formatted as a base32-encoded string with checksum
 */
export function formatAddress(acc) {
  return addressFromHex(T_Address.canonicalize(acc));
}
export function launchToken(accCreator, name, sym, opts) {
  if (opts === void 0) { opts = {}; }
  return __awaiter(this, void 0, void 0, function() {
    var addr, caddr, zaddr, algod, dotxn, supply, decimals, ctxn_p, id, mint, optOut;
    var _this = this;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug("Launching token, " + name + " (" + sym + ")");
          addr = function(acc) { return acc.networkAccount.addr; };
          caddr = addr(accCreator);
          zaddr = caddr;
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          algod = _a.sent();
          dotxn = function(mktxn, acc) {
            if (acc === void 0) { acc = accCreator; }
            return __awaiter(_this, void 0, void 0, function() {
              var sk, params, t, s, r;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    sk = acc.networkAccount.sk;
                    if (!sk) {
                      throw new Error("can only launchToken with account with secret key");
                    }
                    return [4 /*yield*/ , getTxnParams()];
                  case 1:
                    params = _a.sent();
                    t = mktxn(params);
                    s = t.signTxn(sk);
                    return [4 /*yield*/ , algod.sendRawTransaction(s)["do"]()];
                  case 2:
                    r = (_a.sent());
                    return [4 /*yield*/ , waitForConfirmation(r.txId)];
                  case 3:
                    _a.sent();
                    return [4 /*yield*/ , algod.pendingTransactionInformation(r.txId)["do"]()];
                  case 4:
                    return [2 /*return*/ , _a.sent()];
                }
              });
            });
          };
          supply = (opts.supply && bigNumberify(opts.supply)) || bigNumberify(2).pow(64).sub(1);
          decimals = opts.decimals !== undefined ? opts.decimals : 6;
          return [4 /*yield*/ , dotxn(function(params) {
            return algosdk.makeAssetCreateTxnWithSuggestedParams(caddr, undefined, bigNumberToBigInt(supply), decimals, false, zaddr, zaddr, zaddr, zaddr, sym, name, '', '', params);
          })];
        case 2:
          ctxn_p = _a.sent();
          id = ctxn_p["asset-index"];
          debug(sym + ": asset is " + id);
          mint = function(accTo, amt) {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    debug(sym + ": transferring " + amt + " " + sym + " for " + addr(accTo));
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
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/ , dotxn(function(params) {
                      return algosdk.makeAssetTransferTxnWithSuggestedParams(addr(accFrom), addr(accTo), addr(accTo), undefined, 0, undefined, id, params);
                    }, accFrom)];
                  case 1:
                    _a.sent();
                    return [2 /*return*/ ];
                }
              });
            });
          };
          return [2 /*return*/ , { name: name, sym: sym, id: id, mint: mint, optOut: optOut }];
      }
    });
  });
};
export var reachStdlib = stdlib;
//# sourceMappingURL=ALGO.js.map
