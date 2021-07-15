import { ethers } from 'ethers';
import * as shared_backend from './shared_backend';
import type { // =>
CBR_Address } from './CBR';
import type { // =>
ETH_Ty, AnyETH_Ty, EthLikeCompiledArgs } from './ETH_like_interfaces';
import { TypeDefs, Stdlib_Backend_Base } from './interfaces';
import { MkPayAmt } from './shared_impl';
export type { // =>
ETH_Ty, AnyETH_Ty, };
export declare type Token = CBR_Address;
export declare type PayAmt = MkPayAmt<Token>;
export declare function makeEthLikeCompiled(ethLikeCompiledArgs: EthLikeCompiledArgs): {
    typeDefs: TypeDefs;
    stdlib: Stdlib_Backend_Base<AnyETH_Ty>;
    UInt_max: ethers.BigNumber;
    addressEq: (addr1: unknown, addr2: unknown) => boolean;
    tokenEq: (x: unknown, y: unknown) => boolean;
    digest: (t: AnyETH_Ty, a: unknown) => string;
    checkedBigNumberify: (at: string, max: ethers.BigNumber, n: any) => ethers.BigNumber;
    protect: (t: any, v: unknown, ai?: string | undefined) => unknown;
    Array_zip: <A, B>(a1: A[], a2: B[]) => [A, B][];
    mapRef: <A_1>(m: {
        [key: string]: A_1;
    }, f: string) => shared_backend.MaybeRep<A_1>;
    simMapRef: (sim_r: unknown, mapi: number, f: string) => shared_backend.MaybeRep<unknown>;
    simMapSet: (sim_r: unknown, mapi: number, f: string, v: unknown) => unknown;
    simMapDupe: (sim_r: unknown, mapi: number, mapo: unknown) => void;
    bytesConcat: (b1: string, b2: string) => string;
    assert: (b: boolean, message: string) => void;
    Array_set: <A_2>(arr: A_2[], idx: number, val: A_2) => A_2[];
    eq: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    ge: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    gt: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    le: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    lt: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    bytesEq: (s1: string, s2: string) => boolean;
    digestEq: (d1: string, d2: string) => boolean;
    add: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    sub: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    mod: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    mul: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    div: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    T_Null: any;
    T_Bool: any;
    T_UInt: any;
    T_Bytes: any;
    T_Address: any;
    T_Digest: any;
    T_Token: any;
    T_Object: (tyMap: {
        [key: string]: any;
    }) => any;
    T_Data: (tyMap: {
        [key: string]: any;
    }) => any;
    T_Array: (ty: any, size: number) => any;
    T_Tuple: (tys: any[]) => any;
    T_Struct: (nameTyPairs: [string, any][]) => any;
};
//# sourceMappingURL=ETH_like_compiled.d.ts.map