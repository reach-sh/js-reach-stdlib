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
import * as shared_backend from './shared_backend.mjs';
import { debug, labelMaps, makeDigest, mkAddressEq, makeArith, } from './shared_impl.mjs';
import { bigNumberToNumber } from './shared_user.mjs';
import algosdk from 'algosdk';
import buffer from 'buffer';
import ethers from 'ethers';
import * as CBR from './CBR.mjs';
var BigNumber = ethers.BigNumber;
var Buffer = buffer.Buffer;
export var UInt_max = BigNumber.from(2).pow(64).sub(1);
export var digest = makeDigest(function(t, v) { return t.toNet(v); });
export var T_Null = __assign(__assign({}, CBR.BT_Null), { netSize: 0, toNet: function(bv) { return (void(bv), new Uint8Array([])); }, fromNet: function(nv) { return (void(nv), null); } });
export var T_Bool = __assign(__assign({}, CBR.BT_Bool), { netSize: 1, toNet: function(bv) { return new Uint8Array([bv ? 1 : 0]); }, fromNet: function(nv) { return nv[0] == 1; } });
export var T_UInt = __assign(__assign({}, CBR.BT_UInt), {
  netSize: 8,
  toNet: function(bv) { return (ethers.utils.zeroPad(ethers.utils.arrayify(bv), 8)); },
  fromNet: function(nv) {
    // debug(`fromNet: UInt`);
    // if (getDEBUG()) console.log(nv);
    return ethers.BigNumber.from(nv);
  }
});
/** @description For arbitrary utf8 strings */
var stringyNet = {
  toNet: function(bv) { return (ethers.utils.toUtf8Bytes(bv)); },
  fromNet: function(nv) { return (ethers.utils.toUtf8String(nv)); }
};
/** @description For hex strings representing bytes */
var bytestringyNet = {
  toNet: function(bv) { return (ethers.utils.arrayify(bv)); },
  fromNet: function(nv) { return (ethers.utils.hexlify(nv)); }
};
export var T_Bytes = function(len) { return (__assign(__assign(__assign({}, CBR.BT_Bytes(len)), stringyNet), { netSize: bigNumberToNumber(len) })); };
export var T_Digest = __assign(__assign(__assign({}, CBR.BT_Digest), bytestringyNet), { netSize: 32 });
export var addressToHex = function(x) {
  return '0x' + Buffer.from(algosdk.decodeAddress(x).publicKey).toString('hex');
};
export var addressFromHex = function(hexAddr) {
  return algosdk.encodeAddress(Buffer.from(hexAddr.slice(2), 'hex'));
};

function addressUnwrapper(x) {
  var addr = x && x.networkAccount && x.networkAccount.addr ||
    x && x.addr ||
    typeof x === 'string' && x;
  return !addr ? x :
    addr.slice(0, 2) === '0x' ? addr :
    addressToHex(addr);
};
export var T_Address = __assign(__assign(__assign({}, CBR.BT_Address), bytestringyNet), {
  netSize: 32,
  canonicalize: function(uv) {
    var val = addressUnwrapper(uv);
    var hs = CBR.BT_Address.canonicalize(val || uv);
    // We are filling up with zeros if the address is less than 32 bytes
    return hs.padEnd(32 * 2 + 2, '0');
  }
});
export var T_Array = function(co, size) {
  return (__assign(__assign({}, CBR.BT_Array(co, size)), {
    netSize: size * co.netSize,
    toNet: function(bv) {
      return ethers.utils.concat(bv.map(function(v) { return co.toNet(v); }));
    },
    fromNet: function(nv) {
      // TODO: assert nv.size = len * size
      var len = co.netSize;
      var chunks = new Array(size).fill(null);
      for (var i = 0; i < size; i++) {
        var start = i * len;
        chunks[i] = co.fromNet(nv.slice(start, start + len));
      }
      return chunks;
    }
  }));
};
export var T_Tuple = function(cos) {
  return (__assign(__assign({}, CBR.BT_Tuple(cos)), {
    netSize: (cos.reduce((function(acc, co) {
      return acc + co.netSize;
    }), 0)),
    toNet: function(bv) {
      var val = cos.map(function(co, i) { return co.toNet(bv[i]); });
      return ethers.utils.concat(val);
    },
    // TODO: share more code w/ T_Array.fromNet
    fromNet: function(nv) {
      var chunks = new Array(cos.length).fill(null);
      var rest = nv;
      for (var i in cos) {
        var co = cos[i];
        chunks[i] = co.fromNet(rest.slice(0, co.netSize));
        rest = rest.slice(co.netSize);
      }
      return chunks;
    }
  }));
};
export var T_Struct = function(cos) {
  return (__assign(__assign({}, CBR.BT_Struct(cos)), {
    netSize: (cos.reduce(function(acc, co) { return acc + co[1].netSize; }, 0)),
    toNet: function(bv) {
      var val = cos.map(function(_a) {
        var k = _a[0],
          co = _a[1];
        return co.toNet(bv[k]);
      });
      return ethers.utils.concat(val);
    },
    // TODO: share more code w/ T_Array.fromNet
    fromNet: function(nv) {
      var obj = {};
      var rest = nv;
      for (var i in cos) {
        var _a = cos[i],
          k = _a[0],
          co = _a[1];
        obj[k] = co.fromNet(rest.slice(0, co.netSize));
        rest = rest.slice(co.netSize);
      }
      return obj;
    }
  }));
};
export var T_Object = function(coMap) {
  var cos = Object.values(coMap);
  var netSize = cos.reduce(function(acc, co) { return acc + co.netSize; }, 0);
  var ascLabels = labelMaps(coMap).ascLabels;
  return __assign(__assign({}, CBR.BT_Object(coMap)), {
    netSize: netSize,
    toNet: function(bv) {
      var chunks = ascLabels.map(function(label) {
        return coMap[label].toNet(bv[label]);
      });
      return ethers.utils.concat(chunks);
    },
    // TODO: share more code w/ T_Array.fromNet and T_Tuple.fromNet
    fromNet: function(nv) {
      var obj = {};
      var rest = nv;
      for (var iStr in ascLabels) {
        var i = parseInt(iStr);
        var label = ascLabels[i];
        var co = coMap[label];
        obj[label] = co.fromNet(rest.slice(0, co.netSize));
        rest = rest.slice(co.netSize);
      }
      return obj;
    }
  });
};
// 1 byte for the label
// the rest right-padded with zeroes
// up to the size of the largest variant
export var T_Data = function(coMap) {
  var cos = Object.values(coMap);
  var valSize = Math.max.apply(Math, cos.map(function(co) { return co.netSize; }));
  var netSize = valSize + 1;
  var _a = labelMaps(coMap),
    ascLabels = _a.ascLabels,
    labelMap = _a.labelMap;
  return __assign(__assign({}, CBR.BT_Data(coMap)), {
    netSize: netSize,
    toNet: function(_a) {
      var label = _a[0],
        val = _a[1];
      var i = labelMap[label];
      var lab_nv = new Uint8Array([i]);
      var val_co = coMap[label];
      var val_nv = val_co.toNet(val);
      var padding = new Uint8Array(valSize - val_nv.length);
      return ethers.utils.concat([lab_nv, val_nv, padding]);
    },
    fromNet: function(nv) {
      var i = nv[0];
      var label = ascLabels[i];
      var val_co = coMap[label];
      debug({ nv: nv, i: i, label: label, val_co: val_co });
      var rest = nv.slice(1);
      var sliceTo = val_co.netSize;
      var val = val_co.fromNet(rest.slice(0, sliceTo));
      return [label, val];
    }
  });
};
export var addressEq = mkAddressEq(T_Address);
var T_Token = T_UInt;
export var tokenEq = function(x, y) {
  return T_Token.canonicalize(x).eq(T_Token.canonicalize(y));
};
export var typeDefs = {
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
export var stdlib = __assign(__assign(__assign(__assign({}, shared_backend), arith), typeDefs), {
  addressEq: addressEq,
  tokenEq: tokenEq,
  digest: digest,
  UInt_max: UInt_max
});
//# sourceMappingURL=ALGO_compiled.js.map
