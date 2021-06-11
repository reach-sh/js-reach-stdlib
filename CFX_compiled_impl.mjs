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
import * as eci from './ETH_compiled_impl.mjs';
import cfxsdk from 'js-conflux-sdk';
import buffer from 'buffer';
import { address_cfxStandardize } from './CFX_util.mjs';
var Buffer = buffer.Buffer;
// XXX find a better way to support multiple netIds
var netId = 999;

function address_ethToCfx(addrE) {
  addrE = addrE.toLowerCase();
  var addrB = Buffer.from(addrE.slice(2), 'hex');
  // XXX why doesn't ts know about this fn?
  var addrC = cfxsdk.address.encodeCfxAddress(addrB, netId);
  return addrC;
}
// Note: does not add the mixed-case checksum info to the ETH-like address
function address_cfxToEth(addrC) {
  // XXX why doesn't ts know about this fn?
  var addrObj = cfxsdk.address.decodeCfxAddress(addrC);
  var addrE = '0x' + addrObj.hexAddress.toString('hex');
  if (netId !== addrObj.netId)
    throw Error("Expected netId=" + netId + ", got netId=" + addrObj.netId);
  return addrE;
}
export var T_Address = __assign(__assign({}, eci.T_Address), {
  canonicalize: function(uv) {
    if (typeof uv === 'string') {
      if (uv.slice(0, 2) === '0x') {
        var addrC = address_ethToCfx(uv);
        return address_cfxStandardize(addrC);
      }
      return address_cfxStandardize(uv);
    }
    if (!uv)
      throw Error("Expected address, got " + JSON.stringify(uv));
    // XXX what's a better way to show ts what's going on?
    var uobj = uv;
    if (uobj.networkAccount) {
      return T_Address.canonicalize(uobj.networkAccount);
    }
    if (uobj.address) {
      return T_Address.canonicalize(uobj.address);
    }
    throw Error("TODO: canonicalize non-string addr");
  },
  defaultValue: 'XXX',
  // Note: address_cfxToEth is not strictly necessary for munge.
  // ((x) => x) also seems to work.
  // But perhaps CBR for CFX should be the hex string, more like ETH?
  // Will the CFX apis someday reject addresses in hex format? Probably not?
  munge: function(bv) { return address_cfxToEth(bv); },
  unmunge: function(nv) { return T_Address.canonicalize(nv); }
});
//# sourceMappingURL=CFX_compiled_impl.js.map
