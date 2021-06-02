import cfxsdk from 'js-conflux-sdk';
import { ethers } from 'ethers';
declare type BigNumber = ethers.BigNumber;
declare type EpochNumber = cfxsdk.EpochNumber;
declare type Conflux = cfxsdk.Conflux;
export declare function ethifyOkReceipt(receipt: any): any;
export declare function ethifyTxn(txn: any): any;
export declare class Provider {
    conflux: Conflux;
    constructor(conflux: Conflux);
    getBalance(address: string, epochNumber?: EpochNumber): Promise<BigNumber>;
    getBlockNumber(): Promise<number>;
    getTransactionReceipt(transactionHash: string): Promise<any>;
    on(...argz: any): void;
    off(...argz: any): void;
    getLogs(opts: {
        fromBlock: number;
        toBlock: number;
        address: string;
        topics: string[];
    }): Promise<any[]>;
    getTransaction(txnHash: string): Promise<any>;
}
export declare type TransactionReceipt = any;
export declare type Log = any;
export {};
//# sourceMappingURL=cfxers_providers.d.ts.map