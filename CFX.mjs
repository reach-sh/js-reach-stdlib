import * as cfxImpl from './CFX_impl.mjs';
import { makeEthLike } from './ETH_like.mjs';
export * from './CFX_compiled.mjs';
export const connector = 'CFX';
const ethLike = makeEthLike(cfxImpl);
// The following should be identical to ETH.ts
export const { getProvider, setProvider, randomUInt, hasRandom, setProviderByEnv, setProviderByName, providerEnvByName, balanceOf, transfer, connectAccount, newAccountFromSecret, newAccountFromMnemonic, getDefaultAccount, getFaucet, setFaucet, createAccount, fundFromFaucet, newTestAccount, getNetworkTime, wait, waitUntilTime, verifyContract, standardUnit, atomicUnit, parseCurrency, minimumBalance, formatCurrency, formatAddress, reachStdlib } = ethLike;
