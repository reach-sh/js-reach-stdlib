export declare type Connector = 'ETH' | 'ALGO' | 'FAKE';
export declare type ConnectorMode = 'ETH-test-dockerized-geth' | 'ETH-live' | 'ETH-browser' | 'FAKE-test-embedded-mock' | 'ALGO-test-dockerized-algod' | 'ALGO-live' | 'ALGO-browser';
export declare function canonicalizeConnectorMode(connectorMode: string): ConnectorMode;
export declare function getConnectorMode(): ConnectorMode;
export declare function getConnector(connectorMode?: string): Connector;
//# sourceMappingURL=ConnectorMode.d.ts.map