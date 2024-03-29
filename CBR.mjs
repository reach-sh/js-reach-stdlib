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
import ethers from 'ethers';
import { checkedBigNumberify } from './shared_backend.mjs';
import { debug, j2s, labelMaps, hasProp, isUint8Array } from './shared_impl.mjs';
import buffer from 'buffer';
var Buffer = buffer.Buffer;
var BigNumber = ethers.BigNumber;
export var bigNumberify = function(x) {
  var xp = typeof x === 'number' ? x.toString() : x;
  return BigNumber.from(xp);
};
export var bigNumberToNumber = function(x) {
  return bigNumberify(x).toNumber();
};;
export var BV_Null = null;
export var BT_Null = {
  repr: { kind: 'Null' },
  name: 'Null',
  defaultValue: BV_Null,
  canonicalize: function(val) {
    // Doesn't check with triple eq; we're being lenient here
    if (val != null) {
      throw Error("Expected null, but got ".concat(j2s(val)));
    }
    return BV_Null;
  }
};
export var BT_Bool = {
  repr: { kind: 'Bool' },
  name: 'Bool',
  defaultValue: false,
  canonicalize: function(val) {
    if (typeof(val) !== 'boolean') {
      throw Error("Expected boolean, but got ".concat(j2s(val)));
    }
    return val;
  }
};
export var BV_Bool = function(val) {
  return BT_Bool.canonicalize(val);
};
export var BT_UInt = function(max) {
  return ({
    repr: { kind: 'UInt', max: max },
    name: 'UInt',
    defaultValue: ethers.BigNumber.from(0),
    canonicalize: function(uv) {
      try {
        // Note: going through toString handles a lot of numeric representations
        // that BigNumber doesn't handle automatically.
        var uvs =
          // @ts-ignore
          (uv === null || uv === void 0 ? void 0 : uv.type) === 'BigNumber' ? uv :
          // @ts-ignore
          typeof(uv === null || uv === void 0 ? void 0 : uv.toString) === 'function' ? uv.toString() :
          /* else */
          uv;
        return checkedBigNumberify('stdlib:CBR:BT_UInt', max, uvs);
      } catch (e) {
        if (typeof(uv) === 'string') {
          throw Error("String does not represent a BigNumber. ".concat(j2s(uv)));
        }
        throw e;
      }
    }
  });
};
export var BV_UInt = function(val, max) {
  return BT_UInt(max).canonicalize(val);
};
var zpad = function(len, b) {
  var res = Buffer.alloc(len, 0);
  b.copy(res);
  return res;
};
export var arr_to_buf = function(s) { return Buffer.from(s); };
export var str_to_buf = function(s) { return Buffer.from(s); };
export var hex_to_buf = function(s) { return Buffer.from(s.slice(2), 'hex'); };
export var buf_to_arr = function(b) { return new Uint8Array(b); };
export var buf_to_str = function(b) { return b.toString(); };
export var buf_to_hex = function(b) { return '0x' + b.toString('hex'); };
export var unk_to_buf = function(val) {
  if (typeof val === 'string') {
    return val.slice(0, 2) === '0x' ?
      ['hex string', hex_to_buf(val)] :
      ['string', str_to_buf(val)];
  } else if (isUint8Array(val)) {
    return ['Uint8Array', arr_to_buf(val)];
  } else {
    return ['unknown', str_to_buf('')];
  }
};
export var BT_Bytes = function(len) {
  return ({
    repr: { kind: 'Bytes', len: len },
    name: "Bytes(".concat(len, ")"),
    defaultValue: buf_to_str(zpad(bigNumberToNumber(len), str_to_buf(''))),
    canonicalize: function(val) {
      var _a = __read(unk_to_buf(val), 2),
        label = _a[0],
        b = _a[1];
      debug("Canonicalize bytes:", val, "=>", label, b);
      var alen = b.length;
      var lenn = bigNumberToNumber(len);
      if (alen > lenn) {
        throw Error("Bytes(".concat(lenn, ") must be less than or equal to ").concat(lenn, " bytes, but given ").concat(label, " of ").concat(alen, " bytes"));
      }
      var zb = zpad(lenn, b);
      if (label === 'hex string') {
        return buf_to_hex(zb);
      } else if (label === 'string') {
        return buf_to_str(zb);
      } else if (label === 'Uint8Array') {
        return buf_to_arr(zb);
      } else {
        throw Error("Bytes expected string or Uint8Array, but got ".concat(j2s(val), ": ").concat(typeof val));
      }
    }
  });
};
export var BT_BytesDyn = ({
  repr: { kind: 'BytesDyn' },
  name: "BytesDyn",
  defaultValue: '',
  canonicalize: function(val) {
    if (typeof val == 'string') {
      return val;
    } else if (isUint8Array(val)) {
      return val;
    } else {
      throw Error("BytesDyn expected string or Uint8Array, but got ".concat(j2s(val)));
    }
  }
});
export var BT_StringDyn = ({
  repr: { kind: 'StringDyn' },
  name: "StringDyn",
  defaultValue: '',
  canonicalize: function(val) {
    if (typeof(val) !== 'string') {
      throw Error("StringDyn expected string, but got ".concat(j2s(val)));
    }
    return val;
  }
});
// TODO: check digest length, or something similar?
// That's probably best left to connector-specific code.
export var BT_Digest = {
  repr: { kind: 'Digest' },
  name: 'Digest',
  defaultValue: ''.padEnd(32, '\0'),
  canonicalize: function(val) {
    if (typeof val !== 'string') {
      throw Error("".concat(j2s(val), " is not a valid digest"));
    }
    return val;
  }
};
/** @description You probably don't want to create a BV_Digest manually. */
export var BV_Digest = function(val) {
  return BT_Digest.canonicalize(val);
};
export var BT_Address = ({
  repr: { kind: 'Address' },
  name: 'Address',
  defaultValue: ''.padEnd(32, '\0'),
  canonicalize: function(val) {
    if (typeof val !== 'string') {
      throw Error("Address must be a string, but got: ".concat(j2s(val)));
    } else if (val.slice(0, 2) !== '0x') {
      throw Error("Address must start with 0x, but got: ".concat(j2s(val)));
    } else if (!ethers.utils.isHexString(val)) {
      throw Error("Address must be a valid hex string, but got: ".concat(j2s(val)));
    }
    return val;
  }
});
// XXX: don't use this. Use net-specific ones
export var BV_Address = function(val) {
  return BT_Address.canonicalize(val);
};
export var BT_Array = function(ctc, size) {
  // TODO: check ctc, sz for sanity
  return {
    repr: { kind: 'Array', ctc: ctc, size: size },
    name: "Array(".concat(ctc.name, ", ").concat(size, ")"),
    defaultValue: Array(size).fill(ctc.defaultValue),
    canonicalize: function(args) {
      if (!Array.isArray(args)) {
        throw Error("Expected an Array, but got ".concat(j2s(args)));
      }
      if (size != args.length) {
        throw Error("Expected array of length ".concat(size, ", but got ").concat(args.length));
      }
      var parr = new Array(size);
      for (var i = 0; i < size; i++) {
        parr[i] = ctc.canonicalize(args[i]);
      }
      return parr;
    }
  };
};
// Note: curried
/** @example BV_Array(BT_UInt, 3)([1, 2, 3]) */
export var BV_Array = function(ctc, size) {
  return function(val) {
    return BT_Array(ctc, size).canonicalize(val);
  };
};
export var BT_Tuple = function(ctcs) {
  // TODO: check ctcs for sanity
  return {
    repr: { kind: 'Tuple', ctcs: ctcs },
    name: "Tuple(".concat(ctcs.map(function(ctc) { return " ".concat(ctc.name, " "); }), ")"),
    defaultValue: ctcs.map(function(ctc) { return ctc.defaultValue; }),
    canonicalize: function(args) {
      if (!Array.isArray(args)) {
        throw Error("Expected a Tuple, but got ".concat(j2s(args)));
      }
      if (ctcs.length != args.length) {
        throw Error("Expected tuple of size ".concat(ctcs.length, ", but got ").concat(args.length));
      }
      var val = args.map(function(arg, i) { return ctcs[i].canonicalize(arg); });
      return val;
    }
  };
};
// Note: curried
/** @example BV_Tuple([BT_UInt, BT_Bytes])([42, 'hello']) */
export var BV_Tuple = function(ctcs) {
  return function(val) {
    return BT_Tuple(ctcs).canonicalize(val);
  };
};
export var BT_Struct = function(ctcs) {
  return {
    repr: { kind: 'Struct', ctcs: ctcs },
    name: "Struct([".concat(ctcs.map(function(_a) {
      var _b = __read(_a, 2),
        k = _b[0],
        ctc = _b[1];
      return " [".concat(k, ", ").concat(ctc.name, "] ");
    }), "])"),
    defaultValue: (function() {
      var obj = {};
      ctcs.forEach(function(_a) {
        var _b = __read(_a, 2),
          prop = _b[0],
          co = _b[1];
        obj[prop] = co.defaultValue;
      });
      return obj;
    })(),
    canonicalize: function(arg) {
      var obj = {};
      ctcs.forEach(function(_a, i) {
        var _b = __read(_a, 2),
          k = _b[0],
          ctc = _b[1];
        obj[k] = ctc.canonicalize(Array.isArray(arg) ? arg[i] : arg[k]);
      });
      return obj;
    }
  };
};
export var BV_Struct = function(ctcs) {
  return function(val) {
    return BT_Struct(ctcs).canonicalize(val);
  };
};
export var BT_Object = function(co) {
  // TODO: check co for sanity
  return {
    repr: { kind: 'Object', co: co },
    name: "Object(".concat(Object.keys(co).map(function(k) { return " ".concat(k, ": ").concat(co[k].name, " "); }), ")"),
    defaultValue: (function() {
      var obj = {};
      for (var prop in co) {
        obj[prop] = co[prop].defaultValue;
      }
      return obj;
    })(),
    canonicalize: function(vo) {
      if (typeof(vo) !== 'object') {
        throw Error("Expected object, but got ".concat(j2s(vo)));
      }
      var obj = {};
      for (var prop in co) {
        if (!hasProp(vo, prop)) {
          throw Error("Expected prop ".concat(prop, ", but didn't find it in ").concat(Object.keys(vo)));
        }
        obj[prop] = co[prop].canonicalize(vo[prop]);
      }
      return obj;
    }
  };
};
// Note: curried
/** @example BV_Object({x: BT_UInt})({x: 3}) */
export var BV_Object = function(co) {
  return function(val) {
    return BT_Object(co).canonicalize(val);
  };
};
export var BT_Data = function(co) {
  // TODO: check co for sanity
  var ascLabels = labelMaps(co).ascLabels;
  return {
    repr: { kind: 'Data', co: co },
    name: "Data(".concat(Object.keys(co).map(function(k) { return " ".concat(k, ": ").concat(co[k].name, " "); }), ")"),
    defaultValue: (function() {
      var label = ascLabels[0];
      return [label, co[label].defaultValue];
      // return {ty, val: [label, co[label].defaultValue]};
    })(),
    canonicalize: function(io) {
      if (!(Array.isArray(io) && io.length == 2 && typeof io[0] == 'string')) {
        throw Error("Expected an array of length two to represent a data instance, but got ".concat(j2s(io)));
      }
      var vn = io[0];
      if (!hasProp(co, vn)) {
        throw Error("Expected a variant in ".concat(Object.keys(co), ", but got ").concat(vn));
      }
      return [vn, co[vn].canonicalize(io[1])];
    }
  };
};
/** @example BV_Data({x: BT_UInt, y: BT_Bytes})(['x', 3]); */
export var BV_Data = function(co) {
  return function(val) {
    return BT_Data(co).canonicalize(val);
  };
};
//# sourceMappingURL=CBR.js.map
