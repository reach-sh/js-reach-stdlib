import { Stdlib_User } from './interfaces';
import algosdk from 'algosdk';
import { ethers } from 'ethers';
import type { WalletTransaction } from './ALGO_ARC11';
import type { BaseHTTPClient } from 'algosdk';
import { IBackend, IAccount, IContract } from './shared_impl';
import { CBR_Val } from './CBR';
import { Token, ALGO_Ty } from './ALGO_compiled';
export type { Token } from './ALGO_compiled';
declare type BigNumber = ethers.BigNumber;
declare type AnyALGO_Ty = ALGO_Ty<CBR_Val>;
export declare type Ty = AnyALGO_Ty;
export declare type Address = string;
declare type SecretKey = Uint8Array;
export declare type NetworkAccount = {
    addr: Address;
    sk?: SecretKey;
};
export declare type ProviderName = string;
export interface BasicProvider {
    algod_bc: BaseHTTPClient;
    indexer_bc: BaseHTTPClient;
    algodClient: algosdk.Algodv2;
    indexer: algosdk.Indexer;
}
export interface Provider extends BasicProvider {
    nodeWriteOnly: boolean;
    getDefaultAddress: () => Promise<Address>;
    isIsolatedNetwork: boolean;
    signAndPostTxns: (txns: WalletTransaction[], opts?: object) => Promise<unknown>;
}
export interface ProviderEnv {
    ALGO_SERVER: string;
    ALGO_PORT: string;
    ALGO_TOKEN_HEADER: string;
    ALGO_TOKEN: string;
    ALGO_INDEXER_SERVER: string;
    ALGO_INDEXER_PORT: string;
    ALGO_INDEXER_TOKEN_HEADER: string;
    ALGO_INDEXER_TOKEN: string;
    REACH_ISOLATED_NETWORK: string;
    ALGO_NODE_WRITE_ONLY: string;
}
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
interface ALGOHacks {
    signSendAndConfirm: any;
    toWTxn: any;
    algosdk: any;
    getTxnParams: any;
    MinTxnFee: any;
    makeTransferTxn: any;
    setFaucet: any;
}
interface ALGOStdlib extends Stdlib_User<Provider, ProviderEnv, ProviderName, Token, ContractInfo, Address, NetworkAccount, Ty, Backend, Account>, ALGOHacks {
}
export declare const load: () => ALGOStdlib;
//# sourceMappingURL=ALGO.d.ts.map