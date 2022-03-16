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
    digest_xor: (x: string, y: string) => string;
    tokenEq: (x: unknown, y: unknown) => boolean;
    digest: (t: AnyETH_Ty, a: unknown) => string;
    emptyContractInfo: string | number;
    checkedBigNumberify: (at: string, max: ethers.BigNumber, n: any) => ethers.BigNumber;
    protect: (t: any, v: unknown, ai?: string | undefined) => unknown;
    Array_asyncMap: <B>(as: any[][], f: (x: any[], i: number) => Promise<B>) => Promise<B[]>;
    Array_asyncReduce: <B_1>(as: any[][], b: B_1, f: (xs: any[], y: B_1, i: number) => Promise<B_1>) => Promise<B_1>;
    newMap: <A>(opts: shared_backend.MapOpts<A>) => shared_backend.LinearMap<A>;
    mapRef: <A_1>(m: shared_backend.LinearMap<A_1>, f: string) => Promise<shared_backend.MaybeRep<A_1>>;
    mapSet: <A_2>(m: shared_backend.LinearMap<A_2>, f: string, v: A_2) => Promise<void>;
    simMapRef: <A_3>(sim_r: unknown, mapi: number, f: string) => Promise<shared_backend.MaybeRep<A_3>>;
    simMapSet: <A_4>(sim_r: unknown, mapi: number, f: string, v: A_4) => Promise<void>;
    simMapDupe: <A_5>(sim_r: unknown, mapi: number, mapo: shared_backend.LinearMap<A_5>) => void;
    simTokenNew: any;
    simTokenBurn: any;
    simTokenDestroy: any;
    bytesConcat: (b1: string, b2: string) => string;
    fromSome: <A_6>(mo: shared_backend.MaybeRep<A_6>, da: A_6) => A_6;
    assert: (b: boolean, message: string) => void;
    Array_set: <A_7>(arr: A_7[], idx: number, val: A_7) => A_7[];
    eq: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    ge: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    gt: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    le: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    lt: (n1: shared_backend.num, n2: shared_backend.num) => boolean;
    bytesEq: (s1: string, s2: string) => boolean;
    bytes_xor: (x: string, y: string) => string;
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