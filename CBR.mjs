import ethers from 'ethers';
var BigNumber = ethers.BigNumber;
export var bigNumberify = function(x) { return BigNumber.from(x); };
export var bigNumberToNumber = function(x) {
  return bigNumberify(x).toNumber();
};
export var BV_Null = null;
export var BT_Null = {
  name: 'Null',
  canonicalize: function(val) {
    // Doesn't check with triple eq; we're being lenient here
    if (val != null) {
      throw Error("Expected null, but got " + JSON.stringify(val));
    }
    return BV_Null;
  }
};
export var BT_Bool = {
  name: 'Bool',
  canonicalize: function(val) {
    if (typeof(val) !== 'boolean') {
      throw Error("Expected boolean, but got " + JSON.stringify(val));
    }
    return val;
  }
};
export var BV_Bool = function(val) {
  return BT_Bool.canonicalize(val);
};
export var BT_UInt = {
  name: 'UInt',
  canonicalize: function(uv) {
    try {
      var val = ethers.BigNumber.from(uv);
      return val;
    } catch (e) {
      if (typeof(uv) === 'string') {
        throw Error("String does not represent a BigNumber. " + JSON.stringify(uv));
      } else {
        throw Error("Expected BigNumber, number, or string, but got " + JSON.stringify(uv));
      }
    }
  }
};
export var BV_UInt = function(val) {
  return BT_UInt.canonicalize(val);
};
export var BT_Bytes = function(len) {
  return ({
    name: "Bytes(" + len + ")",
    canonicalize: function(val) {
      var lenn = bigNumberToNumber(len);
      if (typeof(val) !== 'string') {
        throw Error("Bytes expected string, but got " + JSON.stringify(val));
      }
      var checkLen = function(label, alen, fill) {
        if (val.length > alen) {
          throw Error("Bytes(" + len + ") must be a " + label + "string less than or equal to " + alen + ", but given " + label + "string of length " + val.length);
        }
        return val.padEnd(alen, fill);
      };
      if (val.slice(0, 2) === '0x') {
        return checkLen('hex ', lenn * 2 + 2, '0');
      } else {
        return checkLen('', lenn, '\0');
      }
    }
  });
};
// TODO: check digest length, or something similar?
// That's probably best left to connector-specific code.
export var BT_Digest = {
  name: 'Digest',
  canonicalize: function(val) {
    if (typeof val !== 'string') {
      throw Error(JSON.stringify(val) + " is not a valid digest");
    }
    return val;
  }
};
/** @description You probably don't want to create a BV_Digest manually. */
export var BV_Digest = function(val) {
  return BT_Digest.canonicalize(val);
};
export var BT_Address = ({
  name: 'Address',
  canonicalize: function(val) {
    if (typeof val !== 'string') {
      throw Error("Address must be a string, but got: " + JSON.stringify(val));
    } else if (val.slice(0, 2) !== '0x') {
      throw Error("Address must start with 0x, but got: " + JSON.stringify(val));
    } else if (!ethers.utils.isHexString(val)) {
      throw Error("Address must be a valid hex string, but got: " + JSON.stringify(val));
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
    name: "Array(" + ctc.name + ", " + size + ")",
    canonicalize: function(args) {
      if (!Array.isArray(args)) {
        throw Error("Expected an Array, but got " + JSON.stringify(args));
      }
      if (size != args.length) {
        throw Error("Expected array of length " + size + ", but got " + args.length);
      }
      var val = args.map(function(arg) { return ctc.canonicalize(arg); });
      return val;
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
    name: "Tuple(" + ctcs.map(function(ctc) { return " " + ctc.name + " "; }) + ")",
    canonicalize: function(args) {
      if (!Array.isArray(args)) {
        throw Error("Expected a Tuple, but got " + JSON.stringify(args));
      }
      if (ctcs.length != args.length) {
        throw Error("Expected tuple of size " + ctcs.length + ", but got " + args.length);
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
    name: "Struct([" + ctcs.map(function(_a) {
      var k = _a[0],
        ctc = _a[1];
      return " [" + k + ", " + ctc.name + "] ";
    }) + "])",
    canonicalize: function(arg) {
      var obj = {};
      ctcs.forEach(function(_a, i) {
        var k = _a[0],
          ctc = _a[1];
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
    name: "Object(" + Object.keys(co).map(function(k) { return " " + k + ": " + co[k].name + " "; }) + ")",
    canonicalize: function(vo) {
      if (typeof(vo) !== 'object') {
        throw Error("Expected object, but got " + JSON.stringify(vo));
      }
      var obj = {};
      for (var prop in co) {
        // This is dumb but it's how ESLint says to do it
        // https://eslint.org/docs/rules/no-prototype-builtins
        if (!{}.hasOwnProperty.call(vo, prop)) {
          throw Error("Expected prop " + prop + ", but didn't found it in " + Object.keys(vo));
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
  return {
    name: "Data(" + Object.keys(co).map(function(k) { return " " + k + ": " + co[k].name + " "; }) + ")",
    canonicalize: function(io) {
      if (!(Array.isArray(io) && io.length == 2 && typeof io[0] == 'string')) {
        throw Error("Expected an array of length two to represent a data instance, but got " + JSON.stringify(io));
      }
      var vn = io[0];
      if (!{}.hasOwnProperty.call(co, vn)) {
        throw Error("Expected a variant in " + Object.keys(co) + ", but got " + vn);
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
