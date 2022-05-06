var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { process } from './shim';
import * as util from 'util';
// Use argument to just run one
var args = __spreadArray([], __read(process.argv), false);
while (args.length > 0 && args[0] !== '---') {
    args.shift();
}
args.shift();
var shouldRunAny = function (x) {
    return args.some(function (a) { return x.includes(a); });
};
export var shouldRun = function (x) {
    return ((args.length === 0) || shouldRunAny(x));
};
export var shouldRunExac = function (x) {
    return ((args.length !== 0) && shouldRunAny(x));
};
;
var cases = [];
var tests = 0;
var fails = 0;
var loud = true; //(args.length !== 0);
export var chk = function (id, actual, expected, xtra) {
    if (xtra === void 0) { xtra = {}; }
    tests++;
    var xtras = JSON.stringify(xtra, null, 2);
    var exps = JSON.stringify(expected, null, 2);
    var acts = JSON.stringify(actual, null, 2);
    if (acts === "{}") {
        acts = actual.toString();
    }
    var show;
    var err;
    if (exps !== acts) {
        fails++;
        err = "".concat(xtras, "\nexpected ").concat(exps, ", got ").concat(acts);
        show = 'FAIL';
    }
    else if (loud) {
        show = 'SUCC';
    }
    cases.push({ id: id, time: xtra === null || xtra === void 0 ? void 0 : xtra.time, err: err });
    if (show) {
        if (expected === null || expected === void 0 ? void 0 : expected._isBigNumber) {
            expected = expected.toString();
        }
        if (actual === null || actual === void 0 ? void 0 : actual._isBigNumber) {
            actual = actual.toString();
        }
        console.log(show, util.inspect(__assign(__assign({}, xtra), { id: id, expected: expected, actual: actual }), {
            depth: null, sorted: true, colors: true
        }));
    }
};
export var chkErr = function (id, exp, f, xtra) {
    if (xtra === void 0) { xtra = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var clean, exps, r, e_1, es;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clean = function (s) { return s.replace(/\0/g, '').replace(/\\u0000/g, ''); };
                    exps = clean(exp);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, f()];
                case 2:
                    r = _a.sent();
                    throw Error("Expected error, but got ".concat(JSON.stringify(r)));
                case 3:
                    e_1 = _a.sent();
                    es = (typeof e_1 === 'object' && e_1 !== null) ? e_1.toString() : "".concat(e_1);
                    if (es === '[object Object]') {
                        try {
                            es = JSON.stringify(e_1);
                        }
                        catch (e) {
                            void (e);
                        }
                    }
                    es = clean(es);
                    chk(id, es.includes(exps), true, __assign(__assign({}, xtra), { e: e_1, es: es, exps: exps }));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
var notErr = function (lab, j, xtra) {
    if (xtra === void 0) { xtra = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var start, r, err, e_2, end;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = Date.now();
                    r = undefined;
                    err = undefined;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, j()];
                case 2:
                    r = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    err = e_2;
                    return [3 /*break*/, 4];
                case 4:
                    end = Date.now();
                    chk(lab, err, undefined, __assign(__assign({}, xtra), { time: ((end - start) / 1000) }));
                    return [2 /*return*/, r];
            }
        });
    });
};
// Concurrent tests
var jobs = [];
export var one = function (lab, j) {
    if (shouldRun(lab)) {
        jobs.push(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, notErr(lab, j)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        }); }); });
    }
};
;
export var run = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var exitOnFail, stop, howManyAtOnce, active, j, xml, xmlb, logVar, failed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exitOnFail = (opts === null || opts === void 0 ? void 0 : opts.exitOnFail) === undefined ? true : opts.exitOnFail;
                stop = function () { return (exitOnFail && fails > 0); };
                howManyAtOnce = (opts === null || opts === void 0 ? void 0 : opts.howManyAtOnce) || 1;
                console.log("".concat(jobs.length, " jobs scheduled, running..."));
                _a.label = 1;
            case 1:
                if (!(!stop() && jobs.length > 0)) return [3 /*break*/, 3];
                console.log("Spawning ".concat(howManyAtOnce, " of ").concat(jobs.length, " jobs"));
                active = [];
                while (jobs.length > 0 && active.length < howManyAtOnce) {
                    j = jobs.shift();
                    if (j) {
                        active.push(j());
                    }
                }
                console.log("Waiting for ".concat(active.length, " jobs"));
                return [4 /*yield*/, Promise.all(active)];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3:
                console.log('Done running');
                xml = [];
                xml.push('<?xml version="1.0" encoding="UTF-8"?>');
                xml.push('<testsuite>');
                cases.forEach(function (_a) {
                    var id = _a.id, time = _a.time, err = _a.err;
                    var mtime = time ? " time=\"".concat(time, "\"") : "";
                    var mfail = err ? "<failure>".concat(err, "</failure>") : "";
                    var idr = id.replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&apos;');
                    xml.push("<testcase name=\"".concat(idr, "\"").concat(mtime, ">").concat(mfail, "</testcase>"));
                });
                xml.push('</testsuite>');
                xmlb = Buffer.from(xml.join(''));
                logVar = function (k, v) {
                    return console.log("var ".concat(k, "='").concat(v, "'"));
                };
                logVar("RESULTS_B64", xmlb.toString('base64'));
                failed = fails !== 0;
                logVar("SUMMARY", failed ?
                    "".concat(fails, " of ").concat(tests, " tests failed!") :
                    "".concat(tests, " tests passed!"));
                logVar("STATUS", failed ? ':warning: FAIL' : ':pizza: OKAY');
                process.exit(failed ? 1 : 0);
                return [2 /*return*/];
        }
    });
}); };
// Exports
export var makeChkExport = function (stdlib, backend) {
    var rshExports = backend.getExports(stdlib);
    var chkExport = function (fn, go) {
        one(fn, function () { return __awaiter(void 0, void 0, void 0, function () {
            var f, mkId, chkf, chkfErr;
            return __generator(this, function (_a) {
                f = rshExports[fn];
                if (!f) {
                    throw Error("".concat(fn, " is not exported from backend: [").concat(Object.keys(exports).sort().join(', '), "]"));
                }
                mkId = function (dom) { return "".concat(fn, "(").concat(JSON.stringify(dom), ")"); };
                chkf = function (dom, rng) { return __awaiter(void 0, void 0, void 0, function () {
                    var lab, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                lab = mkId(dom);
                                _a = chk;
                                _b = [lab];
                                return [4 /*yield*/, notErr(lab, function () { return f.apply(void 0, __spreadArray([], __read(dom), false)); }, { dom: dom })];
                            case 1:
                                _a.apply(void 0, _b.concat([_c.sent(), rng, { dom: dom }]));
                                return [2 /*return*/];
                        }
                    });
                }); };
                chkfErr = function (exp, dom) {
                    return chkErr(mkId(dom), exp, function () { return f.apply(void 0, __spreadArray([], __read(dom), false)); }, { dom: dom });
                };
                go(chkf, chkfErr);
                return [2 /*return*/];
            });
        }); });
    };
    return [rshExports, chkExport];
};
//# sourceMappingURL=test.js.map