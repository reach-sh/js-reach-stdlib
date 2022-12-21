import { Stdlib_User } from './interfaces';
import algosdk from 'algosdk';
import { ethers } from 'ethers';
import type { SuggestedParams } from 'algosdk';
import type { WalletTransaction } from './ALGO_ARC11';
import type { BaseHTTPClient } from 'algosdk';
import { IBackend, ISendRecvArgs, IAccount, IContract, SecretKey } from './shared_impl';
import { CBR_Address, CBR_Val } from './CBR';
import { Token, ALGO_Ty } from './ALGO_compiled';
export type { Token } from './ALGO_compiled';
type BigNumber = ethers.BigNumber;
type AnyALGO_Ty = ALGO_Ty<CBR_Val>;
export type Ty = AnyALGO_Ty;
export type Address = string;
type TxnParams = SuggestedParams;
export type NetworkAccount = {
    addr: Address;
    sk?: SecretKey;
};
export type ProviderName = string;
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
export type Backend = IBackend<AnyALGO_Ty> & {
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
            unsupported: Array<string>;
            warnings: Array<string>;
        };
    };
};
export type ContractInfo = BigNumber;
type SendRecvArgs = ISendRecvArgs<Address, Token, AnyALGO_Ty, ContractInfo>;
export type Contract = IContract<ContractInfo, Address, Token, AnyALGO_Ty>;
export type Account = IAccount<NetworkAccount, Backend, Contract, ContractInfo, Token>;
type AdjustTxnParams = (who: CBR_Address, sr: SendRecvArgs, ps: TxnParams) => Promise<TxnParams>;
interface ALGOHacks {
    signSendAndConfirm: any;
    toWTxn: any;
    algosdk: any;
    getTxnParams: any;
    MinTxnFee: any;
    makeTransferTxn: any;
    setFaucet: any;
    setAdjustTxnParams: (atp: AdjustTxnParams) => void;
}
interface ALGOStdlib extends Stdlib_User<Provider, ProviderEnv, ProviderName, Token, ContractInfo, Address, NetworkAccount, Ty, Backend, Contract, Account>, ALGOHacks {
}
export declare const load: () => ALGOStdlib;
//# sourceMappingURL=ALGO.d.ts.map