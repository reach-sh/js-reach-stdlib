export declare const connector = "ALGO";
import algosdk from 'algosdk';
import { ethers } from 'ethers';
import type { ARC11_Wallet, WalletTransaction } from './ALGO_ARC11';
import { CurrencyAmount, OnProgress, IBackend, IAccount, IContract } from './shared_impl';
import { CBR_Val } from './CBR';
import { Token, ALGO_Ty } from './ALGO_compiled';
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, protect: (t: any, v: unknown, ai?: string | undefined) => unknown, assert: (b: boolean, message: string) => void, Array_set: <A>(arr: A[], idx: number, val: A) => A[], eq: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, ge: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, gt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, le: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, lt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, bytesEq: (s1: string, s2: string) => boolean, digestEq: (x: unknown, y: unknown) => boolean;
export * from './shared_user';
declare type BigNumber = ethers.BigNumber;
declare type AnyALGO_Ty = ALGO_Ty<CBR_Val>;
declare type Address = string;
declare type SecretKey = Uint8Array;
declare type RecvTxn = {
    'confirmed-round': number;
    'application-index'?: number;
    'application-args': Array<string>;
    'sender': Address;
    'logs': Array<string>;
};
declare type CompileResultBytes = {
    src: String;
    result: Uint8Array;
    hash: Address;
};
declare type NetworkAccount = {
    addr: Address;
    sk?: SecretKey;
};
declare type Backend = IBackend<AnyALGO_Ty> & {
    _Connectors: {
        ALGO: {
            version: number;
            appApproval: string;
            appClear: string;
            escrow: string;
            stateSize: number;
            stateKeys: number;
            mapDataSize: number;
            mapDataKeys: number;
            unsupported: Array<string>;
        };
    };
};
declare type CompiledBackend = {
    ApplicationID: number;
    appApproval: CompileResultBytes;
    appClear: CompileResultBytes;
    escrow: CompileResultBytes;
};
declare type ContractInfo = number;
declare type Contract = IContract<ContractInfo, Address, Token, AnyALGO_Ty>;
declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
declare const getValidQueryWindow: () => number | true;
export { getValidQueryWindow };
export declare function setValidQueryWindow(n: number | true): void;
export declare function getQueryLowerBound(): BigNumber;
export declare function setQueryLowerBound(networkTime: BigNumber | number): void;
export declare const addressEq: (addr1: unknown, addr2: unknown) => boolean, tokenEq: (x: unknown, y: unknown) => boolean, digest: (t: ALGO_Ty<any>, a: unknown) => string;
export declare const T_Null: ALGO_Ty<null>, T_Bool: ALGO_Ty<boolean>, T_UInt: ALGO_Ty<ethers.BigNumber>, T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>, T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<import("./CBR").CBR_Array>, T_Contract: ALGO_Ty<ethers.BigNumber>, T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Object>, T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Data>, T_Bytes: (len: number) => ALGO_Ty<string>, T_Address: ALGO_Ty<string>, T_Digest: ALGO_Ty<string>, T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>, T_Token: ALGO_Ty<ethers.BigNumber>;
export declare const randomUInt: () => ethers.BigNumber, hasRandom: {
    random: () => ethers.BigNumber;
};
interface Provider {
    algodClient: algosdk.Algodv2;
    indexer: algosdk.Indexer;
    getDefaultAddress: () => Promise<Address>;
    isIsolatedNetwork: boolean;
    signAndPostTxns: (txns: WalletTransaction[], opts?: any) => Promise<any>;
}
export declare const setWalletFallback: (wf: () => any) => void;
export declare const walletFallback: (opts: any) => () => ARC11_Wallet;
export declare const getProvider: () => Promise<Provider>, setProvider: (val: Promise<Provider>) => void;
export interface ProviderEnv {
    ALGO_SERVER: string;
    ALGO_PORT: string;
    ALGO_TOKEN: string;
    ALGO_INDEXER_SERVER: string;
    ALGO_INDEXER_PORT: string;
    ALGO_INDEXER_TOKEN: string;
    REACH_ISOLATED_NETWORK: string;
}
export declare function setProviderByEnv(env: Partial<ProviderEnv>): void;
export declare function providerEnvByName(providerName: string): ProviderEnv;
export declare function setProviderByName(providerName: string): void;
export declare const getFaucet: () => Promise<Account>, setFaucet: (val: Promise<Account>) => void;
export declare const transfer: (from: Account, to: Account, value: any, token?: Token | undefined, tag?: number | undefined) => Promise<RecvTxn>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare const balanceOf: (acc: Account, token?: Token | false) => Promise<BigNumber>;
export declare const createAccount: () => Promise<Account>;
export declare const canFundFromFaucet: () => Promise<boolean>;
export declare const fundFromFaucet: (account: Account, value: any) => Promise<void>;
export declare const newTestAccount: (startingBalance: any) => Promise<Account>;
export declare const newTestAccounts: (k: number, bal: any) => Promise<Account[]>;
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
 *   Trailing zeros will be omitted. Excess decimal places will be truncated (not rounded).
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100000000')); // => '100'
 * @example  formatCurrency(bigNumberify('9999998799987000')); // => '9999998799.987'
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
export declare const newAccountFromSecret: (secret: string | SecretKey) => Promise<Account>;
export declare const getNetworkTime: () => Promise<BigNumber>;
export declare const getNetworkSecs: () => Promise<BigNumber>;
export declare const waitUntilTime: (target: ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<ethers.BigNumber>;
export declare const waitUntilSecs: (target: ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<ethers.BigNumber>;
export declare const wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
declare type VerifyResult = {
    compiled: CompiledBackend;
    ApplicationID: number;
    startRound: number;
    Deployer: Address;
};
export declare const verifyContract: (info: ContractInfo, bin: Backend) => Promise<VerifyResult>;
/**
 * Formats an account's address in the way users expect to see it.
 * @param acc Account, NetworkAccount, base32-encoded address, or hex-encoded address
 * @returns the address formatted as a base32-encoded string with checksum
 */
export declare function formatAddress(acc: string | NetworkAccount | Account): string;
export declare function launchToken(accCreator: Account, name: string, sym: string, opts?: any): Promise<{
    name: string;
    sym: string;
    id: any;
    mint: (accTo: Account, amt: any) => Promise<void>;
    optOut: (accFrom: Account, accTo?: Account) => Promise<void>;
}>;
export declare const reachStdlib: import("./interfaces").Stdlib_Backend_Base<ALGO_Ty<any>>;
//# sourceMappingURL=ALGO.d.ts.map