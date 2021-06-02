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
var __spreadArray = (this && this.__spreadArray) || function(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
    to[j] = from[i];
  return to;
};
import Timeout from 'await-timeout';
import real_ethers from 'ethers';
import { assert, eq, ge, lt, } from './shared_backend.mjs';
import { memoizeThunk, replaceableThunk, debug, getViewsHelper, deferContract, makeRandom, argsSplit, } from './shared_impl.mjs';
import { bigNumberify, } from './shared_user.mjs';

function isNone(m) {
  return m.length === 0;
}

function isSome(m) {
  return !isNone(m);
}
var Some = function(m) { return [m]; };
var None = [];
void(isSome);
// TODO: add return type once types are in place
export function makeEthLike(ethLikeArgs) {
  var _this = this;
  // ...............................................
  var ethLikeCompiled = ethLikeArgs.ethLikeCompiled,
    ethers = ethLikeArgs.ethers,
    _a = ethLikeArgs.standardDigits,
    standardDigits = _a === void 0 ? 18 : _a,
    providerLib = ethLikeArgs.providerLib,
    isIsolatedNetwork = ethLikeArgs.isIsolatedNetwork,
    isWindowProvider = ethLikeArgs.isWindowProvider,
    _getDefaultNetworkAccount = ethLikeArgs._getDefaultNetworkAccount,
    _getDefaultFaucetNetworkAccount = ethLikeArgs._getDefaultFaucetNetworkAccount,
    _b = ethLikeArgs._verifyContractCode,
    _verifyContractCode = _b === void 0 ? true : _b,
    _c = ethLikeArgs._warnTxNoBlockNumber,
    _warnTxNoBlockNumber = _c === void 0 ? true : _c,
    standardUnit = ethLikeArgs.standardUnit,
    atomicUnit = ethLikeArgs.atomicUnit;
  var getProvider = providerLib.getProvider;
  var stdlib = ethLikeCompiled.stdlib;
  var T_Address = stdlib.T_Address,
    T_Tuple = stdlib.T_Tuple,
    add = stdlib.add,
    addressEq = stdlib.addressEq;
  var reachStdlib = stdlib;
  /** @description convenience function for drilling down to the actual address */
  var getAddr = function(acc) {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            if (!acc.networkAccount)
              throw Error("Expected acc.networkAccount");
            // TODO better type design here
            // @ts-ignore
            if (acc.networkAccount.address) {
              // @ts-ignore
              return [2 /*return*/ , acc.networkAccount.address];
            }
            if (!acc.networkAccount.getAddress) return [3 /*break*/ , 2];
            return [4 /*yield*/ , acc.networkAccount.getAddress()];
          case 1:
            return [2 /*return*/ , _a.sent()];
          case 2:
            throw Error("Expected acc.networkAccount.address or acc.networkAccount.getAddress");
        }
      });
    });
  };
  var rejectInvalidReceiptFor = function(txHash, r) {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        return [2 /*return*/ , new Promise(function(resolve, reject) {
          return !r ? reject("No receipt for txHash: " + txHash) :
            r.transactionHash !== txHash ? reject("Bad txHash; " + txHash + " !== " + r.transactionHash) :
            !r.status ? reject("Transaction: " + txHash + " was reverted by EVM\n" + r) :
            resolve(r);
        })];
      });
    });
  };
  var fetchAndRejectInvalidReceiptFor = function(txHash) {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, r;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            return [4 /*yield*/ , provider.getTransactionReceipt(txHash)];
          case 2:
            r = _a.sent();
            return [4 /*yield*/ , rejectInvalidReceiptFor(txHash, r)];
          case 3:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var getNetworkTimeNumber = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var provider;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            return [4 /*yield*/ , provider.getBlockNumber()];
          case 2:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var fastForwardTo = function(targetTime, onProgress) {
    return __awaiter(_this, void 0, void 0, function() {
      var onProg, currentTime, _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            onProg = onProgress || (function() {});
            requireIsolatedNetwork('fastForwardTo');
            _b.label = 1;
          case 1:
            _a = lt;
            return [4 /*yield*/ , getNetworkTime()];
          case 2:
            if (!_a.apply(void 0, [currentTime = _b.sent(), targetTime])) return [3 /*break*/ , 4];
            onProg({ currentTime: currentTime, targetTime: targetTime });
            return [4 /*yield*/ , stepTime()];
          case 3:
            _b.sent();
            return [3 /*break*/ , 1];
          case 4:
            // Also report progress at completion time
            onProg({ currentTime: currentTime, targetTime: targetTime });
            // console.log(`<<< FFWD TO: ${targetTime} complete. It's ${currentTime}`);
            return [2 /*return*/ , currentTime];
        }
      });
    });
  };
  var requireIsolatedNetwork = function(label) {
    if (!isIsolatedNetwork()) {
      throw Error("Invalid operation " + label + "; network is not isolated");
    }
  };
  var initOrDefaultArgs = function(init) {
    return ({
      argsMay: init ? Some(init.args) : None,
      value: init ? init.value : bigNumberify(0)
    });
  };
  // onProgress callback is optional, it will be given an obj
  // {currentTime, targetTime}
  var actuallyWaitUntilTime = function(targetTime, onProgress) {
    return __awaiter(_this, void 0, void 0, function() {
      var onProg, provider;
      var _this = this;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            onProg = onProgress || (function() {});
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            return [4 /*yield*/ , new Promise(function(resolve) {
              var onBlock = function(currentTimeNum) {
                return __awaiter(_this, void 0, void 0, function() {
                  var currentTime;
                  return __generator(this, function(_a) {
                    currentTime = bigNumberify(currentTimeNum);
                    // Does not block on the progress fn if it is async
                    onProg({ currentTime: currentTime, targetTime: targetTime });
                    if (ge(currentTime, targetTime)) {
                      provider.off('block', onBlock);
                      resolve(currentTime);
                    }
                    return [2 /*return*/ ];
                  });
                });
              };
              provider.on('block', onBlock);
              // Also "re-emit" the current block
              // Note: this sometimes causes the starting block
              // to be processed twice, which should be harmless.
              getNetworkTime().then(onBlock);
            })];
          case 2:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var getDummyAccount = memoizeThunk(function() {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, networkAccount, acc;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            networkAccount = ethers.Wallet.createRandom().connect(provider);
            return [4 /*yield*/ , connectAccount(networkAccount)];
          case 2:
            acc = _a.sent();
            return [2 /*return*/ , acc];
        }
      });
    });
  });
  var stepTime = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var faucet, acc;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            requireIsolatedNetwork('stepTime');
            return [4 /*yield*/ , getFaucet()];
          case 1:
            faucet = _a.sent();
            return [4 /*yield*/ , getDummyAccount()];
          case 2:
            acc = _a.sent();
            return [4 /*yield*/ , transfer(faucet, acc, parseCurrency(0))];
          case 3:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  // ****************************************************************************
  // Common Interface Exports
  // ****************************************************************************
  var _d = makeRandom(32),
    randomUInt = _d.randomUInt,
    hasRandom = _d.hasRandom;
  var balanceOf = function(acc) {
    return __awaiter(_this, void 0, void 0, function() {
      var networkAccount, _a, addr, provider, _b;
      return __generator(this, function(_c) {
        switch (_c.label) {
          case 0:
            networkAccount = acc.networkAccount;
            if (!networkAccount)
              throw Error("acc.networkAccount missing. Got: " + acc);
            if (!networkAccount.getBalance) return [3 /*break*/ , 2];
            _a = bigNumberify;
            return [4 /*yield*/ , networkAccount.getBalance()];
          case 1:
            return [2 /*return*/ , _a.apply(void 0, [_c.sent()])];
          case 2:
            return [4 /*yield*/ , getAddr(acc)];
          case 3:
            addr = _c.sent();
            if (!addr) return [3 /*break*/ , 6];
            return [4 /*yield*/ , getProvider()];
          case 4:
            provider = _c.sent();
            _b = bigNumberify;
            return [4 /*yield*/ , provider.getBalance(addr)];
          case 5:
            return [2 /*return*/ , _b.apply(void 0, [_c.sent()])];
          case 6:
            throw Error("address missing. Got: " + networkAccount);
        }
      });
    });
  };
  var doTxn = function(dhead, tp) {
    return __awaiter(_this, void 0, void 0, function() {
      var rt, rm, ro;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            debug(__assign(__assign({}, dhead), { step: "pre call" }));
            return [4 /*yield*/ , tp];
          case 1:
            rt = _a.sent();
            debug(__assign(__assign({}, dhead), { rt: rt, step: "pre wait" }));
            return [4 /*yield*/ , rt.wait()];
          case 2:
            rm = _a.sent();
            debug(__assign(__assign({}, dhead), { rt: rt, rm: rm, step: "pre receipt" }));
            assert(rm !== null, "receipt wait null");
            return [4 /*yield*/ , fetchAndRejectInvalidReceiptFor(rm.transactionHash)];
          case 3:
            ro = _a.sent();
            debug(__assign(__assign({}, dhead), { rt: rt, rm: rm, ro: ro, step: "post receipt" }));
            // ro's blockNumber might be interesting
            void(ro);
            return [2 /*return*/ ];
        }
      });
    });
  };
  var doCall = function(dhead, ctc, funcName, args, value, gasLimit) {
    return __awaiter(_this, void 0, void 0, function() {
      var dpre;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            dpre = __assign(__assign({}, dhead), { funcName: funcName, args: args, value: value });
            debug(__assign(__assign({}, dpre), { step: "pre call" }));
            return [4 /*yield*/ , doTxn(dpre, ctc[funcName].apply(ctc, __spreadArray(__spreadArray([], args), [{ value: value, gasLimit: gasLimit }])))];
          case 1:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  /** @description Arg order follows "src before dst" convention */
  var transfer = function(from, to, value, token) {
    if (token === void 0) { token = false; }
    return __awaiter(_this, void 0, void 0, function() {
      var sender, receiver, valueb, dhead, txn, tokCtc;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            sender = from.networkAccount;
            receiver = getAddr(to);
            valueb = bigNumberify(value);
            dhead = { kind: 'transfer' };
            if (!!token) return [3 /*break*/ , 2];
            txn = { to: receiver, value: valueb };
            debug('sender.sendTransaction(', txn, ')');
            return [4 /*yield*/ , doTxn(dhead, sender.sendTransaction(txn))];
          case 1:
            return [2 /*return*/ , _a.sent()];
          case 2:
            tokCtc = new ethers.Contract(token, ERC20_ABI, sender);
            return [4 /*yield*/ , doCall(dhead, tokCtc, "transfer", [receiver, valueb], bigNumberify(0), undefined)];
          case 3:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var ERC20_ABI = [{
      "constant": false,
      "inputs": [{
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{
        "name": "account",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "name": "",
        "type": "uint256"
      }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{
          "name": "_recipient",
          "type": "address"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [{
        "name": "",
        "type": "bool"
      }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  var connectAccount = function(networkAccount) {
    return __awaiter(_this, void 0, void 0, function() {
      function setDebugLabel(newLabel) {
        label = newLabel;
        // @ts-ignore
        return this;
      }
      var _a, address, shad, label, iam, selfAddress, gasLimit, setGasLimit, deploy, attach;
      var _this = this;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            if (!(networkAccount.getAddress && !networkAccount.address)) return [3 /*break*/ , 2];
            // @ts-ignore
            _a = networkAccount;
            return [4 /*yield*/ , getAddr({ networkAccount: networkAccount })];
          case 1:
            // @ts-ignore
            _a.address = _b.sent();
            _b.label = 2;
          case 2:
            return [4 /*yield*/ , getAddr({ networkAccount: networkAccount })];
          case 3:
            address = _b.sent();
            if (!address) {
              throw Error("Expected networkAccount.address: " + networkAccount);
            }
            shad = address.substring(2, 6);
            label = shad;
            iam = function(some_addr) {
              if (addressEq(some_addr, address)) {
                return address;
              } else {
                throw Error("I should be " + some_addr + ", but am " + address);
              }
            };
            selfAddress = function() {
              return address;
            };
            setGasLimit = function(ngl) {
              gasLimit = bigNumberify(ngl);
            };
            deploy = function(bin) {
              if (!ethers.Signer.isSigner(networkAccount)) {
                throw Error("Signer required to deploy, " + networkAccount);
              }
              var _a = (function() {
                  var resolveInfo = function(info) { void(info); };
                  var infoP = new Promise(function(resolve) {
                    resolveInfo = resolve;
                  });
                  return { infoP: infoP, resolveInfo: resolveInfo };
                })(),
                infoP = _a.infoP,
                resolveInfo = _a.resolveInfo;
              var performDeploy = function(init) {
                debug(shad, ': performDeploy with', init);
                var _a = initOrDefaultArgs(init),
                  argsMay = _a.argsMay,
                  value = _a.value;
                var _b = bin._Connectors.ETH,
                  ABI = _b.ABI,
                  Bytecode = _b.Bytecode;
                debug(shad, ': making contract factory');
                var factory = new ethers.ContractFactory(ABI, Bytecode, networkAccount);
                (function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    var contract, deploy_r, info;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          debug(shad, ": deploying factory");
                          return [4 /*yield*/ , factory.deploy.apply(factory, __spreadArray(__spreadArray([], argsMay), [{ value: value, gasLimit: gasLimit }]))];
                        case 1:
                          contract = _a.sent();
                          debug(shad, ": deploying factory; done:", contract.address);
                          debug(shad, ": waiting for receipt:", contract.deployTransaction.hash);
                          return [4 /*yield*/ , contract.deployTransaction.wait()];
                        case 2:
                          deploy_r = _a.sent();
                          debug(shad, ": got receipt;", deploy_r.blockNumber);
                          info = {
                            address: contract.address,
                            creation_block: deploy_r.blockNumber,
                            transactionHash: deploy_r.transactionHash,
                            init: init
                          };
                          resolveInfo(info);
                          return [2 /*return*/ ];
                      }
                    });
                  });
                })();
                return attach(bin, infoP);
              };
              var attachDeferDeploy = function() {
                var setImpl;
                var implP = new Promise(function(resolve) { setImpl = resolve; });
                var implNow = {
                  stdlib: stdlib,
                  sendrecv: function(funcNum, evt_cnt, hasLastTime, tys, args, pay, out_tys, onlyIf, soloSend, timeout_delay, sim_p) {
                    return __awaiter(_this, void 0, void 0, function() {
                      var value, toks;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            debug(shad, ":", label, 'sendrecv m', funcNum, "(deferred deploy)");
                            void(evt_cnt);
                            void(sim_p);
                            // TODO: munge/unmunge roundtrip?
                            void(hasLastTime);
                            void(tys);
                            void(out_tys);
                            value = pay[0], toks = pay[1];
                            // The following must be true for the first sendrecv.
                            try {
                              assert(onlyIf, "verifyContract: onlyIf must be true");
                              assert(soloSend, "verifyContract: soloSend must be true");
                              assert(eq(funcNum, 1), "verifyContract: funcNum must be 1");
                              assert(!timeout_delay, "verifyContract: no timeout");
                              assert(toks.length == 0, "verifyContract: no tokens");
                            } catch (e) {
                              throw Error("impossible: Deferred deploy sendrecv assumptions violated.\n" + e);
                            }
                            // shim impl is replaced with real impl
                            setImpl(performDeploy({ args: [
                                [0], args
                              ], value: value }));
                            return [4 /*yield*/ , infoP];
                          case 1:
                            _a.sent(); // Wait for the deploy to actually happen.
                            return [4 /*yield*/ , impl.recv(funcNum, evt_cnt, out_tys, false, timeout_delay)];
                          case 2: // Wait for the deploy to actually happen.
                            // simulated recv
                            return [2 /*return*/ , _a.sent()];
                        }
                      });
                    });
                  }
                };
                var impl = deferContract(true, implP, implNow);
                return impl;
              };
              switch (bin._Connectors.ETH.deployMode) {
                case 'DM_firstMsg':
                  return attachDeferDeploy();
                case 'DM_constructor':
                  return performDeploy();
                default:
                  throw Error("Unrecognized deployMode: " + bin._Connectors.ETH.deployMode);
              };
            };
            attach = function(bin, infoP) {
              // unofficially: infoP can also be Contract
              // This should be considered deprecated
              // TODO: remove at next Reach version bump?
              // @ts-ignore
              if (infoP.getInfo) {
                console.log("Calling attach with another Contract is deprecated." +
                  " Please replace accBob.attach(backend, ctcAlice)" +
                  " with accBob.attach(bin, ctcAlice.getInfo())");
                // @ts-ignore
                infoP = infoP.getInfo();
              }
              var ABI = JSON.parse(bin._Connectors.ETH.ABI);
              // Attached state
              var _a = (function() {
                  var lastBlock = null;
                  var setLastBlock = function(n) {
                    debug("lastBlock from", lastBlock, "to", n);
                    lastBlock = n;
                  };
                  var getLastBlock = function() {
                    return __awaiter(_this, void 0, void 0, function() {
                      var info;
                      return __generator(this, function(_a) {
                        switch (_a.label) {
                          case 0:
                            if (typeof lastBlock === 'number') {
                              return [2 /*return*/ , lastBlock];
                            }
                            return [4 /*yield*/ , infoP];
                          case 1:
                            info = _a.sent();
                            setLastBlock(info.creation_block);
                            return [2 /*return*/ , info.creation_block];
                        }
                      });
                    });
                  };
                  return { getLastBlock: getLastBlock, setLastBlock: setLastBlock };
                })(),
                getLastBlock = _a.getLastBlock,
                setLastBlock = _a.setLastBlock;
              var updateLast = function(o) {
                if (!o.blockNumber) {
                  console.log(o);
                  throw Error("Expected blockNumber in " + Object.keys(o));
                }
                setLastBlock(o.blockNumber);
              };
              var getC = (function() {
                var _ethersC = null;
                return function() {
                  return __awaiter(_this, void 0, void 0, function() {
                    var info;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          if (_ethersC) {
                            return [2 /*return*/ , _ethersC];
                          }
                          return [4 /*yield*/ , infoP];
                        case 1:
                          info = _a.sent();
                          return [4 /*yield*/ , verifyContract(info, bin)];
                        case 2:
                          _a.sent();
                          debug(shad, ": contract verified");
                          if (!ethers.Signer.isSigner(networkAccount)) {
                            throw Error("networkAccount must be a Signer (read: Wallet). " + networkAccount);
                          }
                          // TODO: remove "as" when we figure out how to type the interface for ctors
                          _ethersC = new ethers.Contract(info.address, ABI, networkAccount);
                          return [2 /*return*/ , _ethersC];
                      }
                    });
                  });
                };
              })();
              var callC = function(dhead, funcName, arg, pay) {
                return __awaiter(_this, void 0, void 0, function() {
                  var value, toks, ethersC, zero, actualCall, callTok, maybePayTok;
                  var _this = this;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        value = pay[0], toks = pay[1];
                        return [4 /*yield*/ , getC()];
                      case 1:
                        ethersC = _a.sent();
                        zero = bigNumberify(0);
                        actualCall = function() {
                          return __awaiter(_this, void 0, void 0, function() {
                            return __generator(this, function(_a) {
                              switch (_a.label) {
                                case 0:
                                  return [4 /*yield*/ , doCall(__assign(__assign({}, dhead), { kind: 'reach' }), ethersC, funcName, [arg], value, gasLimit)];
                                case 1:
                                  return [2 /*return*/ , _a.sent()];
                              }
                            });
                          });
                        };
                        callTok = function(tok, amt) {
                          return __awaiter(_this, void 0, void 0, function() {
                            var tokCtc, tokBalance;
                            return __generator(this, function(_a) {
                              switch (_a.label) {
                                case 0:
                                  tokCtc = new ethers.Contract(tok, ERC20_ABI, networkAccount);
                                  return [4 /*yield*/ , tokCtc["balanceOf"](address)];
                                case 1:
                                  tokBalance = _a.sent();
                                  debug(__assign(__assign({}, dhead), { kind: 'token' }), 'balanceOf', tokBalance);
                                  assert(tokBalance.gte(amt), "local account token balance is insufficient: " + tokBalance + " < " + amt);
                                  return [4 /*yield*/ , doCall(__assign(__assign({}, dhead), { kind: 'token' }), tokCtc, "approve", [ethersC.address, amt], zero, gasLimit)];
                                case 2:
                                  _a.sent();
                                  return [2 /*return*/ ];
                              }
                            });
                          });
                        };
                        maybePayTok = function(i) {
                          return __awaiter(_this, void 0, void 0, function() {
                            var _a, amt, tok, e_1;
                            return __generator(this, function(_b) {
                              switch (_b.label) {
                                case 0:
                                  if (!(i < toks.length)) return [3 /*break*/ , 7];
                                  _a = toks[i], amt = _a[0], tok = _a[1];
                                  return [4 /*yield*/ , callTok(tok, amt)];
                                case 1:
                                  _b.sent();
                                  _b.label = 2;
                                case 2:
                                  _b.trys.push([2, 4, , 6]);
                                  return [4 /*yield*/ , maybePayTok(i + 1)];
                                case 3:
                                  _b.sent();
                                  return [3 /*break*/ , 6];
                                case 4:
                                  e_1 = _b.sent();
                                  return [4 /*yield*/ , callTok(tok, zero)];
                                case 5:
                                  _b.sent();
                                  throw e_1;
                                case 6:
                                  return [3 /*break*/ , 9];
                                case 7:
                                  return [4 /*yield*/ , actualCall()];
                                case 8:
                                  _b.sent();
                                  _b.label = 9;
                                case 9:
                                  return [2 /*return*/ ];
                              }
                            });
                          });
                        };
                        return [4 /*yield*/ , maybePayTok(0)];
                      case 2:
                        _a.sent();
                        return [2 /*return*/ ];
                    }
                  });
                });
              };
              var getEventData = function(ok_evt, ok_e) {
                return __awaiter(_this, void 0, void 0, function() {
                  var ethersC, ok_args_abi, args;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/ , getC()];
                      case 1:
                        ethersC = _a.sent();
                        ok_args_abi = ethersC.interface.getEvent(ok_evt).inputs;
                        args = ethersC.interface.parseLog(ok_e).args;
                        return [2 /*return*/ , ok_args_abi.map(function(a) { return args[a.name]; })];
                    }
                  });
                });
              };
              var getLogs = function(fromBlock, toBlock, ok_evt) {
                return __awaiter(_this, void 0, void 0, function() {
                  var ethersC;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        if (fromBlock > toBlock) {
                          return [2 /*return*/ , []];
                        }
                        return [4 /*yield*/ , getC()];
                      case 1:
                        ethersC = _a.sent();
                        return [4 /*yield*/ , getProvider()];
                      case 2:
                        return [4 /*yield*/ , (_a.sent()).getLogs({
                          fromBlock: fromBlock,
                          toBlock: toBlock,
                          address: ethersC.address,
                          topics: [ethersC.interface.getEventTopic(ok_evt)]
                        })];
                      case 3:
                        return [2 /*return*/ , _a.sent()];
                    }
                  });
                });
              };
              var getInfo = function() {
                return __awaiter(_this, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/ , infoP];
                      case 1:
                        return [2 /*return*/ , _a.sent()];
                    }
                  });
                });
              };
              var sendrecv_impl = function(funcNum, evt_cnt, hasLastTime, tys, args, pay, out_tys, onlyIf, soloSend, timeout_delay) {
                return __awaiter(_this, void 0, void 0, function() {
                  var doRecv, funcName, dhead, _a, args_svs, args_msg, _b, tys_svs, tys_msg, arg_ty, arg, lastBlock, block_send_attempt, block_repeat_count, e_2, current_block, error;
                  var _this = this;
                  return __generator(this, function(_c) {
                    switch (_c.label) {
                      case 0:
                        void(hasLastTime);
                        doRecv = function(waitIfNotPresent) {
                          return __awaiter(_this, void 0, void 0, function() {
                            return __generator(this, function(_a) {
                              switch (_a.label) {
                                case 0:
                                  return [4 /*yield*/ , recv_impl(funcNum, out_tys, waitIfNotPresent, timeout_delay)];
                                case 1:
                                  return [2 /*return*/ , _a.sent()];
                              }
                            });
                          });
                        };
                        if (!!onlyIf) return [3 /*break*/ , 2];
                        return [4 /*yield*/ , doRecv(true)];
                      case 1:
                        return [2 /*return*/ , _c.sent()];
                      case 2:
                        funcName = "m" + funcNum;
                        if (tys.length !== args.length) {
                          throw Error("tys.length (" + tys.length + ") !== args.length (" + args.length + ")");
                        }
                        dhead = [shad, label, 'send', funcName, timeout_delay, 'SEND'];
                        debug(__spreadArray(__spreadArray([], dhead), ['ARGS', args]));
                        _a = argsSplit(args, evt_cnt), args_svs = _a[0], args_msg = _a[1];
                        _b = argsSplit(tys, evt_cnt), tys_svs = _b[0], tys_msg = _b[1];
                        arg_ty = T_Tuple([T_Tuple(tys_svs), T_Tuple(tys_msg)]);
                        arg = arg_ty.munge([args_svs, args_msg]);
                        // Make sure the ctc is available and verified (before we get into try/catch)
                        // https://github.com/reach-sh/reach-lang/issues/134
                        return [4 /*yield*/ , getC()];
                      case 3:
                        // Make sure the ctc is available and verified (before we get into try/catch)
                        // https://github.com/reach-sh/reach-lang/issues/134
                        _c.sent();
                        debug(__spreadArray(__spreadArray([], dhead), ['START', arg]));
                        return [4 /*yield*/ , getLastBlock()];
                      case 4:
                        lastBlock = _c.sent();
                        block_send_attempt = lastBlock;
                        block_repeat_count = 0;
                        _c.label = 5;
                      case 5:
                        if (!(!timeout_delay || lt(block_send_attempt, add(lastBlock, timeout_delay)))) return [3 /*break*/ , 15];
                        debug(__spreadArray(__spreadArray([], dhead), ['TRY']));
                        _c.label = 6;
                      case 6:
                        _c.trys.push([6, 8, , 13]);
                        debug(__spreadArray(__spreadArray([], dhead), ['ARG', arg, pay]));
                        return [4 /*yield*/ , callC(dhead, funcName, arg, pay)];
                      case 7:
                        _c.sent();
                        return [3 /*break*/ , 13];
                      case 8:
                        e_2 = _c.sent();
                        if (!!soloSend) return [3 /*break*/ , 9];
                        debug(__spreadArray(__spreadArray([], dhead), ["SKIPPING", e_2]));
                        return [3 /*break*/ , 12];
                      case 9:
                        debug(__spreadArray(__spreadArray([], dhead), ["ERROR", e_2.stack]));
                        // XXX What should we do...? If we fail, but there's no timeout delay... then we should just die
                        return [4 /*yield*/ , Timeout.set(1)];
                      case 10:
                        // XXX What should we do...? If we fail, but there's no timeout delay... then we should just die
                        _c.sent();
                        return [4 /*yield*/ , getNetworkTimeNumber()];
                      case 11:
                        current_block = _c.sent();
                        if (current_block == block_send_attempt) {
                          block_repeat_count++;
                        }
                        block_send_attempt = current_block;
                        if ( /* timeout_delay && */ block_repeat_count > 32) {
                          if (e_2.code === 'UNPREDICTABLE_GAS_LIMIT') {
                            error = e_2;
                            while (error.error) {
                              error = error.error;
                            }
                            console.log("impossible: The message you are trying to send appears to be invalid.");
                            console.log(error);
                          }
                          console.log("args:");
                          console.log(arg);
                          throw Error(dhead + " REPEAT @ " + block_send_attempt + " x " + block_repeat_count);
                        }
                        debug(__spreadArray(__spreadArray([], dhead), ["TRY FAIL", lastBlock, current_block, block_repeat_count, block_send_attempt]));
                        return [3 /*break*/ , 5];
                      case 12:
                        return [3 /*break*/ , 13];
                      case 13:
                        return [4 /*yield*/ , doRecv(false)];
                      case 14:
                        return [2 /*return*/ , _c.sent()];
                      case 15:
                        // XXX If we were trying to join, but we got sniped, then we'll
                        // think that there is a timeout and then we'll wait forever for
                        // the timeout message.
                        debug(__spreadArray(__spreadArray([], dhead), ["FAIL/TIMEOUT"]));
                        return [2 /*return*/ , { didTimeout: true }];
                    }
                  });
                });
              };
              var sendrecv = function(funcNum, evt_cnt, hasLastTime, tys, args, pay, out_tys, onlyIf, soloSend, timeout_delay, sim_p) {
                return __awaiter(_this, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        void(sim_p);
                        return [4 /*yield*/ , sendrecv_impl(funcNum, evt_cnt, hasLastTime, tys, args, pay, out_tys, onlyIf, soloSend, timeout_delay)];
                      case 1:
                        return [2 /*return*/ , _a.sent()];
                    }
                  });
                });
              };
              // https://docs.ethers.io/ethers.js/html/api-contract.html#configuring-events
              var recv_impl = function(okNum, out_tys, waitIfNotPresent, timeout_delay) {
                return __awaiter(_this, void 0, void 0, function() {
                  var isFirstMsgDeploy, lastBlock, ok_evt, block_poll_start_init, block_poll_start, block_poll_end, _loop_1, state_1;
                  var _this = this;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        isFirstMsgDeploy = (okNum == 1) && (bin._Connectors.ETH.deployMode == 'DM_firstMsg');
                        return [4 /*yield*/ , getLastBlock()];
                      case 1:
                        lastBlock = _a.sent();
                        ok_evt = "e" + okNum;
                        debug(shad, ':', label, 'recv', ok_evt, timeout_delay, "--- START");
                        block_poll_start_init = lastBlock + (isFirstMsgDeploy ? 0 : 1);
                        block_poll_start = block_poll_start_init;
                        block_poll_end = block_poll_start;
                        _loop_1 = function() {
                          var es, ok_e, ok_r_1, ok_t, ok_ed, ok_vals, data, getLog_1, getOutput, from;
                          return __generator(this, function(_b) {
                            switch (_b.label) {
                              case 0:
                                debug(shad, ':', label, 'recv', ok_evt, "--- GET", block_poll_start, block_poll_end);
                                return [4 /*yield*/ , getLogs(block_poll_start, block_poll_end, ok_evt)];
                              case 1:
                                es = _b.sent();
                                if (!(es.length == 0)) return [3 /*break*/ , 6];
                                debug(shad, ':', label, 'recv', ok_evt, timeout_delay, "--- RETRY");
                                block_poll_start = block_poll_end;
                                return [4 /*yield*/ , Timeout.set(1)];
                              case 2:
                                _b.sent();
                                return [4 /*yield*/ , getNetworkTimeNumber()];
                              case 3:
                                block_poll_end = _b.sent();
                                if (!(waitIfNotPresent && block_poll_start == block_poll_end)) return [3 /*break*/ , 5];
                                return [4 /*yield*/ , waitUntilTime(bigNumberify(block_poll_end + 1))];
                              case 4:
                                _b.sent();
                                _b.label = 5;
                              case 5:
                                if (block_poll_start <= lastBlock) {
                                  block_poll_start = block_poll_start_init;
                                }
                                return [2 /*return*/ , "continue"];
                              case 6:
                                debug(shad, ':', label, 'recv', ok_evt, timeout_delay, "--- OKAY");
                                ok_e = es[0];
                                return [4 /*yield*/ , fetchAndRejectInvalidReceiptFor(ok_e.transactionHash)];
                              case 7:
                                ok_r_1 = _b.sent();
                                void(ok_r_1);
                                return [4 /*yield*/ , getProvider()];
                              case 8:
                                return [4 /*yield*/ , (_b.sent()).getTransaction(ok_e.transactionHash)];
                              case 9:
                                ok_t = _b.sent();
                                // The .gas field doesn't exist on this anymore, apparently?
                                // debug(`${ok_evt} gas was ${ok_t.gas} ${ok_t.gasPrice}`);
                                if (ok_t.blockNumber) {
                                  assert(ok_t.blockNumber == ok_r_1.blockNumber, 'recept & transaction block numbers should match');
                                  if (ok_e.blockNumber) {
                                    assert(ok_t.blockNumber == ok_e.blockNumber, 'event & transaction block numbers should match');
                                  }
                                } else {
                                  // XXX For some reason ok_t sometimes doesn't have blockNumber
                                  if (_warnTxNoBlockNumber) {
                                    console.log("WARNING: no blockNumber on transaction.");
                                    console.log(ok_t);
                                  }
                                }
                                debug(shad, ':', label, 'recv', ok_evt, "--- AT", ok_r_1.blockNumber);
                                updateLast(ok_r_1);
                                return [4 /*yield*/ , getEventData(ok_evt, ok_e)];
                              case 10:
                                ok_ed = _b.sent();
                                debug(shad, ':', label, 'recv', ok_evt, "--- DATA --", ok_ed);
                                ok_vals = ok_ed[0][1];
                                debug(shad, ':', label, 'recv', ok_evt, "--- MSG --", ok_vals);
                                data = T_Tuple(out_tys).unmunge(ok_vals);
                                getLog_1 = function(l_evt, l_ctc) {
                                  return __awaiter(_this, void 0, void 0, function() {
                                    var dhead, theBlock, l_e, l_ed, l_edu;
                                    return __generator(this, function(_a) {
                                      switch (_a.label) {
                                        case 0:
                                          dhead = [shad, label, 'recv', ok_evt, '--- getLog', l_evt, l_ctc];
                                          debug(dhead);
                                          theBlock = ok_r_1.blockNumber;
                                          return [4 /*yield*/ , getLogs(theBlock, theBlock, l_evt)];
                                        case 1:
                                          l_e = (_a.sent())[0];
                                          dhead = __spreadArray(__spreadArray([], dhead), ['log', l_e]);
                                          debug(dhead);
                                          return [4 /*yield*/ , getEventData(l_evt, l_e)];
                                        case 2:
                                          l_ed = (_a.sent())[0];
                                          dhead = __spreadArray(__spreadArray([], dhead), ['data', l_ed]);
                                          debug(dhead);
                                          l_edu = l_ctc.unmunge(l_ed);
                                          dhead = __spreadArray(__spreadArray([], dhead), ['unmunge', l_edu]);
                                          debug(dhead);
                                          return [2 /*return*/ , l_edu];
                                      }
                                    });
                                  });
                                };
                                getOutput = function(o_lab, o_ctc) {
                                  return getLog_1("oe_" + o_lab, o_ctc);
                                };
                                debug(shad + ": " + label + " recv " + ok_evt + " " + timeout_delay + " --- OKAY --- " + JSON.stringify(ok_vals));
                                from = ok_t.from;
                                return [2 /*return*/ , {
                                  value: {
                                    data: data,
                                    getOutput: getOutput,
                                    from: from,
                                    didTimeout: false,
                                    time: bigNumberify(ok_r_1.blockNumber)
                                  }
                                }];
                            }
                          });
                        };
                        _a.label = 2;
                      case 2:
                        if (!(!timeout_delay || lt(block_poll_start, add(lastBlock, timeout_delay)))) return [3 /*break*/ , 4];
                        return [5 /*yield**/ , _loop_1()];
                      case 3:
                        state_1 = _a.sent();
                        if (typeof state_1 === "object")
                          return [2 /*return*/ , state_1.value];
                        return [3 /*break*/ , 2];
                      case 4:
                        debug(shad, ':', label, 'recv', ok_evt, timeout_delay, '--- TIMEOUT');
                        return [2 /*return*/ , { didTimeout: true }];
                    }
                  });
                });
              };
              var recv = function(okNum, ok_cnt, out_tys, waitIfNotPresent, timeout_delay) {
                return __awaiter(_this, void 0, void 0, function() {
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        void(ok_cnt);
                        return [4 /*yield*/ , recv_impl(okNum, out_tys, waitIfNotPresent, timeout_delay)];
                      case 1:
                        return [2 /*return*/ , _a.sent()];
                    }
                  });
                });
              };
              var wait = function(delta) {
                return __awaiter(_this, void 0, void 0, function() {
                  var lastBlock, p;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/ , getLastBlock()];
                      case 1:
                        lastBlock = _a.sent();
                        // Don't wait from current time, wait from last_block
                        debug('=====Waiting', delta, 'from', lastBlock, ':', address);
                        return [4 /*yield*/ , waitUntilTime(add(lastBlock, delta))];
                      case 2:
                        p = _a.sent();
                        debug('=====Done waiting', delta, 'from', lastBlock, ':', address);
                        return [2 /*return*/ , p];
                    }
                  });
                });
              };
              var creationTime = function() {
                return __awaiter(_this, void 0, void 0, function() {
                  var _a;
                  return __generator(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        _a = bigNumberify;
                        return [4 /*yield*/ , getInfo()];
                      case 1:
                        return [2 /*return*/ , _a.apply(void 0, [(_b.sent()).creation_block])];
                    }
                  });
                });
              };
              var views_bin = bin._getViews({ reachStdlib: reachStdlib });
              var views_namesm = bin._Connectors.ETH.views;
              var getView1 = function(vs, v, k, vim) {
                return function() {
                  var args = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }
                  return __awaiter(_this, void 0, void 0, function() {
                    var ty, ethersC, vkn, val, e_3;
                    return __generator(this, function(_a) {
                      switch (_a.label) {
                        case 0:
                          void(vs);
                          ty = vim.ty;
                          return [4 /*yield*/ , getC()];
                        case 1:
                          ethersC = _a.sent();
                          vkn = views_namesm[v][k];
                          debug('getView1', v, k, args, vkn);
                          _a.label = 2;
                        case 2:
                          _a.trys.push([2, 4, , 5]);
                          return [4 /*yield*/ , ethersC[vkn].apply(ethersC, args)];
                        case 3:
                          val = _a.sent();
                          return [2 /*return*/ , ['Some', ty.unmunge(val)]];
                        case 4:
                          e_3 = _a.sent();
                          debug('getView1', v, k, 'error', e_3);
                          return [2 /*return*/ , ['None', null]];
                        case 5:
                          return [2 /*return*/ ];
                      }
                    });
                  });
                };
              };
              var getViews = getViewsHelper(views_bin, getView1);
              // Note: wait is the local one not the global one of the same name.
              return { getInfo: getInfo, creationTime: creationTime, sendrecv: sendrecv, recv: recv, wait: wait, iam: iam, selfAddress: selfAddress, getViews: getViews, stdlib: stdlib };
            };
            return [2 /*return*/ , { deploy: deploy, attach: attach, networkAccount: networkAccount, setGasLimit: setGasLimit, getAddress: selfAddress, stdlib: stdlib, setDebugLabel: setDebugLabel }];
        }
      });
    });
  };
  var newAccountFromSecret = function(secret) {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, networkAccount, acc;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            networkAccount = (new ethers.Wallet(secret)).connect(provider);
            return [4 /*yield*/ , connectAccount(networkAccount)];
          case 2:
            acc = _a.sent();
            return [2 /*return*/ , acc];
        }
      });
    });
  };
  var newAccountFromMnemonic = function(phrase) {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, networkAccount, acc;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            networkAccount = ethers.Wallet.fromMnemonic(phrase).connect(provider);
            return [4 /*yield*/ , connectAccount(networkAccount)];
          case 2:
            acc = _a.sent();
            return [2 /*return*/ , acc];
        }
      });
    });
  };
  var getDefaultAccount = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            debug("getDefaultAccount");
            if (!(isWindowProvider() || isIsolatedNetwork()))
              throw Error("Default account not available");
            _a = connectAccount;
            return [4 /*yield*/ , _getDefaultNetworkAccount()];
          case 1:
            return [2 /*return*/ , _a.apply(void 0, [_b.sent()])];
        }
      });
    });
  };
  // TODO: Should users be able to access this directly?
  // TODO: define a faucet on Ropsten & other testnets?
  var _e = replaceableThunk(function() {
      return __awaiter(_this, void 0, void 0, function() {
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _a = connectAccount;
              return [4 /*yield*/ , _getDefaultFaucetNetworkAccount()];
            case 1:
              return [4 /*yield*/ , _a.apply(void 0, [_b.sent()])];
            case 2:
              return [2 /*return*/ , _b.sent()];
          }
        });
      });
    }),
    getFaucet = _e[0],
    setFaucet = _e[1];
  var createAccount = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var provider, networkAccount;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            debug("createAccount with 0 balance.");
            return [4 /*yield*/ , getProvider()];
          case 1:
            provider = _a.sent();
            networkAccount = ethers.Wallet.createRandom().connect(provider);
            return [4 /*yield*/ , connectAccount(networkAccount)];
          case 2:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  var fundFromFaucet = function(account, value) {
    return __awaiter(_this, void 0, void 0, function() {
      var faucet;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getFaucet()];
          case 1:
            faucet = _a.sent();
            return [4 /*yield*/ , transfer(faucet, account, value)];
          case 2:
            _a.sent();
            return [2 /*return*/ ];
        }
      });
    });
  };
  var newTestAccount = function(startingBalance) {
    return __awaiter(_this, void 0, void 0, function() {
      var acc, to, e_4;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            debug('newTestAccount(', startingBalance, ')');
            requireIsolatedNetwork('newTestAccount');
            return [4 /*yield*/ , createAccount()];
          case 1:
            acc = _a.sent();
            return [4 /*yield*/ , getAddr(acc)];
          case 2:
            to = _a.sent();
            _a.label = 3;
          case 3:
            _a.trys.push([3, 5, , 6]);
            debug('newTestAccount awaiting transfer:', to);
            return [4 /*yield*/ , fundFromFaucet(acc, startingBalance)];
          case 4:
            _a.sent();
            debug('newTestAccount got transfer:', to);
            return [2 /*return*/ , acc];
          case 5:
            e_4 = _a.sent();
            console.log("newTestAccount: Trouble with account " + to);
            throw e_4;
          case 6:
            return [2 /*return*/ ];
        }
      });
    });
  };
  var getNetworkTime = function() {
    return __awaiter(_this, void 0, void 0, function() {
      var _a;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = bigNumberify;
            return [4 /*yield*/ , getNetworkTimeNumber()];
          case 1:
            return [2 /*return*/ , _a.apply(void 0, [_b.sent()])];
        }
      });
    });
  };
  // onProgress callback is optional, it will be given an obj
  // {currentTime, targetTime}
  var wait = function(delta, onProgress) {
    return __awaiter(_this, void 0, void 0, function() {
      var now;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , getNetworkTime()];
          case 1:
            now = _a.sent();
            return [4 /*yield*/ , waitUntilTime(add(now, delta), onProgress)];
          case 2:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  // onProgress callback is optional, it will be given an obj
  // {currentTime, targetTime}
  var waitUntilTime = function(targetTime, onProgress) {
    return __awaiter(_this, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            targetTime = bigNumberify(targetTime);
            if (!isIsolatedNetwork()) return [3 /*break*/ , 2];
            return [4 /*yield*/ , fastForwardTo(targetTime, onProgress)];
          case 1:
            return [2 /*return*/ , _a.sent()];
          case 2:
            return [4 /*yield*/ , actuallyWaitUntilTime(targetTime, onProgress)];
          case 3:
            return [2 /*return*/ , _a.sent()];
        }
      });
    });
  };
  // Check the contract info and the associated deployed bytecode;
  // Verify that:
  // * it matches the bytecode you are expecting.
  // * it was deployed at exactly creation_block.
  // Throws an Error if any verifications fail
  var verifyContract = function(ctcInfo, backend) {
    return __awaiter(_this, void 0, void 0, function() {
      var _a, ABI, Bytecode, address, creation_block, transactionHash, init, argsMay, factory, r, provider, maxTries, logs, now, tries, waitTillBlock, deployEvent, log, actual, deployData, initLen, setupLen, expected, deployNoInit, actualNoInit, displayLen;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _a = backend._Connectors.ETH, ABI = _a.ABI, Bytecode = _a.Bytecode;
            address = ctcInfo.address, creation_block = ctcInfo.creation_block, transactionHash = ctcInfo.transactionHash, init = ctcInfo.init;
            argsMay = initOrDefaultArgs(init).argsMay;
            factory = new ethers.ContractFactory(ABI, Bytecode);
            debug('verifyContract:', address);
            debug(ctcInfo);
            debug('verifyContract: checking for receipt by txn hash', transactionHash);
            return [4 /*yield*/ , fetchAndRejectInvalidReceiptFor(transactionHash)];
          case 1:
            r = _b.sent();
            debug('verifyContract: got receipt', r);
            return [4 /*yield*/ , getProvider()];
          case 2:
            provider = _b.sent();
            maxTries = isIsolatedNetwork() ? 1 : 2;
            logs = [];
            now = 0;
            tries = 0;
            _b.label = 3;
          case 3:
            if (!(logs.length < 1 && tries < maxTries)) return [3 /*break*/ , 9];
            if (!(tries > 0)) return [3 /*break*/ , 5];
            waitTillBlock = Math.max(now, creation_block) + 1;
            debug('Failed to fetch logs. Waiting some more before we try again', { tries: tries, creation_block: creation_block, now: now, waitTillBlock: waitTillBlock });
            // Let logs show up by just waiting for another block
            // https://github.com/reach-sh/reach-lang/issues/134
            return [4 /*yield*/ , waitUntilTime(bigNumberify(waitTillBlock))];
          case 4:
            // Let logs show up by just waiting for another block
            // https://github.com/reach-sh/reach-lang/issues/134
            _b.sent();
            _b.label = 5;
          case 5:
            return [4 /*yield*/ , getNetworkTimeNumber()];
          case 6:
            now = _b.sent();
            deployEvent = isNone(argsMay) ? 'e0' : 'e1';
            debug('verifyContract: checking logs for', deployEvent, 'from', creation_block, 'to', now, '...');
            return [4 /*yield*/ , provider.getLogs({
              fromBlock: creation_block,
              toBlock: now,
              address: address,
              topics: [factory.interface.getEventTopic(deployEvent)]
            })];
          case 7:
            // https://docs.ethers.io/v5/api/providers/provider/#Provider-getLogs
            // "Keep in mind that many backends will discard old events"
            // TODO: find another way to validate creation block if much time has passed?
            logs = _b.sent();
            _b.label = 8;
          case 8:
            tries++;
            return [3 /*break*/ , 3];
          case 9:
            if (logs.length < 1) {
              throw Error("Contract was claimed to be deployed at " + creation_block + "," +
                (" but the current block is " + now + " and it hasn't been deployed yet."));
            }
            log = logs[0];
            if (log.blockNumber !== creation_block) {
              throw Error("Contract was deployed at blockNumber " + log.blockNumber + "," +
                (" but was claimed to be deployed at " + creation_block + "."));
            }
            if (!_verifyContractCode)
              return [2 /*return*/ , true];
            debug("verifyContract: checking code...");
            return [4 /*yield*/ , provider.getCode(address)];
          case 10:
            actual = _b.sent();
            deployData = factory.getDeployTransaction.apply(factory, argsMay).data;
            if (typeof deployData !== 'string') {
              // TODO: could also be Ethers.utils.bytes, apparently? Or undefined... why?
              throw Error("Impossible: deployData is not string " + deployData);
            }
            if (!deployData.startsWith(backend._Connectors.ETH.Bytecode)) {
              throw Error("Impossible: contract with args is not prefixed by backend Bytecode");
            }
            initLen = 13;
            setupLen = 156;
            expected = deployData.slice(0, initLen) + deployData.slice(initLen + setupLen);
            if (expected.length <= 0) {
              throw Error("Impossible: contract expectation is empty");
            }
            if (actual !== expected) {
              deployNoInit = deployData.slice(initLen);
              actualNoInit = actual.slice(initLen);
              if (actualNoInit.length === 0 || !deployNoInit.includes(actualNoInit)) {
                displayLen = 60;
                console.log('--------------------------------------------');
                console.log('expected start: ' + expected.slice(0, displayLen));
                console.log('actual   start: ' + actual.slice(0, displayLen));
                console.log('--------------------------------------------');
                console.log('expected   end: ' + expected.slice(expected.length - displayLen));
                console.log('actual     end: ' + actual.slice(actual.length - displayLen));
                console.log('--------------------------------------------');
                console.log('expected   len: ' + expected.length);
                console.log('actual     len: ' + actual.length);
                console.log('--------------------------------------------');
                throw Error("Contract bytecode does not match expected bytecode.");
              }
            }
            // We are not checking the balance or the contract storage, because we know
            // that the code is correct and we know that the code mandates the way that
            // those things are initialized
            return [2 /*return*/ , true];
        }
      });
    });
  };
  /**
   * @description  Parse currency by network
   * @param amt  value in the {@link standardUnit} for the network.
   * @returns  the amount in the {@link atomicUnit} of the network.
   * @example  parseCurrency(100).toString() // => '100000000000000000000'
   */
  function parseCurrency(amt) {
    return bigNumberify(real_ethers.utils.parseUnits(amt.toString(), standardDigits));
  }
  var minimumBalance = parseCurrency(0);
  /**
   * @description  Format currency by network
   * @param amt  the amount in the {@link atomicUnit} of the network.
   * @param decimals  up to how many decimal places to display in the {@link standardUnit}.
   *   Trailing zeroes will be omitted. Excess decimal places will be truncated. (not rounded)
   *   This argument defaults to maximum precision.
   * @returns  a string representation of that amount in the {@link standardUnit} for that network.
   * @example  formatCurrency(bigNumberify('100000000000000000000')); // => '100'
   */
  function formatCurrency(amt, decimals) {
    if (decimals === void 0) { decimals = standardDigits; }
    // Recall that 1 WEI = 10e18 ETH
    if (!(Number.isInteger(decimals) && 0 <= decimals)) {
      throw Error("Expected decimals to be a nonnegative integer, but got " + decimals + ".");
    }
    // Truncate
    decimals = Math.min(decimals, standardDigits);
    var decimalsToForget = standardDigits - decimals;
    var divAmt = bigNumberify(amt)
      .div(bigNumberify(10).pow(decimalsToForget));
    var amtStr = real_ethers.utils.formatUnits(divAmt, decimals);
    // If the str ends with .0, chop it off
    if (amtStr.slice(amtStr.length - 2) == ".0") {
      return amtStr.slice(0, amtStr.length - 2);
    } else {
      return amtStr;
    }
  }
  /**
   * Formats an account's address in the way users expect to see it.
   * @param acc Account, NetworkAccount, or hex-encoded address
   * @returns the address formatted as a hex-encoded string
   */
  function formatAddress(acc) {
    return T_Address.canonicalize(acc); // TODO: typing
  }
  // TODO: restore type ann once types are in place
  // const ethLike: EthLike = {
  var ethLike = __assign(__assign(__assign({}, ethLikeCompiled), providerLib), {
    getFaucet: getFaucet,
    setFaucet: setFaucet,
    randomUInt: randomUInt,
    hasRandom: hasRandom,
    balanceOf: balanceOf,
    transfer: transfer,
    connectAccount: connectAccount,
    newAccountFromSecret: newAccountFromSecret,
    newAccountFromMnemonic: newAccountFromMnemonic,
    getDefaultAccount: getDefaultAccount,
    createAccount: createAccount,
    fundFromFaucet: fundFromFaucet,
    newTestAccount: newTestAccount,
    getNetworkTime: getNetworkTime,
    wait: wait,
    waitUntilTime: waitUntilTime,
    verifyContract: verifyContract,
    standardUnit: standardUnit,
    atomicUnit: atomicUnit,
    parseCurrency: parseCurrency,
    minimumBalance: minimumBalance,
    formatCurrency: formatCurrency,
    formatAddress: formatAddress,
    reachStdlib: reachStdlib
  });
  return ethLike;
}
//# sourceMappingURL=ETH_like.js.map
