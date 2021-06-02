import { makeEthLikeCompiled } from './ETH_like_compiled.mjs';
import * as ethCompiledImpl from './ETH_compiled_impl.mjs';
var ethCompiled = makeEthLikeCompiled(ethCompiledImpl);
// The following should be identical to CFX_compiled.ts
export var stdlib = ethCompiled.stdlib,
  typeDefs = ethCompiled.typeDefs;
export var
  // start ...arith,
  add = stdlib.add,
  sub = stdlib.sub,
  mul = stdlib.mul,
  div = stdlib.div,
  mod = stdlib.mod,
  // end ...arith,
  // start ...typeDefs,
  T_Null = stdlib.T_Null,
  T_Bool = stdlib.T_Bool,
  T_UInt = stdlib.T_UInt,
  T_Bytes = stdlib.T_Bytes,
  T_Address = stdlib.T_Address,
  T_Digest = stdlib.T_Digest,
  T_Token = stdlib.T_Token,
  T_Object = stdlib.T_Object,
  T_Data = stdlib.T_Data,
  T_Array = stdlib.T_Array,
  T_Tuple = stdlib.T_Tuple,
  T_Struct = stdlib.T_Struct,
  // end ...typeDefs,
  UInt_max = stdlib.UInt_max,
  digest = stdlib.digest,
  addressEq = stdlib.addressEq,
  tokenEq = stdlib.tokenEq;
//# sourceMappingURL=ETH_compiled.js.map
