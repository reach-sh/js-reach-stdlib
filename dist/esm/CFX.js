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
import * as cfxImpl from './CFX_impl';
import * as ethers from './cfxers';
import * as shared_user from './shared_user';
import * as CFX_compiled from './CFX_compiled';
import * as ETH_compiled_impl from './ETH_compiled_impl';
var _ETH_compiled_impl = ETH_compiled_impl;
void (_ETH_compiled_impl);
export var load = function () {
    var ethers_ = ethers;
    var cfxImpl_ = cfxImpl;
    var ethLike = makeEthLike(cfxImpl_);
    var CFX_compiled_ = CFX_compiled;
    var connector = 'CFX';
    return __assign(__assign(__assign(__assign(__assign(__assign({}, ethers_), ethLike), ethLike.reachStdlib), shared_user), CFX_compiled_), { connector: connector });
};
//# sourceMappingURL=CFX.js.map