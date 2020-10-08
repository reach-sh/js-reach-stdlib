import ethers from 'ethers';
declare type Process = {
    env: Env;
    stdout: Stdout;
};
declare type Env = {
    REACH_CONNECTOR_MODE?: string;
    ETH_NODE_URI?: string;
    ETH_NODE_NETWORK?: string;
};
declare type Stdout = {
    write: (data: any) => void;
};
declare const processShim: Process;
declare type Window = {
    ethereum?: ethers.providers.ExternalProvider;
};
declare const windowShim: Window;
export { processShim as process, windowShim as window, };
//# sourceMappingURL=shim.d.ts.map