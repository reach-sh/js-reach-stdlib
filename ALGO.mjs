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
import base32 from 'hi-base32';
import ethers from 'ethers';
import Timeout from 'await-timeout';
import buffer from 'buffer';
import msgpack from '@msgpack/msgpack';
// DEBUG: uncomment this for debugging in browser
// @ts-ignore
// import algosdk__src__transaction from 'algosdk/src/transaction';
var Buffer = buffer.Buffer;
import { VERSION } from './version.mjs';
import { getViewsHelper, deferContract, debug, envDefault, argsSlice, argsSplit, makeRandom, replaceableThunk, } from './shared_impl.mjs';
import { mapRef, } from './shared_backend.mjs';
import { isBigNumber, bigNumberify, bigNumberToNumber, } from './shared_user.mjs';
import waitPort from './waitPort.mjs';
import { addressToHex, addressFromHex, stdlib as compiledStdlib, typeDefs, } from './ALGO_compiled.mjs';
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
var reachAlgoBackendVersion = 1;
// Helpers
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
var getLastRound = function() {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          return [4 /*yield*/ , (_a.sent()).status()["do"]()];
        case 2:
          return [2 /*return*/ , (_a.sent())['last-round']];
      }
    });
  });
};
export var waitForConfirmation = function(txId, untilRound) {
  return __awaiter(void 0, void 0, void 0, function() {
    var algodClient, lastRound, lastRoundAfterCall, pendingInfo, confirmedRound;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          algodClient = _a.sent();
          lastRound = null;
          _a.label = 2;
        case 2:
          lastRoundAfterCall = lastRound ?
            algodClient.statusAfterBlock(lastRound) :
            algodClient.status();
          return [4 /*yield*/ , lastRoundAfterCall["do"]()];
        case 3:
          lastRound = (_a.sent())['last-round'];
          return [4 /*yield*/ , algodClient.pendingTransactionInformation(txId)["do"]()];
        case 4:
          pendingInfo = _a.sent();
          confirmedRound = pendingInfo['confirmed-round'];
          if (confirmedRound && confirmedRound > 0) {
            return [2 /*return*/ , pendingInfo];
          }
          _a.label = 5;
        case 5:
          if (!untilRound || lastRound < untilRound) return [3 /*break*/ , 2];
          _a.label = 6;
        case 6:
          throw { type: 'waitForConfirmation', txId: txId, untilRound: untilRound, lastRound: lastRound };
      }
    });
  });
};
var sendAndConfirm = function(stx_or_stxs) {
  return __awaiter(void 0, void 0, void 0, function() {
    var lastRound, txID, tx, sendme, untilRound, req, e_1;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          lastRound = stx_or_stxs.lastRound, txID = stx_or_stxs.txID, tx = stx_or_stxs.tx;
          sendme = tx;
          if (Array.isArray(stx_or_stxs)) {
            if (stx_or_stxs.length === 0) {
              // debug(`Sending nothing... why...?`);
              // @ts-ignore
              return [2 /*return*/ , null];
            }
            // debug(`Sending multiple...`);
            lastRound = stx_or_stxs[0].lastRound;
            txID = stx_or_stxs[0].txID;
            sendme = stx_or_stxs.map(function(stx) { return stx.tx; });
          }
          untilRound = lastRound;
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          req = (_a.sent()).sendRawTransaction(sendme);
          // @ts-ignore
          debug('sendAndConfirm:', base64ify(req.txnBytesToPost));
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [4 /*yield*/ , req["do"]()];
        case 3:
          _a.sent();
          return [3 /*break*/ , 5];
        case 4:
          e_1 = _a.sent();
          throw { type: 'sendRawTransaction', e: e_1 };
        case 5:
          return [4 /*yield*/ , waitForConfirmation(txID, untilRound)];
        case 6:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
// Backend
var compileTEAL = function(label, code) {
  return __awaiter(void 0, void 0, void 0, function() {
    var s, r, e_2;
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
          e_2 = _a.sent();
          s = typeof e_2 === 'object' ? e_2.statusCode : 'not object';
          r = e_2;
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
    var params;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug("fillTxn: getting params");
          _a.label = 1;
        case 1:
          if (!true) return [3 /*break*/ , 5];
          return [4 /*yield*/ , getAlgodClient()];
        case 2:
          return [4 /*yield*/ , (_a.sent()).getTransactionParams()["do"]()];
        case 3:
          params = _a.sent();
          debug('fillTxn: got params:', params);
          if (params.firstRound !== 0) {
            return [2 /*return*/ , params];
          }
          debug("...but firstRound is 0, so let's wait and try again.");
          // Assumption: firstRound will move past 0 on its own.
          return [4 /*yield*/ , Timeout.set(1000)];
        case 4:
          // Assumption: firstRound will move past 0 on its own.
          _a.sent();
          return [3 /*break*/ , 1];
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
    var txn_s, e_3;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , signTxn(networkAccount, txn)];
        case 1:
          txn_s = _a.sent();
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [4 /*yield*/ , sendAndConfirm(txn_s)];
        case 3:
          return [2 /*return*/ , _a.sent()];
        case 4:
          e_3 = _a.sent();
          console.log(e_3);
          throw Error(label + " txn failed:\n" + JSON.stringify(txn) + "\nwith:\n" + JSON.stringify(e_3));
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
var replaceUint8Array = function(label, arr, x) {
  return replaceAll(x, "\"{{" + label + "}}\"", "base32(" + base32.encode(arr).toString() + ")");
};
var replaceAddr = function(label, addr, x) {
  return replaceUint8Array(label, algosdk.decodeAddress(addr).publicKey, x);
};

function must_be_supported(bin) {
  var algob = bin._Connectors.ALGO;
  var unsupported = algob.unsupported,
    version = algob.version;
  if (version !== reachAlgoBackendVersion) {
    throw Error("This Reach compiled backend does not match the expectations of this Reach standard library: expected " + reachAlgoBackendVersion + ", but got " + version + "; update your compiler and recompile!");
  }
  if (unsupported.length > 0) {
    var reasons = unsupported.map(function(s) { return " * " + s; }).join('\n');
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
  return __awaiter(this, void 0, void 0, function() {
    var ApplicationID, Deployer, algob, appApproval, appClear, ctc, steps, stepargs, subst_appid, subst_creator, checkLen, ctc_bin, subst_ctc, appApproval_subst, stepCode_bin, appApproval_bin, appClear_bin;
    var _this = this;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          ApplicationID = info.ApplicationID, Deployer = info.Deployer;
          must_be_supported(bin);
          algob = bin._Connectors.ALGO;
          appApproval = algob.appApproval, appClear = algob.appClear, ctc = algob.ctc, steps = algob.steps, stepargs = algob.stepargs;
          subst_appid = function(x) {
            return replaceUint8Array('ApplicationID', T_UInt.toNet(bigNumberify(ApplicationID)), x);
          };
          subst_creator = function(x) {
            return replaceAddr('Deployer', Deployer, x);
          };
          checkLen = function(label, actual, expected) {
            debug("checkLen", { label: label, actual: actual, expected: expected });
            if (actual > expected) {
              throw Error("This Reach application is not supported by Algorand: " + label + " length is " + actual + ", but should be less than " + expected + ".");
            }
          };
          return [4 /*yield*/ , compileTEAL('ctc_subst', subst_creator(subst_appid(ctc)))];
        case 1:
          ctc_bin = _a.sent();
          checkLen("Escrow Contract", ctc_bin.result.length, LogicSigMaxSize);
          subst_ctc = function(x) {
            return replaceAddr('ContractAddr', ctc_bin.hash, x);
          };
          appApproval_subst = appApproval;
          return [4 /*yield*/ , Promise.all(steps.map(function(mc, mi) {
            return __awaiter(_this, void 0, void 0, function() {
              var mN, mc_subst, cr, sa;
              return __generator(this, function(_a) {
                switch (_a.label) {
                  case 0:
                    if (!mc) {
                      return [2 /*return*/ , null];
                    }
                    mN = "m" + mi;
                    mc_subst = subst_creator(subst_ctc(subst_appid(mc)));
                    return [4 /*yield*/ , compileTEAL(mN, mc_subst)];
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
                    return [2 /*return*/ , cr];
                }
              });
            });
          }))];
        case 2:
          stepCode_bin = _a.sent();
          return [4 /*yield*/ , compileTEAL('appApproval_subst', appApproval_subst)];
        case 3:
          appApproval_bin = _a.sent();
          checkLen("Approval Contract", appApproval_bin.result.length, MaxAppProgramLen);
          return [4 /*yield*/ , compileTEAL('appClear', appClear)];
        case 4:
          appClear_bin = _a.sent();
          checkLen("Clear Contract", appClear_bin.result.length, MaxAppProgramLen);
          return [2 /*return*/ , {
            appApproval: appApproval_bin,
            appClear: appClear_bin,
            ctc: ctc_bin,
            steps: stepCode_bin
          }];
      }
    });
  });
}
// const ui8z = new Uint8Array();
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
var doQuery_ = function(dhead, query) {
  return __awaiter(void 0, void 0, void 0, function() {
    var res, e_4;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          debug(dhead, '--- QUERY =', query);
          _a.label = 1;
        case 1:
          _a.trys.push([1, 3, , 4]);
          return [4 /*yield*/ , query["do"]()];
        case 2:
          res = _a.sent();
          return [3 /*break*/ , 4];
        case 3:
          e_4 = _a.sent();
          throw Error(dhead + " --- QUERY FAIL: " + JSON.stringify(e_4));
        case 4:
          debug(dhead, '--- RESULT =', res);
          return [2 /*return*/ , res];
      }
    });
  });
};
var doQuery = function(dhead, query, pred) {
  if (pred === void 0) { pred = (function(x) { void(x); return true; }); }
  return __awaiter(void 0, void 0, void 0, function() {
    var res, txns, ptxns, txn;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , doQuery_(dhead, query)];
        case 1:
          res = _a.sent();
          txns = res.transactions;
          ptxns = txns.filter(pred);
          if (ptxns.length == 0) {
            return [2 /*return*/ , { succ: false, round: res['current-round'] }];
          }
          txn = ptxns[0];
          return [2 /*return*/ , { succ: true, txn: txn }];
      }
    });
  });
};
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
// TODO: read token from scripts/algorand-devnet/algorand_data/algod.token
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
var rawFaucetDefaultMnemonic = 'husband sock drift razor piece february loop nose crew object salon come sketch frost grocery capital young strategy catalog dial seminar sword betray absent army';
var _h = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var ledger, FAUCET;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            ledger = getLedger();
            if (ledger !== localhostProviderEnv.ALGO_LEDGER) {
              throw Error("Cannot automatically use faucet for ledger '" + ledger + "'; if you want to use a custom faucet, use setFaucet");
            }
            FAUCET = algosdk.mnemonicToSecretKey(envDefault(process.env.ALGO_FAUCET_PASSPHRASE, rawFaucetDefaultMnemonic));
            return [4 /*yield*/ , connectAccount(FAUCET)];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  }),
  getFaucet = _h[0],
  setFaucet = _h[1];
export { getFaucet, setFaucet };
// XXX AlgoSigner doesn't correctly handle msgpacked notes
// When it does: update {,un}clean_for_AlgoSigner
// const note = algosdk.encodeObj('Reach');
var NOTE_Reach = new Uint8Array(Buffer.from("Reach " + VERSION));
var makeTransferTxn = function(from, to, value, token, ps, closeTo) {
  if (closeTo === void 0) { closeTo = undefined; }
  var valuen = bigNumberToNumber(value);
  var txn = token ?
    algosdk.makeAssetTransferTxnWithSuggestedParams(from, to, closeTo, undefined, valuen, NOTE_Reach, bigNumberToNumber(token), ps) :
    algosdk.makePaymentTxnWithSuggestedParams(from, to, valuen, closeTo, NOTE_Reach, ps);
  return txn;
};
export var transfer = function(from, to, value, token) {
  if (token === void 0) { token = undefined; }
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
          txn = makeTransferTxn(sender.addr, receiver, valuebn, token, ps);
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
export var connectAccount = function(networkAccount) {
  return __awaiter(void 0, void 0, void 0, function() {
    function setDebugLabel(newLabel) {
      label = newLabel;
      // @ts-ignore
      return this;
    }
    var thisAcc, shad, label, pks, selfAddress, iam, attachP, deployP, implNow, attach, deploy;
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
      attachP = function(bin, ctcInfoP) {
        return __awaiter(void 0, void 0, void 0, function() {
          var ctcInfo, getInfo, Deployer, ApplicationID, lastRound, bin_comp, escrowAddr, ctc_prog, _a, viewSize, viewKeys, mapDataKeys, hasMaps, mapDataTy, mapRecordTy, mapArgTy, emptyMapDataTy, emptyMapData, didOptIn, doOptIn, ensuredOptIn, ensureOptIn, wait, sendrecv, recv, creationTime, views_bin, getView1, getViews;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                return [4 /*yield*/ , ctcInfoP];
              case 1:
                ctcInfo = _b.sent();
                getInfo = function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      return [2 /*return*/ , ctcInfo];
                    });
                  });
                };
                Deployer = ctcInfo.Deployer, ApplicationID = ctcInfo.ApplicationID;
                lastRound = ctcInfo.creationRound;
                debug(shad, ': attach', ApplicationID, 'created at', lastRound);
                return [4 /*yield*/ , compileFor(bin, ctcInfo)];
              case 2:
                bin_comp = _b.sent();
                escrowAddr = bin_comp.ctc.hash;
                void(addressToHex);
                // XXX const escrowAddrRaw = T_Address.canonicalize(addressToHex(escrowAddr));
                return [4 /*yield*/ , verifyContract(ctcInfo, bin)];
              case 3:
                // XXX const escrowAddrRaw = T_Address.canonicalize(addressToHex(escrowAddr));
                _b.sent();
                ctc_prog = algosdk.makeLogicSig(bin_comp.ctc.result, []);
                _a = bin._Connectors.ALGO, viewSize = _a.viewSize, viewKeys = _a.viewKeys, mapDataKeys = _a.mapDataKeys;
                hasMaps = mapDataKeys > 0;
                mapDataTy = bin._getMaps({ reachStdlib: compiledStdlib }).mapDataTy;
                mapRecordTy = T_Tuple([T_Bool, mapDataTy, mapDataTy, T_Address]);
                mapArgTy = T_Array(mapRecordTy, HowManyAccounts);
                emptyMapDataTy = T_Bytes(mapDataTy.netSize);
                emptyMapData =
                  // This is a bunch of Nones
                  mapDataTy.fromNet(emptyMapDataTy.toNet(emptyMapDataTy.canonicalize('')));
                debug({ emptyMapData: emptyMapData });
                didOptIn = function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    var client, ai;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          return [4 /*yield*/ , getAlgodClient()];
                        case 1:
                          client = _a.sent();
                          return [4 /*yield*/ , client.accountInformation(thisAcc.addr)["do"]()];
                        case 2:
                          ai = _a.sent();
                          debug("didOptIn", ai);
                          if (ai['apps-local-state'].find(function(x) { return (x.id === ApplicationID); })) {
                            return [2 /*return*/ , true];
                          } else {
                            return [2 /*return*/ , false];
                          }
                          return [2 /*return*/ ];
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
                wait = function(delta) {
                  return __awaiter(void 0, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          return [4 /*yield*/ , waitUntilTime(bigNumberify(lastRound).add(delta))];
                        case 1:
                          return [2 /*return*/ , _a.sent()];
                      }
                    });
                  });
                };
                sendrecv = function(funcNum, evt_cnt, hasLastTime, tys, args, pay, out_tys, onlyIf, soloSend, timeout_delay, sim_p) {
                  return __awaiter(void 0, void 0, void 0, function() {
                    var ltidx, doRecv, value, toks, funcName, dhead, handler, _a, svs, msg, _b, svs_tys, msg_tys, fake_res, sim_r, isHalt, sim_txns, _c, view_ty, view_v, view_tysz, padding, padding_ty, padding_v, _d, view_typ, view_vp, cbr2algo_addr, mapRefs, mapsPrev, mapsNext, mapAccts, mapArg, emptyRec, getMapData, mkMapRecord, missingAccts, zero_caddr, i, mapAcctsReal, _loop_1, state_1;
                    return __generator(this, function(_e) {
                      switch (_e.label) {
                        case 0:
                          if (hasLastTime !== false) {
                            ltidx = hasLastTime.toNumber();
                            tys.splice(ltidx, 1);
                            args.splice(ltidx, 1);
                          }
                          doRecv = function(waitIfNotPresent) {
                            return __awaiter(void 0, void 0, void 0, function() {
                              return __generator(this, function(_a) {
                                switch (_a.label) {
                                  case 0:
                                    return [4 /*yield*/ , recv(funcNum, evt_cnt, out_tys, waitIfNotPresent, timeout_delay)];
                                  case 1:
                                    return [2 /*return*/ , _a.sent()];
                                }
                              });
                            });
                          };
                          if (!!onlyIf) return [3 /*break*/ , 2];
                          return [4 /*yield*/ , doRecv(true)];
                        case 1:
                          return [2 /*return*/ , _e.sent()];
                        case 2:
                          value = pay[0], toks = pay[1];
                          void(toks); // <-- rely on simulation because of ordering
                          funcName = "m" + funcNum;
                          dhead = shad + ": " + label + " sendrecv " + funcName + " " + timeout_delay;
                          debug(dhead, '--- START');
                          handler = bin_comp.steps[funcNum];
                          if (!handler) {
                            throw Error(dhead + " Internal error: reference to undefined handler: " + funcName);
                          }
                          _a = argsSplit(args, evt_cnt), svs = _a[0], msg = _a[1];
                          _b = argsSplit(tys, evt_cnt), svs_tys = _b[0], msg_tys = _b[1];
                          fake_res = {
                            didTimeout: false,
                            data: msg,
                            time: bigNumberify(0),
                            value: value,
                            from: pks,
                            getOutput: (function(o_lab, o_ctc) {
                              return __awaiter(void 0, void 0, void 0, function() {
                                return __generator(this, function(_a) {
                                  void(o_lab);
                                  void(o_ctc);
                                  throw Error("Algorand does not support remote calls, and Reach should not have generated a call to this function");
                                });
                              });
                            })
                          };
                          return [4 /*yield*/ , sim_p(fake_res)];
                        case 3:
                          sim_r = _e.sent();
                          debug(dhead, '--- SIMULATE', sim_r);
                          isHalt = sim_r.isHalt;
                          sim_txns = sim_r.txns;
                          _c = sim_r.view, view_ty = _c[0], view_v = _c[1];
                          debug(dhead, 'VIEW', { view_ty: view_ty, view_v: view_v });
                          view_tysz = view_ty.netSize;
                          padding = Math.max(viewSize - view_tysz, 0);
                          padding_ty = T_Bytes(padding);
                          padding_v = padding_ty.canonicalize('');
                          _d = viewSize > 0 ? [T_Tuple([view_ty, padding_ty]), [view_v, padding_v]] : [padding_ty, padding_v], view_typ = _d[0], view_vp = _d[1];
                          debug(dhead, 'VIEWP', { view_typ: view_typ, view_vp: view_vp });
                          cbr2algo_addr = function(x) {
                            return algosdk.encodeAddress(Buffer.from(x.slice(2), 'hex'));
                          };
                          mapRefs = sim_r.mapRefs, mapsPrev = sim_r.mapsPrev, mapsNext = sim_r.mapsNext;
                          mapAccts = [];
                          mapArg = [];
                          emptyRec = function(caddr) {
                            return [false, emptyMapData, emptyMapData, caddr];
                          };
                          getMapData = function(maps, addr) {
                            return maps.map(function(m) { return mapRef(m, addr); });
                          };
                          mkMapRecord = function(isSender) {
                            return function(addr) {
                              var caddr = T_Address.canonicalize(addr);
                              var addrIdx = mapArg.findIndex(function(mr) { return addressEq(mr[3], caddr); });
                              var present = addrIdx !== -1;
                              if (present) {
                                return;
                              }
                              var refIdx = mapRefs.findIndex(function(other) { return addressEq(other, caddr); });
                              var used = refIdx !== -1;
                              var record = function(rec) {
                                mapArg.push(rec);
                                if (!isSender) {
                                  mapAccts.push(addr);
                                }
                              };
                              if (used) {
                                record([true, getMapData(mapsPrev, caddr), getMapData(mapsNext, caddr), caddr]);
                              } else if (isSender) {
                                record(emptyRec(caddr));
                              }
                            };
                          };
                          mkMapRecord(true)(thisAcc.addr);
                          mapRefs.map(cbr2algo_addr).forEach(mkMapRecord(false));
                          missingAccts = (HowManyAccounts - mapArg.length);
                          zero_caddr = T_Address.canonicalize('0x00');
                          for (i = 0; i < missingAccts; i++) {
                            mapArg.push(emptyRec(zero_caddr));
                          }
                          debug(dhead, 'MAP', { mapArg: mapArg, mapArgTy: mapArgTy, mapAccts: mapAccts });
                          debug(dhead, 'MAPARG', mapArg);
                          if (!hasMaps) return [3 /*break*/ , 5];
                          return [4 /*yield*/ , ensureOptIn()];
                        case 4:
                          _e.sent();
                          _e.label = 5;
                        case 5:
                          mapAcctsReal = (mapAccts.length === 0) ? undefined : mapAccts;
                          _loop_1 = function() {
                            var params, tdn, txnToContract_value_idx, totalFromFee, txnExtraTxns, actual_args, actual_tys, safe_args, ui8h, handler_sig, whichAppl, txnAppl, txnFromHandler, txnToHandler, txns, signLSTO, sign_me, txnAppl_s, txnFromHandler_s, txnToHandler_s, txnExtraTxns_s, txns_s, res, e_5, _f, _g;
                            return __generator(this, function(_h) {
                              switch (_h.label) {
                                case 0:
                                  return [4 /*yield*/ , getTxnParams()];
                                case 1:
                                  params = _h.sent();
                                  if (timeout_delay) {
                                    tdn = Math.min(MaxTxnLife, timeout_delay.toNumber());
                                    params.lastRound = lastRound + tdn;
                                    debug(dhead, '--- TIMECHECK', { params: params, timeout_delay: timeout_delay, tdn: tdn });
                                    if (params.firstRound > params.lastRound) {
                                      debug(dhead, '--- FAIL/TIMEOUT');
                                      return [2 /*return*/ , { value: { didTimeout: true } }];
                                    }
                                  }
                                  debug(dhead, '--- ASSEMBLE w/', params);
                                  txnToContract_value_idx = -1;
                                  totalFromFee = 0;
                                  txnExtraTxns = sim_txns.map(function(t, i) {
                                    var tok = t.tok;
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
                                      from = escrowAddr;
                                      to = escrowAddr;
                                      totalFromFee += raw_minimumBalance;
                                      amt = t.amt;
                                    } else if (t.kind === 'halt') {
                                      from = escrowAddr;
                                      to = Deployer;
                                      closeTo = Deployer;
                                    } else if (t.kind === 'to') {
                                      from = thisAcc.addr;
                                      to = escrowAddr;
                                      amt = t.amt;
                                    } else {
                                      assert(false, 'sim txn kind');
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
                                  debug(dhead, '--- totalFromFee =', totalFromFee);
                                  assert(txnToContract_value_idx !== -1, 'sim txn no value');
                                  txnExtraTxns[txnToContract_value_idx] =
                                    makeTransferTxn(thisAcc.addr, escrowAddr, value.add(totalFromFee), undefined, params);
                                  actual_args = [sim_r.prevSt_noPrevTime, sim_r.nextSt_noTime, view_vp, isHalt, bigNumberify(totalFromFee), lastRound, svs, msg, mapArg];
                                  actual_tys = [T_Digest, T_Digest, view_typ, T_Bool, T_UInt, T_UInt, T_Tuple(svs_tys), T_Tuple(msg_tys), mapArgTy];
                                  debug(dhead, '--- ARGS =', actual_args);
                                  safe_args = actual_args.map(
                                    // @ts-ignore
                                    function(m, i) { return actual_tys[i].toNet(m); });
                                  safe_args.forEach(function(x) {
                                    if (!(x instanceof Uint8Array)) {
                                      // The types say this is impossible now,
                                      // but we'll leave it in for a while just in case...
                                      throw Error("expect safe program argument, got " + JSON.stringify(x));
                                    }
                                  });
                                  ui8h = function(x) { return Buffer.from(x).toString('hex'); };
                                  debug(dhead, '--- PREPARE:', safe_args.map(ui8h));
                                  handler_sig = algosdk.makeLogicSig(handler.result, []);
                                  debug(dhead, '--- PREPARED');
                                  whichAppl = isHalt ?
                                    // We are treating it like any party can delete the application, but the docs say it may only be possible for the creator. The code appears to not care: https://github.com/algorand/go-algorand/blob/0e9cc6b0c2ddc43c3cfa751d61c1321d8707c0da/ledger/apply/application.go#L589
                                    algosdk.makeApplicationDeleteTxn :
                                    algosdk.makeApplicationNoOpTxn;
                                  txnAppl = whichAppl(thisAcc.addr, params, ApplicationID, safe_args, mapAcctsReal, undefined, undefined, NOTE_Reach);
                                  txnFromHandler = algosdk.makePaymentTxnWithSuggestedParams(handler.hash, thisAcc.addr, 0, thisAcc.addr, NOTE_Reach, params);
                                  debug(dhead, '--- txnFromHandler =', txnFromHandler);
                                  txnToHandler = algosdk.makePaymentTxnWithSuggestedParams(thisAcc.addr, handler.hash, txnFromHandler.fee + raw_minimumBalance, undefined, NOTE_Reach, params);
                                  debug(dhead, '--- txnToHandler =', txnToHandler);
                                  txns = __spreadArray([
                                    txnAppl,
                                    txnToHandler,
                                    txnFromHandler
                                  ], txnExtraTxns);
                                  algosdk.assignGroupID(txns);
                                  regroup(thisAcc, txns);
                                  signLSTO = function(txn, ls) {
                                    var tx_obj = algosdk.signLogicSigTransactionObject(txn, ls);
                                    return {
                                      tx: tx_obj.blob,
                                      txID: tx_obj.txID,
                                      lastRound: txn.lastRound
                                    };
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
                                  return [4 /*yield*/ , sign_me(txnAppl)];
                                case 2:
                                  txnAppl_s = _h.sent();
                                  txnFromHandler_s = signLSTO(txnFromHandler, handler_sig);
                                  return [4 /*yield*/ , sign_me(txnToHandler)];
                                case 3:
                                  txnToHandler_s = _h.sent();
                                  return [4 /*yield*/ , Promise.all(txnExtraTxns.map(function(t, i) {
                                    return __awaiter(void 0, void 0, void 0, function() {
                                      var st, t_s, _a;
                                      return __generator(this, function(_b) {
                                        switch (_b.label) {
                                          case 0:
                                            st = sim_txns[i];
                                            debug('txnExtraTxns_s', { t: t, i: i, st: st });
                                            if (!(st.kind === 'to')) return [3 /*break*/ , 2];
                                            return [4 /*yield*/ , sign_me(t)];
                                          case 1:
                                            _a = _b.sent();
                                            return [3 /*break*/ , 3];
                                          case 2:
                                            _a = signLSTO(t, ctc_prog);
                                            _b.label = 3;
                                          case 3:
                                            t_s = _a;
                                            return [2 /*return*/ , t_s];
                                        }
                                      });
                                    });
                                  }))];
                                case 4:
                                  txnExtraTxns_s = _h.sent();
                                  txns_s = __spreadArray([
                                    txnAppl_s,
                                    txnToHandler_s,
                                    txnFromHandler_s
                                  ], txnExtraTxns_s);
                                  debug(dhead, '--- SEND:', txns_s.length);
                                  res = void 0;
                                  _h.label = 5;
                                case 5:
                                  _h.trys.push([5, 7, , 10]);
                                  return [4 /*yield*/ , sendAndConfirm(txns_s)];
                                case 6:
                                  res = _h.sent();
                                  // XXX we should inspect res and if we failed because we didn't get picked out of the queue, then we shouldn't error, but should retry and let the timeout logic happen.
                                  debug(dhead, '--- SUCCESS:', res);
                                  return [3 /*break*/ , 10];
                                case 7:
                                  e_5 = _h.sent();
                                  if (e_5.type == 'sendRawTransaction') {
                                    debug(dhead, '--- FAIL:', format_failed_request(e_5.e));
                                  } else {
                                    debug(dhead, '--- FAIL:', e_5);
                                  }
                                  if (!!soloSend) return [3 /*break*/ , 9];
                                  _f = {};
                                  return [4 /*yield*/ , doRecv(false)];
                                case 8:
                                  return [2 /*return*/ , (_f.value = _h.sent(), _f)];
                                case 9:
                                  if (timeout_delay) {
                                    return [2 /*return*/ , "continue"];
                                  } else {
                                    // Otherwise, something bad is happening
                                    throw Error(dhead + " --- ABORT");
                                  }
                                  return [3 /*break*/ , 10];
                                case 10:
                                  _g = {};
                                  return [4 /*yield*/ , doRecv(false)];
                                case 11:
                                  return [2 /*return*/ , (_g.value = _h.sent(), _g)];
                              }
                            });
                          };
                          _e.label = 6;
                        case 6:
                          if (!true) return [3 /*break*/ , 8];
                          return [5 /*yield**/ , _loop_1()];
                        case 7:
                          state_1 = _e.sent();
                          if (typeof state_1 === "object")
                            return [2 /*return*/ , state_1.value];
                          return [3 /*break*/ , 6];
                        case 8:
                          return [2 /*return*/ ];
                      }
                    });
                  });
                };
                recv = function(funcNum, evt_cnt, tys, waitIfNotPresent, timeout_delay) {
                  return __awaiter(void 0, void 0, void 0, function() {
                    var indexer, funcName, dhead, handler, timeoutRound, _loop_2, state_2;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          // Ignoring this, because no ALGO dev node
                          void(waitIfNotPresent);
                          return [4 /*yield*/ , getIndexer()];
                        case 1:
                          indexer = _a.sent();
                          funcName = "m" + funcNum;
                          dhead = shad + ": " + label + " recv " + funcName + " " + timeout_delay;
                          debug(dhead, '--- START');
                          handler = bin_comp.steps[funcNum];
                          if (!handler) {
                            throw Error(dhead + " Internal error: reference to undefined handler: " + funcName);
                          }
                          timeoutRound = timeout_delay ?
                            lastRound + timeout_delay.toNumber() :
                            undefined;
                          _loop_2 = function() {
                            var hquery, hres, currentRound, htxn, theRound, query, res, txn, ctc_args_all, argMsg, ctc_args_s, reNetify, msgTy, ctc_args, args_un, argFeeAmount, totalFromFee, fromAddr, from, oldLastRound, getOutput;
                            return __generator(this, function(_b) {
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
                                  return [4 /*yield*/ , doQuery(dhead, hquery)];
                                case 1:
                                  hres = _b.sent();
                                  if (!!hres.succ) return [3 /*break*/ , 3];
                                  currentRound = hres.round;
                                  if (timeoutRound && timeoutRound < currentRound) {
                                    debug(dhead, '--- RECVD timeout', { timeoutRound: timeoutRound, currentRound: currentRound });
                                    return [2 /*return*/ , { value: { didTimeout: true } }];
                                  }
                                  // XXX perhaps wait until a new round has happened using wait
                                  return [4 /*yield*/ , Timeout.set(2000)];
                                case 2:
                                  // XXX perhaps wait until a new round has happened using wait
                                  _b.sent();
                                  return [2 /*return*/ , "continue"];
                                case 3:
                                  htxn = hres.txn;
                                  debug(dhead, '--- htxn =', htxn);
                                  theRound = htxn['confirmed-round'];
                                  query = indexer.searchForTransactions()
                                    .applicationID(ApplicationID)
                                    .txType('appl')
                                    .round(theRound);
                                  // XXX move predicate into indexer query
                                  return [4 /*yield*/ , doQuery(dhead, query, (function(x) { return x.group === htxn.group; }))];
                                case 4:
                                  res =
                                    // XXX move predicate into indexer query
                                    _b.sent();
                                  if (!res.succ) {
                                    return [2 /*return*/ , "continue"];
                                  }
                                  txn = res.txn;
                                  debug(dhead, '--- txn =', txn);
                                  ctc_args_all = txn['application-transaction']['application-args'];
                                  debug(dhead, { ctc_args_all: ctc_args_all });
                                  argMsg = 7;
                                  ctc_args_s = ctc_args_all[argMsg];
                                  reNetify = function(x) {
                                    var s = Buffer.from(x, 'base64').toString('hex');
                                    debug(dhead, '--- reNetify(', x, ') = ', s);
                                    return ethers.utils.arrayify('0x' + s);
                                  };
                                  debug(dhead, '--- tys =', tys);
                                  msgTy = T_Tuple(tys);
                                  ctc_args = msgTy.fromNet(reNetify(ctc_args_s));
                                  debug(dhead, { ctc_args: ctc_args });
                                  args_un = argsSlice(ctc_args, evt_cnt);
                                  debug(dhead, '--- args_un =', args_un);
                                  argFeeAmount = 3;
                                  totalFromFee = T_UInt.fromNet(reNetify(ctc_args_all[argFeeAmount]));
                                  debug(dhead, '--- totalFromFee =', totalFromFee);
                                  fromAddr = htxn['payment-transaction'].receiver;
                                  from = T_Address.canonicalize({ addr: fromAddr });
                                  debug(dhead, '--- from =', from, '=', fromAddr);
                                  oldLastRound = lastRound;
                                  lastRound = theRound;
                                  debug(dhead, '--- RECVD updating round from', oldLastRound, 'to', lastRound);
                                  getOutput = function(o_lab, o_ctc) {
                                    void(o_lab);
                                    void(o_ctc);
                                    throw Error("Algorand does not support remote calls");
                                  };
                                  return [2 /*return*/ , {
                                    value: {
                                      didTimeout: false,
                                      data: args_un,
                                      time: bigNumberify(lastRound),
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
                    var _a;
                    return __generator(this, function(_b) {
                      switch (_b.label) {
                        case 0:
                          _a = bigNumberify;
                          return [4 /*yield*/ , getInfo()];
                        case 1:
                          return [2 /*return*/ , _a.apply(void 0, [(_b.sent()).creationRound])];
                      }
                    });
                  });
                };
                views_bin = bin._getViews({ reachStdlib: compiledStdlib });
                getView1 = function(vs, v, k, vim) {
                  return function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    return __awaiter(void 0, void 0, void 0, function() {
                      var decode, client, appInfo, e_6, appSt, vvn, offset, _loop_3, i, state_3, vin, vi, vtys, vty, vvs, vres;
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
                            e_6 = _a.sent();
                            debug('getApplicationById', e_6);
                            return [2 /*return*/ , ['None', null]];
                          case 5:
                            appSt = appInfo['params']['global-state'];
                            vvn = new Uint8Array(viewSize);
                            offset = 0;
                            _loop_3 = function(i) {
                              debug({ i: i });
                              var ik = base64ify("v" + i);
                              debug({ ik: ik });
                              var viewSt = (appSt.find(function(x) { return x.key === ik; })).value;
                              debug({ viewSt: viewSt });
                              var vvni = base64ToUI8A(viewSt.bytes);
                              debug({ vvni: vvni });
                              if (vvni.length == 0) {
                                return { value: ['None', null] };
                              }
                              vvn.set(vvni, offset);
                              offset += vvni.length;
                            };
                            for (i = 0; i < viewKeys; i++) {
                              state_3 = _loop_3(i);
                              if (typeof state_3 === "object")
                                return [2 /*return*/ , state_3.value];
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
                            try {
                              vres = decode(vi, vvs.slice(1), args);
                              debug({ vres: vres });
                              return [2 /*return*/ , ['Some', vres]];
                            } catch (e) {
                              debug("getView1", v, k, 'error', e);
                              return [2 /*return*/ , ['None', null]];
                            }
                            return [2 /*return*/ ];
                        }
                      });
                    });
                  };
                };
                getViews = getViewsHelper(views_bin, getView1);
                return [2 /*return*/ , { getInfo: getInfo, creationTime: creationTime, sendrecv: sendrecv, recv: recv, wait: wait, iam: iam, selfAddress: selfAddress, getViews: getViews, stdlib: compiledStdlib }];
            }
          });
        });
      };
      deployP = function(bin) {
        return __awaiter(void 0, void 0, void 0, function() {
          var algob, appApproval0, appClear, viewKeys, mapDataKeys, Deployer, appApproval0_subst, appApproval0_bin, appClear_bin, createRes, _a, _b, _c, _d, _e, ApplicationID, bin_comp, escrowAddr, params, txnUpdate, txnToContract, txns, txnUpdate_s, txnToContract_s, txns_s, updateRes, e_7, creationRound, getInfo;
          return __generator(this, function(_f) {
            switch (_f.label) {
              case 0:
                must_be_supported(bin);
                debug(shad, 'deploy');
                algob = bin._Connectors.ALGO;
                appApproval0 = algob.appApproval0, appClear = algob.appClear, viewKeys = algob.viewKeys, mapDataKeys = algob.mapDataKeys;
                Deployer = thisAcc.addr;
                appApproval0_subst = replaceAddr('Deployer', Deployer, appApproval0);
                return [4 /*yield*/ , compileTEAL('appApproval0', appApproval0_subst)];
              case 1:
                appApproval0_bin = _f.sent();
                return [4 /*yield*/ , compileTEAL('appClear', appClear)];
              case 2:
                appClear_bin = _f.sent();
                _a = sign_and_send_sync;
                _b = ['ApplicationCreate',
                  thisAcc
                ];
                _d = (_c = algosdk).makeApplicationCreateTxn;
                _e = [thisAcc.addr];
                return [4 /*yield*/ , getTxnParams()];
              case 3:
                return [4 /*yield*/ , _a.apply(void 0, _b.concat([_d.apply(_c, _e.concat([_f.sent(),
                  algosdk.OnApplicationComplete.NoOpOC,
                  appApproval0_bin.result,
                  appClear_bin.result,
                  0, mapDataKeys, 2, 1 + viewKeys,
                  undefined, undefined, undefined, undefined,
                  NOTE_Reach
                ]))]))];
              case 4:
                createRes = _f.sent();
                ApplicationID = createRes['application-index'];
                if (!ApplicationID) {
                  throw Error("No application-index in " + JSON.stringify(createRes));
                }
                return [4 /*yield*/ , compileFor(bin, { ApplicationID: ApplicationID, Deployer: Deployer, creationRound: 0 })];
              case 5:
                bin_comp = _f.sent();
                escrowAddr = bin_comp.ctc.hash;
                return [4 /*yield*/ , getTxnParams()];
              case 6:
                params = _f.sent();
                txnUpdate = algosdk.makeApplicationUpdateTxn(thisAcc.addr, params, ApplicationID, bin_comp.appApproval.result, appClear_bin.result, undefined, undefined, undefined, undefined, NOTE_Reach);
                txnToContract = algosdk.makePaymentTxnWithSuggestedParams(thisAcc.addr, escrowAddr, raw_minimumBalance, undefined, NOTE_Reach, params);
                txns = [
                  txnUpdate,
                  txnToContract,
                ];
                algosdk.assignGroupID(txns);
                regroup(thisAcc, txns);
                return [4 /*yield*/ , signTxn(thisAcc, txnUpdate)];
              case 7:
                txnUpdate_s = _f.sent();
                return [4 /*yield*/ , signTxn(thisAcc, txnToContract)];
              case 8:
                txnToContract_s = _f.sent();
                txns_s = [
                  txnUpdate_s,
                  txnToContract_s,
                ];
                _f.label = 9;
              case 9:
                _f.trys.push([9, 11, , 12]);
                return [4 /*yield*/ , sendAndConfirm(txns_s)];
              case 10:
                updateRes = _f.sent();
                return [3 /*break*/ , 12];
              case 11:
                e_7 = _f.sent();
                throw Error("deploy: " + JSON.stringify(e_7));
              case 12:
                creationRound = updateRes['confirmed-round'];
                getInfo = function() {
                  return __awaiter(void 0, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      return [2 /*return*/ , ({ ApplicationID: ApplicationID, creationRound: creationRound, Deployer: Deployer })];
                    });
                  });
                };
                debug(shad, 'application created');
                return [4 /*yield*/ , attachP(bin, getInfo())];
              case 13:
                return [2 /*return*/ , _f.sent()];
            }
          });
        });
      };
      implNow = { stdlib: compiledStdlib };
      attach = function(bin, ctcInfoP) {
        return deferContract(false, attachP(bin, ctcInfoP), implNow);
      };
      deploy = function(bin) {
        return deferContract(false, deployP(bin), implNow);
      };
      return [2 /*return*/ , { deploy: deploy, attach: attach, networkAccount: networkAccount, getAddress: selfAddress, stdlib: compiledStdlib, setDebugLabel: setDebugLabel }];
    });
  });
};
export var balanceOf = function(acc) {
  return __awaiter(void 0, void 0, void 0, function() {
    var networkAccount, client, amount;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          networkAccount = acc.networkAccount;
          if (!networkAccount)
            throw Error("acc.networkAccount missing. Got: " + acc);
          return [4 /*yield*/ , getAlgodClient()];
        case 1:
          client = _a.sent();
          return [4 /*yield*/ , client.accountInformation(networkAccount.addr)["do"]()];
        case 2:
          amount = (_a.sent()).amount;
          return [2 /*return*/ , bigNumberify(amount)];
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
export var fundFromFaucet = function(account, value) {
  return __awaiter(void 0, void 0, void 0, function() {
    var faucet;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getFaucet()];
        case 1:
          faucet = _a.sent();
          return [4 /*yield*/ , transfer(faucet, account, value)];
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
  var numericAmt = isBigNumber(amt) ? amt.toNumber() :
    typeof amt === 'string' ? parseFloat(amt) :
    amt;
  return bigNumberify(algosdk.algosToMicroalgos(numericAmt));
}
// XXX get from SDK
var raw_minimumBalance = 100000;
export var minimumBalance = bigNumberify(raw_minimumBalance);
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000')); // => '100'
 */
export function formatCurrency(amt, decimals) {
  if (decimals === void 0) { decimals = 6; }
  // Recall that 1 algo = 10^6 microalgos
  if (!(Number.isInteger(decimals) && 0 <= decimals)) {
    throw Error("Expected decimals to be a nonnegative integer, but got " + decimals + ".");
  }
  // Use decimals+1 and then slice it off to truncate instead of round
  var algosStr = algosdk
    .microalgosToAlgos(bigNumberify(amt).toNumber())
    .toFixed(decimals + 1);
  // Have to roundtrip thru Number to drop trailing zeroes
  return Number(algosStr.slice(0, algosStr.length - 1)).toString();
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
    var _a;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _a = bigNumberify;
          return [4 /*yield*/ , getLastRound()];
        case 1:
          return [2 /*return*/ , _a.apply(void 0, [_b.sent()])];
      }
    });
  });
};
export var waitUntilTime = function(targetTime, onProgress) {
  return __awaiter(void 0, void 0, void 0, function() {
    var onProg, currentTime, status;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          onProg = onProgress || (function() {});
          return [4 /*yield*/ , getNetworkTime()];
        case 1:
          currentTime = _a.sent();
          _a.label = 2;
        case 2:
          if (!currentTime.lt(targetTime)) return [3 /*break*/ , 5];
          debug('waitUntilTime: iteration:', currentTime, '->', targetTime);
          return [4 /*yield*/ , getAlgodClient()];
        case 3:
          return [4 /*yield*/ , (_a.sent()).statusAfterBlock(currentTime.toNumber())["do"]()];
        case 4:
          status = _a.sent();
          currentTime = bigNumberify(status['last-round']);
          onProg({ currentTime: currentTime, targetTime: targetTime });
          return [3 /*break*/ , 2];
        case 5:
          debug('waitUntilTime: ended:', currentTime, '->', targetTime);
          return [2 /*return*/ , currentTime];
      }
    });
  });
};
export var wait = function(delta, onProgress) {
  return __awaiter(void 0, void 0, void 0, function() {
    var now;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , getNetworkTime()];
        case 1:
          now = _a.sent();
          debug('wait: delta=', delta, 'now=', now, 'until=', now.add(delta));
          return [4 /*yield*/ , waitUntilTime(now.add(delta), onProgress)];
        case 2:
          return [2 /*return*/ , _a.sent()];
      }
    });
  });
};
export var verifyContract = function(info, bin) {
  return __awaiter(void 0, void 0, void 0, function() {
    var ApplicationID, Deployer, creationRound, compiled, appApproval, appClear, dhead, chk, chkeq, client, appInfo, appInfo_p, indexer, cquery, ctxn, cres, fmtp, catxn;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          ApplicationID = info.ApplicationID, Deployer = info.Deployer, creationRound = info.creationRound;
          return [4 /*yield*/ , compileFor(bin, info)];
        case 1:
          compiled = _a.sent();
          appApproval = compiled.appApproval, appClear = compiled.appClear;
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
          return [4 /*yield*/ , getAlgodClient()];
        case 2:
          client = _a.sent();
          return [4 /*yield*/ , client.getApplicationByID(ApplicationID)["do"]()];
        case 3:
          appInfo = _a.sent();
          appInfo_p = appInfo['params'];
          debug(dhead, '-- appInfo_p =', appInfo_p);
          return [4 /*yield*/ , getIndexer()];
        case 4:
          indexer = _a.sent();
          cquery = indexer.searchForTransactions()
            .applicationID(ApplicationID)
            .txType('appl')
            .round(creationRound);
          ctxn = null;
          _a.label = 5;
        case 5:
          if (!!ctxn) return [3 /*break*/ , 12];
          return [4 /*yield*/ , doQuery(dhead, cquery)];
        case 6:
          cres = _a.sent();
          if (!!cres.succ) return [3 /*break*/ , 10];
          if (!(cres.round < creationRound)) return [3 /*break*/ , 8];
          debug(dhead, '-- waiting for creationRound');
          return [4 /*yield*/ , Timeout.set(1000)];
        case 7:
          _a.sent();
          return [3 /*break*/ , 5];
        case 8:
          chk(false, "Not created in stated round");
          return [3 /*break*/ , 12];
        case 9:
          return [3 /*break*/ , 11];
        case 10:
          ctxn = cres.txn;
          return [3 /*break*/ , 12];
        case 11:
          return [3 /*break*/ , 5];
        case 12:
          debug(dhead, '-- ctxn =', ctxn);
          fmtp = function(x) { return uint8ArrayToStr(x.result, 'base64'); };
          chk(ctxn, "Cannot query for creationRound accuracy");
          chk(appInfo_p, "Cannot lookup ApplicationId");
          chkeq(appInfo_p['approval-program'], fmtp(appApproval), "Approval program does not match Reach backend");
          chkeq(appInfo_p['clear-state-program'], fmtp(appClear), "ClearState program does not match Reach backend");
          chkeq(appInfo_p['creator'], Deployer, "Deployer does not match contract information");
          catxn = ctxn['application-transaction'];
          chkeq(catxn['approval-program'], appInfo_p['approval-program'], "creationRound Approval program");
          chkeq(catxn['clear-state-program'], appInfo_p['clear-state-program'], "creationRound ClearState program");
          chkeq(catxn['on-completion'], 'update', "creationRound on-completion");
          chkeq(ctxn['sender'], Deployer, "creationRound Deployer");
          // Note: (after deployMode:firstMsg is implemented)
          // 1. (above) attach initial args to ContractInfo
          // 2. verify contract storage matches expectations based on initial args
          return [2 /*return*/ , true];
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
