"use strict";
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
exports.__esModule = true;
exports.eq = exports.Array_set = exports.assert = exports.protect = exports.div = exports.mul = exports.mod = exports.sub = exports.add = exports.reachStdlib = exports.launchToken = exports.formatAddress = exports.formatCurrency = exports.minimumBalance = exports.parseCurrency = exports.atomicUnit = exports.standardUnit = exports.verifyContract = exports.waitUntilSecs = exports.getNetworkSecs = exports.wait = exports.waitUntilTime = exports.getNetworkTime = exports.newTestAccounts = exports.newTestAccount = exports.fundFromFaucet = exports.canFundFromFaucet = exports.createAccount = exports.setFaucet = exports.getFaucet = exports.getDefaultAccount = exports.newAccountFromMnemonic = exports.newAccountFromSecret = exports.connectAccount = exports.transfer = exports.balanceOf = exports.walletFallback = exports.setWalletFallback = exports.providerEnvByName = exports.setProviderByName = exports.setProviderByEnv = exports.hasRandom = exports.randomUInt = exports.setProvider = exports.getProvider = exports.setValidQueryWindow = exports.getValidQueryWindow = exports.setQueryLowerBound = exports.getQueryLowerBound = exports.connector = void 0;
exports.digestEq = exports.bytesEq = exports.lt = exports.le = exports.gt = exports.ge = void 0;
var ETH_like_1 = require("./ETH_like");
var ethImpl = __importStar(require("./ETH_impl"));
__exportStar(require("./ETH_compiled"), exports);
exports.connector = 'ETH';
var ethLike = (0, ETH_like_1.makeEthLike)(ethImpl);
// The following should be identical to CFX.ts
exports.getQueryLowerBound = ethLike.getQueryLowerBound, exports.setQueryLowerBound = ethLike.setQueryLowerBound, exports.getValidQueryWindow = ethLike.getValidQueryWindow, exports.setValidQueryWindow = ethLike.setValidQueryWindow, exports.getProvider = ethLike.getProvider, exports.setProvider = ethLike.setProvider, exports.randomUInt = ethLike.randomUInt, exports.hasRandom = ethLike.hasRandom, exports.setProviderByEnv = ethLike.setProviderByEnv, exports.setProviderByName = ethLike.setProviderByName, exports.providerEnvByName = ethLike.providerEnvByName, exports.setWalletFallback = ethLike.setWalletFallback, exports.walletFallback = ethLike.walletFallback, exports.balanceOf = ethLike.balanceOf, exports.transfer = ethLike.transfer, exports.connectAccount = ethLike.connectAccount, exports.newAccountFromSecret = ethLike.newAccountFromSecret, exports.newAccountFromMnemonic = ethLike.newAccountFromMnemonic, exports.getDefaultAccount = ethLike.getDefaultAccount, exports.getFaucet = ethLike.getFaucet, exports.setFaucet = ethLike.setFaucet, exports.createAccount = ethLike.createAccount, exports.canFundFromFaucet = ethLike.canFundFromFaucet, exports.fundFromFaucet = ethLike.fundFromFaucet, exports.newTestAccount = ethLike.newTestAccount, exports.newTestAccounts = ethLike.newTestAccounts, exports.getNetworkTime = ethLike.getNetworkTime, exports.waitUntilTime = ethLike.waitUntilTime, exports.wait = ethLike.wait, exports.getNetworkSecs = ethLike.getNetworkSecs, exports.waitUntilSecs = ethLike.waitUntilSecs, exports.verifyContract = ethLike.verifyContract, exports.standardUnit = ethLike.standardUnit, exports.atomicUnit = ethLike.atomicUnit, exports.parseCurrency = ethLike.parseCurrency, exports.minimumBalance = ethLike.minimumBalance, exports.formatCurrency = ethLike.formatCurrency, exports.formatAddress = ethLike.formatAddress, exports.launchToken = ethLike.launchToken, exports.reachStdlib = ethLike.reachStdlib;
exports.add = exports.reachStdlib.add, exports.sub = exports.reachStdlib.sub, exports.mod = exports.reachStdlib.mod, exports.mul = exports.reachStdlib.mul, exports.div = exports.reachStdlib.div, exports.protect = exports.reachStdlib.protect, exports.assert = exports.reachStdlib.assert, exports.Array_set = exports.reachStdlib.Array_set, exports.eq = exports.reachStdlib.eq, exports.ge = exports.reachStdlib.ge, exports.gt = exports.reachStdlib.gt, exports.le = exports.reachStdlib.le, exports.lt = exports.reachStdlib.lt, exports.bytesEq = exports.reachStdlib.bytesEq, exports.digestEq = exports.reachStdlib.digestEq;
__exportStar(require("./shared_user"), exports);
//# sourceMappingURL=ETH.js.map