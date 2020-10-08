import ethers, { BigNumber, Signer } from 'ethers';
import { CurrencyAmount, IContract, IAccount } from './shared';
export * from './shared';
declare type Wallet = ethers.Wallet;
declare type DeployMode = 'DM_firstMsg' | 'DM_constructor';
declare type Backend = {
    _Connectors: {
        ETH: {
            ABI: string;
            Bytecode: string;
            deployMode: DeployMode;
        };
    };
};
declare type Address = string;
declare type NetworkAccount = {
    address?: Address;
    getAddress?: () => Promise<Address>;
    sendTransaction?: (...xs: any) => any;
    getBalance?: (...xs: any) => any;
} | Wallet | Signer;
declare type ContractInfo = {
    address: Address;
    creation_block: number;
    creator: Address;
    transactionHash?: Hash;
    init?: ContractInitInfo;
};
declare type Digest = string;
declare type Contract = IContract<ContractInfo, Digest, Address>;
declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo>;
declare type ContractInitInfo = {
    args: Array<any>;
    value: BigNumber;
};
declare type AccountTransferable = Account | {
    networkAccount: NetworkAccount;
};
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
/** @description Arg order follows "src before dst" convention */
export declare const transfer: (from: AccountTransferable, to: AccountTransferable, value: BigNumber) => Promise<any>;
declare type Hash = string;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare const newAccountFromMnemonic: (phrase: string) => Promise<Account>;
export declare const newTestAccount: (startingBalance: BigNumber) => Promise<Account>;
export declare const getNetworkTime: () => Promise<BigNumber>;
declare type OnProgress = (obj: {
    currentTime: BigNumber;
    targetTime: BigNumber;
}) => any;
export declare const wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const waitUntilTime: (targetTime: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const verifyContract: (ctcInfo: ContractInfo, backend: Backend) => Promise<true>;
/** @description the display name of the standard unit of currency for the network */
export declare const standardUnit = "ETH";
/** @description the display name of the atomic (smallest) unit of currency for the network */
export declare const atomicUnit = "WEI";
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100000000000000000000'
 */
export declare function parseCurrency(amt: CurrencyAmount): BigNumber;
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000000000000000')); // => '100'
 */
export declare function formatCurrency(amt: BigNumber, decimals?: number): string;
//# sourceMappingURL=ETH.d.ts.map