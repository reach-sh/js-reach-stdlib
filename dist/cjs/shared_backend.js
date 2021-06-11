"use strict";
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
exports.__esModule = true;
exports.simMapSet = exports.simMapRef = exports.simMapDupe = exports.Array_zip = exports.mapRef = exports.Array_set = exports.lt = exports.le = exports.gt = exports.ge = exports.eq = exports.digestEq = exports.bytesConcat = exports.bytesEq = exports.stringToHex = exports.isHex = exports.hexlify = exports.protect = exports.checkedBigNumberify = exports.assert = void 0;
// This has no dependencies on other shared things
var ethers_1 = require("ethers");
var CBR_1 = require("./CBR");
var shared_impl_1 = require("./shared_impl");
void (shared_impl_1.debug);
;
var assert = function (d, ai) {
    if (ai === void 0) { ai = null; }
    if (!d) {
        throw Error(JSON.stringify(ai));
    }
};
exports.assert = assert;
var checkedBigNumberify = function (at, m, x) {
    var xb = CBR_1.bigNumberify(x);
    if (xb.gte(0) && xb.lte(m)) {
        return xb;
    }
    throw Error("bigNumberify: " + x + " out of range [0, " + m + "] at " + at);
};
exports.checkedBigNumberify = checkedBigNumberify;
// .canonicalize turns stuff into the "canonical backend representation"
function protect(ctc, v, ai) {
    if (ai === void 0) { ai = null; }
    try {
        return ctc.canonicalize(v);
    }
    catch (e) {
        console.log("Protect failed: expected ", ctc.name, " but got ", v, " ", ai);
        throw e;
    }
}
exports.protect = protect;
;
var _a = ethers_1.ethers.utils, toUtf8Bytes = _a.toUtf8Bytes, isHexString = _a.isHexString;
exports.hexlify = ethers_1.ethers.utils.hexlify;
exports.isHex = isHexString;
var stringToHex = function (x) {
    return exports.hexlify(toUtf8Bytes(x));
};
exports.stringToHex = stringToHex;
var forceHex = function (x) {
    return exports.isHex(x) ? x : exports.stringToHex(x);
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
exports.digestEq = exports.bytesEq;
var eq = function (a, b) { return CBR_1.bigNumberify(a).eq(CBR_1.bigNumberify(b)); };
exports.eq = eq;
var ge = function (a, b) { return CBR_1.bigNumberify(a).gte(CBR_1.bigNumberify(b)); };
exports.ge = ge;
var gt = function (a, b) { return CBR_1.bigNumberify(a).gt(CBR_1.bigNumberify(b)); };
exports.gt = gt;
var le = function (a, b) { return CBR_1.bigNumberify(a).lte(CBR_1.bigNumberify(b)); };
exports.le = le;
var lt = function (a, b) { return CBR_1.bigNumberify(a).lt(CBR_1.bigNumberify(b)); };
exports.lt = lt;
function Array_set(arr, idx, elem) {
    var arrp = arr.slice();
    arrp[idx] = elem;
    return arrp;
}
exports.Array_set = Array_set;
var mapRef = function (m, f) {
    var v = m[f];
    // console.log(`Reading map ${JSON.stringify(m)} field ${JSON.stringify(f)} => ${JSON.stringify(v)}`);
    if (v === undefined) {
        return ['None', null];
    }
    else {
        return ['Some', v];
    }
};
exports.mapRef = mapRef;
var Array_zip = function (x, y) {
    return x.map(function (e, i) { return [e, y[i]]; });
};
exports.Array_zip = Array_zip;
var simMapDupe = function (sim_r, mapi, mapo) {
    sim_r.mapsPrev[mapi] = __assign({}, mapo);
    sim_r.mapsNext[mapi] = __assign({}, mapo);
};
exports.simMapDupe = simMapDupe;
var simMapLog = function (sim_r, f) {
    sim_r.mapRefs.push(f);
};
var simMapRef = function (sim_r, mapi, f) {
    simMapLog(sim_r, f);
    return exports.mapRef(sim_r.mapsNext[mapi], f);
};
exports.simMapRef = simMapRef;
var simMapSet = function (sim_r, mapi, f, nv) {
    simMapLog(sim_r, f);
    sim_r.mapsNext[mapi][f] = nv;
};
exports.simMapSet = simMapSet;
//# sourceMappingURL=shared_backend.js.map