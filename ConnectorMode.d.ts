export declare type Connector = 'ETH' | 'ALGO' | 'CFX';
export declare type ConnectorMode = 'ETH-test-dockerized-geth' | 'ETH-live' | 'ETH-browser' | 'ALGO-test-dockerized-algod' | 'ALGO-live' | 'ALGO-browser' | 'CFX-devnet' | 'CFX-live' | 'CFX-browser';
export declare function canonicalizeConnectorMode(connectorMode: string): ConnectorMode;
export declare function getConnectorMode(): ConnectorMode;
export declare function getConnector(connectorMode?: string): Connector;
//# sourceMappingURL=ConnectorMode.d.ts.map