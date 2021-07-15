import * as cfxers from './cfxers';
import * as ethLikeCompiled from './CFX_compiled';
declare type NetworkAccount = cfxers.IWallet;
export declare function isIsolatedNetwork(): boolean;
export declare function isWindowProvider(): boolean;
export declare const getSignStrategy: () => string, setSignStrategy: (val: string) => void;
export declare function _getDefaultNetworkAccount(): Promise<NetworkAccount>;
export declare const _getDefaultFaucetNetworkAccount: () => Promise<cfxers.IWallet>;
declare function setProviderByEnv(env: any): void;
declare function setProviderByName(providerName: any): void;
declare function providerEnvByName(providerName: any): void;
export { ethLikeCompiled };
export { cfxers as ethers };
export declare const providerLib: {
    getProvider: () => cfxers.providers.Provider | Promise<cfxers.providers.Provider>;
    setProvider: (val: cfxers.providers.Provider | Promise<cfxers.providers.Provider>) => void;
    setProviderByName: typeof setProviderByName;
    setProviderByEnv: typeof setProviderByEnv;
    providerEnvByName: typeof providerEnvByName;
    getSignStrategy: () => string;
    setSignStrategy: (val: string) => void;
};
export declare const _verifyContractCode = false;
export declare const _warnTxNoBlockNumber = false;
export declare const standardUnit = "CFX";
export declare const atomicUnit = "Drip";
//# sourceMappingURL=CFX_impl.d.ts.map