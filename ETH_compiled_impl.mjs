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
    throw Error("Failed to unwrap address ".concat(x));
  }
}
export var T_Address = __assign(__assign({}, CBR.BT_Address), {
  canonicalize: function(uv) {
    var val = addressUnwrapper(uv);
    return CBR.BT_Address.canonicalize(val || uv);
  },
  defaultValue: '0x' + Array(40).fill('0').join(''),
  munge: function(bv) { return bv; },
  unmunge: function(nv) { return T_Address.canonicalize(nv); },
  paramType: 'address'
});
//# sourceMappingURL=ETH_compiled_impl.js.map
