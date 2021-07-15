import * as ethImpl from './ETH_impl';
export * from './ETH_compiled';
export declare const connector = "ETH";
export declare const getProvider: () => any, setProvider: (p: any) => void, randomUInt: () => ethImpl.ethers.BigNumber, hasRandom: {
    random: () => ethImpl.ethers.BigNumber;
}, setProviderByEnv: (env: any) => void, setProviderByName: (providerName: any) => void, providerEnvByName: (providerName: any) => any, getSignStrategy: () => string, setSignStrategy: (ss: string) => void, balanceOf: (acc: any, token?: string | false) => Promise<ethImpl.ethers.BigNumber>, transfer: (from: any, to: any, value: any, token?: string | false) => Promise<any>, connectAccount: (networkAccount: import("./ETH_like_interfaces").EthersLikeSigner | import("./ETH_like_interfaces").EthersLikeWallet | {
    address?: string | undefined;
    getAddress?: (() => Promise<string>) | undefined;
    sendTransaction?: ((...xs: any) => any) | undefined;
    getBalance?: ((...xs: any) => any) | undefined;
}) => Promise<any>, newAccountFromSecret: (secret: string) => Promise<any>, newAccountFromMnemonic: (phrase: string) => Promise<any>, getDefaultAccount: () => Promise<any>, getFaucet: () => Promise<any>, setFaucet: (val: Promise<any>) => void, createAccount: () => Promise<any>, fundFromFaucet: (account: any, value: any) => Promise<void>, newTestAccount: (startingBalance: any) => Promise<any>, getNetworkTime: () => Promise<ethImpl.ethers.BigNumber>, wait: (delta: ethImpl.ethers.BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<ethImpl.ethers.BigNumber>, waitUntilTime: (targetTime: ethImpl.ethers.BigNumber, onProgress?: import("./shared_impl").OnProgress | undefined) => Promise<ethImpl.ethers.BigNumber>, verifyContract: (ctcInfo: {
    address: string;
    creation_block: number;
    transactionHash: string;
    init?: {
        args: any[];
        value: ethImpl.ethers.BigNumber;
    } | undefined;
}, backend: import("./shared_impl").IBackend<ethImpl.ethLikeCompiled.AnyETH_Ty> & {
    _Connectors: {
        ETH: {
            ABI: string;
            Bytecode: string;
            deployMode: "DM_firstMsg" | "DM_constructor";
            views: {
                [viewn: string]: {
                    [keyn: string]: string;
                };
            };
        };
    };
}) => Promise<true>, standardUnit: string, atomicUnit: string, parseCurrency: (amt: import("./shared_impl").CurrencyAmount) => ethImpl.ethers.BigNumber, minimumBalance: ethImpl.ethers.BigNumber, formatCurrency: (amt: any, decimals?: number) => string, formatAddress: (acc: any) => string, reachStdlib: import("./interfaces").Stdlib_Backend<ethImpl.ethLikeCompiled.AnyETH_Ty>;
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethImpl.ethers.BigNumber, protect: (t: any, v: unknown, ai?: string | undefined) => unknown, assert: (b: boolean, message: string) => void, Array_set: <A>(arr: A[], idx: number, val: A) => A[], eq: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, ge: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, gt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, le: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, lt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, bytesEq: (s1: string, s2: string) => boolean, digestEq: (d1: string, d2: string) => boolean;
export * from './shared_user';
//# sourceMappingURL=ETH.d.ts.map