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
declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo> | any;
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
}, T_Struct: <T>(ctcs: [string, {
    name: string;
    defaultValue: import("./CBR").CBR_Val;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
    munge: (bv: import("./CBR").CBR_Val) => T;
    unmunge: (nv: T) => import("./CBR").CBR_Val;
    paramType: string;
}][]) => {
    name: string;
    defaultValue: import("./CBR").CBR_Struct;
    canonicalize: (uv: unknown) => import("./CBR").CBR_Struct;
    munge: (bv: import("./CBR").CBR_Struct) => T[];
    unmunge: (nv: T[]) => import("./CBR").CBR_Struct;
    paramType: string;
};
export declare const randomUInt: () => ethers.ethers.BigNumber, hasRandom: {
    random: () => ethers.ethers.BigNumber;
};
export { setProvider };
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
/** @description Arg order follows "src before dst" convention */
export declare const transfer: (from: AccountTransferable, to: AccountTransferable, value: any) => Promise<any>;
export declare const connectAccount: (networkAccount: NetworkAccount, _label: string) => Promise<Account>;
export declare const newAccountFromSecret: (secret: string, label: string) => Promise<Account>;
export declare const newAccountFromMnemonic: (phrase: string, label: string) => Promise<Account>;
export declare const getDefaultAccount: (label: string) => Promise<Account>;
export declare const getFaucet: () => Promise<any>, setFaucet: (val: Promise<any>) => void;
export declare const createAccount: (label: string) => Promise<any>;
export declare const fundFromFaucet: (account: AccountTransferable, value: any) => Promise<void>;
export declare const newTestAccount: (startingBalance: any, label: string) => Promise<Account>;
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
export declare const reachStdlib: {
    addressEq: (x: any, y: any) => boolean;
    digest: (t: any, v: any) => string;
    UInt_max: ethers.ethers.BigNumber;
    T_Null: {
        name: string;
        defaultValue: null;
        canonicalize: (uv: unknown) => null;
        munge: (bv: null) => false;
        unmunge: (nv: false) => null;
        paramType: string;
    };
    T_Bool: {
        name: string;
        defaultValue: boolean;
        canonicalize: (uv: unknown) => boolean;
        munge: (bv: boolean) => boolean;
        unmunge: (nv: boolean) => boolean;
        paramType: string;
    };
    T_UInt: {
        name: string;
        defaultValue: ethers.ethers.BigNumber;
        canonicalize: (uv: unknown) => ethers.ethers.BigNumber;
        munge: (bv: ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
        unmunge: (nv: ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
        paramType: string;
    };
    T_Bytes: (len: number) => {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => number[];
        unmunge: (nv: number[]) => string;
        paramType: string;
    };
    T_Address: {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => string;
        unmunge: (nv: string) => string;
        paramType: string;
    };
    T_Digest: {
        name: string;
        defaultValue: string;
        canonicalize: (uv: unknown) => string;
        munge: (bv: string) => ethers.ethers.BigNumber;
        unmunge: (nv: ethers.ethers.BigNumber) => string;
        paramType: string;
    };
    T_Object: <T>(co: {
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
    };
    T_Data: <T_1>(co: {
        [key: string]: {
            name: string;
            defaultValue: import("./CBR").CBR_Val;
            canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
            munge: (bv: import("./CBR").CBR_Val) => T_1;
            unmunge: (nv: T_1) => import("./CBR").CBR_Val;
            paramType: string;
        };
    }) => {
        name: string;
        defaultValue: import("./CBR").CBR_Data;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Data;
        munge: (bv: import("./CBR").CBR_Data) => T_1[];
        unmunge: (nv: T_1[]) => import("./CBR").CBR_Data;
        paramType: string;
    };
    T_Array: <T_2>(ctc: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T_2;
        unmunge: (nv: T_2) => import("./CBR").CBR_Val;
        paramType: string;
    }, size: number) => {
        name: string;
        defaultValue: import("./CBR").CBR_Array;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Array;
        munge: (bv: import("./CBR").CBR_Array) => T_2[];
        unmunge: (nv: T_2[]) => import("./CBR").CBR_Array;
        paramType: string;
    };
    T_Tuple: <T_3>(ctcs: {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T_3;
        unmunge: (nv: T_3) => import("./CBR").CBR_Val;
        paramType: string;
    }[]) => {
        name: string;
        defaultValue: import("./CBR").CBR_Tuple;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Tuple;
        munge: (bv: import("./CBR").CBR_Tuple) => T_3[];
        unmunge: (nv: T_3[]) => import("./CBR").CBR_Tuple;
        paramType: string;
    };
    T_Struct: <T_4>(ctcs: [string, {
        name: string;
        defaultValue: import("./CBR").CBR_Val;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Val;
        munge: (bv: import("./CBR").CBR_Val) => T_4;
        unmunge: (nv: T_4) => import("./CBR").CBR_Val;
        paramType: string;
    }][]) => {
        name: string;
        defaultValue: import("./CBR").CBR_Struct;
        canonicalize: (uv: unknown) => import("./CBR").CBR_Struct;
        munge: (bv: import("./CBR").CBR_Struct) => T_4[];
        unmunge: (nv: T_4[]) => import("./CBR").CBR_Struct;
        paramType: string;
    };
    protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
    Array_set<T_5>(arr: T_5[], idx: number, elem: T_5): T_5[];
    setDEBUG: (b: boolean) => void;
    getDEBUG: () => boolean;
    debug: (msg: any) => void;
    assert: (d: any, ai?: any) => void;
    isBigNumber: typeof ethers.ethers.BigNumber.isBigNumber;
    bigNumberify: (x: any) => ethers.ethers.BigNumber;
    bigNumberToNumber: (x: any) => number;
    checkedBigNumberify: (at: string, m: ethers.ethers.BigNumber, x: any) => ethers.ethers.BigNumber;
    isHex: typeof ethers.ethers.utils.isHexString;
    hexToString: typeof ethers.ethers.utils.toUtf8String;
    stringToHex: (x: string) => string;
    makeDigest: (prep: any) => (t: any, v: any) => string;
    hexToBigNumber: (h: string) => ethers.ethers.BigNumber;
    uintToBytes: (i: ethers.ethers.BigNumber) => string;
    bigNumberToHex: (u: number | ethers.ethers.BigNumber, size?: number) => string;
    bytesEq: (x: any, y: any) => boolean;
    digestEq: (x: any, y: any) => boolean;
    makeRandom: (width: number) => {
        randomUInt: () => ethers.ethers.BigNumber;
        hasRandom: {
            random: () => ethers.ethers.BigNumber;
        };
    };
    eq: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    add: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    sub: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    mod: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    mul: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    div: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    ge: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    gt: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    le: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    lt: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    argsSlice: <T_6>(args: T_6[], cnt: number) => T_6[];
    argsSplit: <T_7>(args: T_7[], cnt: number) => [T_7[], T_7[]];
    Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
    mapRef: (m: any, f: any) => any;
    mkAddressEq: (T_Address: {
        canonicalize: (addr: any) => any;
    }) => (x: any, y: any) => boolean;
    parseFixedPoint: (x: {
        sign: boolean;
        i: {
            i: number | ethers.ethers.BigNumber;
            scale: number | ethers.ethers.BigNumber;
        };
    }) => number;
    parseInt: (x: {
        sign: boolean;
        i: number | ethers.ethers.BigNumber;
    }) => number;
};
//# sourceMappingURL=ETH.d.ts.map