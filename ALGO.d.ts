import { BigNumber } from 'ethers';
import { CurrencyAmount } from './shared';
export * from './shared';
declare type Round = number;
declare type Address = string;
declare type RawAddress = Uint8Array;
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
    from: RawAddress;
} | {
    didTimeout: true;
};
declare type ContractAttached = {
    getInfo: () => Promise<ContractInfo>;
    sendrecv: (...argz: any) => Promise<Recv>;
    recv: (...argz: any) => Promise<Recv>;
    wait: (...argz: any) => any;
    iam: (some_addr: RawAddress) => RawAddress;
};
declare type ContractOut = any;
declare type ContractInfo = {
    getInfo?: () => Promise<ContractInfo>;
    creationRound: number;
    ApplicationID: number;
};
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
export declare const newAccountFromMnemonic = false;
export declare const getNetworkTime: () => Promise<Round>;
export declare const waitUntilTime = false;
export declare const wait = false;
export declare const verifyContract = false;
//# sourceMappingURL=ALGO.d.ts.map