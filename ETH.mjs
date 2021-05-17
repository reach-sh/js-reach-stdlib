import { makeEthLike } from './ETH_like.mjs';
import * as ethImpl from './ETH_impl.mjs';
export * from './ETH_compiled.mjs';
export const connector = 'ETH';
const ethLike = makeEthLike(ethImpl);
// The following should be identical to CFX.ts
export const { getProvider, setProvider, randomUInt, hasRandom, setProviderByEnv, setProviderByName, providerEnvByName, balanceOf, transfer, connectAccount, newAccountFromSecret, newAccountFromMnemonic, getDefaultAccount, getFaucet, setFaucet, createAccount, fundFromFaucet, newTestAccount, getNetworkTime, wait, waitUntilTime, verifyContract, standardUnit, atomicUnit, parseCurrency, minimumBalance, formatCurrency, formatAddress, reachStdlib } = ethLike;
