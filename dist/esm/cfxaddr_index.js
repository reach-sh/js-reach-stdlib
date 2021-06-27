var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// lightly adapted from @conflux-dev/conflux-address-js@1.0.0
// @ts-nocheck
import { ALPHABET, ALPHABET_MAP, polyMod, convertBit } from './cfxaddr_base32';
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
            return "net" + netId;
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
    if (hexAddress.length < 1) {
        throw new Error('Empty payload in address');
    }
    switch (hexAddress[0] & 0xf0) {
        case 0x10:
            return 'user';
        case 0x80:
            return 'contract';
        case 0x00:
            for (var _i = 0, hexAddress_1 = hexAddress; _i < hexAddress_1.length; _i++) {
                var x = hexAddress_1[_i];
                if (x !== 0x00) {
                    return 'builtin';
                }
            }
            return 'null';
        default:
            throw new Error('hexAddress should start with 0x0, 0x1 or 0x8');
    }
}
function encode(hexAddress, netId, verbose) {
    if (verbose === void 0) { verbose = false; }
    if (!(hexAddress instanceof Buffer)) {
        if (hexAddress instanceof Uint8Array) {
            hexAddress = Buffer.from(hexAddress);
        }
        else {
            throw new Error('hexAddress should be passed as a Buffer or Uint8Array');
        }
    }
    if (hexAddress.length < 20) {
        throw new Error('hexAddress should be at least 20 bytes');
    }
    var addressType = getAddressType(hexAddress).toUpperCase();
    var netName = encodeNetId(netId).toUpperCase();
    var netName5Bits = Buffer.from(netName).map(function (byte) { return byte & 31; });
    var payload5Bits = convertBit(__spreadArray([VERSION_BYTE], hexAddress), 8, 5, true);
    var checksumBigInt = polyMod(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], netName5Bits), [0]), payload5Bits), [0, 0, 0, 0, 0, 0, 0, 0]));
    var checksumBytes = Buffer.from(checksumBigInt.toString(16).padStart(10, '0'), 'hex');
    var checksum5Bits = convertBit(checksumBytes, 8, 5, true);
    var payload = payload5Bits.map(function (byte) { return ALPHABET[byte]; }).join('');
    var checksum = checksum5Bits.map(function (byte) { return ALPHABET[byte]; }).join('');
    return verbose
        ? netName + ":TYPE." + addressType + ":" + payload + checksum
        : (netName + ":" + payload + checksum).toLowerCase();
}
function decode(address) {
    // don't allow mixed case
    var lowered = address.toLowerCase();
    var uppered = address.toUpperCase();
    if (address !== lowered && address !== uppered) {
        throw new Error('Mixed-case address ' + address);
    }
    var _a = address.toUpperCase().match(/^([^:]+):(.+:)?(.{34})(.{8})$/), netName = _a[1], shouldHaveType = _a[2], payload = _a[3], checksum = _a[4];
    var prefix5Bits = Buffer.from(netName).map(function (byte) { return byte & 31; });
    var payload5Bits = [];
    for (var _i = 0, payload_1 = payload; _i < payload_1.length; _i++) {
        var char = payload_1[_i];
        payload5Bits.push(ALPHABET_MAP[char]);
    }
    var checksum5Bits = [];
    for (var _b = 0, checksum_1 = checksum; _b < checksum_1.length; _b++) {
        var char = checksum_1[_b];
        checksum5Bits.push(ALPHABET_MAP[char]);
    }
    var _c = convertBit(payload5Bits, 5, 8), version = _c[0], addressBytes = _c.slice(1);
    if (version !== VERSION_BYTE) {
        throw new Error('Can not recognize version byte');
    }
    var hexAddress = Buffer.from(addressBytes);
    var netId = decodeNetId(netName.toLowerCase());
    var type = getAddressType(hexAddress);
    if (shouldHaveType && "type." + type + ":" !== shouldHaveType.toLowerCase()) {
        throw new Error('Type of address doesn\'t match');
    }
    var bigInt = polyMod(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], prefix5Bits), [0]), payload5Bits), checksum5Bits));
    if (Number(bigInt)) {
        throw new Error("Invalid checksum for " + address);
    }
    return { hexAddress: hexAddress, netId: netId, type: type };
}
export { encode, decode };
//# sourceMappingURL=cfxaddr_index.js.map