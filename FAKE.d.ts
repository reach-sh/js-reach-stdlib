import ethers from 'ethers';
import * as stdlib from './shared';
import { CurrencyAmount, OnProgress } from './shared';
export * from './shared';
export { T_Null, T_Bool, T_UInt, T_Bytes, T_Address, T_Digest, T_Object, T_Data, T_Array, T_Tuple, addressEq, digest } from './ETH';
export declare const debug: (msg: any) => void;
declare type BigNumber = ethers.BigNumber;
declare const BigNumber: typeof ethers.ethers.BigNumber;
export declare const UInt_max: BigNumber;
export declare const randomUInt: () => ethers.ethers.BigNumber, hasRandom: {
    random: () => ethers.ethers.BigNumber;
};
declare type Address = string;
declare type NetworkAccount = {
    address: Address;
};
declare type Backend = null;
declare type FAKE_Ty = any;
declare type ContractInfo = {
    address: Address;
    creation_block: number;
};
declare type Digest = Array<any>;
declare type Contract = stdlib.IContract<ContractInfo, Digest, Address, FAKE_Ty>;
declare type Account = stdlib.IAccount<NetworkAccount, Backend, Contract, ContractInfo>;
declare type AccountTransferrable = stdlib.IAccountTransferable<NetworkAccount>;
export declare const balanceOf: (acc: Account) => Promise<ethers.ethers.BigNumber>;
/**
 * @description performs a transfer & creates a transfer block
 */
export declare const transfer: (from: AccountTransferrable, to: AccountTransferrable, value: BigNumber) => Promise<void>;
export declare const connectAccount: (networkAccount: NetworkAccount) => Promise<Account>;
export declare function getDefaultAccount(): Promise<Account>;
export declare function getFaucet(): Promise<Account>;
export declare const newTestAccount: (startingBalance: BigNumber) => Promise<stdlib.IAccount<NetworkAccount, null, stdlib.IContract<ContractInfo, Digest, string, any>, ContractInfo>>;
export declare function getNetworkTime(): ethers.ethers.BigNumber;
export declare function wait(delta: BigNumber | number, onProgress?: OnProgress): BigNumber;
export declare function waitUntilTime(targetTime: BigNumber | number, onProgress?: OnProgress): BigNumber;
export declare const newAccountFromSecret = false;
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
export declare const minimumBalance: BigNumber;
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
export declare const setFaucet = false;
//# sourceMappingURL=FAKE.d.ts.map