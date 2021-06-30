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
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.stdlib = exports.typeDefs = exports.tokenEq = exports.addressEq = exports.T_Data = exports.T_Object = exports.T_Struct = exports.T_Tuple = exports.T_Array = exports.T_Address = exports.addressFromHex = exports.addressToHex = exports.T_Digest = exports.T_Bytes = exports.T_UInt = exports.T_Bool = exports.T_Null = exports.digest = exports.UInt_max = void 0;
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
exports.digest = shared_impl_1.makeDigest(function (t, v) { return t.toNet(v); });
exports.T_Null = __assign(__assign({}, CBR.BT_Null), { netSize: 0, toNet: function (bv) { return (void (bv), new Uint8Array([])); }, fromNet: function (nv) { return (void (nv), null); } });
exports.T_Bool = __assign(__assign({}, CBR.BT_Bool), { netSize: 1, toNet: function (bv) { return new Uint8Array([bv ? 1 : 0]); }, fromNet: function (nv) { return nv[0] == 1; } });
exports.T_UInt = __assign(__assign({}, CBR.BT_UInt(exports.UInt_max)), { netSize: 8, toNet: function (bv) {
        try {
            return ethers_1.ethers.utils.zeroPad(ethers_1.ethers.utils.arrayify(bv), 8);
        }
        catch (e) {
            throw new Error("toNet: " + bv + " is out of range [0, " + exports.UInt_max + "]");
        }
    }, fromNet: function (nv) {
        // debug(`fromNet: UInt`);
        // if (getDEBUG()) console.log(nv);
        return ethers_1.ethers.BigNumber.from(nv);
    } });
/** @description For arbitrary utf8 strings */
var stringyNet = {
    toNet: function (bv) { return (ethers_1.ethers.utils.toUtf8Bytes(bv)); },
    fromNet: function (nv) { return (ethers_1.ethers.utils.toUtf8String(nv)); }
};
/** @description For hex strings representing bytes */
var bytestringyNet = {
    toNet: function (bv) { return (ethers_1.ethers.utils.arrayify(bv)); },
    fromNet: function (nv) { return (ethers_1.ethers.utils.hexlify(nv)); }
};
var T_Bytes = function (len) { return (__assign(__assign(__assign({}, CBR.BT_Bytes(len)), stringyNet), { netSize: shared_user_1.bigNumberToNumber(len) })); };
exports.T_Bytes = T_Bytes;
exports.T_Digest = __assign(__assign(__assign({}, CBR.BT_Digest), bytestringyNet), { netSize: 32 });
var addressToHex = function (x) {
    return '0x' + Buffer.from(algosdk_1["default"].decodeAddress(x).publicKey).toString('hex');
};
exports.addressToHex = addressToHex;
var addressFromHex = function (hexAddr) {
    return algosdk_1["default"].encodeAddress(Buffer.from(hexAddr.slice(2), 'hex'));
};
exports.addressFromHex = addressFromHex;
function addressUnwrapper(x) {
    var addr = x && x.networkAccount && x.networkAccount.addr
        || x && x.addr
        || typeof x === 'string' && x;
    return !addr ? x
        : addr.slice(0, 2) === '0x' ? addr
            : exports.addressToHex(addr);
}
;
exports.T_Address = __assign(__assign(__assign({}, CBR.BT_Address), bytestringyNet), { netSize: 32, canonicalize: function (uv) {
        var val = addressUnwrapper(uv);
        var hs = CBR.BT_Address.canonicalize(val || uv);
        // We are filling up with zeros if the address is less than 32 bytes
        return hs.padEnd(32 * 2 + 2, '0');
    } });
var T_Array = function (co, size) { return (__assign(__assign({}, CBR.BT_Array(co, size)), { netSize: size * co.netSize, toNet: function (bv) {
        return ethers_1.ethers.utils.concat(bv.map(function (v) { return co.toNet(v); }));
    }, fromNet: function (nv) {
        // TODO: assert nv.size = len * size
        var len = co.netSize;
        var chunks = new Array(size).fill(null);
        for (var i = 0; i < size; i++) {
            var start = i * len;
            chunks[i] = co.fromNet(nv.slice(start, start + len));
        }
        return chunks;
    } })); };
exports.T_Array = T_Array;
var T_Tuple = function (cos) { return (__assign(__assign({}, CBR.BT_Tuple(cos)), { netSize: (cos.reduce((function (acc, co) {
        return acc + co.netSize;
    }), 0)), toNet: function (bv) {
        var val = cos.map(function (co, i) { return co.toNet(bv[i]); });
        return ethers_1.ethers.utils.concat(val);
    }, 
    // TODO: share more code w/ T_Array.fromNet
    fromNet: function (nv) {
        var chunks = new Array(cos.length).fill(null);
        var rest = nv;
        for (var i in cos) {
            var co = cos[i];
            chunks[i] = co.fromNet(rest.slice(0, co.netSize));
            rest = rest.slice(co.netSize);
        }
        return chunks;
    } })); };
exports.T_Tuple = T_Tuple;
var T_Struct = function (cos) { return (__assign(__assign({}, CBR.BT_Struct(cos)), { netSize: (cos.reduce(function (acc, co) { return acc + co[1].netSize; }, 0)), toNet: function (bv) {
        var val = cos.map(function (_a) {
            var k = _a[0], co = _a[1];
            return co.toNet(bv[k]);
        });
        return ethers_1.ethers.utils.concat(val);
    }, 
    // TODO: share more code w/ T_Array.fromNet
    fromNet: function (nv) {
        var obj = {};
        var rest = nv;
        for (var i in cos) {
            var _a = cos[i], k = _a[0], co = _a[1];
            obj[k] = co.fromNet(rest.slice(0, co.netSize));
            rest = rest.slice(co.netSize);
        }
        return obj;
    } })); };
exports.T_Struct = T_Struct;
var T_Object = function (coMap) {
    var cos = Object.values(coMap);
    var netSize = cos.reduce(function (acc, co) { return acc + co.netSize; }, 0);
    var ascLabels = shared_impl_1.labelMaps(coMap).ascLabels;
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
        } });
};
exports.T_Object = T_Object;
// 1 byte for the label
// the rest right-padded with zeroes
// up to the size of the largest variant
var T_Data = function (coMap) {
    var cos = Object.values(coMap);
    var valSize = Math.max.apply(Math, cos.map(function (co) { return co.netSize; }));
    var netSize = valSize + 1;
    var _a = shared_impl_1.labelMaps(coMap), ascLabels = _a.ascLabels, labelMap = _a.labelMap;
    return __assign(__assign({}, CBR.BT_Data(coMap)), { netSize: netSize, toNet: function (_a) {
            var label = _a[0], val = _a[1];
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
            shared_impl_1.debug({ nv: nv, i: i, label: label, val_co: val_co });
            var rest = nv.slice(1);
            var sliceTo = val_co.netSize;
            var val = val_co.fromNet(rest.slice(0, sliceTo));
            return [label, val];
        } });
};
exports.T_Data = T_Data;
exports.addressEq = shared_impl_1.mkAddressEq(exports.T_Address);
var T_Token = exports.T_UInt;
var tokenEq = function (x, y) {
    return T_Token.canonicalize(x).eq(T_Token.canonicalize(y));
};
exports.tokenEq = tokenEq;
exports.typeDefs = {
    T_Null: exports.T_Null,
    T_Bool: exports.T_Bool,
    T_UInt: exports.T_UInt,
    T_Bytes: exports.T_Bytes,
    T_Address: exports.T_Address,
    T_Digest: exports.T_Digest,
    T_Token: T_Token,
    T_Object: exports.T_Object,
    T_Data: exports.T_Data,
    T_Array: exports.T_Array,
    T_Tuple: exports.T_Tuple,
    T_Struct: exports.T_Struct
};
var arith = shared_impl_1.makeArith(exports.UInt_max);
exports.stdlib = __assign(__assign(__assign(__assign({}, shared_backend), arith), exports.typeDefs), { addressEq: exports.addressEq,
    tokenEq: exports.tokenEq,
    digest: exports.digest,
    UInt_max: exports.UInt_max });
//# sourceMappingURL=ALGO_compiled.js.map