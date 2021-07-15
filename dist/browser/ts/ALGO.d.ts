export declare const connector = "ALGO";
import algosdk from 'algosdk';
import { ethers } from 'ethers';
import { CurrencyAmount, OnProgress, IBackend, IAccount, IContract } from './shared_impl';
import { CBR_Val } from './CBR';
import { Token, ALGO_Ty } from './ALGO_compiled';
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, protect: (t: any, v: unknown, ai?: string | undefined) => unknown, assert: (b: boolean, message: string) => void, Array_set: <A>(arr: A[], idx: number, val: A) => A[], eq: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, ge: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, gt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, le: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, lt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, bytesEq: (s1: string, s2: string) => boolean, digestEq: (d1: string, d2: string) => boolean;
export * from './shared_user';
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
            version: number;
            appApproval0: string;
            appApproval: string;
            appClear: string;
            ctc: string;
            viewSize: number;
            viewKeys: number;
            mapDataSize: number;
            mapDataKeys: number;
            mapRecordSize: number;
            mapArgSize: number;
            steps: Array<string | null>;
            stepargs: Array<StepArgInfo | null>;
            unsupported: Array<string>;
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
declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
declare const setWaitPort: (val: boolean) => void;
export { setWaitPort };
declare const getSignStrategy: () => string, setSignStrategy: (val: string) => void;
export { getSignStrategy, setSignStrategy };
declare const setAlgoSigner: (val: Promise<AlgoSigner>) => void;
export { setAlgoSigner };
export declare const waitForConfirmation: (txId: TxId, untilRound: number | undefined) => Promise<TxnInfo>;
export declare const getTxnParams: () => Promise<TxnParams>;
declare type TXN = any;
export declare const addressEq: (addr1: unknown, addr2: unknown) => boolean, tokenEq: (x: unknown, y: unknown) => boolean, digest: (t: ALGO_Ty<any>, a: unknown) => string;
export declare const T_Null: ALGO_Ty<null>, T_Bool: ALGO_Ty<boolean>, T_UInt: ALGO_Ty<ethers.BigNumber>, T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>, T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>, T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Object>, T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Data>, T_Bytes: (len: number) => ALGO_Ty<string>, T_Address: ALGO_Ty<string>, T_Digest: ALGO_Ty<string>, T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>, T_Token: ALGO_Ty<ethers.BigNumber>;
export declare const randomUInt: () => ethers.BigNumber, hasRandom: {
    random: () => ethers.BigNumber;
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
export declare const balanceOf: (acc: Account, token?: Token | false) => Promise<BigNumber>;
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
export declare const getNetworkTime: () => Promise<ethers.BigNumber>;
export declare const waitUntilTime: (targetTime: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const verifyContract: (info: ContractInfo, bin: Backend) => Promise<true>;
/**
 * Formats an account's address in the way users expect to see it.
 * @param acc Account, NetworkAccount, base32-encoded address, or hex-encoded address
 * @returns the address formatted as a base32-encoded string with checksum
 */
export declare function formatAddress(acc: string | NetworkAccount | Account): string;
export declare const reachStdlib: import("./interfaces").Stdlib_Backend_Base<ALGO_Ty<any>>;
//# sourceMappingURL=ALGO.d.ts.map