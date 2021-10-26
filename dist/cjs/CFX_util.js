"use strict";
exports.__esModule = true;
exports.defaultEpochTag = exports.decodeCfxAddress = exports.encodeCfxAddress = exports.address_cfxStandardize = void 0;
var cfxaddr_index_1 = require("./cfxaddr_index");
var shared_impl_1 = require("./shared_impl");
/** @description Precondition: addrC is a valid Conflux address */
function address_cfxStandardize(addrC) {
    (0, shared_impl_1.debug)("address_cfxStandardize", { addrC: addrC });
    var pieces = addrC.split(':');
    //debug(`address_cfxStandardize`, pieces.length, {pieces});
    if (pieces.length === 3) {
        addrC = pieces[0] + ":" + pieces[2];
    }
    else if (pieces.length !== 2) {
        throw Error("impossible: bad CFX addr: '" + addrC + "'");
    }
    //debug(`address_cfxStandardize`, {addrC});
    return addrC.toUpperCase();
}
exports.address_cfxStandardize = address_cfxStandardize;
// mimicking cfxsdk.address.encodeCfxAddress
function encodeCfxAddress(hexAddress, netId) {
    return (0, cfxaddr_index_1.encode)(hexAddress, netId);
}
exports.encodeCfxAddress = encodeCfxAddress;
// mimicking cfxsdk.address.decodeCfxAddress
function decodeCfxAddress(addr) {
    return (0, cfxaddr_index_1.decode)(addr);
}
exports.decodeCfxAddress = decodeCfxAddress;
// TODO: 'latest_state' seems to work well; is there a better choice?
exports.defaultEpochTag = 'latest_state';
//# sourceMappingURL=CFX_util.js.map