import ethers from 'ethers';
import * as shared from './shared';
import * as CBR from './CBR';
import { CBR_UInt, CBR_Bytes, CBR_Object, CBR_Data, CBR_Array, CBR_Tuple, CBR_Val } from './CBR';
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
export declare const typeDefs: {
    T_Null: ETH_Ty<null, false>;
    T_Bool: ETH_Ty<boolean, boolean>;
    T_UInt: ETH_Ty<ethers.ethers.BigNumber, ethers.ethers.BigNumber>;
    T_Bytes: (len: number) => ETH_Ty<CBR_Bytes, Array<number>>;
    T_Address: ETH_Ty<string, string>;
    T_Digest: ETH_Ty<string, ethers.ethers.BigNumber>;
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
};
export declare const addressEq: (x: any, y: any) => boolean;
export declare const stdlib: {
    addressEq: (x: any, y: any) => boolean;
    digest: (t: any, v: any) => string;
    UInt_max: ethers.ethers.BigNumber;
    T_Null: ETH_Ty<null, false>;
    T_Bool: ETH_Ty<boolean, boolean>;
    T_UInt: ETH_Ty<ethers.ethers.BigNumber, ethers.ethers.BigNumber>;
    T_Bytes: (len: number) => ETH_Ty<CBR_Bytes, Array<number>>;
    T_Address: ETH_Ty<string, string>;
    T_Digest: ETH_Ty<string, ethers.ethers.BigNumber>;
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
    protect(ctc: shared.AnyBackendTy, v: unknown, ai?: unknown): any;
    Array_set<T_4>(arr: T_4[], idx: number, elem: T_4): T_4[];
    setDEBUG: (b: boolean) => void;
    getDEBUG: () => boolean;
    debug: (msg: any) => void;
    assert: (d: any, ai?: any) => void;
    isBigNumber: typeof ethers.ethers.BigNumber.isBigNumber;
    bigNumberify: (x: any) => ethers.ethers.BigNumber;
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
    argsSlice: <T_5>(args: T_5[], cnt: number) => T_5[];
    argsSplit: <T_6>(args: T_6[], cnt: number) => [T_6[], T_6[]];
    Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
    mkAddressEq: (T_Address: {
        canonicalize: (addr: any) => any;
    }) => (x: any, y: any) => boolean;
};
export {};
//# sourceMappingURL=ETH_compiled.d.ts.map