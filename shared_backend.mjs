var __assign = (this && this.__assign) || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
// This has no dependencies on other shared things
import ethers from 'ethers';
import { bigNumberify } from './CBR.mjs';;
export var assert = function(d, ai) {
  if (ai === void 0) { ai = null; }
  if (!d) {
    throw Error(JSON.stringify(ai));
  }
};
export var checkedBigNumberify = function(at, m, x) {
  var xb = bigNumberify(x);
  if (xb.gte(0) && xb.lte(m)) {
    return xb;
  }
  throw Error("bigNumberify: " + x + " out of range [0, " + m + "] at " + at);
};
// .canonicalize turns stuff into the "canonical backend representation"
export function protect(ctc, v, ai) {
  if (ai === void 0) { ai = null; }
  try {
    return ctc.canonicalize(v);
  } catch (e) {
    console.log("Protect failed: expected ", ctc.name, " but got ", v, " ", ai);
    throw e;
  }
};
var _a = ethers.utils,
  toUtf8Bytes = _a.toUtf8Bytes,
  isHexString = _a.isHexString;
export var hexlify = ethers.utils.hexlify;
export var isHex = isHexString;
export var stringToHex = function(x) {
  return hexlify(toUtf8Bytes(x));
};
var forceHex = function(x) {
  return isHex(x) ? x : stringToHex(x);
};
export var bytesEq = function(x, y) {
  return forceHex(x) === forceHex(y);
};
export var digestEq = bytesEq;
export var eq = function(a, b) { return bigNumberify(a).eq(bigNumberify(b)); };
export var ge = function(a, b) { return bigNumberify(a).gte(bigNumberify(b)); };
export var gt = function(a, b) { return bigNumberify(a).gt(bigNumberify(b)); };
export var le = function(a, b) { return bigNumberify(a).lte(bigNumberify(b)); };
export var lt = function(a, b) { return bigNumberify(a).lt(bigNumberify(b)); };
export function Array_set(arr, idx, elem) {
  var arrp = arr.slice();
  arrp[idx] = elem;
  return arrp;
}
export var mapRef = function(m, f) {
  var v = m[f];
  // console.log(`Reading map ${JSON.stringify(m)} field ${JSON.stringify(f)} => ${JSON.stringify(v)}`);
  if (v === undefined) {
    return ['None', null];
  } else {
    return ['Some', v];
  }
};
export var Array_zip = function(x, y) {
  return x.map(function(e, i) { return [e, y[i]]; });
};
export var simMapDupe = function(sim_r, mapi, mapo) {
  sim_r.mapsPrev[mapi] = __assign({}, mapo);
  sim_r.mapsNext[mapi] = __assign({}, mapo);
};
var simMapLog = function(sim_r, f) {
  sim_r.mapRefs.push(f);
};
export var simMapRef = function(sim_r, mapi, f) {
  simMapLog(sim_r, f);
  return mapRef(sim_r.mapsNext[mapi], f);
};
export var simMapSet = function(sim_r, mapi, f, nv) {
  simMapLog(sim_r, f);
  sim_r.mapsNext[mapi][f] = nv;
};
//# sourceMappingURL=shared_backend.js.map
