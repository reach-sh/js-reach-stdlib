var currentConnector = null;
export var unsafeAllowMultipleStdlibs = function() {
  currentConnector = true;
};
export var doStdlibLoad = function(connector) {
  if (currentConnector == null || currentConnector == true || currentConnector == connector) {
    currentConnector = currentConnector || connector;
  } else {
    throw new Error('Cannot load multiple stdlib connectors without using `unsafeAllowMultipleStdlibs`');
  }
};
//# sourceMappingURL=registry.js.map
