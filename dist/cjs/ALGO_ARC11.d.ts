import type { BaseHTTPClient } from "algosdk";
export declare type EnableNetworkFunction = (opts?: EnableNetworkOpts) => Promise<EnableNetworkResult>;
export interface EnableNetworkOpts {
    genesisID?: string;
    genesisHash?: string;
}
export interface EnableNetworkResult {
    genesisID: string;
    genesisHash: string;
}
export declare type EnableAccountsFunction = (opts?: EnableOpts) => Promise<EnableAccountsResult>;
export interface EnableAccountsOpts {
    accounts?: string[];
}
export interface EnableAccountsResult {
    accounts: string[];
}
export declare type EnableFunction = (opts?: EnableOpts) => Promise<EnableResult>;
export declare type EnableOpts = EnableNetworkOpts & EnableAccountsOpts;
export declare type EnableResult = EnableNetworkResult & EnableAccountsResult;
export interface WalletTransaction {
    txn: string;
    signers?: string[];
    message?: string;
    stxn?: string;
}
export declare type SignTxnsFunction = (txns: WalletTransaction[], opts?: any) => Promise<(string | null)[]>;
export declare type PostTxnsFunction = (stxns: string[]) => Promise<PostTxnsResult>;
export interface PostTxnsResult {
    txId?: string;
}
export declare type SignAndPostTxnsFunction = (txns: WalletTransaction[], opts?: any) => Promise<PostTxnsResult>;
export declare type GetAlgodv2ClientFunction = () => Promise<BaseHTTPClient>;
export declare type GetIndexerClientFunction = () => Promise<BaseHTTPClient>;
export interface WindowAlgorand {
    enable: EnableFunction;
    enableNetwork?: EnableNetworkFunction;
    enableAccounts?: EnableAccountsFunction;
    signTxns?: SignTxnsFunction;
    postTxns?: PostTxnsFunction;
    signAndPostTxns: SignAndPostTxnsFunction;
    getAlgodv2Client: GetAlgodv2ClientFunction;
    getIndexerClient: GetIndexerClientFunction;
}
export declare type ARC11_Wallet = WindowAlgorand & {
    _env?: any;
};
//# sourceMappingURL=ALGO_ARC11.d.ts.map