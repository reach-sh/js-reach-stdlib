import algosdk from 'algosdk';
import ethers from 'ethers';
import { CurrencyAmount, OnProgress } from './shared';
import * as CBR from './CBR';
import { CBR_Null, CBR_Bool, CBR_UInt, CBR_Bytes, CBR_Address, CBR_Digest, CBR_Object, CBR_Data, CBR_Array, CBR_Tuple, CBR_Val } from './CBR';
export * from './shared';
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare const UInt_max: BigNumber;
declare type Address = string;
declare type SecretKey = Uint8Array;
declare type Wallet = {
    addr: Address;
    sk: SecretKey;
};
declare type TxnInfo = {
    'confirmed-round': number;
    'application-index'?: number;
};
declare type NetworkAccount = Wallet;
declare type Account = {
    networkAccount: NetworkAccount;
};
declare type Backend = {
    _Connectors: {
        ALGO: {
            appApproval0: string;
            appApproval: string;
            appClear: string;
            ctc: string;
            steps: Array<string | null>;
            unsupported: boolean;
        };
    };
};
declare type Recv = {
    didTimeout: false;
    data: Array<ContractOut>;
    value: BigNumber;
    from: string;
} | {
    didTimeout: true;
};
declare type ContractAttached = {
    getInfo: () => Promise<ContractInfo>;
    sendrecv: (...argz: any) => Promise<Recv>;
    recv: (...argz: any) => Promise<Recv>;
    wait: (...argz: any) => any;
    iam: (some_addr: any) => any;
};
declare type ContractOut = any;
declare type ContractInfo = {
    getInfo?: () => Promise<ContractInfo>;
    creationRound: number;
    ApplicationID: number;
};
declare type NV = Uint8Array;
declare type ALGO_Ty<BV extends CBR_Val> = {
    name: string;
    canonicalize: (uv: unknown) => BV;
    netSize: number | 'all';
    toNet(bv: BV): NV;
    fromNet(nv: NV): BV;
};
export declare const T_Null: ALGO_Ty<CBR_Null>;
export declare const T_Bool: ALGO_Ty<CBR_Bool>;
export declare const T_UInt: ALGO_Ty<CBR_UInt>;
export declare const T_Bytes: ALGO_Ty<CBR_Bytes>;
export declare const T_Digest: ALGO_Ty<CBR_Digest>;
export declare const T_Address: ALGO_Ty<CBR_Address>;
export declare const T_Array: (co: ALGO_Ty<CBR_Val>, size: number) => ALGO_Ty<CBR_Array>;
export declare const T_Tuple: (cos: Array<ALGO_Ty<CBR_Val>>) => ALGO_Ty<CBR_Tuple>;
export declare const T_Object: (coMap: {
    [key: string]: ALGO_Ty<CBR.CBR_Val>;
}) => ALGO_Ty<CBR_Object>;
export declare const T_Data: (coMap: {
    [key: string]: ALGO_Ty<CBR.CBR_Val>;
}) => ALGO_Ty<CBR_Data>;
declare const setAlgodClient: (val: Promise<algosdk.Algodv2>) => void;
export { setAlgodClient };
declare const setIndexer: (val: Promise<algosdk.Indexer>) => void;
export { setIndexer };
export declare const transfer: (from: Account, to: Account, value: BigNumber) => Promise<TxnInfo>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
}>;
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
export declare const newTestAccount: (startingBalance: BigNumber) => Promise<{
    deploy: (bin: Backend) => ContractAttached;
    attach: (bin: Backend, ctcInfoP: Promise<ContractInfo>) => ContractAttached;
    networkAccount: Wallet;
}>;
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
export declare function formatCurrency(amt: BigNumber, decimals?: number): string;
export declare function getFaucet(): Promise<Account>;
export declare function getDefaultAccount(): Promise<Account>;
export declare const setFaucet = false;
export declare const newAccountFromMnemonic = false;
export declare const getNetworkTime: () => Promise<ethers.ethers.BigNumber>;
export declare const waitUntilTime: (targetTime: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const wait: (delta: BigNumber, onProgress?: OnProgress | undefined) => Promise<BigNumber>;
export declare const verifyContract = false;
export declare const addressEq: (x: any, y: any) => boolean;
//# sourceMappingURL=ALGO.d.ts.map