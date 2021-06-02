// ****************************************************************************
// standard library needed at runtime by compiled Reach programs
// ****************************************************************************
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
import ethers from 'ethers';
import * as shared_backend from './shared_backend.mjs';
import * as CBR from './CBR.mjs';
import { labelMaps, makeDigest, hexToString, mkAddressEq, makeArith, } from './shared_impl.mjs';
// TODO: restore return type annotation once types are in place
export function makeEthLikeCompiled(ethLikeCompiledArgs) {
  // ...............................................
  var T_Address = ethLikeCompiledArgs.T_Address;
  var UInt_max = ethers.BigNumber.from(2).pow(256).sub(1);
  var digest = makeDigest(function(t, v) {
    // Note: abiCoder.encode doesn't correctly handle an empty tuple type
    if (t.paramType === 'tuple()') {
      if (Array.isArray(v) && v.length === 0) {
        return v;
      } else {
        throw Error("impossible: digest tuple() with non-empty array: " + JSON.stringify(v));
      }
    }
    return ethers.utils.defaultAbiCoder.encode([t.paramType], [t.munge(v)]);
  });
  var V_Null = null;
  var T_Null = __assign(__assign({}, CBR.BT_Null), {
    defaultValue: V_Null,
    // null is represented in solidity as false
    munge: function(bv) { return (void(bv), false); },
    unmunge: function(nv) { return (void(nv), V_Null); },
    paramType: 'bool'
  });
  var T_Bool = __assign(__assign({}, CBR.BT_Bool), { defaultValue: false, munge: function(bv) { return bv; }, unmunge: function(nv) { return V_Bool(nv); }, paramType: 'bool' });
  var V_Bool = function(b) {
    return T_Bool.canonicalize(b);
  };
  var T_UInt = __assign(__assign({}, CBR.BT_UInt), { defaultValue: ethers.BigNumber.from(0), munge: function(bv) { return bv; }, unmunge: function(nv) { return V_UInt(nv); }, paramType: 'uint256' });
  var V_UInt = function(n) {
    return T_UInt.canonicalize(n);
  };
  var T_Bytes = function(len) {
    var me = __assign(__assign({}, CBR.BT_Bytes(len)), { defaultValue: ''.padEnd(len, '\0'), munge: function(bv) { return Array.from(ethers.utils.toUtf8Bytes(bv)); }, unmunge: function(nv) { return me.canonicalize(hexToString(ethers.utils.hexlify(nv))); }, paramType: "uint8[" + len + "]" });
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
  var T_Array = function(ctc, size) {
    return (__assign(__assign({}, CBR.BT_Array(ctc, size)), {
      defaultValue: Array(size).fill(ctc.defaultValue),
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
      paramType: ctc.paramType + "[" + size + "]"
    }));
  };
  var V_Array = function(ctc, size) {
    return function(val) {
      return T_Array(ctc, size).canonicalize(val);
    };
  };
  // XXX fix me Dan, I'm type checking wrong!
  var T_Tuple = function(ctcs) {
    return (__assign(__assign({}, CBR.BT_Tuple(ctcs)), {
      defaultValue: ctcs.map(function(ctc) { return ctc.defaultValue; }),
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
      paramType: "tuple(" + ctcs.map(function(ctc) { return ctc.paramType; }).join(',') + ")"
    }));
  };
  var V_Tuple = function(ctcs) {
    return function(val) {
      return T_Tuple(ctcs).canonicalize(val);
    };
  };
  var T_Struct = function(ctcs) {
    return (__assign(__assign({}, CBR.BT_Struct(ctcs)), {
      defaultValue: (function() {
        var obj = {};
        ctcs.forEach(function(_a) {
          var prop = _a[0],
            co = _a[1];
          obj[prop] = co.defaultValue;
        });
        return obj;
      })(),
      munge: function(bv) {
        if (ctcs.length == 0) {
          return false;
        } else {
          return ctcs.map(function(_a) {
            var k = _a[0],
              ctc = _a[1];
            return ctc.munge(bv[k]);
          });
        }
      },
      unmunge: function(args) {
        return V_Struct(ctcs)(ctcs.map(function(_a, i) {
          var k = _a[0],
            ctc = _a[1];
          void(k);
          return ctc.unmunge(args[i]);
        }));
      },
      paramType: "tuple(" + ctcs.map(function(_a) {
        var k = _a[0],
          ctc = _a[1];
        void(k);
        return ctc.paramType;
      }).join(',') + ")"
    }));
  };
  var V_Struct = function(ctcs) {
    return function(val) {
      return T_Struct(ctcs).canonicalize(val);
    };
  };
  var T_Object = function(co) {
    return (__assign(__assign({}, CBR.BT_Object(co)), {
      defaultValue: (function() {
        var obj = {};
        for (var prop in co) {
          obj[prop] = co[prop].defaultValue;
        }
        return obj;
      })(),
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
        var tupFields = ascLabels.map(function(label) { return co[label].paramType + " _" + label; }).join(',');
        return "tuple(" + tupFields + ")";
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
      defaultValue: (function() {
        var label = ascLabels[0];
        return [label, co[label].defaultValue];
        // return {ty, val: [label, co[label].defaultValue]};
      })(),
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
        var label = _a[0],
          v = _a[1];
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
        var i = vs[0];
        var label = ascLabels[i];
        var val = vs[i + 1];
        return V_Data(co)([label, co[label].unmunge(val)]);
      },
      paramType: (function() {
        var ascLabels = labelMaps(co).ascLabels;
        // See comment on unmunge about field names that we could use but currently don't
        var optionTys = ascLabels.map(function(label) { return co[label].paramType + " _" + label; });
        var tupFields = [T_UInt.paramType + " which"].concat(optionTys).join(',');
        return "tuple(" + tupFields + ")";
      })()
    });
  };
  var V_Data = function(co) {
    return function(val) {
      return T_Data(co).canonicalize(val);
    };
  };
  var addressEq = mkAddressEq(T_Address);
  var T_Token = T_Address;
  var tokenEq = addressEq;
  var typeDefs = {
    T_Null: T_Null,
    T_Bool: T_Bool,
    T_UInt: T_UInt,
    T_Bytes: T_Bytes,
    T_Address: T_Address,
    T_Digest: T_Digest,
    T_Token: T_Token,
    T_Object: T_Object,
    T_Data: T_Data,
    T_Array: T_Array,
    T_Tuple: T_Tuple,
    T_Struct: T_Struct
  };
  var arith = makeArith(UInt_max);
  var stdlib = __assign(__assign(__assign(__assign({}, shared_backend), arith), typeDefs), {
    addressEq: addressEq,
    tokenEq: tokenEq,
    digest: digest,
    UInt_max: UInt_max
  });
  // ...............................................
  // It's the same as stdlib, but with convenient access to
  // stdlib and typeDefs as bundles of bindings
  // TODO: restore type annotation once types are in place
  // const ethLikeCompiled: EthLikeCompiled = {
  var ethLikeCompiled = __assign(__assign({}, stdlib), {
    typeDefs: typeDefs,
    stdlib: stdlib
  });
  return ethLikeCompiled;
}
//# sourceMappingURL=ETH_like_compiled.js.map
