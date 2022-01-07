/// <reference types="node" />
import type { EpochNumber } from 'js-conflux-sdk';
export declare function encodeCfxAddress(ha_in: Buffer | Uint8Array, netId: number): string;
export declare function decodeCfxAddress(address: string): {
    hexAddress: Buffer;
    netId: number;
    type: string;
};
export declare const defaultEpochTag: EpochNumber;
/** @description Precondition: addrC is a valid Conflux address */
export declare function address_cfxStandardize(addrC: string): string;
//# sourceMappingURL=CFX_util.d.ts.map