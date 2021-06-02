"use strict";
exports.__esModule = true;
exports.window = exports.process = void 0;
var processShim = (function () {
    try {
        // XXX make better use of process-browserify
        if (Object.keys(process.env).length === 0) {
            throw Error("nothing in process.env");
        }
        return process;
    }
    catch (e) {
        // ReferenceError
        return {
            env: {
                // XXX: figure out how to handle this stuff better
                REACH_CONNECTOR_MODE: 'ETH-browser'
            },
            stdout: {
                write: function () { }
            }
        };
    }
})();
exports.process = processShim;
var windowShim = (function () {
    try {
        // @ts-ignore
        return window;
    }
    catch (e) {
        // ReferenceError
        return {};
    }
})();
exports.window = windowShim;
//# sourceMappingURL=shim.js.map