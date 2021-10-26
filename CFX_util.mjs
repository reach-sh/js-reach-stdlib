import { encode, decode } from './cfxaddr_index.mjs';
import { debug } from './shared_impl.mjs';
/** @description Precondition: addrC is a valid Conflux address */
export function address_cfxStandardize(addrC) {
  debug("address_cfxStandardize", { addrC: addrC });
  var pieces = addrC.split(':');
  //debug(`address_cfxStandardize`, pieces.length, {pieces});
  if (pieces.length === 3) {
    addrC = pieces[0] + ":" + pieces[2];
  } else if (pieces.length !== 2) {
    throw Error("impossible: bad CFX addr: '" + addrC + "'");
  }
  //debug(`address_cfxStandardize`, {addrC});
  return addrC.toUpperCase();
}
// mimicking cfxsdk.address.encodeCfxAddress
export function encodeCfxAddress(hexAddress, netId) {
  return encode(hexAddress, netId);
}
// mimicking cfxsdk.address.decodeCfxAddress
export function decodeCfxAddress(addr) {
  return decode(addr);
}
// TODO: 'latest_state' seems to work well; is there a better choice?
export var defaultEpochTag = 'latest_state';
//# sourceMappingURL=CFX_util.js.map
