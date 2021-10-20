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
import { debug, envDefault, memoizeThunk, replaceableThunk, truthyEnv, } from './shared_impl.mjs';
import { process, window } from './shim.mjs';
import waitPort from './waitPort.mjs';
import cfxsdk from 'js-conflux-sdk';
import Timeout from 'await-timeout';
import { canonicalizeConnectorMode } from './ConnectorMode.mjs';
import buffer from 'buffer';
var Buffer = buffer.Buffer;
var Conflux = cfxsdk.Conflux;

function notYetSupported(label) {
  throw Error(label + " not yet supported on CFX");
}

function throwError(msg) {
  throw Error(msg);
}
var DEFAULT_CFX_NODE_URI = 'http://localhost:12537';
var DEFAULT_CFX_NETWORK_ID = '999';
export function isIsolatedNetwork() {
  return truthyEnv(getProviderEnv().REACH_ISOLATED_NETWORK);
}
export function isWindowProvider() {
  return !!window.conflux;
}
export function canGetDefaultAccount() {
  // XXX be pickier
  return true;
}
export function _getDefaultNetworkAccount() {
  return __awaiter(this, void 0, void 0, function() {
    var cp, addr, w, _a, _b;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          return [4 /*yield*/ , getConfluxPortal()];
        case 1:
          cp = _c.sent();
          return [4 /*yield*/ , cp.enable()];
        case 2:
          addr = (_c.sent())[0];
          w = new cfxers.BrowserWallet(cp, addr);
          if (!w.provider) return [3 /*break*/ , 3];
          return [2 /*return*/ , w];
        case 3:
          _b = (_a = w).connect;
          return [4 /*yield*/ , getProvider()];
        case 4:
          return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
      }
    });
  });
}
// from /scripts/devnet-cfx/default.toml
var mining_key = '0x091ca0785ec2bd9a5eca245fdc83baddd570644f3e0489b41e515f0e5c33f3d9';
var defaultFaucetWallet = new cfxers.Wallet(mining_key);
export var _getDefaultFaucetNetworkAccount = memoizeThunk(function() {
  return __awaiter(void 0, void 0, void 0, function() {
    var provider;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!!defaultFaucetWallet.provider) return [3 /*break*/ , 2];
          return [4 /*yield*/ , getProvider()];
        case 1:
          provider = _a.sent();
          // Async things can cause this state to change...
          if (!defaultFaucetWallet.provider)
            defaultFaucetWallet.connect(provider);
          _a.label = 2;
        case 2:
          return [2 /*return*/ , defaultFaucetWallet];
      }
    });
  });
});

function toHexAddr(cfxAddr) {
  return '0x' + Buffer.from(
    // @ts-ignore
    cfxsdk.address.decodeCfxAddress(cfxAddr).hexAddress).toString('hex').toLowerCase();
}

function _fundOnCfxTestNet(to, amt) {
  return __awaiter(this, void 0, void 0, function() {
    var method, _a, toHex, res, resJson;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          // XXX TestNet faucet only gives out 100 CFX at a time
          // Should we throw an error if amt !== 100 CFX?
          void(amt);
          method = '_fundOnCfxTestNet';
          if (!to.getAddress) return [3 /*break*/ , 2];
          return [4 /*yield*/ , to.getAddress()];
        case 1:
          _a = _b.sent();
          return [3 /*break*/ , 3];
        case 2:
          _a = to;
          _b.label = 3;
        case 3:
          to = _a;
          debug({ method: method, to: to });
          toHex = toHexAddr(to);
          debug({ method: method, message: 'requesting from testnet faucet', toHex: toHex });
          return [4 /*yield*/ , window.fetch("http://test-faucet.confluxnetwork.org:18088/dev/ask?address=" + toHex)];
        case 4:
          res = _b.sent();
          return [4 /*yield*/ , res.json()];
        case 5:
          resJson = _b.sent();
          debug({ method: method, message: 'got response from testnet faucet', resJson: resJson });
          return [2 /*return*/ ];
      }
    });
  });
}
export function canFundFromFaucet() {
  return __awaiter(this, void 0, void 0, function() {
    var netId;
    return __generator(this, function(_a) {
      debug('canFundFromFaucet');
      netId = ethLikeCompiled.getNetworkId();
      return [2 /*return*/ , netId == 0x1 || netId == 999];
    });
  });
}
export function _specialFundFromFaucet() {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      debug("_specialFundFromFaucet");
      if (ethLikeCompiled.getNetworkId() == 0x1) {
        return [2 /*return*/ , _fundOnCfxTestNet];
      } else {
        return [2 /*return*/ , null];
      }
      return [2 /*return*/ ];
    });
  });
}

function waitCaughtUp(provider, env) {
  var _a;
  return __awaiter(this, void 0, void 0, function() {
    var maxTries, waitMs, err, tries, faddr, fbal, failMsg, w, txn, t, e_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          if (!('CFX_NODE_URI' in env && env.CFX_NODE_URI && truthyEnv(env.REACH_DO_WAIT_PORT))) return [3 /*break*/ , 2];
          return [4 /*yield*/ , waitPort(env.CFX_NODE_URI)];
        case 1:
          _b.sent();
          _b.label = 2;
        case 2:
          if (!isIsolatedNetwork()) return [3 /*break*/ , 12];
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
          _b.label = 3;
        case 3:
          if (!(tries < maxTries)) return [3 /*break*/ , 11];
          if (!err) return [3 /*break*/ , 5];
          debug("waitCaughtUp: waiting some more", { waitMs: waitMs, tries: tries, maxTries: maxTries, err: err });
          return [4 /*yield*/ , Timeout.set(waitMs)];
        case 4:
          _b.sent(); // wait 1s between tries
          _b.label = 5;
        case 5:
          _b.trys.push([5, 9, , 10]);
          faddr = defaultFaucetWallet.getAddress();
          return [4 /*yield*/ , ((_a = defaultFaucetWallet.provider) === null || _a === void 0 ? void 0 : _a.conflux.getBalance(faddr))];
        case 6:
          fbal = _b.sent();
          debug("Faucet bal", fbal);
          // @ts-ignore
          if (fbal == 0) {
            failMsg = "Faucet balance is 0 (" + faddr + ")";
            debug(failMsg);
            throw Error(failMsg);
          }
          w = cfxers.Wallet.createRandom().connect(provider);
          txn = { to: w.getAddress(), value: '1' };
          debug("sending dummy txn", txn);
          return [4 /*yield*/ , defaultFaucetWallet.sendTransaction(txn)];
        case 7:
          t = _b.sent();
          return [4 /*yield*/ , t.wait()];
        case 8:
          _b.sent();
          return [2 /*return*/ ];
        case 9:
          e_1 = _b.sent();
          // TODO: only loop again if we detect that it's the "not caught up yet" error
          //   err: RPCError: Request rejected due to still in the catch up mode.
          //   { code: -32077 }
          err = e_1;
          return [3 /*break*/ , 10];
        case 10:
          tries++;
          return [3 /*break*/ , 3];
        case 11:
          if (err)
            throw err;
          _b.label = 12;
        case 12:
          return [2 /*return*/ ];
      }
    });
  });
}
var _a = replaceableThunk(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      var fullEnv, provider;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            fullEnv = getProviderEnv();
            return [4 /*yield*/ , waitProviderFromEnv(fullEnv)];
          case 1:
            provider = _a.sent();
            // XXX disentangle the places where we waitProvider vs waitCaughtUp
            // XXX is there a better place to wait for this
            // such that toying with things at the repl doesn't hang if no connection is available?
            return [4 /*yield*/ , waitCaughtUp(provider, fullEnv)];
          case 2:
            // XXX disentangle the places where we waitProvider vs waitCaughtUp
            // XXX is there a better place to wait for this
            // such that toying with things at the repl doesn't hang if no connection is available?
            _a.sent();
            return [2 /*return*/ , provider];
        }
      });
    });
  }),
  getProvider = _a[0],
  _setProvider = _a[1];
export function setProvider(provider) {
  _setProvider(provider);
  if (!_providerEnv) {
    // this circumstance is weird and maybe we should handle it better
    // process.env isn't available in browser so we try to avoid relying on it here.
    setProviderEnv({
      REACH_CONNECTOR_MODE: 'CFX-unspecified',
      REACH_ISOLATED_NETWORK: 'no'
    });
  }
};

function connectorModeIsolatedNetwork(cm) {
  switch (cm) {
    case 'CFX-devnet':
      return 'yes';
    default:
      return 'no';
  }
}

function guessConnectorMode(env) {
  if ('CFX_NODE_URI' in env && env.CFX_NODE_URI) {
    // take a guess if CFX_NODE_URI is set
    return env.CFX_NODE_URI.toLowerCase().includes('localhost') ? 'CFX-devnet' : 'CFX-live';
  } else {
    // abstain from guessing
    return undefined;
  }
}
// XXX less copy/paste from ETH_impl
function envDefaultsCFX(env) {
  var CFX_NODE_URI = env.CFX_NODE_URI,
    CFX_NETWORK_ID = env.CFX_NETWORK_ID;
  var cm = envDefault(env.REACH_CONNECTOR_MODE, guessConnectorMode(env));
  var REACH_CONNECTOR_MODE = envDefault(cm, canonicalizeConnectorMode(env.REACH_CONNECTOR_MODE || 'CFX'));
  var isolatedDefault = connectorModeIsolatedNetwork(REACH_CONNECTOR_MODE);
  var REACH_ISOLATED_NETWORK = envDefault(env.REACH_ISOLATED_NETWORK, isolatedDefault);
  if (truthyEnv(CFX_NODE_URI)) {
    var REACH_DO_WAIT_PORT = envDefault(env.REACH_DO_WAIT_PORT, 'yes');
    var cni = envDefault(CFX_NETWORK_ID, localhostProviderEnv.CFX_NETWORK_ID);
    return { CFX_NODE_URI: CFX_NODE_URI, CFX_NETWORK_ID: cni, REACH_CONNECTOR_MODE: REACH_CONNECTOR_MODE, REACH_DO_WAIT_PORT: REACH_DO_WAIT_PORT, REACH_ISOLATED_NETWORK: REACH_ISOLATED_NETWORK };
  } else {
    if (window.conflux) {
      return localhostProviderEnv;
      // XXX instead of this ^ support using window.conflux as provider
      // return notYetSupported(`window.conflux`);
      // return windowProviderEnv(REACH_ISOLATED_NETWORK);
    } else {
      return localhostProviderEnv;
    }
  }
}
// Avoid using _providerEnv directly; use get/set
// We don't use replaceableThunk because slightly more nuanced inspection needs to be possible.
var _providerEnv;

function getProviderEnv() {
  if (!_providerEnv) {
    // We only fall back on process.env if there no setProviderEnv occurrs
    var env = envDefaultsCFX(process.env);
    _providerEnv = env;
  }
  return _providerEnv;
}

function setProviderEnv(env) {
  if (_providerEnv) {
    throw Error("setProviderEnv called after it was already set");
  }
  _providerEnv = env;
  if ('CFX_NETWORK_ID' in env) {
    try {
      var networkId = parseInt(env.CFX_NETWORK_ID);
      ethLikeCompiled.setNetworkId(networkId);
    } catch (_) {
      throw Error("Invalid CFX_NETWORK_ID='" + env.CFX_NETWORK_ID + "'");
    }
  }
}
// XXX less copy/pasta from ETH_impl
function waitProviderFromEnv(env) {
  return __awaiter(this, void 0, void 0, function() {
    var CFX_NODE_URI_1, CFX_NETWORK_ID_1, REACH_DO_WAIT_PORT_1, conflux;
    var _this = this;
    return __generator(this, function(_a) {
      if ('CFX_NODE_URI' in env && env.CFX_NODE_URI) {
        CFX_NODE_URI_1 = env.CFX_NODE_URI, CFX_NETWORK_ID_1 = env.CFX_NETWORK_ID, REACH_DO_WAIT_PORT_1 = env.REACH_DO_WAIT_PORT;
        return [2 /*return*/ , (function() {
          return __awaiter(_this, void 0, void 0, function() {
            var networkId, provider;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  if (!truthyEnv(REACH_DO_WAIT_PORT_1)) return [3 /*break*/ , 2];
                  return [4 /*yield*/ , waitPort(CFX_NODE_URI_1)];
                case 1:
                  _a.sent();
                  _a.label = 2;
                case 2:
                  networkId = CFX_NETWORK_ID_1 ? parseInt(CFX_NETWORK_ID_1) : undefined;
                  debug("waitProviderFromEnv", "new Conflux", { url: CFX_NODE_URI_1, networkId: networkId });
                  provider = new cfxers.providers.Provider(new Conflux({
                    url: CFX_NODE_URI_1,
                    networkId: networkId
                  }));
                  // XXX: make some sort of configurable polling interval?
                  // provider.pollingInterval = 500; // ms
                  return [2 /*return*/ , provider];
              }
            });
          });
        })()];
      } else {
        conflux = window.conflux;
        if (conflux) {
          return [2 /*return*/ , (function() {
            return __awaiter(_this, void 0, void 0, function() {
              return __generator(this, function(_a) {
                return [2 /*return*/ , notYetSupported("using window.conflux as provider.")];
              });
            });
          })()];
        } else {
          throw Error("window.conflux is not defined");
        }
      }
      return [2 /*return*/ ];
    });
  });
}

function setProviderByEnv(env) {
  var fullEnv = envDefaultsCFX(env);
  setProviderEnv(fullEnv);
  setProvider(waitProviderFromEnv(fullEnv));
}

function setProviderByName(providerName) {
  var env = providerEnvByName(providerName);
  setProviderByEnv(env);
}
var localhostProviderEnv = {
  CFX_NODE_URI: DEFAULT_CFX_NODE_URI,
  CFX_NETWORK_ID: DEFAULT_CFX_NETWORK_ID,
  REACH_CONNECTOR_MODE: 'CFX-devnet',
  REACH_DO_WAIT_PORT: 'yes',
  REACH_ISOLATED_NETWORK: 'yes'
};

function providerEnvByName(providerName) {
  switch (providerName) {
    case 'LocalHost':
      return localhostProviderEnv;
    case 'window':
      return notYetSupported("providerEnvByName('window')");
    case 'MainNet':
      return providerEnvByName('tethys');
    case 'TestNet':
      return cfxProviderEnv('TestNet');
    case 'tethys':
      return cfxProviderEnv('tethys');
    case 'BlockNumber':
      return cfxProviderEnv('BlockNumber'); // XXX temporary
    default:
      throw Error("Unrecognized provider name: " + providerName);
  }
}

function cfxProviderEnv(network) {
  var _a = network == 'BlockNumber' ? ['http://52.53.235.44:12537', '1'] // 0x1
    :
    network == 'TestNet' ? ['https://portal-test.confluxrpc.com', '1'] // 0x1
    :
    network == 'tethys' ? ['https://portal-main.confluxrpc.com', '1029'] // 0x405
    :
    throwError("network name not recognized: '" + network + "'"),
    CFX_NODE_URI = _a[0],
    CFX_NETWORK_ID = _a[1];
  return {
    CFX_NODE_URI: CFX_NODE_URI,
    CFX_NETWORK_ID: CFX_NETWORK_ID,
    REACH_DO_WAIT_PORT: 'yes',
    REACH_CONNECTOR_MODE: 'CFX-live',
    REACH_ISOLATED_NETWORK: 'no'
  };
}

function getConfluxPortal() {
  return __awaiter(this, void 0, void 0, function() {
    var maxTries, tries;
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          maxTries = 10;
          tries = 1;
          _a.label = 1;
        case 1:
          if (!(tries <= maxTries)) return [3 /*break*/ , 4];
          if (window.conflux)
            return [2 /*return*/ , window.conflux];
          return [4 /*yield*/ , Timeout.set(100)];
        case 2:
          _a.sent();
          _a.label = 3;
        case 3:
          tries++;
          return [3 /*break*/ , 1];
        case 4:
          throw Error("Couldn't find window.conflux");
      }
    });
  });
}
var setWalletFallback = function(wf) {
  if (!window.conflux) {
    window.conflux = wf();
  }
};
var walletFallback = function(opts) {
  return function() {
    void(opts);
    throw new Error("There is no wallet fallback for Conflux");
  };
};
export { ethLikeCompiled };
export { cfxers as ethers };
export var providerLib = {
  getProvider: getProvider,
  setProvider: setProvider,
  setProviderByName: setProviderByName,
  setProviderByEnv: setProviderByEnv,
  providerEnvByName: providerEnvByName,
  setWalletFallback: setWalletFallback,
  walletFallback: walletFallback
};
export var _warnTxNoBlockNumber = false; // XXX ?
export var standardUnit = 'CFX';
export var atomicUnit = 'Drip';
// This can probably be 999, but Dan is superstitious,
// and wants to avoid off-by-ones by a larger margin
export var validQueryWindow = 990;
//# sourceMappingURL=CFX_impl.js.map
