// @ts-nocheck
// XXX get them to export this. Webpack can't pluck the source file so we copy/paste it instead.
// copy-paste (w/ light modification) of
// https://github.com/algorand/js-algorand-sdk/blob/8572eff843d87f47ba0eaaa1d6399ac6408dd639/src/client/urlTokenBaseHTTPClient.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import Url from 'url-parse';
import path from 'path';
import * as request from 'superagent';
/**
 * Implementation of BaseHTTPClient that uses a URL and a token
 * and make the REST queries using superagent.
 * This is the default implementation of BaseHTTPClient.
 */
var URLTokenBaseHTTPClient = /** @class */ (function () {
    function URLTokenBaseHTTPClient(tokenHeader, baseServer, port, defaultHeaders) {
        if (defaultHeaders === void 0) { defaultHeaders = {}; }
        this.defaultHeaders = defaultHeaders;
        var baseServerURL = new Url(baseServer, {});
        if (typeof port !== 'undefined') {
            baseServerURL.set('port', port.toString());
        }
        if (baseServerURL.protocol.length === 0) {
            throw new Error('Invalid base server URL, protocol must be defined.');
        }
        this.baseURL = baseServerURL;
        this.tokenHeader = tokenHeader;
    }
    /**
     * Compute the URL for a path relative to the instance's address
     * @param relativePath - A path string
     * @returns A URL string
     */
    URLTokenBaseHTTPClient.prototype.addressWithPath = function (relativePath) {
        var address = new Url(path.posix.join(this.baseURL.pathname, relativePath), this.baseURL);
        return address.toString();
    };
    /**
     * Convert a superagent response to a valid BaseHTTPClientResponse
     * Modify the superagent response
     * @private
     */
    URLTokenBaseHTTPClient.superagentToHTTPClientResponse = function (res) {
        if (res.body instanceof ArrayBuffer) {
            // Handle the case where the body is an arraybuffer which happens in the browser
            res.body = new Uint8Array(res.body);
        }
        return res;
    };
    /**
     * Make a superagent error more readable. For more info, see https://github.com/visionmedia/superagent/issues/1074
     */
    URLTokenBaseHTTPClient.formatSuperagentError = function (err) {
        if (err.response) {
            try {
                var decoded = JSON.parse(Buffer.from(err.response.body).toString());
                // eslint-disable-next-line no-param-reassign
                err.message = "Network request error. Received status ".concat(err.response.status, ": ").concat(decoded.message);
            }
            catch (err2) {
                // ignore any error that happened while we are formatting the original error
            }
        }
        return err;
    };
    URLTokenBaseHTTPClient.prototype.get = function (relativePath, query, requestHeaders) {
        if (requestHeaders === void 0) { requestHeaders = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var r, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = request
                            .get(this.addressWithPath(relativePath))
                            .set(this.tokenHeader)
                            .set(this.defaultHeaders)
                            .set(requestHeaders)
                            .responseType('arraybuffer')
                            .query(query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, r];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, URLTokenBaseHTTPClient.superagentToHTTPClientResponse(res)];
                    case 3:
                        err_1 = _a.sent();
                        throw URLTokenBaseHTTPClient.formatSuperagentError(err_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    URLTokenBaseHTTPClient.prototype.post = function (relativePath, data, query, requestHeaders) {
        if (requestHeaders === void 0) { requestHeaders = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var r, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = request
                            .post(this.addressWithPath(relativePath))
                            .set(this.tokenHeader)
                            .set(this.defaultHeaders)
                            .set(requestHeaders)
                            .query(query)
                            .serialize(function (o) { return o; }) // disable serialization from superagent
                            .responseType('arraybuffer')
                            .send(Buffer.from(data));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, r];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, URLTokenBaseHTTPClient.superagentToHTTPClientResponse(res)];
                    case 3:
                        err_2 = _a.sent();
                        throw URLTokenBaseHTTPClient.formatSuperagentError(err_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    URLTokenBaseHTTPClient.prototype["delete"] = function (relativePath, data, query, requestHeaders) {
        if (requestHeaders === void 0) { requestHeaders = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var r, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        r = request["delete"](this.addressWithPath(relativePath))
                            .set(this.tokenHeader)
                            .set(this.defaultHeaders)
                            .set(requestHeaders)
                            .query(query)
                            .serialize(function (o) { return o; }) // disable serialization from superagent
                            .responseType('arraybuffer')
                            .send(Buffer.from(data));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, r];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, URLTokenBaseHTTPClient.superagentToHTTPClientResponse(res)];
                    case 3:
                        err_3 = _a.sent();
                        throw URLTokenBaseHTTPClient.formatSuperagentError(err_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return URLTokenBaseHTTPClient;
}());
export { URLTokenBaseHTTPClient };
//# sourceMappingURL=ALGO_UTBC.js.map