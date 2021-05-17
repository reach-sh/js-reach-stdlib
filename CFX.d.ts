import * as cfxImpl from "./CFX_impl";
export * from './CFX_compiled';
export declare const connector = "CFX";
export declare const getProvider: any, setProvider: any, randomUInt: () => import("ethers").BigNumber, hasRandom: {
    random: () => import("ethers").BigNumber;
}, setProviderByEnv: any, setProviderByName: any, providerEnvByName: any, balanceOf: (acc: any) => Promise<import("ethers").BigNumber>, transfer: (from: any, to: any, value: any, token?: string | false) => Promise<any>, connectAccount: (networkAccount: import("./ETH_like_interfaces").EthersLikeSigner | import("./ETH_like_interfaces").EthersLikeWallet | {
    address?: string | undefined;
    getAddress?: (() => Promise<string>) | undefined;
    sendTransaction?: ((...xs: any) => any) | undefined;
    getBalance?: ((...xs: any) => any) | undefined;
}) => Promise<any>, newAccountFromSecret: (secret: string) => Promise<any>, newAccountFromMnemonic: (phrase: string) => Promise<any>, getDefaultAccount: () => Promise<any>, getFaucet: () => Promise<any>, setFaucet: (val: Promise<any>) => void, createAccount: () => Promise<any>, fundFromFaucet: (account: any, value: any) => Promise<void>, newTestAccount: (startingBalance: any) => Promise<any>, getNetworkTime: () => Promise<import("ethers").BigNumber>, wait: (delta: import("ethers").BigNumber, onProgress?: cfxImpl.ethLikeCompiled.OnProgress | undefined) => Promise<import("ethers").BigNumber>, waitUntilTime: (targetTime: import("ethers").BigNumber, onProgress?: cfxImpl.ethLikeCompiled.OnProgress | undefined) => Promise<import("ethers").BigNumber>, verifyContract: (ctcInfo: {
    address: string;
    creation_block: number;
    transactionHash: string;
    init?: {
        args: any[];
        value: import("ethers").BigNumber;
    } | undefined;
}, backend: cfxImpl.ethLikeCompiled.IBackend<import("./ETH_like_interfaces").AnyETH_Ty> & {
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
}) => Promise<true>, standardUnit: string, atomicUnit: string, parseCurrency: (amt: cfxImpl.ethLikeCompiled.CurrencyAmount) => import("ethers").BigNumber, minimumBalance: import("ethers").BigNumber, formatCurrency: (amt: any, decimals?: number) => string, formatAddress: (acc: any) => string, reachStdlib: import("./ETH_like_interfaces").BackendStdlib;
//# sourceMappingURL=CFX.d.ts.map