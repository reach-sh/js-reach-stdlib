export declare const mkKont: () => {
    _: {
        k: any;
        i: number;
        UNTRACKED: string;
        untracked: (i: string) => string;
    };
    forget: (i: string) => boolean;
    id: (i: string) => any;
    replace: (i: string, a: any) => string;
    track: (a: any) => Promise<string>;
    was: {
        untracked: (e: Error) => boolean;
    };
};
export declare const mkStdlibProxy: (lib: any, ks: any) => Promise<any>;
export declare const mkReBigNumberify: (l: any) => (n: any) => any;
export declare const serveRpc: (backend: any) => Promise<void>;
//# sourceMappingURL=rpc_server.d.ts.map