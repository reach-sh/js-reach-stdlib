import { Signal } from "./shared_impl";
export default class ALGO_WalletConnect {
    wc: any;
    connected: Signal;
    constructor(wc?: any);
    ensureWC(): Promise<void>;
    disconnect(): Promise<void>;
    ensureSession(): Promise<void>;
    getAddr(): Promise<string>;
    signTxns(txns: string[]): Promise<string[]>;
}
//# sourceMappingURL=ALGO_WalletConnect.d.ts.map