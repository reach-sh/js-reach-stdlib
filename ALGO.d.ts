import algosdk from 'algosdk';
import ethers from 'ethers';
import { CurrencyAmount, OnProgress } from './shared';
import { CBR_Address, CBR_Val } from './CBR';
import { ALGO_Ty } from './ALGO_compiled';
export * from './shared';
declare type BigNumber = ethers.BigNumber;
declare type Address = string;
declare type SecretKey = Uint8Array;
declare type AlgoSigner = {
    sign: (txn: TXN) => Promise<{
        blob: string;
        txID: string;
    }>;
    accounts: (args: {
        ledger: string;
    }) => Promise<Array<{
        address: string;
    }>>;
};
declare type Wallet = {
    addr: Address;
    sk?: SecretKey;
    AlgoSigner?: AlgoSigner;
};
declare type TxnInfo = {
    'confirmed-round': number;
    'application-index'?: number;
};
declare type NetworkAccount = Wallet;
declare type Account = {
    networkAccount: NetworkAccount;
};
declare type Backend = {
    _Connectors: {
        ALGO: {
            appApproval0: string;
            appApproval: string;
            appClear: string;
            ctc: string;
            steps: Array<string | null>;
            stepargs: Array<number>;
            unsupported: boolean;
        };
    };
};
declare type Recv = {
    didTimeout: false;
    data: Array<ContractOut>;
    time: BigNumber;
    value: BigNumber;
    from: string;
    getOutput: (o_lab: string, o_ctc: any) => Promise<any>;
} | {
    didTimeout: true;
};
declare type ContractAttached = {
    getInfo: () => Promise<ContractInfo>;
    creationTime: () => Promise<BigNumber>;
    sendrecv: (...argz: any) => Promise<Recv>;
    recv: (...argz: any) => Promise<Recv>;
    wait: (...argz: any) => any;
    iam: (some_addr: any) => any;
    selfAddress: () => CBR_Address;
    stdlib: Object;
};
declare type ContractOut = any;
declare type ContractInfo = {
    getInfo?: () => Promise<ContractInfo>;
    creationRound: number;
    ApplicationID: number;
    Deployer: Address;
};
declare const setWaitPort: (val: boolean) => void;
export { setWaitPort };
declare const setBrowser: (b: boolean) => void;
export { setBrowser };
declare type SignStrategy = 'mnemonic' | 'AlgoSigner' | 'MyAlgo';
declare const getSignStrategy: () => SignStrategy, setSignStrategy: (val: SignStrategy) => void;
export { getSignStrategy, setSignStrategy };
declare const setAlgoSigner: (val: Promise<AlgoSigner>) => void;
export { setAlgoSigner };
declare type TXN = any;
export declare const addressEq: (x: any, y: any) => boolean, digest: (t: any, v: any) => string;
export declare const T_Null: ALGO_Ty<null>, T_Bool: ALGO_Ty<boolean>, T_UInt: ALGO_Ty<ethers.ethers.BigNumber>, T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>, T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>, T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Object>, T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Data>, T_Bytes: (len: number) => ALGO_Ty<string>, T_Address: ALGO_Ty<string>, T_Digest: ALGO_Ty<string>, T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
export declare const randomUInt: () => ethers.ethers.BigNumber, hasRandom: {
    random: () => ethers.ethers.BigNumber;
};
declare const setAlgodClient: (val: Promise<algosdk.Algodv2>) => void;
export { setAlgodClient };
declare const setIndexer: (val: Promise<algosdk.Indexer>) => void;
export { setIndexer };
declare const getFaucet: () => Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
    getAddress: () => CBR_Address;
    stdlib: {
        addressEq: (x: any, y: any) => boolean;
        digest: (t: any, v: any) => string;
        UInt_max: ethers.ethers.BigNumber;
        T_Null: ALGO_Ty<null>;
        T_Bool: ALGO_Ty<boolean>;
        T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
        T_Bytes: (len: number) => ALGO_Ty<string>;
        T_Address: ALGO_Ty<string>;
        T_Digest: ALGO_Ty<string>;
        T_Object: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Object>;
        T_Data: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Data>;
        T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>;
        T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>;
        T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
        protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
        Array_set<T>(arr: T[], idx: number, elem: T): T[];
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
        argsSlice: <T_1>(args: T_1[], cnt: number) => T_1[];
        argsSplit: <T_2>(args: T_2[], cnt: number) => [T_2[], T_2[]];
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
}>, setFaucet: (val: Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
    getAddress: () => CBR_Address;
    stdlib: {
        addressEq: (x: any, y: any) => boolean;
        digest: (t: any, v: any) => string;
        UInt_max: ethers.ethers.BigNumber;
        T_Null: ALGO_Ty<null>;
        T_Bool: ALGO_Ty<boolean>;
        T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
        T_Bytes: (len: number) => ALGO_Ty<string>;
        T_Address: ALGO_Ty<string>;
        T_Digest: ALGO_Ty<string>;
        T_Object: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Object>;
        T_Data: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Data>;
        T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>;
        T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>;
        T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
        protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
        Array_set<T>(arr: T[], idx: number, elem: T): T[];
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
        argsSlice: <T_1>(args: T_1[], cnt: number) => T_1[];
        argsSplit: <T_2>(args: T_2[], cnt: number) => [T_2[], T_2[]];
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
}>) => void;
export { getFaucet, setFaucet };
export declare const transfer: (from: Account, to: Account, value: any) => Promise<TxnInfo>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
    getAddress: () => CBR_Address;
    stdlib: {
        addressEq: (x: any, y: any) => boolean;
        digest: (t: any, v: any) => string;
        UInt_max: ethers.ethers.BigNumber;
        T_Null: ALGO_Ty<null>;
        T_Bool: ALGO_Ty<boolean>;
        T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
        T_Bytes: (len: number) => ALGO_Ty<string>;
        T_Address: ALGO_Ty<string>;
        T_Digest: ALGO_Ty<string>;
        T_Object: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Object>;
        T_Data: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Data>;
        T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>;
        T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>;
        T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
        protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
        Array_set<T>(arr: T[], idx: number, elem: T): T[];
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
        argsSlice: <T_1>(args: T_1[], cnt: number) => T_1[];
        argsSplit: <T_2>(args: T_2[], cnt: number) => [T_2[], T_2[]];
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
}>;
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
export declare const createAccount: () => Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
    getAddress: () => CBR_Address;
    stdlib: {
        addressEq: (x: any, y: any) => boolean;
        digest: (t: any, v: any) => string;
        UInt_max: ethers.ethers.BigNumber;
        T_Null: ALGO_Ty<null>;
        T_Bool: ALGO_Ty<boolean>;
        T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
        T_Bytes: (len: number) => ALGO_Ty<string>;
        T_Address: ALGO_Ty<string>;
        T_Digest: ALGO_Ty<string>;
        T_Object: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Object>;
        T_Data: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Data>;
        T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>;
        T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>;
        T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
        protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
        Array_set<T>(arr: T[], idx: number, elem: T): T[];
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
        argsSlice: <T_1>(args: T_1[], cnt: number) => T_1[];
        argsSplit: <T_2>(args: T_2[], cnt: number) => [T_2[], T_2[]];
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
}>;
export declare const fundFromFaucet: (account: Account, value: any) => Promise<void>;
export declare const newTestAccount: (startingBalance: any) => Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
    getAddress: () => CBR_Address;
    stdlib: {
        addressEq: (x: any, y: any) => boolean;
        digest: (t: any, v: any) => string;
        UInt_max: ethers.ethers.BigNumber;
        T_Null: ALGO_Ty<null>;
        T_Bool: ALGO_Ty<boolean>;
        T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
        T_Bytes: (len: number) => ALGO_Ty<string>;
        T_Address: ALGO_Ty<string>;
        T_Digest: ALGO_Ty<string>;
        T_Object: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Object>;
        T_Data: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Data>;
        T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>;
        T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>;
        T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
        protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
        Array_set<T>(arr: T[], idx: number, elem: T): T[];
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
        argsSlice: <T_1>(args: T_1[], cnt: number) => T_1[];
        argsSplit: <T_2>(args: T_2[], cnt: number) => [T_2[], T_2[]];
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
}>;
/** @description the display name of the standard unit of currency for the network */
export declare const standardUnit = "ALGO";
/** @description the display name of the atomic (smallest) unit of currency for the network */
export declare const atomicUnit = "\u03BCALGO";
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100000000'
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
 * @example  formatCurrency(bigNumberify('100000000')); // => '100'
 */
export declare function formatCurrency(amt: any, decimals?: number): string;
export declare function getDefaultAccount(): Promise<Account>;
/**
 * @param mnemonic 25 words, space-separated
 */
export declare const newAccountFromMnemonic: (mnemonic: string) => Promise<Account>;
/**
 * @param secret a Uint8Array, or its hex string representation
 */
export declare const newAccountFromSecret: (secret: string | Uint8Array) => Promise<Account>;
export declare const newAccountFromAlgoSigner: (addr: string, AlgoSigner: AlgoSigner, ledger: string) => Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
    getAddress: () => CBR_Address;
    stdlib: {
        addressEq: (x: any, y: any) => boolean;
        digest: (t: any, v: any) => string;
        UInt_max: ethers.ethers.BigNumber;
        T_Null: ALGO_Ty<null>;
        T_Bool: ALGO_Ty<boolean>;
        T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
        T_Bytes: (len: number) => ALGO_Ty<string>;
        T_Address: ALGO_Ty<string>;
        T_Digest: ALGO_Ty<string>;
        T_Object: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Object>;
        T_Data: (coMap: {
            [key: string]: ALGO_Ty<CBR_Val>;
        }) => ALGO_Ty<import("./CBR").CBR_Data>;
        T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>;
        T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>;
        T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
        protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
        Array_set<T>(arr: T[], idx: number, elem: T): T[];
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
        argsSlice: <T_1>(args: T_1[], cnt: number) => T_1[];
        argsSplit: <T_2>(args: T_2[], cnt: number) => [T_2[], T_2[]];
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
}>;
export declare const getNetworkTime: () => Promise<ethers.ethers.BigNumber>;
export declare const waitUntilTime: (targetTime: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const verifyContract: (ctcInfo: ContractInfo, backend: Backend) => Promise<true>;
//# sourceMappingURL=ALGO.d.ts.map