export declare const mkStdlibProxy: (lib: any) => Promise<{
    ACC: any[];
    mkACC: (val: any) => number;
    makeHandle: (container: Array<any>) => (val: any) => number;
    rpc_stdlib: any;
}>;
export declare const serveRpc: (backend: any) => Promise<void>;
//# sourceMappingURL=rpc_server.d.ts.map