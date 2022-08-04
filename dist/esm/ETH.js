var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { makeEthLike } from './ETH_like';
import * as ethImpl from './ETH_impl';
import * as ethers from 'ethers';
import * as shared_user from './shared_user';
import * as ETH_compiled from './ETH_compiled';
import * as ETH_compiled_impl from './ETH_compiled_impl';
var _ETH_compiled_impl = ETH_compiled_impl;
void (_ETH_compiled_impl);
export var load = function () {
    var ethers_ = ethers;
    var ethImpl_ = ethImpl;
    var ethLike = makeEthLike(ethImpl_);
    var ETH_compiled_ = ETH_compiled;
    var connector = 'ETH';
    return __assign(__assign(__assign(__assign(__assign(__assign({}, ethers_), ethLike), ethLike.reachStdlib), shared_user), ETH_compiled_), { connector: connector });
};
//# sourceMappingURL=ETH.js.map