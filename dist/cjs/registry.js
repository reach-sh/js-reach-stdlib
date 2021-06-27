"use strict";
exports.__esModule = true;
exports.doStdlibLoad = exports.unsafeAllowMultipleStdlibs = void 0;
var currentConnector = null;
var unsafeAllowMultipleStdlibs = function () {
    currentConnector = true;
};
exports.unsafeAllowMultipleStdlibs = unsafeAllowMultipleStdlibs;
var doStdlibLoad = function (connector) {
    if (currentConnector == null || currentConnector == true || currentConnector == connector) {
        currentConnector = currentConnector || connector;
    }
    else {
        throw new Error('Cannot load multiple stdlib connectors without using `unsafeAllowMultipleStdlibs`');
    }
};
exports.doStdlibLoad = doStdlibLoad;
//# sourceMappingURL=registry.js.map