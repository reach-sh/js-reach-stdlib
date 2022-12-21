import { ethers } from 'ethers';
import { bigNumberToNumber } from './CBR';
import { apiStateMismatchError, MapRefT, GetKeyT, IContractCompiledMaps } from './shared_impl';
export { bigNumberToNumber, apiStateMismatchError, };
type BigNumber = ethers.BigNumber;
export type num = BigNumber | number;
export type MaybeRep<A> = ['Some', A] | ['None', null];
export declare const asMaybe: <A>(v: A | undefined) => MaybeRep<A>;
export declare const fromSome: <A>(mo: MaybeRep<A>, da: A) => A;
export interface AnyBackendTy {
    name: string;
    canonicalize: (x: any) => any;
}
type AssertInfo = unknown | undefined | string | {
    who?: string;
    msg?: string | null;
    at?: string;
    fs?: [string];
};
export declare const formatAssertInfo: (ai: AssertInfo) => string;
export declare const assert: (d: any, ai?: any) => void;
export declare const checkedBigNumberify: (at: string, m: BigNumber, x: any) => BigNumber;
export declare function protect(ctc: AnyBackendTy, v: unknown, ai?: unknown): any;
export declare function bytesFromHex(v: any): Uint8Array;
export declare const hexlify: typeof ethers.utils.hexlify;
export declare const isHex: typeof ethers.utils.isHexString;
export declare const stringToHex: (x: string) => string;
export declare const bytesEq: (x: any, y: any) => boolean;
export declare const bytesConcat: (x: string, y: string) => string;
export declare const eq: (a: num, b: num) => boolean;
export declare const ge: (a: num, b: num) => boolean;
export declare const gt: (a: num, b: num) => boolean;
export declare const le: (a: num, b: num) => boolean;
export declare const lt: (a: num, b: num) => boolean;
export declare const eq256: (a: num, b: num) => boolean;
export declare const ge256: (a: num, b: num) => boolean;
export declare const gt256: (a: num, b: num) => boolean;
export declare const le256: (a: num, b: num) => boolean;
export declare const lt256: (a: num, b: num) => boolean;
export declare const stringDynConcat: (s1: string, s2: string) => string;
export declare const uintToStringDyn: (n1: num) => string;
export declare const uintToStringDyn256: (n1: num) => string;
export declare const digest_xor: (xd: string, yd: string) => string;
export declare const bytes_xor: (x: string, y: string) => string;
export declare const btoiLast8: (b: string) => BigNumber;
export declare function Array_set<T>(arr: Array<T>, idx: number, elem: T): Array<T>;
export interface MapOpts<ConnectorTy extends AnyBackendTy> {
    ctc: IContractCompiledMaps<ConnectorTy>;
    isAPI: boolean;
    idx: number;
}
export interface LinearMap<K, A, ConnectorTy extends AnyBackendTy> {
    getKey: GetKeyT<K, ConnectorTy>;
    ref: MapRefT<K, A, ConnectorTy>;
    set: (kt: ConnectorTy, k: K, vt: ConnectorTy, v: A | undefined) => Promise<void>;
}
export declare const copyMap: <K, A, ConnectorTy extends AnyBackendTy>(orig: LinearMap<K, A, ConnectorTy>) => LinearMap<K, A, ConnectorTy>;
export declare const newMap: <K, A, ConnectorTy extends AnyBackendTy>(opts: MapOpts<ConnectorTy>) => LinearMap<K, A, ConnectorTy>;
export declare const mapSet: <K, A, Ty extends AnyBackendTy>(m: LinearMap<K, A, Ty>, kt: Ty, k: K, vt: Ty, v: A | undefined) => Promise<void>;
export declare const mapRef: <K, A, Ty extends AnyBackendTy>(m: LinearMap<K, A, Ty>, kt: Ty, k: K, vt: Ty) => Promise<MaybeRep<A>>;
export declare const Array_asyncMap: <B>(as: any[][], f: (x: any[], i: number) => Promise<B>) => Promise<B[]>;
export declare const Array_asyncReduce: <B>(as: any[][], b: B, f: (xs: any[], y: B, i: number) => Promise<B>) => Promise<B>;
//# sourceMappingURL=shared_backend.d.ts.map