export declare const shouldRun: (x: string) => boolean;
export declare const shouldRunExac: (x: string) => boolean;
export declare type Job<T> = () => Promise<T>;
export declare type Xtra = {
    [key: string]: any;
};
export declare const chk: (id: string, actual: any, expected: any, xtra?: Xtra) => void;
export declare const chkErr: (id: string, exp: string, f: Job<void>, xtra?: Xtra) => Promise<void>;
export declare const one: (lab: string, j: Job<void>) => void;
export interface RunOpts {
    howManyAtOnce?: number;
    exitOnFail?: boolean;
}
export declare const run: (opts?: RunOpts) => Promise<void>;
export declare const makeChkExport: (stdlib: any, backend: any) => any;
//# sourceMappingURL=test.d.ts.map