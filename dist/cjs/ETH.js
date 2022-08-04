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
exports.load = void 0;
var ETH_like_1 = require("./ETH_like");
var ethImpl = __importStar(require("./ETH_impl"));
var ethers = __importStar(require("ethers"));
var shared_user = __importStar(require("./shared_user"));
var ETH_compiled = __importStar(require("./ETH_compiled"));
var ETH_compiled_impl = __importStar(require("./ETH_compiled_impl"));
var _ETH_compiled_impl = ETH_compiled_impl;
void (_ETH_compiled_impl);
var load = function () {
    var ethers_ = ethers;
    var ethImpl_ = ethImpl;
    var ethLike = (0, ETH_like_1.makeEthLike)(ethImpl_);
    var ETH_compiled_ = ETH_compiled;
    var connector = 'ETH';
    return __assign(__assign(__assign(__assign(__assign(__assign({}, ethers_), ethLike), ethLike.reachStdlib), shared_user), ETH_compiled_), { connector: connector });
};
exports.load = load;
//# sourceMappingURL=ETH.js.map