export default function ALGO_MakePeraConnect(PeraWalletConnect: any): {
    new (pc?: any): {
        pc: any;
        accounts: Array<any>;
        ensurePC(): Promise<void>;
        disconnect(): Promise<void>;
        ensureSession(): Promise<void>;
        getAddr(): Promise<string>;
        signTxns(txns: string[]): Promise<string[]>;
    };
};
//# sourceMappingURL=ALGO_MakePeraConnect.d.ts.map