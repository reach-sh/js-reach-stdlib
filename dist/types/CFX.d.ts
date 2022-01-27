import * as cfxImpl from './CFX_impl';
export type { Provider, ProviderEnv, ProviderName } from './CFX_impl';
export type { Token, ContractInfo, Address, NetworkAccount, Ty, Backend, Account } from './ETH_like';
export * as ethers from './cfxers';
export * from './CFX_compiled';
export declare const connector = "CFX";
export declare const getQueryLowerBound: typeof import("./shared_impl").getQueryLowerBound, setQueryLowerBound: typeof import("./shared_impl").setQueryLowerBound, getValidQueryWindow: () => number | true, setValidQueryWindow: (val: number | true) => void, getProvider: () => Promise<cfxImpl.ethers.providers.Provider>, setProvider: (p: Promise<cfxImpl.ethers.providers.Provider>) => void, randomUInt: () => import("ethers").BigNumber, hasRandom: {
    random: () => import("ethers").BigNumber;
}, setProviderByEnv: (env: cfxImpl.ProviderEnv) => void, setProviderByName: (providerName: cfxImpl.ProviderName) => void, providerEnvByName: (providerName: cfxImpl.ProviderName) => cfxImpl.ProviderEnv, setWalletFallback: (wallet: any) => void, walletFallback: (opts: any) => any, balanceOf: (acc: string | import("./ETH_like").Account, token?: string | false) => Promise<import("ethers").BigNumber>, minimumBalanceOf: (acc: string | import("./ETH_like").Account) => Promise<import("ethers").BigNumber>, transfer: (from: import("./ETH_like").Account | {
    networkAccount: import("./ETH_like").NetworkAccount;
    getGasLimit?: any;
    getStorageLimit?: any;
}, to: import("./ETH_like").Account | {
    networkAccount: import("./ETH_like").NetworkAccount;
    getGasLimit?: any;
    getStorageLimit?: any;
}, value: any, token?: string | false) => Promise<import("@ethersproject/abstract-provider").TransactionReceipt>, connectAccount: (networkAccount: import("./ETH_like").NetworkAccount) => Promise<import("./ETH_like").Account>, newAccountFromSecret: (secret: string) => Promise<import("./ETH_like").Account>, newAccountFromMnemonic: (phrase: string) => Promise<import("./ETH_like").Account>, getDefaultAccount: () => Promise<import("./ETH_like").Account>, getFaucet: () => Promise<import("./ETH_like").Account>, setFaucet: (val: Promise<import("./ETH_like").Account>) => void, createAccount: () => Promise<import("./ETH_like").Account>, canFundFromFaucet: () => Promise<boolean>, fundFromFaucet: (account: import("./ETH_like").Account | {
    networkAccount: import("./ETH_like").NetworkAccount;
    getGasLimit?: any;
    getStorageLimit?: any;
}, value: any) => Promise<any>, newTestAccount: (startingBalance: any) => Promise<import("./ETH_like").Account>, newTestAccounts: (k: number, bal: any) => Promise<import("./ETH_like").Account[]>, getNetworkTime: () => Promise<import("ethers").BigNumber>, waitUntilTime: (target: import("ethers").BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<import("ethers").BigNumber>, wait: (delta: import("ethers").BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<import("ethers").BigNumber>, getNetworkSecs: () => Promise<import("ethers").BigNumber>, waitUntilSecs: (target: import("ethers").BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<import("ethers").BigNumber>, verifyContract: (ctcInfo: string, backend: import("./ETH_like").Backend) => Promise<{
    creationBlock: import("ethers").BigNumber;
}>, standardUnit: string, atomicUnit: string, parseCurrency: (amt: import("./shared_impl").CurrencyAmount) => import("ethers").BigNumber, minimumBalance: import("ethers").BigNumber, formatCurrency: (amt: any, decimals?: number) => string, formatAddress: (acc: string | import("./ETH_like").NetworkAccount | import("./ETH_like").Account) => string, unsafeGetMnemonic: (acc: import("./ETH_like").NetworkAccount | import("./ETH_like").Account) => string, launchToken: (accCreator: import("./ETH_like").Account, name: string, sym: string, opts?: any) => Promise<{
    name: string;
    sym: string;
    id: any;
    mint: (accTo: import("./ETH_like").Account, amt: any) => Promise<void>;
    optOut: (accFrom: import("./ETH_like").Account, accTo?: import("./ETH_like").Account) => Promise<void>;
}>, reachStdlib: import("./interfaces").Stdlib_Backend<import("./ETH_like_interfaces").AnyETH_Ty>, setMinMillisBetweenRequests: () => void, setCustomHttpEventHandler: () => void;
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, protect: (t: any, v: unknown, ai?: string | undefined) => unknown, assert: (b: boolean, message: string) => void, Array_set: <A>(arr: A[], idx: number, val: A) => A[], eq: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, ge: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, gt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, le: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, lt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, bytesEq: (s1: string, s2: string) => boolean, digestEq: (x: unknown, y: unknown) => boolean;
export * from './shared_user';
//# sourceMappingURL=CFX.d.ts.map