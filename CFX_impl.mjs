import * as cfxers from './cfxers.mjs';
import * as ethLikeCompiled from './CFX_compiled.mjs';
import { memoizeThunk, replaceableThunk } from './shared_impl.mjs';
import { debug, envDefault } from './shared.mjs';
import { process } from './shim.mjs';
import waitPort from './waitPort.mjs';
import cfxsdk from 'js-conflux-sdk';
import Timeout from 'await-timeout';
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
// from /scripts/devnet-cfx/default.toml
const mining_key = '0xaa911f5b5b567af4db867a9d9072f4415fe722b114306baae28b721b6fbb2d99';
const defaultFaucetWallet = new cfxers.Wallet(mining_key);
export const _getDefaultFaucetNetworkAccount = memoizeThunk(async () => {
  if (!defaultFaucetWallet.provider)
    defaultFaucetWallet.connect(await getProvider());
  return defaultFaucetWallet;
});
async function waitCaughtUp(provider) {
  await waitPort(CFX_NODE_URI);
  if (isIsolatedNetwork()) {
    // XXX this doesn't work with setFaucet; requires the default faucet to be used
    // But we can't call getFaucet() or _getDefaultFaucetNetworkAccount() here because
    // those (if left to defaults) call getProvider which calls this fn (waitCaughtUp).
    // TODO: disentangle
    if (!defaultFaucetWallet.provider)
      defaultFaucetWallet.connect(provider);
    const maxTries = 20;
    const waitMs = 1000;
    let err = null;
    for (let tries = 0; tries < maxTries; tries++) {
      if (err) {
        debug(`waitCaughtUp: waiting some more`, { waitMs, tries, maxTries, err });
        await Timeout.set(waitMs); // wait 1s between tries
      }
      try {
        const w = cfxers.Wallet.createRandom().connect(provider);
        const txn = { to: w.getAddress(), value: '1' };
        debug(`sending dummy txn`, txn);
        const t = await defaultFaucetWallet.sendTransaction(txn);
        await t.wait();
        return;
      } catch (e) {
        // TODO: only loop again if we detect that it's the "not caught up yet" error
        //   err: RPCError: Request rejected due to still in the catch up mode.
        //   { code: -32077 }
        err = e;
      }
    }
    if (err)
      throw err;
  }
}
const [getProvider, setProvider] = replaceableThunk(async () => {
  // XXX parameterize impl on conflux
  const conflux = new Conflux({
    url: CFX_NODE_URI,
    // logger: console,
    networkId,
  });
  // XXX We need to find a way to wait until catch-up mode is done
  const provider = new cfxers.providers.Provider(conflux);
  await waitCaughtUp(provider);
  return provider;
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
