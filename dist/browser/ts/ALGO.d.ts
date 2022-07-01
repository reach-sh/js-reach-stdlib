export declare const connector = "ALGO";
import algosdk from 'algosdk';
export { default as algosdk } from 'algosdk';
import { ethers } from 'ethers';
import type { Transaction, SuggestedParams } from 'algosdk';
import type { ARC11_Wallet, WalletTransaction } from './ALGO_ARC11';
import type { BaseHTTPClient } from 'algosdk';
import * as RHC from './ALGO_ReachHTTPClient';
import { OnProgress, IBackend, IAccount, IContract, LaunchTokenOpts } from './shared_impl';
import { CBR_Val } from './CBR';
import { Token, ALGO_Ty, addressFromHex } from './ALGO_compiled';
export type { Token } from './ALGO_compiled';
export declare const add: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, sub: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mod: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mul: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, div: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, band: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, bior: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, bxor: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, eq: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, ge: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, gt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, le: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, lt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, add256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, sub256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mod256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, mul256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, div256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, band256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, bior256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, bxor256: (x: import("./shared_backend").num, y: import("./shared_backend").num) => ethers.BigNumber, eq256: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, ge256: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, gt256: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, le256: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, lt256: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => boolean, sqrt: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => ethers.BigNumber, sqrt256: (n1: import("./shared_backend").num, n2: import("./shared_backend").num) => ethers.BigNumber, cast: (from: import("./shared_impl").UIntTy, to: import("./shared_impl").UIntTy, x: import("./shared_backend").num, truncate: boolean) => ethers.BigNumber, muldiv: (x: import("./shared_backend").num, y: import("./shared_backend").num, z: import("./shared_backend").num) => ethers.BigNumber, protect: (t: any, v: unknown, ai?: string | undefined) => unknown, assert: (b: boolean, message: string) => void, Array_set: <A>(arr: A[], idx: number, val: A) => A[], bytesEq: (s1: string, s2: string) => boolean, digestEq: (x: unknown, y: unknown) => boolean, digest_xor: (x: string, y: string) => string, bytes_xor: (x: string, y: string) => string, btoiLast8: (b: string) => ethers.BigNumber;
export * from './shared_user';
import { setQueryLowerBound, getQueryLowerBound, formatWithDecimals } from './shared_impl';
export { setQueryLowerBound, getQueryLowerBound, addressFromHex, formatWithDecimals };
declare const setSigningMonitor: import("./shared_impl").SetSigningMonitor;
export { setSigningMonitor };
declare type BigNumber = ethers.BigNumber;
declare type AnyALGO_Ty = ALGO_Ty<CBR_Val>;
export declare type Ty = AnyALGO_Ty;
export declare type Address = string;
declare type SecretKey = Uint8Array;
declare type TxnParams = SuggestedParams;
declare type RecvTxn = {
    'confirmed-round': bigint;
    'created-asset-index'?: bigint;
    'created-application-index'?: bigint;
    'created-companion-application-index'?: bigint;
    'application-index'?: bigint;
    'application-args': Array<string>;
    'sender': Address;
    'logs': Array<string>;
    'approval-program'?: string;
    'clear-state-program'?: string;
};
export declare type NetworkAccount = {
    addr: Address;
    sk?: SecretKey;
};
export declare type Backend = IBackend<AnyALGO_Ty> & {
    _Connectors: {
        ALGO: {
            version: number;
            ABI: any;
            appApproval: string;
            appClear: string;
            companionInfo: {
                [key: string]: number;
            } | null;
            extraPages: number;
            stateSize: number;
            stateKeys: number;
            mapDataSize: number;
            mapDataKeys: number;
            unsupported: Array<string>;
            warnings: Array<string>;
        };
    };
};
export declare type ContractInfo = BigNumber;
export declare type Contract = IContract<ContractInfo, Address, Token, AnyALGO_Ty>;
export declare type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
export declare function setCustomHttpEventHandler(h: (e: RHC.Event) => Promise<void>): void;
export declare function setMinMillisBetweenRequests(n: number): void;
export declare const signSendAndConfirm: (acc: NetworkAccount, txns: Array<WalletTransaction>) => Promise<RecvTxn>;
export declare const toWTxn: (t: Transaction) => WalletTransaction;
export declare const getTxnParams: (label: string) => Promise<TxnParams>;
export declare const MinTxnFee = 1000;
export declare function getValidQueryWindow(): number | true;
export declare function setValidQueryWindow(n: number | true): void;
export declare const addressEq: (addr1: unknown, addr2: unknown) => boolean, tokenEq: (x: unknown, y: unknown) => boolean, digest: (t: ALGO_Ty<any>, a: unknown) => string;
export declare const T_Null: ALGO_Ty<null>, T_Bool: ALGO_Ty<boolean>, T_UInt: ALGO_Ty<ethers.BigNumber>, T_UInt256: ALGO_Ty<ethers.BigNumber>, T_Tuple: (cos: ALGO_Ty<CBR_Val>[]) => ALGO_Ty<import("./CBR").CBR_Tuple>, T_Array: (co: ALGO_Ty<CBR_Val>, size_u: unknown) => ALGO_Ty<import("./CBR").CBR_Array>, T_Contract: ALGO_Ty<ethers.BigNumber>, T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Object>, T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR_Val>;
}) => ALGO_Ty<import("./CBR").CBR_Data>, T_Bytes: (len: number) => ALGO_Ty<string>, T_Address: ALGO_Ty<string>, T_Digest: ALGO_Ty<string>, T_Struct: (cos: [string, ALGO_Ty<CBR_Val>][]) => ALGO_Ty<import("./CBR").CBR_Struct>, T_Token: ALGO_Ty<ethers.BigNumber>;
export declare const randomUInt: () => ethers.BigNumber, hasRandom: {
    random: () => ethers.BigNumber;
};
export interface Provider {
    algod_bc: BaseHTTPClient;
    indexer_bc: BaseHTTPClient;
    algodClient: algosdk.Algodv2;
    indexer: algosdk.Indexer;
    nodeWriteOnly: boolean;
    getDefaultAddress: () => Promise<Address>;
    isIsolatedNetwork: boolean;
    signAndPostTxns: (txns: WalletTransaction[], opts?: object) => Promise<unknown>;
}
export declare const setWalletFallback: (wf: () => unknown) => void;
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
    ALGO_NODE_WRITE_ONLY: string;
}
export declare function setProviderByEnv(env: Partial<ProviderEnv>): void;
export declare type ProviderName = string;
export declare function providerEnvByName(pn: ProviderName): ProviderEnv;
export declare function setProviderByName(pn: ProviderName): void;
export declare const getFaucet: () => Promise<Account>, setFaucet: (val: Promise<Account>) => void;
export declare const makeTransferTxn: (from: Address, to: Address, value: BigNumber, token: Token | undefined, ps: TxnParams, closeTo?: Address | undefined, tag?: number | undefined) => Transaction;
export declare const transfer: (from: Account, to: Account, value: unknown, token?: Token | undefined, tag?: number | undefined) => Promise<RecvTxn>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare const minimumBalanceOf: (acc: Account) => Promise<BigNumber>;
export declare const balancesOf: (acc: Account, tokens: Array<Token | null>) => Promise<Array<BigNumber>>;
export declare const balanceOf: (acc: Account, token?: Token) => Promise<BigNumber>;
export declare const createAccount: () => Promise<Account>;
export declare const canFundFromFaucet: () => Promise<boolean>;
export declare const fundFromFaucet: (account: Account, value: unknown) => Promise<void>;
export declare const newTestAccount: (startingBalance: unknown) => Promise<Account>;
export declare const newTestAccounts: (k: number, bal: any) => Promise<Account[]>;
/** @description the display name of the standard unit of currency for the network */
export declare const standardUnit = "ALGO";
/** @description the display name of the atomic (smallest) unit of currency for the network */
export declare const atomicUnit = "\u03BCALGO";
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the token.
 * @param {number} [decimals] how many "decimal places" the target currency has. Defaults to the network standard.
 * @returns  the amount in the {@link atomicUnit} of the token.
 * @example  parseCurrency(100).toString() // => '100000000'
 * @example  parseCurrency(100, 3).toString() // => '100000'
 */
export declare const parseCurrency: (amt: import("./shared_impl").CurrencyAmount, decimals?: number) => ethers.BigNumber;
export declare const minimumBalance: BigNumber;
/**
 * @description  Format currency by network
 */
export declare function formatCurrency(amt: unknown, decimals?: number): string;
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
export declare const getTimeSecs: (now_bn: BigNumber) => Promise<BigNumber>;
export declare const getNetworkSecs: () => Promise<BigNumber>;
export declare const waitUntilTime: (target: ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<ethers.BigNumber>;
export declare const waitUntilSecs: (target: ethers.BigNumber, onProgress?: OnProgress | undefined) => Promise<ethers.BigNumber>;
export declare const wait: (delta: BigNumber, onProgress?: OnProgress) => Promise<BigNumber>;
declare type VerifyResult = {
    ApplicationID: BigNumber;
    Deployer: Address;
};
export declare const verifyContract: (info: ContractInfo, bin: Backend) => Promise<VerifyResult>;
/**
 * Formats an account's address in the way users expect to see it.
 * @param acc Account, NetworkAccount, base32-encoded address, or hex-encoded address
 * @returns the address formatted as a base32-encoded string with checksum
 */
export declare function formatAddress(acc: string | NetworkAccount | Account): string;
export declare function unsafeGetMnemonic(acc: NetworkAccount | Account): string;
export declare const launchToken: (accCreator: Account, name: string, sym: string, opts?: LaunchTokenOpts) => Promise<{
    name: string;
    sym: string;
    id: ethers.BigNumber;
    mint: (accTo: Account, amt: any) => Promise<RecvTxn>;
    optOut: (accFrom: Account, accTo?: Account) => Promise<void>;
}>;
export declare const reachStdlib: import("./interfaces").Stdlib_Backend_Base<ALGO_Ty<any>>;
//# sourceMappingURL=ALGO.d.ts.map