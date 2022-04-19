"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validQueryWindow = exports.atomicUnit = exports.standardUnit = exports._warnTxNoBlockNumber = exports.providerLib = exports.ethers = exports.ethLikeCompiled = exports.setProvider = exports._specialFundFromFaucet = exports.canFundFromFaucet = exports._getDefaultFaucetNetworkAccount = exports._getDefaultNetworkAccount = exports.canGetDefaultAccount = exports.isWindowProvider = exports.isIsolatedNetwork = void 0;
var cfxers = __importStar(require("./cfxers"));
exports.ethers = cfxers;
var ethLikeCompiled = __importStar(require("./CFX_compiled"));
exports.ethLikeCompiled = ethLikeCompiled;
var shared_impl_1 = require("./shared_impl");
var shared_user_1 = require("./shared_user");
var shim_1 = require("./shim");
var waitPort_1 = __importDefault(require("./waitPort"));
var js_conflux_sdk_1 = __importDefault(require("js-conflux-sdk"));
var await_timeout_1 = __importDefault(require("await-timeout"));
var ConnectorMode_1 = require("./ConnectorMode");
var buffer_1 = __importDefault(require("buffer"));
var Buffer = buffer_1["default"].Buffer;
var Conflux = js_conflux_sdk_1["default"].Conflux;
function notYetSupported(label) {
    throw Error("".concat(label, " not yet supported on CFX"));
}
function throwError(msg) {
    throw Error(msg);
}
var DEFAULT_CFX_NODE_URI = 'http://localhost:12537';
var DEFAULT_CFX_NETWORK_ID = '999';
function isIsolatedNetwork() {
    return (0, shared_impl_1.truthyEnv)(getProviderEnv().REACH_ISOLATED_NETWORK);
}
exports.isIsolatedNetwork = isIsolatedNetwork;
function isWindowProvider() {
    return !!shim_1.window.conflux;
}
exports.isWindowProvider = isWindowProvider;
function canGetDefaultAccount() {
    // XXX be pickier
    return true;
}
exports.canGetDefaultAccount = canGetDefaultAccount;
function _getDefaultNetworkAccount() {
    return __awaiter(this, void 0, void 0, function () {
        var cp, w, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0: return [4 /*yield*/, getConfluxPortal()];
                case 1:
                    cp = _g.sent();
                    if (!cp._rwfb) return [3 /*break*/, 2];
                    _a = cp._rwfb();
                    return [3 /*break*/, 4];
                case 2:
                    _c = (_b = cfxers.BrowserWallet).bind;
                    _d = [void 0, cp];
                    return [4 /*yield*/, cp.enable()];
                case 3:
                    _a = new (_c.apply(_b, _d.concat([(_g.sent())[0]])))();
                    _g.label = 4;
                case 4:
                    w = _a;
                    if (!w.provider) return [3 /*break*/, 5];
                    return [2 /*return*/, w];
                case 5:
                    _f = (_e = w).connect;
                    return [4 /*yield*/, getProvider()];
                case 6: return [2 /*return*/, _f.apply(_e, [_g.sent()])];
            }
        });
    });
}
exports._getDefaultNetworkAccount = _getDefaultNetworkAccount;
// from /scripts/devnet-cfx/default.toml
var mining_key = '0x091ca0785ec2bd9a5eca245fdc83baddd570644f3e0489b41e515f0e5c33f3d9';
var defaultFaucetWallet = new cfxers.Wallet(mining_key);
exports._getDefaultFaucetNetworkAccount = (0, shared_impl_1.memoizeThunk)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!defaultFaucetWallet.provider) return [3 /*break*/, 2];
                return [4 /*yield*/, getProvider()];
            case 1:
                provider = _a.sent();
                // Async things can cause this state to change...
                if (!defaultFaucetWallet.provider)
                    defaultFaucetWallet.connect(provider);
                _a.label = 2;
            case 2: return [2 /*return*/, defaultFaucetWallet];
        }
    });
}); });
function toHexAddr(cfxAddr) {
    return '0x' + Buffer.from(
    // @ts-ignore
    js_conflux_sdk_1["default"].address.decodeCfxAddress(cfxAddr).hexAddress).toString('hex').toLowerCase();
}
var makeURLFunder = function (url) { return function (to, amt) { return __awaiter(void 0, void 0, void 0, function () {
    var dhead, _a, toHex, u, res, resJson;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dhead = 'doURLFunder';
                if (!to.getAddress) return [3 /*break*/, 2];
                return [4 /*yield*/, to.getAddress()];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = to;
                _b.label = 3;
            case 3:
                to = _a;
                (0, shared_impl_1.debug)(dhead, to);
                toHex = toHexAddr(to);
                u = "".concat(url, "?address=").concat(toHex);
                if (amt) {
                    u = "".concat(u, "&amount=").concat((0, shared_user_1.bigNumberify)(amt));
                }
                (0, shared_impl_1.debug)(dhead, { toHex: toHex, u: u });
                return [4 /*yield*/, shim_1.window.fetch(u)];
            case 4:
                res = _b.sent();
                return [4 /*yield*/, res.json()];
            case 5:
                resJson = _b.sent();
                (0, shared_impl_1.debug)(dhead, { resJson: resJson });
                if (!res.ok) {
                    throw resJson;
                }
                return [2 /*return*/];
        }
    });
}); }; };
function canFundFromFaucet() {
    return __awaiter(this, void 0, void 0, function () {
        var netId;
        return __generator(this, function (_a) {
            (0, shared_impl_1.debug)('canFundFromFaucet');
            netId = ethLikeCompiled.getNetworkId();
            return [2 /*return*/, netId == 0x1 || netId == 999];
        });
    });
}
exports.canFundFromFaucet = canFundFromFaucet;
function _specialFundFromFaucet() {
    return __awaiter(this, void 0, void 0, function () {
        var ni, env, k, base, coms, uri;
        return __generator(this, function (_a) {
            ni = ethLikeCompiled.getNetworkId();
            (0, shared_impl_1.debug)("_specialFundFromFaucet", { ni: ni });
            if (ni == 0x1) {
                // XXX TestNet faucet only gives out 100 CFX at a time
                // Should we throw an error if amt !== 100 CFX?
                return [2 /*return*/, makeURLFunder("http://test-faucet.confluxnetwork.org:18088/dev/ask")];
            }
            else if (ni == 999) {
                env = getProviderEnv();
                k = 'CFX_NODE_URI';
                base = k in env ? env[k] : DEFAULT_CFX_NODE_URI;
                coms = base.split(':');
                coms.pop();
                uri = coms.join(':');
                return [2 /*return*/, makeURLFunder("".concat(uri, ":1337/faucet"))];
            }
            else {
                return [2 /*return*/, null];
            }
            return [2 /*return*/];
        });
    });
}
exports._specialFundFromFaucet = _specialFundFromFaucet;
var _a = __read((0, shared_impl_1.replaceableThunk)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var env, provider;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                env = getProviderEnv();
                return [4 /*yield*/, waitProviderFromEnv(env)];
            case 1:
                provider = _a.sent();
                if (!('CFX_NODE_URI' in env && env.CFX_NODE_URI && (0, shared_impl_1.truthyEnv)(env.REACH_DO_WAIT_PORT))) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, waitPort_1["default"])(env.CFX_NODE_URI)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/, provider];
        }
    });
}); }), 2), getProvider = _a[0], _setProvider = _a[1];
function setProvider(provider) {
    _setProvider(provider);
    if (!_providerEnv) {
        // this circumstance is weird and maybe we should handle it better
        // process.env isn't available in browser so we try to avoid relying on it here.
        setProviderEnv({
            REACH_CONNECTOR_MODE: 'CFX-unspecified',
            REACH_ISOLATED_NETWORK: 'no'
        });
    }
}
exports.setProvider = setProvider;
;
function connectorModeIsolatedNetwork(cm) {
    switch (cm) {
        case 'CFX-devnet': return 'yes';
        default: return 'no';
    }
}
function guessConnectorMode(env) {
    if ('CFX_NODE_URI' in env && env.CFX_NODE_URI) {
        // take a guess if CFX_NODE_URI is set
        return env.CFX_NODE_URI.toLowerCase().includes('localhost') ? 'CFX-devnet' : 'CFX-live';
    }
    else {
        // abstain from guessing
        return undefined;
    }
}
// XXX less copy/paste from ETH_impl
function envDefaultsCFX(env) {
    var CFX_NODE_URI = env.CFX_NODE_URI, CFX_NETWORK_ID = env.CFX_NETWORK_ID;
    var cm = (0, shared_impl_1.envDefault)(env.REACH_CONNECTOR_MODE, guessConnectorMode(env));
    var REACH_CONNECTOR_MODE = (0, shared_impl_1.envDefault)(cm, (0, ConnectorMode_1.canonicalizeConnectorMode)(env.REACH_CONNECTOR_MODE || 'CFX'));
    var isolatedDefault = connectorModeIsolatedNetwork(REACH_CONNECTOR_MODE);
    var REACH_ISOLATED_NETWORK = (0, shared_impl_1.envDefault)(env.REACH_ISOLATED_NETWORK, isolatedDefault);
    if ((0, shared_impl_1.truthyEnv)(CFX_NODE_URI)) {
        var REACH_DO_WAIT_PORT = (0, shared_impl_1.envDefault)(env.REACH_DO_WAIT_PORT, 'yes');
        var cni = (0, shared_impl_1.envDefault)(CFX_NETWORK_ID, localhostProviderEnv.CFX_NETWORK_ID);
        return { CFX_NODE_URI: CFX_NODE_URI, CFX_NETWORK_ID: cni, REACH_CONNECTOR_MODE: REACH_CONNECTOR_MODE, REACH_DO_WAIT_PORT: REACH_DO_WAIT_PORT, REACH_ISOLATED_NETWORK: REACH_ISOLATED_NETWORK };
    }
    else {
        if (shim_1.window.conflux) {
            return localhostProviderEnv;
            // XXX instead of this ^ support using window.conflux as provider
            // return notYetSupported(`window.conflux`);
            // return windowProviderEnv(REACH_ISOLATED_NETWORK);
        }
        else {
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
        var env = envDefaultsCFX(shim_1.process.env);
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
        }
        catch (_) {
            throw Error("Invalid CFX_NETWORK_ID='".concat(env.CFX_NETWORK_ID, "'"));
        }
    }
}
// XXX less copy/pasta from ETH_impl
function waitProviderFromEnv(env) {
    return __awaiter(this, void 0, void 0, function () {
        var CFX_NODE_URI_1, CFX_NETWORK_ID_1, REACH_DO_WAIT_PORT_1, conflux;
        var _this = this;
        return __generator(this, function (_a) {
            if ('CFX_NODE_URI' in env && env.CFX_NODE_URI) {
                CFX_NODE_URI_1 = env.CFX_NODE_URI, CFX_NETWORK_ID_1 = env.CFX_NETWORK_ID, REACH_DO_WAIT_PORT_1 = env.REACH_DO_WAIT_PORT;
                return [2 /*return*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                        var networkId, provider;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(0, shared_impl_1.truthyEnv)(REACH_DO_WAIT_PORT_1)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, waitPort_1["default"])(CFX_NODE_URI_1)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    networkId = CFX_NETWORK_ID_1 ? parseInt(CFX_NETWORK_ID_1) : undefined;
                                    (0, shared_impl_1.debug)("waitProviderFromEnv", "new Conflux", { url: CFX_NODE_URI_1, networkId: networkId });
                                    provider = new cfxers.providers.Provider(new Conflux({
                                        url: CFX_NODE_URI_1,
                                        networkId: networkId
                                    }));
                                    // XXX: make some sort of configurable polling interval?
                                    // provider.pollingInterval = 500; // ms
                                    return [2 /*return*/, provider];
                            }
                        });
                    }); })()];
            }
            else {
                conflux = shim_1.window.conflux;
                if (conflux) {
                    return [2 /*return*/, (function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, notYetSupported("using window.conflux as provider.")];
                            });
                        }); })()];
                }
                else {
                    throw Error("window.conflux is not defined");
                }
            }
            return [2 /*return*/];
        });
    });
}
function setProviderByEnv(env) {
    var fullEnv = envDefaultsCFX(env);
    setProviderEnv(fullEnv);
    setProvider(waitProviderFromEnv(fullEnv));
}
function setProviderByName(pn) {
    var env = providerEnvByName(pn);
    setProviderByEnv(env);
}
var localhostProviderEnv = {
    CFX_NODE_URI: DEFAULT_CFX_NODE_URI,
    CFX_NETWORK_ID: DEFAULT_CFX_NETWORK_ID,
    REACH_CONNECTOR_MODE: 'CFX-devnet',
    REACH_DO_WAIT_PORT: 'yes',
    REACH_ISOLATED_NETWORK: 'yes'
};
function providerEnvByName(pn) {
    switch (pn) {
        case 'LocalHost': return localhostProviderEnv;
        case 'window': return notYetSupported("providerEnvByName('window')");
        case 'MainNet': return providerEnvByName('tethys');
        case 'TestNet': return cfxProviderEnv('TestNet');
        case 'tethys': return cfxProviderEnv('tethys');
        case 'BlockNumber': return cfxProviderEnv('BlockNumber'); // XXX temporary
        default: throw Error("Unrecognized provider name: ".concat(pn));
    }
}
function cfxProviderEnv(network) {
    var _a = __read(network == 'BlockNumber' ? ['http://52.53.235.44:12537', '1'] // 0x1
        : network == 'TestNet' ? ['https://portal-test.confluxrpc.com', '1'] // 0x1
            : network == 'tethys' ? ['https://portal-main.confluxrpc.com', '1029'] // 0x405
                : throwError("network name not recognized: '".concat(network, "'")), 2), CFX_NODE_URI = _a[0], CFX_NETWORK_ID = _a[1];
    return {
        CFX_NODE_URI: CFX_NODE_URI,
        CFX_NETWORK_ID: CFX_NETWORK_ID,
        REACH_DO_WAIT_PORT: 'yes',
        REACH_CONNECTOR_MODE: 'CFX-live',
        REACH_ISOLATED_NETWORK: 'no'
    };
}
function getConfluxPortal() {
    return __awaiter(this, void 0, void 0, function () {
        var maxTries, tries;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    maxTries = 10;
                    tries = 1;
                    _a.label = 1;
                case 1:
                    if (!(tries <= maxTries)) return [3 /*break*/, 4];
                    if (shim_1.window.conflux)
                        return [2 /*return*/, shim_1.window.conflux];
                    return [4 /*yield*/, await_timeout_1["default"].set(100)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    tries++;
                    return [3 /*break*/, 1];
                case 4: throw Error("Couldn't find window.conflux");
            }
        });
    });
}
var setWalletFallback = function (wf) {
    if (!shim_1.window.conflux) {
        shim_1.window.conflux = wf();
    }
};
var walletFallback = function (opts) { return function () {
    // XXX do cfx provider from opts
    var p = {};
    if (opts === null || opts === void 0 ? void 0 : opts.providerEnv) {
        throw Error("providerEnv not supported in this context"); // yet
    }
    // TODO: reduce duplication with ETH_impl
    // @ts-ignore
    p._rwfb = function () {
        var mnem = shim_1.window.prompt("Please paste the mnemonic for your account, or enable ConfluxPortal and refresh the page.");
        return mnem ? cfxers.Wallet.fromMnemonic(mnem) : cfxers.Wallet.createRandom();
    };
    return p;
}; };
exports.providerLib = {
    getProvider: getProvider,
    setProvider: setProvider,
    setProviderByName: setProviderByName,
    setProviderByEnv: setProviderByEnv,
    providerEnvByName: providerEnvByName,
    setWalletFallback: setWalletFallback,
    walletFallback: walletFallback
};
exports._warnTxNoBlockNumber = false; // XXX ?
exports.standardUnit = 'CFX';
exports.atomicUnit = 'Drip';
// This can probably be 999, but Dan is superstitious,
// and wants to avoid off-by-ones by a larger margin
exports.validQueryWindow = 990;
//# sourceMappingURL=CFX_impl.js.map