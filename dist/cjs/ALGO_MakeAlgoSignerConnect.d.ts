export default function ALGO_MakeAlgoSignerConnect(AlgoSigner: any, provider: string): {
    new (): {
        connect(): Promise<any>;
        signTransaction(txns: any): Promise<any>;
    };
};
//# sourceMappingURL=ALGO_MakeAlgoSignerConnect.d.ts.map