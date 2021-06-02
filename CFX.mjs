import * as cfxImpl from './CFX_impl.mjs';
import { makeEthLike } from './ETH_like.mjs';
export * from './CFX_compiled.mjs';
export var connector = 'CFX';
var ethLike = makeEthLike(cfxImpl);
// The following should be identical to ETH.ts
export var getProvider = ethLike.getProvider,
  setProvider = ethLike.setProvider,
  randomUInt = ethLike.randomUInt,
  hasRandom = ethLike.hasRandom,
  setProviderByEnv = ethLike.setProviderByEnv,
  setProviderByName = ethLike.setProviderByName,
  providerEnvByName = ethLike.providerEnvByName,
  balanceOf = ethLike.balanceOf,
  transfer = ethLike.transfer,
  connectAccount = ethLike.connectAccount,
  newAccountFromSecret = ethLike.newAccountFromSecret,
  newAccountFromMnemonic = ethLike.newAccountFromMnemonic,
  getDefaultAccount = ethLike.getDefaultAccount,
  getFaucet = ethLike.getFaucet,
  setFaucet = ethLike.setFaucet,
  createAccount = ethLike.createAccount,
  fundFromFaucet = ethLike.fundFromFaucet,
  newTestAccount = ethLike.newTestAccount,
  getNetworkTime = ethLike.getNetworkTime,
  wait = ethLike.wait,
  waitUntilTime = ethLike.waitUntilTime,
  verifyContract = ethLike.verifyContract,
  standardUnit = ethLike.standardUnit,
  atomicUnit = ethLike.atomicUnit,
  parseCurrency = ethLike.parseCurrency,
  minimumBalance = ethLike.minimumBalance,
  formatCurrency = ethLike.formatCurrency,
  formatAddress = ethLike.formatAddress,
  reachStdlib = ethLike.reachStdlib;
export var add = reachStdlib.add,
  sub = reachStdlib.sub,
  mod = reachStdlib.mod,
  mul = reachStdlib.mul,
  div = reachStdlib.div,
  protect = reachStdlib.protect,
  assert = reachStdlib.assert,
  Array_set = reachStdlib.Array_set,
  eq = reachStdlib.eq,
  ge = reachStdlib.ge,
  gt = reachStdlib.gt,
  le = reachStdlib.le,
  lt = reachStdlib.lt,
  bytesEq = reachStdlib.bytesEq,
  digestEq = reachStdlib.digestEq;
export * from './shared_user.mjs';
//# sourceMappingURL=CFX.js.map
