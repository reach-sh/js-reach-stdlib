"use strict";
exports.__esModule = true;
exports.BV_Data = exports.BT_Data = exports.BV_Object = exports.BT_Object = exports.BV_Struct = exports.BT_Struct = exports.BV_Tuple = exports.BT_Tuple = exports.BV_Array = exports.BT_Array = exports.BV_Address = exports.BT_Address = exports.BV_Digest = exports.BT_Digest = exports.BT_Bytes = exports.BV_UInt = exports.BT_UInt = exports.BV_Bool = exports.BT_Bool = exports.BT_Null = exports.BV_Null = exports.bigNumberToNumber = exports.bigNumberify = void 0;
var ethers_1 = require("ethers");
var shared_backend_1 = require("./shared_backend");
var BigNumber = ethers_1.ethers.BigNumber;
var bigNumberify = function (x) { return BigNumber.from(x); };
exports.bigNumberify = bigNumberify;
var bigNumberToNumber = function (x) {
    return exports.bigNumberify(x).toNumber();
};
exports.bigNumberToNumber = bigNumberToNumber;
exports.BV_Null = null;
exports.BT_Null = {
    name: 'Null',
    canonicalize: function (val) {
        // Doesn't check with triple eq; we're being lenient here
        if (val != null) {
            throw Error("Expected null, but got " + JSON.stringify(val));
        }
        return exports.BV_Null;
    }
};
exports.BT_Bool = {
    name: 'Bool',
    canonicalize: function (val) {
        if (typeof (val) !== 'boolean') {
            throw Error("Expected boolean, but got " + JSON.stringify(val));
        }
        return val;
    }
};
var BV_Bool = function (val) {
    return exports.BT_Bool.canonicalize(val);
};
exports.BV_Bool = BV_Bool;
var BT_UInt = function (max) { return ({
    name: 'UInt',
    canonicalize: function (uv) {
        try {
            return shared_backend_1.checkedBigNumberify('stdlib:CBR:BT_UInt', max, uv);
        }
        catch (e) {
            if (typeof (uv) === 'string') {
                throw Error("String does not represent a BigNumber. " + JSON.stringify(uv));
            }
            throw e;
        }
    }
}); };
exports.BT_UInt = BT_UInt;
var BV_UInt = function (val, max) {
    return exports.BT_UInt(max).canonicalize(val);
};
exports.BV_UInt = BV_UInt;
var BT_Bytes = function (len) { return ({
    name: "Bytes(" + len + ")",
    canonicalize: function (val) {
        var lenn = exports.bigNumberToNumber(len);
        if (typeof (val) !== 'string') {
            throw Error("Bytes expected string, but got " + JSON.stringify(val));
        }
        var checkLen = function (label, alen, fill) {
            if (val.length > alen) {
                throw Error("Bytes(" + len + ") must be a " + label + "string less than or equal to " + alen + ", but given " + label + "string of length " + val.length);
            }
            return val.padEnd(alen, fill);
        };
        if (val.slice(0, 2) === '0x') {
            return checkLen('hex ', lenn * 2 + 2, '0');
        }
        else {
            return checkLen('', lenn, '\0');
        }
    }
}); };
exports.BT_Bytes = BT_Bytes;
// TODO: check digest length, or something similar?
// That's probably best left to connector-specific code.
exports.BT_Digest = {
    name: 'Digest',
    canonicalize: function (val) {
        if (typeof val !== 'string') {
            throw Error(JSON.stringify(val) + " is not a valid digest");
        }
        return val;
    }
};
/** @description You probably don't want to create a BV_Digest manually. */
var BV_Digest = function (val) {
    return exports.BT_Digest.canonicalize(val);
};
exports.BV_Digest = BV_Digest;
exports.BT_Address = ({
    name: 'Address',
    canonicalize: function (val) {
        if (typeof val !== 'string') {
            throw Error("Address must be a string, but got: " + JSON.stringify(val));
        }
        else if (val.slice(0, 2) !== '0x') {
            throw Error("Address must start with 0x, but got: " + JSON.stringify(val));
        }
        else if (!ethers_1.ethers.utils.isHexString(val)) {
            throw Error("Address must be a valid hex string, but got: " + JSON.stringify(val));
        }
        return val;
    }
});
// XXX: don't use this. Use net-specific ones
var BV_Address = function (val) {
    return exports.BT_Address.canonicalize(val);
};
exports.BV_Address = BV_Address;
var BT_Array = function (ctc, size) {
    // TODO: check ctc, sz for sanity
    return {
        name: "Array(" + ctc.name + ", " + size + ")",
        canonicalize: function (args) {
            if (!Array.isArray(args)) {
                throw Error("Expected an Array, but got " + JSON.stringify(args));
            }
            if (size != args.length) {
                throw Error("Expected array of length " + size + ", but got " + args.length);
            }
            var val = args.map(function (arg) { return ctc.canonicalize(arg); });
            return val;
        }
    };
};
exports.BT_Array = BT_Array;
// Note: curried
/** @example BV_Array(BT_UInt, 3)([1, 2, 3]) */
var BV_Array = function (ctc, size) { return function (val) {
    return exports.BT_Array(ctc, size).canonicalize(val);
}; };
exports.BV_Array = BV_Array;
var BT_Tuple = function (ctcs) {
    // TODO: check ctcs for sanity
    return {
        name: "Tuple(" + ctcs.map(function (ctc) { return " " + ctc.name + " "; }) + ")",
        canonicalize: function (args) {
            if (!Array.isArray(args)) {
                throw Error("Expected a Tuple, but got " + JSON.stringify(args));
            }
            if (ctcs.length != args.length) {
                throw Error("Expected tuple of size " + ctcs.length + ", but got " + args.length);
            }
            var val = args.map(function (arg, i) { return ctcs[i].canonicalize(arg); });
            return val;
        }
    };
};
exports.BT_Tuple = BT_Tuple;
// Note: curried
/** @example BV_Tuple([BT_UInt, BT_Bytes])([42, 'hello']) */
var BV_Tuple = function (ctcs) { return function (val) {
    return exports.BT_Tuple(ctcs).canonicalize(val);
}; };
exports.BV_Tuple = BV_Tuple;
var BT_Struct = function (ctcs) {
    return {
        name: "Struct([" + ctcs.map(function (_a) {
            var k = _a[0], ctc = _a[1];
            return " [" + k + ", " + ctc.name + "] ";
        }) + "])",
        canonicalize: function (arg) {
            var obj = {};
            ctcs.forEach(function (_a, i) {
                var k = _a[0], ctc = _a[1];
                obj[k] = ctc.canonicalize(Array.isArray(arg) ? arg[i] : arg[k]);
            });
            return obj;
        }
    };
};
exports.BT_Struct = BT_Struct;
var BV_Struct = function (ctcs) { return function (val) {
    return exports.BT_Struct(ctcs).canonicalize(val);
}; };
exports.BV_Struct = BV_Struct;
var BT_Object = function (co) {
    // TODO: check co for sanity
    return {
        name: "Object(" + Object.keys(co).map(function (k) { return " " + k + ": " + co[k].name + " "; }) + ")",
        canonicalize: function (vo) {
            if (typeof (vo) !== 'object') {
                throw Error("Expected object, but got " + JSON.stringify(vo));
            }
            var obj = {};
            for (var prop in co) {
                // This is dumb but it's how ESLint says to do it
                // https://eslint.org/docs/rules/no-prototype-builtins
                if (!{}.hasOwnProperty.call(vo, prop)) {
                    throw Error("Expected prop " + prop + ", but didn't found it in " + Object.keys(vo));
                }
                obj[prop] = co[prop].canonicalize(vo[prop]);
            }
            return obj;
        }
    };
};
exports.BT_Object = BT_Object;
// Note: curried
/** @example BV_Object({x: BT_UInt})({x: 3}) */
var BV_Object = function (co) { return function (val) {
    return exports.BT_Object(co).canonicalize(val);
}; };
exports.BV_Object = BV_Object;
var BT_Data = function (co) {
    // TODO: check co for sanity
    return {
        name: "Data(" + Object.keys(co).map(function (k) { return " " + k + ": " + co[k].name + " "; }) + ")",
        canonicalize: function (io) {
            if (!(Array.isArray(io) && io.length == 2 && typeof io[0] == 'string')) {
                throw Error("Expected an array of length two to represent a data instance, but got " + JSON.stringify(io));
            }
            var vn = io[0];
            if (!{}.hasOwnProperty.call(co, vn)) {
                throw Error("Expected a variant in " + Object.keys(co) + ", but got " + vn);
            }
            return [vn, co[vn].canonicalize(io[1])];
        }
    };
};
exports.BT_Data = BT_Data;
/** @example BV_Data({x: BT_UInt, y: BT_Bytes})(['x', 3]); */
var BV_Data = function (co) { return function (val) {
    return exports.BT_Data(co).canonicalize(val);
}; };
exports.BV_Data = BV_Data;
//# sourceMappingURL=CBR.js.map