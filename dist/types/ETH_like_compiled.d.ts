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
    checkedBigNumberify: any;
    protect: any;
    Array_zip: any;
    mapRef: any;
    simMapRef: any;
    simMapSet: any;
    simMapDupe: any;
    bytesConcat: any;
    assert: any;
    Array_set: any;
    eq: any;
    ge: any;
    gt: any;
    le: any;
    lt: any;
    bytesEq: any;
    digestEq: any;
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
    T_Object: any;
    T_Data: any;
    T_Array: any;
    T_Tuple: any;
    T_Struct: any;
};
//# sourceMappingURL=ETH_like_compiled.d.ts.map