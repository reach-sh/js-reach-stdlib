// ****************************************************************************
// standard library needed at runtime by compiled Reach programs
// ****************************************************************************
import ethers from 'ethers';
import * as shared from './shared.mjs';
import * as CBR from './CBR.mjs';
import { labelMaps } from './shared_impl.mjs';
const BigNumber = ethers.BigNumber;
export const UInt_max = BigNumber.from(2).pow(256).sub(1);
export const digest = shared.makeDigest((t, v) => {
  // Note: abiCoder.encode doesn't correctly handle an empty tuple type
  if (t.paramType === 'tuple()') {
    if (Array.isArray(v) && v.length === 0) {
      return v;
    } else {
      throw Error(`impossible: digest tuple() with non-empty array: ${JSON.stringify(v)}`);
    }
  }
  return ethers.utils.defaultAbiCoder.encode([t.paramType], [t.munge(v)]);
});
const V_Null = null;
const T_Null = {
  ...CBR.BT_Null,
  defaultValue: V_Null,
  // null is represented in solidity as false
  munge: (bv) => (void(bv), false),
  unmunge: (nv) => (void(nv), V_Null),
  paramType: 'bool',
};
const T_Bool = {
  ...CBR.BT_Bool,
  defaultValue: false,
  munge: (bv) => bv,
  unmunge: (nv) => V_Bool(nv),
  paramType: 'bool',
};
const V_Bool = (b) => {
  return T_Bool.canonicalize(b);
};
export const T_UInt = {
  ...CBR.BT_UInt,
  defaultValue: ethers.BigNumber.from(0),
  munge: (bv) => bv,
  unmunge: (nv) => V_UInt(nv),
  paramType: 'uint256',
};
const V_UInt = (n) => {
  return T_UInt.canonicalize(n);
};
const T_Bytes = (len) => {
  const me = {
    ...CBR.BT_Bytes(len),
    defaultValue: ''.padEnd(len, '\0'),
    munge: (bv) => Array.from(ethers.utils.toUtf8Bytes(bv)),
    unmunge: (nv) => me.canonicalize(shared.hexToString(ethers.utils.hexlify(nv))),
    paramType: `uint8[${len}]`,
  };
  return me;
};
const T_Digest = {
  ...CBR.BT_Digest,
  defaultValue: ethers.utils.keccak256([]),
  munge: (bv) => BigNumber.from(bv),
  // XXX likely not the correct unmunge type?
  unmunge: (nv) => V_Digest(nv.toHexString()),
  paramType: 'uint256',
};
const V_Digest = (s) => {
  return T_Digest.canonicalize(s);
};

function addressUnwrapper(x) {
  // TODO: set it up so that .address is always there
  // Just putting it here to appease BT_Address.canonicalize
  if (typeof x === 'string') {
    // XXX is this actually needed?
    if (x.slice(0, 2) !== '0x') {
      return '0x' + x;
    } else {
      return x;
    }
  } else if (x.networkAccount && x.networkAccount.address) {
    return (x.networkAccount.address);
  } else if (x.address) {
    return x.address;
  } else {
    throw Error(`Failed to unwrap address ${x}`);
  }
}
const T_Address = {
  ...CBR.BT_Address,
  canonicalize: (uv) => {
    const val = addressUnwrapper(uv);
    return CBR.BT_Address.canonicalize(val || uv);
  },
  defaultValue: '0x' + Array(40).fill('0').join(''),
  munge: (bv) => bv,
  unmunge: (nv) => V_Address(nv),
  paramType: 'address',
};
const V_Address = (s) => {
  // Uses ETH-specific canonicalize!
  return T_Address.canonicalize(s);
};
const T_Array = (ctc, size) => ({
  ...CBR.BT_Array(ctc, size),
  defaultValue: Array(size).fill(ctc.defaultValue),
  munge: (bv) => {
    if (size == 0) {
      return false;
    } else {
      return bv.map((arg) => ctc.munge(arg));
    }
  },
  unmunge: (nv) => {
    if (size == 0) {
      return [];
    } else {
      return V_Array(ctc, size)(nv.map((arg) => ctc.unmunge(arg)));
    }
  },
  paramType: `${ctc.paramType}[${size}]`,
});
const V_Array = (ctc, size) => (val) => {
  return T_Array(ctc, size).canonicalize(val);
};
// XXX fix me Dan, I'm type checking wrong!
const T_Tuple = (ctcs) => ({
  ...CBR.BT_Tuple(ctcs),
  defaultValue: ctcs.map(ctc => ctc.defaultValue),
  munge: (bv) => {
    if (ctcs.length == 0) {
      return false;
    } else {
      return bv.map((arg, i) => ctcs[i].munge(arg));
    }
  },
  unmunge: (args) => {
    return V_Tuple(ctcs)(ctcs.map((ctc, i) => ctc.unmunge(args[i])));
  },
  paramType: `tuple(${ctcs.map((ctc) => ctc.paramType).join(',')})`,
});
const V_Tuple = (ctcs) => (val) => {
  return T_Tuple(ctcs).canonicalize(val);
};
const T_Struct = (ctcs) => ({
  ...CBR.BT_Struct(ctcs),
  defaultValue: (() => {
    const obj = {};
    ctcs.forEach(([prop, co]) => {
      obj[prop] = co.defaultValue;
    });
    return obj;
  })(),
  munge: (bv) => {
    if (ctcs.length == 0) {
      return false;
    } else {
      return ctcs.map(([k, ctc]) => ctc.munge(bv[k]));
    }
  },
  unmunge: (args) => {
    return V_Struct(ctcs)(ctcs.map(([k, ctc], i) => { void(k); return ctc.unmunge(args[i]); }));
  },
  paramType: `tuple(${ctcs.map(([k, ctc]) => { void (k); return ctc.paramType; }).join(',')})`,
});
const V_Struct = (ctcs) => (val) => {
  return T_Struct(ctcs).canonicalize(val);
};
const T_Object = (co) => ({
  ...CBR.BT_Object(co),
  defaultValue: (() => {
    const obj = {};
    for (const prop in co) {
      obj[prop] = co[prop].defaultValue;
    }
    return obj;
  })(),
  munge: (bv) => {
    const obj = {};
    let none = true;
    for (const prop in co) {
      none = false;
      obj[prop] = co[prop].munge(bv[prop]);
    }
    if (none) {
      return false;
    } else {
      return obj;
    }
  },
  unmunge: (bv) => {
    const obj = {};
    for (const prop in co) {
      obj[prop] = co[prop].unmunge(bv[prop]);
    }
    return V_Object(co)(obj);
  },
  paramType: (() => {
    const { ascLabels } = labelMaps(co);
    const tupFields = ascLabels.map((label) => `${co[label].paramType} ${label}`).join(',');
    return `tuple(${tupFields})`;
  })(),
});
const V_Object = (co) => (val) => {
  return T_Object(co).canonicalize(val);
};
const T_Data = (co) => {
  // TODO: not duplicate between this and CBR.ts
  const { ascLabels, labelMap } = labelMaps(co);
  return {
    ...CBR.BT_Data(co),
    defaultValue: (() => {
      const label = ascLabels[0];
      return [label, co[label].defaultValue];
      // return {ty, val: [label, co[label].defaultValue]};
    })(),
    // Data representation in js is a 2-tuple:
    // [label, val]
    // where label : string
    // and val : co[label]
    //
    // Data representation in solidity is an N+1-tuple: (actually a struct)
    // [labelInt, v0, ..., vN]
    // where labelInt : number, 0 <= labelInt < N
    // vN : co[ascLabels[i]]
    //
    munge: ([label, v]) => {
      const i = labelMap[label];
      const vals = ascLabels.map((label) => {
        const vco = co[label];
        return vco.munge(vco.defaultValue);
      });
      vals[i] = co[label].munge(v);
      const ret = [i];
      return ret.concat(vals);
    },
    // Note: when it comes back from solidity, vs behaves like an N+1-tuple,
    // but also has secret extra keys you can access,
    // based on the struct field names.
    // e.g. Maybe has keys vs["which"], vs["_None"], and vs["_Some"],
    // corresponding to    vs[0],       vs[1],       and vs[2] respectively.
    // We don't currently use these, but we could.
    unmunge: (vs) => {
      const i = vs[0];
      const label = ascLabels[i];
      const val = vs[i + 1];
      return V_Data(co)([label, co[label].unmunge(val)]);
    },
    paramType: (() => {
      const { ascLabels } = labelMaps(co);
      // See comment on unmunge about field names that we could use but currently don't
      const optionTys = ascLabels.map((label) => `${co[label].paramType} _${label}`);
      const tupFields = [`${T_UInt.paramType} which`].concat(optionTys).join(',');
      return `tuple(${tupFields})`;
    })(),
  };
};
const V_Data = (co) => (val) => {
  return T_Data(co).canonicalize(val);
};
export const addressEq = shared.mkAddressEq(T_Address);
const T_Token = T_Address;
export const tokenEq = addressEq;
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
