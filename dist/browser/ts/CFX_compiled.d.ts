import * as cfxCompiledImpl from './CFX_compiled_impl';
export declare const getNetworkId: typeof cfxCompiledImpl.getNetworkId, setNetworkId: typeof cfxCompiledImpl.setNetworkId;
export declare const stdlib: import("./interfaces").Stdlib_Backend_Base<import("./ETH_like_interfaces").AnyETH_Ty>, typeDefs: import("./interfaces").TypeDefs<import("./ETH_like_interfaces").AnyETH_Ty>;
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, band: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, bior: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, bxor: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, add256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, sub256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mul256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, div256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, mod256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, band256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, bior256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, bxor256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => import("ethers").BigNumber, T_Null: import("./ETH_like_interfaces").AnyETH_Ty, T_Bool: import("./ETH_like_interfaces").AnyETH_Ty, T_UInt: import("./ETH_like_interfaces").AnyETH_Ty, T_UInt256: import("./ETH_like_interfaces").AnyETH_Ty, T_Bytes: (len: number) => import("./ETH_like_interfaces").AnyETH_Ty, T_BytesDyn: import("./ETH_like_interfaces").AnyETH_Ty, T_StringDyn: import("./ETH_like_interfaces").AnyETH_Ty, T_Address: import("./ETH_like_interfaces").AnyETH_Ty, T_Contract: import("./ETH_like_interfaces").AnyETH_Ty, T_Digest: import("./ETH_like_interfaces").AnyETH_Ty, T_Token: import("./ETH_like_interfaces").AnyETH_Ty, T_Object: (tyMap: {
    [key: string]: import("./ETH_like_interfaces").AnyETH_Ty;
}) => import("./ETH_like_interfaces").AnyETH_Ty, T_Data: (tyMap: {
    [key: string]: import("./ETH_like_interfaces").AnyETH_Ty;
}) => import("./ETH_like_interfaces").AnyETH_Ty, T_Array: (ty: import("./ETH_like_interfaces").AnyETH_Ty, size: number) => import("./ETH_like_interfaces").AnyETH_Ty, T_Tuple: (tys: import("./ETH_like_interfaces").AnyETH_Ty[]) => import("./ETH_like_interfaces").AnyETH_Ty, T_Struct: (nameTyPairs: [string, import("./ETH_like_interfaces").AnyETH_Ty][]) => import("./ETH_like_interfaces").AnyETH_Ty, UInt_max: import("ethers").BigNumber, digest: (ts: import("./ETH_like_interfaces").AnyETH_Ty[], vs: unknown[]) => string, addressEq: (addr1: unknown, addr2: unknown) => boolean, tokenEq: (x: unknown, y: unknown) => boolean;
//# sourceMappingURL=CFX_compiled.d.ts.map