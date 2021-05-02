import * as shared from './shared';
import ethers from 'ethers';
import { CBR_Null, CBR_Bool, CBR_UInt, CBR_Bytes, CBR_Address, CBR_Digest, CBR_Object, CBR_Data, CBR_Array, CBR_Tuple, CBR_Struct, CBR_Val } from './CBR';
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare const UInt_max: BigNumber;
export declare type NV = Uint8Array;
export declare type ALGO_Ty<BV extends CBR_Val> = {
    name: string;
    canonicalize: (uv: unknown) => BV;
    netSize: number;
    toNet(bv: BV): NV;
    fromNet(nv: NV): BV;
};
export declare const digest: (t: any, v: any) => string;
export declare const T_Null: ALGO_Ty<CBR_Null>;
export declare const T_Bool: ALGO_Ty<CBR_Bool>;
export declare const T_UInt: ALGO_Ty<CBR_UInt>;
export declare const T_Bytes: (len: number) => ALGO_Ty<CBR_Bytes>;
export declare const T_Digest: ALGO_Ty<CBR_Digest>;
export declare const addressToHex: (x: any) => string;
export declare const T_Address: ALGO_Ty<CBR_Address>;
export declare const T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<CBR_Array>;
export declare const T_Tuple: (cos: Array<ALGO_Ty<CBR_Val>>) => ALGO_Ty<CBR_Tuple>;
export declare const T_Struct: (cos: Array<[string, ALGO_Ty<CBR_Val>]>) => ALGO_Ty<CBR_Struct>;
export declare const T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<CBR_Object>;
export declare const T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<CBR_Data>;
export declare const addressEq: (x: any, y: any) => boolean;
export declare type Token = CBR_UInt;
export declare const tokenEq: (x: Token, y: Token) => boolean;
export declare type PayAmt = shared.MkPayAmt<Token>;
export declare const typeDefs: {
    T_Null: ALGO_Ty<null>;
    T_Bool: ALGO_Ty<boolean>;
    T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
    T_Bytes: (len: number) => ALGO_Ty<CBR_Bytes>;
    T_Address: ALGO_Ty<string>;
    T_Digest: ALGO_Ty<string>;
    T_Token: ALGO_Ty<ethers.ethers.BigNumber>;
    T_Object: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<CBR_Object>;
    T_Data: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<CBR_Data>;
    T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<CBR_Array>;
    T_Tuple: (cos: Array<ALGO_Ty<CBR_Val>>) => ALGO_Ty<CBR_Tuple>;
    T_Struct: (cos: Array<[string, ALGO_Ty<CBR_Val>]>) => ALGO_Ty<CBR_Struct>;
};
export declare const stdlib: {
    addressEq: (x: any, y: any) => boolean;
    tokenEq: (x: Token, y: Token) => boolean;
    digest: (t: any, v: any) => string;
    UInt_max: ethers.ethers.BigNumber;
    T_Null: ALGO_Ty<null>;
    T_Bool: ALGO_Ty<boolean>;
    T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
    T_Bytes: (len: number) => ALGO_Ty<CBR_Bytes>;
    T_Address: ALGO_Ty<string>;
    T_Digest: ALGO_Ty<string>;
    T_Token: ALGO_Ty<ethers.ethers.BigNumber>;
    T_Object: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<CBR_Object>;
    T_Data: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<CBR_Data>;
    T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<CBR_Array>;
    T_Tuple: (cos: Array<ALGO_Ty<CBR_Val>>) => ALGO_Ty<CBR_Tuple>;
    T_Struct: (cos: Array<[string, ALGO_Ty<CBR_Val>]>) => ALGO_Ty<CBR_Struct>;
    protect(ctc: shared.AnyBackendTy, v: unknown, ai?: unknown): any;
    Array_set<T>(arr: T[], idx: number, elem: T): T[];
    getViewsHelper: <ConnectorTy extends shared.AnyBackendTy, B>(views: shared.IBackendViews<ConnectorTy>, getView1: (views: shared.IBackendViewsInfo<ConnectorTy>, v: string, k: string, vi: shared.IBackendViewInfo<ConnectorTy>) => B) => () => {
        [key: string]: {
            [key: string]: B;
        };
    };
    deferContract: <ContractInfo, Digest, RawAddress, Token_1, ConnectorTy_1 extends shared.AnyBackendTy>(shouldError: boolean, implP: Promise<shared.IContract<ContractInfo, Digest, RawAddress, Token_1, ConnectorTy_1>>, implNow: Partial<shared.IContract<ContractInfo, Digest, RawAddress, Token_1, ConnectorTy_1>>) => shared.IContract<ContractInfo, Digest, RawAddress, Token_1, ConnectorTy_1>;
    envDefault: (v: string | null | undefined, d: any) => any;
    setDEBUG: (b: boolean) => void;
    getDEBUG: () => boolean;
    debug: (...msgs: any) => void;
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
    objectMap: <A, B_1>(object: {
        [key: string]: A;
    }, mapFn: (k: string, a: A) => B_1) => {
        [key: string]: B_1;
    };
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
export {};
//# sourceMappingURL=ALGO_compiled.d.ts.map