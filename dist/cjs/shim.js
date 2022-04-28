"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.window = exports.process = exports.updateProcessEnv = void 0;
var shared_impl_1 = require("./shared_impl");
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
            _reachShim: true,
            env: {
                // XXX: figure out how to handle this stuff better
                REACH_CONNECTOR_MODE: 'ETH-browser'
            },
            stdout: {
                write: function () { }
            },
            argv: [],
            exit: function (ec) {
                console.warn("Ignoring attempt to exit with code", ec);
            }
        };
    }
})();
exports.process = processShim;
var updateProcessEnv = function (x) {
    var env = processShim.env;
    for (var k in x) {
        var kp = k.replace(/^REACT_APP_/, "");
        env[kp] = x[k];
    }
    (0, shared_impl_1.setDEBUG)((0, shared_impl_1.truthyEnv)(env['REACH_DEBUG']));
};
exports.updateProcessEnv = updateProcessEnv;
var windowShim = (function () {
    try {
        // @ts-ignore
        return window;
    }
    catch (e) {
        // ReferenceError
        return {
            _reachShim: true,
            fetch: node_fetch_1["default"]
        };
    }
})();
exports.window = windowShim;
//# sourceMappingURL=shim.js.map