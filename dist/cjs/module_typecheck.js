"use strict";
// This file only exists to typecheck that modules satisfy an interface
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
var ALGO = __importStar(require("./ALGO"));
var CFX = __importStar(require("./CFX"));
var CFX_compiled = __importStar(require("./CFX_compiled"));
var CFX_compiled_impl = __importStar(require("./CFX_compiled_impl"));
var CFX_impl = __importStar(require("./CFX_impl"));
var ETH = __importStar(require("./ETH"));
var ETH_compiled = __importStar(require("./ETH_compiled"));
var ETH_compiled_impl = __importStar(require("./ETH_compiled_impl"));
var ETH_impl = __importStar(require("./ETH_impl"));
var cfxers = __importStar(require("./cfxers"));
var shared_backend = __importStar(require("./shared_backend"));
var shared_user = __importStar(require("./shared_user"));
var ethers_1 = require("ethers");
var _shared_backend = shared_backend;
void (_shared_backend);
var _shared_user = shared_user;
void (_shared_user);
var _ETH_compiled = ETH_compiled;
void (_ETH_compiled);
var _CFX_compiled = CFX_compiled;
void (_CFX_compiled);
var _ETH = ETH;
void (_ETH);
var _CFX = CFX;
void (_CFX);
var _ALGO = ALGO;
void (_ALGO);
var _ethers = ethers_1.ethers;
void (_ethers);
var _cfxers = cfxers;
void (_cfxers);
var _ETH_impl = ETH_impl;
void (_ETH_impl);
var _CFX_impl = CFX_impl;
void (_CFX_impl);
var _ETH_compiled_impl = ETH_compiled_impl;
void (_ETH_compiled_impl);
var _CFX_compiled_impl = CFX_compiled_impl;
void (_CFX_compiled_impl);
//# sourceMappingURL=module_typecheck.js.map