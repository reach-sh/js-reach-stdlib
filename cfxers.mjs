var __assign = (this && this.__assign) || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function(resolve) { resolve(value); }); }
  return new(P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }

    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }

    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] },
    f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;

  function verb(n) { return function(v) { return step([n, v]); }; }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return { value: op[1], done: false };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
          if (op[0] === 6 && _.label < t[1]) { _.label = t[1];
            t = op; break; }
          if (t && _.label < t[2]) { _.label = t[2];
            _.ops.push(op); break; }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) { op = [6, e];
      y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
import cfxsdk from 'js-conflux-sdk';
import ethers from 'ethers';
import * as providers from './cfxers_providers.mjs';
var BigNumber = ethers.BigNumber,
  utils = ethers.utils;
export { BigNumber, utils, providers };
// XXX Convenience export, may want to rethink
export { cfxsdk };
// This file immitates the ethers.js API
// Recursively stringify BigNumbers
function unbn(arg) {
  if (!arg)
    return arg;
  if (arg._isBigNumber)
    return arg.toString();
  if (Array.isArray(arg))
    return arg.map(unbn);
  if (typeof arg === 'string')
    return arg;
  if (Object.keys(arg).length > 0) {
    var newArg = {};
    for (var _i = 0, _a = Object.keys(arg); _i < _a.length; _i++) {
      var k = _a[_i];
      newArg[k] = unbn(arg[k]);
    }
    return newArg;
  }
  return arg;
}

function booleanize(arg) {
  if (typeof arg === 'boolean')
    return arg;
  if (typeof arg === 'number')
    return arg !== 0;
  // I don't quite understand why bools get represented this way sometimes, but they do.
  if (Array.isArray(arg) && arg.length === 1)
    return booleanize(arg[0]);
  // XXX handle more stuff
  throw Error("don't know how to booleanize '" + arg + "': " + typeof arg);
}

function conform(args, tys) {
  // XXX find a better way to do this stuff.
  args = unbn(args);
  if (args.length !== tys.length)
    throw Error("impossible: number of args does not match number of tys");
  for (var i in tys) {
    if (tys[i].type === 'tuple') {
      args[i] = conform(args[i], tys[i].components);
    } else if (tys[i].type === 'bool') {
      args[i] = booleanize(args[i]);
    }
    // XXX handle more stuff
  }
  return args;
}
var Signer = /** @class */ (function() {
  function Signer() {}
  Signer.isSigner = function(x) {
    // XXX
    return x instanceof Wallet;
  };
  return Signer;
}());
export { Signer };
// compare to ethers.Contract
var Contract = /** @class */ (function() {
  // {
  //   getEventTopic: (name: string) => string, // ?
  //   getEvent: (name: string) => {inputs: {name: string}[]},
  //   parseLog: (log: Log) => {args: {[k: string]: any}},
  // }
  function Contract(address, abi, wallet, receiptP) {
    var _this = this;
    this.address = address;
    this._abi = (typeof abi === 'string') ? JSON.parse(abi) : abi;
    this._wallet = wallet;
    this._receiptP = receiptP;
    // @ts-ignore // ???
    this._contract = this._wallet.provider.conflux.Contract({
      abi: this._abi,
      address: this.address
    });
    var self = this;
    this.deployTransaction = {
      hash: undefined,
      wait: function() {
        return __awaiter(_this, void 0, void 0, function() {
          var receipt;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (!receiptP) {
                  throw Error("No receipt promise to wait on");
                }
                return [4 /*yield*/ , self._receiptP];
              case 1:
                receipt = _a.sent();
                self.address = receipt.contractCreated;
                self.deployTransaction.hash = receipt.transactionHash;
                return [2 /*return*/ , providers.ethifyOkReceipt(receipt)];
            }
          });
        });
      }
    };
    for (var _i = 0, _a = this._abi; _i < _a.length; _i++) {
      var item = _a[_i];
      if (item.type === 'function') {
        if (item.name[0] !== '_' && item.name !== 'address' && item.name !== 'deployTransaction' && item.name !== 'interface') {
          this[item.name] = this._makeHandler(item);
        }
      }
    }
    this.interface = new ethers.utils.Interface(this._abi);
  }
  Contract.prototype._makeHandler = function(abiFn) {
    var _this = this;
    var from = this._wallet.getAddress();
    var self = this;
    // return (await getC())[funcName](arg, { value, gasLimit });
    // const r_fn = await callC(funcName, arg, value);
    // r_fn.wait()
    // const ok_r = await fetchAndRejectInvalidReceiptFor(r_maybe.transactionHash);
    return function(arg, txn) {
      return __awaiter(_this, void 0, void 0, function() {
        var transactionReceipt, transactionHash;
        var _this = this;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              arg = unbn(arg);
              // XXX user-configurable gas limit
              // const gas = '50000';
              txn = __assign(__assign({ from: from }, txn), { value: txn.value.toString() });
              return [4 /*yield*/ , self._contract[abiFn.name](arg).sendTransaction(txn).executed()];
            case 1:
              transactionReceipt = _a.sent();
              transactionHash = transactionReceipt.transactionHash;
              return [2 /*return*/ , {
                // XXX not sure what the distinction is supposed to be here
                wait: function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    return __generator(this, function(_a) {
                      return [2 /*return*/ , {
                        transactionHash: transactionHash
                      }];
                    });
                  });
                }
              }];
          }
        });
      });
    };
  };
  return Contract;
}());
export { Contract };
var ContractFactory = /** @class */ (function() {
  function ContractFactory(abi, bytecode, wallet) {
    this.abi = (typeof abi === 'string') ? JSON.parse(abi) : abi;
    this.bytecode = bytecode;
    this.wallet = wallet;
    this.interface = new ethers.utils.Interface(this.abi);
  }
  // compare/contrast
  // https://github.com/ethers-io/ethers.js/blob/master/packages/contracts/src.ts/index.ts
  // XXX this code can return Contract directly
  // Should it wait?
  ContractFactory.prototype.deploy = function() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function() {
      var _a, abi, bytecode, iface, wallet, conflux, txnOverrides, expectedLen, contract, from, value, txn, argsConformed, receiptP;
      return __generator(this, function(_b) {
        _a = this, abi = _a.abi, bytecode = _a.bytecode, iface = _a.interface, wallet = _a.wallet;
        wallet._requireConnected();
        if (!wallet.provider)
          throw Error("Impossible: provider is undefined");
        conflux = wallet.provider.conflux;
        txnOverrides = {};
        if (args.length === iface.deploy.inputs.length + 1) {
          txnOverrides = unbn(args.pop());
        }
        expectedLen = iface.deploy.inputs.length;
        if (args.length !== expectedLen) {
          throw Error("cfxers: contract deployment expected " + expectedLen + " args but got " + args.length);
        }
        contract = conflux.Contract({ abi: abi, bytecode: bytecode });
        from = wallet.getAddress();
        value = BigNumber.from(0).toString();
        txn = __assign({ from: from, value: value }, txnOverrides);
        argsConformed = conform(args, iface.deploy.inputs);
        receiptP = contract.constructor.apply(contract, argsConformed).sendTransaction(txn)
          .executed();
        return [2 /*return*/ , new Contract(undefined, abi, wallet, receiptP)];
      });
    });
  };
  ContractFactory.prototype.getDeployTransaction = function() {
    // XXX
    throw Error("XXX getDeployTransaction on CFX");
  };
  return ContractFactory;
}());
export { ContractFactory };
var Wallet = /** @class */ (function() {
  function Wallet(privateKey, provider) {
    this.privateKey = privateKey;
    if (provider) {
      this.connect(provider);
    }
  }
  Wallet.prototype.connect = function(provider) {
    if (this.provider) {
      throw Error("Wallet already connected");
    }
    this.provider = provider;
    if (this.privateKey) {
      this.account = this.provider.conflux.wallet.addPrivateKey(this.privateKey);
    } else {
      this.account = this.provider.conflux.wallet.addRandom();
    }
    return this;
  };
  Wallet.prototype._requireConnected = function() {
    if (!this.provider) {
      throw Error("Wallet has no Provider, please call .connect()");
    }
    if (!this.account) {
      throw Error("Wallet has no Account, please call .connect()");
    }
  };
  Wallet.prototype.getAddress = function() {
    this._requireConnected();
    if (!this.account)
      throw Error("Impossible: account is undefined");
    return this.account.toString();
  };
  Wallet.prototype.sendTransaction = function(txn) {
    return __awaiter(this, void 0, void 0, function() {
      var from, _a, transactionHashP, transactionHash;
      var _this = this;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            this._requireConnected();
            if (!this.provider)
              throw Error("Impossible: provider is undefined");
            from = this.getAddress();
            txn = __assign(__assign({ from: from }, txn), { value: txn.value.toString() });
            if (!(txn.to instanceof Promise)) return [3 /*break*/ , 2];
            _a = txn;
            return [4 /*yield*/ , txn.to];
          case 1:
            _a.to = _b.sent();
            _b.label = 2;
          case 2:
            transactionHashP = this.provider.conflux.sendTransaction(txn);
            return [4 /*yield*/ , transactionHashP];
          case 3:
            transactionHash = _b.sent();
            return [2 /*return*/ , {
              transactionHash: transactionHash,
              wait: function() {
                return __awaiter(_this, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        // see: https://github.com/Conflux-Chain/js-conflux-sdk/blob/master/docs/how_to_send_tx.md#transactions-stage
                        // @ts-ignore
                        return [4 /*yield*/ , transactionHashP.executed()];
                      case 1:
                        // see: https://github.com/Conflux-Chain/js-conflux-sdk/blob/master/docs/how_to_send_tx.md#transactions-stage
                        // @ts-ignore
                        _a.sent();
                        return [2 /*return*/ , { transactionHash: transactionHash }];
                    }
                  });
                });
              }
            }];
        }
      });
    });
  };
  Wallet.createRandom = function() {
    return new Wallet();
  };
  Wallet.fromMnemonic = function(mnemonic) {
    // TODO
    void(mnemonic);
    throw Error("Account 'from mnemonic' not supported on Conflux, please use secret key");
  };
  return Wallet;
}());
export { Wallet };
//# sourceMappingURL=cfxers.js.map
