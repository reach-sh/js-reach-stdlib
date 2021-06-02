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
      env: {
        // XXX: figure out how to handle this stuff better
        REACH_CONNECTOR_MODE: 'ETH-browser'
      },
      stdout: {
        write: function() {}
      }
    };
  }
})();
var windowShim = (function() {
  try {
    // @ts-ignore
    return window;
  } catch (e) {
    // ReferenceError
    return {};
  }
})();
export { processShim as process, windowShim as window, };
//# sourceMappingURL=shim.js.map
