import ethers from 'ethers';
import { CBR_Address } from './CBR';
export interface AnyBackendTy {
    name: string;
    canonicalize: (x: any) => any;
}
declare type BigNumber = ethers.BigNumber;
declare type num = BigNumber | number;
export declare type IBackendViewInfo<ConnectorTy extends AnyBackendTy> = {
    ty: ConnectorTy;
    decode: (i: number, svs: Array<any>) => any;
};
export declare type IBackendViewsInfo<ConnectorTy extends AnyBackendTy> = {
    [viewi: number]: Array<ConnectorTy>;
};
export declare type IBackendViews<ConnectorTy extends AnyBackendTy> = {
    views: IBackendViewsInfo<ConnectorTy>;
    infos: {
        [viewn: string]: {
            [keyn: string]: IBackendViewInfo<ConnectorTy>;
        };
    };
};
export declare type IBackend<ConnectorTy extends AnyBackendTy> = {
    _getViews: (stdlib: Object) => IBackendViews<ConnectorTy>;
};
export declare const getViewsHelper: <ConnectorTy extends AnyBackendTy, B>(views: IBackendViews<ConnectorTy>, getView1: (views: IBackendViewsInfo<ConnectorTy>, v: string, k: string, vi: IBackendViewInfo<ConnectorTy>) => B) => () => {
    [key: string]: {
        [key: string]: B;
    };
};
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
export declare type MkPayAmt<Token> = [
    BigNumber,
    Array<[BigNumber, Token]>
];
export declare type IRecvNoTimeout<RawAddress> = {
    didTimeout: false;
    data: Array<any>;
    from: RawAddress;
    time: BigNumber;
    getOutput: (o_lab: string, o_ctc: any) => Promise<any>;
};
export declare type IRecv<RawAddress> = IRecvNoTimeout<RawAddress> | {
    didTimeout: true;
};
export declare type IContract<ContractInfo, Digest, RawAddress, Token, ConnectorTy extends AnyBackendTy> = {
    getInfo: () => Promise<ContractInfo>;
    creationTime: () => Promise<BigNumber>;
    sendrecv: (funcNum: number, evt_cnt: number, hasLastTime: (BigNumber | false), tys: Array<ConnectorTy>, args: Array<any>, value: MkPayAmt<Token>, out_tys: Array<ConnectorTy>, onlyIf: boolean, soloSend: boolean, timeout_delay: BigNumber | false, sim_p: (fake: IRecv<RawAddress>) => Promise<ISimRes<Digest, RawAddress, Token, ConnectorTy>>) => Promise<IRecv<RawAddress>>;
    recv: (okNum: number, ok_cnt: number, out_tys: Array<ConnectorTy>, waitIfNotPresent: boolean, timeout_delay: BigNumber | false) => Promise<IRecv<RawAddress>>;
    wait: (delta: BigNumber) => Promise<BigNumber>;
    iam: (some_addr: RawAddress) => RawAddress;
    selfAddress: () => CBR_Address;
    getViews: () => {
        [key: string]: {
            [key: string]: (() => Promise<any>);
        };
    };
    stdlib: Object;
};
export declare const deferContract: <ContractInfo, Digest, RawAddress, Token, ConnectorTy extends AnyBackendTy>(shouldError: boolean, implP: Promise<IContract<ContractInfo, Digest, RawAddress, Token, ConnectorTy>>, implNow: Partial<IContract<ContractInfo, Digest, RawAddress, Token, ConnectorTy>>) => IContract<ContractInfo, Digest, RawAddress, Token, ConnectorTy>;
export declare type IAccount<NetworkAccount, Backend, Contract, ContractInfo> = {
    networkAccount: NetworkAccount;
    deploy: (bin: Backend) => Contract;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => Contract;
    stdlib: Object;
    getAddress: () => string;
    setDebugLabel: (lab: string) => IAccount<NetworkAccount, Backend, Contract, ContractInfo>;
};
export declare type IAccountTransferable<NetworkAccount> = IAccount<NetworkAccount, any, any, any> | {
    networkAccount: NetworkAccount;
};
export declare type ISimRes<Digest, RawAddress, Token, ConnectorTy> = {
    prevSt: Digest;
    prevSt_noPrevTime: Digest;
    txns: Array<ISimTxn<RawAddress, Token>>;
    nextSt: Digest;
    nextSt_noTime: Digest;
    view: [ConnectorTy, any];
    isHalt: boolean;
};
export declare type ISimTxn<RawAddress, Token> = {
    kind: "to" | "init";
    amt: BigNumber;
    tok: Token | undefined;
} | {
    kind: "from";
    to: RawAddress;
    amt: BigNumber;
    tok: Token | undefined;
} | {
    kind: "halt";
    tok: Token | undefined;
};
export declare type CurrencyAmount = string | number | BigNumber;
export type { Connector } from './ConnectorMode';
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare const envDefault: (v: string | undefined | null, d: any) => any;
export declare const setDEBUG: (b: boolean) => void;
export declare const getDEBUG: () => boolean;
export declare const debug: (...msgs: any) => void;
export declare const assert: (d: any, ai?: any) => void;
export declare const isBigNumber: typeof ethers.ethers.BigNumber.isBigNumber;
export declare const bigNumberify: (x: any) => BigNumber;
export declare const bigNumberToNumber: (x: any) => number;
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
export declare const argsSplit: <T>(args: T[], cnt: number) => [T[], T[]];
export declare function Array_set<T>(arr: Array<T>, idx: number, elem: T): Array<T>;
export declare const Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
export declare const mapRef: (m: any, f: any) => any;
export declare const objectMap: <A, B>(object: {
    [key: string]: A;
}, mapFn: (k: string, a: A) => B) => {
    [key: string]: B;
};
export declare const mkAddressEq: (T_Address: {
    canonicalize: (addr: any) => any;
}) => (x: any, y: any) => boolean;
export declare const parseFixedPoint: (x: {
    sign: boolean;
    i: {
        i: num;
        scale: num;
    };
}) => number;
export declare const parseInt: (x: {
    sign: boolean;
    i: num;
}) => number;
//# sourceMappingURL=shared.d.ts.map