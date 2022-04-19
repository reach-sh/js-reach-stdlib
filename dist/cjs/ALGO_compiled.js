"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.stdlib = exports.emptyContractInfo = exports.typeDefs = exports.tokenEq = exports.ctcAddrEq = exports.btoiLast8 = exports.bytes_xor = exports.digest_xor = exports.digestEq = exports.addressEq = exports.T_Data = exports.T_Object = exports.T_Struct = exports.T_Tuple = exports.T_Array = exports.T_Contract = exports.T_Address = exports.extractAddr = exports.addressFromHex = exports.addressToHex = exports.T_Digest = exports.T_Bytes = exports.bytestringyNet = exports.T_UInt256 = exports.T_UInt = exports.T_Bool = exports.T_Null = exports.digest = exports.UInt_max = void 0;
var shared_backend = __importStar(require("./shared_backend"));
var shared_impl_1 = require("./shared_impl");
var shared_user_1 = require("./shared_user");
var algosdk_1 = __importDefault(require("algosdk"));
var buffer_1 = __importDefault(require("buffer"));
var ethers_1 = require("ethers");
var CBR = __importStar(require("./CBR"));
var BigNumber = ethers_1.ethers.BigNumber;
var Buffer = buffer_1["default"].Buffer;
exports.UInt_max = BigNumber.from(2).pow(64).sub(1);
;
exports.digest = (0, shared_impl_1.makeDigest)('sha256', function (t, v) { return t.toNet(v); });
exports.T_Null = __assign(__assign({}, CBR.BT_Null), { netSize: 0, toNet: function (bv) { return (void (bv), new Uint8Array([])); }, fromNet: function (nv) { return (void (nv), null); }, netName: 'byte[0]' });
exports.T_Bool = __assign(__assign({}, CBR.BT_Bool), { netSize: 1, toNet: function (bv) { return new Uint8Array([bv ? 1 : 0]); }, fromNet: function (nv) { return nv[0] == 1; }, netName: 'byte' });
exports.T_UInt = __assign(__assign({}, CBR.BT_UInt(exports.UInt_max)), { netSize: 8, toNet: function (bv) {
        try {
            return ethers_1.ethers.utils.zeroPad(ethers_1.ethers.utils.arrayify(bv), 8);
        }
        catch (e) {
            throw new Error("toNet: ".concat(bv, " is out of range [0, ").concat(exports.UInt_max, "]"));
        }
    }, fromNet: function (nv) {
        // debug(`fromNet: UInt`, nv);
        // if (getDEBUG()) console.log(nv);
        return ethers_1.ethers.BigNumber.from(nv.slice(0, 8));
    }, netName: 'uint64' });
exports.T_UInt256 = __assign(__assign({}, CBR.BT_UInt(shared_impl_1.UInt256_max)), { netSize: 32, toNet: function (bv) {
        try {
            return ethers_1.ethers.utils.zeroPad(ethers_1.ethers.utils.arrayify(bv), 32);
        }
        catch (e) {
            throw new Error("toNet: ".concat(bv, " is out of range [0, ").concat(shared_impl_1.UInt256_max, "]"));
        }
    }, fromNet: function (nv) {
        // debug(`fromNet: UInt`, nv);
        // if (getDEBUG()) console.log(nv);
        return ethers_1.ethers.BigNumber.from(nv.slice(0, 32));
    }, netName: 'uint256' });
/** @description For arbitrary utf8 strings */
var stringyNet = function (len) { return ({
    toNet: function (bv) { return (ethers_1.ethers.utils.toUtf8Bytes(bv)); },
    fromNet: function (nv) { return (ethers_1.ethers.utils.toUtf8String(nv.slice(0, len))); }
}); };
/** @description For hex strings representing bytes */
var bytestringyNet = function (len) { return ({
    netSize: len,
    netName: "byte[".concat(len, "]"),
    toNet: function (bv) {
        return ethers_1.ethers.utils.arrayify(bv);
    },
    fromNet: function (nv) {
        return ethers_1.ethers.utils.hexlify(nv.slice(0, len));
    }
}); };
exports.bytestringyNet = bytestringyNet;
var T_Bytes = function (len) { return (__assign(__assign(__assign({}, CBR.BT_Bytes(len)), stringyNet(len)), { netSize: (0, shared_user_1.bigNumberToNumber)(len), netName: "byte[".concat(len, "]") })); };
exports.T_Bytes = T_Bytes;
exports.T_Digest = __assign(__assign(__assign({}, CBR.BT_Digest), (0, exports.bytestringyNet)(32)), { netName: "digest" });
var addressToHex = function (x) {
    return '0x' + Buffer.from(algosdk_1["default"].decodeAddress(x).publicKey).toString('hex');
};
exports.addressToHex = addressToHex;
var addressFromHex = function (hexAddr) {
    return algosdk_1["default"].encodeAddress(Buffer.from(hexAddr.slice(2), 'hex'));
};
exports.addressFromHex = addressFromHex;
var extractAddrM = function (x) {
    var addr = (x && x.networkAccount && x.networkAccount.addr)
        || (x && x.addr)
        || (typeof x === 'string' && x);
    //debug(`extractAddrM`, {x, addr});
    return addr;
};
var extractAddr = function (x) {
    var a = extractAddrM(x);
    //debug(`extractAddr`, {x, a});
    if (a === false) {
        throw Error("Expected address, got ".concat(x));
    }
    return a;
};
exports.extractAddr = extractAddr;
function addressUnwrapper(x) {
    var addr = extractAddrM(x);
    return !addr ? x
        : addr.slice(0, 2) === '0x' ? addr
            : (0, exports.addressToHex)(addr);
}
;
exports.T_Address = __assign(__assign(__assign({}, CBR.BT_Address), (0, exports.bytestringyNet)(32)), { netSize: 32, canonicalize: function (uv) {
        var val = addressUnwrapper(uv);
        var hs = CBR.BT_Address.canonicalize(val || uv);
        // We are filling up with zeros if the address is less than 32 bytes
        return hs.padEnd(32 * 2 + 2, '0');
    }, netName: "address" });
exports.T_Contract = __assign(__assign({}, exports.T_UInt), { name: 'Contract' });
var T_Array = function (co, size_u) {
    var size = (0, shared_user_1.bigNumberToNumber)((0, shared_user_1.bigNumberify)(size_u));
    (0, shared_impl_1.debug)('T_Array', co, size);
    var asTuple = (0, exports.T_Tuple)(new Array(size).fill(co));
    (0, shared_impl_1.debug)('T_Array', asTuple);
    var netSize = asTuple.netSize, toNet = asTuple.toNet, fromNet = asTuple.fromNet;
    return __assign(__assign({}, CBR.BT_Array(co, size)), { netSize: netSize, toNet: toNet, fromNet: fromNet, netName: "".concat(co.netName, "[").concat(size, "]") });
};
exports.T_Array = T_Array;
var T_Tuple = function (cos) { return (__assign(__assign({}, CBR.BT_Tuple(cos)), { netSize: (cos.reduce((function (acc, co) {
        return acc + co.netSize;
    }), 0)), toNet: function (bv) {
        var val = cos.map(function (co, i) { return co.toNet(bv[i]); });
        return ethers_1.ethers.utils.concat(val);
    }, 
    // TODO: share more code w/ T_Array.fromNet
    fromNet: function (nv) {
        //debug(`Tuple.fromNet`, cos.map((x) => x.name), nv);
        var chunks = new Array(cos.length).fill(null);
        var rest = nv;
        for (var i in cos) {
            var co = cos[i];
            chunks[i] = co.fromNet(rest.slice(0, co.netSize));
            rest = rest.slice(co.netSize);
        }
        return chunks;
    }, netName: "(".concat(cos.map(function (c) { return c.netName; }).join(','), ")") })); };
exports.T_Tuple = T_Tuple;
var T_Struct = function (cos) { return (__assign(__assign({}, CBR.BT_Struct(cos)), { netSize: (cos.reduce(function (acc, co) { return acc + co[1].netSize; }, 0)), toNet: function (bv) {
        var val = cos.map(function (_a) {
            var _b = __read(_a, 2), k = _b[0], co = _b[1];
            return co.toNet(bv[k]);
        });
        return ethers_1.ethers.utils.concat(val);
    }, 
    // TODO: share more code w/ T_Array.fromNet
    fromNet: function (nv) {
        var obj = {};
        var rest = nv;
        for (var i in cos) {
            var _a = __read(cos[i], 2), k = _a[0], co = _a[1];
            obj[k] = co.fromNet(rest.slice(0, co.netSize));
            rest = rest.slice(co.netSize);
        }
        return obj;
    }, netName: "(".concat(cos.map(function (c) { return c[1].netName; }).join(','), ")") })); };
exports.T_Struct = T_Struct;
var T_Object = function (coMap) {
    var cos = Object.values(coMap);
    var netSize = cos.reduce(function (acc, co) { return acc + co.netSize; }, 0);
    var ascLabels = (0, shared_impl_1.labelMaps)(coMap).ascLabels;
    return __assign(__assign({}, CBR.BT_Object(coMap)), { netSize: netSize, toNet: function (bv) {
            var chunks = ascLabels.map(function (label) {
                return coMap[label].toNet(bv[label]);
            });
            return ethers_1.ethers.utils.concat(chunks);
        }, 
        // TODO: share more code w/ T_Array.fromNet and T_Tuple.fromNet
        fromNet: function (nv) {
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
        }, netName: "(".concat(cos.map(function (c) { return c.netName; }).join(','), ")") });
};
exports.T_Object = T_Object;
// 1 byte for the label
// the rest right-padded with zeroes
// up to the size of the largest variant
var T_Data = function (coMap) {
    var cos = Object.values(coMap);
    var cosSizes = cos.map(function (co) { return co.netSize; });
    var valSize = Math.max.apply(Math, __spreadArray([], __read(cosSizes), false));
    var netSize = valSize + 1;
    (0, shared_impl_1.debug)("T_Data", { cos: cos, cosSizes: cosSizes, valSize: valSize, netSize: netSize });
    var _a = (0, shared_impl_1.labelMaps)(coMap), ascLabels = _a.ascLabels, labelMap = _a.labelMap;
    return __assign(__assign({}, CBR.BT_Data(coMap)), { netSize: netSize, toNet: function (_a) {
            var _b = __read(_a, 2), label = _b[0], val = _b[1];
            var i = labelMap[label];
            var lab_nv = new Uint8Array([i]);
            var val_co = coMap[label];
            var val_nv = val_co.toNet(val);
            var padding = new Uint8Array(valSize - val_nv.length);
            return ethers_1.ethers.utils.concat([lab_nv, val_nv, padding]);
        }, fromNet: function (nv) {
            var i = nv[0];
            var label = ascLabels[i];
            var val_co = coMap[label];
            (0, shared_impl_1.debug)({ nv: nv, i: i, label: label, val_co: val_co });
            var rest = nv.slice(1);
            var sliceTo = val_co.netSize;
            var val = val_co.fromNet(rest.slice(0, sliceTo));
            return [label, val];
        }, netName: "(byte,byte[".concat(valSize, "])") });
};
exports.T_Data = T_Data;
exports.addressEq = (0, shared_impl_1.mkAddressEq)(exports.T_Address);
exports.digestEq = shared_backend.bytesEq;
exports.digest_xor = shared_backend.digest_xor;
exports.bytes_xor = shared_backend.bytes_xor;
exports.btoiLast8 = shared_backend.btoiLast8;
var T_Token = exports.T_UInt;
var ctcAddrEq = function (x, y) {
    (0, shared_impl_1.debug)('ctcAddrEq', { x: x, y: y });
    var ctc_x = exports.T_Contract.canonicalize(x);
    var addr_y = exports.T_Address.canonicalize(y);
    var addr_x = algosdk_1["default"].getApplicationAddress((0, shared_user_1.bigNumberToBigInt)(ctc_x));
    (0, shared_impl_1.debug)('ctcAddrEq', { addr_x: addr_x, addr_y: addr_y });
    return (0, exports.addressEq)(addr_x, addr_y);
};
exports.ctcAddrEq = ctcAddrEq;
var tokenEq = function (x, y) {
    return T_Token.canonicalize(x).eq(T_Token.canonicalize(y));
};
exports.tokenEq = tokenEq;
exports.typeDefs = {
    T_Null: exports.T_Null,
    T_Bool: exports.T_Bool,
    T_UInt: exports.T_UInt,
    T_UInt256: exports.T_UInt256,
    T_Bytes: exports.T_Bytes,
    T_Address: exports.T_Address,
    T_Contract: exports.T_Contract,
    T_Digest: exports.T_Digest,
    T_Token: T_Token,
    T_Object: exports.T_Object,
    T_Data: exports.T_Data,
    T_Array: exports.T_Array,
    T_Tuple: exports.T_Tuple,
    T_Struct: exports.T_Struct
};
exports.emptyContractInfo = 0;
var arith = (0, shared_impl_1.makeArith)(exports.UInt_max);
exports.stdlib = __assign(__assign(__assign(__assign({}, shared_backend), arith), exports.typeDefs), { addressEq: exports.addressEq, ctcAddrEq: exports.ctcAddrEq, digestEq: exports.digestEq, tokenEq: exports.tokenEq, digest: exports.digest, UInt_max: exports.UInt_max, emptyContractInfo: exports.emptyContractInfo });
//# sourceMappingURL=ALGO_compiled.js.map