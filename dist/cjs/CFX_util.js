"use strict";
exports.__esModule = true;
exports.defaultEpochTag = exports.decodeCfxAddress = exports.encodeCfxAddress = exports.address_cfxStandardize = void 0;
var cfxaddr_index_1 = require("./cfxaddr_index");
// XXX check if networkId is "correct"?
function address_cfxStandardize(addrC) {
    var pieces = addrC.split(':');
    // XXX Missing type chunk means assume it's a user (?)
    // XXX would it be better for our purposes to strip the type out instead?
    if (pieces.length === 2) {
        return (pieces[0] + ":TYPE.USER:" + pieces[1]).toUpperCase();
    }
    // XXX throw error if pieces.length isn't 2 or 3?
    if (pieces.length !== 3)
        throw Error("impossible: bad CFX addr: '" + addrC + "'");
    return addrC.toUpperCase();
}
exports.address_cfxStandardize = address_cfxStandardize;
// mimicking cfxsdk.address.encodeCfxAddress
function encodeCfxAddress(hexAddress, netId) {
    return cfxaddr_index_1.encode(hexAddress, netId);
}
exports.encodeCfxAddress = encodeCfxAddress;
// mimicking cfxsdk.address.decodeCfxAddress
function decodeCfxAddress(addr) {
    return cfxaddr_index_1.decode(addr);
}
exports.decodeCfxAddress = decodeCfxAddress;
// TODO: 'latest_state' seems to work well; is there a better choice?
exports.defaultEpochTag = 'latest_state';
//# sourceMappingURL=CFX_util.js.map