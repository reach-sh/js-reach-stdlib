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
import * as eci from './ETH_compiled_impl';
import buffer from 'buffer';
import { address_cfxStandardize, decodeCfxAddress, encodeCfxAddress } from './CFX_util';
import { debug } from './shared_impl';
var Buffer = buffer.Buffer;
// XXX find a better way to support multiple netIds
var netId = 999;
function address_ethToCfx(addrE) {
    debug("address_ethToCfx", "call", addrE);
    addrE = addrE.toLowerCase();
    var addrB = Buffer.from(addrE.slice(2), 'hex');
    var addrC = encodeCfxAddress(addrB, netId);
    return addrC;
}
// Note: does not add the mixed-case checksum info to the ETH-like address
function address_cfxToEth(addrC) {
    // XXX why doesn't ts know about this fn?
    debug("address_cfxToEth", "call", addrC);
    var addrObj = decodeCfxAddress(addrC);
    var addrE = '0x' + addrObj.hexAddress.toString('hex');
    if (netId !== addrObj.netId)
        throw Error("Expected netId=" + netId + ", got netId=" + addrObj.netId);
    return addrE;
}
export var T_Address = __assign(__assign({}, eci.T_Address), { canonicalize: function (uv) {
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
    // XXX this should not be computed at compile time, because it can change based on the netId
    // Note: 0x1 = user, 0x8 = contract
    // https://github.com/resodo/conflux-address-js/blob/0cbbe3d17fbd6cbc2c2fbafc3470ff6087f38087/lib/index.js#L86
    // defaultValue: address_cfxStandardize(address_ethToCfx(eci.T_Address.defaultValue.replace('0x0', '0x1'))),
    // XXX I (Dan) would like to address_cfxStandardize here, but I can't figure out how to disentangle defaultValue
    // so that this addr defaultValue can be different than its ETH-equivalent defaultValue.
    // (0x0 is not considered a valid addr prefix for the new cfx addr style)
    defaultValue: address_ethToCfx(eci.T_Address.defaultValue), 
    // Note: address_cfxToEth is not strictly necessary for munge.
    // ((x) => x) also seems to work.
    // But perhaps CBR for CFX should be the hex string, more like ETH?
    // Will the CFX apis someday reject addresses in hex format? Probably not?
    munge: function (bv) { return address_cfxToEth(bv); }, unmunge: function (nv) { return T_Address.canonicalize(nv); } });
//# sourceMappingURL=CFX_compiled_impl.js.map