/// <reference types="node" />
declare function encode(hexAddress: any, netId: any, verbose?: boolean): string;
declare function decode(address: any): {
    hexAddress: Buffer;
    netId: number;
    type: string;
};
export { encode, decode };
//# sourceMappingURL=cfxaddr_index.d.ts.map