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
exports.__esModule = true;
exports.T_Address = void 0;
var CBR = __importStar(require("./CBR"));
function addressUnwrapper(x) {
    if (typeof x === 'string') {
        // XXX is this actually needed?
        if (x.slice(0, 2) !== '0x') {
            return '0x' + x;
        }
        else {
            return x;
        }
    }
    else if (x.networkAccount && x.networkAccount.address) {
        return (x.networkAccount.address);
    }
    else if (x.address) {
        return x.address;
    }
    else {
        throw Error("Failed to unwrap address ".concat(x));
    }
}
exports.T_Address = __assign(__assign({}, CBR.BT_Address), { canonicalize: function (uv) {
        var val = addressUnwrapper(uv);
        return CBR.BT_Address.canonicalize(val || uv);
    }, defaultValue: '0x' + Array(40).fill('0').join(''), munge: function (bv) { return bv; }, unmunge: function (nv) { return exports.T_Address.canonicalize(nv); }, paramType: 'address' });
//# sourceMappingURL=ETH_compiled_impl.js.map