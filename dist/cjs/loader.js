"use strict";
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
exports.__esModule = true;
exports.loadStdlib = exports.getConnector = exports.getConnectorMode = exports.unsafeAllowMultipleStdlibs = void 0;
var stdlib_ETH = __importStar(require("./ETH"));
var stdlib_ALGO = __importStar(require("./ALGO"));
var stdlib_CFX = __importStar(require("./CFX"));
var ConnectorMode_1 = require("./ConnectorMode");
exports.getConnectorMode = ConnectorMode_1.getConnectorMode;
exports.getConnector = ConnectorMode_1.getConnector;
var shim_1 = require("./shim");
var shared_impl_1 = require("./shared_impl");
var registry_1 = require("./registry");
var registry_2 = require("./registry");
__createBinding(exports, registry_2, "unsafeAllowMultipleStdlibs");
// The connectorMode arg is optional;
// It will use REACH_CONNECTOR_MODE if 0 args.
function loadStdlib(connectorModeOrEnv) {
    if (!connectorModeOrEnv) {
        // @ts-ignore // XXX why doesn't TS understand that Env satisfies {[key: string}: string} ?
        return loadStdlib(shim_1.process.env);
    }
    var connectorModeStr;
    if (typeof connectorModeOrEnv === 'string') {
        connectorModeStr = connectorModeOrEnv;
    }
    else if (connectorModeOrEnv['REACH_CONNECTOR_MODE']) {
        connectorModeStr = connectorModeOrEnv['REACH_CONNECTOR_MODE'];
    }
    else if (connectorModeOrEnv['REACT_APP_REACH_CONNECTOR_MODE']) {
        connectorModeStr = connectorModeOrEnv['REACT_APP_REACH_CONNECTOR_MODE'];
    }
    else {
        // TODO: also check {REACT_APP_,}REACH_DEFAULT_NETWORK
        connectorModeStr = 'ETH'; // If absolutely none specified/found, just default to 'ETH'
    }
    var connectorMode = ConnectorMode_1.canonicalizeConnectorMode(connectorModeStr);
    var connector = ConnectorMode_1.getConnector(connectorMode);
    // Remember the connector to prevent users from accidentally using multiple stdlibs
    registry_1.doStdlibLoad(connector);
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
        default: throw Error("impossible: unknown connector " + connector);
    }
    if (connectorModeOrEnv && typeof connectorModeOrEnv !== 'string') {
        var debug = shared_impl_1.truthyEnv(shared_impl_1.rEnv(connectorModeOrEnv, 'REACH_DEBUG'));
        shared_impl_1.setDEBUG(debug);
    }
    // also just inject ourselves into the window for ease of use
    shim_1.window.reach = stdlib;
    return stdlib;
}
exports.loadStdlib = loadStdlib;
//# sourceMappingURL=loader.js.map