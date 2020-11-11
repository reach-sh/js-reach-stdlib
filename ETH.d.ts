import ethers, { Signer } from 'ethers';
import { CurrencyAmount, IAccount, IContract, OnProgress } from './shared';
import * as CBR from './CBR';
import { CBR_Null, CBR_Bool, CBR_UInt, CBR_Bytes, CBR_Address, CBR_Digest, CBR_Object, CBR_Data, CBR_Array, CBR_Tuple, CBR_Val } from './CBR';
export * from './shared';
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare const UInt_max: BigNumber;
export declare const randomUInt: () => ethers.ethers.BigNumber, hasRandom: {
    random: () => ethers.ethers.BigNumber;
};
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
declare type Contract = IContract<ContractInfo, Digest, Address, AnyETH_Ty>;
declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo>;
declare type ContractInitInfo = {
    args: Array<any>;
    value: BigNumber;
};
declare type AccountTransferable = Account | {
    networkAccount: NetworkAccount;
};
declare type ETH_Ty<BV extends CBR_Val, NV> = {
    name: string;
    defaultValue: BV;
    canonicalize: (uv: unknown) => BV;
    munge: (bv: BV) => NV;
    unmunge: (nv: NV) => BV;
    /** @description describes the shape of the munged value */
    paramType: string;
};
declare type AnyETH_Ty = ETH_Ty<CBR_Val, any>;
export declare const digest: (t: any, v: any) => string;
export declare const T_Null: ETH_Ty<CBR_Null, false>;
export declare const T_Bool: ETH_Ty<CBR_Bool, boolean>;
export declare const T_UInt: ETH_Ty<CBR_UInt, BigNumber>;
export declare const T_Bytes: (len: number) => ETH_Ty<CBR_Bytes, Array<number>>;
export declare const T_Digest: ETH_Ty<CBR_Digest, BigNumber>;
export declare const T_Address: ETH_Ty<CBR_Address, string>;
export declare const T_Array: <T>(ctc: ETH_Ty<CBR.CBR_Val, T>, size: number) => ETH_Ty<CBR.CBR_Array, T[]>;
export declare const T_Tuple: <T>(ctcs: ETH_Ty<CBR.CBR_Val, T>[]) => ETH_Ty<CBR.CBR_Tuple, T[]>;
export declare const T_Object: <T>(co: {
    [key: string]: ETH_Ty<CBR.CBR_Val, T>;
}) => ETH_Ty<CBR.CBR_Object, {
    [key: string]: T;
}>;
export declare const T_Data: <T>(co: {
    [key: string]: ETH_Ty<CBR.CBR_Val, T>;
}) => ETH_Ty<CBR.CBR_Data, T[]>;
declare const setProvider: (val: Promise<ethers.ethers.providers.Provider>) => void;
export { setProvider };
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
/** @description Arg order follows "src before dst" convention */
export declare const transfer: (from: AccountTransferable, to: AccountTransferable, value: BigNumber) => Promise<any>;
declare type Hash = string;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare const newAccountFromSecret: (secret: string) => Promise<Account>;
export declare const newAccountFromMnemonic: (phrase: string) => Promise<Account>;
export declare const getDefaultAccount: () => Promise<IAccount<NetworkAccount, Backend, IContract<ContractInfo, string, string, ETH_Ty<CBR.CBR_Val, any>>, ContractInfo>>;
export declare const getFaucet: () => Promise<IAccount<NetworkAccount, Backend, IContract<ContractInfo, string, string, ETH_Ty<CBR.CBR_Val, any>>, ContractInfo>>, setFaucet: (val: Promise<IAccount<NetworkAccount, Backend, IContract<ContractInfo, string, string, ETH_Ty<CBR.CBR_Val, any>>, ContractInfo>>) => void;
export declare const newTestAccount: (startingBalance: BigNumber) => Promise<Account>;
export declare const getNetworkTime: () => Promise<BigNumber>;
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
export declare const minimumBalance: BigNumber;
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
export declare const addressEq: (x: any, y: any) => boolean;
//# sourceMappingURL=ETH.d.ts.map