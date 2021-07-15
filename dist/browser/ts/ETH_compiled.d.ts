export type { // =>
Token, PayAmt, AnyETH_Ty } from './ETH_like_compiled';
export declare const stdlib: import("./interfaces").Stdlib_Backend_Base<import("./ETH_like_interfaces").AnyETH_Ty>, typeDefs: import("./interfaces").TypeDefs;
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, T_Null: any, T_Bool: any, T_UInt: any, T_Bytes: any, T_Address: any, T_Digest: any, T_Token: any, T_Object: (tyMap: {
    [key: string]: any;
}) => any, T_Data: (tyMap: {
    [key: string]: any;
}) => any, T_Array: (ty: any, size: number) => any, T_Tuple: (tys: any[]) => any, T_Struct: (nameTyPairs: [string, any][]) => any, UInt_max: import("ethers").BigNumber, digest: (t: import("./ETH_like_interfaces").AnyETH_Ty, a: unknown) => string, addressEq: (addr1: unknown, addr2: unknown) => boolean, tokenEq: (x: unknown, y: unknown) => boolean;
//# sourceMappingURL=ETH_compiled.d.ts.map