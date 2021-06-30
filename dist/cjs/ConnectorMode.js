"use strict";
exports.__esModule = true;
exports.getConnector = exports.getConnectorMode = exports.canonicalizeConnectorMode = void 0;
var shim_1 = require("./shim");
var shared_impl_1 = require("./shared_impl");
// Order is significant, earlier = default for shared prefix
// e.g. ETH defaults to ETH-test-dockerized-geth
var knownConnectorModes = [
    'ETH-test-dockerized-geth',
    'ETH-live',
    'ETH-browser',
    'ALGO-test-dockerized-algod',
    'ALGO-live',
    'ALGO-browser',
    'CFX-devnet',
    'CFX-live',
    'CFX-browser',
];
function isKnownConnector(s) {
    return (s === 'ETH' || s === 'ALGO' || s === 'CFX');
}
var connectorModeDefaults = {};
// Populate connectorModeDefaults
for (var _i = 0, knownConnectorModes_1 = knownConnectorModes; _i < knownConnectorModes_1.length; _i++) {
    var knownConnectorMode = knownConnectorModes_1[_i];
    var prefix = null;
    for (var _a = 0, _b = knownConnectorMode.split('-'); _a < _b.length; _a++) {
        var piece = _b[_a];
        prefix = prefix ? prefix + "-" + piece : piece;
        if (!connectorModeDefaults[prefix]) {
            connectorModeDefaults[prefix] = knownConnectorMode;
        }
    }
}
function canonicalizeConnectorMode(connectorMode) {
    var canonicalized = connectorModeDefaults[connectorMode];
    if (canonicalized) {
        return canonicalized;
    }
    else {
        throw Error("Unrecognized REACH_CONNECTOR_MODE='" + connectorMode + "'");
    }
}
exports.canonicalizeConnectorMode = canonicalizeConnectorMode;
function getConnectorMode() {
    var connectorMode = shared_impl_1.envDefault(shim_1.process.env.REACH_CONNECTOR_MODE, 'ETH');
    return canonicalizeConnectorMode(connectorMode);
}
exports.getConnectorMode = getConnectorMode;
// The connectorMode arg is optional;
// It will use REACH_CONNECTOR_MODE if 0 args.
function getConnector(connectorMode) {
    connectorMode = connectorMode || getConnectorMode();
    var connector = connectorMode.split('-')[0];
    if (isKnownConnector(connector)) {
        return connector;
    }
    else {
        throw Error("impossible: unknown connector: " + connector);
    }
}
exports.getConnector = getConnector;
//# sourceMappingURL=ConnectorMode.js.map