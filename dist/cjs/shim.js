"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.window = exports.process = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
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
        return {
            fetch: node_fetch_1["default"]
        };
    }
})();
exports.window = windowShim;
//# sourceMappingURL=shim.js.map