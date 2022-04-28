import { setDEBUG, truthyEnv, } from './shared_impl.mjs';
import node_fetch from 'node-fetch';
var processShim = (function() {
  try {
    // XXX make better use of process-browserify
    if (Object.keys(process.env).length === 0) {
      throw Error("nothing in process.env");
    }
    return process;
  } catch (e) {
    // ReferenceError
    return {
      _reachShim: true,
      env: {
        // XXX: figure out how to handle this stuff better
        REACH_CONNECTOR_MODE: 'ETH-browser'
      },
      stdout: {
        write: function() {}
      },
      argv: [],
      exit: function(ec) {
        console.warn("Ignoring attempt to exit with code", ec);
      }
    };
  }
})();
export var updateProcessEnv = function(x) {
  var env = processShim.env;
  for (var k in x) {
    var kp = k.replace(/^REACT_APP_/, "");
    env[kp] = x[k];
  }
  setDEBUG(truthyEnv(env['REACH_DEBUG']));
};
var windowShim = (function() {
  try {
    // @ts-ignore
    return window;
  } catch (e) {
    // ReferenceError
    return {
      _reachShim: true,
      fetch: node_fetch
    };
  }
})();
export { processShim as process, windowShim as window, };
//# sourceMappingURL=shim.js.map
