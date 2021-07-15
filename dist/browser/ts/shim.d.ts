import type { ethers } from 'ethers';
declare type Process = {
    env: Env;
    stdout: Stdout;
};
declare type Env = {
    REACH_CONNECTOR_MODE?: string;
    REACH_DEBUG?: string;
    ETH_NODE_URI?: string;
    ETH_NET?: string;
    ALGO_FAUCET_PASSPHRASE?: string;
    ALGO_TOKEN?: string;
    ALGO_SERVER?: string;
    ALGO_PORT?: string;
    ALGO_INDEXER_TOKEN?: string;
    ALGO_INDEXER_SERVER?: string;
    ALGO_INDEXER_PORT?: string;
    CFX_NODE_URI?: string;
    CFX_NETWORK_ID?: string;
};
declare type Stdout = {
    write: (data: any) => void;
};
declare const processShim: Process;
declare type Window = {
    ethereum?: ethers.providers.ExternalProvider;
    AlgoSigner?: any;
    conflux?: any;
    prompt?: (s: string) => string | null;
    reach?: any;
};
declare const windowShim: Window;
export { processShim as process, windowShim as window, };
//# sourceMappingURL=shim.d.ts.map