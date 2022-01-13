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
// This has no dependencies on other shared things
import { ethers } from 'ethers';
import { bigNumberify } from './CBR';
import { debug } from './shared_impl';
void (debug);
export var asMaybe = function (v) {
    if (v === undefined) {
        return ['None', null];
    }
    else {
        return ['Some', v];
    }
};
;
export var assert = function (d, ai) {
    if (ai === void 0) { ai = null; }
    if (!d) {
        throw Error(JSON.stringify(ai));
    }
};
export var checkedBigNumberify = function (at, m, x) {
    var xb = bigNumberify(x);
    if (xb.gte(0) && xb.lte(m)) {
        return xb;
    }
    throw Error("bigNumberify: " + x + " out of range [0, " + m + "] at " + at);
};
// .canonicalize turns stuff into the "canonical backend representation"
export function protect(ctc, v, ai) {
    if (ai === void 0) { ai = null; }
    debug("protect", ctc.name, v);
    try {
        return ctc.canonicalize(v);
    }
    catch (e) {
        var vs = "" + v;
        if (vs === '{}' || vs === '[object Object]') {
            vs = JSON.stringify(v);
        }
        throw Error("Protect failed: expected " + ctc.name + " but got " + vs + "; " + JSON.stringify(ai) + ":\n" + JSON.stringify(e));
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
export var simTokenNew = function (sim_r, n, s, u, m, p, d) {
    sim_r.txns.push({ kind: 'tokenNew', n: n, s: s, u: u, m: m, p: p, d: d });
    // XXX This 0 is a hack... on Algorand we can't know at simulation time what
    // this is going to be... so this will cause a runtime exception from
    // something if it gets looked at (i.e. if you try to create and immediately
    // use it)
    return 0;
};
export var simTokenBurn = function (sim_r, tok, amt) {
    sim_r.txns.push({ kind: 'tokenBurn', tok: tok, amt: amt });
};
export var simTokenDestroy = function (sim_r, tok) {
    sim_r.txns.push({ kind: 'tokenDestroy', tok: tok });
};
//# sourceMappingURL=shared_backend.js.map