export declare type EnableFunction = (opts?: EnableOpts) => Promise<EnableResult>;
export interface EnableOpts {
    network?: string;
    accounts?: string[];
}
export interface EnableResult {
    network?: string;
    accounts: string[];
}
export interface WalletTransaction {
    txn: string;
    signers?: string[];
    message?: string;
    stxn?: string;
}
export declare type SignTxnFunction = (txns: WalletTransaction[], opts?: any) => Promise<(string | null)[]>;
export declare type PostTxnsFunction = (stxns: string[]) => Promise<PostTxnsResult>;
export interface PostTxnsResult {
    txId?: string;
}
export declare type SignAndPostTxnsFunction = (txns: WalletTransaction[], opts?: any) => Promise<PostTxnsResult>;
declare type Algodv2 = any;
declare type GetAlgodv2Function = () => Promise<Algodv2>;
declare type Indexer = any;
declare type GetIndexerFunction = () => Promise<Indexer>;
export interface WindowAlgorand {
    enable: EnableFunction;
    signAndPostTxns: SignAndPostTxnsFunction;
    getAlgodv2: GetAlgodv2Function;
    getIndexer: GetIndexerFunction;
}
export declare type ARC11_Wallet = WindowAlgorand;
export {};
//# sourceMappingURL=ALGO_ARC11.d.ts.map