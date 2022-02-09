import * as ethImpl from './ETH_impl';
export type { Provider, ProviderEnv, ProviderName } from './ETH_impl';
export type { Token, ContractInfo, Address, NetworkAccount, Ty, Backend, Account } from './ETH_like';
export * from './ETH_compiled';
export declare const connector = "ETH";
export * as ethers from 'ethers';
export declare const getQueryLowerBound: typeof import("./shared_impl").getQueryLowerBound, setQueryLowerBound: typeof import("./shared_impl").setQueryLowerBound, getValidQueryWindow: () => number | true, setValidQueryWindow: (val: number | true) => void, getProvider: () => Promise<ethImpl.ethers.providers.Provider>, setProvider: (p: Promise<ethImpl.ethers.providers.Provider>) => void, randomUInt: () => ethImpl.ethers.BigNumber, hasRandom: {
    random: () => ethImpl.ethers.BigNumber;
}, setProviderByEnv: (env: ethImpl.ProviderEnv) => void, setProviderByName: (providerName: ethImpl.ProviderName) => void, providerEnvByName: (providerName: ethImpl.ProviderName) => ethImpl.ProviderEnv, setWalletFallback: (wallet: any) => void, walletFallback: (opts: any) => any, balanceOf: (acc: string | import("./ETH_like").Account, token?: string | false) => Promise<ethImpl.ethers.BigNumber>, balancesOf: (acc: string | import("./ETH_like").Account, tokens: (string | null)[]) => Promise<ethImpl.ethers.BigNumber[]>, minimumBalanceOf: (acc: string | import("./ETH_like").Account) => Promise<ethImpl.ethers.BigNumber>, transfer: (from: import("./ETH_like").Account | {
    networkAccount: import("./ETH_like").NetworkAccount;
    getGasLimit?: any;
    getStorageLimit?: any;
}, to: import("./ETH_like").Account | {
    networkAccount: import("./ETH_like").NetworkAccount;
    getGasLimit?: any;
    getStorageLimit?: any;
}, value: any, token?: string | false) => Promise<ethImpl.ethers.providers.TransactionReceipt>, connectAccount: (networkAccount: import("./ETH_like").NetworkAccount) => Promise<import("./ETH_like").Account>, newAccountFromSecret: (secret: string) => Promise<import("./ETH_like").Account>, newAccountFromMnemonic: (phrase: string) => Promise<import("./ETH_like").Account>, getDefaultAccount: () => Promise<import("./ETH_like").Account>, getFaucet: () => Promise<import("./ETH_like").Account>, setFaucet: (val: Promise<import("./ETH_like").Account>) => void, createAccount: () => Promise<import("./ETH_like").Account>, canFundFromFaucet: () => Promise<boolean>, fundFromFaucet: (account: import("./ETH_like").Account | {
    networkAccount: import("./ETH_like").NetworkAccount;
    getGasLimit?: any;
    getStorageLimit?: any;
}, value: any) => Promise<any>, newTestAccount: (startingBalance: any) => Promise<import("./ETH_like").Account>, newTestAccounts: (k: number, bal: any) => Promise<import("./ETH_like").Account[]>, getNetworkTime: () => Promise<ethImpl.ethers.BigNumber>, waitUntilTime: (target: ethImpl.ethers.BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<ethImpl.ethers.BigNumber>, wait: (delta: ethImpl.ethers.BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<ethImpl.ethers.BigNumber>, getNetworkSecs: () => Promise<ethImpl.ethers.BigNumber>, waitUntilSecs: (target: ethImpl.ethers.BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<ethImpl.ethers.BigNumber>, verifyContract: (ctcInfo: string, backend: import("./ETH_like").Backend) => Promise<{
    creationBlock: ethImpl.ethers.BigNumber;
}>, standardUnit: string, atomicUnit: string, parseCurrency: (amt: import("./shared_impl").CurrencyAmount) => ethImpl.ethers.BigNumber, minimumBalance: ethImpl.ethers.BigNumber, formatCurrency: (amt: any, decimals?: number) => string, formatAddress: (acc: string | import("./ETH_like").NetworkAccount | import("./ETH_like").Account) => string, unsafeGetMnemonic: (acc: import("./ETH_like").NetworkAccount | import("./ETH_like").Account) => string, launchToken: (accCreator: import("./ETH_like").Account, name: string, sym: string, opts?: any) => Promise<{
    name: string;
    sym: string;
    id: any;
    mint: (accTo: import("./ETH_like").Account, amt: any) => Promise<void>;
    optOut: (accFrom: import("./ETH_like").Account, accTo?: import("./ETH_like").Account) => Promise<void>;
}>, reachStdlib: import("./interfaces").Stdlib_Backend<ethImpl.ethLikeCompiled.AnyETH_Ty>, setMinMillisBetweenRequests: () => void, setCustomHttpEventHandler: () => void, setSigningMonitor: import("./shared_impl").SetSigningMonitor;
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, protect: (t: any, v: unknown, ai?: string | undefined) => unknown, assert: (b: boolean, message: string) => void, Array_set: <A>(arr: A[], idx: number, val: A) => A[], eq: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, ge: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, gt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, le: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, lt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, bytesEq: (s1: string, s2: string) => boolean, digestEq: (x: unknown, y: unknown) => boolean;
export * from './shared_user';
//# sourceMappingURL=ETH.d.ts.map