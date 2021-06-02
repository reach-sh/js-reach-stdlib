import { process } from './shim.mjs';
import { envDefault } from './shared_impl.mjs';
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
export function canonicalizeConnectorMode(connectorMode) {
  var canonicalized = connectorModeDefaults[connectorMode];
  if (canonicalized) {
    return canonicalized;
  } else {
    throw Error("Unrecognized REACH_CONNECTOR_MODE='" + connectorMode + "'");
  }
}
export function getConnectorMode() {
  var connectorMode = envDefault(process.env.REACH_CONNECTOR_MODE, 'ETH');
  return canonicalizeConnectorMode(connectorMode);
}
// The connectorMode arg is optional;
// It will use REACH_CONNECTOR_MODE if 0 args.
export function getConnector(connectorMode) {
  connectorMode = connectorMode || getConnectorMode();
  var connector = connectorMode.split('-')[0];
  if (isKnownConnector(connector)) {
    return connector;
  } else {
    throw Error("impossible: unknown connector: " + connector);
  }
}
//# sourceMappingURL=ConnectorMode.js.map
