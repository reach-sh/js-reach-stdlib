import { ethers as real_ethers } from 'ethers';
import { SecretKeyInput, Mnemonic } from './shared_impl';
import type { // =>
BigNumber } from 'ethers';
import type { // =>
IAccount, IBackend, IContract, OnProgress, LaunchTokenOpts } from './shared_impl';
import type { // =>
AnyETH_Ty, Token } from './ETH_like_compiled';
export type { Token } from './ETH_like_compiled';
export type Ty = AnyETH_Ty;
import type { // =>
EthersLikeContract, EthersLikeSigner, EthersLikeWallet, EthersLikeProvider, EthLikeArgs, TransactionReceipt, Address } from './ETH_like_interfaces';
export type { Address, } from './ETH_like_interfaces';
import type { // =>
Stdlib_Backend } from './interfaces';
import { setQueryLowerBound, getQueryLowerBound } from './shared_impl';
export { setQueryLowerBound, getQueryLowerBound };
type TransactionResponse = real_ethers.providers.TransactionResponse;
export type Backend = IBackend<AnyETH_Ty> & {
    _Connectors: {
        ETH: {
            version: number;
            ABI: string;
            Bytecode: string;
        };
    };
};
export type NetworkAccount = {
    address?: Address;
    getAddress?: () => Promise<Address>;
    sendTransaction?: (...xs: any) => Promise<TransactionResponse>;
    getBalance?: (...xs: any) => any;
    _mnemonic?: () => {
        phrase: string;
    };
} | EthersLikeWallet | EthersLikeSigner;
export type ContractInfo = Address;
export type Contract = IContract<ContractInfo, Address, Token, AnyETH_Ty>;
export type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
type VerifyResult = {
    creationBlock: BigNumber;
};
type AccountTransferable = Account | {
    networkAccount: NetworkAccount;
    getGasLimit?: () => BigNumber;
    getStorageLimit?: () => BigNumber;
};
export declare function makeEthLike<Provider extends EthersLikeProvider, ProviderEnv, ProviderName>(ethLikeArgs: EthLikeArgs<Provider, ProviderEnv, ProviderName>): {
    ethers: import("./ETH_like_interfaces").EthersLike;
    doCall: (dhead: string, ctc: EthersLikeContract, funcName: string, args: Array<any>, value: BigNumber, gasLimit: BigNumber | undefined, storageLimit: BigNumber | undefined) => Promise<TransactionReceipt>;
    getQueryLowerBound: typeof getQueryLowerBound;
    setQueryLowerBound: typeof setQueryLowerBound;
    getValidQueryWindow: () => number | true;
    setValidQueryWindow: (val: number | true) => void;
    getFaucet: () => Promise<Account>;
    setFaucet: (val: Promise<Account>) => void;
    randomUInt: () => real_ethers.BigNumber;
    hasRandom: {
        random: () => real_ethers.BigNumber;
    };
    balanceOf: (acc: Account | Address, token?: Token | false) => Promise<BigNumber>;
    balancesOf: (acc: Account | Address, tokens: Array<Token | null>) => Promise<Array<BigNumber>>;
    minimumBalanceOf: (acc: Account | Address) => Promise<BigNumber>;
    appOptedIn: (_acc: Account | Address, _ctc: ContractInfo) => Promise<boolean>;
    doAppOptIn: (_ctc: ContractInfo) => Promise<void>;
    transfer: (from: AccountTransferable, to: AccountTransferable | Address, value: any, token?: Token) => Promise<TransactionReceipt>;
    connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
    newAccountFromSecret: (secret: SecretKeyInput) => Promise<Account>;
    newAccountFromMnemonic: (phrase: Mnemonic) => Promise<Account>;
    getDefaultAccount: () => Promise<Account>;
    createAccount: () => Promise<Account>;
    canFundFromFaucet: () => Promise<boolean>;
    fundFromFaucet: (account: AccountTransferable | Address, value: any) => Promise<any>;
    newTestAccount: (startingBalance: any) => Promise<Account>;
    newTestAccounts: (k: number, bal: any) => Promise<Account[]>;
    getNetworkTime: () => Promise<BigNumber>;
    waitUntilTime: (target: real_ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<real_ethers.BigNumber>;
    wait: (delta: BigNumber, onProgress?: OnProgress) => Promise<BigNumber>;
    getNetworkSecs: () => Promise<BigNumber>;
    waitUntilSecs: (target: real_ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<real_ethers.BigNumber>;
    verifyContract: (ctcInfo: ContractInfo, backend: Backend) => Promise<VerifyResult>;
    standardUnit: string;
    atomicUnit: string;
    parseCurrency: (amt: import("./shared_impl").CurrencyAmount, decimals?: number) => real_ethers.BigNumber;
    minimumBalance: real_ethers.BigNumber;
    formatCurrency: (amt: any, decimals?: number) => string;
    formatAddress: (acc: string | NetworkAccount | Account | Address) => string;
    formatWithDecimals: (amt: unknown, decimals: number) => string;
    unsafeGetMnemonic: (acc: Account | NetworkAccount) => string;
    launchToken: (accCreator: Account, name: string, sym: string, opts?: LaunchTokenOpts) => Promise<{
        name: string;
        sym: string;
        id: any;
        mint: (to: Account | Address, amt: any) => Promise<void>;
        optOut: (accFrom: Account, accTo?: Account) => Promise<void>;
    }>;
    reachStdlib: Stdlib_Backend<string, string, AnyETH_Ty>;
    setMinMillisBetweenRequests: () => void;
    setCustomHttpEventHandler: () => void;
    setSigningMonitor: import("./shared_impl").SetSigningMonitor;
    getTimeSecs: (now_bn: BigNumber) => Promise<BigNumber>;
    tokensAccepted: (_: Account | Address) => Promise<Array<Token>>;
    getProvider: () => Promise<Provider>;
    setProvider: (p: Promise<Provider>) => void;
    setProviderByEnv: (env: ProviderEnv) => void;
    setProviderByName: (providerName: ProviderName) => void;
    providerEnvByName: (providerName: ProviderName) => ProviderEnv;
    setWalletFallback: (wallet: any) => void;
    walletFallback: (opts: any) => any;
    stdlib: import("./interfaces").Stdlib_Backend_Base<string, string, AnyETH_Ty>;
    typeDefs: import("./interfaces").TypeDefs<AnyETH_Ty>;
};
//# sourceMappingURL=ETH_like.d.ts.map