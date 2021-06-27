// lightly adapted from @conflux-dev/conflux-address-js@1.0.0
// @ts-nocheck
import JSBI from 'jsbi';
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
  var mask = (1 << outBits) - 1;
  var array = [];
  var bits = 0;
  var value = 0;
  for (var _i = 0, buffer_1 = buffer; _i < buffer_1.length; _i++) {
    var byte = buffer_1[_i];
    bits += inBits;
    value = (value << inBits) | byte;
    while (bits >= outBits) {
      bits -= outBits;
      array.push((value >>> bits) & mask);
    }
  }
  value = (value << (outBits - bits)) & mask;
  if (bits && pad) {
    array.push(value);
  } else if (value && !pad) {
    throw new Error('Excess padding');
  } else if (bits >= inBits && !pad) {
    throw new Error('Non-zero padding');
  }
  return array;
}

function polyMod(buffer) {
  var checksumBigInt = BIGINT_1;
  for (var _i = 0, buffer_2 = buffer; _i < buffer_2.length; _i++) {
    var byte = buffer_2[_i];
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
  return JSBI.bitwiseXor(checksumBigInt, BIGINT_1);
}
export { convertBit, polyMod, ALPHABET, ALPHABET_MAP };
//# sourceMappingURL=cfxaddr_base32.js.map
