export default class ALGO_PeraConnect {
    pc: any;
    accounts: Array<any>;
    constructor(pc?: any);
    ensurePC(): Promise<void>;
    disconnect(): Promise<void>;
    ensureSession(): Promise<void>;
    getAddr(): Promise<string>;
    signTxns(txns: string[]): Promise<string[]>;
}
//# sourceMappingURL=ALGO_PeraConnect.d.ts.map