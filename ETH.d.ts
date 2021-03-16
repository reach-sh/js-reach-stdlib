import ethers, { Signer } from 'ethers';
import { CurrencyAmount, IAccount, IContract, OnProgress } from './shared';
export * from './shared';
import { AnyETH_Ty } from './ETH_compiled';
declare type BigNumber = ethers.BigNumber;
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
declare type Hash = string;
declare const setProvider: (val: Promise<ethers.ethers.providers.Provider>) => void;
export declare const addressEq: (x: any, y: any) => boolean, digest: (t: any, v: any) => string;
export declare const T_Null: {
    name: string;
    defaultValue: null;
    canonicalize: (uv: unknown) => null;
    munge: (bv: null) => false;
    unmunge: (nv: false) => null;
    paramType: string;
}, T_Bool: {
    name: string;
    defaultValue: boolean;
    canonicalize: (uv: unknown) => boolean;
    munge: (bv: boolean) => boolean;
    unmunge: (nv: boolean) => boolean;
    paramType: string;
}, T_UInt: {
    name: string;
    defaultValue: ethers.ethers.BigNumber;
    canonicalize: (uv: unknown) => ethers.ethers.BigNumber;
    munge: (bv: ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    unmunge: (nv: ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    paramType: string;
}, T_Tuple: <T>(ctcs: {
    name: string;
    defaultValue: import("./CBR").CBR_Val;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
    munge: (bv: import("./CBR").CBR_Val) => T;
    unmunge: (nv: T) => import("./CBR").CBR_Val;
    paramType: string;
}[]) => {
    name: string;
    defaultValue: import("./CBR").CBR_Tuple;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Tuple;
    munge: (bv: import("./CBR").CBR_Tuple) => T[];
    unmunge: (nv: T[]) => import("./CBR").CBR_Tuple;
    paramType: string;
}, T_Array: <T>(ctc: {
    name: string;
    defaultValue: import("./CBR").CBR_Val;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
    munge: (bv: import("./CBR").CBR_Val) => T;
    unmunge: (nv: T) => import("./CBR").CBR_Val;
    paramType: string;
}, size: number) => {
    name: string;
    defaultValue: import("./CBR").CBR_Array;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Array;
    munge: (bv: import("./CBR").CBR_Array) => T[];
    unmunge: (nv: T[]) => import("./CBR").CBR_Array;
    paramType: string;
}, T_Object: <T>(co: {
    [key: string]: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T;
        unmunge: (nv: T) => import("./CBR").CBR_Val;
        paramType: string;
    };
}) => {
    name: string;
    defaultValue: import("./CBR").CBR_Object;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Object;
    munge: (bv: import("./CBR").CBR_Object) => {
        [key: string]: T;
    };
    unmunge: (nv: {
        [key: string]: T;
    }) => import("./CBR").CBR_Object;
    paramType: string;
}, T_Data: <T>(co: {
    [key: string]: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T;
        unmunge: (nv: T) => import("./CBR").CBR_Val;
        paramType: string;
    };
}) => {
    name: string;
    defaultValue: import("./CBR").CBR_Data;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Data;
    munge: (bv: import("./CBR").CBR_Data) => T[];
    unmunge: (nv: T[]) => import("./CBR").CBR_Data;
    paramType: string;
}, T_Bytes: (len: number) => {
    name: string;
    defaultValue: string;
    canonicalize: (uv: unknown) => string;
    munge: (bv: string) => number[];
    unmunge: (nv: number[]) => string;
    paramType: string;
}, T_Address: {
    name: string;
    defaultValue: string;
    canonicalize: (uv: unknown) => string;
    munge: (bv: string) => string;
    unmunge: (nv: string) => string;
    paramType: string;
}, T_Digest: {
    name: string;
    defaultValue: string;
    canonicalize: (uv: unknown) => string;
    munge: (bv: string) => ethers.ethers.BigNumber;
    unmunge: (nv: ethers.ethers.BigNumber) => string;
    paramType: string;
};
export declare const randomUInt: () => ethers.ethers.BigNumber, hasRandom: {
    random: () => ethers.ethers.BigNumber;
};
export { setProvider };
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
/** @description Arg order follows "src before dst" convention */
export declare const transfer: (from: AccountTransferable, to: AccountTransferable, value: any) => Promise<any>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare const newAccountFromSecret: (secret: string) => Promise<Account>;
export declare const newAccountFromMnemonic: (phrase: string) => Promise<Account>;
export declare const getDefaultAccount: () => Promise<Account>;
export declare const getFaucet: () => Promise<Account>, setFaucet: (val: Promise<Account>) => void;
export declare const createAccount: () => Promise<Account>;
export declare const fundFromFaucet: (account: AccountTransferable, value: any) => Promise<void>;
export declare const newTestAccount: (startingBalance: any) => Promise<Account>;
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
export declare function formatCurrency(amt: any, decimals?: number): string;
//# sourceMappingURL=ETH.d.ts.map