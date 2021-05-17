import { makeEthLikeCompiled } from './ETH_like_compiled.mjs';
import * as cfxCompiledImpl from './CFX_compiled_impl.mjs';
export * from './shared.mjs';
const ethLikeCompiled = makeEthLikeCompiled(cfxCompiledImpl);
// The following should be identical to ETH_compiled.ts
export const {
  // TODO: revisit which of these should actually be export
  // start ...arith,
  add,
  sub,
  mul,
  div,
  mod,
  // end ...arith,
  // start ...typeDefs,
  T_Null,
  T_Bool,
  T_UInt,
  T_Bytes,
  T_Address,
  T_Digest,
  T_Token,
  T_Object,
  T_Data,
  T_Array,
  T_Tuple,
  T_Struct,
  // end ...typeDefs,
  UInt_max,
  digest,
  addressEq,
  tokenEq,
  stdlib,
  typeDefs,
} = ethLikeCompiled;
