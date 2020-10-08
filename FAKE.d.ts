import { BigNumber } from 'ethers';
import * as stdlib from './shared';
import { CurrencyAmount } from './shared';
export * from './shared';
export declare const debug: (msg: any) => void;
declare type Address = string;
declare type NetworkAccount = {
    address: Address;
};
declare type Backend = null;
declare type ContractInfo = {
    address: Address;
    creation_block: number;
};
declare type Digest = Array<any>;
declare type Contract = stdlib.IContract<ContractInfo, Digest, Address>;
declare type Account = stdlib.IAccount<NetworkAccount, Backend, Contract, ContractInfo>;
declare type AccountTransferrable = stdlib.IAccountTransferable<NetworkAccount>;
export declare const balanceOf: (acc: Account) => Promise<BigNumber>;
/**
 * @description performs a transfer & creates a transfer block
 */
export declare const transfer: (from: AccountTransferrable, to: AccountTransferrable, value: BigNumber) => Promise<void>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare const newTestAccount: (startingBalance: BigNumber) => Promise<stdlib.IAccount<NetworkAccount, null, stdlib.IContract<ContractInfo, Digest, string>, ContractInfo>>;
export declare function getNetworkTime(): BigNumber;
declare type OnProgress = (obj: {
    currentTime: BigNumber;
    targetTime: BigNumber;
}) => void;
export declare function wait(delta: BigNumber | number, onProgress?: OnProgress): BigNumber;
export declare function waitUntilTime(targetTime: BigNumber | number, onProgress?: OnProgress): BigNumber;
export declare const newAccountFromMnemonic = false;
export declare const verifyContract = false;
/** @description the display name of the standard unit of currency for the network */
export declare const standardUnit = "FAKE";
/** @description the display name of the atomic (smallest) unit of currency for the network */
export declare const atomicUnit = "FAKE";
/**
 * @description  Parse currency by network
 * @param amt  value in the {@link standardUnit} for the network.
 * @returns  the amount in the {@link atomicUnit} of the network.
 * @example  parseCurrency(100).toString() // => '100'
 */
export declare function parseCurrency(amt: CurrencyAmount): BigNumber;
/**
 * @description  Format currency by network
 * @param amt  the amount in the {@link atomicUnit} of the network.
 * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
 *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
 *   This argument defaults to maximum precision.
 * @returns  a string representation of that amount in the {@link standardUnit} for that network.
 * @example  formatCurrency(bigNumberify('100')); // => '100'
 */
export declare function formatCurrency(amt: BigNumber, decimals?: number): string;
//# sourceMappingURL=FAKE.d.ts.map