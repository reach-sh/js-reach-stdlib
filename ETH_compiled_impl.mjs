import * as CBR from './CBR.mjs';

function addressUnwrapper(x) {
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
export const T_Address = {
  ...CBR.BT_Address,
  canonicalize: (uv) => {
    const val = addressUnwrapper(uv);
    return CBR.BT_Address.canonicalize(val || uv);
  },
  defaultValue: '0x' + Array(40).fill('0').join(''),
  munge: (bv) => bv,
  unmunge: (nv) => T_Address.canonicalize(nv),
  paramType: 'address',
};
