import ethers from 'ethers';
import * as shared from './shared';
import * as CBR from './CBR';
import { CBR_UInt, CBR_Bytes, CBR_Address, CBR_Object, CBR_Data, CBR_Array, CBR_Tuple, CBR_Struct, CBR_Val } from './CBR';
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare const UInt_max: BigNumber;
declare type ETH_Ty<BV extends CBR_Val, NV> = {
    name: string;
    defaultValue: BV;
    canonicalize: (uv: unknown) => BV;
    munge: (bv: BV) => NV;
    unmunge: (nv: NV) => BV;
    /** @description describes the shape of the munged value */
    paramType: string;
};
export declare type AnyETH_Ty = ETH_Ty<CBR_Val, any>;
export declare const digest: (t: any, v: any) => string;
export declare const T_UInt: ETH_Ty<CBR_UInt, BigNumber>;
export declare const addressEq: (x: any, y: any) => boolean;
export declare const tokenEq: (x: any, y: any) => boolean;
export declare type Token = CBR_Address;
export declare type PayAmt = shared.MkPayAmt<Token>;
export declare const typeDefs: {
    T_Null: ETH_Ty<null, false>;
    T_Bool: ETH_Ty<boolean, boolean>;
    T_UInt: ETH_Ty<ethers.ethers.BigNumber, ethers.ethers.BigNumber>;
    T_Bytes: (len: number) => ETH_Ty<CBR_Bytes, Array<number>>;
    T_Address: ETH_Ty<string, string>;
    T_Digest: ETH_Ty<string, ethers.ethers.BigNumber>;
    T_Token: ETH_Ty<string, string>;
    T_Object: <T>(co: {
        [key: string]: ETH_Ty<CBR.CBR_Val, T>;
    }) => ETH_Ty<CBR.CBR_Object, {
        [key: string]: T;
    }>;
    T_Data: <T_1>(co: {
        [key: string]: ETH_Ty<CBR.CBR_Val, T_1>;
    }) => ETH_Ty<CBR.CBR_Data, T_1[]>;
    T_Array: <T_2>(ctc: ETH_Ty<CBR.CBR_Val, T_2>, size: number) => ETH_Ty<CBR.CBR_Array, T_2[]>;
    T_Tuple: <T_3>(ctcs: ETH_Ty<CBR.CBR_Val, T_3>[]) => ETH_Ty<CBR.CBR_Tuple, T_3[]>;
    T_Struct: <T_4>(ctcs: [string, ETH_Ty<CBR.CBR_Val, T_4>][]) => ETH_Ty<CBR.CBR_Struct, T_4[]>;
};
export declare const stdlib: {
    addressEq: (x: any, y: any) => boolean;
    tokenEq: (x: any, y: any) => boolean;
    digest: (t: any, v: any) => string;
    UInt_max: ethers.ethers.BigNumber;
    T_Null: ETH_Ty<null, false>;
    T_Bool: ETH_Ty<boolean, boolean>;
    T_UInt: ETH_Ty<ethers.ethers.BigNumber, ethers.ethers.BigNumber>;
    T_Bytes: (len: number) => ETH_Ty<CBR_Bytes, Array<number>>;
    T_Address: ETH_Ty<string, string>;
    T_Digest: ETH_Ty<string, ethers.ethers.BigNumber>;
    T_Token: ETH_Ty<string, string>;
    T_Object: <T>(co: {
        [key: string]: ETH_Ty<CBR.CBR_Val, T>;
    }) => ETH_Ty<CBR.CBR_Object, {
        [key: string]: T;
    }>;
    T_Data: <T_1>(co: {
        [key: string]: ETH_Ty<CBR.CBR_Val, T_1>;
    }) => ETH_Ty<CBR.CBR_Data, T_1[]>;
    T_Array: <T_2>(ctc: ETH_Ty<CBR.CBR_Val, T_2>, size: number) => ETH_Ty<CBR.CBR_Array, T_2[]>;
    T_Tuple: <T_3>(ctcs: ETH_Ty<CBR.CBR_Val, T_3>[]) => ETH_Ty<CBR.CBR_Tuple, T_3[]>;
    T_Struct: <T_4>(ctcs: [string, ETH_Ty<CBR.CBR_Val, T_4>][]) => ETH_Ty<CBR.CBR_Struct, T_4[]>;
    protect(ctc: shared.AnyBackendTy, v: unknown, ai?: unknown): any;
    Array_set<T_5>(arr: T_5[], idx: number, elem: T_5): T_5[];
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
    argsSlice: <T_6>(args: T_6[], cnt: number) => T_6[];
    argsSplit: <T_7>(args: T_7[], cnt: number) => [T_7[], T_7[]];
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
//# sourceMappingURL=ETH_compiled.d.ts.map