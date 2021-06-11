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
exports.T_Address = void 0;
var eci = __importStar(require("./ETH_compiled_impl"));
var js_conflux_sdk_1 = __importDefault(require("js-conflux-sdk"));
var buffer_1 = __importDefault(require("buffer"));
var CFX_util_1 = require("./CFX_util");
var Buffer = buffer_1["default"].Buffer;
// XXX find a better way to support multiple netIds
var netId = 999;
function address_ethToCfx(addrE) {
    addrE = addrE.toLowerCase();
    var addrB = Buffer.from(addrE.slice(2), 'hex');
    // XXX why doesn't ts know about this fn?
    var addrC = js_conflux_sdk_1["default"].address.encodeCfxAddress(addrB, netId);
    return addrC;
}
// Note: does not add the mixed-case checksum info to the ETH-like address
function address_cfxToEth(addrC) {
    // XXX why doesn't ts know about this fn?
    var addrObj = js_conflux_sdk_1["default"].address.decodeCfxAddress(addrC);
    var addrE = '0x' + addrObj.hexAddress.toString('hex');
    if (netId !== addrObj.netId)
        throw Error("Expected netId=" + netId + ", got netId=" + addrObj.netId);
    return addrE;
}
exports.T_Address = __assign(__assign({}, eci.T_Address), { canonicalize: function (uv) {
        if (typeof uv === 'string') {
            if (uv.slice(0, 2) === '0x') {
                var addrC = address_ethToCfx(uv);
                return CFX_util_1.address_cfxStandardize(addrC);
            }
            return CFX_util_1.address_cfxStandardize(uv);
        }
        if (!uv)
            throw Error("Expected address, got " + JSON.stringify(uv));
        // XXX what's a better way to show ts what's going on?
        var uobj = uv;
        if (uobj.networkAccount) {
            return exports.T_Address.canonicalize(uobj.networkAccount);
        }
        if (uobj.address) {
            return exports.T_Address.canonicalize(uobj.address);
        }
        throw Error("TODO: canonicalize non-string addr");
    }, defaultValue: 'XXX', 
    // Note: address_cfxToEth is not strictly necessary for munge.
    // ((x) => x) also seems to work.
    // But perhaps CBR for CFX should be the hex string, more like ETH?
    // Will the CFX apis someday reject addresses in hex format? Probably not?
    munge: function (bv) { return address_cfxToEth(bv); }, unmunge: function (nv) { return exports.T_Address.canonicalize(nv); } });
//# sourceMappingURL=CFX_compiled_impl.js.map