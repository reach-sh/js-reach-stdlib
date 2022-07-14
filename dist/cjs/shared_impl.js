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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.handleFormat = exports.makeSigningMonitor = exports.retryLoop = exports.None = exports.Some = exports.isSome = exports.isNone = exports.Lock = exports.Signal = exports.setQueryLowerBound = exports.getQueryLowerBound = exports.makeEventStream = exports.makeEventQueue = exports.checkTimeout = exports.make_waitUntilX = exports.make_newTestAccounts = exports.argMin = exports.argMax = exports.checkVersion = exports.ensureConnectorAvailable = exports.mkAddressEq = exports.objectMap = exports.argsSplit = exports.argsSlice = exports.makeArith = exports.UInt256_max = exports.makeRandom = exports.hexToBigNumber = exports.hexToString = exports.makeDigest = exports.envDefaultNoEmpty = exports.envDefault = exports.truthyEnv = exports.labelMaps = exports.memoizeThunk = exports.replaceableThunk = exports.stdAccount = exports.stdAccount_unsupported = exports.stdContract = exports.stdGetABI = exports.stdABIFilter = exports.stdVerifyContract = exports.debug = exports.getDEBUG = exports.hideWarnings = exports.setDEBUG = exports.j2s = exports.j2sf = exports.hasProp = exports.hexlify = void 0;
exports.makeParseCurrency = exports.apiStateMismatchError = exports.formatWithDecimals = void 0;
// This can depend on the shared backend
var crypto_1 = __importDefault(require("crypto"));
var await_timeout_1 = __importDefault(require("await-timeout"));
var ethers_1 = require("ethers");
var CBR_1 = require("./CBR");
var util_1 = __importDefault(require("util"));
var shared_backend_1 = require("./shared_backend");
var shim_1 = require("./shim");
var shared_backend_2 = require("./shared_backend");
__createBinding(exports, shared_backend_2, "hexlify");
// This is dumb but it's how ESLint says to do it
// `hasOwnProperty` is important for denying access to prototype fields
// https://eslint.org/docs/rules/no-prototype-builtins
var hasProp = function (o, p) { return o && {}.hasOwnProperty.call(o, p); };
exports.hasProp = hasProp;
var j2sf = function (x) {
    // We're removing duplicated values, so we can remove cyclic references
    var seen = [];
    var rep = function (key, val) {
        void key;
        if (val != null && typeof val === "object") {
            var idx = seen.indexOf(val);
            if (idx >= 0) {
                return "@".concat(idx);
            }
            seen.push(val);
        }
        return val;
    };
    return JSON.stringify(x, rep, 2);
};
exports.j2sf = j2sf;
var j2s = function (x) {
    var xs = "".concat(x);
    if (!(x && x._isBigNumber) && (xs === '{}' || xs.startsWith('[object'))) {
        return (0, exports.j2sf)(x);
    }
    return xs;
};
exports.j2s = j2s;
var DEBUG = truthyEnv(shim_1.process.env.REACH_DEBUG);
var setDEBUG = function (b) {
    if (b === false || b === true) {
        DEBUG = b;
    }
    else {
        throw Error("Expected bool, got ".concat((0, exports.j2s)(b)));
    }
};
exports.setDEBUG = setDEBUG;
var hideWarnings = function () { return truthyEnv(shim_1.process.env.REACH_NO_WARN); };
exports.hideWarnings = hideWarnings;
var getDEBUG = function () { return DEBUG; };
exports.getDEBUG = getDEBUG;
var debug = function () {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    if ((0, exports.getDEBUG)()) {
        // Print arrays/objects in full instead of the default depth of 2
        var betterMsgs = msgs.map(function (msg) {
            return ["object", "array"].includes(typeof msg) && util_1["default"] && util_1["default"].inspect instanceof Function
                ? util_1["default"].inspect(msg, false, null, true)
                : msg;
        });
        void (betterMsgs);
        // Print objects for indentation, colors, etc...
        console.log.apply(console, __spreadArray([new Date(), "DEBUG:"], __read(msgs), false));
    }
};
exports.debug = debug;
var isUntaggedView = function (x) {
    return 'ty' in x && 'decode' in x;
};
var stdVerifyContract = function (stdArgs, doVerify) { return __awaiter(void 0, void 0, void 0, function () {
    var getTrustedVerifyResult, setTrustedVerifyResult, r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                getTrustedVerifyResult = stdArgs.getTrustedVerifyResult, setTrustedVerifyResult = stdArgs.setTrustedVerifyResult;
                r = getTrustedVerifyResult();
                if (r) {
                    return [2 /*return*/, r];
                }
                return [4 /*yield*/, doVerify()];
            case 1:
                r = _a.sent();
                setTrustedVerifyResult(r);
                return [2 /*return*/, r];
        }
    });
}); };
exports.stdVerifyContract = stdVerifyContract;
var stdABIFilter = function (x) {
    if (x.name && x.name.startsWith('_reach')) {
        return false;
    }
    return true;
};
exports.stdABIFilter = stdABIFilter;
var stdGetABI = function (ABI) { return function (isFull) {
    return isFull ? ABI : ABI.filter(exports.stdABIFilter);
}; };
exports.stdGetABI = stdGetABI;
var stdContract = function (stdContractArgs) {
    var bin = stdContractArgs.bin, getABI = stdContractArgs.getABI, waitUntilTime = stdContractArgs.waitUntilTime, waitUntilSecs = stdContractArgs.waitUntilSecs, selfAddress = stdContractArgs.selfAddress, iam = stdContractArgs.iam, stdlib = stdContractArgs.stdlib, setupView = stdContractArgs.setupView, setupEvents = stdContractArgs.setupEvents, _setup = stdContractArgs._setup, givenInfoP = stdContractArgs.givenInfoP;
    var _a = (function () {
        var _setInfo = function (info) {
            throw Error("Cannot set info(".concat((0, exports.j2s)(info), ") (i.e. deploy) when acc.contract called with contract info: You are trying to attach to a contract as the deployer, which is not possible."));
            return;
        };
        if (givenInfoP !== undefined) {
            return {
                setInfo: _setInfo,
                getInfo: (function () { return givenInfoP; })
            };
        }
        else {
            var beenSet_1 = false;
            var _infoP_1 = new Promise(function (resolve) {
                _setInfo = function (info) {
                    if (beenSet_1) {
                        throw Error("Cannot set info(".concat((0, exports.j2s)(info), ") (i.e. deploy) twice"));
                    }
                    resolve(info);
                    beenSet_1 = true;
                };
            });
            return {
                setInfo: _setInfo,
                getInfo: (function () { return _infoP_1; })
            };
        }
    })(), setInfo = _a.setInfo, getInfo = _a.getInfo;
    var trustedVerifyResult = undefined;
    var getTrustedVerifyResult = function () { return trustedVerifyResult; };
    var setTrustedVerifyResult = function (x) { trustedVerifyResult = x; };
    var viewArgs = { getInfo: getInfo, setTrustedVerifyResult: setTrustedVerifyResult, getTrustedVerifyResult: getTrustedVerifyResult };
    var setupArgs = __assign(__assign({}, viewArgs), { setInfo: setInfo });
    var _initialize = function () {
        var _a = _setup(setupArgs), getContractInfo = _a.getContractInfo, getContractAddress = _a.getContractAddress, getContractCompanion = _a.getContractCompanion, getBalance = _a.getBalance, sendrecv = _a.sendrecv, recv = _a.recv, getCurrentStep = _a.getCurrentStep, getState = _a.getState, apiMapRef = _a.apiMapRef;
        return {
            selfAddress: selfAddress,
            iam: iam,
            stdlib: stdlib,
            waitUntilTime: waitUntilTime,
            waitUntilSecs: waitUntilSecs,
            getContractInfo: getContractInfo,
            getContractAddress: getContractAddress,
            getContractCompanion: getContractCompanion,
            getBalance: getBalance,
            sendrecv: sendrecv,
            recv: recv,
            getCurrentStep: getCurrentStep,
            getState: getState,
            apiMapRef: apiMapRef
        };
    };
    var ctcC = { _initialize: _initialize };
    var _b = setupView(viewArgs), viewLib = _b.viewLib, getView1 = _b.getView1;
    var views_bin = bin._getViews({ reachStdlib: stdlib }, viewLib);
    var mkViews = function (isSafe) {
        return (0, exports.objectMap)(views_bin.infos, (function (v, vm) {
            return isUntaggedView(vm)
                ? getView1(views_bin.views, v, undefined, vm, isSafe)
                : (0, exports.objectMap)(vm, (function (k, vi) {
                    return getView1(views_bin.views, v, k, vi, isSafe);
                }));
        }));
    };
    var views = mkViews(true);
    var unsafeViews = mkViews(false);
    var participants = (0, exports.objectMap)(bin._Participants, (function (pn, p) {
        void (pn);
        return (function (io) {
            return p(ctcC, io);
        });
    }));
    var mkApis = function (isSafe) {
        if (isSafe === void 0) { isSafe = false; }
        return (0, exports.objectMap)(bin._APIs, (function (an, am) {
            var f = function (afn, ab) {
                var mk = function (sep) {
                    return (afn === undefined) ? "".concat(an) : "".concat(an).concat(sep).concat(afn);
                };
                var bp = mk("_");
                delete participants[bp];
                var bl = mk(".");
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var terminal = { terminated: bl };
                    var theResolve;
                    var theReject;
                    var p = new Promise(function (resolve, reject) {
                        theResolve = resolve;
                        theReject = reject;
                    });
                    var fail = function (err) {
                        if (isSafe) {
                            theResolve(['None', null]);
                        }
                        else {
                            theReject(err);
                        }
                    };
                    (0, exports.debug)("".concat(bl, ": start"), args);
                    ab(ctcC, {
                        "in": (function () {
                            (0, exports.debug)("".concat(bl, ": in"), args);
                            return args;
                        }),
                        "out": (function (oargs, res) {
                            (0, exports.debug)("".concat(bl, ": out"), oargs, res);
                            theResolve(isSafe ? ['Some', res] : res);
                            throw terminal;
                        })
                    })["catch"](function (err) {
                        if (Object.is(err, terminal)) {
                            (0, exports.debug)("".concat(bl, ": done"));
                        }
                        else {
                            fail(new Error("".concat(bl, " errored with ").concat(err)));
                        }
                    }).then(function (res) {
                        fail(new Error("".concat(bl, " returned with ").concat((0, exports.j2s)(res))));
                    });
                    return p;
                };
            };
            return (typeof am === 'object')
                ? (0, exports.objectMap)(am, f)
                : f(undefined, am);
        }));
    };
    var apis = mkApis(false);
    var safeApis = mkApis(true);
    var eventMap = bin._getEvents({ reachStdlib: stdlib });
    var createEventStream = setupEvents(viewArgs).createEventStream;
    var events = (0, exports.objectMap)(eventMap, (function (k, v) {
        return Array.isArray(v) // untagged
            ? createEventStream(k, v)
            : (0, exports.objectMap)(v, (function (kp, vp) {
                return createEventStream(k + "_" + kp, vp);
            }));
    }));
    return __assign(__assign({}, ctcC), { getABI: getABI, getInfo: getInfo, getContractAddress: (function () { return _initialize().getContractAddress(); }), participants: participants, p: participants, views: views, v: views, getViews: function () {
            console.log("WARNING: ctc.getViews() is deprecated; use ctc.views or ctc.v instead.");
            return views;
        }, unsafeViews: unsafeViews, apis: apis, a: apis, safeApis: safeApis, events: events, e: events });
};
exports.stdContract = stdContract;
var stdAccount_unsupported = function (conn) {
    var setGasLimit = function (ngl) {
        void (ngl);
        console.warn("setGasLimit not supported on ".concat(conn));
    };
    var getGasLimit = function () {
        console.warn("getGasLimit not supported on ".concat(conn));
        return (0, CBR_1.bigNumberify)(0);
    };
    var setStorageLimit = function (ngl) {
        void (ngl);
        console.warn("setStorageLimit not supported on ".concat(conn));
    };
    var getStorageLimit = function () {
        console.warn("getStorageLimit not supported on ".concat(conn));
        return (0, CBR_1.bigNumberify)(0);
    };
    return { setGasLimit: setGasLimit, getGasLimit: getGasLimit, setStorageLimit: setStorageLimit, getStorageLimit: getStorageLimit };
};
exports.stdAccount_unsupported = stdAccount_unsupported;
var stdAccount = function (orig) {
    return __assign(__assign({}, orig), { deploy: function (bin) {
            console.log("WARNING: acc.deploy(bin) is deprecated; use acc.contract(bin) instead. Deployment is implied by the first publication.");
            return orig.contract(bin, undefined);
        }, attach: function (bin, ctcInfoP) {
            console.log("WARNING: acc.attach(bin, info) is deprecated; use acc.contract(bin, info) instead. Attachment is implied by reception of the first publication.");
            return orig.contract(bin, ctcInfoP);
        } });
};
exports.stdAccount = stdAccount;
/**
 * @description Create a getter/setter, where the getter defaults to memoizing a thunk
 */
function replaceableThunk(thunk) {
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
exports.replaceableThunk = replaceableThunk;
/**
 * @description Only perform side effects from thunk on the first call.
 */
function memoizeThunk(thunk) {
    return replaceableThunk(thunk)[0];
}
exports.memoizeThunk = memoizeThunk;
/**
 * @description ascLabels[i] = label; labelMap[label] = i;
 */
var labelMaps = function (co) {
    var ascLabels = Object.keys(co).sort();
    var labelMap = {};
    for (var i in ascLabels) {
        labelMap[ascLabels[i]] = parseInt(i);
    }
    return { ascLabels: ascLabels, labelMap: labelMap };
};
exports.labelMaps = labelMaps;
/** @description Check that a stringy env value doesn't look falsy. */
function truthyEnv(v) {
    if (!v)
        return false;
    return ![
        '0', 'false', 'f', '#f', 'no', 'off', 'n', '',
    ].includes(v && v.toLowerCase && v.toLowerCase());
}
exports.truthyEnv = truthyEnv;
var envDefault = function (v, d) {
    return (v === undefined || v === null) ? d : v;
};
exports.envDefault = envDefault;
var envDefaultNoEmpty = function (v, d) {
    var v2 = (0, exports.envDefault)(v, d);
    return v2 === '' ? d : v2;
};
exports.envDefaultNoEmpty = envDefaultNoEmpty;
var makeDigest = function (mode, prep) { return function (t, v) {
    void (shared_backend_1.hexlify);
    // const args = [t, v];
    // debug('digest(', args, ') =>');
    var kekCat = prep(t, v);
    // debug('digest(', args, ') => internal(', hexlify(kekCat), ')');
    var f = mode === 'keccak256' ? ethers_1.ethers.utils.keccak256 : ethers_1.ethers.utils.sha256;
    var r = f(kekCat);
    (0, exports.debug)('digest', { mode: mode, prep: prep, t: t, v: v, kekCat: kekCat, f: f, r: r });
    // debug('keccak(', args, ') => internal(', hexlify(kekCat), ') => ', r);
    return r;
}; };
exports.makeDigest = makeDigest;
exports.hexToString = ethers_1.ethers.utils.toUtf8String;
var byteToHex = function (b) { return (b & 0xFF).toString(16).padStart(2, '0'); };
var byteArrayToHex = function (b) { return Array.from(b, byteToHex).join(''); };
var hexTo0x = function (h) { return '0x' + h.replace(/^0x/, ''); };
var hexToBigNumber = function (h) { return (0, CBR_1.bigNumberify)(hexTo0x(h)); };
exports.hexToBigNumber = hexToBigNumber;
var makeRandom = function (width) {
    var randomUInt = function () {
        return (0, exports.hexToBigNumber)(byteArrayToHex(crypto_1["default"].randomBytes(width)));
    };
    var hasRandom = {
        random: randomUInt
    };
    return { randomUInt: randomUInt, hasRandom: hasRandom };
};
exports.makeRandom = makeRandom;
var bnSqrt = function (y) {
    var acc = [y, y.div(2).add(1)];
    var ans = undefined;
    while (ans === undefined) {
        var _a = __read(acc, 2), z = _a[0], x = _a[1];
        if (x.lt(2)) {
            ans = x;
        }
        else if (x.lt(z)) {
            acc = [x, y.div(x).add(x).div(2)];
        }
        else {
            ans = x;
        }
    }
    return ans;
};
exports.UInt256_max = ethers_1.ethers.BigNumber.from(2).pow(256).sub(1);
var makeArith = function (m) {
    var checkB = function (x) {
        return (0, shared_backend_1.checkedBigNumberify)("internal", exports.UInt256_max, x);
    };
    var checkM = function (x) {
        return (0, shared_backend_1.checkedBigNumberify)("internal", m, x);
    };
    var doBN2 = function (f, a, b) { return a[f](b); };
    var getCheck = function (w) { return w ? checkB : checkM; };
    var cast = function (from, to, x, trunc) {
        var checkF = getCheck(from);
        var checkT = getCheck(to);
        var bigX = (0, CBR_1.bigNumberify)(x);
        var maybeTruncated = trunc ? bigX.and(m) : bigX;
        return checkT(checkF(maybeTruncated));
    };
    var liftX2 = function (check) { return function (f) { return function (a, b) { return check(doBN2(f, (0, CBR_1.bigNumberify)(a), (0, CBR_1.bigNumberify)(b))); }; }; };
    var liftB = liftX2(checkB);
    var liftM = liftX2(checkM);
    var doBN1 = function (f, a) {
        if (f === 'sqrt') {
            return bnSqrt(a);
        }
        else {
            throw Error('impossible BNOp1');
        }
    };
    var liftX1 = function (check) { return function (f) { return function (a) { return check(doBN1(f, (0, CBR_1.bigNumberify)(a))); }; }; };
    var liftB1 = liftX1(checkB);
    var liftM1 = liftX1(checkM);
    var add = liftM('add');
    var sub = liftM('sub');
    var mod = liftM('mod');
    var mul = liftM('mul');
    var div = liftM('div');
    var band = liftM('and');
    var bior = liftM('or');
    var bxor = liftM('xor');
    var sqrt = liftM1('sqrt');
    var add256 = liftB('add');
    var sub256 = liftB('sub');
    var mod256 = liftB('mod');
    var mul256 = liftB('mul');
    var div256 = liftB('div');
    var band256 = liftB('and');
    var bior256 = liftB('or');
    var bxor256 = liftB('xor');
    var sqrt256 = liftB1('sqrt');
    var muldiv = function (a, b, c) {
        var prod = (0, CBR_1.bigNumberify)(a).mul((0, CBR_1.bigNumberify)(b));
        return checkM(prod.div((0, CBR_1.bigNumberify)(c)));
    };
    return {
        add: add,
        sub: sub,
        mod: mod,
        mul: mul,
        div: div,
        band: band,
        bior: bior,
        bxor: bxor,
        sqrt: sqrt,
        add256: add256,
        sub256: sub256,
        mod256: mod256,
        mul256: mul256,
        div256: div256,
        band256: band256,
        bior256: bior256,
        bxor256: bxor256,
        sqrt256: sqrt256,
        cast: cast,
        muldiv: muldiv
    };
};
exports.makeArith = makeArith;
var argsSlice = function (args, cnt) {
    return cnt == 0 ? [] : args.slice(-1 * cnt);
};
exports.argsSlice = argsSlice;
var argsSplit = function (args, cnt) {
    return cnt == 0 ? [args, []] : [args.slice(0, args.length - cnt), args.slice(-1 * cnt)];
};
exports.argsSplit = argsSplit;
var objectMap = function (object, mapFn) {
    return Object.keys(object).reduce(function (result, key) {
        result[key] = mapFn(key, object[key]);
        return result;
    }, {});
};
exports.objectMap = objectMap;
var mkAddressEq = function (T_Address) { return function (x, y) {
    return (0, shared_backend_1.bytesEq)(T_Address.canonicalize(x), T_Address.canonicalize(y));
}; };
exports.mkAddressEq = mkAddressEq;
var ensureConnectorAvailable = function (bin, conn, jsVer, connVer) {
    (0, exports.checkVersion)(bin._backendVersion, jsVer, "JavaScript backend");
    var connectors = bin._Connectors;
    var conn_bin = connectors[conn];
    if (!conn_bin) {
        throw (new Error("The application was not compiled for the ".concat(conn, " connector, only: ").concat(Object.keys(connectors))));
    }
    (0, exports.checkVersion)(conn_bin.version, connVer, "".concat(conn, " backend"));
};
exports.ensureConnectorAvailable = ensureConnectorAvailable;
var checkVersion = function (actual, expected, label) {
    if (actual !== expected) {
        var older = (actual === undefined) || (actual < expected);
        var more = older ? "update your compiler and recompile!" : "update your standard library and rerun!";
        throw Error("This Reach compiled ".concat(label, " does not match the expectations of this Reach standard library: expected ").concat(expected, ", but got ").concat(actual, "; ").concat(more));
    }
};
exports.checkVersion = checkVersion;
var argHelper = function (xs, f, op) {
    if (xs.length == 0) {
        return undefined;
    }
    return xs.reduce(function (accum, x) {
        return op(f(x), f(accum)) ? x : accum;
    }, xs[0]);
};
var argMax = function (xs, f) {
    return argHelper(xs, f, function (a, b) { return a > b; });
};
exports.argMax = argMax;
var argMin = function (xs, f) {
    return argHelper(xs, f, function (a, b) { return a < b; });
};
exports.argMin = argMin;
var make_newTestAccounts = function (newTestAccount) {
    var makeArr = function (k) { return (new Array(k)).fill(1); };
    var parallel = function (k, bal) {
        return Promise.all(makeArr(k).map(function (_) { return newTestAccount(bal); }));
    };
    var serial = function (k, bal) { return __awaiter(void 0, void 0, void 0, function () {
        var arr, i, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    arr = [];
                    i = 0;
                    _c.label = 1;
                case 1:
                    if (!(i < k)) return [3 /*break*/, 4];
                    _b = (_a = arr).push;
                    return [4 /*yield*/, newTestAccount(bal)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    _c.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, arr];
            }
        });
    }); };
    return { parallel: parallel, serial: serial };
};
exports.make_newTestAccounts = make_newTestAccounts;
var make_waitUntilX = function (label, getCurrent, step) { return function (target, onProgress) { return __awaiter(void 0, void 0, void 0, function () {
    var onProg, current, notify;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                onProg = onProgress || (function () { });
                return [4 /*yield*/, getCurrent()];
            case 1:
                current = _a.sent();
                notify = function () {
                    var o = { current: current, target: target };
                    (0, exports.debug)("waitUntilX:", label, o);
                    onProg(o);
                };
                _a.label = 2;
            case 2:
                if (!current.lt(target)) return [3 /*break*/, 4];
                (0, exports.debug)('waitUntilX', { label: label, current: current, target: target });
                return [4 /*yield*/, step(current.add(1))];
            case 3:
                current = _a.sent();
                notify();
                return [3 /*break*/, 2];
            case 4:
                notify();
                return [2 /*return*/, current];
        }
    });
}); }; };
exports.make_waitUntilX = make_waitUntilX;
var checkTimeout = function (runningIsolated, getTimeSecs, timeoutAt, nowTime) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, mode, val, nowSecs, e_1, nowSecs;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                (0, exports.debug)('checkTimeout', { timeoutAt: timeoutAt, nowTime: nowTime });
                if (!timeoutAt) {
                    return [2 /*return*/, false];
                }
                _a = __read(timeoutAt, 2), mode = _a[0], val = _a[1];
                if (!(mode === 'time')) return [3 /*break*/, 1];
                return [2 /*return*/, val.lte(nowTime)];
            case 1:
                if (!(mode === 'secs')) return [3 /*break*/, 6];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, getTimeSecs(nowTime)];
            case 3:
                nowSecs = _b.sent();
                return [2 /*return*/, val.lte(nowSecs)];
            case 4:
                e_1 = _b.sent();
                (0, exports.debug)('checkTimeout', 'err', "".concat(e_1));
                if (runningIsolated()) {
                    nowSecs = Math.floor(Date.now() / 1000);
                    (0, exports.debug)('checkTimeout', 'isolated', val.toString(), nowSecs);
                    return [2 /*return*/, val.lt(nowSecs - 1)];
                }
                return [2 /*return*/, false];
            case 5: return [3 /*break*/, 7];
            case 6: throw new Error("invalid TimeArg mode");
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.checkTimeout = checkTimeout;
var neverTrue = function (r) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, (void (r), false)];
}); }); };
;
;
;
var makeEventQueue = function (ctorArgs) {
    var raw2proc = ctorArgs.raw2proc, alwaysIgnored = ctorArgs.alwaysIgnored, getTxns = ctorArgs.getTxns, getTxnTime = ctorArgs.getTxnTime;
    var initArgs = undefined;
    var ptxns = [];
    var ctime = (0, CBR_1.bigNumberify)(0);
    var customIgnore = [];
    var isInited = function () { return initArgs !== undefined; };
    var init = function (args) {
        (0, shared_backend_1.assert)(initArgs === undefined, "init: must be uninitialized");
        initArgs = args;
    };
    var pushIgnore = function (pred) {
        (0, shared_backend_1.assert)(initArgs !== undefined, "pushIgnore: must be initialized");
        customIgnore.push(pred);
    };
    var notIgnored = function (txn) { return (!alwaysIgnored(txn)); };
    var peq = function (lab, didTimeout, limsug) { return __awaiter(void 0, void 0, void 0, function () {
        var dhead, updateCtime, howMany, _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dhead = "".concat(lab, " peq");
                    updateCtime = function (ntime) {
                        if (ctime.lt(ntime)) {
                            (0, exports.debug)(dhead, 'updating ctime', { ctime: ctime, ntime: ntime });
                            ctime = ntime;
                        }
                        return ntime;
                    };
                    if (initArgs === undefined) {
                        throw Error("".concat(dhead, ": not initialized"));
                    }
                    howMany = 0;
                    _loop_1 = function () {
                        var _b, txns, gtime, r_1, cmpTxn, cis, ci, t, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, getTxns(dhead, initArgs, ctime, howMany++, limsug)];
                                case 1:
                                    _b = _d.sent(), txns = _b.txns, gtime = _b.gtime;
                                    if (txns.length === 0 && gtime) {
                                        updateCtime(gtime);
                                    }
                                    else {
                                        r_1 = function (x) { return updateCtime(getTxnTime(x)); };
                                        cmpTxn = function (x, y) {
                                            return r_1(x).sub(r_1(y)).toNumber();
                                        };
                                        txns.sort(cmpTxn);
                                        if (txns.length === 1) {
                                            r_1(txns[0]);
                                        }
                                        txns = txns.filter(notIgnored);
                                    }
                                    cis = customIgnore;
                                    while (txns.length > 0 && cis.length > 0) {
                                        ci = cis[0];
                                        cis.shift();
                                        t = txns[0];
                                        txns.shift();
                                        if (!ci(t)) {
                                            throw Error("".concat(dhead, " customIgnore present, ").concat(ci, ", but top txn did not match ").concat((0, exports.j2s)(t)));
                                        }
                                        else {
                                            (0, exports.debug)(dhead, "ignored", ci, t);
                                        }
                                    }
                                    _c = txns.length === 0;
                                    if (!_c) return [3 /*break*/, 3];
                                    return [4 /*yield*/, didTimeout(ctime)];
                                case 2:
                                    _c = (_d.sent());
                                    _d.label = 3;
                                case 3:
                                    if (_c) {
                                        return [2 /*return*/, { value: { timeout: true, time: ctime } }];
                                    }
                                    ptxns = txns.map(raw2proc);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (!(ptxns.length === 0)) return [3 /*break*/, 3];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, { timeout: false, txn: ptxns[0] }];
            }
        });
    }); };
    var deq = function (dhead, limsug) { return __awaiter(void 0, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, peq(dhead, neverTrue, limsug)];
                case 1:
                    r = _a.sent();
                    if (r.timeout) {
                        throw Error('impossible');
                    }
                    ptxns.shift();
                    return [2 /*return*/, r.txn];
            }
        });
    }); };
    return { isInited: isInited, init: init, peq: peq, deq: deq, pushIgnore: pushIgnore };
};
exports.makeEventQueue = makeEventQueue;
;
var makeEventStream = function (args) {
    var eq = args.eq, getTxnTime = args.getTxnTime, sync = args.sync, getNetworkTime = args.getNetworkTime, getLogs = args.getLogs, parseLog = args.parseLog;
    var time = (0, CBR_1.bigNumberify)(0);
    var logs = [];
    var seek = function (t) {
        (0, shared_backend_1.assert)(time.lt(t), 'seek must seek future');
        (0, exports.debug)("EventStream::seek", t);
        time = t;
        logs = [];
    };
    var next = function () { return __awaiter(void 0, void 0, void 0, function () {
        var dhead, parsedLog, txn, cr, l;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sync()];
                case 1:
                    _a.sent();
                    dhead = "EventStream::next";
                    parsedLog = undefined;
                    _a.label = 2;
                case 2:
                    if (!(parsedLog === undefined)) return [3 /*break*/, 6];
                    _a.label = 3;
                case 3:
                    if (!(logs.length === 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, eq.deq(dhead)];
                case 4:
                    txn = _a.sent();
                    (0, exports.debug)(dhead, { txn: txn });
                    cr = getTxnTime(txn);
                    if (cr.gte(time)) {
                        time = cr;
                        logs = getLogs(txn);
                        (0, exports.debug)(dhead, { time: time, logs: logs });
                    }
                    return [3 /*break*/, 3];
                case 5:
                    l = logs[0];
                    logs.shift();
                    parsedLog = parseLog(l);
                    (0, exports.debug)(dhead, { parsedLog: parsedLog, l: l });
                    return [3 /*break*/, 2];
                case 6:
                    (0, exports.debug)(dhead, 'ret');
                    return [2 /*return*/, { when: time, what: parsedLog }];
            }
        });
    }); };
    var seekNow = function () { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = seek;
                return [4 /*yield*/, getNetworkTime()];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    }); }); };
    var lastTime = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, time];
    }); }); };
    var monitor = function (onEvent) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!true) return [3 /*break*/, 2];
                    _a = onEvent;
                    return [4 /*yield*/, next()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return { lastTime: lastTime, seek: seek, seekNow: seekNow, monitor: monitor, next: next };
};
exports.makeEventStream = makeEventStream;
function getQueryLowerBound() {
    console.log("WARNING: getQueryLowerBound() is deprecated and does nothing.");
    return (0, CBR_1.bigNumberify)(0);
}
exports.getQueryLowerBound = getQueryLowerBound;
;
function setQueryLowerBound(x) {
    void (x);
    console.log("WARNING: setQueryLowerBound() is deprecated and does nothing.");
}
exports.setQueryLowerBound = setQueryLowerBound;
;
var makePromise = function () {
    var r = function (a) { void (a); throw new Error("promise never initialized"); };
    var p = new Promise(function (resolve) { r = resolve; });
    return [p, r];
};
var Signal = /** @class */ (function () {
    function Signal() {
        var _a;
        _a = __read(makePromise(), 2), this.p = _a[0], this.r = _a[1];
    }
    Signal.prototype.wait = function () { return this.p; };
    Signal.prototype.notify = function () { this.r(true); };
    return Signal;
}());
exports.Signal = Signal;
;
var Lock = /** @class */ (function () {
    function Lock() {
        this.locked = false;
    }
    Lock.prototype.acquire = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        x = 1;
                        _a.label = 1;
                    case 1:
                        if (!this.locked) return [3 /*break*/, 3];
                        return [4 /*yield*/, await_timeout_1["default"].set(Math.min(512, x))];
                    case 2:
                        _a.sent();
                        x = x * 2;
                        return [3 /*break*/, 1];
                    case 3:
                        this.locked = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Lock.prototype.release = function () {
        this.locked = false;
    };
    Lock.prototype.runWith = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            var r, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.acquire()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, f()];
                    case 3:
                        r = _a.sent();
                        this.release();
                        return [2 /*return*/, r];
                    case 4:
                        e_2 = _a.sent();
                        this.release();
                        throw e_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return Lock;
}());
exports.Lock = Lock;
function isNone(m) {
    return m.length === 0;
}
exports.isNone = isNone;
function isSome(m) {
    return !isNone(m);
}
exports.isSome = isSome;
var Some = function (m) { return [m]; };
exports.Some = Some;
exports.None = [];
var retryLoop = function (lab, f) { return __awaiter(void 0, void 0, void 0, function () {
    var retries, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                retries = 0;
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, f()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                e_3 = _a.sent();
                console.log("retryLoop", { lab: lab, retries: retries, e: e_3 });
                retries++;
                return [3 /*break*/, 5];
            case 5: return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.retryLoop = retryLoop;
var makeSigningMonitor = function () {
    var mon = undefined;
    var setSigningMonitor = function (h) {
        mon = h;
    };
    var notifySend = function (e, pre) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, post, postr_1, notifyComplete;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!mon) return [3 /*break*/, 2];
                    _a = __read(makePromise(), 2), post = _a[0], postr_1 = _a[1];
                    mon(e, pre, post);
                    notifyComplete = function (pb) { return __awaiter(void 0, void 0, void 0, function () {
                        var b;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, pb];
                                case 1:
                                    b = _a.sent();
                                    postr_1(b);
                                    return [2 /*return*/, b];
                            }
                        });
                    }); };
                    return [4 /*yield*/, pre];
                case 1: return [2 /*return*/, [_b.sent(), notifyComplete]];
                case 2: return [4 /*yield*/, pre];
                case 3: return [2 /*return*/, [_b.sent(), function (x) { return x; }]];
            }
        });
    }); };
    return [setSigningMonitor, notifySend];
};
exports.makeSigningMonitor = makeSigningMonitor;
/** @example lpad('asdf', '0', 6); // => '00asdf' */
var lpad = function (str, padChar, nChars) {
    var padding = padChar.repeat(Math.max(nChars - str.length, 0));
    return padding + str;
};
/** @example rdrop('asfdfff', 'f'); // => 'asfd' */
var rdrop = function (str, char) {
    while (str[str.length - 1] === char) {
        str = str.slice(0, str.length - 1);
    }
    return str;
};
/** @example ldrop('007', '0'); // => '7' */
var ldrop = function (str, char) {
    while (str[0] === char) {
        str = str.slice(1);
    }
    return str;
};
// Helper to<BigNumber> -> string formatting function used in a couple of places
// amt = the number to format
// decimals = number of digits from the right to put the decimal point
// splitValue = number of digits to keep after the decimal point
// Example: handleFormat(1234567, 4, 2) => "123.45"
var handleFormat = function (amt, decimals, splitValue) {
    if (splitValue === void 0) { splitValue = 6; }
    if (!(Number.isInteger(decimals) && 0 <= decimals)) {
        throw Error("Expected decimals to be a nonnegative integer, but got ".concat(decimals, "."));
    }
    if (!(Number.isInteger(splitValue) && 0 <= splitValue)) {
        throw Error("Expected split value to be a nonnegative integer, but got ".concat(decimals, "."));
    }
    var amtStr = (0, CBR_1.bigNumberify)(amt).toString();
    var splitAt = Math.max(amtStr.length - splitValue, 0);
    var lPredropped = amtStr.slice(0, splitAt);
    var l = ldrop(lPredropped, '0') || '0';
    if (decimals === 0) {
        return l;
    }
    var rPre = lpad(amtStr.slice(splitAt), '0', splitValue);
    var rSliced = rPre.slice(0, decimals);
    var r = rdrop(rSliced, '0');
    return r ? "".concat(l, ".").concat(r) : l;
};
exports.handleFormat = handleFormat;
var formatWithDecimals = function (amt, decimals) {
    return (0, exports.handleFormat)(amt, decimals, decimals);
};
exports.formatWithDecimals = formatWithDecimals;
var apiStateMismatchError = function (bin, es, as) {
    var formatLoc = function (s) {
        return (0, shared_backend_1.formatAssertInfo)(bin._stateSourceMap[s.toNumber()]);
    };
    var msg = function (s, l) { return "\nState ".concat(s, " corresponds to the commit() at ").concat(l); };
    var el = Array.isArray(es)
        ? es.map(function (s) { return msg(s, formatLoc(s)); })
        : msg(es, formatLoc(es));
    var al = formatLoc(as);
    var fmtEs = Array.isArray(es) ? "[" + es + "]" : es;
    return Error("Expected the DApp to be in state(s) ".concat(fmtEs, ", but it was actually in state ").concat(as, ".\n")
        + el
        + msg(as, al)
        + (el == al ? "\n(This means that the commit() is in the continuation of impure control-flow.)" : ""));
};
exports.apiStateMismatchError = apiStateMismatchError;
var makeParseCurrency = function (defaultDecs) { return function (amt, decimals) {
    if (decimals === void 0) { decimals = defaultDecs; }
    if (!(Number.isInteger(decimals) && 0 <= decimals)) {
        throw Error("Expected decimals to be a nonnegative integer, but got ".concat(decimals, "."));
    }
    var _a = __read(amt.toString().split('.')), amtL = _a[0], amtR = _a[1], amtMore = _a.slice(2);
    if (amtMore.length > 0) {
        throw Error("malformed input: parseCurrency('".concat(amt, "')"));
    }
    var amtStr = "".concat(amtL, ".").concat((amtR || '').slice(0, decimals));
    return (0, CBR_1.bigNumberify)(ethers_1.ethers.utils.parseUnits(amtStr, decimals));
}; };
exports.makeParseCurrency = makeParseCurrency;
//# sourceMappingURL=shared_impl.js.map