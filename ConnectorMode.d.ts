export type Connector = 'ETH' | 'ALGO';
export type ConnectorMode = 'ETH-devnet' | 'ETH-live' | 'ETH-browser' | 'ALGO-devnet' | 'ALGO-live' | 'ALGO-browser';
export declare function canonicalizeConnectorMode(connectorMode: string): ConnectorMode;
export declare function getConnectorMode(): ConnectorMode;
export declare function getConnector(connectorMode?: string): Connector;
//# sourceMappingURL=ConnectorMode.d.ts.map