import { ethers } from 'ethers';
import { CBR_Address } from './CBR';
import { num, AnyBackendTy } from './shared_backend';
export { hexlify } from './shared_backend';
export declare const bigNumberToBigInt: (x: BigNumber) => bigint;
declare type BigNumber = ethers.BigNumber;
export declare type CurrencyAmount = string | number | BigNumber | bigint;
export type { Connector } from './ConnectorMode';
export declare const setDEBUG: (b: boolean) => void;
export declare const getDEBUG: () => boolean;
export declare const debug: (...msgs: any) => void;
export declare type IBackendViewInfo<ConnectorTy extends AnyBackendTy> = {
    ty: ConnectorTy;
    decode: (i: number, svs: Array<any>, args: Array<any>) => Promise<any>;
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
export declare type IBackendMaps<ConnectorTy extends AnyBackendTy> = {
    mapDataTy: ConnectorTy;
};
export declare type IViewLib = {
    viewMapRef: any;
};
export declare type IBackend<ConnectorTy extends AnyBackendTy> = {
    _backendVersion: number;
    _getViews: (stdlib: Object, viewlib: IViewLib) => IBackendViews<ConnectorTy>;
    _getMaps: (stdlib: Object) => IBackendMaps<ConnectorTy>;
};
export declare const getViewsHelper: <ConnectorTy extends AnyBackendTy, B>(views: IBackendViews<ConnectorTy>, getView1: (views: IBackendViewsInfo<ConnectorTy>, v: string, k: string, vi: IBackendViewInfo<ConnectorTy>) => B) => () => {
    [key: string]: {
        [key: string]: B;
    };
};
export declare type OnProgress = (obj: {
    current: BigNumber;
    target: BigNumber;
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
    didSend: boolean;
    data: Array<unknown>;
    from: RawAddress;
    time: BigNumber;
    secs: BigNumber;
    getOutput: (o_mode: string, o_lab: string, o_ctc: any) => Promise<any>;
};
export declare type IRecv<RawAddress> = IRecvNoTimeout<RawAddress> | {
    didTimeout: true;
};
export declare type TimeArg = [('time' | 'secs'), BigNumber];
export declare type ISendRecvArgs<RawAddress, Token, ConnectorTy extends AnyBackendTy> = {
    funcNum: number;
    evt_cnt: number;
    tys: Array<ConnectorTy>;
    args: Array<any>;
    pay: MkPayAmt<Token>;
    out_tys: Array<ConnectorTy>;
    onlyIf: boolean;
    soloSend: boolean;
    timeoutAt: TimeArg | undefined;
    lct: BigNumber;
    sim_p: (fake: IRecv<RawAddress>) => Promise<ISimRes<Token>>;
};
export declare type IRecvArgs<ConnectorTy extends AnyBackendTy> = {
    funcNum: number;
    evt_cnt: number;
    out_tys: Array<ConnectorTy>;
    didSend: boolean;
    waitIfNotPresent: boolean;
    timeoutAt: TimeArg | undefined;
};
export declare type IContract<ContractInfo, RawAddress, Token, ConnectorTy extends AnyBackendTy> = {
    getInfo: () => Promise<ContractInfo>;
    sendrecv: (args: ISendRecvArgs<RawAddress, Token, ConnectorTy>) => Promise<IRecv<RawAddress>>;
    recv: (args: IRecvArgs<ConnectorTy>) => Promise<IRecv<RawAddress>>;
    waitTime: (v: BigNumber) => Promise<BigNumber>;
    waitSecs: (v: BigNumber) => Promise<BigNumber>;
    iam: (some_addr: RawAddress) => RawAddress;
    selfAddress: () => CBR_Address;
    getViews: () => {
        [key: string]: {
            [key: string]: (() => Promise<any>);
        };
    };
    stdlib: Object;
};
export declare const deferContract: <ContractInfo, RawAddress, Token, ConnectorTy extends AnyBackendTy>(shouldError: boolean, implP: Promise<IContract<ContractInfo, RawAddress, Token, ConnectorTy>>, implNow: Partial<IContract<ContractInfo, RawAddress, Token, ConnectorTy>>) => IContract<ContractInfo, RawAddress, Token, ConnectorTy>;
export declare type IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token> = {
    networkAccount: NetworkAccount;
    deploy: (bin: Backend) => Contract;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => Contract;
    stdlib: Object;
    getAddress: () => string;
    setDebugLabel: (lab: string) => IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
    tokenAccept: (token: Token) => Promise<void>;
    tokenMetadata: (token: Token) => Promise<any>;
};
export declare type IAccountTransferable<NetworkAccount> = IAccount<NetworkAccount, any, any, any, any> | {
    networkAccount: NetworkAccount;
};
export declare type ISimRes<Token> = {
    txns: Array<ISimTxn<Token>>;
    mapRefs: Array<string>;
    isHalt: boolean;
};
export declare type ISimTxn<Token> = {
    kind: 'to' | 'init';
    amt: BigNumber;
    tok: Token | undefined;
} | {
    kind: 'from';
    to: string;
    amt: BigNumber;
    tok: Token | undefined;
} | {
    kind: 'halt';
    tok: Token | undefined;
} | {
    kind: 'tokenNew';
    n: any;
    s: any;
    u: any;
    m: any;
    p: BigNumber;
} | {
    kind: 'tokenBurn';
    tok: Token;
    amt: BigNumber;
} | {
    kind: 'tokenDestroy';
    tok: Token;
};
/**
 * @description Create a getter/setter, where the getter defaults to memoizing a thunk
 */
export declare function replaceableThunk<T>(thunk: () => T): [() => T, (val: T) => void];
/**
 * @description Only perform side effects from thunk on the first call.
 */
export declare function memoizeThunk<T>(thunk: () => T): () => T;
/**
 * @description ascLabels[i] = label; labelMap[label] = i;
 */
export declare const labelMaps: (co: {
    [key: string]: unknown;
}) => {
    ascLabels: Array<string>;
    labelMap: {
        [key: string]: number;
    };
};
/** @description Check that a stringy env value doesn't look falsy. */
export declare function truthyEnv(v: string | undefined | null): v is string;
export declare const envDefault: <T>(v: string | undefined | null, d: T) => string | T;
export declare const envDefaultNoEmpty: <T>(v: string | undefined | null, d: T) => string | T;
declare type DigestMode = 'keccak256' | 'sha256';
export declare const makeDigest: (mode: DigestMode, prep: any) => (t: any, v: any) => string;
export declare const hexToString: typeof ethers.utils.toUtf8String;
export declare const hexToBigNumber: (h: string) => BigNumber;
export declare const makeRandom: (width: number) => {
    randomUInt: () => BigNumber;
    hasRandom: {
        random: () => BigNumber;
    };
};
export declare const makeArith: (m: BigNumber) => {
    add: (a: num, b: num) => BigNumber;
    sub: (a: num, b: num) => BigNumber;
    mod: (a: num, b: num) => BigNumber;
    mul: (a: num, b: num) => BigNumber;
    div: (a: num, b: num) => BigNumber;
    muldiv: (a: num, b: num, c: num) => BigNumber;
};
export declare const argsSlice: <T>(args: T[], cnt: number) => T[];
export declare const argsSplit: <T>(args: T[], cnt: number) => [T[], T[]];
export declare const objectMap: <A, B>(object: {
    [key: string]: A;
}, mapFn: (k: string, a: A) => B) => {
    [key: string]: B;
};
export declare const mkAddressEq: (T_Address: {
    canonicalize: (addr: any) => any;
}) => (x: any, y: any) => boolean;
export declare const ensureConnectorAvailable: (bin: any, conn: string, jsVer: number, connVer: number) => void;
export declare const checkVersion: (actual: number, expected: number, label: string) => void;
export declare const argMax: (xs: any[], f: (_: any) => any) => any;
export declare const argMin: (xs: any[], f: (_: any) => any) => any;
export declare const make_newTestAccounts: <X>(newTestAccount: (bal: any) => Promise<X>) => (k: number, bal: any) => Promise<X[]>;
export declare const make_waitUntilX: (label: string, getCurrent: () => Promise<BigNumber>, step: (target: BigNumber) => Promise<BigNumber>) => (target: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const checkTimeout: (getTimeSecs: (now: BigNumber) => Promise<BigNumber>, timeoutAt: TimeArg | undefined, nowTimeN: number) => Promise<boolean>;
export declare class Signal {
    p: Promise<boolean>;
    r: (a: boolean) => void;
    constructor();
    wait(): Promise<boolean>;
    notify(): void;
}
//# sourceMappingURL=shared_impl.d.ts.map