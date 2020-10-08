export declare type Connector = 'ETH' | 'ALGO' | 'FAKE';
export declare type ConnectorMode = 'ETH-test-dockerized-geth' | 'ETH-test-embedded-ganache' | 'ETH-test-browser-window' | 'FAKE-test-embedded-mock' | 'ALGO-test-dockerized-algod';
export declare function canonicalizeConnectorMode(connectorMode: string): ConnectorMode;
export declare function getConnectorMode(): ConnectorMode;
export declare function getConnector(connectorMode?: string): Connector;
//# sourceMappingURL=ConnectorMode.d.ts.map