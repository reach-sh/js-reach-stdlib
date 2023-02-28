import { ethers } from 'ethers';
import { CBR_Address, CBR_Bytes } from './CBR';
import { AnyBackendTy, MaybeRep, LinearMap } from './shared_backend';
export { hexlify } from './shared_backend';
import type { Arith, Stdlib_User } from './interfaces';
type BigNumber = ethers.BigNumber;
export type CurrencyAmount = string | number | BigNumber | bigint;
export type { Connector } from './ConnectorMode';
export declare const hasProp: (o: unknown, p: string) => unknown;
export declare const j2sf: (x: any) => string;
export declare const j2s: (x: any) => string;
export declare const setDEBUG: (b: boolean) => void;
export declare const hideWarnings: () => boolean;
export declare const mShowFundFromFaucetWarning: () => void;
export declare const getDEBUG: () => boolean;
export declare const debug: (...msgs: any) => void;
export type IBackendViewInfo<ConnectorTy extends AnyBackendTy> = {
    dom: [ConnectorTy];
    rng: ConnectorTy;
    decode: (i: number, svs: Array<any>, args: Array<any>) => Promise<any>;
};
export type IBackendViewsInfo<ConnectorTy extends AnyBackendTy> = {
    [viewi: number]: Array<ConnectorTy>;
};
export type TaggedBackendView<ConnectorTy extends AnyBackendTy> = {
    [keyn: string]: IBackendViewInfo<ConnectorTy>;
};
export type IBackendViews<ConnectorTy extends AnyBackendTy> = {
    views: IBackendViewsInfo<ConnectorTy>;
    infos: {
        [viewn: string]: TaggedBackendView<ConnectorTy> | IBackendViewInfo<ConnectorTy>;
    };
};
export type IBackendMaps<ConnectorTy extends AnyBackendTy> = {
    mapDataTy: ConnectorTy;
};
export type IViewLib<ConnectorTy extends AnyBackendTy> = {
    viewMapRef: <K, A>(mapi: number, kt: ConnectorTy, k: K, vt: ConnectorTy) => Promise<MaybeRep<A>>;
};
export type IBackend<ConnectorTy extends AnyBackendTy> = {
    _backendVersion: number;
    _getViews: (stdlib: Object, viewlib: IViewLib<ConnectorTy>) => IBackendViews<ConnectorTy>;
    _getMaps: (stdlib: Object) => IBackendMaps<ConnectorTy>;
    _Participants: {
        [n: string]: any;
    };
    _APIs: {
        [n: string]: any | {
            [n: string]: any;
        };
    };
    _stateSourceMap: {
        [key: number]: any;
    };
    _getEvents: (stdlib: Object) => ({
        [n: string]: ConnectorTy[];
    });
};
export type OnProgress = (obj: {
    current: BigNumber;
    target: BigNumber;
}) => any;
export type WPArgs = {
    host: string | undefined;
    port: number;
    output: 'silent';
    timeout: number;
};
export type MkPayAmt<Token> = [
    BigNumber,
    Array<[BigNumber, Token]>
];
export type IRecvNoTimeout<RawAddress> = {
    didTimeout: false;
    didSend: boolean;
    data: Array<unknown>;
    from: RawAddress;
    time: BigNumber;
    secs: BigNumber;
    getOutput: (o_mode: string, o_lab: string, o_ctc: any, o_val: any) => Promise<any>;
};
export type IRecv<RawAddress> = IRecvNoTimeout<RawAddress> | {
    didTimeout: true;
};
export type TimeArg = [('time' | 'secs'), BigNumber];
export type ISendRecvArgs<RawAddress, Token, ConnectorTy extends AnyBackendTy, ContractInfo> = {
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
    sim_p: (fake: IRecv<RawAddress>) => Promise<ISimRes<Token, ContractInfo, ConnectorTy>>;
};
export type IRecvArgs<ConnectorTy extends AnyBackendTy> = {
    funcNum: number;
    evt_cnt: number;
    out_tys: Array<ConnectorTy>;
    didSend: boolean;
    waitIfNotPresent: boolean;
    timeoutAt: TimeArg | undefined;
};
export type ParticipantVal = (io: any) => Promise<any>;
export type ParticipantMap = {
    [key: string]: ParticipantVal;
};
export type ViewVal = (...args: any) => Promise<any>;
export type ViewFunMap = {
    [key: string]: ViewVal;
};
export type ViewMap = {
    [key: string]: ViewVal | ViewFunMap;
};
export type APIMap = ViewMap;
export type EventMap = {
    [key: string]: any;
};
export type MapRefT<K, A, ConnectorTy extends AnyBackendTy> = (kt: ConnectorTy, k: K, vt: ConnectorTy) => Promise<MaybeRep<A>>;
export type GetKeyT<K, ConnectorTy extends AnyBackendTy> = (kt: ConnectorTy, k: K, vt: ConnectorTy) => Promise<[string, number]>;
export interface IContractCompiledMaps<ConnectorTy extends AnyBackendTy> {
    makeGetKey: <K>(mapi: number) => GetKeyT<K, ConnectorTy>;
    apiMapRef: <K, A>(i: number) => MapRefT<K, A, ConnectorTy>;
}
export interface IContractCompiled<ContractInfo, RawAddress, Token, ConnectorTy extends AnyBackendTy> extends IContractCompiledMaps<ConnectorTy> {
    getContractCompanion: () => Promise<MaybeRep<ContractInfo>>;
    getContractInfo: () => Promise<ContractInfo>;
    getContractAddress: () => Promise<CBR_Address>;
    getBalance: () => Promise<BigNumber>;
    waitUntilTime: (v: BigNumber) => Promise<BigNumber>;
    waitUntilSecs: (v: BigNumber) => Promise<BigNumber>;
    selfAddress: () => CBR_Address;
    iam: (some_addr: RawAddress) => RawAddress;
    stdlib: Object;
    sendrecv: (args: ISendRecvArgs<RawAddress, Token, ConnectorTy, ContractInfo>) => Promise<IRecv<RawAddress>>;
    recv: (args: IRecvArgs<ConnectorTy>) => Promise<IRecv<RawAddress>>;
    getState: (v: BigNumber, ctcs: Array<ConnectorTy>) => Promise<Array<any>>;
    getCurrentStep: () => Promise<BigNumber>;
    simTokenAccepted: (sim_r: ISimRes<Token, ContractInfo, ConnectorTy>, addr: string, tok: Token) => Promise<boolean>;
}
export type ISetupArgs<ContractInfo, VerifyResult> = {
    setInfo: (info: ContractInfo) => void;
    getInfo: () => Promise<ContractInfo>;
    setTrustedVerifyResult: (vr: VerifyResult) => void;
    getTrustedVerifyResult: () => (VerifyResult | undefined);
};
export type ISetupViewArgs<ContractInfo, VerifyResult> = Omit<ISetupArgs<ContractInfo, VerifyResult>, ("setInfo")>;
export type ISetupEventArgs<ContractInfo, VerifyResult> = Omit<ISetupArgs<ContractInfo, VerifyResult>, ("setInfo")>;
type SpecificKeys = ("getContractInfo" | "getContractAddress" | "getContractCompanion" | "getBalance" | "sendrecv" | "recv" | "getState" | "getCurrentStep" | "apiMapRef" | "makeGetKey" | "simTokenAccepted");
export type ISetupRes<ContractInfo, RawAddress, Token, ConnectorTy extends AnyBackendTy> = Pick<IContractCompiled<ContractInfo, RawAddress, Token, ConnectorTy>, (SpecificKeys)>;
export type IStdContractArgs<ContractInfo, VerifyResult, RawAddress, Token, ConnectorTy extends AnyBackendTy> = {
    bin: IBackend<ConnectorTy>;
    getABI: (x?: boolean) => unknown;
    getEventTys: () => Record<string, ConnectorTy[]>;
    setupView: ISetupView<ContractInfo, VerifyResult, ConnectorTy>;
    setupEvents: ISetupEvent<ContractInfo, VerifyResult>;
    givenInfoP: (Promise<ContractInfo> | undefined);
    _setup: (args: ISetupArgs<ContractInfo, VerifyResult>) => ISetupRes<ContractInfo, RawAddress, Token, ConnectorTy>;
    doAppOptIn: (ctc: ContractInfo) => Promise<void>;
} & Omit<IContractCompiled<ContractInfo, RawAddress, Token, ConnectorTy>, (SpecificKeys)>;
export type IContract<ContractInfo, RawAddress, Token, ConnectorTy extends AnyBackendTy> = {
    getInfo: () => Promise<ContractInfo>;
    getViews: () => ViewMap;
    getContractAddress: () => Promise<CBR_Address>;
    appOptIn: () => Promise<void>;
    getABI: (x?: boolean) => unknown;
    getEventTys: () => Record<string, ConnectorTy[]>;
    getInternalState: () => Promise<{
        [key: string]: any;
    }>;
    participants: ParticipantMap;
    p: ParticipantMap;
    views: ViewMap;
    v: ViewMap;
    unsafeViews: ViewMap;
    apis: APIMap;
    a: APIMap;
    safeApis: APIMap;
    e: EventMap;
    events: EventMap;
    _initialize: () => IContractCompiled<ContractInfo, RawAddress, Token, ConnectorTy>;
};
export type ISetupView<ContractInfo, VerifyResult, ConnectorTy extends AnyBackendTy> = (args: ISetupViewArgs<ContractInfo, VerifyResult>) => {
    viewLib: IViewLib<ConnectorTy>;
    getView1: ((views: IBackendViewsInfo<ConnectorTy>, v: string, k: string | undefined, vi: IBackendViewInfo<ConnectorTy>, isSafe: boolean) => ViewVal);
};
export type ISetupEvent<ContractInfo, VerifyResult> = (args: ISetupEventArgs<ContractInfo, VerifyResult>) => {
    createEventStream: (event: string, tys: any[]) => {
        lastTime: () => Promise<Time>;
        next: () => Promise<any>;
        nextUpToTime: () => Promise<any>;
        seek: (t: Time) => void;
        seekNow: () => Promise<void>;
        monitor: (onEvent: (x: any) => void) => Promise<void>;
    };
};
export type Time = BigNumber;
export type Event<T> = {
    when: Time;
    what: T;
};
export type EventStream<T> = {
    seek: (t: Time) => void;
    next: () => Promise<Event<T>>;
    seekNow: () => void;
    lastTime: () => Time;
    monitor: (f: any) => void;
};
export declare const stdlibShared: <ContractInfo, Backend extends IBackend<any>, Account extends IAccount<any, any, any, any, any>, Contract extends IContract<ContractInfo, any, any, any>, ConnectorStdlib extends Omit<Stdlib_User<any, any, any, any, ContractInfo, any, any, any, Backend, Contract, Account>, "contract">>(connectorStdlib: ConnectorStdlib) => ConnectorStdlib & {
    contract: (bin: Backend, ctcInfo?: Promise<ContractInfo> | undefined) => Promise<Contract>;
};
export declare const stdVerifyContract: <ContractInfo, VerifyResult>(stdArgs: Pick<ISetupViewArgs<ContractInfo, VerifyResult>, "setTrustedVerifyResult" | "getTrustedVerifyResult">, doVerify: () => Promise<VerifyResult>) => Promise<VerifyResult>;
export declare const stdABIFilter: (x: any) => boolean;
export declare const stdGetABI: (ABI: any) => (isFull?: boolean) => any;
export declare const stdContract: <ContractInfo, VerifyResult, RawAddress, Token, ConnectorTy extends AnyBackendTy>(stdContractArgs: IStdContractArgs<ContractInfo, VerifyResult, RawAddress, Token, ConnectorTy>) => IContract<ContractInfo, RawAddress, Token, ConnectorTy>;
export type TokenMetadata = {
    name?: string;
    symbol?: string;
    url?: string;
    metadata?: string;
    supply: BigNumber;
    decimals?: BigNumber;
    clawback?: string;
    creator?: string;
    defaultFrozen?: boolean;
    freeze?: string;
    manager?: string;
    reserve?: string;
};
export type LaunchTokenOpts = {
    decimals?: number;
    supply?: unknown;
    url?: string;
    metadataHash?: string;
    clawback?: any;
    freeze?: any;
    defaultFrozen?: boolean;
    reserve?: any;
    manager?: string;
    note?: Uint8Array;
};
export type TransferOpts = {
    closeTo?: any;
    note?: Uint8Array;
    tag?: number;
};
export type IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token> = {
    networkAccount: NetworkAccount;
    /**
     * @deprecated Use
     * [`contract`](https://docs.reach.sh/frontend/#js_contract)
     * instead.
     */
    deploy: (bin: Backend) => Contract;
    /**
     * @deprecated Use
     * [`contract`](https://docs.reach.sh/frontend/#js_contract)
     * instead.
     */
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => Contract;
    contract: (bin: Backend, ctcInfoP?: Promise<ContractInfo>) => Contract;
    stdlib: Object;
    getAddress: () => string;
    getDebugLabel: () => string;
    setDebugLabel: (lab: string) => IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
    appOptedIn: (ctc: ContractInfo) => Promise<boolean>;
    tokenAccept: (token: Token) => Promise<void>;
    tokenAccepted: (token: Token) => Promise<boolean>;
    tokensAccepted: () => Promise<Array<Token>>;
    tokenMetadata: (token: Token) => Promise<TokenMetadata>;
    setGasLimit: (ngl: unknown) => void;
    getGasLimit: () => BigNumber;
    setStorageLimit: (nsl: unknown) => void;
    getStorageLimit: () => BigNumber;
    balanceOf: (token?: Token) => Promise<BigNumber>;
    balancesOf: (tokens: Array<Token | null>) => Promise<Array<BigNumber>>;
};
export declare const stdAccount_unsupported: <NetworkAccount, Backend, Contract, ContractInfo, Token>(conn: string) => Pick<IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>, "setGasLimit" | "getGasLimit" | "setStorageLimit" | "getStorageLimit">;
export declare const stdAccount: <NetworkAccount, Backend, Contract, ContractInfo, Token>(orig: Omit<IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>, "deploy" | "attach">) => IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
export type IAccountTransferable<NetworkAccount> = IAccount<NetworkAccount, any, any, any, any> | {
    networkAccount: NetworkAccount;
};
export interface ISimRes<Token, ContractInfo, ConnectorTy extends AnyBackendTy> {
    txns: Array<ISimTxn<Token, ContractInfo, ConnectorTy>>;
    isHalt: boolean;
    maps: Record<number, LinearMap<any, any, ConnectorTy>>;
}
export interface SimMapRef {
    kind: 'ref' | 'setOld' | 'setNew' | 'del';
    key: string;
    mbr: number;
}
export type SimBoxRef<ConnectorTy extends AnyBackendTy> = [
    ConnectorTy,
    SimBoxRaw
];
export type SimBoxRaw = [BigNumber, any] | [BigNumber, BigNumber, any];
export interface ISimRemote<Token, ContractInfo, ConnectorTy extends AnyBackendTy> {
    pays: BigNumber;
    bills: BigNumber;
    toks: Array<Token>;
    accs: Array<string>;
    boxes: Array<SimBoxRef<ConnectorTy>>;
    apps: Array<ContractInfo>;
    fees: BigNumber;
}
export type ISimTxn<Token, ContractInfo, ConnectorTy extends AnyBackendTy> = {
    kind: 'mapOp';
    smr: SimMapRef;
} | {
    kind: 'to' | 'init';
    amt: BigNumber;
    tok: Token | undefined;
} | {
    kind: 'from';
    to: string;
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
    d: BigNumber | undefined;
} | {
    kind: 'tokenBurn';
    tok: Token;
    amt: BigNumber;
} | {
    kind: 'tokenDestroy';
    tok: Token;
} | {
    kind: 'tokenAccepted';
    tok: Token;
    addr: string;
} | {
    kind: 'remote';
    obj: ContractInfo;
    remote: ISimRemote<Token, ContractInfo, ConnectorTy>;
} | {
    kind: 'info';
    tok: Token;
} | {
    kind: 'api';
    who: string;
} | {
    kind: 'contractNew';
    cns: any;
    remote: ISimRemote<Token, ContractInfo, ConnectorTy>;
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
type DigestMode = 'keccak256' | 'sha256';
export declare const makeDigest: (mode: DigestMode, prep: any) => (ts_: any, vs_: any) => string;
export declare const hexToString: (x: any) => string | Uint8Array;
export declare const hexToBigNumber: (h: string) => BigNumber;
export declare const makeRandom: (width: number) => {
    randomUInt: () => BigNumber;
    hasRandom: {
        random: () => BigNumber;
    };
};
export type UIntTy = 'UInt' | 'UInt256';
export declare const UInt256_max: ethers.BigNumber;
export declare const makeArith: (m: BigNumber) => Arith;
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
type NewTestAccounts<X> = (k: number, bal: any) => Promise<Array<X>>;
export declare const make_newTestAccounts: <X>(newTestAccount: (bal: any) => Promise<X>) => {
    parallel: NewTestAccounts<X>;
    serial: NewTestAccounts<X>;
};
export declare const make_waitUntilX: (label: string, getCurrent: () => Promise<BigNumber>, step: (target: BigNumber) => Promise<BigNumber>) => (target: BigNumber, onProgress?: OnProgress) => Promise<BigNumber>;
export declare const checkTimeout: (runningIsolated: (() => boolean), getTimeSecs: (now: BigNumber) => Promise<BigNumber>, timeoutAt: TimeArg | undefined, nowTime: BigNumber) => Promise<boolean>;
type Pred<X> = (x: X) => boolean;
type AsyncPred<X> = (x: X) => Promise<boolean>;
type EQPeqResult<ProcTxn> = {
    timeout: true;
    time: Time;
} | {
    timeout: false;
    txn: ProcTxn;
};
export interface IEventQueue<EQInitArgs, RawTxn, ProcTxn> {
    isInited: () => boolean;
    init: (args: EQInitArgs) => void;
    pushIgnore: (pred: Pred<RawTxn>) => void;
    peq: (lab: string, didTimeout: AsyncPred<Time>, limsug?: number) => Promise<EQPeqResult<ProcTxn>>;
    deq: (dhead: string, limsug?: number) => Promise<ProcTxn>;
}
export interface EQGetTxnsR<RawTxn> {
    txns: Array<RawTxn>;
    gtime: BigNumber | undefined;
}
export interface EQCtorArgs<EQInitArgs, RawTxn, ProcTxn> {
    raw2proc: (t: RawTxn) => ProcTxn;
    alwaysIgnored: Pred<RawTxn>;
    getTxns: (dhead: string, initArgs: EQInitArgs, ctime: Time, howMany: number, limsug?: number) => Promise<EQGetTxnsR<RawTxn>>;
    getTxnTime: (x: RawTxn) => Time;
}
export declare const makeEventQueue: <EQInitArgs, RawTxn, ProcTxn>(ctorArgs: EQCtorArgs<EQInitArgs, RawTxn, ProcTxn>) => IEventQueue<EQInitArgs, RawTxn, ProcTxn>;
export interface IMESArgs<EQInitArgs, RawTxn, ProcTxn, Log> {
    eq: IEventQueue<EQInitArgs, RawTxn, ProcTxn>;
    getTxnTime: (x: ProcTxn) => Time;
    sync: () => Promise<void>;
    getNetworkTime: () => Promise<Time>;
    getLogs: (t: ProcTxn) => Array<Log>;
    parseLog: (l: Log) => (any[] | undefined);
}
export declare const makeEventStream: <EQInitArgs, RawTxn, ProcTxn, Log>(args: IMESArgs<EQInitArgs, RawTxn, ProcTxn, Log>) => {
    lastTime: () => Promise<ethers.BigNumber>;
    seek: (t: Time) => void;
    seekNow: () => Promise<void>;
    monitor: (onEvent: (x: any) => void) => Promise<never>;
    next: () => Promise<{
        when: ethers.BigNumber;
        what: any[];
    } | undefined>;
    nextUpToTime: (maxTime?: Time) => Promise<{
        when: ethers.BigNumber;
        what: any[];
    } | undefined>;
};
export declare function getQueryLowerBound(): BigNumber;
export declare function setQueryLowerBound(x: BigNumber | number): void;
export declare class Signal {
    p: Promise<boolean>;
    r: (a: boolean) => void;
    constructor();
    wait(): Promise<boolean>;
    notify(): void;
}
export declare class Lock {
    locked: boolean;
    constructor();
    acquire(): Promise<void>;
    release(): void;
    runWith<X>(f: (() => Promise<X>)): Promise<X>;
}
export type Some<T> = [T];
export type None = [];
export type Maybe<T> = None | Some<T>;
export declare function isNone<T>(m: Maybe<T>): m is None;
export declare function isSome<T>(m: Maybe<T>): m is Some<T>;
export declare const Some: <T>(m: T) => Some<T>;
export declare const None: None;
export declare const retryLoop: <T>(lab: any, f: () => Promise<T>) => Promise<T>;
type SigningMonitor = (e: any, pre: Promise<any>, post: Promise<any>) => void;
export type SetSigningMonitor = (h: SigningMonitor) => void;
export type NotifyComplete<A> = (post: Promise<A>) => Promise<A>;
export type NotifySend<A, B> = (e: any, pre: Promise<A>) => Promise<[A, NotifyComplete<B>]>;
export declare const makeSigningMonitor: <A, B>() => [SetSigningMonitor, NotifySend<A, B>];
export declare const handleFormat: (amt: unknown, decimals: number, splitValue?: number) => string;
export declare const formatWithDecimals: (amt: unknown, decimals: number) => string;
export declare const apiStateMismatchError: (bin: IBackend<any>, es: BigNumber | BigNumber[], as: BigNumber) => Error;
export declare const makeParseCurrency: (defaultDecs: number) => (amt: CurrencyAmount, decimals?: number) => BigNumber;
export declare const canonicalToBytes: (bv: CBR_Bytes) => Uint8Array;
export declare const isUint8Array: (val: any) => boolean;
export type SecretKeyInput = Uint8Array | string;
export type SecretKey = Uint8Array;
export type Mnemonic = string;
export declare const protectSecretKey: (secret: SecretKeyInput, numBytes: number) => SecretKey;
export declare const protectMnemonic: (phrase: Mnemonic, numWords?: number) => Mnemonic;
export declare const mkGetEventTys: <BackendTy extends AnyBackendTy>(bin: IBackend<BackendTy>, stdlib: any) => () => {
    [n: string]: BackendTy[];
};
//# sourceMappingURL=shared_impl.d.ts.map