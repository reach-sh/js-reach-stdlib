/// <reference types="node" />
import type { EpochNumber } from 'js-conflux-sdk';
export declare function address_cfxStandardize(addrC: string): string;
export declare function encodeCfxAddress(hexAddress: Buffer, netId: number): string;
export declare function decodeCfxAddress(addr: string): {
    hexAddress: Buffer;
    netId: number;
    type: string;
};
export declare const defaultEpochTag: EpochNumber;
//# sourceMappingURL=CFX_util.d.ts.map