import { ethers } from 'ethers';
import * as ethLikeCompiled from './ETH_compiled';
declare type Provider = ethers.providers.Provider;
declare type NetworkAccount = any;
export interface ProviderByName {
    ETH_NET: string;
    REACH_CONNECTOR_MODE: string;
    REACH_ISOLATED_NETWORK: string;
}
export declare type WhichNetExternal = 'homestead' | 'ropsten';
export declare type ProviderName = WhichNetExternal | 'MainNet' | 'TestNet' | 'LocalHost' | 'window';
export interface ProviderByURI {
    ETH_NODE_URI: string;
    REACH_CONNECTOR_MODE: string;
    REACH_DO_WAIT_PORT: string;
    REACH_ISOLATED_NETWORK: string;
}
export declare type ProviderEnv = ProviderByURI | ProviderByName;
export { ethLikeCompiled };
export declare function _getDefaultNetworkAccount(): Promise<NetworkAccount>;
export declare function _getDefaultFaucetNetworkAccount(): Promise<NetworkAccount>;
declare function setProviderByEnv(env: Partial<ProviderByName & ProviderByURI>): void;
export declare function setProviderByName(providerName: ProviderName): void;
declare function providerEnvByName(providerName: ProviderName): ProviderEnv;
export declare function isIsolatedNetwork(): boolean;
export declare function isWindowProvider(): boolean;
declare const getProvider: () => ethers.providers.Provider | Promise<ethers.providers.Provider>;
export { getProvider };
export declare function setProvider(provider: Provider | Promise<Provider>): void;
declare function getSignStrategy(): string;
declare function setSignStrategy(ss: string): void;
export { ethers };
export declare const providerLib: {
    getProvider: () => ethers.providers.Provider | Promise<ethers.providers.Provider>;
    setProvider: typeof setProvider;
    setProviderByName: typeof setProviderByName;
    setProviderByEnv: typeof setProviderByEnv;
    setSignStrategy: typeof setSignStrategy;
    getSignStrategy: typeof getSignStrategy;
    providerEnvByName: typeof providerEnvByName;
};
export declare const standardUnit = "ETH";
export declare const atomicUnit = "WEI";
//# sourceMappingURL=ETH_impl.d.ts.map