import cfxsdk from 'js-conflux-sdk';
import { ethers } from 'ethers';
declare const BigNumber: typeof ethers.BigNumber, utils: typeof ethers.utils;
export { BigNumber, utils };
declare type BigNumber = ethers.BigNumber;
declare type EpochNumber = cfxsdk.EpochNumber;
declare type Conflux = cfxsdk.Conflux;
export declare type TransactionReceipt = any;
export declare type Log = any;
export declare type TransactionResponse = {
    transactionHash: string;
    wait: () => Promise<TransactionReceipt>;
};
export declare namespace providers {
    class Provider {
        conflux: Conflux;
        constructor(conflux: Conflux);
        getBalance(address: string, epochNumber?: EpochNumber): Promise<BigNumber>;
        getBlockNumber(): Promise<number>;
        getBlock(which: number): Promise<any>;
        getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
        getCode(address: string, defaultEpoch?: EpochNumber | undefined): Promise<string>;
        on(...argz: any): void;
        off(...argz: any): void;
        getLogs(iopts: object): Promise<any[]>;
        getTransaction(txnHash: string): Promise<any>;
        waitForTransaction(txnHash: string): Promise<TransactionReceipt>;
    }
}
export declare class Signer {
    static isSigner(x: any): any;
}
interface IContract {
    [key: string]: any;
}
export declare class Contract implements IContract {
    [k: string]: any;
    _abi: any[];
    _wallet: IWallet;
    _receiptP?: Promise<any>;
    _contract: cfxsdk.Contract;
    address?: string;
    deployTransaction: TransactionResponse;
    interface: ethers.utils.Interface;
    constructor(address: string | null | undefined, abi: string | any[], wallet: IWallet, receiptP?: Promise<any>, transactionHash?: string);
    _makeHandler(abiFn: any): any;
}
export declare class ContractFactory {
    abi: any[];
    bytecode: string;
    wallet: Wallet;
    interface: ethers.utils.Interface;
    constructor(abi: string | any[], bytecode: string, wallet: Wallet);
    deploy(...args: any): Promise<Contract>;
    getDeployTransaction(...args: any): any;
}
export interface IWallet {
    provider?: providers.Provider;
    connect: (provider: providers.Provider) => this;
    getAddress(): string;
    sendTransaction(txn: any): Promise<TransactionResponse>;
}
export interface CP {
    enable: () => Promise<string[]>;
    sendAsync: any;
}
export declare class BrowserWallet implements IWallet {
    cp: CP;
    address: string;
    provider?: providers.Provider;
    constructor(cp: CP, address: string, provider?: providers.Provider);
    connect(provider: providers.Provider): this;
    _requireConnected(): void;
    getAddress(): string;
    sendTransaction(txnOrig: any): Promise<TransactionResponse>;
}
export declare class Wallet implements IWallet {
    privateKey?: string;
    account?: cfxsdk.Account;
    provider?: providers.Provider;
    _mnemonic?: () => {
        phrase: string;
    };
    constructor(privateKey: string, provider?: providers.Provider, mnem?: any);
    connect(provider: providers.Provider): this;
    _requireConnected(): void;
    getAddress(): string;
    sendTransaction(txn: any): Promise<TransactionResponse>;
    static createRandom(): Wallet;
    static fromMnemonic(mnemonic: string, provider?: providers.Provider): Wallet;
}
//# sourceMappingURL=cfxers.d.ts.map