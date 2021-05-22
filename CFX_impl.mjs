import * as cfxers from './cfxers.mjs';
import * as ethLikeCompiled from './CFX_compiled.mjs';
import { memoizeThunk, replaceableThunk } from './shared_impl.mjs';
import { envDefault } from './shared.mjs';
import { process } from './shim.mjs';
import cfxsdk from 'js-conflux-sdk';
const { Conflux } = cfxsdk;

function notYetSupported(label) {
  throw Error(`${label} not yet supported on experimental connector CFX`);
}
// XXX incorporate these into setProviderByEnv
const DEFAULT_CFX_NODE_URI = 'http://localhost:12537';
const DEFAULT_CFX_NETWORK_ID = '999';
const CFX_NODE_URI = envDefault(process.env.CFX_NODE_URI, DEFAULT_CFX_NODE_URI);
const CFX_NETWORK_ID = envDefault(process.env.CFX_NETWORK_ID, DEFAULT_CFX_NETWORK_ID);
const networkId = parseInt(CFX_NETWORK_ID);
export function isIsolatedNetwork() {
  return true; // XXX
}
export function isWindowProvider() {
  return false; // XXX
}
export async function _getDefaultNetworkAccount() {
  return notYetSupported(`_getDefaultNetworkAccount`);
}
export const _getDefaultFaucetNetworkAccount = memoizeThunk(async () => {
  // from /scripts/devnet-cfx/default.toml
  const mining_key = '0x7072d050980eb10516abd40688113e578ffb2fd26c645a186ef478c2b4344dce';
  return (new cfxers.Wallet(mining_key)).connect(await getProvider());
});
const [getProvider, setProvider] = replaceableThunk(() => {
  // XXX parameterize impl on conflux
  const conflux = new Conflux({
    url: CFX_NODE_URI,
    // logger: console,
    networkId,
  });
  return new cfxers.providers.Provider(conflux);
});

function setProviderByEnv(env) {
  void(env);
  return notYetSupported(`setProviderByEnv`);
}

function setProviderByName(providerName) {
  void(providerName);
  return notYetSupported(`setProviderByName`);
}

function providerEnvByName(providerName) {
  void(providerName);
  return notYetSupported(`providerEnvByName`);
}
export { ethLikeCompiled };
export { cfxers as ethers };
export const providerLib = {
  getProvider,
  setProvider,
  setProviderByName,
  setProviderByEnv,
  providerEnvByName,
};
export const _verifyContractCode = false; // XXX
export const _warnTxNoBlockNumber = false; // XXX ?
export const standardUnit = 'CFX';
export const atomicUnit = 'Drip';
