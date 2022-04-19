import { Stdlib_Backend_Base } from './interfaces';
import { MkPayAmt } from './shared_impl';
import { ethers } from 'ethers';
import { CBR_Null, CBR_Bool, CBR_UInt, CBR_Bytes, CBR_Address, CBR_Digest, CBR_Object, CBR_Data, CBR_Array, CBR_Tuple, CBR_Struct, CBR_Val, BackendTy } from './CBR';
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.BigNumber;
export declare const UInt_max: BigNumber;
export declare type NV = Uint8Array;
export interface ALGO_Ty<BV extends CBR_Val> extends BackendTy<BV> {
    netSize: number;
    toNet(bv: BV): NV;
    fromNet(nv: NV): BV;
    netName: string;
}
export declare const digest: (t: any, v: any) => string;
export declare const T_Null: ALGO_Ty<CBR_Null>;
export declare const T_Bool: ALGO_Ty<CBR_Bool>;
export declare const T_UInt: ALGO_Ty<CBR_UInt>;
export declare const T_UInt256: ALGO_Ty<CBR_UInt>;
/** @description For hex strings representing bytes */
export declare const bytestringyNet: (len: number) => {
    netSize: number;
    netName: string;
    toNet: (bv: string) => NV;
    fromNet: (nv: NV) => string;
};
export declare const T_Bytes: (len: number) => ALGO_Ty<CBR_Bytes>;
export declare const T_Digest: ALGO_Ty<CBR_Digest>;
export declare const addressToHex: (x: string) => string;
export declare const addressFromHex: (hexAddr: string) => string;
export declare const extractAddr: (x: any) => string;
export declare const T_Address: ALGO_Ty<CBR_Address>;
export declare const T_Contract: ALGO_Ty<Contract>;
export declare const T_Array: (co: ALGO_Ty<CBR_Val>, size_u: unknown) => ALGO_Ty<CBR_Array>;
export declare const T_Tuple: (cos: Array<ALGO_Ty<CBR_Val>>) => ALGO_Ty<CBR_Tuple>;
export declare const T_Struct: (cos: Array<[string, ALGO_Ty<CBR_Val>]>) => ALGO_Ty<CBR_Struct>;
export declare const T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<CBR_Object>;
export declare const T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<CBR_Data>;
export declare const addressEq: (x: any, y: any) => boolean;
export declare const digestEq: (x: any, y: any) => boolean;
export declare const digest_xor: (xd: string, yd: string) => string;
export declare const bytes_xor: (x: string, y: string) => string;
export declare const btoiLast8: (b: string) => ethers.BigNumber;
export declare type Token = CBR_UInt;
export declare type Contract = CBR_UInt;
export declare const ctcAddrEq: (x: unknown, y: unknown) => boolean;
export declare const tokenEq: (x: unknown, y: unknown) => boolean;
export declare type PayAmt = MkPayAmt<Token>;
export declare const typeDefs: {
    T_Null: ALGO_Ty<null>;
    T_Bool: ALGO_Ty<boolean>;
    T_UInt: ALGO_Ty<ethers.BigNumber>;
    T_UInt256: ALGO_Ty<ethers.BigNumber>;
    T_Bytes: (len: number) => ALGO_Ty<CBR_Bytes>;
    T_Address: ALGO_Ty<string>;
    T_Contract: ALGO_Ty<ethers.BigNumber>;
    T_Digest: ALGO_Ty<string>;
    T_Token: ALGO_Ty<ethers.BigNumber>;
    T_Object: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<CBR_Object>;
    T_Data: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<CBR_Data>;
    T_Array: (co: ALGO_Ty<CBR_Val>, size_u: unknown) => ALGO_Ty<CBR_Array>;
    T_Tuple: (cos: Array<ALGO_Ty<CBR_Val>>) => ALGO_Ty<CBR_Tuple>;
    T_Struct: (cos: Array<[string, ALGO_Ty<CBR_Val>]>) => ALGO_Ty<CBR_Struct>;
};
export declare const emptyContractInfo = 0;
export declare const stdlib: Stdlib_Backend_Base<ALGO_Ty<any>>;
export {};
//# sourceMappingURL=ALGO_compiled.d.ts.map