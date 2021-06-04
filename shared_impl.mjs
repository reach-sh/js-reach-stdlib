var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
  return new(P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
    f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

  function verb(n) { return function(v) { return step([n, v]); }; }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
            t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2];
            _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e];
      y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __spreadArray = (this && this.__spreadArray) || function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
// This can depend on the shared backend
import crypto from 'crypto';
import ethers from 'ethers';
import { bigNumberify, } from './CBR.mjs';
import util from 'util';
import { hexlify, checkedBigNumberify, bytesEq, } from './shared_backend.mjs';
import { process } from './shim.mjs';
export { hexlify } from './shared_backend.mjs';
var DEBUG = process.env.REACH_DEBUG ? true : false;
export var setDEBUG = function(b) {
  if (b === false || b === true) {
    DEBUG = b;
  } else {
    throw Error("Expected bool, got " + JSON.stringify(b));
  }
};
export var getDEBUG = function() { return DEBUG; };
export var debug = function() {
  var msgs = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    msgs[_i] = arguments[_i];
  }
  if (getDEBUG()) {
    // Print arrays/objects in full instead of the default depth of 2
    var betterMsgs = msgs.map(function(msg) {
      return ["object", "array"].includes(typeof msg) && util && util.inspect instanceof Function ?
        util.inspect(msg, false, null, true) :
        msg;
    });
    void(betterMsgs);
    // Print objects for indentation, colors, etc...
    console.log.apply(console, __spreadArray([new Date(), "DEBUG:"], msgs));
  }
};
export var getViewsHelper = function(views, getView1) {
  return function() {
    return objectMap(views.infos, (function(v, vm) {
      return objectMap(vm, (function(k, vi) {
        return getView1(views.views, v, k, vi);
      }));
    }));
  };
};
export var deferContract = function(shouldError, implP, implNow) {
  var not_yet = function(which) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      void(args);
      throw Error("Cannot " + which + " yet; contract is not actually deployed");
    };
  };
  var delay = function(which) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return __awaiter(void 0, void 0, void 0, function() {
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              return [4 /*yield*/ , implP];
            case 1:
              // @ts-ignore
              return [2 /*return*/ , (_a = (_b.sent()))[which].apply(_a, args)];
          }
        });
      });
    };
  };
  var thenow = shouldError ? not_yet : delay;
  var mnow = function(which) {
    return implNow[which] === undefined ? thenow(which) : implNow[which];
  };
  // impl starts with a shim that deploys on first sendrecv,
  // then replaces itself with the real impl once deployed.
  var impl = {
    getInfo: delay('getInfo'),
    // @ts-ignore
    creationTime: delay('creationTime'),
    // @ts-ignore
    sendrecv: mnow('sendrecv'),
    // @ts-ignore
    recv: mnow('recv'),
    // @ts-ignore
    wait: not_yet('wait'),
    // @ts-ignore
    iam: mnow('iam'),
    // @ts-ignore
    selfAddress: mnow('selfAddress'),
    // @ts-ignore
    getViews: not_yet('getViews'),
    stdlib: (function() {
      if (implNow.stdlib === undefined) {
        throw Error("stdlib not defined");
      }
      return implNow.stdlib;
    })()
  };
  implP.then(function(x) { impl = x; });
  var wrap = function(which) {
    return function() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      // @ts-ignore
      return impl[which].apply(impl, args);
    };
  };
  // Return a wrapper around the impl. This obj and its fields do not mutate,
  // but the fields are closures around a mutating ref to impl.
  return {
    sendrecv: wrap('sendrecv'),
    recv: wrap('recv'),
    wait: wrap('wait'),
    getInfo: wrap('getInfo'),
    creationTime: wrap('creationTime'),
    iam: wrap('iam'),
    selfAddress: wrap('selfAddress'),
    getViews: wrap('getViews'),
    stdlib: impl.stdlib
  };
};
/**
 * @description Create a getter/setter, where the getter defaults to memoizing a thunk
 */
export function replaceableThunk(thunk) {
  var called = false;
  var res = null;

  function get() {
    if (!called) {
      called = true;
      res = thunk();
    }
    return res;
  }

  function set(val) {
    if (called) {
      throw Error("Cannot re-set value once already set");
    }
    res = val;
    called = true;
  }
  return [get, set];
}
/**
 * @description Only perform side effects from thunk on the first call.
 */
export function memoizeThunk(thunk) {
  return replaceableThunk(thunk)[0];
}
/**
 * @description ascLabels[i] = label; labelMap[label] = i;
 */
export var labelMaps = function(co) {
  var ascLabels = Object.keys(co).sort();
  var labelMap = {};
  for (var i in ascLabels) {
    labelMap[ascLabels[i]] = parseInt(i);
  }
  return { ascLabels: ascLabels, labelMap: labelMap };
};
export function truthyEnv(v) {
  if (!v)
    return false;
  return ![
    '0', 'false', 'f', '#f', 'no', 'off',
  ].includes(v && v.toLowerCase && v.toLowerCase());
}
export var envDefault = function(v, d) {
  return (v === undefined || v === null) ? d : v;
};
export var makeDigest = function(prep) {
  return function(t, v) {
    void(hexlify);
    // const args = [t, v];
    // debug('digest(', args, ') =>');
    var kekCat = prep(t, v);
    // debug('digest(', args, ') => internal(', hexlify(kekCat), ')');
    var r = ethers.utils.keccak256(kekCat);
    // debug('keccak(', args, ') => internal(', hexlify(kekCat), ') => ', r);
    return r;
  };
};
export var hexToString = ethers.utils.toUtf8String;
var byteToHex = function(b) { return (b & 0xFF).toString(16).padStart(2, '0'); };
var byteArrayToHex = function(b) { return Array.from(b, byteToHex).join(''); };
var hexTo0x = function(h) { return '0x' + h.replace(/^0x/, ''); };
export var hexToBigNumber = function(h) { return bigNumberify(hexTo0x(h)); };
export var makeRandom = function(width) {
  var randomUInt = function() {
    return hexToBigNumber(byteArrayToHex(crypto.randomBytes(width)));
  };
  var hasRandom = {
    random: randomUInt
  };
  return { randomUInt: randomUInt, hasRandom: hasRandom };
};
export var makeArith = function(m) {
  var check = function(x) {
    return checkedBigNumberify("internal", m, x);
  };
  var add = function(a, b) { return check(bigNumberify(a).add(bigNumberify(b))); };
  var sub = function(a, b) { return check(bigNumberify(a).sub(bigNumberify(b))); };
  var mod = function(a, b) { return check(bigNumberify(a).mod(bigNumberify(b))); };
  var mul = function(a, b) { return check(bigNumberify(a).mul(bigNumberify(b))); };
  var div = function(a, b) { return check(bigNumberify(a).div(bigNumberify(b))); };
  return { add: add, sub: sub, mod: mod, mul: mul, div: div };
};
export var argsSlice = function(args, cnt) {
  return cnt == 0 ? [] : args.slice(-1 * cnt);
};
export var argsSplit = function(args, cnt) {
  return cnt == 0 ? [args, []] : [args.slice(0, args.length - cnt), args.slice(-1 * cnt)];
};
export var objectMap = function(object, mapFn) {
  return Object.keys(object).reduce(function(result, key) {
    result[key] = mapFn(key, object[key]);
    return result;
  }, {});
};
export var mkAddressEq = function(T_Address) {
  return function(x, y) {
    return bytesEq(T_Address.canonicalize(x), T_Address.canonicalize(y));
  };
};
//# sourceMappingURL=shared_impl.js.map
