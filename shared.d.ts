import ethers from 'ethers';
import { CBR_Address } from './CBR';
export interface AnyBackendTy {
    name: string;
    canonicalize: (x: any) => any;
}
declare type BigNumber = ethers.BigNumber;
declare type num = BigNumber | number;
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare type OnProgress = (obj: {
    currentTime: BigNumber;
    targetTime: BigNumber;
}) => any;
export declare type WPArgs = {
    host: string | undefined;
    port: number;
    output: 'silent';
    timeout: number;
};
export declare type IRecvNoTimeout<RawAddress> = {
    didTimeout: false;
    data: Array<any>;
    value: BigNumber;
    from: RawAddress;
};
export declare type IRecv<RawAddress> = IRecvNoTimeout<RawAddress> | {
    didTimeout: true;
};
export declare type IContract<ContractInfo, Digest, RawAddress, ConnectorTy extends AnyBackendTy> = {
    getInfo: () => Promise<ContractInfo>;
    sendrecv: (label: string, funcNum: number, evt_cnt: number, tys: Array<ConnectorTy>, args: Array<any>, value: BigNumber, out_tys: Array<ConnectorTy>, timeout_delay: BigNumber | false, sim_p: (fake: IRecv<RawAddress>) => ISimRes<Digest, RawAddress>) => Promise<IRecv<RawAddress>>;
    recv: (label: string, okNum: number, ok_cnt: number, out_tys: Array<ConnectorTy>, timeout_delay: BigNumber | false) => Promise<IRecv<RawAddress>>;
    wait: (delta: BigNumber) => Promise<BigNumber>;
    iam: (some_addr: RawAddress) => RawAddress;
    selfAddress: () => CBR_Address;
};
export declare type IAccount<NetworkAccount, Backend, Contract, ContractInfo> = {
    networkAccount: NetworkAccount;
    deploy: (bin: Backend) => Contract;
    attach: (bin: Backend, ctc: ContractInfo | Promise<ContractInfo>) => Contract;
};
export declare type IAccountTransferable<NetworkAccount> = IAccount<NetworkAccount, any, any, any> | {
    networkAccount: NetworkAccount;
};
export declare type ISimRes<Digest, RawAddress> = {
    prevSt: Digest;
    txns: Array<ISimTxn<RawAddress>>;
    nextSt: Digest;
    isHalt: boolean;
};
export declare type ISimTxn<RawAddress> = {
    to: RawAddress;
    amt: BigNumber;
};
export declare const setDEBUG: (b: boolean) => void;
export declare const getDEBUG: () => boolean;
export declare const debug: (msg: any) => void;
export declare const assert: (d: any, ai?: any) => void;
export declare const isBigNumber: typeof ethers.ethers.BigNumber.isBigNumber;
export declare const bigNumberify: (x: any) => BigNumber;
export declare const checkedBigNumberify: (at: string, m: BigNumber, x: any) => BigNumber;
export declare function protect(ctc: AnyBackendTy, v: unknown, ai?: unknown): any;
export declare const isHex: typeof ethers.ethers.utils.isHexString;
export declare const hexToString: typeof ethers.ethers.utils.toUtf8String;
export declare const stringToHex: (x: string) => string;
export declare const makeDigest: (prep: any) => (t: any, v: any) => string;
export declare const hexToBigNumber: (h: string) => BigNumber;
export declare const uintToBytes: (i: BigNumber) => string;
export declare const bigNumberToHex: (u: num, size?: number) => string;
export declare const bytesEq: (x: any, y: any) => boolean;
export declare const digestEq: (x: any, y: any) => boolean;
export declare const makeRandom: (width: number) => {
    randomUInt: () => BigNumber;
    hasRandom: {
        random: () => BigNumber;
    };
};
export declare const eq: (a: num, b: num) => boolean;
export declare const add: (a: num, b: num) => BigNumber;
export declare const sub: (a: num, b: num) => BigNumber;
export declare const mod: (a: num, b: num) => BigNumber;
export declare const mul: (a: num, b: num) => BigNumber;
export declare const div: (a: num, b: num) => BigNumber;
export declare const ge: (a: num, b: num) => boolean;
export declare const gt: (a: num, b: num) => boolean;
export declare const le: (a: num, b: num) => boolean;
export declare const lt: (a: num, b: num) => boolean;
export declare const argsSlice: <T>(args: T[], cnt: number) => T[];
export declare function Array_set<T>(arr: Array<T>, idx: number, elem: T): Array<T>;
export declare const Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
export declare type CurrencyAmount = string | number | BigNumber;
export type { Connector } from './ConnectorMode';
export declare const mkAddressEq: (T_Address: {
    canonicalize: (addr: any) => any;
}) => (x: any, y: any) => boolean;
//# sourceMappingURL=shared.d.ts.map