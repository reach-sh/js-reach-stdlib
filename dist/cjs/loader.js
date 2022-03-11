"use strict";
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
exports.loadStdlib = exports.getConnector = exports.getConnectorMode = exports.unsafeAllowMultipleStdlibs = void 0;
var stdlib_ETH = __importStar(require("./ETH"));
var stdlib_ALGO = __importStar(require("./ALGO"));
var stdlib_CFX = __importStar(require("./CFX"));
var ConnectorMode_1 = require("./ConnectorMode");
exports.getConnectorMode = ConnectorMode_1.getConnectorMode;
exports.getConnector = ConnectorMode_1.getConnector;
var shim_1 = require("./shim");
var registry_1 = require("./registry");
var registry_2 = require("./registry");
__createBinding(exports, registry_2, "unsafeAllowMultipleStdlibs");
function extractMode(x) {
    if (!x) {
        return extractMode(shim_1.process.env);
    }
    if (typeof x === 'string') {
        return extractMode({ REACH_CONNECTOR_MODE: x });
    }
    (0, shim_1.updateProcessEnv)(x);
    var g = shim_1.process.env['REACH_CONNECTOR_MODE'];
    if (!g) {
        console.log("WARNING: `REACH_CONNECTOR_MODE` defaulting behavior is deprecated as of"
            + " version 0.1.6; please update your code to set this value explicitly.");
        return 'ETH';
    }
    else {
        return g;
    }
}
;
// The connectorMode arg is optional;
// It will use REACH_CONNECTOR_MODE if 0 args.
function loadStdlib(connectorModeOrEnv) {
    var connectorModeStr = extractMode(connectorModeOrEnv);
    var connectorMode = (0, ConnectorMode_1.canonicalizeConnectorMode)(connectorModeStr);
    var connector = (0, ConnectorMode_1.getConnector)(connectorMode);
    // Remember the connector to prevent users from accidentally using multiple stdlibs
    (0, registry_1.doStdlibLoad)(connector);
    var stdlib;
    switch (connector) {
        case 'ETH':
            stdlib = stdlib_ETH;
            break;
        case 'ALGO':
            stdlib = stdlib_ALGO;
            break;
        case 'CFX':
            stdlib = stdlib_CFX;
            break;
        default: throw Error("impossible: unknown connector ".concat(connector));
    }
    // also just inject ourselves into the window for ease of use
    shim_1.window.reach = stdlib;
    return stdlib;
}
exports.loadStdlib = loadStdlib;
//# sourceMappingURL=loader.js.map