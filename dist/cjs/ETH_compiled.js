"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.tokenEq = exports.addressEq = exports.digest = exports.UInt_max = exports.T_Struct = exports.T_Tuple = exports.T_Array = exports.T_Data = exports.T_Object = exports.T_Token = exports.T_Digest = exports.T_Contract = exports.T_Address = exports.T_Bytes = exports.T_UInt256 = exports.T_UInt = exports.T_Bool = exports.T_Null = exports.bxor256 = exports.bior256 = exports.band256 = exports.mod256 = exports.div256 = exports.mul256 = exports.sub256 = exports.add256 = exports.bxor = exports.bior = exports.band = exports.mod = exports.div = exports.mul = exports.sub = exports.add = exports.typeDefs = exports.stdlib = void 0;
var ETH_like_compiled_1 = require("./ETH_like_compiled");
var ethCompiledImpl = __importStar(require("./ETH_compiled_impl"));
var ethCompiled = (0, ETH_like_compiled_1.makeEthLikeCompiled)(ethCompiledImpl);
// The following should be identical to CFX_compiled.ts
exports.stdlib = ethCompiled.stdlib, exports.typeDefs = ethCompiled.typeDefs;
// start ...arith,
exports.add = exports.stdlib.add, exports.sub = exports.stdlib.sub, exports.mul = exports.stdlib.mul, exports.div = exports.stdlib.div, exports.mod = exports.stdlib.mod, exports.band = exports.stdlib.band, exports.bior = exports.stdlib.bior, exports.bxor = exports.stdlib.bxor, exports.add256 = exports.stdlib.add256, exports.sub256 = exports.stdlib.sub256, exports.mul256 = exports.stdlib.mul256, exports.div256 = exports.stdlib.div256, exports.mod256 = exports.stdlib.mod256, exports.band256 = exports.stdlib.band256, exports.bior256 = exports.stdlib.bior256, exports.bxor256 = exports.stdlib.bxor256, 
// end ...arith,
// start ...typeDefs,
exports.T_Null = exports.stdlib.T_Null, exports.T_Bool = exports.stdlib.T_Bool, exports.T_UInt = exports.stdlib.T_UInt, exports.T_UInt256 = exports.stdlib.T_UInt256, exports.T_Bytes = exports.stdlib.T_Bytes, exports.T_Address = exports.stdlib.T_Address, exports.T_Contract = exports.stdlib.T_Contract, exports.T_Digest = exports.stdlib.T_Digest, exports.T_Token = exports.stdlib.T_Token, exports.T_Object = exports.stdlib.T_Object, exports.T_Data = exports.stdlib.T_Data, exports.T_Array = exports.stdlib.T_Array, exports.T_Tuple = exports.stdlib.T_Tuple, exports.T_Struct = exports.stdlib.T_Struct, 
// end ...typeDefs,
exports.UInt_max = exports.stdlib.UInt_max, exports.digest = exports.stdlib.digest, exports.addressEq = exports.stdlib.addressEq, exports.tokenEq = exports.stdlib.tokenEq;
//# sourceMappingURL=ETH_compiled.js.map