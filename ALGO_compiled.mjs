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
import * as shared_backend from './shared_backend.mjs';
import { debug, labelMaps, makeDigest, mkAddressEq, makeArith, UInt256_max, } from './shared_impl.mjs';
import { bigNumberToNumber, bigNumberify, bigNumberToBigInt, } from './shared_user.mjs';
import algosdk from 'algosdk';
import buffer from 'buffer';
import ethers from 'ethers';
import * as CBR from './CBR.mjs';
var BigNumber = ethers.BigNumber;
var Buffer = buffer.Buffer;
export var UInt_max = BigNumber.from(2).pow(64).sub(1);;
export var digest = makeDigest('sha256', function(t, v) { return t.toNet(v); });
export var T_Null = __assign(__assign({}, CBR.BT_Null), { netSize: 0, toNet: function(bv) { return (void(bv), new Uint8Array([])); }, fromNet: function(nv) { return (void(nv), null); }, netName: 'byte[0]' });
export var T_Bool = __assign(__assign({}, CBR.BT_Bool), { netSize: 1, toNet: function(bv) { return new Uint8Array([bv ? 1 : 0]); }, fromNet: function(nv) { return nv[0] == 1; }, netName: 'byte' });
export var T_UInt = __assign(__assign({}, CBR.BT_UInt(UInt_max)), {
  netSize: 8,
  toNet: function(bv) {
    try {
      return ethers.utils.zeroPad(ethers.utils.arrayify(bv), 8);
    } catch (e) {
      throw new Error("toNet: ".concat(bv, " is out of range [0, ").concat(UInt_max, "]"));
    }
  },
  fromNet: function(nv) {
    // debug(`fromNet: UInt`, nv);
    // if (getDEBUG()) console.log(nv);
    return ethers.BigNumber.from(nv.slice(0, 8));
  },
  netName: 'uint64'
});
export var T_UInt256 = __assign(__assign({}, CBR.BT_UInt(UInt256_max)), {
  netSize: 32,
  toNet: function(bv) {
    try {
      return ethers.utils.zeroPad(ethers.utils.arrayify(bv), 32);
    } catch (e) {
      throw new Error("toNet: ".concat(bv, " is out of range [0, ").concat(UInt256_max, "]"));
    }
  },
  fromNet: function(nv) {
    // debug(`fromNet: UInt`, nv);
    // if (getDEBUG()) console.log(nv);
    return ethers.BigNumber.from(nv.slice(0, 32));
  },
  netName: 'uint256'
});
/** @description For arbitrary utf8 strings */
var stringyNet = function(len) {
  return ({
    toNet: function(bv) { return (ethers.utils.toUtf8Bytes(bv)); },
    fromNet: function(nv) { return (ethers.utils.toUtf8String(nv.slice(0, len))); }
  });
};
/** @description For hex strings representing bytes */
export var bytestringyNet = function(len) {
  return ({
    netSize: len,
    netName: "byte[".concat(len, "]"),
    toNet: function(bv) {
      return ethers.utils.arrayify(bv);
    },
    fromNet: function(nv) {
      return ethers.utils.hexlify(nv.slice(0, len));
    }
  });
};
export var T_Bytes = function(len) { return (__assign(__assign(__assign({}, CBR.BT_Bytes(len)), stringyNet(len)), { netSize: bigNumberToNumber(len), netName: "byte[".concat(len, "]") })); };
export var T_Digest = __assign(__assign(__assign({}, CBR.BT_Digest), bytestringyNet(32)), { netName: "digest" });
export var addressToHex = function(x) {
  return '0x' + Buffer.from(algosdk.decodeAddress(x).publicKey).toString('hex');
};
export var addressFromHex = function(hexAddr) {
  return algosdk.encodeAddress(Buffer.from(hexAddr.slice(2), 'hex'));
};
var extractAddrM = function(x) {
  var addr = (x && x.networkAccount && x.networkAccount.addr) ||
    (x && x.addr) ||
    (typeof x === 'string' && x);
  //debug(`extractAddrM`, {x, addr});
  return addr;
};
export var extractAddr = function(x) {
  var a = extractAddrM(x);
  //debug(`extractAddr`, {x, a});
  if (a === false) {
    throw Error("Expected address, got ".concat(x));
  }
  return a;
};

function addressUnwrapper(x) {
  var addr = extractAddrM(x);
  return !addr ? x :
    addr.slice(0, 2) === '0x' ? addr :
    addressToHex(addr);
};
export var T_Address = __assign(__assign(__assign({}, CBR.BT_Address), bytestringyNet(32)), {
  netSize: 32,
  canonicalize: function(uv) {
    var val = addressUnwrapper(uv);
    var hs = CBR.BT_Address.canonicalize(val || uv);
    // We are filling up with zeros if the address is less than 32 bytes
    return hs.padEnd(32 * 2 + 2, '0');
  },
  netName: "address"
});
export var T_Contract = __assign(__assign({}, T_UInt), { name: 'Contract' });
export var T_Array = function(co, size_u) {
  var size = bigNumberToNumber(bigNumberify(size_u));
  debug('T_Array', co, size);
  var asTuple = T_Tuple(new Array(size).fill(co));
  debug('T_Array', asTuple);
  var netSize = asTuple.netSize,
    toNet = asTuple.toNet,
    fromNet = asTuple.fromNet;
  return __assign(__assign({}, CBR.BT_Array(co, size)), { netSize: netSize, toNet: toNet, fromNet: fromNet, netName: "".concat(co.netName, "[").concat(size, "]") });
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
      //debug(`Tuple.fromNet`, cos.map((x) => x.name), nv);
      var chunks = new Array(cos.length).fill(null);
      var rest = nv;
      for (var i in cos) {
        var co = cos[i];
        chunks[i] = co.fromNet(rest.slice(0, co.netSize));
        rest = rest.slice(co.netSize);
      }
      return chunks;
    },
    netName: "(".concat(cos.map(function(c) { return c.netName; }).join(','), ")")
  }));
};
export var T_Struct = function(cos) {
  return (__assign(__assign({}, CBR.BT_Struct(cos)), {
    netSize: (cos.reduce(function(acc, co) { return acc + co[1].netSize; }, 0)),
    toNet: function(bv) {
      var val = cos.map(function(_a) {
        var _b = __read(_a, 2),
          k = _b[0],
          co = _b[1];
        return co.toNet(bv[k]);
      });
      return ethers.utils.concat(val);
    },
    // TODO: share more code w/ T_Array.fromNet
    fromNet: function(nv) {
      var obj = {};
      var rest = nv;
      for (var i in cos) {
        var _a = __read(cos[i], 2),
          k = _a[0],
          co = _a[1];
        obj[k] = co.fromNet(rest.slice(0, co.netSize));
        rest = rest.slice(co.netSize);
      }
      return obj;
    },
    netName: "(".concat(cos.map(function(c) { return c[1].netName; }).join(','), ")")
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
    },
    netName: "(".concat(cos.map(function(c) { return c.netName; }).join(','), ")")
  });
};
// 1 byte for the label
// the rest right-padded with zeroes
// up to the size of the largest variant
export var T_Data = function(coMap) {
  var cos = Object.values(coMap);
  var cosSizes = cos.map(function(co) { return co.netSize; });
  var valSize = Math.max.apply(Math, __spreadArray([], __read(cosSizes), false));
  var netSize = valSize + 1;
  debug("T_Data", { cos: cos, cosSizes: cosSizes, valSize: valSize, netSize: netSize });
  var _a = labelMaps(coMap),
    ascLabels = _a.ascLabels,
    labelMap = _a.labelMap;
  return __assign(__assign({}, CBR.BT_Data(coMap)), {
    netSize: netSize,
    toNet: function(_a) {
      var _b = __read(_a, 2),
        label = _b[0],
        val = _b[1];
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
    },
    netName: "(byte,byte[".concat(valSize, "])")
  });
};
export var addressEq = mkAddressEq(T_Address);
export var digestEq = shared_backend.bytesEq;
export var digest_xor = shared_backend.digest_xor;
export var bytes_xor = shared_backend.bytes_xor;
export var btoiLast8 = shared_backend.btoiLast8;
var T_Token = T_UInt;
export var ctcAddrEq = function(x, y) {
  debug('ctcAddrEq', { x: x, y: y });
  var ctc_x = T_Contract.canonicalize(x);
  var addr_y = T_Address.canonicalize(y);
  var addr_x = algosdk.getApplicationAddress(bigNumberToBigInt(ctc_x));
  debug('ctcAddrEq', { addr_x: addr_x, addr_y: addr_y });
  return addressEq(addr_x, addr_y);
};
export var tokenEq = function(x, y) {
  return T_Token.canonicalize(x).eq(T_Token.canonicalize(y));
};
export var typeDefs = {
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
export var emptyContractInfo = 0;
var arith = makeArith(UInt_max);
export var stdlib = __assign(__assign(__assign(__assign({}, shared_backend), arith), typeDefs), { addressEq: addressEq, ctcAddrEq: ctcAddrEq, digestEq: digestEq, tokenEq: tokenEq, digest: digest, UInt_max: UInt_max, emptyContractInfo: emptyContractInfo });
//# sourceMappingURL=ALGO_compiled.js.map
