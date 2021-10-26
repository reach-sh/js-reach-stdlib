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
// This has no dependencies on other shared things
import { ethers } from 'ethers';
import { bigNumberify } from './CBR';
import { debug } from './shared_impl';
void (debug);
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
        console.log("Protect failed: expected ", ctc.name, " but got ", v, " ", ai);
        throw e;
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
export var mapRef = function (m, f) {
    var v = m[f];
    // console.log(`Reading map ${JSON.stringify(m)} field ${JSON.stringify(f)} => ${JSON.stringify(v)}`);
    if (v === undefined) {
        return ['None', null];
    }
    else {
        return ['Some', v];
    }
};
export var Array_zip = function (x, y) {
    return x.map(function (e, i) { return [e, y[i]]; });
};
export var simMapDupe = function (sim_r, mapi, mapo) {
    sim_r.mapsPrev[mapi] = __assign({}, mapo);
    sim_r.mapsNext[mapi] = __assign({}, mapo);
};
var simMapLog = function (sim_r, f) {
    sim_r.mapRefs.push(f);
};
export var simMapRef = function (sim_r, mapi, f) {
    simMapLog(sim_r, f);
    return mapRef(sim_r.mapsNext[mapi], f);
};
export var simMapSet = function (sim_r, mapi, f, nv) {
    simMapLog(sim_r, f);
    sim_r.mapsNext[mapi][f] = nv;
};
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