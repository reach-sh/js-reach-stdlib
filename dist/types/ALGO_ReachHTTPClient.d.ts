import type { BaseHTTPClient, BaseHTTPClientError, BaseHTTPClientResponse } from "algosdk";
import type { Query } from "algosdk/dist/types/src/client/baseHTTPClient";
export declare type Method = 'get' | 'post' | 'delete';
export declare type EventDetails = {
    label: string;
    reqNum: number;
    method: Method;
    relativePath: string;
    data?: Uint8Array;
    query?: Query<string>;
    requestHeaders?: Record<string, string>;
};
export declare type Event = ({
    eventName: 'before';
} | {
    eventName: 'success';
    response: BaseHTTPClientResponse;
} | {
    eventName: 'error';
    err: BaseHTTPClientError | any;
}) & EventDetails;
export declare type EventHandler = (event: Event) => Promise<unknown>;
export declare class ReachHTTPClient implements BaseHTTPClient {
    bc: BaseHTTPClient;
    eh: EventHandler;
    label: string;
    reqNum: number;
    constructor(bc: BaseHTTPClient, label: string, eventHandler: EventHandler);
    _doTheThing(method: Method, relativePath: string, dataMay: [Uint8Array | undefined] | [], query: Query<string> | undefined, requestHeaders: Record<string, string> | undefined): Promise<BaseHTTPClientResponse>;
    get(relativePath: string, query?: Query<string>, requestHeaders?: Record<string, string>): Promise<BaseHTTPClientResponse>;
    post(relativePath: string, data: Uint8Array, query?: Query<string>, requestHeaders?: Record<string, string>): Promise<BaseHTTPClientResponse>;
    delete(relativePath: string, data: Uint8Array, query?: Query<string>, requestHeaders?: Record<string, string>): Promise<BaseHTTPClientResponse>;
}
//# sourceMappingURL=ALGO_ReachHTTPClient.d.ts.map