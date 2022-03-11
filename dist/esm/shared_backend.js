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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
// This has no dependencies on other shared things
import { ethers } from 'ethers';
import { bigNumberify, bigNumberToNumber, } from './CBR';
import { debug, j2s, } from './shared_impl';
export { bigNumberToNumber, };
void (debug);
export var asMaybe = function (v) {
    if (v === undefined) {
        return ['None', null];
    }
    else {
        return ['Some', v];
    }
};
export var fromSome = function (mo, da) {
    if (mo[0] === 'Some') {
        return mo[1];
    }
    else {
        return da;
    }
};
;
var objectIsEmpty = function (obj) {
    return (obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype);
};
export var formatAssertInfo = function (ai) {
    var e_1, _a;
    if (ai === void 0) { ai = {}; }
    var msg = '';
    if (typeof ai === 'string') {
        msg = ": ".concat(ai);
    }
    else {
        if (ai.who) {
            msg += ": ".concat(ai.who);
            delete ai.who;
        }
        if (ai.msg !== undefined) {
            if (ai.msg !== null) {
                msg += ": ".concat(ai.msg);
            }
            delete ai.msg;
        }
        if (ai.at) {
            msg += "\n  at ".concat(ai.at);
            delete ai.at;
        }
        var rest = ":";
        if (Array.isArray(ai.fs)) {
            try {
                for (var _b = __values(ai.fs), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var f = _c.value;
                    msg += "\n  ".concat(f);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            delete ai.fs;
            rest = "\n";
        }
        if (!objectIsEmpty(ai)) {
            msg += "".concat(rest, " ").concat(j2s(ai));
        }
    }
    return msg;
};
export var assert = function (d, ai) {
    if (ai === void 0) { ai = {}; }
    if (!d) {
        throw Error("Assertion failed".concat(formatAssertInfo(ai)));
    }
};
export var checkedBigNumberify = function (at, m, x) {
    var xb = bigNumberify(x);
    if (xb.gte(0) && xb.lte(m)) {
        return xb;
    }
    throw Error("bigNumberify: ".concat(x, " out of range [0, ").concat(m, "] at ").concat(at));
};
export function protect(ctc, v, ai) {
    if (ai === void 0) { ai = null; }
    debug("protect", ctc.name, v);
    try {
        // .canonicalize turns stuff into the "canonical backend representation"
        return ctc.canonicalize(v);
    }
    catch (e) {
        throw Error("Protect failed: expected ".concat(ctc.name, " but got ").concat(j2s(v)).concat(formatAssertInfo(ai), "\n").concat(j2s(e)));
    }
}
;
var _a = ethers.utils, toUtf8Bytes = _a.toUtf8Bytes, isHexString = _a.isHexString;
export var hexlify = ethers.utils.hexlify;
export var isHex = isHexString;
export var stringToHex = function (x) {
    return hexlify(toUtf8Bytes(x));
};
var forceHex = function (x) {
    return isHex(x) ? x : stringToHex(x);
};
export var bytesEq = function (x, y) {
    return forceHex(x) === forceHex(y);
};
export var bytesConcat = function (x, y) {
    // forceHex(x).concat(forceHex(y).slice(2));
    return x.concat(y);
};
export var eq = function (a, b) { return bigNumberify(a).eq(bigNumberify(b)); };
export var ge = function (a, b) { return bigNumberify(a).gte(bigNumberify(b)); };
export var gt = function (a, b) { return bigNumberify(a).gt(bigNumberify(b)); };
export var le = function (a, b) { return bigNumberify(a).lte(bigNumberify(b)); };
export var lt = function (a, b) { return bigNumberify(a).lt(bigNumberify(b)); };
export function Array_set(arr, idx, elem) {
    var arrp = arr.slice();
    arrp[idx] = elem;
    return arrp;
}
;
;
var basicMap = function () {
    var m = {};
    var basicSet = function (f, v) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            m[f] = v;
            return [2 /*return*/];
        });
    }); };
    var basicRef = function (f) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, asMaybe(m[f])];
        });
    }); };
    return { ref: basicRef, set: basicSet };
};
var copyMap = function (or) {
    var m = basicMap();
    var seen = {};
    var copySet = function (f, v) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    seen[f] = true;
                    return [4 /*yield*/, mapSet(m, f, v)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var copyRef = function (f) { return __awaiter(void 0, void 0, void 0, function () {
        var mv;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!seen[f]) return [3 /*break*/, 3];
                    return [4 /*yield*/, or(f)];
                case 1:
                    mv = _a.sent();
                    return [4 /*yield*/, copySet(f, mv[0] === 'Some' ? mv[1] : undefined)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, mapRef(m, f)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return { ref: copyRef, set: copySet };
};
// dupe: () => {[key: string]: A},
export var newMap = function (opts) {
    if (opts.isAPI) {
        return copyMap(opts.ctc.apiMapRef(opts.idx, opts.ty));
    }
    else {
        return basicMap();
    }
};
export var mapSet = function (m, f, v) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, m.set(f, v)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var mapRef = function (m, f) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, m.ref(f)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var Array_asyncMap = function (a, f) { return Promise.all(a.map(f)); };
export var Array_asyncReduce = function (a, b, f) { return __awaiter(void 0, void 0, void 0, function () {
    var y, i, a_1, a_1_1, x, e_2_1;
    var e_2, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                y = b;
                i = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                a_1 = __values(a), a_1_1 = a_1.next();
                _b.label = 2;
            case 2:
                if (!!a_1_1.done) return [3 /*break*/, 5];
                x = a_1_1.value;
                return [4 /*yield*/, f(y, x, i++)];
            case 3:
                y = _b.sent();
                _b.label = 4;
            case 4:
                a_1_1 = a_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (a_1_1 && !a_1_1.done && (_a = a_1["return"])) _a.call(a_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/, y];
        }
    });
}); };
export var Array_zip = function (x, y) {
    return x.map(function (e, i) { return [e, y[i]]; });
};
export var simMapDupe = function (sim_r, mapi, mapo) {
    sim_r.maps[mapi] = copyMap(mapo.ref);
};
var simMapLog = function (sim_r, f) {
    sim_r.mapRefs.push(f);
};
export var simMapRef = function (sim_r, mapi, f) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                simMapLog(sim_r, f);
                return [4 /*yield*/, mapRef(sim_r.maps[mapi], f)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var simMapSet = function (sim_r, mapi, f, nv) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                simMapLog(sim_r, f);
                return [4 /*yield*/, mapSet(sim_r.maps[mapi], f, nv)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var simTokenNew = function (sim_r, n, s, u, m, p, d, ctr) {
    sim_r.txns.push({ kind: 'tokenNew', n: n, s: s, u: u, m: m, p: p, d: d });
    // XXX This is a hack... it is assumed that `ctr` is unique across tokens in a simulation block
    return ctr;
};
export var simTokenBurn = function (sim_r, tok, amt) {
    sim_r.txns.push({ kind: 'tokenBurn', tok: tok, amt: amt });
};
export var simTokenDestroy = function (sim_r, tok) {
    sim_r.txns.push({ kind: 'tokenDestroy', tok: tok });
};
//# sourceMappingURL=shared_backend.js.map