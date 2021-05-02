import algosdk from 'algosdk';
import ethers from 'ethers';
import { CurrencyAmount, OnProgress, IBackend, IBackendViewInfo, IBackendViewsInfo, IAccount, IContract } from './shared';
import { CBR_Val } from './CBR';
import { Token, ALGO_Ty } from './ALGO_compiled';
export * from './shared';
declare type BigNumber = ethers.BigNumber;
declare type AnyALGO_Ty = ALGO_Ty<CBR_Val>;
declare type Address = string;
declare type SecretKey = Uint8Array;
declare type AlgoSigner = {
    sign: (txn: TXN) => Promise<{
        blob: string;
        txID: string;
    }>;
    accounts: (args: {
        ledger: string;
    }) => Promise<Array<{
        address: string;
    }>>;
};
declare type Wallet = {
    addr: Address;
    sk?: SecretKey;
    AlgoSigner?: AlgoSigner;
};
declare type TxnParams = {
    flatFee: boolean;
    fee: number;
    firstRound: number;
    lastRound: number;
    genesisID: number;
    genesisHash: string;
};
declare type TxnInfo = {
    'confirmed-round': number;
    'application-index'?: number;
};
declare type TxId = string;
declare type NetworkAccount = Wallet;
declare type StepArgInfo = {
    count: number;
    size: number;
};
declare type Backend = IBackend<AnyALGO_Ty> & {
    _Connectors: {
        ALGO: {
            appApproval0: string;
            appApproval: string;
            appClear: string;
            ctc: string;
            steps: Array<string | null>;
            stepargs: Array<StepArgInfo | null>;
            unsupported: boolean;
        };
    };
};
declare type ContractInfo = {
    getInfo?: () => Promise<ContractInfo>;
    creationRound: number;
    ApplicationID: number;
    Deployer: Address;
};
declare type Digest = BigNumber;
declare type Contract = IContract<ContractInfo, Digest, Address, Token, AnyALGO_Ty>;
declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo>;
declare const setWaitPort: (val: boolean) => void;
export { setWaitPort };
declare type SignStrategy = 'mnemonic' | 'AlgoSigner' | 'MyAlgo';
declare const getSignStrategy: () => SignStrategy, setSignStrategy: (val: SignStrategy) => void;
export { getSignStrategy, setSignStrategy };
declare const setAlgoSigner: (val: Promise<AlgoSigner>) => void;
export { setAlgoSigner };
export declare const waitForConfirmation: (txId: TxId, untilRound: number | undefined) => Promise<TxnInfo>;
export declare const getTxnParams: () => Promise<TxnParams>;
declare type TXN = any;
export declare const addressEq: (x: any, y: any) => boolean, digest: (t: any, v: any) => string;
export declare const T_Null: ALGO_Ty<null>, T_Bool: ALGO_Ty<boolean>, T_UInt: ALGO_Ty<ethers.ethers.BigNumber>, T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>, T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>, T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Object>, T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Data>, T_Bytes: (len: number) => ALGO_Ty<string>, T_Address: ALGO_Ty<string>, T_Digest: ALGO_Ty<string>, T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
export declare const randomUInt: () => ethers.ethers.BigNumber, hasRandom: {
    random: () => ethers.ethers.BigNumber;
};
export declare const getLedger: () => string | undefined, setLedger: (val: string | undefined) => void;
export declare const getAlgodClient: () => Promise<algosdk.Algodv2>, setAlgodClient: (val: Promise<algosdk.Algodv2>) => void;
export declare const getIndexer: () => Promise<algosdk.Indexer>, setIndexer: (val: Promise<algosdk.Indexer>) => void;
interface ALGO_Provider {
    algodClient: algosdk.Algodv2;
    indexer: algosdk.Indexer;
    ledger?: string;
}
export declare function getProvider(): Promise<ALGO_Provider>;
export declare function setProvider(provider: ALGO_Provider | Promise<ALGO_Provider>): Promise<void>;
export interface ProviderEnv {
    ALGO_LEDGER: string | undefined;
    ALGO_SERVER: string;
    ALGO_PORT: string;
    ALGO_TOKEN: string;
    ALGO_INDEXER_SERVER: string;
    ALGO_INDEXER_PORT: string;
    ALGO_INDEXER_TOKEN: string;
}
export declare function setProviderByEnv(env: Partial<ProviderEnv>): void;
declare type WhichNetExternal = 'MainNet' | 'TestNet' | 'BetaNet';
export declare type ProviderName = WhichNetExternal | 'LocalHost' | 'randlabs/MainNet' | 'randlabs/TestNet' | 'randlabs/BetaNet';
export declare function providerEnvByName(providerName: ProviderName): ProviderEnv;
export declare function setProviderByName(providerName: ProviderName): void;
declare const getFaucet: () => Promise<Account>, setFaucet: (val: Promise<Account>) => void;
export { getFaucet, setFaucet };
export declare const transfer: (from: Account, to: Account, value: any, token?: Token | undefined) => Promise<TxnInfo>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
export declare const createAccount: () => Promise<Account>;
export declare const fundFromFaucet: (account: Account, value: any) => Promise<void>;
export declare const newTestAccount: (startingBalance: any) => Promise<Account>;
/** @description the display name of the standard unit of currency for the network */
export declare const standardUnit = "ALGO";
/** @description the display name of the atomic (smallest) unit of currency for the network */
export declare const atomicUnit = "\u03BCALGO";
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100000000'
 */
export declare function parseCurrency(amt: CurrencyAmount): BigNumber;
export declare const minimumBalance: BigNumber;
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000')); // => '100'
 */
export declare function formatCurrency(amt: any, decimals?: number): string;
export declare function getDefaultAccount(): Promise<Account>;
/**
 * @param mnemonic 25 words, space-separated
 */
export declare const newAccountFromMnemonic: (mnemonic: string) => Promise<Account>;
/**
 * @param secret a Uint8Array, or its hex string representation
 */
export declare const newAccountFromSecret: (secret: string | Uint8Array) => Promise<Account>;
export declare const newAccountFromAlgoSigner: (addr: string, AlgoSigner: AlgoSigner, ledger: string) => Promise<Account>;
export declare const getNetworkTime: () => Promise<ethers.ethers.BigNumber>;
export declare const waitUntilTime: (targetTime: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const verifyContract: (info: ContractInfo, bin: Backend) => Promise<true>;
export declare const reachStdlib: {
    addressEq: (x: any, y: any) => boolean;
    tokenEq: (x: ethers.ethers.BigNumber, y: ethers.ethers.BigNumber) => boolean;
    digest: (t: any, v: any) => string;
    UInt_max: ethers.ethers.BigNumber;
    T_Null: ALGO_Ty<null>;
    T_Bool: ALGO_Ty<boolean>;
    T_UInt: ALGO_Ty<ethers.ethers.BigNumber>;
    T_Bytes: (len: number) => ALGO_Ty<string>;
    T_Address: ALGO_Ty<string>;
    T_Digest: ALGO_Ty<string>;
    T_Token: ALGO_Ty<ethers.ethers.BigNumber>;
    T_Object: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<import("./CBR").CBR_Object>;
    T_Data: (coMap: {
        [key: string]: ALGO_Ty<CBR_Val>;
    }) => ALGO_Ty<import("./CBR").CBR_Data>;
    T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>;
    T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>;
    T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>;
    protect(ctc: import("./shared").AnyBackendTy, v: unknown, ai?: unknown): any;
    Array_set<T>(arr: T[], idx: number, elem: T): T[];
    getViewsHelper: <ConnectorTy extends import("./shared").AnyBackendTy, B>(views: import("./shared").IBackendViews<ConnectorTy>, getView1: (views: IBackendViewsInfo<ConnectorTy>, v: string, k: string, vi: IBackendViewInfo<ConnectorTy>) => B) => () => {
        [key: string]: {
            [key: string]: B;
        };
    };
    deferContract: <ContractInfo_1, Digest_1, RawAddress, Token_1, ConnectorTy_1 extends import("./shared").AnyBackendTy>(shouldError: boolean, implP: Promise<IContract<ContractInfo_1, Digest_1, RawAddress, Token_1, ConnectorTy_1>>, implNow: Partial<IContract<ContractInfo_1, Digest_1, RawAddress, Token_1, ConnectorTy_1>>) => IContract<ContractInfo_1, Digest_1, RawAddress, Token_1, ConnectorTy_1>;
    envDefault: (v: string | null | undefined, d: any) => any;
    setDEBUG: (b: boolean) => void;
    getDEBUG: () => boolean;
    debug: (...msgs: any) => void;
    assert: (d: any, ai?: any) => void;
    isBigNumber: typeof ethers.ethers.BigNumber.isBigNumber;
    bigNumberify: (x: any) => ethers.ethers.BigNumber;
    bigNumberToNumber: (x: any) => number;
    checkedBigNumberify: (at: string, m: ethers.ethers.BigNumber, x: any) => ethers.ethers.BigNumber;
    isHex: typeof ethers.ethers.utils.isHexString;
    hexToString: typeof ethers.ethers.utils.toUtf8String;
    stringToHex: (x: string) => string;
    makeDigest: (prep: any) => (t: any, v: any) => string;
    hexToBigNumber: (h: string) => ethers.ethers.BigNumber;
    uintToBytes: (i: ethers.ethers.BigNumber) => string;
    bigNumberToHex: (u: number | ethers.ethers.BigNumber, size?: number) => string;
    bytesEq: (x: any, y: any) => boolean;
    digestEq: (x: any, y: any) => boolean;
    makeRandom: (width: number) => {
        randomUInt: () => ethers.ethers.BigNumber;
        hasRandom: {
            random: () => ethers.ethers.BigNumber;
        };
    };
    eq: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    add: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    sub: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    mod: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    mul: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    div: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => ethers.ethers.BigNumber;
    ge: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    gt: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    le: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    lt: (a: number | ethers.ethers.BigNumber, b: number | ethers.ethers.BigNumber) => boolean;
    argsSlice: <T_1>(args: T_1[], cnt: number) => T_1[];
    argsSplit: <T_2>(args: T_2[], cnt: number) => [T_2[], T_2[]];
    Array_zip: <X, Y>(x: X[], y: Y[]) => [X, Y][];
    mapRef: (m: any, f: any) => any;
    objectMap: <A, B_1>(object: {
        [key: string]: A;
    }, mapFn: (k: string, a: A) => B_1) => {
        [key: string]: B_1;
    };
    mkAddressEq: (T_Address: {
        canonicalize: (addr: any) => any;
    }) => (x: any, y: any) => boolean;
    parseFixedPoint: (x: {
        sign: boolean;
        i: {
            i: number | ethers.ethers.BigNumber;
            scale: number | ethers.ethers.BigNumber;
        };
    }) => number;
    parseInt: (x: {
        sign: boolean;
        i: number | ethers.ethers.BigNumber;
    }) => number;
};
//# sourceMappingURL=ALGO.d.ts.map