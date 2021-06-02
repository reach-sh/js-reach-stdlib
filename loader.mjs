import * as stdlib_ETH from './ETH.mjs';
import * as stdlib_ALGO from './ALGO.mjs';
import * as stdlib_CFX from './CFX.mjs';
import { getConnectorMode, canonicalizeConnectorMode, getConnector } from './ConnectorMode.mjs';
import { process, window } from './shim.mjs';
import { setDEBUG, } from './shared_impl.mjs';
export { getConnectorMode, getConnector };
// The connectorMode arg is optional;
// It will use REACH_CONNECTOR_MODE if 0 args.
export function loadStdlib(connectorModeOrEnv) {
  if (!connectorModeOrEnv) {
    // @ts-ignore // XXX why doesn't TS understand that Env satisfies {[key: string}: string} ?
    return loadStdlib(process.env);
  }
  var connectorModeStr;
  if (typeof connectorModeOrEnv === 'string') {
    connectorModeStr = connectorModeOrEnv;
  } else if (connectorModeOrEnv['REACH_CONNECTOR_MODE']) {
    connectorModeStr = connectorModeOrEnv['REACH_CONNECTOR_MODE'];
  } else if (connectorModeOrEnv['REACT_APP_REACH_CONNECTOR_MODE']) {
    connectorModeStr = connectorModeOrEnv['REACT_APP_REACH_CONNECTOR_MODE'];
  } else {
    // TODO: also check {REACT_APP_,}REACH_DEFAULT_NETWORK
    connectorModeStr = 'ETH'; // If absolutely none specified/found, just default to 'ETH'
  }
  var connectorMode = canonicalizeConnectorMode(connectorModeStr);
  var connector = getConnector(connectorMode);
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
    default:
      throw Error("impossible: unknown connector " + connector);
  }
  if (connectorModeOrEnv && typeof connectorModeOrEnv !== 'string') {
    var debug = (connectorModeOrEnv['REACH_DEBUG'] || connectorModeOrEnv['REACT_APP_REACH_DEBUG']) ? true : false;
    setDEBUG(debug);
  }
  // also just inject ourselves into the window for ease of use
  window.reach = stdlib;
  return stdlib;
}
//# sourceMappingURL=loader.js.map
