"use strict";
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
exports.__esModule = true;
exports.simTokenDestroy = exports.simTokenBurn = exports.simContractNew = exports.simTokenNew = exports.simMapSet = exports.simMapRef = exports.simMapDupe = exports.Array_asyncReduce = exports.Array_asyncMap = exports.mapRef = exports.mapSet = exports.newMap = exports.Array_set = exports.btoiLast8 = exports.bytes_xor = exports.digest_xor = exports.lt256 = exports.le256 = exports.gt256 = exports.ge256 = exports.eq256 = exports.lt = exports.le = exports.gt = exports.ge = exports.eq = exports.bytesConcat = exports.bytesEq = exports.stringToHex = exports.isHex = exports.hexlify = exports.protect = exports.checkedBigNumberify = exports.assert = exports.formatAssertInfo = exports.fromSome = exports.asMaybe = exports.apiStateMismatchError = exports.bigNumberToNumber = void 0;
// This has no dependencies on other shared things
var ethers_1 = require("ethers");
var CBR_1 = require("./CBR");
exports.bigNumberToNumber = CBR_1.bigNumberToNumber;
var shared_impl_1 = require("./shared_impl");
exports.apiStateMismatchError = shared_impl_1.apiStateMismatchError;
void (shared_impl_1.debug);
var asMaybe = function (v) {
    if (v === undefined) {
        return ['None', null];
    }
    else {
        return ['Some', v];
    }
};
exports.asMaybe = asMaybe;
var fromSome = function (mo, da) {
    if (mo[0] === 'Some') {
        return mo[1];
    }
    else {
        return da;
    }
};
exports.fromSome = fromSome;
;
var objectIsEmpty = function (obj) {
    return (obj
        && Object.keys(obj).length === 0
        && Object.getPrototypeOf(obj) === Object.prototype);
};
function hasProp(data, prop) {
    return prop in data;
}
var formatAssertInfo = function (ai) {
    var e_1, _b;
    var msg = '';
    if (typeof ai === 'string') {
        msg = ": ".concat(ai);
    }
    else if (ai === null || ai === undefined) {
    }
    else if (typeof ai === 'object') {
        if (hasProp(ai, 'who')) {
            msg += ": ".concat(ai.who);
            delete ai.who;
        }
        if (hasProp(ai, 'msg')) {
            if (ai.msg !== null) {
                msg += ": ".concat(ai.msg);
            }
            delete ai.msg;
        }
        if (hasProp(ai, 'at')) {
            msg += "\n  at ".concat(ai.at);
            delete ai.at;
        }
        var rest = ":";
        if (hasProp(ai, 'fs') && Array.isArray(ai.fs)) {
            try {
                for (var _c = __values(ai.fs), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var f = _d.value;
                    msg += "\n  ".concat(f);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_b = _c["return"])) _b.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            delete ai.fs;
            rest = "\n";
        }
        if (!objectIsEmpty(ai)) {
            msg += "".concat(rest, " ").concat((0, shared_impl_1.j2s)(ai));
        }
    }
    return msg;
};
exports.formatAssertInfo = formatAssertInfo;
var assert = function (d, ai) {
    if (ai === void 0) { ai = {}; }
    if (!d) {
        throw Error("Assertion failed".concat((0, exports.formatAssertInfo)(ai)));
    }
};
exports.assert = assert;
var checkedBigNumberify = function (at, m, x) {
    var xb = (0, CBR_1.bigNumberify)(x);
    if (xb.gte(0) && xb.lte(m)) {
        return xb;
    }
    throw Error("bigNumberify: ".concat(x, " out of range [0, ").concat(m, "] at ").concat(at));
};
exports.checkedBigNumberify = checkedBigNumberify;
function protect(ctc, v, ai) {
    if (ai === void 0) { ai = null; }
    (0, shared_impl_1.debug)("protect", ctc.name, v);
    try {
        // .canonicalize turns stuff into the "canonical backend representation"
        return ctc.canonicalize(v);
    }
    catch (e) {
        throw Error("Protect failed: expected ".concat(ctc.name, " but got ").concat((0, shared_impl_1.j2s)(v)).concat((0, exports.formatAssertInfo)(ai), "\n").concat((0, shared_impl_1.j2s)(e)));
    }
}
exports.protect = protect;
;
var _b = ethers_1.ethers.utils, toUtf8Bytes = _b.toUtf8Bytes, isHexString = _b.isHexString;
exports.hexlify = ethers_1.ethers.utils.hexlify;
exports.isHex = isHexString;
var stringToHex = function (x) {
    return (0, exports.hexlify)(toUtf8Bytes(x));
};
exports.stringToHex = stringToHex;
var hexToInt = function (x) { return parseInt(x, 16); };
var forceHex = function (x) {
    return (0, exports.isHex)(x) ? x : (0, exports.stringToHex)(x);
};
var bytesEq = function (x, y) {
    return forceHex(x) === forceHex(y);
};
exports.bytesEq = bytesEq;
var bytesConcat = function (x, y) {
    // forceHex(x).concat(forceHex(y).slice(2));
    return x.concat(y);
};
exports.bytesConcat = bytesConcat;
var eq = function (a, b) { return (0, CBR_1.bigNumberify)(a).eq((0, CBR_1.bigNumberify)(b)); };
exports.eq = eq;
var ge = function (a, b) { return (0, CBR_1.bigNumberify)(a).gte((0, CBR_1.bigNumberify)(b)); };
exports.ge = ge;
var gt = function (a, b) { return (0, CBR_1.bigNumberify)(a).gt((0, CBR_1.bigNumberify)(b)); };
exports.gt = gt;
var le = function (a, b) { return (0, CBR_1.bigNumberify)(a).lte((0, CBR_1.bigNumberify)(b)); };
exports.le = le;
var lt = function (a, b) { return (0, CBR_1.bigNumberify)(a).lt((0, CBR_1.bigNumberify)(b)); };
exports.lt = lt;
exports.eq256 = exports.eq;
exports.ge256 = exports.ge;
exports.gt256 = exports.gt;
exports.le256 = exports.le;
exports.lt256 = exports.lt;
var digest_xor = function (xd, yd) {
    var clean = function (s) { return s.slice(0, 2) === '0x' ? s.slice(2) : s; };
    var xc = clean(xd);
    var yc = clean(yd);
    var parseHex = function (xs) {
        var ret = [];
        for (var i = 0; i < xs.length; i += 2) {
            ret.push(hexToInt(xs.substr(i, 2)));
        }
        return ret;
    };
    var xs = parseHex(xc);
    var ys = parseHex(yc);
    var result = '0x' + xs.map(function (x, i) { return (x ^ ys[i]).toString(16).padStart(2, '0'); }).join('');
    return result;
};
exports.digest_xor = digest_xor;
var bytes_xor = function (x, y) {
    var xs = Buffer.from(x);
    var ys = Buffer.from(y);
    var xors = xs.map(function (x, i) { return x ^ ys[i]; });
    return String.fromCharCode.apply(String, __spreadArray([], __read(xors), false));
};
exports.bytes_xor = bytes_xor;
var btoiLast8 = function (b) {
    var min = (b.length < 8) ? 0 : b.length - 8;
    var bb = Buffer.from(b);
    var res = (0, CBR_1.bigNumberify)(0);
    for (var i = min; i < b.length; i++) {
        res = res.mul(256).add(bb[i]);
    }
    return res;
};
exports.btoiLast8 = btoiLast8;
function Array_set(arr, idx, elem) {
    var arrp = arr.slice();
    arrp[idx] = elem;
    return arrp;
}
exports.Array_set = Array_set;
;
;
var basicMap = function () {
    var m = {};
    var basicSet = function (f, v) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            m[f] = v;
            return [2 /*return*/];
        });
    }); };
    var basicRef = function (f) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            return [2 /*return*/, (0, exports.asMaybe)(m[f])];
        });
    }); };
    return { ref: basicRef, set: basicSet };
};
var copyMap = function (or) {
    var m = basicMap();
    var seen = {};
    var copySet = function (f, v) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    seen[f] = true;
                    return [4 /*yield*/, (0, exports.mapSet)(m, f, v)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var copyRef = function (f) { return __awaiter(void 0, void 0, void 0, function () {
        var mv;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!seen[f]) return [3 /*break*/, 3];
                    return [4 /*yield*/, or(f)];
                case 1:
                    mv = _b.sent();
                    return [4 /*yield*/, copySet(f, mv[0] === 'Some' ? mv[1] : undefined)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [4 /*yield*/, (0, exports.mapRef)(m, f)];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    return { ref: copyRef, set: copySet };
};
// dupe: () => {[key: string]: A},
var newMap = function (opts) {
    if (opts.isAPI) {
        return copyMap(opts.ctc.apiMapRef(opts.idx, opts.ty));
    }
    else {
        return basicMap();
    }
};
exports.newMap = newMap;
var mapSet = function (m, f, v) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, m.set(f, v)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.mapSet = mapSet;
var mapRef = function (m, f) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, m.ref(f)];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.mapRef = mapRef;
var Array_asyncMap = function (as, f) { return __awaiter(void 0, void 0, void 0, function () {
    var fWrap;
    return __generator(this, function (_b) {
        fWrap = function (_a, i) { return f(as.map(function (a) { return a[i]; }), i); };
        return [2 /*return*/, Promise.all(as[0].map(fWrap))];
    });
}); };
exports.Array_asyncMap = Array_asyncMap;
var Array_asyncReduce = function (as, b, f) { return __awaiter(void 0, void 0, void 0, function () {
    var accum, i, as_i;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                accum = b;
                i = 0;
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < as[0].length)) return [3 /*break*/, 4];
                as_i = as.map(function (a) { return a[i]; });
                return [4 /*yield*/, f(as_i, accum, i)];
            case 2:
                accum = _b.sent();
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, accum];
        }
    });
}); };
exports.Array_asyncReduce = Array_asyncReduce;
var simMapDupe = function (sim_r, mapi, mapo) {
    sim_r.maps[mapi] = copyMap(mapo.ref);
};
exports.simMapDupe = simMapDupe;
var simMapLog = function (sim_r, f) {
    sim_r.mapRefs.push(f);
};
var simMapRef = function (sim_r, mapi, f) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                simMapLog(sim_r, f);
                return [4 /*yield*/, (0, exports.mapRef)(sim_r.maps[mapi], f)];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.simMapRef = simMapRef;
var simMapSet = function (sim_r, mapi, f, nv) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                simMapLog(sim_r, f);
                return [4 /*yield*/, (0, exports.mapSet)(sim_r.maps[mapi], f, nv)];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.simMapSet = simMapSet;
var simTokenNew = function (sim_r, n, s, u, m, p, d, ctr) {
    sim_r.txns.push({ kind: 'tokenNew', n: n, s: s, u: u, m: m, p: p, d: d });
    // XXX This is a hack... it is assumed that `ctr` is unique across tokens in a simulation block
    return ctr;
};
exports.simTokenNew = simTokenNew;
var simContractNew = function (sim_r, cns, remote, ctr) {
    sim_r.txns.push({ kind: 'contractNew', cns: cns, remote: remote });
    // XXX This is a hack... it is assumed that `ctr` is unique across tokens in a simulation block
    return ctr;
};
exports.simContractNew = simContractNew;
var simTokenBurn = function (sim_r, tok, amt) {
    sim_r.txns.push({ kind: 'tokenBurn', tok: tok, amt: amt });
};
exports.simTokenBurn = simTokenBurn;
var simTokenDestroy = function (sim_r, tok) {
    sim_r.txns.push({ kind: 'tokenDestroy', tok: tok });
};
exports.simTokenDestroy = simTokenDestroy;
//# sourceMappingURL=shared_backend.js.map