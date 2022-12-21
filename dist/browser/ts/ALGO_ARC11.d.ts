import type { BaseHTTPClient } from "algosdk";
export type EnableNetworkFunction = (opts?: EnableNetworkOpts) => Promise<EnableNetworkResult>;
export interface EnableNetworkOpts {
    genesisID?: string;
    genesisHash?: string;
}
export interface EnableNetworkResult {
    genesisID: string;
    genesisHash: string;
}
export type EnableAccountsFunction = (opts?: EnableOpts) => Promise<EnableAccountsResult>;
export interface EnableAccountsOpts {
    accounts?: string[];
}
export interface EnableAccountsResult {
    accounts: string[];
}
export type EnableFunction = (opts?: EnableOpts) => Promise<EnableResult>;
export type EnableOpts = EnableNetworkOpts & EnableAccountsOpts;
export type EnableResult = EnableNetworkResult & EnableAccountsResult;
export interface WalletTransaction {
    txn: string;
    signers?: string[];
    message?: string;
    stxn?: string;
}
export type SignTxnsFunction = (txns: WalletTransaction[], opts?: any) => Promise<(string | null)[]>;
export type PostTxnsFunction = (stxns: string[]) => Promise<PostTxnsResult>;
export interface PostTxnsResult {
    txId?: string;
}
export type SignAndPostTxnsFunction = (txns: WalletTransaction[], opts?: any) => Promise<PostTxnsResult>;
export type GetAlgodv2ClientFunction = () => Promise<BaseHTTPClient>;
export type GetIndexerClientFunction = () => Promise<BaseHTTPClient>;
export type DisconnectFunction = () => Promise<void>;
export interface WindowAlgorand {
    enable: EnableFunction;
    enableNetwork?: EnableNetworkFunction;
    enableAccounts?: EnableAccountsFunction;
    signTxns?: SignTxnsFunction;
    postTxns?: PostTxnsFunction;
    signAndPostTxns: SignAndPostTxnsFunction;
    getAlgodv2Client: GetAlgodv2ClientFunction;
    getIndexerClient: GetIndexerClientFunction;
    disconnect?: DisconnectFunction;
}
export type ARC11_Wallet = WindowAlgorand & {
    _env?: any;
};
//# sourceMappingURL=ALGO_ARC11.d.ts.map