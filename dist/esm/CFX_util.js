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
// lightly adapted from @conflux-dev/conflux-address-js@1.0.0
import JSBI from 'jsbi';
import { debug } from './shared_impl';
var ALPHABET = 'ABCDEFGHJKMNPRSTUVWXYZ0123456789';
var ALPHABET_MAP = {};
for (var z = 0; z < ALPHABET.length; z++) {
    var x = ALPHABET.charAt(z);
    if (ALPHABET_MAP[x] !== undefined) {
        throw new TypeError(x + ' is ambiguous');
    }
    ALPHABET_MAP[x] = z;
}
// pre defined BigInt could faster about 40 percent
var BIGINT_0 = JSBI.BigInt(0);
var BIGINT_1 = JSBI.BigInt(1);
var BIGINT_5 = JSBI.BigInt(5);
var BIGINT_35 = JSBI.BigInt(35);
var BIGINT_0B00001 = JSBI.BigInt(1);
var BIGINT_0B00010 = JSBI.BigInt(2);
var BIGINT_0B00100 = JSBI.BigInt(4);
var BIGINT_0B01000 = JSBI.BigInt(8);
var BIGINT_0B10000 = JSBI.BigInt(16);
var BIGINT_0X07FFFFFFFF = JSBI.BigInt(0x07ffffffff);
var BIGINT_0X98F2BC8E61 = JSBI.BigInt(0x98f2bc8e61);
var BIGINT_0X79B76D99E2 = JSBI.BigInt(0x79b76d99e2);
var BIGINT_0XF33E5FB3C4 = JSBI.BigInt(0xf33e5fb3c4);
var BIGINT_0XAE2EABE2A8 = JSBI.BigInt(0xae2eabe2a8);
var BIGINT_0X1E4F43E470 = JSBI.BigInt(0x1e4f43e470);
function convertBit(buffer, inBits, outBits, pad) {
    var e_1, _a;
    if (pad === void 0) { pad = false; }
    var mask = (1 << outBits) - 1;
    var array = [];
    var bits = 0;
    var value = 0;
    try {
        for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
            var byte = buffer_1_1.value;
            bits += inBits;
            value = (value << inBits) | byte;
            while (bits >= outBits) {
                bits -= outBits;
                array.push((value >>> bits) & mask);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1["return"])) _a.call(buffer_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    value = (value << (outBits - bits)) & mask;
    if (bits && pad) {
        array.push(value);
    }
    else if (value && !pad) {
        throw new Error('Excess padding');
    }
    else if (bits >= inBits && !pad) {
        throw new Error('Non-zero padding');
    }
    return array;
}
function polyMod(buffer) {
    var e_2, _a;
    var checksumBigInt = BIGINT_1;
    try {
        for (var buffer_2 = __values(buffer), buffer_2_1 = buffer_2.next(); !buffer_2_1.done; buffer_2_1 = buffer_2.next()) {
            var byte = buffer_2_1.value;
            // c0 = c >> 35;
            var high = JSBI.signedRightShift(checksumBigInt, BIGINT_35); // XXX: checksumBigInt must be positive, signedRightShift is ok
            // c = ((c & 0x07ffffffff) << 5) ^ d;
            checksumBigInt = JSBI.bitwiseAnd(checksumBigInt, BIGINT_0X07FFFFFFFF);
            checksumBigInt = JSBI.leftShift(checksumBigInt, BIGINT_5);
            checksumBigInt = byte ? JSBI.bitwiseXor(checksumBigInt, JSBI.BigInt(byte)) : checksumBigInt; // bit ^ 0 = bit
            if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B00001), BIGINT_0)) {
                checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0X98F2BC8E61);
            }
            if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B00010), BIGINT_0)) {
                checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0X79B76D99E2);
            }
            if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B00100), BIGINT_0)) {
                checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0XF33E5FB3C4);
            }
            if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B01000), BIGINT_0)) {
                checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0XAE2EABE2A8);
            }
            if (JSBI.notEqual(JSBI.bitwiseAnd(high, BIGINT_0B10000), BIGINT_0)) {
                checksumBigInt = JSBI.bitwiseXor(checksumBigInt, BIGINT_0X1E4F43E470);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (buffer_2_1 && !buffer_2_1.done && (_a = buffer_2["return"])) _a.call(buffer_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return JSBI.bitwiseXor(checksumBigInt, BIGINT_1);
}
// lightly adapted from @conflux-dev/conflux-address-js@1.0.0
var VERSION_BYTE = 0;
var NET_ID_LIMIT = 0xFFFFFFFF;
function encodeNetId(netId) {
    if (!Number.isInteger(netId)) {
        throw new Error('netId should be passed as an integer');
    }
    if (netId <= 0 || netId > NET_ID_LIMIT) {
        throw new Error('netId should be passed as in range [1, 0xFFFFFFFF]');
    }
    switch (netId) {
        case 1:
            return 'cfxtest';
        case 1029:
            return 'cfx';
        default:
            return "net".concat(netId);
    }
}
function isValidNetId(netId) {
    return /^([1-9]\d*)$/.test(netId) && Number(netId) <= NET_ID_LIMIT;
}
function decodeNetId(payload) {
    switch (payload) {
        case 'cfxtest':
            return 1;
        case 'cfx':
            return 1029;
        default: {
            var prefix = payload.slice(0, 3);
            var netId = payload.slice(3);
            if (prefix !== 'net' || !isValidNetId(netId)) {
                throw new Error("netId prefix should be passed by 'cfx', 'cfxtest' or 'net[n]' ");
            }
            if (Number(netId) === 1 || Number(netId) === 1029) {
                throw new Error('net1 or net1029 are invalid');
            }
            return Number(netId);
        }
    }
}
function getAddressType(hexAddress) {
    var e_3, _a;
    if (hexAddress.length < 1) {
        throw new Error('Empty payload in address');
    }
    switch (hexAddress[0] & 0xf0) {
        case 0x10:
            return 'user';
        case 0x80:
            return 'contract';
        case 0x00:
            try {
                for (var hexAddress_1 = __values(hexAddress), hexAddress_1_1 = hexAddress_1.next(); !hexAddress_1_1.done; hexAddress_1_1 = hexAddress_1.next()) {
                    var x = hexAddress_1_1.value;
                    if (x !== 0x00) {
                        return 'builtin';
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (hexAddress_1_1 && !hexAddress_1_1.done && (_a = hexAddress_1["return"])) _a.call(hexAddress_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return 'null';
        default:
            throw new Error('hexAddress should start with 0x0, 0x1 or 0x8');
    }
}
// mimicking cfxsdk.address.encodeCfxAddress
export function encodeCfxAddress(ha_in, netId) {
    var hexAddress = (ha_in instanceof Buffer) ? ha_in : Buffer.from(ha_in);
    if (hexAddress.length < 20) {
        throw new Error('hexAddress should be at least 20 bytes');
    }
    var addressType = getAddressType(hexAddress).toUpperCase();
    var netName = encodeNetId(netId).toUpperCase();
    var netName5Bits = Buffer.from(netName).map(function (byte) { return byte & 31; });
    var payload5Bits = convertBit(__spreadArray([VERSION_BYTE], __read(hexAddress), false), 8, 5, true);
    var checksumBigInt = polyMod(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(netName5Bits), false), [0], false), __read(payload5Bits), false), [0, 0, 0, 0, 0, 0, 0, 0], false));
    var checksumBytes = __spreadArray([], __read(Buffer.from(checksumBigInt.toString(16).padStart(10, '0'), 'hex')), false);
    var checksum5Bits = convertBit(checksumBytes, 8, 5, true);
    var payload = payload5Bits.map(function (byte) { return ALPHABET[byte]; }).join('');
    var checksum = checksum5Bits.map(function (byte) { return ALPHABET[byte]; }).join('');
    return "".concat(netName, ":TYPE.").concat(addressType, ":").concat(payload).concat(checksum);
}
;
// mimicking cfxsdk.address.decodeCfxAddress
export function decodeCfxAddress(address) {
    var e_4, _a, e_5, _b;
    debug("decode", { address: address });
    // don't allow mixed case
    var lowered = address.toLowerCase();
    var uppered = address.toUpperCase();
    if (address !== lowered && address !== uppered) {
        throw new Error('Mixed-case address ' + address);
    }
    var am = address.toUpperCase().match(/^([^:]+):(.+:)?(.{34})(.{8})$/);
    if (!am) {
        throw Error("Invalid address: ".concat(address));
    }
    var _c = __read(am, 5), netName = _c[1], shouldHaveType = _c[2], payload = _c[3], checksum = _c[4];
    var prefix5Bits = __spreadArray([], __read(Buffer.from(netName)), false).map(function (byte) { return byte & 31; });
    var payload5Bits = [];
    try {
        for (var payload_1 = __values(payload), payload_1_1 = payload_1.next(); !payload_1_1.done; payload_1_1 = payload_1.next()) {
            var char = payload_1_1.value;
            payload5Bits.push(ALPHABET_MAP[char]);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (payload_1_1 && !payload_1_1.done && (_a = payload_1["return"])) _a.call(payload_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    var checksum5Bits = [];
    try {
        for (var checksum_1 = __values(checksum), checksum_1_1 = checksum_1.next(); !checksum_1_1.done; checksum_1_1 = checksum_1.next()) {
            var char = checksum_1_1.value;
            checksum5Bits.push(ALPHABET_MAP[char]);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (checksum_1_1 && !checksum_1_1.done && (_b = checksum_1["return"])) _b.call(checksum_1);
        }
        finally { if (e_5) throw e_5.error; }
    }
    var _d = __read(convertBit(payload5Bits, 5, 8)), version = _d[0], addressBytes = _d.slice(1);
    if (version !== VERSION_BYTE) {
        throw new Error('Can not recognize version byte');
    }
    var hexAddress = Buffer.from(addressBytes);
    var netId = decodeNetId(netName.toLowerCase());
    var type = getAddressType(hexAddress);
    if (shouldHaveType) {
        var actual = "type.".concat(type, ":");
        var expected = shouldHaveType.toLowerCase();
        if (actual !== expected) {
            throw new Error("Type of address doesn't match, got '".concat(actual, "', expected '").concat(expected, "'"));
        }
    }
    var bigInt = polyMod(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __read(prefix5Bits), false), [0], false), __read(payload5Bits), false), __read(checksum5Bits), false));
    if (Number(bigInt)) {
        throw new Error("Invalid checksum for ".concat(address));
    }
    return { hexAddress: hexAddress, netId: netId, type: type };
}
;
// TODO: 'latest_state' seems to work well; is there a better choice?
export var defaultEpochTag = 'latest_state';
/** @description Precondition: addrC is a valid Conflux address */
export function address_cfxStandardize(addrC) {
    debug("address_cfxStandardize", { addrC: addrC });
    var pieces = addrC.split(':');
    //debug(`address_cfxStandardize`, pieces.length, {pieces});
    if (pieces.length === 3) {
        addrC = "".concat(pieces[0], ":").concat(pieces[2]);
    }
    else if (pieces.length !== 2) {
        throw Error("impossible: bad CFX addr: '".concat(addrC, "'"));
    }
    //debug(`address_cfxStandardize`, {addrC});
    return addrC.toUpperCase();
}
//# sourceMappingURL=CFX_util.js.map