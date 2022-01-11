import { getConnectorMode, getConnector } from './ConnectorMode';
import type { Stdlib_User } from './interfaces';
export { unsafeAllowMultipleStdlibs } from './registry';
export { getConnectorMode, getConnector };
export declare function loadStdlib(connectorModeOrEnv?: string | {
    [key: string]: string;
}): Stdlib_User<any, any, any, any, any, any, any, any, any, any>;
//# sourceMappingURL=loader.d.ts.map