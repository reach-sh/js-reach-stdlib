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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.setSigningMonitor = exports.setCustomHttpEventHandler = exports.setMinMillisBetweenRequests = exports.reachStdlib = exports.launchToken = exports.unsafeGetMnemonic = exports.formatWithDecimals = exports.formatAddress = exports.formatCurrency = exports.minimumBalance = exports.parseCurrency = exports.atomicUnit = exports.standardUnit = exports.verifyContract = exports.waitUntilSecs = exports.getNetworkSecs = exports.wait = exports.waitUntilTime = exports.getNetworkTime = exports.newTestAccounts = exports.newTestAccount = exports.fundFromFaucet = exports.canFundFromFaucet = exports.createAccount = exports.setFaucet = exports.getFaucet = exports.getDefaultAccount = exports.newAccountFromMnemonic = exports.newAccountFromSecret = exports.connectAccount = exports.transfer = exports.minimumBalanceOf = exports.balancesOf = exports.balanceOf = exports.walletFallback = exports.setWalletFallback = exports.providerEnvByName = exports.setProviderByName = exports.setProviderByEnv = exports.hasRandom = exports.randomUInt = exports.setProvider = exports.getProvider = exports.setValidQueryWindow = exports.getValidQueryWindow = exports.setQueryLowerBound = exports.getQueryLowerBound = exports.doCall = exports.connector = exports.ethers = void 0;
exports.bytes_xor = exports.digest_xor = exports.digestEq = exports.bytesEq = exports.lt = exports.le = exports.gt = exports.ge = exports.eq = exports.Array_set = exports.assert = exports.protect = exports.div = exports.mul = exports.mod = exports.sub = exports.add = void 0;
var cfxImpl = __importStar(require("./CFX_impl"));
var ETH_like_1 = require("./ETH_like");
exports.ethers = __importStar(require("./cfxers"));
__exportStar(require("./CFX_compiled"), exports);
exports.connector = 'CFX';
var ethLike = (0, ETH_like_1.makeEthLike)(cfxImpl);
// The following should be identical to ETH.ts
exports.doCall = ethLike.doCall, exports.getQueryLowerBound = ethLike.getQueryLowerBound, exports.setQueryLowerBound = ethLike.setQueryLowerBound, exports.getValidQueryWindow = ethLike.getValidQueryWindow, exports.setValidQueryWindow = ethLike.setValidQueryWindow, exports.getProvider = ethLike.getProvider, exports.setProvider = ethLike.setProvider, exports.randomUInt = ethLike.randomUInt, exports.hasRandom = ethLike.hasRandom, exports.setProviderByEnv = ethLike.setProviderByEnv, exports.setProviderByName = ethLike.setProviderByName, exports.providerEnvByName = ethLike.providerEnvByName, exports.setWalletFallback = ethLike.setWalletFallback, exports.walletFallback = ethLike.walletFallback, exports.balanceOf = ethLike.balanceOf, exports.balancesOf = ethLike.balancesOf, exports.minimumBalanceOf = ethLike.minimumBalanceOf, exports.transfer = ethLike.transfer, exports.connectAccount = ethLike.connectAccount, exports.newAccountFromSecret = ethLike.newAccountFromSecret, exports.newAccountFromMnemonic = ethLike.newAccountFromMnemonic, exports.getDefaultAccount = ethLike.getDefaultAccount, exports.getFaucet = ethLike.getFaucet, exports.setFaucet = ethLike.setFaucet, exports.createAccount = ethLike.createAccount, exports.canFundFromFaucet = ethLike.canFundFromFaucet, exports.fundFromFaucet = ethLike.fundFromFaucet, exports.newTestAccount = ethLike.newTestAccount, exports.newTestAccounts = ethLike.newTestAccounts, exports.getNetworkTime = ethLike.getNetworkTime, exports.waitUntilTime = ethLike.waitUntilTime, exports.wait = ethLike.wait, exports.getNetworkSecs = ethLike.getNetworkSecs, exports.waitUntilSecs = ethLike.waitUntilSecs, exports.verifyContract = ethLike.verifyContract, exports.standardUnit = ethLike.standardUnit, exports.atomicUnit = ethLike.atomicUnit, exports.parseCurrency = ethLike.parseCurrency, exports.minimumBalance = ethLike.minimumBalance, exports.formatCurrency = ethLike.formatCurrency, exports.formatAddress = ethLike.formatAddress, exports.formatWithDecimals = ethLike.formatWithDecimals, exports.unsafeGetMnemonic = ethLike.unsafeGetMnemonic, exports.launchToken = ethLike.launchToken, exports.reachStdlib = ethLike.reachStdlib, exports.setMinMillisBetweenRequests = ethLike.setMinMillisBetweenRequests, exports.setCustomHttpEventHandler = ethLike.setCustomHttpEventHandler, exports.setSigningMonitor = ethLike.setSigningMonitor;
exports.add = exports.reachStdlib.add, exports.sub = exports.reachStdlib.sub, exports.mod = exports.reachStdlib.mod, exports.mul = exports.reachStdlib.mul, exports.div = exports.reachStdlib.div, exports.protect = exports.reachStdlib.protect, exports.assert = exports.reachStdlib.assert, exports.Array_set = exports.reachStdlib.Array_set, exports.eq = exports.reachStdlib.eq, exports.ge = exports.reachStdlib.ge, exports.gt = exports.reachStdlib.gt, exports.le = exports.reachStdlib.le, exports.lt = exports.reachStdlib.lt, exports.bytesEq = exports.reachStdlib.bytesEq, exports.digestEq = exports.reachStdlib.digestEq, exports.digest_xor = exports.reachStdlib.digest_xor, exports.bytes_xor = exports.reachStdlib.bytes_xor;
__exportStar(require("./shared_user"), exports);
//# sourceMappingURL=CFX.js.map