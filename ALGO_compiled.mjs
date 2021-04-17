// ****************************************************************************
// standard library needed at runtime by compiled Reach programs
// ****************************************************************************
import * as shared from './shared.mjs';
import algosdk from 'algosdk';
import buffer from 'buffer';
import ethers from 'ethers';
import * as CBR from './CBR.mjs';
import { labelMaps } from './shared_impl.mjs';
const BigNumber = ethers.BigNumber;
const Buffer = buffer.Buffer;
export const UInt_max = BigNumber.from(2).pow(64).sub(1);
export const digest = shared.makeDigest((t, v) => t.toNet(v));
export const T_Null = {
  ...CBR.BT_Null,
  netSize: 0,
  toNet: (bv) => (void(bv), new Uint8Array([])),
  fromNet: (nv) => (void(nv), null),
};
export const T_Bool = {
  ...CBR.BT_Bool,
  netSize: 1,
  toNet: (bv) => new Uint8Array([bv ? 1 : 0]),
  fromNet: (nv) => nv[0] == 1,
};
export const T_UInt = {
  ...CBR.BT_UInt,
  netSize: 8,
  toNet: (bv) => (ethers.utils.zeroPad(ethers.utils.arrayify(bv), 8)),
  fromNet: (nv) => {
    // debug(`fromNet: UInt`);
    // if (getDEBUG()) console.log(nv);
    return ethers.BigNumber.from(nv);
  },
};
/** @description For arbitrary utf8 strings */
const stringyNet = {
  toNet: (bv) => (ethers.utils.toUtf8Bytes(bv)),
  fromNet: (nv) => (ethers.utils.toUtf8String(nv)),
};
/** @description For hex strings representing bytes */
const bytestringyNet = {
  toNet: (bv) => (ethers.utils.arrayify(bv)),
  fromNet: (nv) => (ethers.utils.hexlify(nv)),
};
export const T_Bytes = (len) => ({
  ...CBR.BT_Bytes(len),
  ...stringyNet,
  netSize: len,
});
export const T_Digest = {
  ...CBR.BT_Digest,
  ...bytestringyNet,
  netSize: 32,
};
export const addressToHex = (x) => '0x' + Buffer.from(algosdk.decodeAddress(x).publicKey).toString('hex');

function addressUnwrapper(x) {
  const addr = x && x.networkAccount && x.networkAccount.addr ||
    x && x.addr;
  return (addr != undefined) ?
    addressToHex(addr) :
    x;
}
export const T_Address = {
  ...CBR.BT_Address,
  ...bytestringyNet,
  netSize: 32,
  canonicalize: (uv) => {
    const val = addressUnwrapper(uv);
    return CBR.BT_Address.canonicalize(val || uv);
  },
};
export const T_Array = (co, size) => ({
  ...CBR.BT_Array(co, size),
  netSize: size * co.netSize,
  toNet: (bv) => {
    return ethers.utils.concat(bv.map((v) => co.toNet(v)));
  },
  fromNet: (nv) => {
    // TODO: assert nv.size = len * size
    const len = co.netSize;
    const chunks = new Array(size).fill(null);
    for (let i = 0; i < size; i++) {
      const start = i * len;
      chunks[i] = co.fromNet(nv.slice(start, start + len));
    }
    return chunks;
  },
});
export const T_Tuple = (cos) => ({
  ...CBR.BT_Tuple(cos),
  netSize: (cos.reduce((acc, co) => acc + co.netSize, 0)),
  toNet: (bv) => {
    const val = cos.map((co, i) => co.toNet(bv[i]));
    return ethers.utils.concat(val);
  },
  // TODO: share more code w/ T_Array.fromNet
  fromNet: (nv) => {
    const chunks = new Array(cos.length).fill(null);
    let rest = nv;
    for (const i in cos) {
      const co = cos[i];
      chunks[i] = co.fromNet(rest.slice(0, co.netSize));
      rest = rest.slice(co.netSize);
    }
    return chunks;
  },
});
export const T_Struct = (cos) => ({
  ...CBR.BT_Struct(cos),
  netSize: (cos.reduce((acc, co) => acc + co[1].netSize, 0)),
  toNet: (bv) => {
    const val = cos.map(([k, co]) => co.toNet(bv[k]));
    return ethers.utils.concat(val);
  },
  // TODO: share more code w/ T_Array.fromNet
  fromNet: (nv) => {
    const obj = {};
    let rest = nv;
    for (const i in cos) {
      const [k, co] = cos[i];
      obj[k] = co.fromNet(rest.slice(0, co.netSize));
      rest = rest.slice(co.netSize);
    }
    return obj;
  },
});
export const T_Object = (coMap) => {
  const cos = Object.values(coMap);
  const netSize = cos.reduce((acc, co) => acc + co.netSize, 0);
  const { ascLabels } = labelMaps(coMap);
  return {
    ...CBR.BT_Object(coMap),
    netSize,
    toNet: (bv) => {
      const chunks = ascLabels.map((label) => coMap[label].toNet(bv[label]));
      return ethers.utils.concat(chunks);
    },
    // TODO: share more code w/ T_Array.fromNet and T_Tuple.fromNet
    fromNet: (nv) => {
      const obj = {};
      let rest = nv;
      for (const iStr in ascLabels) {
        const i = parseInt(iStr);
        const label = ascLabels[i];
        const co = coMap[label];
        obj[label] = co.fromNet(rest.slice(0, co.netSize));
        rest = rest.slice(co.netSize);
      }
      return obj;
    },
  };
};
// 1 byte for the label
// the rest right-padded with zeroes
// up to the size of the largest variant
export const T_Data = (coMap) => {
  const cos = Object.values(coMap);
  const valSize = Math.max(...cos.map((co) => co.netSize));
  const netSize = valSize + 1;
  const { ascLabels, labelMap } = labelMaps(coMap);
  return {
    ...CBR.BT_Data(coMap),
    netSize,
    toNet: ([label, val]) => {
      const i = labelMap[label];
      const lab_nv = new Uint8Array([i]);
      const val_co = coMap[label];
      const val_nv = val_co.toNet(val);
      const padding = new Uint8Array(valSize - val_nv.length);
      return ethers.utils.concat([lab_nv, val_nv, padding]);
    },
    fromNet: (nv) => {
      const i = nv[0];
      const label = ascLabels[i];
      const val_co = coMap[label];
      const rest = nv.slice(1);
      const sliceTo = val_co.netSize;
      const val = val_co.fromNet(rest.slice(0, sliceTo));
      return [label, val];
    },
  };
};
export const addressEq = shared.mkAddressEq(T_Address);
const T_Token = T_UInt;
export const tokenEq = (x, y) => x.eq(y);
export const typeDefs = {
  T_Null,
  T_Bool,
  T_UInt,
  T_Bytes,
  T_Address,
  T_Digest,
  T_Token,
  T_Object,
  T_Data,
  T_Array,
  T_Tuple,
  T_Struct,
};
export const stdlib = {
  ...shared,
  ...typeDefs,
  addressEq,
  tokenEq,
  digest,
  UInt_max,
};
