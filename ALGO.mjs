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
var __spreadArray = (this && this.__spreadArray) || function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
var _a, _b, _c, _d;
export var connector = 'ALGO';
// XXX: use @types/algosdk when we can
import algosdk from 'algosdk';
import ethers from 'ethers';
import Timeout from 'await-timeout';
import buffer from 'buffer';
import msgpack from '@msgpack/msgpack';
// DEBUG: uncomment this for debugging in browser
// @ts-ignore
// import algosdk__src__transaction from 'algosdk/src/transaction';
var Buffer = buffer.Buffer;
import { VERSION } from './version.mjs';
import { getViewsHelper, deferContract, debug, envDefault, argsSlice, argsSplit, makeRandom, replaceableThunk, ensureConnectorAvailable, bigNumberToBigInt, argMax, argMin, make_newTestAccounts, make_waitUntilX, checkTimeout, } from './shared_impl.mjs';
import { isBigNumber, bigNumberify, bigNumberToNumber, } from './shared_user.mjs';
import waitPort from './waitPort.mjs';
import { addressFromHex, stdlib as compiledStdlib, typeDefs, } from './ALGO_compiled.mjs';
import { process, window } from './shim.mjs';
export var add = compiledStdlib.add,
  sub = compiledStdlib.sub,
  mod = compiledStdlib.mod,
  mul = compiledStdlib.mul,
  div = compiledStdlib.div,
  protect = compiledStdlib.protect,
  assert = compiledStdlib.assert,
  Array_set = compiledStdlib.Array_set,
  eq = compiledStdlib.eq,
  ge = compiledStdlib.ge,
  gt = compiledStdlib.gt,
  le = compiledStdlib.le,
  lt = compiledStdlib.lt,
  bytesEq = compiledStdlib.bytesEq,
  digestEq = compiledStdlib.digestEq;
export * from './shared_user.mjs';
var reachBackendVersion = 1;
var reachAlgoBackendVersion = 2;
// Helpers
// Parse CBR into Public Key
var cbr2algo_addr = function(x) {
  return algosdk.encodeAddress(Buffer.from(x.slice(2), 'hex'));
};

function uint8ArrayToStr(a, enc) {
  if (enc === void 0) { enc = 'utf8'; }
  if (!(a instanceof Uint8Array)) {
    console.log(a);
    throw Error("Expected Uint8Array, got " + a);
  }
  return Buffer.from(a).toString(enc);
}
var _e = replaceableThunk(function() { return true; }),
  getWaitPort = _e[0],
  setWaitPort = _e[1];
export { setWaitPort };

function wait1port(server, port) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!getWaitPort())
            return [2 /*return*/ ];
          return [4 /*yield*/ , waitPort(server, port)];
        case 1:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
// type SignStrategy = 'mnemonic' | 'AlgoSigner' | 'MyAlgo';
var _f = replaceableThunk(function() { return 'mnemonic'; }),
  getSignStrategy = _f[0],
  setSignStrategy = _f[1];
export { getSignStrategy, setSignStrategy };
var _g = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var AlgoSigner;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!window.AlgoSigner) return [3 /*break*/ , 2];
            AlgoSigner = window.AlgoSigner;
            return [4 /*yield*/ , AlgoSigner.connect()];
          case 1:
            _a.sent();
            return [2 /*return*/ , AlgoSigner];
          case 2:
            // TODO: wait for a few seconds and try again before giving up
            throw Error("Can't find AlgoSigner. Please refresh the page and try again.");
        }
      });
    });
  }),
  getAlgoSigner = _g[0],
  setAlgoSigner = _g[1];
export { setAlgoSigner };
if (process.env.REACH_CONNECTOR_MODE == 'ALGO-browser'
  // Yes, this is dumb. TODO something better
  ||
  process.env.REACH_CONNECTOR_MODE === 'ETH-browser') {
  setWaitPort(false);
}
var rawDefaultToken = 'c87f5580d7a866317b4bfe9e8b8d1dda955636ccebfa88c12b414db208dd9705';
var rawDefaultItoken = 'reach-devnet';
export var waitForConfirmation = function(txId, untilRound) {
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
                    _a = lastLastRound > 0 ? [client.statusAfterBlock(lastLastRound),
                      "waiting until after " + lastLastRound
                    ] : [client.status(),
                      "looking up current round"
                    ], c = _a[0], msg = _a[1];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead), [msg]));
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
              var lastRound, info;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    return [4 /*yield*/ , checkTooLate(lastLastRound)];
                  case 1:
                    lastRound = _a.sent();
                    return [4 /*yield*/ , doOrDie(client.pendingTransactionInformation(txId)["do"]())];
                  case 2:
                    info = _a.sent();
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['info', info]));
                    if (!info['exn']) return [3 /*break*/ , 4];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['switching to indexer on error']));
                    return [4 /*yield*/ , checkIndexer(lastRound)];
                  case 3:
                    return [2 /*return*/ , _a.sent()];
                  case 4:
                    if (!(info['confirmed-round'] > 0)) return [3 /*break*/ , 5];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['confirmed']));
                    return [2 /*return*/ , info];
                  case 5:
                    if (!(info['pool-error'] === '')) return [3 /*break*/ , 7];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['still in pool, trying again']));
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
                    res = _a.sent();
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['indexer', res]));
                    if (!res['exn']) return [3 /*break*/ , 5];
                    debug.apply(void 0, __spreadArray(__spreadArray([], dhead), ['indexer failed, trying again']));
                    return [4 /*yield*/ , checkIndexer(lastRound)];
                  case 4:
                    return [2 /*return*/ , _a.sent()];
                  case 5:
                    return [2 /*return*/ , res['transaction']];
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
var sendAndConfirm = function(stxs) {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, lastRound, txID, sendme, client, req, e_2, e_3;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _a = stxs[0], lastRound = _a.lastRound, txID = _a.txID;
          sendme = stxs.map(function(stx) { return stx.tx; });
          _b.label = 1;
        case 1:
          _b.trys.push([1, 4, , 5]);
          return [4 /*yield*/ , getAlgodClient()];
        case 2:
          client = _b.sent();
          req = client.sendRawTransaction(sendme);
          // @ts-ignore
          debug('sendAndConfirm:', base64ify(req.txnBytesToPost));
          return [4 /*yield*/ , req["do"]()];
        case 3:
          _b.sent();
          return [3 /*break*/ , 5];
        case 4:
          e_2 = _b.sent();
          throw { type: 'sendRawTransaction', e: e_2 };
        case 5:
          _b.trys.push([5, 7, , 8]);
          return [4 /*yield*/ , waitForConfirmation(txID, lastRound)];
        case 6:
          return [2 /*return*/ , _b.sent()];
        case 7:
          e_3 = _b.sent();
          throw { type: 'waitForConfirmation', e: e_3 };
        case 8:
          return [2 /*return*/ ];
      }
    });
  });
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
          s = typeof e_4 === 'object' ? e_4.statusCode : 'not object';
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
export var getTxnParams = function() {
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

function regroup(thisAcc, txns) {
  // Sorry this is so dumb.
  // Basically, if these go thru AlgoSigner,
  // it will mangle them,
  //  so we need to recalculate the group hash.
  if (thisAcc.AlgoSigner) {
    var roundtrip_txns = txns
      .map(function(x) { return clean_for_AlgoSigner(x); })
      .map(function(x) { return unclean_for_AlgoSigner(x); });
    // console.log(`deployP: group`);
    // console.log(txns[0].group);
    // console.log(Buffer.from(txns[0].group, 'base64').toString('base64'));
    // console.log({...txns[0]});
    algosdk.assignGroupID(roundtrip_txns);
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
  } else {
    return txns;
  }
}
// A copy/paste of some logic from AlgoSigner
// packages/extension/src/background/messaging/task.ts
function unclean_for_AlgoSigner(txnOrig) {
  var txn = __assign({}, txnOrig);
  Object.keys(__assign({}, txnOrig)).forEach(function(key) {
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
      txn.appArgs.forEach(function(element) {
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
var clean_for_AlgoSigner = function(txnOrig) {
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
  } else {
    console.log(txn.lease);
    throw Error("Impossible: non-empty lease");
  }
  // Creation of ApplTx has extra or invalid fields: nonParticipation
  if (!txn.nonParticipation) {
    delete txn.nonParticipation;
  } else {
    throw Error("Impossible: expected falsy nonParticipation, got: " + txn.nonParticipation);
  }
  // "Creation of ApplTx has extra or invalid fields: name,tag."
  if (txn.type !== 'appl') {
    delete txn.appArgs;
  } else {
    if (txn.appArgs) {
      if (txn.appArgs.length === 0) {
        txn.appArgs = [];
      } else {
        txn.appArgs = txn.appArgs.map(function(arg) { return uint8ArrayToStr(arg, 'base64'); });
      }
    }
  }
  // Validation failed for transaction because of invalid properties [from,to]
  // closeRemainderTo can cause an error w/ js-algorand-sdk addr parsing
  for (var _i = 0, _a = ['from', 'to', 'closeRemainderTo']; _i < _a.length; _i++) {
    var field = _a[_i];
    if (txn[field] && txn[field].publicKey) {
      txn[field] = algosdk.encodeAddress(txn[field].publicKey);
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
var sign_and_send_sync = function(label, networkAccount, txn) {
  return __awaiter(void 0, void 0, void 0, function() {
    var txn_s, e_5;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , signTxn(networkAccount, txn)];
        case 1:
          txn_s = _a.sent();
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [4 /*yield*/ , sendAndConfirm([txn_s])];
        case 3:
          return [2 /*return*/ , _a.sent()];
        case 4:
          e_5 = _a.sent();
          console.log(e_5);
          throw Error(label + " txn failed:\n" + JSON.stringify(txn) + "\nwith:\n" + JSON.stringify(e_5));
        case 5:
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
    var ApplicationID, algob, appApproval, appClear, escrow, subst_appid, checkLen, appApproval_bin, appClear_bin, escrow_bin;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug("compileFor", info, typeof(info), Number.isInteger(info));
          if (!Number.isInteger(info)) {
            throw Error("This Reach standard library cannot communicate with this contract, because it was deployed with an earlier version of Reach.");
          }
          ApplicationID = info;
          must_be_supported(bin);
          algob = bin._Connectors.ALGO;
          appApproval = algob.appApproval, appClear = algob.appClear, escrow = algob.escrow;
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
          appApproval_bin = _a.sent();
          return [4 /*yield*/ , compileTEAL('appClear', appClear)];
        case 2:
          appClear_bin = _a.sent();
          checkLen("App Program Length", (appClear_bin.result.length + appApproval_bin.result.length), (1 + MaxExtraAppProgramPages) * MaxAppProgramLen);
          return [4 /*yield*/ , compileTEAL('escrow_subst', subst_appid(escrow))];
        case 3:
          escrow_bin = _a.sent();
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
          debug(dhead, '--- RESULT =', res);
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
var _h = replaceableThunk(function() { return 0; }),
  _getQueryLowerBound = _h[0],
  _setQueryLowerBound = _h[1];
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
      var minRound, timeoutAt, specRound, h, maxRound, maxSecs, filterRound, filterFn, initPtxns, txn_1, indexer, query, res, ptxns, txn;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            minRound = roundInfo.minRound, timeoutAt = roundInfo.timeoutAt, specRound = roundInfo.specRound;
            h = function(mode) { return timeoutAt && timeoutAt[0] === mode ? bigNumberToNumber(timeoutAt[1]) : undefined; };
            maxRound = h('time');
            maxSecs = h('secs');
            debug(dhead, "EventCache.query", { ApplicationID: ApplicationID, minRound: minRound, specRound: specRound, timeoutAt: timeoutAt, maxRound: maxRound, maxSecs: maxSecs }, this.currentRound);
            filterRound = minRound !== null && minRound !== void 0 ? minRound : specRound;
            this.cache = this.cache.filter(function(x) { return x['confirmed-round'] >= filterRound; });
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
            debug("Transaction not in Event Cache. Querying network...");
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
              return [2 /*return*/ , { succ: false, round: this.currentRound }];
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
export var addressEq = compiledStdlib.addressEq,
  tokenEq = compiledStdlib.tokenEq,
  digest = compiledStdlib.digest;
export var T_Null = typeDefs.T_Null,
  T_Bool = typeDefs.T_Bool,
  T_UInt = typeDefs.T_UInt,
  T_Tuple = typeDefs.T_Tuple,
  T_Array = typeDefs.T_Array,
  T_Object = typeDefs.T_Object,
  T_Data = typeDefs.T_Data,
  T_Bytes = typeDefs.T_Bytes,
  T_Address = typeDefs.T_Address,
  T_Digest = typeDefs.T_Digest,
  T_Struct = typeDefs.T_Struct,
  T_Token = typeDefs.T_Token;
export var randomUInt = (_a = makeRandom(8), _a.randomUInt),
  hasRandom = _a.hasRandom;
export var getLedger = (_b = replaceableThunk(function() { return DEFAULT_ALGO_LEDGER; }), _b[0]),
  setLedger = _b[1];

function getLedgerFromAlgoSigner(AlgoSigner) {
  // XXX: get AlgoSigner to tell us what Ledger is "currently selected"
  // since that ability doesn't actually exist, we operate based off of setLedger()
  void(AlgoSigner);
  return getLedger();
}

function waitIndexerFromEnv(env) {
  return __awaiter(this, void 0, void 0, function() {
    var ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT, ALGO_INDEXER_TOKEN;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          ALGO_INDEXER_SERVER = env.ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT = env.ALGO_INDEXER_PORT, ALGO_INDEXER_TOKEN = env.ALGO_INDEXER_TOKEN;
          return [4 /*yield*/ , wait1port(ALGO_INDEXER_SERVER, ALGO_INDEXER_PORT)];
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
          return [4 /*yield*/ , wait1port(ALGO_SERVER, ALGO_PORT)];
        case 1:
          _a.sent();
          return [2 /*return*/ , new algosdk.Algodv2(ALGO_TOKEN, ALGO_SERVER, ALGO_PORT)];
      }
    });
  });
}
// TODO: read token from scripts/devnet-algo/algorand_data/algod.token
export var getAlgodClient = (_c = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            debug("Setting algod client to default");
            return [4 /*yield*/ , waitAlgodClientFromEnv(envDefaultsALGO(process.env))];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  }), _c[0]),
  setAlgodClient = _c[1];
export var getIndexer = (_d = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            debug("setting indexer to default");
            return [4 /*yield*/ , waitIndexerFromEnv(envDefaultsALGO(process.env))];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  }), _d[0]),
  setIndexer = _d[1];
// This function should be provided by the indexer, but it isn't so we simulate
// something decent. This function is allowed to "fail" by not really waiting
// until the round
var indexer_statusAfterBlock = function(round) {
  return __awaiter(void 0, void 0, void 0, function() {
    var client, now;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          client = _a.sent();
          now = bigNumberify(0);
          _a.label = 2;
        case 2:
          return [4 /*yield*/ , getNetworkTime()];
        case 3:
          if (!(now = _a.sent()).lt(round)) return [3 /*break*/ , 6];
          return [4 /*yield*/ , client.statusAfterBlock(round)];
        case 4:
          _a.sent();
          // XXX Get the indexer to index one and wait
          return [4 /*yield*/ , Timeout.set(500)];
        case 5:
          // XXX Get the indexer to index one and wait
          _a.sent();
          return [3 /*break*/ , 2];
        case 6:
          return [2 /*return*/ , now];
      }
    });
  });
};
export function getProvider() {
  return __awaiter(this, void 0, void 0, function() {
    var _a;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _a = {};
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          _a.algodClient = _b.sent();
          return [4 /*yield*/ , getIndexer()];
        case 2:
          return [2 /*return*/ , (_a.indexer = _b.sent(),
            _a.ledger = getLedger(),
            _a)];
      }
    });
  });
}
export function setProvider(provider) {
  return __awaiter(this, void 0, void 0, function() {
    var _this = this;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , provider];
        case 1:
          provider = _a.sent();
          // XXX doesn't waitPort these, because these are opaque to us.
          // should we do something similar where we wait for /health to give us a 200 response?
          setAlgodClient((function() {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                return [2 /*return*/ , provider.algodClient];
              });
            });
          })());
          setIndexer((function() {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                return [2 /*return*/ , provider.indexer];
              });
            });
          })());
          setLedger(provider.ledger);
          return [2 /*return*/ ];
      }
    });
  });
}
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
  return port !== undefined ? port :
    serverLooksLikeRandlabs(server) ? '' :
    defaultPort;
}

function envDefaultALGOToken(token, defaultToken, server, port) {
  // Some simple guessing
  // port is not currently used for this guessing, but could be in the future
  void(port);
  return token !== undefined ? token :
    serverLooksLikeRandlabs(server) ? '' :
    defaultToken;
}

function guessRandlabsLedger(server) {
  if (server === undefined)
    return undefined;
  server = server.toLowerCase();
  if (server.startsWith('https://algoexplorerapi.io')) {
    return 'MainNet';
  } else if (server.startsWith('https://testnet.algoexplorerapi.io')) {
    return 'TestNet';
  } else if (server.startsWith('https://betanet.algoexplorerapi.io')) {
    return 'BetaNet';
  }
  return undefined;
}

function envDefaultALGOLedger(ledger, defaultLedger, server, port) {
  // Some simple guessing
  // port is not currently used for this guessing, but could be in the future
  void(port);
  return ledger !== undefined ? ledger :
    serverLooksLikeRandlabs(server) ? guessRandlabsLedger(ledger) :
    defaultLedger;
}

function envDefaultsALGO(env) {
  var ALGO_SERVER = envDefault(env.ALGO_SERVER, DEFAULT_ALGO_SERVER);
  var ALGO_PORT = envDefaultALGOPort(env.ALGO_PORT, DEFAULT_ALGO_PORT, ALGO_SERVER);
  var ALGO_TOKEN = envDefaultALGOToken(env.ALGO_TOKEN, DEFAULT_ALGO_TOKEN, ALGO_SERVER, ALGO_PORT);
  var ALGO_LEDGER = envDefaultALGOLedger(env.ALGO_LEDGER, DEFAULT_ALGO_LEDGER, ALGO_SERVER, ALGO_PORT);
  var ALGO_INDEXER_SERVER = envDefault(env.ALGO_INDEXER_SERVER, DEFAULT_ALGO_INDEXER_SERVER);
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
export function setProviderByEnv(env) {
  // Note: This doesn't just immediately call setProviderByEnv,
  // because here we can actually take the opportunity to wait1port.
  var fullEnv = envDefaultsALGO(env);
  setAlgodClient(waitAlgodClientFromEnv(fullEnv));
  setIndexer(waitIndexerFromEnv(fullEnv));
  setLedger(fullEnv.ALGO_LEDGER);
}

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
var rawFaucetDefaultMnemonic = 'around sleep system young lonely length mad decline argue army veteran knee truth sell hover any measure audit page mammal treat conduct marble above shell';
var _j = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var FAUCET;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!isIsolatedNetwork()) {
              throw Error("Cannot automatically use faucet for non-isolated network; if you want to use a custom faucet, use setFaucet");
            }
            FAUCET = algosdk.mnemonicToSecretKey(envDefault(process.env.ALGO_FAUCET_PASSPHRASE, rawFaucetDefaultMnemonic));
            return [4 /*yield*/ , connectAccount(FAUCET)];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  }),
  getFaucet = _j[0],
  setFaucet_ = _j[1];
var settedFaucet = false;
var setFaucet = function(x) {
  settedFaucet = true;
  setFaucet_(x);
};
var isIsolatedNetwork = function() {
  return (settedFaucet || getLedger() === localhostProviderEnv.ALGO_LEDGER);
};
export { getFaucet, setFaucet };
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
          txn = makeTransferTxn(sender.addr, receiver, valuebn, token, ps, undefined, tag);
          return [4 /*yield*/ , sign_and_send_sync("transfer " + JSON.stringify(from) + " " + JSON.stringify(to) + " " + valuebn, sender, txn)];
        case 2:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};

function signTxn(networkAccount, txnOrig) {
  return __awaiter(this, void 0, void 0, function() {
    var sk, AlgoSigner, tx, ret, txn, stx_obj, ret;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          sk = networkAccount.sk, AlgoSigner = networkAccount.AlgoSigner;
          if (!(sk && !AlgoSigner)) return [3 /*break*/ , 1];
          tx = txnOrig.signTxn(sk);
          ret = {
            tx: tx,
            txID: txnOrig.txID().toString(),
            lastRound: txnOrig.lastRound
          };
          debug('signed sk_ret');
          debug({ txID: ret.txID });
          debug(msgpack.decode(ret.tx));
          return [2 /*return*/ , ret];
        case 1:
          if (!AlgoSigner) return [3 /*break*/ , 3];
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
          debug('AlgoSigner.sign ...');
          return [4 /*yield*/ , AlgoSigner.sign(txn)];
        case 2:
          stx_obj = _a.sent();
          debug('...signed');
          debug({ stx_obj: stx_obj });
          ret = {
            tx: Buffer.from(stx_obj.blob, 'base64'),
            txID: stx_obj.txID,
            lastRound: txnOrig.lastRound
          };
          debug('signed AlgoSigner');
          debug({ txID: ret.txID });
          debug(msgpack.decode(ret.tx));
          return [2 /*return*/ , ret];
        case 3:
          throw Error("networkAccount has neither sk nor AlgoSigner: " + JSON.stringify(networkAccount));
      }
    });
  });
}
var makeIsMethod = function(i) {
  return function(txn) {
    return txn['application-transaction']['application-args'][0] === base64ify([i]);
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
    var thisAcc, shad, label, pks, selfAddress, iam, attachP, deployP, implNow, attach, deploy, tokenMetadata;
    return __generator(this, function(_a) {
      thisAcc = networkAccount;
      shad = thisAcc.addr.substring(2, 6);
      label = shad;
      pks = T_Address.canonicalize(thisAcc);
      debug(shad, ': connectAccount');
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
      attachP = function(bin, ctcInfoP, eventCache) {
        if (eventCache === void 0) { eventCache = new EventCache(); }
        return __awaiter(void 0, void 0, void 0, function() {
          var ctcInfo, getInfo, _a, compiled, ApplicationID, allocRound, ctorRound, Deployer, realLastRound, escrowAddr, escrow_prog, _b, viewSize, viewKeys, mapDataKeys, mapDataSize, hasMaps, mapDataTy, emptyMapDataTy, emptyMapData, getLocalState, didOptIn, doOptIn, ensuredOptIn, ensureOptIn, sendrecv, recv, creationTime, creationSecs, recoverSplitBytes, viewlib, views_bin, getView1, getViews;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                return [4 /*yield*/ , ctcInfoP];
              case 1:
                ctcInfo = _c.sent();
                getInfo = function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      return [2 /*return*/ , ctcInfo];
                    });
                  });
                };
                return [4 /*yield*/ , verifyContract_(ctcInfo, bin, eventCache)];
              case 2:
                _a = _c.sent(), compiled = _a.compiled, ApplicationID = _a.ApplicationID, allocRound = _a.allocRound, ctorRound = _a.ctorRound, Deployer = _a.Deployer;
                debug(shad, 'attach', { ApplicationID: ApplicationID, allocRound: allocRound, ctorRound: ctorRound });
                realLastRound = ctorRound;
                escrowAddr = compiled.escrow.hash;
                escrow_prog = algosdk.makeLogicSig(compiled.escrow.result, []);
                _b = bin._Connectors.ALGO, viewSize = _b.viewSize, viewKeys = _b.viewKeys, mapDataKeys = _b.mapDataKeys, mapDataSize = _b.mapDataSize;
                hasMaps = mapDataKeys > 0;
                mapDataTy = bin._getMaps({ reachStdlib: compiledStdlib }).mapDataTy;
                emptyMapDataTy = T_Bytes(mapDataTy.netSize);
                emptyMapData =
                  // This is a bunch of Nones
                  mapDataTy.fromNet(emptyMapDataTy.toNet(emptyMapDataTy.canonicalize('')));
                debug({ emptyMapData: emptyMapData });
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
                    var _a, _b, _c, _d, _e, _f;
                    return __generator(this, function(_g) {
                      switch (_g.label) {
                        case 0:
                          _a = sign_and_send_sync;
                          _b = ['ApplicationOptIn',
                            thisAcc
                          ];
                          _d = (_c = algosdk).makeApplicationOptInTxn;
                          _e = [thisAcc.addr];
                          return [4 /*yield*/ , getTxnParams()];
                        case 1:
                          return [4 /*yield*/ , _a.apply(void 0, _b.concat([_d.apply(_c, _e.concat([_g.sent(),
                            ApplicationID,
                            undefined, undefined, undefined, undefined,
                            NOTE_Reach
                          ]))]))];
                        case 2:
                          _g.sent();
                          _f = assert;
                          return [4 /*yield*/ , didOptIn()];
                        case 3:
                          _f.apply(void 0, [_g.sent(), "didOptIn after doOptIn"]);
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
                sendrecv = function(srargs) {
                  return __awaiter(void 0, void 0, void 0, function() {
                    var funcNum, evt_cnt, tys, args, pay, out_tys, onlyIf, soloSend, timeoutAt, sim_p, doRecv, value, toks, funcName, dhead, _a, svs, msg, _b, svs_tys, msg_tys, fake_res, sim_r, isHalt, mapRefs, mapAccts, mapAcctsReal, sign_escrow, sign_me, _loop_1, state_1;
                    return __generator(this, function(_c) {
                      switch (_c.label) {
                        case 0:
                          funcNum = srargs.funcNum, evt_cnt = srargs.evt_cnt, tys = srargs.tys, args = srargs.args, pay = srargs.pay, out_tys = srargs.out_tys, onlyIf = srargs.onlyIf, soloSend = srargs.soloSend, timeoutAt = srargs.timeoutAt, sim_p = srargs.sim_p;
                          doRecv = function(waitIfNotPresent) {
                            return __awaiter(void 0, void 0, void 0, function() {
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    return [4 /*yield*/ , recv({ funcNum: funcNum, evt_cnt: evt_cnt, out_tys: out_tys, waitIfNotPresent: waitIfNotPresent, timeoutAt: timeoutAt })];
                                  case 1:
                                    return [2 /*return*/ , _a.sent()];
                                }
                              });
                            });
                          };
                          if (!!onlyIf) return [3 /*break*/ , 2];
                          return [4 /*yield*/ , doRecv(true)];
                        case 1:
                          return [2 /*return*/ , _c.sent()];
                        case 2:
                          value = pay[0], toks = pay[1];
                          void(toks); // <-- rely on simulation because of ordering
                          funcName = "m" + funcNum;
                          dhead = shad + ": " + label + " sendrecv " + funcName + " " + timeoutAt;
                          debug(dhead, '--- START');
                          _a = argsSplit(args, evt_cnt), svs = _a[0], msg = _a[1];
                          _b = argsSplit(tys, evt_cnt), svs_tys = _b[0], msg_tys = _b[1];
                          fake_res = {
                            didTimeout: false,
                            data: msg,
                            time: bigNumberify(0),
                            secs: bigNumberify(0),
                            value: value,
                            from: pks,
                            getOutput: (function(o_mode, o_lab, o_ctc) {
                              return __awaiter(void 0, void 0, void 0, function() {
                                return __generator(this, function(_a) {
                                  void(o_mode);
                                  void(o_lab);
                                  void(o_ctc);
                                  throw Error("Algorand does not support remote calls, and Reach should not have generated a call to this function");
                                });
                              });
                            })
                          };
                          return [4 /*yield*/ , sim_p(fake_res)];
                        case 3:
                          sim_r = _c.sent();
                          debug(dhead, '--- SIMULATE', sim_r);
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
                          if (!hasMaps) return [3 /*break*/ , 5];
                          return [4 /*yield*/ , ensureOptIn()];
                        case 4:
                          _c.sent();
                          _c.label = 5;
                        case 5:
                          mapAcctsReal = (mapAccts.length === 0) ? undefined : mapAccts;
                          sign_escrow = function(txn) {
                            return __awaiter(void 0, void 0, void 0, function() {
                              var tx_obj;
                              return __generator(this, function(_a) {
                                tx_obj = algosdk.signLogicSigTransactionObject(txn, escrow_prog);
                                return [2 /*return*/ , {
                                  tx: tx_obj.blob,
                                  txID: tx_obj.txID,
                                  lastRound: txn.lastRound
                                }];
                              });
                            });
                          };
                          sign_me = function(x) {
                            return __awaiter(void 0, void 0, void 0, function() {
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    return [4 /*yield*/ , signTxn(thisAcc, x)];
                                  case 1:
                                    return [2 /*return*/ , _a.sent()];
                                }
                              });
                            });
                          };
                          _loop_1 = function() {
                            var params, extraFees, txnExtraTxns, txnExtraTxns_signers, sim_i, processSimTxn, actual_args, actual_tys, safe_args, whichAppl, txnAppl, txns, txnAppl_s, txnExtraTxns_s, txns_s, res, e_7, _d, _e;
                            return __generator(this, function(_f) {
                              switch (_f.label) {
                                case 0:
                                  return [4 /*yield*/ , getTxnParams()];
                                case 1:
                                  params = _f.sent();
                                  // We add one, because the firstRound field is actually the current
                                  // round, which we couldn't possibly be in, because it already
                                  // happened.
                                  debug(dhead, '--- TIMECHECK', { params: params, timeoutAt: timeoutAt });
                                  return [4 /*yield*/ , checkTimeout(getTimeSecs, timeoutAt, params.firstRound + 1)];
                                case 2:
                                  if (_f.sent()) {
                                    debug(dhead, '--- FAIL/TIMEOUT');
                                    return [2 /*return*/ , { value: { didTimeout: true } }];
                                  }
                                  debug(dhead, '--- ASSEMBLE w/', params);
                                  extraFees = 0;
                                  txnExtraTxns = [];
                                  txnExtraTxns_signers = [];
                                  sim_i = 0;
                                  processSimTxn = function(t) {
                                    var signer = sign_escrow;
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
                                      txn = algosdk.makeAssetCreateTxnWithSuggestedParams(escrowAddr, NOTE_Reach_tag(sim_i++), ap, 6, false, escrowAddr, zaddr, zaddr, zaddr, t.s, t.n, t.u, t.m, params);
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
                                        // @ts-ignore
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
                                        signer = sign_me;
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
                                    txnExtraTxns.push(txn);
                                    txnExtraTxns_signers.push(signer);
                                  };
                                  sim_r.txns.forEach(processSimTxn);
                                  debug(dhead, 'txnExtraTxns', txnExtraTxns);
                                  debug(dhead, '--- extraFee =', extraFees);
                                  actual_args = [svs, msg];
                                  actual_tys = [T_Tuple(svs_tys), T_Tuple(msg_tys)];
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
                                  txns = __spreadArray(__spreadArray([], txnExtraTxns), [txnAppl]);
                                  algosdk.assignGroupID(txns);
                                  regroup(thisAcc, txns);
                                  return [4 /*yield*/ , sign_me(txnAppl)];
                                case 3:
                                  txnAppl_s = _f.sent();
                                  return [4 /*yield*/ , Promise.all(txnExtraTxns.map(function(t, i) {
                                    return __awaiter(void 0, void 0, void 0, function() {
                                      return __generator(this, function(_a) {
                                        switch (_a.label) {
                                          case 0:
                                            return [4 /*yield*/ , txnExtraTxns_signers[i](t)];
                                          case 1:
                                            return [2 /*return*/ , _a.sent()];
                                        }
                                      });
                                    });
                                  }))];
                                case 4:
                                  txnExtraTxns_s = _f.sent();
                                  txns_s = __spreadArray(__spreadArray([], txnExtraTxns_s), [txnAppl_s]);
                                  debug(dhead, '--- SEND:', txns_s.length);
                                  res = void 0;
                                  _f.label = 5;
                                case 5:
                                  _f.trys.push([5, 7, , 10]);
                                  return [4 /*yield*/ , sendAndConfirm(txns_s)];
                                case 6:
                                  res = _f.sent();
                                  // XXX we should inspect res and if we failed because we didn't get picked out of the queue, then we shouldn't error, but should retry and let the timeout logic happen.
                                  debug(dhead, '--- SUCCESS:', res);
                                  return [3 /*break*/ , 10];
                                case 7:
                                  e_7 = _f.sent();
                                  if (e_7.type == 'sendRawTransaction') {
                                    debug(dhead, '--- FAIL:', format_failed_request(e_7.e));
                                  } else {
                                    debug(dhead, '--- FAIL:', e_7);
                                  }
                                  if (!!soloSend) return [3 /*break*/ , 9];
                                  _d = {};
                                  return [4 /*yield*/ , doRecv(false)];
                                case 8:
                                  return [2 /*return*/ , (_d.value = _f.sent(), _d)];
                                case 9:
                                  if (timeoutAt) {
                                    return [2 /*return*/ , "continue"];
                                  } else {
                                    // Otherwise, something bad is happening
                                    throw Error(dhead + " --- ABORT");
                                  }
                                  return [3 /*break*/ , 10];
                                case 10:
                                  _e = {};
                                  return [4 /*yield*/ , doRecv(false)];
                                case 11:
                                  return [2 /*return*/ , (_e.value = _f.sent(), _e)];
                              }
                            });
                          };
                          _c.label = 6;
                        case 6:
                          if (!true) return [3 /*break*/ , 8];
                          return [5 /*yield**/ , _loop_1()];
                        case 7:
                          state_1 = _c.sent();
                          if (typeof state_1 === "object")
                            return [2 /*return*/ , state_1.value];
                          return [3 /*break*/ , 6];
                        case 8:
                          return [2 /*return*/ ];
                      }
                    });
                  });
                };
                recv = function(rargs) {
                  return __awaiter(void 0, void 0, void 0, function() {
                    var funcNum, evt_cnt, out_tys, waitIfNotPresent, timeoutAt, indexer, funcName, dhead, _loop_2, state_2;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          funcNum = rargs.funcNum, evt_cnt = rargs.evt_cnt, out_tys = rargs.out_tys, waitIfNotPresent = rargs.waitIfNotPresent, timeoutAt = rargs.timeoutAt;
                          return [4 /*yield*/ , getIndexer()];
                        case 1:
                          indexer = _a.sent();
                          funcName = "m" + funcNum;
                          dhead = shad + ": " + label + " recv " + funcName + " " + timeoutAt;
                          debug(dhead, '--- START');
                          _loop_2 = function() {
                            var correctStep, res, currentRound, txn, theRound, theSecs, all_txns, get_all_txns, ctc_args_all, argMsg, ctc_args_s, msgTy, ctc_args, args_un, fromAddr, from, oldLastRound, tokenNews, getOutput;
                            return __generator(this, function(_b) {
                              switch (_b.label) {
                                case 0:
                                  correctStep = makeIsMethod(funcNum);
                                  return [4 /*yield*/ , eventCache.query(dhead, ApplicationID, { minRound: realLastRound + 1, timeoutAt: timeoutAt }, correctStep)];
                                case 1:
                                  res = _b.sent();
                                  debug("EventCache res: ", res);
                                  if (!!res.succ) return [3 /*break*/ , 7];
                                  currentRound = res.round;
                                  return [4 /*yield*/ , checkTimeout(getTimeSecs, timeoutAt, currentRound)];
                                case 2:
                                  if (_b.sent()) {
                                    debug(dhead, '--- RECVD timeout', { timeoutAt: timeoutAt, currentRound: currentRound });
                                    return [2 /*return*/ , { value: { didTimeout: true } }];
                                  }
                                  if (!waitIfNotPresent) return [3 /*break*/ , 4];
                                  return [4 /*yield*/ , waitUntilTime(bigNumberify(currentRound + 1))];
                                case 3:
                                  _b.sent();
                                  return [3 /*break*/ , 6];
                                case 4:
                                  return [4 /*yield*/ , indexer_statusAfterBlock(currentRound + 1)];
                                case 5:
                                  _b.sent();
                                  _b.label = 6;
                                case 6:
                                  return [2 /*return*/ , "continue"];
                                case 7:
                                  txn = res.txn;
                                  debug(dhead, '--- txn =', txn);
                                  theRound = txn['confirmed-round'];
                                  return [4 /*yield*/ , getTimeSecs(bigNumberify(theRound - 1))];
                                case 8:
                                  theSecs = _b.sent();
                                  all_txns = undefined;
                                  get_all_txns = function() {
                                    return __awaiter(void 0, void 0, void 0, function() {
                                      var all_query, all_res, same_group, all_txns_raw, group_order;
                                      return __generator(this, function(_a) {
                                        switch (_a.label) {
                                          case 0:
                                            if (all_txns) {
                                              return [2 /*return*/ ];
                                            }
                                            all_query = indexer.searchForTransactions()
                                              .txType('acfg')
                                              .assetID(0)
                                              .round(theRound);
                                            return [4 /*yield*/ , doQuery_(dhead, all_query)];
                                          case 1:
                                            all_res = _a.sent();
                                            same_group = (function(x) { return x.group === txn.group && x['asset-config-transaction']['asset-id'] === 0; });
                                            all_txns_raw = all_res.transactions.filter(same_group);
                                            group_order = (function(x, y) { return x['intra-round-offset'] - y['intra-round-offset']; });
                                            all_txns = all_txns_raw.sort(group_order);
                                            debug(dhead, 'all_txns', all_txns);
                                            return [2 /*return*/ ];
                                        }
                                      });
                                    });
                                  };
                                  ctc_args_all = txn['application-transaction']['application-args'];
                                  debug(dhead, { ctc_args_all: ctc_args_all });
                                  argMsg = 2;
                                  ctc_args_s = ctc_args_all[argMsg];
                                  debug(dhead, '--- out_tys =', out_tys);
                                  msgTy = T_Tuple(out_tys);
                                  ctc_args = msgTy.fromNet(reNetify(ctc_args_s));
                                  debug(dhead, { ctc_args: ctc_args });
                                  args_un = argsSlice(ctc_args, evt_cnt);
                                  debug(dhead, '--- args_un =', args_un);
                                  fromAddr = txn['sender'];
                                  from = T_Address.canonicalize({ addr: fromAddr });
                                  debug(dhead, '--- from =', from, '=', fromAddr);
                                  oldLastRound = realLastRound;
                                  realLastRound = theRound;
                                  debug(dhead, '--- RECVD updating round from', oldLastRound, 'to', realLastRound);
                                  tokenNews = 0;
                                  getOutput = function(o_mode, o_lab, o_ctc) {
                                    return __awaiter(void 0, void 0, void 0, function() {
                                      var tn_txn;
                                      return __generator(this, function(_a) {
                                        switch (_a.label) {
                                          case 0:
                                            if (!(o_mode === 'tokenNew')) return [3 /*break*/ , 2];
                                            return [4 /*yield*/ , get_all_txns()];
                                          case 1:
                                            _a.sent();
                                            tn_txn = all_txns[tokenNews++];
                                            debug(dhead, "tn_txn", tn_txn);
                                            return [2 /*return*/ , tn_txn['created-asset-index']];
                                          case 2:
                                            void(o_lab);
                                            void(o_ctc);
                                            throw Error("Algorand does not support remote calls");
                                        }
                                      });
                                    });
                                  };
                                  return [2 /*return*/ , {
                                    value: {
                                      didTimeout: false,
                                      data: args_un,
                                      time: bigNumberify(realLastRound),
                                      secs: bigNumberify(theSecs),
                                      from: from,
                                      getOutput: getOutput
                                    }
                                  }];
                              }
                            });
                          };
                          _a.label = 2;
                        case 2:
                          if (!true) return [3 /*break*/ , 4];
                          return [5 /*yield**/ , _loop_2()];
                        case 3:
                          state_2 = _a.sent();
                          if (typeof state_2 === "object")
                            return [2 /*return*/ , state_2.value];
                          return [3 /*break*/ , 2];
                        case 4:
                          return [2 /*return*/ ];
                      }
                    });
                  });
                };
                creationTime = function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      return [2 /*return*/ , bigNumberify(ctorRound)];
                    });
                  });
                };
                creationSecs = function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    var _a;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          _a = getTimeSecs;
                          return [4 /*yield*/ , creationTime()];
                        case 1:
                          return [4 /*yield*/ , _a.apply(void 0, [_b.sent()])];
                        case 2:
                          return [2 /*return*/ , _b.sent()];
                      }
                    });
                  });
                };
                recoverSplitBytes = function(prefix, size, howMany, src) {
                  var bs = new Uint8Array(size);
                  var offset = 0;
                  var _loop_3 = function(i) {
                    debug({ prefix: prefix, i: i });
                    var ik = base64ify(new Uint8Array([i]));
                    debug({ ik: ik });
                    var st = (src.find(function(x) { return x.key === ik; })).value;
                    debug({ st: st });
                    var bsi = base64ToUI8A(st.bytes);
                    debug({ bsi: bsi });
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
                  viewMapRef: function(mapi, a) {
                    return __awaiter(void 0, void 0, void 0, function() {
                      var ls, mbs, md, mr;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            debug('viewMapRef', { mapi: mapi, a: a });
                            return [4 /*yield*/ , getLocalState(cbr2algo_addr(a))];
                          case 1:
                            ls = _a.sent();
                            assert(ls !== undefined, 'viewMapRef ls undefined');
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
                views_bin = bin._getViews({ reachStdlib: compiledStdlib }, viewlib);
                getView1 = function(vs, v, k, vim) {
                  return function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    return __awaiter(void 0, void 0, void 0, function() {
                      var decode, client, appInfo, e_8, appSt, vvn, vin, vi, vtys, vty, vvs, vres, e_9;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            debug('getView1', v, k, args);
                            decode = vim.decode;
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
                            e_8 = _a.sent();
                            debug('getApplicationById', e_8);
                            return [2 /*return*/ , ['None', null]];
                          case 5:
                            appSt = appInfo['params']['global-state'];
                            vvn = recoverSplitBytes('v', viewSize, viewKeys, appSt);
                            if (vvn === undefined) {
                              return [2 /*return*/ , ['None', null]];
                            }
                            vin = T_UInt.fromNet(vvn.slice(0, T_UInt.netSize));
                            vi = bigNumberToNumber(vin);
                            debug({ vi: vi });
                            vtys = vs[vi];
                            debug({ vtys: vtys });
                            if (!vtys) {
                              return [2 /*return*/ , ['None', null]];
                            }
                            vty = T_Tuple(__spreadArray([T_UInt], vtys));
                            debug({ vty: vty });
                            vvs = vty.fromNet(vvn);
                            debug({ vvs: vvs });
                            _a.label = 6;
                          case 6:
                            _a.trys.push([6, 8, , 9]);
                            return [4 /*yield*/ , decode(vi, vvs.slice(1), args)];
                          case 7:
                            vres = _a.sent();
                            debug({ vres: vres });
                            return [2 /*return*/ , ['Some', vres]];
                          case 8:
                            e_9 = _a.sent();
                            debug("getView1", v, k, 'error', e_9);
                            return [2 /*return*/ , ['None', null]];
                          case 9:
                            return [2 /*return*/ ];
                        }
                      });
                    });
                  };
                };
                getViews = getViewsHelper(views_bin, getView1);
                return [2 /*return*/ , { getInfo: getInfo, creationTime: creationTime, creationSecs: creationSecs, sendrecv: sendrecv, recv: recv, waitTime: waitUntilTime, waitSecs: waitUntilSecs, iam: iam, selfAddress: selfAddress, getViews: getViews, stdlib: compiledStdlib }];
            }
          });
        });
      };
      deployP = function(bin) {
        return __awaiter(void 0, void 0, void 0, function() {
          var algob, viewKeys, mapDataKeys, _a, appApproval, appClear, extraPages, createRes, _b, _c, _d, _e, _f, ApplicationID, ctcInfo, escrow, escrowAddr, params, ctor_args, txnCtor, txnCtor_s, e_10, getInfo, eventCache;
          return __generator(this, function(_g) {
            switch (_g.label) {
              case 0:
                must_be_supported(bin);
                debug(shad, 'deploy');
                algob = bin._Connectors.ALGO;
                viewKeys = algob.viewKeys, mapDataKeys = algob.mapDataKeys;
                return [4 /*yield*/ , compileFor(bin, 0)];
              case 1:
                _a = _g.sent(), appApproval = _a.appApproval, appClear = _a.appClear;
                extraPages = Math.ceil((appClear.result.length + appApproval.result.length) / MaxAppProgramLen) - 1;
                debug("deploy", { extraPages: extraPages });
                _b = sign_and_send_sync;
                _c = ['ApplicationCreate',
                  thisAcc
                ];
                _e = (_d = algosdk).makeApplicationCreateTxn;
                _f = [thisAcc.addr];
                return [4 /*yield*/ , getTxnParams()];
              case 2:
                return [4 /*yield*/ , _b.apply(void 0, _c.concat([_e.apply(_d, _f.concat([_g.sent(),
                  algosdk.OnApplicationComplete.NoOpOC,
                  appApproval.result,
                  appClear.result,
                  appLocalStateNumUInt, appLocalStateNumBytes + mapDataKeys,
                  appGlobalStateNumUInt, appGlobalStateNumBytes + viewKeys,
                  undefined, undefined, undefined, undefined,
                  NOTE_Reach, undefined, undefined, extraPages
                ]))]))];
              case 3:
                createRes = _g.sent();
                ApplicationID = createRes['application-index'];
                if (!ApplicationID) {
                  throw Error("No application-index in " + JSON.stringify(createRes));
                }
                debug("created", { ApplicationID: ApplicationID });
                ctcInfo = ApplicationID;
                return [4 /*yield*/ , compileFor(bin, ctcInfo)];
              case 4:
                escrow = (_g.sent()).escrow;
                escrowAddr = escrow.hash;
                debug("funding escrow");
                // @ts-ignore
                return [4 /*yield*/ , transfer({ networkAccount: thisAcc }, { networkAccount: { addr: escrow.hash } }, minimumBalance)];
              case 5:
                // @ts-ignore
                _g.sent();
                debug("call ctor");
                return [4 /*yield*/ , getTxnParams()];
              case 6:
                params = _g.sent();
                ctor_args = [new Uint8Array([0]),
                  T_Address.toNet(T_Address.canonicalize(escrowAddr)),
                  T_Tuple([]).toNet([])
                ];
                debug({ ctor_args: ctor_args });
                txnCtor = algosdk.makeApplicationNoOpTxn(thisAcc.addr, params, ApplicationID, ctor_args, undefined, undefined, undefined, NOTE_Reach);
                debug({ txnCtor: txnCtor });
                return [4 /*yield*/ , signTxn(thisAcc, txnCtor)];
              case 7:
                txnCtor_s = _g.sent();
                _g.label = 8;
              case 8:
                _g.trys.push([8, 10, , 11]);
                return [4 /*yield*/ , sendAndConfirm([txnCtor_s])];
              case 9:
                _g.sent();
                return [3 /*break*/ , 11];
              case 10:
                e_10 = _g.sent();
                throw Error("deploy: " + JSON.stringify(e_10));
              case 11:
                getInfo = function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      return [2 /*return*/ , ctcInfo];
                    });
                  });
                };
                eventCache = new EventCache();
                return [4 /*yield*/ , waitCtorTxn(shad, ctcInfo, eventCache)];
              case 12:
                _g.sent();
                debug(shad, 'application created');
                return [4 /*yield*/ , attachP(bin, getInfo(), eventCache)];
              case 13:
                return [2 /*return*/ , _g.sent()];
            }
          });
        });
      };
      implNow = { stdlib: compiledStdlib };
      attach = function(bin, ctcInfoP) {
        ensureConnectorAvailable(bin, 'ALGO', reachBackendVersion, reachAlgoBackendVersion);
        return deferContract(false, attachP(bin, ctcInfoP), implNow);
      };
      deploy = function(bin) {
        ensureConnectorAvailable(bin, 'ALGO', reachBackendVersion, reachAlgoBackendVersion);
        return deferContract(false, deployP(bin), implNow);
      };;
      tokenMetadata = function(token) {
        return __awaiter(void 0, void 0, void 0, function() {
          var client, tokenRes, tokenInfo, name, symbol, url, mhr, metadata, supply;
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
                name = tokenInfo['name'];
                symbol = tokenInfo['unit-name'];
                url = tokenInfo['url'];
                mhr = tokenInfo['metadata-hash'];
                metadata = mhr ? T_Bytes(32).fromNet(reNetify(mhr)) : undefined;
                supply = bigNumberify(tokenInfo['total']);
                return [2 /*return*/ , { name: name, symbol: symbol, url: url, metadata: metadata, supply: supply }];
            }
          });
        });
      };
      return [2 /*return*/ , { deploy: deploy, attach: attach, networkAccount: networkAccount, getAddress: selfAddress, stdlib: compiledStdlib, setDebugLabel: setDebugLabel, tokenAccept: tokenAccept, tokenMetadata: tokenMetadata }];
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
    var faucet, fbal;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getFaucet()];
        case 1:
          faucet = _a.sent();
          debug('canFundFromFaucet');
          return [4 /*yield*/ , balanceOf(faucet)];
        case 2:
          fbal = _a.sent();
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
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
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
  var amtStr = amt.toString();
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
// XXX The getDefaultAccount pattern doesn't really work w/ AlgoSigner
// AlgoSigner does not expose a "currently-selected account"
export function getDefaultAccount() {
  return __awaiter(this, void 0, void 0, function() {
    var signStrategy, mnemonic, AlgoSigner, ledger, addr;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!window.prompt) {
            throw Error("Cannot prompt the user for default account with window.prompt");
          }
          signStrategy = getSignStrategy();
          if (!(signStrategy === 'mnemonic')) return [3 /*break*/ , 5];
          mnemonic = window.prompt("Please paste the mnemonic for your account, or cancel to generate a new one");
          if (!mnemonic) return [3 /*break*/ , 2];
          debug("Creating account from user-provided mnemonic");
          return [4 /*yield*/ , newAccountFromMnemonic(mnemonic)];
        case 1:
          return [2 /*return*/ , _a.sent()];
        case 2:
          debug("No mnemonic provided. Randomly generating a new account secret instead.");
          return [4 /*yield*/ , createAccount()];
        case 3:
          return [2 /*return*/ , _a.sent()];
        case 4:
          return [3 /*break*/ , 9];
        case 5:
          if (!(signStrategy === 'AlgoSigner')) return [3 /*break*/ , 8];
          return [4 /*yield*/ , getAlgoSigner()];
        case 6:
          AlgoSigner = _a.sent();
          ledger = getLedgerFromAlgoSigner(AlgoSigner);
          if (ledger === undefined)
            throw Error("Ledger is undefined; this is required by AlgoSigner");
          addr = window.prompt("Please paste your account's address. (This account must be listed in AlgoSigner.)");
          if (!addr) {
            throw Error("No address provided");
          }
          return [4 /*yield*/ , newAccountFromAlgoSigner(addr, AlgoSigner, ledger)];
        case 7:
          return [2 /*return*/ , _a.sent()];
        case 8:
          if (signStrategy === 'MyAlgo') {
            throw Error("MyAlgo wallet support is not yet implemented");
          } else {
            throw Error("signStrategy '" + signStrategy + "' not recognized. Valid options are 'mnemonic', 'AlgoSigner', and 'MyAlgo'.");
          }
          _a.label = 9;
        case 9:
          return [2 /*return*/ ];
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
export var newAccountFromAlgoSigner = function(addr, AlgoSigner, ledger) {
  return __awaiter(void 0, void 0, void 0, function() {
    var accts, networkAccount;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!AlgoSigner) {
            throw Error("AlgoSigner is falsy");
          }
          return [4 /*yield*/ , AlgoSigner.accounts({ ledger: ledger })];
        case 1:
          accts = _a.sent();
          if (!Array.isArray(accts)) {
            throw Error("AlgoSigner.accounts('" + ledger + "') is not an array: " + accts);
          }
          if (!accts.map(function(x) { return x.address; }).includes(addr)) {
            throw Error("Address " + addr + " not found in AlgoSigner accounts");
          }
          networkAccount = { addr: addr, AlgoSigner: AlgoSigner };
          return [4 /*yield*/ , connectAccount(networkAccount)];
        case 2:
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
    var now, indexer, info;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          now = bigNumberToNumber(now_bn);
          return [4 /*yield*/ , getIndexer()];
        case 1:
          indexer = _a.sent();
          return [4 /*yield*/ , indexer.lookupBlock(now)["do"]()];
        case 2:
          info = _a.sent();
          return [2 /*return*/ , bigNumberify(info['timestamp'])];
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
          if (!isIsolatedNetwork()) return [3 /*break*/ , 3];
          _a = fundFromFaucet;
          return [4 /*yield*/ , getFaucet()];
        case 1:
          return [4 /*yield*/ , _a.apply(void 0, [_b.sent(), 0])];
        case 2:
          _b.sent();
          _b.label = 3;
        case 3:
          return [4 /*yield*/ , indexer_statusAfterBlock(bigNumberToNumber(target))];
        case 4:
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

function queryCtorTxn(dhead, ApplicationID, eventCache) {
  return __awaiter(this, void 0, void 0, function() {
    var isCtor, icr;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          isCtor = makeIsMethod(0);
          return [4 /*yield*/ , eventCache.query(dhead + " ctor", ApplicationID, { minRound: 0 }, isCtor)];
        case 1:
          icr = _a.sent();
          debug({ icr: icr });
          return [2 /*return*/ , icr];
      }
    });
  });
}

function waitCtorTxn(shad, ApplicationID, eventCache) {
  return __awaiter(this, void 0, void 0, function() {
    var maxTries, icr, tries, waitMs;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          maxTries = 14;
          icr = null;
          tries = 1;
          _a.label = 1;
        case 1:
          if (!(tries <= maxTries)) return [3 /*break*/ , 5];
          waitMs = Math.pow(2, tries);
          debug(shad, 'waitCtorTxn waiting (ms)', waitMs);
          return [4 /*yield*/ , Timeout.set(waitMs)];
        case 2:
          _a.sent();
          debug(shad, 'waitCtorTxn trying attempt #', tries, 'of', maxTries);
          return [4 /*yield*/ , queryCtorTxn(shad + " deploy", ApplicationID, eventCache)];
        case 3:
          icr = _a.sent();
          if (icr && icr.txn)
            return [2 /*return*/ ];
          _a.label = 4;
        case 4:
          tries++;
          return [3 /*break*/ , 1];
        case 5:
          throw Error("Indexer could not find application " + ApplicationID + ".");
      }
    });
  });
}
export var verifyContract = function(info, bin) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2 /*return*/ , verifyContract_(info, bin, new EventCache())];
    });
  });
};
var verifyContract_ = function(info, bin, eventCache) {
  return __awaiter(void 0, void 0, void 0, function() {
    var compiled, ApplicationID, appApproval, appClear, _a, mapDataKeys, viewKeys, dhead, chk, chkeq, fmtp, client, appInfo, appInfo_p, Deployer, appInfo_LocalState, appInfo_GlobalState, indexer, ilq, ilr, appInfo_i, allocRound, iar, iat, iatat, icr, ict, ctorRound, ictat, aescrow_b64, aescrow_ui8, aescrow_cbr, aescrow_algo;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/ , compileFor(bin, info)];
        case 1:
          compiled = _b.sent();
          ApplicationID = compiled.ApplicationID, appApproval = compiled.appApproval, appClear = compiled.appClear;
          _a = bin._Connectors.ALGO, mapDataKeys = _a.mapDataKeys, viewKeys = _a.viewKeys;
          dhead = "verifyContract";
          chk = function(p, msg) {
            if (!p) {
              throw Error("verifyContract failed: " + msg);
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
          return [4 /*yield*/ , client.getApplicationByID(ApplicationID)["do"]()];
        case 3:
          appInfo = _b.sent();
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
          chkeq(appInfo_GlobalState['num-byte-slice'], appGlobalStateNumBytes + viewKeys, "Num of byte-slices in global state schema does not match Reach backend");
          chkeq(appInfo_GlobalState['num-uint'], appGlobalStateNumUInt, "Num of uints in global state schema does not match Reach backend");
          return [4 /*yield*/ , getIndexer()];
        case 4:
          indexer = _b.sent();
          ilq = indexer.lookupApplications(ApplicationID).includeAll();
          return [4 /*yield*/ , doQuery_(dhead + " app lookup", ilq, true)];
        case 5:
          ilr = _b.sent();
          debug(dhead, { ilr: ilr });
          appInfo_i = ilr.application;
          debug(dhead, { appInfo_i: appInfo_i });
          chkeq(appInfo_i['deleted'], false, "Application must not be deleted");
          allocRound = appInfo_i['created-at-round'];
          return [4 /*yield*/ , eventCache.query(dhead, ApplicationID, { specRound: allocRound }, function(_) { return true; })];
        case 6:
          iar = _b.sent();
          iat = iar.txn;
          chk(iat, "Cannot query for allocation transaction");
          debug({ iat: iat });
          iatat = iat['application-transaction'];
          debug({ iatat: iatat });
          chkeq(iatat['approval-program'], appInfo_p['approval-program'], "ApprovalProgram unchanged since creation");
          chkeq(iatat['clear-state-program'], appInfo_p['clear-state-program'], "ClearStateProgram unchanged since creation");
          return [4 /*yield*/ , queryCtorTxn(dhead, ApplicationID, eventCache)];
        case 7:
          icr = _b.sent();
          ict = icr.txn;
          chk(ict, "Cannot query for constructor transaction");
          debug({ ict: ict });
          ctorRound = ict['confirmed-round'];
          ictat = ict['application-transaction'];
          debug({ ictat: ictat });
          aescrow_b64 = ictat['application-args'][1];
          aescrow_ui8 = reNetify(aescrow_b64);
          aescrow_cbr = T_Address.fromNet(aescrow_ui8);
          aescrow_algo = cbr2algo_addr(aescrow_cbr);
          chkeq(aescrow_algo, compiled.escrow.hash, "Must be constructed with proper escrow account address");
          // Note: (after deployMode:firstMsg is implemented)
          // 1. (above) attach initial args to ContractInfo
          // 2. verify contract storage matches expectations based on initial args
          return [2 /*return*/ , { compiled: compiled, ApplicationID: ApplicationID, allocRound: allocRound, ctorRound: ctorRound, Deployer: Deployer }];
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
export var reachStdlib = compiledStdlib;
//# sourceMappingURL=ALGO.js.map
