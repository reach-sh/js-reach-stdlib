declare type Process = {
    env: Env;
    stdout: Stdout;
    argv: string[];
    exit: (ec: number) => void;
};
export declare type Env = {
    [key: string]: string | undefined;
};
declare type Stdout = {
    write: (data: any) => void;
};
declare const processShim: Process;
export declare const updateProcessEnv: (x: Env) => void;
declare type Window = {
    [key: string]: any;
};
declare const windowShim: Window;
export { processShim as process, windowShim as window, };
//# sourceMappingURL=shim.d.ts.map