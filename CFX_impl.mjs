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
import * as cfxers from './cfxers.mjs';
import * as ethLikeCompiled from './CFX_compiled.mjs';
import { debug, envDefault, memoizeThunk, replaceableThunk, } from './shared_impl.mjs';
import { process } from './shim.mjs';
import waitPort from './waitPort.mjs';
import cfxsdk from 'js-conflux-sdk';
import Timeout from 'await-timeout';
var Conflux = cfxsdk.Conflux;

function notYetSupported(label) {
  throw Error(label + " not yet supported on experimental connector CFX");
}
// XXX incorporate these into setProviderByEnv
var DEFAULT_CFX_NODE_URI = 'http://localhost:12537';
var DEFAULT_CFX_NETWORK_ID = '999';
var CFX_NODE_URI = envDefault(process.env.CFX_NODE_URI, DEFAULT_CFX_NODE_URI);
var CFX_NETWORK_ID = envDefault(process.env.CFX_NETWORK_ID, DEFAULT_CFX_NETWORK_ID);
var networkId = parseInt(CFX_NETWORK_ID);
export function isIsolatedNetwork() {
  return true; // XXX
}
export function isWindowProvider() {
  return false; // XXX
}
export function _getDefaultNetworkAccount() {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2 /*return*/ , notYetSupported("_getDefaultNetworkAccount")];
    });
  });
}
// from /scripts/devnet-cfx/default.toml
var mining_key = "0xaa911f5b5b567af4db867a9d9072f4415fe722b114306baae28b721b6fbb2d99";
var defaultFaucetWallet = new cfxers.Wallet(mining_key);
export var _getDefaultFaucetNetworkAccount = memoizeThunk(function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var _a, _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          if (!!defaultFaucetWallet.provider) return [3 /*break*/ , 2];
          _b = (_a = defaultFaucetWallet).connect;
          return [4 /*yield*/ , getProvider()];
        case 1:
          _b.apply(_a, [_c.sent()]);
          _c.label = 2;
        case 2:
          return [2 /*return*/ , defaultFaucetWallet];
      }
    });
  });
});

function waitCaughtUp(provider) {
  return __awaiter(this, void 0, void 0, function() {
    var maxTries, waitMs, err, tries, w, txn, t, e_1;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [4 /*yield*/ , waitPort(CFX_NODE_URI)];
        case 1:
          _a.sent();
          if (!isIsolatedNetwork()) return [3 /*break*/ , 10];
          // XXX this doesn't work with setFaucet; requires the default faucet to be used
          // But we can't call getFaucet() or _getDefaultFaucetNetworkAccount() here because
          // those (if left to defaults) call getProvider which calls this fn (waitCaughtUp).
          // TODO: disentangle
          if (!defaultFaucetWallet.provider)
            defaultFaucetWallet.connect(provider);
          maxTries = 20;
          waitMs = 1000;
          err = null;
          tries = 0;
          _a.label = 2;
        case 2:
          if (!(tries < maxTries)) return [3 /*break*/ , 9];
          if (!err) return [3 /*break*/ , 4];
          debug("waitCaughtUp: waiting some more", { waitMs: waitMs, tries: tries, maxTries: maxTries, err: err });
          return [4 /*yield*/ , Timeout.set(waitMs)];
        case 3:
          _a.sent(); // wait 1s between tries
          _a.label = 4;
        case 4:
          _a.trys.push([4, 7, , 8]);
          w = cfxers.Wallet.createRandom().connect(provider);
          txn = { to: w.getAddress(), value: '1' };
          debug("sending dummy txn", txn);
          return [4 /*yield*/ , defaultFaucetWallet.sendTransaction(txn)];
        case 5:
          t = _a.sent();
          return [4 /*yield*/ , t.wait()];
        case 6:
          _a.sent();
          return [2 /*return*/ ];
        case 7:
          e_1 = _a.sent();
          // TODO: only loop again if we detect that it's the "not caught up yet" error
          //   err: RPCError: Request rejected due to still in the catch up mode.
          //   { code: -32077 }
          err = e_1;
          return [3 /*break*/ , 8];
        case 8:
          tries++;
          return [3 /*break*/ , 2];
        case 9:
          if (err)
            throw err;
          _a.label = 10;
        case 10:
          return [2 /*return*/ ];
      }
    });
  });
}
var _a = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var conflux, provider;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            conflux = new Conflux({
              url: CFX_NODE_URI,
              // logger: console,
              networkId: networkId
            });
            provider = new cfxers.providers.Provider(conflux);
            return [4 /*yield*/ , waitCaughtUp(provider)];
          case 1:
            _a.sent();
            return [2 /*return*/ , provider];
        }
      });
    });
  }),
  getProvider = _a[0],
  setProvider = _a[1];

function setProviderByEnv(env) {
  void(env);
  return notYetSupported("setProviderByEnv");
}

function setProviderByName(providerName) {
  void(providerName);
  return notYetSupported("setProviderByName");
}

function providerEnvByName(providerName) {
  void(providerName);
  return notYetSupported("providerEnvByName");
}
export { ethLikeCompiled };
export { cfxers as ethers };
export var providerLib = {
  getProvider: getProvider,
  setProvider: setProvider,
  setProviderByName: setProviderByName,
  setProviderByEnv: setProviderByEnv,
  providerEnvByName: providerEnvByName
};
export var _verifyContractCode = false; // XXX
export var _warnTxNoBlockNumber = false; // XXX ?
export var standardUnit = 'CFX';
export var atomicUnit = 'Drip';
//# sourceMappingURL=CFX_impl.js.map
