"use strict";
exports.__esModule = true;
exports.address_cfxStandardize = void 0;
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
//# sourceMappingURL=CFX_util.js.map