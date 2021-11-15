import { ethers as real_ethers } from 'ethers';
import type { // =>
BigNumber } from 'ethers';
import type { // =>
CurrencyAmount, IAccount, IBackend, IContract, OnProgress } from './shared_impl';
import type { // =>
AnyETH_Ty, Token } from './ETH_like_compiled';
import type { EthersLikeSigner, EthersLikeWallet, EthLikeArgs } from './ETH_like_interfaces';
import type { // =>
Stdlib_Backend } from './interfaces';
declare type Backend = IBackend<AnyETH_Ty> & {
    _Connectors: {
        ETH: {
            version: number;
            ABI: string;
            Bytecode: string;
            views: {
                [viewn: string]: string | {
                    [keyn: string]: string;
                };
            };
        };
    };
};
declare type Address = string;
declare type NetworkAccount = {
    address?: Address;
    getAddress?: () => Promise<Address>;
    sendTransaction?: (...xs: any) => any;
    getBalance?: (...xs: any) => any;
} | EthersLikeWallet | EthersLikeSigner;
declare type ContractInfo = Address;
declare type Contract = IContract<ContractInfo, Address, Token, AnyETH_Ty>;
export declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token> | any;
declare type VerifyResult = {
    creation_block: number;
};
declare type AccountTransferable = Account | {
    networkAccount: NetworkAccount;
};
export declare function makeEthLike(ethLikeArgs: EthLikeArgs): {
    getQueryLowerBound: () => real_ethers.BigNumber;
    setQueryLowerBound: (x: BigNumber | number) => void;
    getValidQueryWindow: () => number | true;
    setValidQueryWindow: (val: number | true) => void;
    getFaucet: () => Promise<any>;
    setFaucet: (val: Promise<any>) => void;
    randomUInt: () => real_ethers.BigNumber;
    hasRandom: {
        random: () => real_ethers.BigNumber;
    };
    balanceOf: (acc: Account, token?: Token | false) => Promise<BigNumber>;
    transfer: (from: AccountTransferable, to: AccountTransferable, value: any, token?: Token | false) => Promise<any>;
    connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
    newAccountFromSecret: (secret: string) => Promise<Account>;
    newAccountFromMnemonic: (phrase: string) => Promise<Account>;
    getDefaultAccount: () => Promise<Account>;
    createAccount: () => Promise<any>;
    canFundFromFaucet: () => Promise<boolean>;
    fundFromFaucet: (account: AccountTransferable, value: any) => Promise<any>;
    newTestAccount: (startingBalance: any) => Promise<Account>;
    newTestAccounts: (k: number, bal: any) => Promise<any[]>;
    getNetworkTime: () => Promise<BigNumber>;
    waitUntilTime: (target: real_ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<real_ethers.BigNumber>;
    wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
    getNetworkSecs: () => Promise<BigNumber>;
    waitUntilSecs: (target: real_ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<real_ethers.BigNumber>;
    verifyContract: (ctcInfo: ContractInfo, backend: Backend) => Promise<VerifyResult>;
    standardUnit: string;
    atomicUnit: string;
    parseCurrency: (amt: CurrencyAmount) => BigNumber;
    minimumBalance: real_ethers.BigNumber;
    formatCurrency: (amt: any, decimals?: number) => string;
    formatAddress: (acc: string | NetworkAccount | Account) => string;
    launchToken: (accCreator: Account, name: string, sym: string, opts?: any) => Promise<{
        name: string;
        sym: string;
        id: any;
        mint: (accTo: Account, amt: any) => Promise<void>;
        optOut: (accFrom: Account, accTo?: Account) => Promise<void>;
    }>;
    reachStdlib: Stdlib_Backend<AnyETH_Ty>;
    getProvider: () => any;
    setProvider: (p: any) => void;
    setProviderByEnv: (env: any) => void;
    setProviderByName: (providerName: any) => void;
    providerEnvByName: (providerName: any) => any;
    setWalletFallback: (wallet: any) => void;
    walletFallback: (opts: any) => any;
    stdlib: import("./interfaces").Stdlib_Backend_Base<AnyETH_Ty>;
    typeDefs: import("./interfaces").TypeDefs;
};
export {};
//# sourceMappingURL=ETH_like.d.ts.map