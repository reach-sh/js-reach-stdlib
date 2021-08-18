import * as cfxers from './cfxers';
import * as ethLikeCompiled from './CFX_compiled';
declare type NetworkAccount = cfxers.IWallet;
declare type Provider = cfxers.providers.Provider;
export declare function isIsolatedNetwork(): boolean;
export declare function isWindowProvider(): boolean;
export declare const getSignStrategy: () => string, setSignStrategy: (val: string) => void;
export declare function _getDefaultNetworkAccount(): Promise<NetworkAccount>;
export declare const _getDefaultFaucetNetworkAccount: () => Promise<cfxers.IWallet>;
export declare function setProvider(provider: Provider | Promise<Provider>): void;
export declare type WhichNetExternal = 'tethys' | 'TestNet' | 'BlockNumber';
export declare type ProviderName = WhichNetExternal | 'MainNet' | 'TestNet' | 'LocalHost' | 'window';
export interface ProviderByWindow {
    CFX_NET: 'window';
    CFX_LOG: string;
    REACH_CONNECTOR_MODE: string;
    REACH_ISOLATED_NETWORK: string;
}
declare type ProviderByURI = {
    CFX_NODE_URI: string;
    CFX_NETWORK_ID: string;
    CFX_LOG: string;
    REACH_CONNECTOR_MODE: string;
    REACH_DO_WAIT_PORT: string;
    REACH_ISOLATED_NETWORK: string;
};
export declare type ProviderEnv = ProviderByURI | ProviderByWindow;
declare function setProviderByEnv(env: any): void;
declare function setProviderByName(providerName: ProviderName): void;
declare function providerEnvByName(providerName: ProviderName): ProviderEnv;
export { ethLikeCompiled };
export { cfxers as ethers };
export declare const providerLib: {
    getProvider: () => cfxers.providers.Provider | Promise<cfxers.providers.Provider>;
    setProvider: typeof setProvider;
    setProviderByName: typeof setProviderByName;
    setProviderByEnv: typeof setProviderByEnv;
    providerEnvByName: typeof providerEnvByName;
    getSignStrategy: () => string;
    setSignStrategy: (val: string) => void;
};
export declare const _warnTxNoBlockNumber = false;
export declare const standardUnit = "CFX";
export declare const atomicUnit = "Drip";
export declare const validQueryWindow = 1000;
//# sourceMappingURL=CFX_impl.d.ts.map