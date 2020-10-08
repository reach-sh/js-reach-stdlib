import ethers from 'ethers';
declare type BigNumber = ethers.BigNumber;
declare type num = BigNumber | number;
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare type IRecvNoTimeout<RawAddress> = {
    didTimeout: false;
    data: Array<any>;
    value: BigNumber;
    from: RawAddress;
};
export declare type IRecv<RawAddress> = IRecvNoTimeout<RawAddress> | {
    didTimeout: true;
};
export declare type IContract<ContractInfo, Digest, RawAddress> = {
    getInfo: () => Promise<ContractInfo>;
    sendrecv: (label: string, funcNum: number, evt_cnt: number, tys: Array<TyContract<any>>, args: Array<any>, value: BigNumber, out_tys: Array<TyContract<any>>, timeout_delay: BigNumber | false, sim_p: (fake: IRecv<RawAddress>) => ISimRes<Digest, RawAddress>) => Promise<IRecv<RawAddress>>;
    recv: (label: string, okNum: number, ok_cnt: number, out_tys: Array<TyContract<any>>, timeout_delay: BigNumber | false) => Promise<IRecv<RawAddress>>;
    wait: (delta: BigNumber) => Promise<BigNumber>;
    iam: (some_addr: RawAddress) => RawAddress;
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
export declare type TyContract<T> = {
    name: string;
    canonicalize: (v: any) => T;
    munge: (v: T) => any;
    unmunge: (v: any) => T;
    defaultValue: T;
};
export declare const T_Null: TyContract<null>;
export declare const T_Bool: TyContract<boolean>;
export declare const T_UInt256: TyContract<BigNumber>;
export declare const T_Bytes: TyContract<string>;
export declare const T_Digest: TyContract<BigNumber>;
export declare const T_Address: TyContract<string>;
export declare const T_Array: <T>(ctc: TyContract<T>, sz: number) => TyContract<T[]>;
export declare const T_Tuple: <T>(ctcs: TyContract<T>[]) => TyContract<T[]>;
export declare const T_Object: <T>(co: {
    [key: string]: TyContract<T>;
}) => TyContract<{
    [key: string]: T;
}>;
export declare const T_Data: <T>(co: {
    [key: string]: TyContract<T>;
}) => TyContract<[string, T]>;
export declare function protect<T>(ctc: TyContract<T>, v: any, ai?: any): T;
export declare const setDigestWidth: (sz: number) => void;
export declare const toHex: (x: any) => string;
export declare const isHex: typeof ethers.ethers.utils.isHexString;
export declare const hexToString: typeof ethers.ethers.utils.toUtf8String;
export declare const digest: (...args: Array<any>) => string;
export declare const hexToBigNumber: (h: string) => BigNumber;
export declare const uint256ToBytes: (i: BigNumber) => string;
export declare const bigNumberToHex: (u: num, size?: number) => string;
export declare const bytesEq: (x: any, y: any) => boolean;
export declare const digestEq: (x: any, y: any) => boolean;
export declare const addressEq: (x: any, y: any) => boolean;
export declare const randomUInt256: () => BigNumber;
export declare const hasRandom: {
    random: () => BigNumber;
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
export declare function Array_set<T>(arr: Array<T>, idx: number, elem: T): Array<T>;
export declare const Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
export declare type CurrencyAmount = string | number | BigNumber;
export type { Connector } from './ConnectorMode';
//# sourceMappingURL=shared.d.ts.map