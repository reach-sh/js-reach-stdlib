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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
// This has no dependencies on other shared things
import { ethers } from 'ethers';
import { bigNumberify, bigNumberToNumber, } from './CBR';
import { apiStateMismatchError, debug, j2s, } from './shared_impl';
export { bigNumberToNumber, apiStateMismatchError, };
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
function hasProp(data, prop) {
    return prop in data;
}
export var formatAssertInfo = function (ai) {
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
export function bytesFromHex(v) {
    return ethers.utils.arrayify(v);
}
var _b = ethers.utils, toUtf8Bytes = _b.toUtf8Bytes, isHexString = _b.isHexString;
export var hexlify = ethers.utils.hexlify;
export var isHex = isHexString;
export var stringToHex = function (x) {
    return hexlify(toUtf8Bytes(x));
};
var hexToInt = function (x) { return parseInt(x, 16); };
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
export var eq256 = eq;
export var ge256 = ge;
export var gt256 = gt;
export var le256 = le;
export var lt256 = lt;
export var stringDynConcat = function (s1, s2) { return "".concat(s1).concat(s2); };
export var uintToStringDyn = function (n1) { return n1.toString(); };
export var uintToStringDyn256 = uintToStringDyn;
export var digest_xor = function (xd, yd) {
    var clean = function (s) { return s.slice(0, 2) === '0x' ? s.slice(2) : s; };
    var xc = clean(xd);
    var yc = clean(yd);
    var parseHex = function (xs) {
        var ret = [];
        for (var i = 0; i < xs.length; i += 2) {
            ret.push(hexToInt(xs.substring(i, i + 2)));
        }
        return ret;
    };
    var xs = parseHex(xc);
    var ys = parseHex(yc);
    var result = '0x' + xs.map(function (x, i) { return (x ^ ys[i]).toString(16).padStart(2, '0'); }).join('');
    return result;
};
export var bytes_xor = function (x, y) {
    var xs = Buffer.from(x);
    var ys = Buffer.from(y);
    var xors = xs.map(function (x, i) { return x ^ ys[i]; });
    return String.fromCharCode.apply(String, __spreadArray([], __read(xors), false));
};
export var btoiLast8 = function (b) {
    var min = (b.length < 8) ? 0 : b.length - 8;
    var bb = Buffer.from(b);
    var res = bigNumberify(0);
    for (var i = min; i < b.length; i++) {
        res = res.mul(256).add(bb[i]);
    }
    return res;
};
export function Array_set(arr, idx, elem) {
    var arrp = arr.slice();
    arrp[idx] = elem;
    return arrp;
}
;
;
var basicMap = function (getKey) {
    var m = {};
    var basicSet = function (kt, k, vt, v) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, f, mbr;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getKey(kt, k, vt)];
                case 1:
                    _b = __read.apply(void 0, [_c.sent(), 2]), f = _b[0], mbr = _b[1];
                    void mbr;
                    m[f] = v;
                    return [2 /*return*/];
            }
        });
    }); };
    var basicRef = function (kt, k, vt) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, f, mbr;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getKey(kt, k, vt)];
                case 1:
                    _b = __read.apply(void 0, [_c.sent(), 2]), f = _b[0], mbr = _b[1];
                    void mbr;
                    return [2 /*return*/, asMaybe(m[f])];
            }
        });
    }); };
    return { getKey: getKey, ref: basicRef, set: basicSet };
};
export var copyMap = function (orig) {
    var getKey = orig.getKey, origRef = orig.ref;
    var m = basicMap(getKey);
    var seen = {};
    var copySet = function (kt, k, vt, v) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, f, mbr;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getKey(kt, k, vt)];
                case 1:
                    _b = __read.apply(void 0, [_c.sent(), 2]), f = _b[0], mbr = _b[1];
                    void mbr;
                    seen[f] = true;
                    return [4 /*yield*/, mapSet(m, kt, k, vt, v)];
                case 2:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var copyRef = function (kt, k, vt) { return __awaiter(void 0, void 0, void 0, function () {
        var _b, f, mbr, mv;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, getKey(kt, k, vt)];
                case 1:
                    _b = __read.apply(void 0, [_c.sent(), 2]), f = _b[0], mbr = _b[1];
                    void mbr;
                    if (!!seen[f]) return [3 /*break*/, 4];
                    return [4 /*yield*/, origRef(kt, k, vt)];
                case 2:
                    mv = _c.sent();
                    return [4 /*yield*/, copySet(kt, k, vt, mv[0] === 'Some' ? mv[1] : undefined)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4: return [4 /*yield*/, mapRef(m, kt, k, vt)];
                case 5: return [2 /*return*/, _c.sent()];
            }
        });
    }); };
    return { getKey: getKey, ref: copyRef, set: copySet };
};
// dupe: () => {[key: string]: A},
export var newMap = function (opts) {
    var _b = opts.ctc, makeGetKey = _b.makeGetKey, apiMapRef = _b.apiMapRef;
    var getKey = makeGetKey(opts.idx);
    if (opts.isAPI) {
        var fake = {
            getKey: getKey,
            ref: apiMapRef(opts.idx),
            set: function (kt, k, vt, v) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_b) {
                void kt;
                void k;
                void vt;
                void v;
                return [2 /*return*/];
            }); }); }
        };
        return copyMap(fake);
    }
    else {
        return basicMap(getKey);
    }
};
export var mapSet = function (m, kt, k, vt, v) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, m.set(kt, k, vt, v)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
export var mapRef = function (m, kt, k, vt) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, m.ref(kt, k, vt)];
            case 1: return [2 /*return*/, _b.sent()];
        }
    });
}); };
export var Array_asyncMap = function (as, f) { return __awaiter(void 0, void 0, void 0, function () {
    var fWrap;
    return __generator(this, function (_b) {
        fWrap = function (_a, i) { return f(as.map(function (a) { return a[i]; }), i); };
        return [2 /*return*/, Promise.all(as[0].map(fWrap))];
    });
}); };
export var Array_asyncReduce = function (as, b, f) { return __awaiter(void 0, void 0, void 0, function () {
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
//# sourceMappingURL=shared_backend.js.map