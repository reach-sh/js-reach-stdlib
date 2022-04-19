var __assign = (this && this.__assign) || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r, ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) { e = { error: error }; } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally { if (e) throw e.error; }
  }
  return ar;
};
var __spreadArray = (this && this.__spreadArray) || function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
import ethers from 'ethers';
import * as shared_backend from './shared_backend.mjs';
import * as CBR from './CBR.mjs';
var bigNumberify = CBR.bigNumberify,
  bigNumberToNumber = CBR.bigNumberToNumber;
import { debug, labelMaps, makeDigest, hexToString, mkAddressEq, makeArith, j2s, UInt256_max, } from './shared_impl.mjs';
// TODO: restore return type annotation once types are in place
export function makeEthLikeCompiled(ethLikeCompiledArgs) {
  // ...............................................
  var T_Address = ethLikeCompiledArgs.T_Address;
  var UInt_max = UInt256_max;
  var digest = makeDigest('keccak256', function(t, v) {
    // Note: abiCoder.encode doesn't correctly handle an empty tuple type
    if (t.paramType === 'tuple()') {
      if (Array.isArray(v) && v.length === 0) {
        return v;
      } else {
        throw Error("impossible: digest tuple() with non-empty array: ".concat(j2s(v)));
      }
    }
    return ethers.utils.defaultAbiCoder.encode([t.paramType], [t.munge(v)]);
  });
  var V_Null = null;
  // null is represented in solidity as false
  var T_Null = __assign(__assign({}, CBR.BT_Null), { munge: function(bv) { return (void(bv), false); }, unmunge: function(nv) { return (void(nv), V_Null); }, paramType: 'bool' });
  var T_Bool = __assign(__assign({}, CBR.BT_Bool), { munge: function(bv) { return bv; }, unmunge: function(nv) { return V_Bool(nv); }, paramType: 'bool' });
  var V_Bool = function(b) {
    return T_Bool.canonicalize(b);
  };
  var T_UInt = __assign(__assign({}, CBR.BT_UInt(UInt_max)), { munge: function(bv) { return bigNumberify(bv); }, unmunge: function(nv) { return V_UInt(nv); }, paramType: 'uint256' });
  var T_UInt256 = T_UInt;
  var V_UInt = function(n) {
    return T_UInt.canonicalize(n);
  };
  // XXX figure out how to move this into cfxers instead of here?
  // Conflux seems to sometimes turn uint8array into an array of bigint.
  // This is silly and needs to be undone or else hexlify will die.
  function unBigInt(x) {
    if (Array.isArray(x)) {
      return x.map(function(n) {
        if (typeof n === 'bigint') {
          if (n >= 256)
            throw Error("unBigInt expected n < 256");
          return Number(n);
        }
        return n;
      });
    } else {
      return x;
    }
  }

  function splitToChunks(arr, chunkSize) {
    var cs = [];
    for (var i = 0; i < Math.ceil(arr.length / chunkSize); i++) {
      cs.push(arr.slice(i * chunkSize, (i + 1) * chunkSize));
    }
    return cs;
  };
  var T_Bytes = function(len) {
    var me = __assign(__assign({}, CBR.BT_Bytes(len)), {
      munge: (function(bv) {
        return splitToChunks(Array.from(ethers.utils.toUtf8Bytes(bv)), 32);
      }),
      unmunge: (function(nvs) {
        var nvs_s = nvs.map(function(nv) { return hexToString(ethers.utils.hexlify(unBigInt(nv))); });
        var nvss = "".concat.apply("", __spreadArray([], __read(nvs_s), false));
        // debug(me.name, nvs, nvss);
        return me.canonicalize(nvss);
      }),
      paramType: (function() {
        var n = len;
        var fs = [];
        while (0 < n) {
          var ell = Math.min(32, n);
          fs.push("bytes".concat(ell));
          n = n - ell;
        }
        return "tuple(".concat(fs.join(','), ")");
      })()
    });
    return me;
  };
  var T_Digest = __assign(__assign({}, CBR.BT_Digest), {
    defaultValue: ethers.utils.keccak256([]),
    munge: function(bv) { return ethers.BigNumber.from(bv); },
    // XXX likely not the correct unmunge type?
    unmunge: function(nv) { return V_Digest(nv.toHexString()); },
    paramType: 'uint256'
  });
  var V_Digest = function(s) {
    return T_Digest.canonicalize(s);
  };
  var T_Array = function(ctc, size_i) {
    var size = bigNumberToNumber(bigNumberify(size_i));
    return __assign(__assign({}, CBR.BT_Array(ctc, size)), {
      munge: function(bv) {
        if (size == 0) {
          return false;
        } else {
          return bv.map(function(arg) { return ctc.munge(arg); });
        }
      },
      unmunge: function(nv) {
        if (size == 0) {
          return [];
        } else {
          return V_Array(ctc, size)(nv.map(function(arg) { return ctc.unmunge(arg); }));
        }
      },
      paramType: "".concat(ctc.paramType, "[").concat(size, "]")
    });
  };
  var V_Array = function(ctc, size) {
    return function(val) {
      return T_Array(ctc, size).canonicalize(val);
    };
  };
  // XXX fix me Dan, I'm type checking wrong!
  var T_Tuple = function(ctcs) {
    return (__assign(__assign({}, CBR.BT_Tuple(ctcs)), {
      munge: function(bv) {
        if (ctcs.length == 0) {
          return false;
        } else {
          return bv.map(function(arg, i) { return ctcs[i].munge(arg); });
        }
      },
      unmunge: function(args) {
        return V_Tuple(ctcs)(ctcs.map(function(ctc, i) { return ctc.unmunge(args[i]); }));
      },
      paramType: "tuple(".concat(ctcs.map(function(ctc) { return ctc.paramType; }).join(','), ")")
    }));
  };
  var V_Tuple = function(ctcs) {
    return function(val) {
      return T_Tuple(ctcs).canonicalize(val);
    };
  };
  var T_Struct = function(ctcs) {
    return (__assign(__assign({}, CBR.BT_Struct(ctcs)), {
      munge: function(bv) {
        if (ctcs.length == 0) {
          return false;
        } else {
          return ctcs.map(function(_a) {
            var _b = __read(_a, 2),
              k = _b[0],
              ctc = _b[1];
            return ctc.munge(bv[k]);
          });
        }
      },
      unmunge: function(args) {
        return V_Struct(ctcs)(ctcs.map(function(_a, i) {
          var _b = __read(_a, 2),
            k = _b[0],
            ctc = _b[1];
          void(k);
          return ctc.unmunge(args[i]);
        }));
      },
      paramType: "tuple(".concat(ctcs.map(function(_a) {
        var _b = __read(_a, 2),
          k = _b[0],
          ctc = _b[1];
        void(k);
        return ctc.paramType;
      }).join(','), ")")
    }));
  };
  var V_Struct = function(ctcs) {
    return function(val) {
      return T_Struct(ctcs).canonicalize(val);
    };
  };
  var T_Object = function(co) {
    return (__assign(__assign({}, CBR.BT_Object(co)), {
      // CBR -> Net . ETH object fields are prefaced with "_"
      munge: function(bv) {
        var obj = {};
        var none = true;
        for (var prop in co) {
          none = false;
          obj["_" + prop] = co[prop].munge(bv[prop]);
        }
        if (none) {
          return false;
        } else {
          return obj;
        }
      },
      unmunge: function(bv) {
        var obj = {};
        for (var prop in co) {
          obj[prop] = co[prop].unmunge(bv["_" + prop]);
        }
        return V_Object(co)(obj);
      },
      paramType: (function() {
        var ascLabels = labelMaps(co).ascLabels;
        var tupFields = ascLabels.map(function(label) { return "".concat(co[label].paramType, " _").concat(label); }).join(',');
        return "tuple(".concat(tupFields, ")");
      })()
    }));
  };
  var V_Object = function(co) {
    return function(val) {
      return T_Object(co).canonicalize(val);
    };
  };
  var T_Data = function(co) {
    // TODO: not duplicate between this and CBR.ts
    var _a = labelMaps(co),
      ascLabels = _a.ascLabels,
      labelMap = _a.labelMap;
    return __assign(__assign({}, CBR.BT_Data(co)), {
      // Data representation in js is a 2-tuple:
      // [label, val]
      // where label : string
      // and val : co[label]
      //
      // Data representation in solidity is an N+1-tuple: (actually a struct)
      // [labelInt, v0, ..., vN]
      // where labelInt : number, 0 <= labelInt < N
      // vN : co[ascLabels[i]]
      //
      munge: function(_a) {
        var _b = __read(_a, 2),
          label = _b[0],
          v = _b[1];
        var i = labelMap[label];
        var vals = ascLabels.map(function(label) {
          var vco = co[label];
          return vco.munge(vco.defaultValue);
        });
        vals[i] = co[label].munge(v);
        var ret = [i];
        return ret.concat(vals);
      },
      // Note: when it comes back from solidity, vs behaves like an N+1-tuple,
      // but also has secret extra keys you can access,
      // based on the struct field names.
      // e.g. Maybe has keys vs["which"], vs["_None"], and vs["_Some"],
      // corresponding to    vs[0],       vs[1],       and vs[2] respectively.
      // We don't currently use these, but we could.
      unmunge: function(vs) {
        // @ts-ignore
        var ibn = T_UInt.unmunge(vs[0]);
        var i = bigNumberToNumber(ibn);
        var label = ascLabels[i];
        var val = vs[i + 1];
        return V_Data(co)([label, co[label].unmunge(val)]);
      },
      paramType: (function() {
        var ascLabels = labelMaps(co).ascLabels;
        // See comment on unmunge about field names that we could use but currently don't
        var optionTys = ascLabels.map(function(label) { return "".concat(co[label].paramType, " _").concat(label); });
        var tupFields = ["".concat(T_UInt.paramType, " which")].concat(optionTys).join(',');
        return "tuple(".concat(tupFields, ")");
      })()
    });
  };
  var V_Data = function(co) {
    return function(val) {
      return T_Data(co).canonicalize(val);
    };
  };
  var T_Contract = __assign(__assign({}, T_Address), { name: 'Contract' });
  var addressEq = mkAddressEq(T_Address);
  var ctcAddrEq = function(x, y) {
    debug('ctcAddrEq', { x: x, y: y });
    return addressEq(x, y);
  };
  var digestEq = shared_backend.eq;
  var digest_xor = shared_backend.digest_xor;
  var bytes_xor = shared_backend.bytes_xor;
  var btoiLast8 = shared_backend.btoiLast8;
  var T_Token = T_Address;
  var tokenEq = addressEq;
  var typeDefs = {
    T_Null: T_Null,
    T_Bool: T_Bool,
    T_UInt: T_UInt,
    T_UInt256: T_UInt256,
    T_Bytes: T_Bytes,
    T_Address: T_Address,
    T_Contract: T_Contract,
    T_Digest: T_Digest,
    T_Token: T_Token,
    T_Object: T_Object,
    T_Data: T_Data,
    T_Array: T_Array,
    T_Tuple: T_Tuple,
    T_Struct: T_Struct
  };
  var arith = makeArith(UInt_max);
  var emptyContractInfo = "0x00000000000000000000000000000000";
  var stdlib = __assign(__assign(__assign(__assign({}, shared_backend), arith), typeDefs), {
    addressEq: addressEq,
    ctcAddrEq: ctcAddrEq,
    // @ts-ignore
    digestEq: digestEq,
    digest_xor: digest_xor,
    bytes_xor: bytes_xor,
    btoiLast8: btoiLast8,
    tokenEq: tokenEq,
    digest: digest,
    UInt_max: UInt_max,
    emptyContractInfo: emptyContractInfo
  });
  // ...............................................
  // It's the same as stdlib, but with convenient access to
  // stdlib and typeDefs as bundles of bindings
  // TODO: restore type annotation once types are in place
  // const ethLikeCompiled: EthLikeCompiled = {
  var ethLikeCompiled = __assign(__assign({}, stdlib), { typeDefs: typeDefs, stdlib: stdlib });
  return ethLikeCompiled;
}
//# sourceMappingURL=ETH_like_compiled.js.map
