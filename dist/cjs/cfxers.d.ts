import cfxsdk from 'js-conflux-sdk';
import { ethers } from 'ethers';
import * as providers from './cfxers_providers';
declare const BigNumber: typeof ethers.BigNumber, utils: typeof ethers.utils;
export { BigNumber, utils, providers };
export { cfxsdk };
export declare class Signer {
    static isSigner(x: any): any;
}
interface IContract {
    [key: string]: any;
}
export declare class Contract implements IContract {
    [k: string]: any;
    _abi: any[];
    _wallet: Wallet;
    _receiptP?: Promise<any>;
    _contract: cfxsdk.Contract;
    address?: string;
    deployTransaction: {
        hash?: string;
        wait: () => Promise<{
            blockNumber: number;
            transactionHash: string;
        }>;
    };
    interface: ethers.utils.Interface;
    constructor(address: string | null | undefined, abi: string | any[], wallet: Wallet, receiptP?: Promise<any>, hash?: string);
    _makeHandler(abiFn: any): any;
}
export declare class ContractFactory {
    abi: any[];
    bytecode: string;
    wallet: Wallet;
    interface: ethers.utils.Interface;
    constructor(abi: string | any[], bytecode: string, wallet: Wallet);
    deploy(...args: any): Promise<Contract>;
    getDeployTransaction(): void;
}
export interface IWallet {
    provider?: providers.Provider;
    connect: (provider: providers.Provider) => this;
    getAddress(): string;
    sendTransaction(txn: any): Promise<{
        transactionHash: string;
        wait: () => Promise<{
            transactionHash: string;
        }>;
    }>;
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
    sendTransaction(txnOrig: any): Promise<{
        transactionHash: string;
        wait: () => Promise<{
            transactionHash: string;
        }>;
    }>;
}
export declare class Wallet implements IWallet {
    privateKey?: string;
    account?: cfxsdk.Account;
    provider?: providers.Provider;
    constructor(privateKey?: string, provider?: providers.Provider);
    connect(provider: providers.Provider): this;
    _requireConnected(): void;
    getAddress(): string;
    sendTransaction(txn: any): Promise<{
        transactionHash: string;
        wait: () => Promise<{
            transactionHash: string;
        }>;
    }>;
    static createRandom(): Wallet;
    static fromMnemonic(mnemonic: string, provider?: providers.Provider): Wallet;
}
//# sourceMappingURL=cfxers.d.ts.map