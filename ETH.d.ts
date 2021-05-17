import * as ethImpl from './ETH_impl';
export * from './ETH_compiled';
export declare const connector = "ETH";
export declare const getProvider: any, setProvider: any, randomUInt: () => ethImpl.ethers.ethers.BigNumber, hasRandom: {
    random: () => ethImpl.ethers.ethers.BigNumber;
}, setProviderByEnv: any, setProviderByName: any, providerEnvByName: any, balanceOf: (acc: any) => Promise<ethImpl.ethers.ethers.BigNumber>, transfer: (from: any, to: any, value: any, token?: string | false) => Promise<any>, connectAccount: (networkAccount: import("./ETH_like_interfaces").EthersLikeSigner | import("./ETH_like_interfaces").EthersLikeWallet | {
    address?: string | undefined;
    getAddress?: (() => Promise<string>) | undefined;
    sendTransaction?: ((...xs: any) => any) | undefined;
    getBalance?: ((...xs: any) => any) | undefined;
}) => Promise<any>, newAccountFromSecret: (secret: string) => Promise<any>, newAccountFromMnemonic: (phrase: string) => Promise<any>, getDefaultAccount: () => Promise<any>, getFaucet: () => Promise<any>, setFaucet: (val: Promise<any>) => void, createAccount: () => Promise<any>, fundFromFaucet: (account: any, value: any) => Promise<void>, newTestAccount: (startingBalance: any) => Promise<any>, getNetworkTime: () => Promise<ethImpl.ethers.ethers.BigNumber>, wait: (delta: ethImpl.ethers.ethers.BigNumber, onProgress?: ethImpl.ethLikeCompiled.OnProgress | undefined) => Promise<ethImpl.ethers.ethers.BigNumber>, waitUntilTime: (targetTime: ethImpl.ethers.ethers.BigNumber, onProgress?: ethImpl.ethLikeCompiled.OnProgress | undefined) => Promise<ethImpl.ethers.ethers.BigNumber>, verifyContract: (ctcInfo: {
    address: string;
    creation_block: number;
    transactionHash: string;
    init?: {
        args: any[];
        value: ethImpl.ethers.ethers.BigNumber;
    } | undefined;
}, backend: ethImpl.ethLikeCompiled.IBackend<ethImpl.ethLikeCompiled.AnyETH_Ty> & {
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
}) => Promise<true>, standardUnit: string, atomicUnit: string, parseCurrency: (amt: ethImpl.ethLikeCompiled.CurrencyAmount) => ethImpl.ethers.ethers.BigNumber, minimumBalance: ethImpl.ethers.ethers.BigNumber, formatCurrency: (amt: any, decimals?: number) => string, formatAddress: (acc: any) => string, reachStdlib: import("./ETH_like_interfaces").BackendStdlib;
//# sourceMappingURL=ETH.d.ts.map