import { Signal } from "./shared_impl";
export default function ALGO_MakeWalletConnect(WalletConnect: any, QRCodeModal: any): {
    new (wc?: any): {
        wc: any;
        connected: Signal;
        ensureWC(): Promise<void>;
        disconnect(): Promise<void>;
        ensureSession(): Promise<void>;
        getAddr(): Promise<string>;
        signTxns(txns: string[]): Promise<string[]>;
    };
};
//# sourceMappingURL=ALGO_MakeWalletConnect.d.ts.map