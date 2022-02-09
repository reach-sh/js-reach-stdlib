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
    typeDefs: TypeDefs<AnyETH_Ty>;
    stdlib: Stdlib_Backend_Base<AnyETH_Ty>;
    UInt_max: ethers.BigNumber;
    addressEq: (addr1: unknown, addr2: unknown) => boolean;
    digestEq: (x: unknown, y: unknown) => boolean;
    tokenEq: (x: unknown, y: unknown) => boolean;
    digest: (t: AnyETH_Ty, a: unknown) => string;
    emptyContractInfo: string | number;
    checkedBigNumberify: (at: string, max: ethers.BigNumber, n: any) => ethers.BigNumber;
    protect: (t: any, v: unknown, ai?: string | undefined) => unknown;
    Array_asyncMap: <A, B>(a: A[], f: (x: A, i: number) => Promise<B>) => Promise<B[]>;
    Array_asyncReduce: <A_1, B_1>(a: A_1[], b: B_1, f: (y: B_1, x: A_1, i: number) => Promise<B_1>) => Promise<B_1>;
    Array_zip: <A_2, B_2>(a1: A_2[], a2: B_2[]) => [A_2, B_2][];
    newMap: <A_3>(opts: shared_backend.MapOpts<A_3>) => shared_backend.LinearMap<A_3>;
    mapRef: <A_4>(m: shared_backend.LinearMap<A_4>, f: string) => Promise<shared_backend.MaybeRep<A_4>>;
    mapSet: <A_5>(m: shared_backend.LinearMap<A_5>, f: string, v: A_5) => Promise<void>;
    simMapRef: <A_6>(sim_r: unknown, mapi: number, f: string) => Promise<shared_backend.MaybeRep<A_6>>;
    simMapSet: <A_7>(sim_r: unknown, mapi: number, f: string, v: A_7) => Promise<void>;
    simMapDupe: <A_8>(sim_r: unknown, mapi: number, mapo: shared_backend.LinearMap<A_8>) => void;
    simTokenNew: any;
    simTokenBurn: any;
    simTokenDestroy: any;
    bytesConcat: (b1: string, b2: string) => string;
    fromSome: <A_9>(mo: shared_backend.MaybeRep<A_9>, da: A_9) => A_9;
    assert: (b: boolean, message: string) => void;
    Array_set: <A_10>(arr: A_10[], idx: number, val: A_10) => A_10[];
    eq: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    ge: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    gt: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    le: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    lt: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    bytesEq: (s1: string, s2: string) => boolean;
    add: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    sub: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    mod: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    mul: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    div: (x: shared_backend.num, y: shared_backend.num) => ethers.BigNumber;
    T_Null: AnyETH_Ty;
    T_Bool: AnyETH_Ty;
    T_UInt: AnyETH_Ty;
    T_Bytes: (len: number) => AnyETH_Ty;
    T_Address: AnyETH_Ty;
    T_Contract: AnyETH_Ty;
    T_Digest: AnyETH_Ty;
    T_Token: AnyETH_Ty;
    T_Object: (tyMap: {
        [key: string]: AnyETH_Ty;
    }) => AnyETH_Ty;
    T_Data: (tyMap: {
        [key: string]: AnyETH_Ty;
    }) => AnyETH_Ty;
    T_Array: (ty: AnyETH_Ty, size: number) => AnyETH_Ty;
    T_Tuple: (tys: AnyETH_Ty[]) => AnyETH_Ty;
    T_Struct: (nameTyPairs: [string, AnyETH_Ty][]) => AnyETH_Ty;
};
//# sourceMappingURL=ETH_like_compiled.d.ts.map