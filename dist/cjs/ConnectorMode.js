"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a, e_2, _b;
exports.__esModule = true;
exports.getConnector = exports.getConnectorMode = exports.canonicalizeConnectorMode = void 0;
var shim_1 = require("./shim");
var shared_impl_1 = require("./shared_impl");
// Order is significant, earlier = default for shared prefix
// e.g. ETH defaults to ETH-devnet
var knownConnectorModes = [
    'ETH-devnet',
    'ETH-live',
    'ETH-browser',
    'ALGO-devnet',
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
try {
    // Populate connectorModeDefaults
    for (var knownConnectorModes_1 = __values(knownConnectorModes), knownConnectorModes_1_1 = knownConnectorModes_1.next(); !knownConnectorModes_1_1.done; knownConnectorModes_1_1 = knownConnectorModes_1.next()) {
        var knownConnectorMode = knownConnectorModes_1_1.value;
        var prefix = null;
        try {
            for (var _c = (e_2 = void 0, __values(knownConnectorMode.split('-'))), _d = _c.next(); !_d.done; _d = _c.next()) {
                var piece = _d.value;
                prefix = prefix ? "".concat(prefix, "-").concat(piece) : piece;
                if (!connectorModeDefaults[prefix]) {
                    connectorModeDefaults[prefix] = knownConnectorMode;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c["return"])) _b.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (knownConnectorModes_1_1 && !knownConnectorModes_1_1.done && (_a = knownConnectorModes_1["return"])) _a.call(knownConnectorModes_1);
    }
    finally { if (e_1) throw e_1.error; }
}
function canonicalizeConnectorMode(connectorMode) {
    var canonicalized = connectorModeDefaults[connectorMode];
    if (canonicalized) {
        return canonicalized;
    }
    else {
        throw Error("Unrecognized REACH_CONNECTOR_MODE='".concat(connectorMode, "'"));
    }
}
exports.canonicalizeConnectorMode = canonicalizeConnectorMode;
function getConnectorMode() {
    var connectorMode = (0, shared_impl_1.envDefault)(shim_1.process.env.REACH_CONNECTOR_MODE, 'ETH');
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
        throw Error("impossible: unknown connector: ".concat(connector));
    }
}
exports.getConnector = getConnector;
//# sourceMappingURL=ConnectorMode.js.map