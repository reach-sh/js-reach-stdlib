import { ethers } from 'ethers';
declare type BigNumber = ethers.BigNumber;
export declare type num = BigNumber | number;
export declare type MaybeRep<A> = ['Some', A] | ['None', null];
export interface AnyBackendTy {
    name: string;
    canonicalize: (x: any) => any;
}
export declare const assert: (d: any, ai?: any) => void;
export declare const checkedBigNumberify: (at: string, m: BigNumber, x: any) => BigNumber;
export declare function protect(ctc: AnyBackendTy, v: unknown, ai?: unknown): any;
export declare const hexlify: typeof ethers.utils.hexlify;
export declare const isHex: typeof ethers.utils.isHexString;
export declare const stringToHex: (x: string) => string;
export declare const bytesEq: (x: any, y: any) => boolean;
export declare const bytesConcat: (x: string, y: string) => string;
export declare const digestEq: (x: any, y: any) => boolean;
export declare const eq: (a: num, b: num) => boolean;
export declare const ge: (a: num, b: num) => boolean;
export declare const gt: (a: num, b: num) => boolean;
export declare const le: (a: num, b: num) => boolean;
export declare const lt: (a: num, b: num) => boolean;
export declare function Array_set<T>(arr: Array<T>, idx: number, elem: T): Array<T>;
export declare const mapRef: <A>(m: {
    [key: string]: A;
}, f: string) => MaybeRep<A>;
export declare const Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
export declare const simMapDupe: (sim_r: any, mapi: number, mapo: any) => void;
export declare const simMapRef: (sim_r: any, mapi: number, f: any) => any;
export declare const simMapSet: (sim_r: any, mapi: number, f: any, nv: any) => void;
export {};
//# sourceMappingURL=shared_backend.d.ts.map