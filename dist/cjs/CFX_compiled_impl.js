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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.T_Address = exports.getNetworkId = exports.setNetworkId = void 0;
var eci = __importStar(require("./ETH_compiled_impl"));
var buffer_1 = __importDefault(require("buffer"));
var CFX_util_1 = require("./CFX_util");
var shared_impl_1 = require("./shared_impl");
var Buffer = buffer_1["default"].Buffer;
// XXX find a better way to support multiple netIds
var netId = 999;
function setNetworkId(networkId) {
    netId = networkId;
    exports.T_Address.defaultValue = recomputeDefaultAddr();
}
exports.setNetworkId = setNetworkId;
function getNetworkId() {
    return netId;
}
exports.getNetworkId = getNetworkId;
// XXX this should not be computed at compile time, because it can change based on the netId
// Note: 0x1 = user, 0x8 = contract
// https://github.com/resodo/conflux-address-js/blob/0cbbe3d17fbd6cbc2c2fbafc3470ff6087f38087/lib/index.js#L86
// defaultValue: address_cfxStandardize(address_ethToCfx(eci.T_Address.defaultValue.replace('0x0', '0x1'))),
// XXX I (Dan) would like to address_cfxStandardize here, but I can't figure out how to disentangle defaultValue
// so that this addr defaultValue can be different than its ETH-equivalent defaultValue.
// (0x0 is not considered a valid addr prefix for the new cfx addr style)
function recomputeDefaultAddr() {
    return address_ethToCfx(eci.T_Address.defaultValue);
}
function address_ethToCfx(addrE) {
    (0, shared_impl_1.debug)("address_ethToCfx", "call", addrE);
    addrE = addrE.toLowerCase();
    var addrB = Buffer.from(addrE.slice(2), 'hex');
    var addrC = (0, CFX_util_1.encodeCfxAddress)(addrB, netId);
    return addrC;
}
// Note: does not add the mixed-case checksum info to the ETH-like address
function address_cfxToEth(addrC) {
    // XXX why doesn't ts know about this fn?
    (0, shared_impl_1.debug)("address_cfxToEth", "call", addrC);
    var addrObj = (0, CFX_util_1.decodeCfxAddress)(addrC);
    var addrE = '0x' + addrObj.hexAddress.toString('hex');
    if (netId !== addrObj.netId) {
        (0, shared_impl_1.debug)("Expected netId=".concat(netId, ", got netId=").concat(addrObj.netId, "."), "You might want to select ".concat(netId, " in Conflux Portal."));
    }
    return addrE;
}
exports.T_Address = __assign(__assign({}, eci.T_Address), { canonicalize: function (uv) {
        (0, shared_impl_1.debug)("address canonicalize", { uv: uv });
        if (typeof uv === 'string') {
            if (uv.slice(0, 2) === '0x') {
                var addrC = address_ethToCfx(uv);
                return (0, CFX_util_1.address_cfxStandardize)(addrC);
            }
            return (0, CFX_util_1.address_cfxStandardize)(uv);
        }
        if (!uv)
            throw Error("Expected address, got ".concat((0, shared_impl_1.j2s)(uv)));
        // XXX what's a better way to show ts what's going on?
        var uobj = uv;
        if (uobj.networkAccount) {
            return exports.T_Address.canonicalize(uobj.networkAccount);
        }
        if (uobj.address) {
            return exports.T_Address.canonicalize(uobj.address);
        }
        throw Error("TODO: canonicalize non-string addr");
    }, defaultValue: recomputeDefaultAddr(), 
    // Note: address_cfxToEth is not strictly necessary for munge.
    // ((x) => x) also seems to work.
    // But perhaps CBR for CFX should be the hex string, more like ETH?
    // Will the CFX apis someday reject addresses in hex format? Probably not?
    munge: function (bv) { return address_cfxToEth(bv); }, unmunge: function (nv) { return exports.T_Address.canonicalize(nv); } });
//# sourceMappingURL=CFX_compiled_impl.js.map