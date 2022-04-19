import { ethers } from 'ethers';
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.BigNumber;
export declare const bigNumberify: (x: any) => BigNumber;
export declare const bigNumberToNumber: (x: any) => number;
export declare type CBR_Null = null;
export declare type CBR_Bool = boolean;
export declare type CBR_UInt = BigNumber;
export declare type CBR_Bytes = string;
export declare type CBR_Address = string;
export declare type CBR_Digest = string;
export declare type CBR_Object = {
    [key: string]: CBR_Val;
};
export declare type CBR_Data = [string, CBR_Val];
export declare type CBR_Array = Array<CBR_Val>;
export declare type CBR_Tuple = Array<CBR_Val>;
export declare type CBR_Struct = {
    [key: string]: CBR_Val;
};
export declare type CBR_Val = CBR_Null | CBR_Bool | CBR_UInt | CBR_Bytes | CBR_Address | CBR_Digest | CBR_Object | CBR_Data | CBR_Array | CBR_Tuple | CBR_Struct;
export interface BackendTy<T extends CBR_Val> {
    name: string;
    canonicalize: (uv: unknown) => T;
    defaultValue: T;
}
export declare const BV_Null: CBR_Null;
export declare const BT_Null: BackendTy<CBR_Null>;
export declare const BT_Bool: BackendTy<CBR_Bool>;
export declare const BV_Bool: (val: boolean) => CBR_Bool;
export declare const BT_UInt: (max: BigNumber) => BackendTy<CBR_UInt>;
export declare const BV_UInt: (val: BigNumber, max: BigNumber) => CBR_UInt;
export declare const BT_Bytes: (len: number) => BackendTy<CBR_Bytes>;
export declare const BT_Digest: BackendTy<CBR_Digest>;
/** @description You probably don't want to create a BV_Digest manually. */
export declare const BV_Digest: (val: string) => CBR_Digest;
export declare const BT_Address: BackendTy<CBR_Address>;
export declare const BV_Address: (val: string) => CBR_Address;
export declare const BT_Array: (ctc: BackendTy<CBR_Val>, size: number) => BackendTy<CBR_Array>;
/** @example BV_Array(BT_UInt, 3)([1, 2, 3]) */
export declare const BV_Array: (ctc: BackendTy<CBR_Val>, size: number) => (val: unknown[]) => CBR_Array;
export declare const BT_Tuple: (ctcs: Array<BackendTy<CBR_Val>>) => BackendTy<CBR_Tuple>;
/** @example BV_Tuple([BT_UInt, BT_Bytes])([42, 'hello']) */
export declare const BV_Tuple: (ctcs: Array<BackendTy<CBR_Val>>) => (val: unknown[]) => CBR_Tuple;
export declare const BT_Struct: (ctcs: Array<[string, BackendTy<CBR_Val>]>) => BackendTy<CBR_Struct>;
export declare const BV_Struct: (ctcs: Array<[string, BackendTy<CBR_Val>]>) => (val: any) => CBR_Struct;
export declare const BT_Object: (co: {
    [key: string]: BackendTy<CBR_Val>;
}) => BackendTy<CBR_Object>;
/** @example BV_Object({x: BT_UInt})({x: 3}) */
export declare const BV_Object: (co: {
    [key: string]: BackendTy<CBR_Val>;
}) => (val: {
    [key: string]: unknown;
}) => CBR_Object;
export declare const BT_Data: (co: {
    [key: string]: BackendTy<CBR_Val>;
}) => BackendTy<CBR_Data>;
/** @example BV_Data({x: BT_UInt, y: BT_Bytes})(['x', 3]); */
export declare const BV_Data: (co: {
    [key: string]: BackendTy<CBR_Val>;
}) => (val: [string, unknown]) => CBR_Data;
export {};
//# sourceMappingURL=CBR.d.ts.map