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
declare type DeployMode = 'DM_firstMsg' | 'DM_constructor';
declare type Backend = IBackend<AnyETH_Ty> & {
    _Connectors: {
        ETH: {
            ABI: string;
            Bytecode: string;
            deployMode: DeployMode;
            views: {
                [viewn: string]: {
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
declare type Hash = string;
declare type ContractInfo = {
    address: Address;
    creation_block: number;
    transactionHash: Hash;
    init?: ContractInitInfo;
};
declare type Digest = string;
declare type Contract = IContract<ContractInfo, Digest, Address, Token, AnyETH_Ty>;
export declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token> | any;
declare type ContractInitInfo = {
    args: Array<any>;
    value: BigNumber;
};
declare type AccountTransferable = Account | {
    networkAccount: NetworkAccount;
};
export declare function makeEthLike(ethLikeArgs: EthLikeArgs): {
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
    fundFromFaucet: (account: AccountTransferable, value: any) => Promise<void>;
    newTestAccount: (startingBalance: any) => Promise<Account>;
    getNetworkTime: () => Promise<BigNumber>;
    wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
    waitUntilTime: (targetTime: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
    verifyContract: (ctcInfo: ContractInfo, backend: Backend) => Promise<true>;
    standardUnit: string;
    atomicUnit: string;
    parseCurrency: (amt: CurrencyAmount) => BigNumber;
    minimumBalance: real_ethers.BigNumber;
    formatCurrency: (amt: any, decimals?: number) => string;
    formatAddress: (acc: string | NetworkAccount | Account) => string;
    reachStdlib: Stdlib_Backend<AnyETH_Ty>;
    getProvider: () => any;
    setProvider: (p: any) => void;
    setProviderByEnv: (env: any) => void;
    setProviderByName: (providerName: any) => void;
    providerEnvByName: (providerName: any) => any;
    getSignStrategy: () => string;
    setSignStrategy: (ss: string) => void;
    stdlib: import("./interfaces").Stdlib_Backend_Base<AnyETH_Ty>;
    typeDefs: import("./interfaces").TypeDefs;
};
export {};
//# sourceMappingURL=ETH_like.d.ts.map