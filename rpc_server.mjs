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
import { createSecureServer } from 'http2';
import { randomBytes } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import express from 'express';
import { loadStdlib } from './loader.mjs';
import { debug } from './shared_impl.mjs';
var withApiKey = function() {
  var key = process.env.REACH_RPC_KEY;
  if (!key) {
    console.error(['\nPlease populate the `REACH_RPC_KEY` environment variable with a',
      ' strong pre-shared key, e.g.:\n',
      '  $ head -c 24 /dev/urandom | base64\n'
    ].join(''));
    process.exit(1);
  }
  return function(req, res, next) {
    return req.get('X-API-Key') === key ?
      next() :
      res.status(403).json({});
  };
};
export var mkKont = function() {
  // TODO consider replacing stringly-typed exceptions with structured
  // descendants of `Error` base class
  var UNTRACKED = 'Untracked continuation ID:';
  var untracked = function(i) { return UNTRACKED + " " + i; };
  var k = {};
  var i = 0;
  var mkWas = function(m) {
    return function(e) {
      return !!(e.message
        .substr(0, m.length)
        .match("^" + m + "$"));
    };
  };
  var was = {
    untracked: mkWas(UNTRACKED)
  };
  var raise = function(e) {
    throw new Error(e);
  };
  var track = function(a) {
    return __awaiter(void 0, void 0, void 0, function() {
      var rb, id;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/ , randomBytes(24)];
          case 1:
            rb = _a.sent();
            id = i + "_" + rb.toString('hex');
            k[id] = a;
            i++;
            return [2 /*return*/ , id];
        }
      });
    });
  };
  var id = function(i) {
    return k[i] === undefined ?
      raise(untracked(i)) :
      k[i];
  };
  var replace = function(i, a) {
    return k[i] === undefined ?
      raise(untracked(i)) :
      (function() { k[i] = a; return i; })();
  };
  var forget = function(i) {
    return delete k[i];
  };
  return {
    // Internals
    _: {
      k: k,
      i: i,
      UNTRACKED: UNTRACKED,
      untracked: untracked
    },
    // General API
    forget: forget,
    id: id,
    replace: replace,
    track: track,
    was: was
  };
};
export var mkStdlibProxy = function(lib) {
  return __awaiter(void 0, void 0, void 0, function() {
    var account, rpc_stdlib;
    return __generator(this, function(_a) {
      account = mkKont();
      rpc_stdlib = __assign(__assign({}, lib), {
        newTestAccount: function(bal) {
          return __awaiter(void 0, void 0, void 0, function() {
            var _a, _b;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _b = (_a = account).track;
                  return [4 /*yield*/ , lib.newTestAccount(bal)];
                case 1:
                  return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
              }
            });
          });
        },
        getDefaultAccount: function() {
          return __awaiter(void 0, void 0, void 0, function() {
            var _a, _b;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _b = (_a = account).track;
                  return [4 /*yield*/ , lib.getDefaultAccount()];
                case 1:
                  return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
              }
            });
          });
        },
        newAccountFromSecret: function(s) {
          return __awaiter(void 0, void 0, void 0, function() {
            var _a, _b;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _b = (_a = account).track;
                  return [4 /*yield*/ , lib.newAccountFromSecret(s)];
                case 1:
                  return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
              }
            });
          });
        },
        newAccountFromMnemonic: function(s) {
          return __awaiter(void 0, void 0, void 0, function() {
            var _a, _b;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _b = (_a = account).track;
                  return [4 /*yield*/ , lib.newAccountFromMnemonic(s)];
                case 1:
                  return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
              }
            });
          });
        },
        createAccount: function() {
          return __awaiter(void 0, void 0, void 0, function() {
            var _a, _b;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _b = (_a = account).track;
                  return [4 /*yield*/ , lib.createAccount()];
                case 1:
                  return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
              }
            });
          });
        },
        fundFromFaucet: function(id, bal) {
          return lib.fundFromFaucet(account.id(id), bal);
        },
        connectAccount: function(id) {
          return __awaiter(void 0, void 0, void 0, function() {
            var _a, _b;
            return __generator(this, function(_c) {
              switch (_c.label) {
                case 0:
                  _b = (_a = account).track;
                  return [4 /*yield*/ , lib.connectAccount(account.id(id).networkAccount)];
                case 1:
                  return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
              }
            });
          });
        },
        balanceOf: function(id) {
          return __awaiter(void 0, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2 /*return*/ , lib.balanceOf(account.id(id))];
            });
          });
        },
        transfer: function(from, to, bal) {
          return __awaiter(void 0, void 0, void 0, function() {
            return __generator(this, function(_a) {
              return [2 /*return*/ , lib.transfer(account.id(from), account.id(to), bal)];
            });
          });
        }
      });
      return [2 /*return*/ , {
        account: account,
        rpc_stdlib: rpc_stdlib
      }];
    });
  });
};
export var serveRpc = function(backend) {
  return __awaiter(void 0, void 0, void 0, function() {
    var real_stdlib, _a, account, rpc_stdlib, contract, kont, app, route_backend, rpc_acc, rpc_ctc, safely, mkRPC, _loop_1, b, do_kont, mkForget, fetchOrFail, opts, passphrase;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          return [4 /*yield*/ , loadStdlib()];
        case 1:
          real_stdlib = _b.sent();
          return [4 /*yield*/ , mkStdlibProxy(real_stdlib)];
        case 2:
          _a = _b.sent(), account = _a.account, rpc_stdlib = _a.rpc_stdlib;
          contract = mkKont();
          kont = mkKont();
          app = express();
          route_backend = express.Router();
          rpc_acc = {
            attach: function(id) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
              }
              return __awaiter(void 0, void 0, void 0, function() {
                var _a, _b;
                var _c;
                return __generator(this, function(_d) {
                  switch (_d.label) {
                    case 0:
                      _b = (_a = contract).track;
                      return [4 /*yield*/ , (_c = account.id(id)).attach.apply(_c, __spreadArray([backend], args))];
                    case 1:
                      return [2 /*return*/ , _b.apply(_a, [_d.sent()])];
                  }
                });
              });
            },
            deploy: function(id) {
              return __awaiter(void 0, void 0, void 0, function() {
                var _a, _b;
                return __generator(this, function(_c) {
                  switch (_c.label) {
                    case 0:
                      _b = (_a = contract).track;
                      return [4 /*yield*/ , account.id(id).deploy(backend)];
                    case 1:
                      return [2 /*return*/ , _b.apply(_a, [_c.sent()])];
                  }
                });
              });
            },
            getAddress: function(id) {
              return __awaiter(void 0, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      return [4 /*yield*/ , account.id(id).getAddress()];
                    case 1:
                      return [2 /*return*/ , _a.sent()];
                  }
                });
              });
            },
            setGasLimit: function(id) {
              var args = [];
              for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
              }
              return __awaiter(void 0, void 0, void 0, function() {
                var _a;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                    case 0:
                      return [4 /*yield*/ , (_a = account.id(id)).setGasLimit.apply(_a, args)];
                    case 1:
                      return [2 /*return*/ , _b.sent()];
                  }
                });
              });
            }
          };
          rpc_ctc = {
            getInfo: function(id) {
              return __awaiter(void 0, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  return [2 /*return*/ , contract.id(id).getInfo()];
                });
              });
            }
          };
          safely = function(f) {
            return function(req, res) {
              return (function() {
                return __awaiter(void 0, void 0, void 0, function() {
                  var was, client, e_1, _a, s, message;
                  return __generator(this, function(_b) {
                    switch (_b.label) {
                      case 0:
                        was = kont.was;
                        client = "client " + req.ip + ": " + req.method + " " + req.originalUrl + " " + JSON.stringify(req.body);
                        _b.label = 1;
                      case 1:
                        _b.trys.push([1, 3, , 4]);
                        debug("Attempting to process request by " + client);
                        return [4 /*yield*/ , f(req, res)];
                      case 2:
                        _b.sent();
                        return [3 /*break*/ , 4];
                      case 3:
                        e_1 = _b.sent();
                        debug("!! Witnessed exception triggered by " + client + ":\n  " + e_1.stack);
                        _a = was.untracked(e_1) ? [404, String(e_1)] :
                          [500, 'Unspecified fault'], s = _a[0], message = _a[1];
                        if (!res.headersSent) {
                          res.status(s).json({ message: message, request: req.body });
                          debug("!! HTTP " + s + ": \"" + message + "\" response sent to client");
                        } else {
                          res.end();
                          debug("!! Response already initiated; unable to send appropriate payload");
                        }
                        return [3 /*break*/ , 4];
                      case 4:
                        return [2 /*return*/ ];
                    }
                  });
                });
              })();
            };
          };
          mkRPC = function(olab, obj) {
            var router = express.Router();
            var _loop_2 = function(k) {
              router.post("/" + k, safely(function(req, res) {
                return __awaiter(void 0, void 0, void 0, function() {
                  var args, lab, ans;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        args = req.body;
                        lab = "RPC " + olab + "/" + k + " " + JSON.stringify(args);
                        debug("" + lab);
                        return [4 /*yield*/ , obj[k].apply(obj, args)];
                      case 1:
                        ans = _a.sent();
                        debug(lab + " ==> " + JSON.stringify(ans));
                        res.json(ans);
                        return [2 /*return*/ ];
                    }
                  });
                });
              }));
            };
            for (var k in obj) {
              _loop_2(k);
            }
            return router;
          };
          _loop_1 = function(b) {
            route_backend.post("/" + b, safely(function(req, res) {
              return __awaiter(void 0, void 0, void 0, function() {
                var lab, _a, cid, vals, meths, ctc, kid, io, _loop_3, m, ans, new_res;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                    case 0:
                      lab = "RPC backend/" + b;
                      debug(lab + " IN");
                      _a = req.body, cid = _a[0], vals = _a[1], meths = _a[2];
                      ctc = contract.id(cid);
                      return [4 /*yield*/ , kont.track(res)];
                    case 1:
                      kid = _b.sent();
                      lab = lab + " " + cid + " " + kid;
                      debug(lab + " START " + JSON.stringify(req.body));
                      io = __assign({}, vals);
                      if (io["stdlib.hasRandom"]) {
                        delete io["stdlib.hasRandom"];
                        io = __assign(__assign({}, real_stdlib.hasRandom), io);
                      }
                      _loop_3 = function(m) {
                        io[m] = function() {
                          var args = [];
                          for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                          }
                          return new Promise(function(resolve, reject) {
                            debug(lab + " IO " + m + " " + JSON.stringify(args));
                            var old_res = kont.id(kid);
                            kont.replace(kid, { resolve: resolve, reject: reject });
                            old_res.json({ t: "Kont", kid: kid, m: m, args: args });
                          });
                        };
                      };
                      for (m in meths) {
                        _loop_3(m);
                      }
                      return [4 /*yield*/ , backend[b](ctc, io)];
                    case 2:
                      ans = _b.sent();
                      debug(lab + " END " + JSON.stringify(ans));
                      new_res = kont.id(kid);
                      kont.forget(kid);
                      debug(lab + " DONE");
                      new_res.json({ t: "Done", ans: ans });
                      return [2 /*return*/ ];
                  }
                });
              });
            }));
          };
          for (b in backend) {
            _loop_1(b);
          }
          do_kont = safely(function(req, res) {
            return __awaiter(void 0, void 0, void 0, function() {
              var lab, _a, kid, ans, _b, resolve, reject;
              return __generator(this, function(_c) {
                lab = "KONT";
                debug(lab + " IN");
                _a = req.body, kid = _a[0], ans = _a[1];
                lab = lab + " " + kid;
                debug(lab + " ANS " + JSON.stringify(ans));
                _b = kont.id(kid), resolve = _b.resolve, reject = _b.reject;
                void(reject);
                kont.replace(kid, res);
                debug(lab + " OUT");
                resolve(ans);
                return [2 /*return*/ ];
              });
            });
          });
          mkForget = function(K) {
            return safely(function(req, res) {
              return __awaiter(void 0, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  req.body.map(K.forget);
                  res.status(200).json({ deleted: req.body });
                  return [2 /*return*/ ];
                });
              });
            });
          };
          app.use(withApiKey());
          app.use(express.json());
          app.use("/stdlib", mkRPC('stdlib', rpc_stdlib));
          app.use("/acc", mkRPC('acc', rpc_acc));
          app.use("/ctc", mkRPC('ctc', rpc_ctc));
          app.use("/backend", route_backend);
          app.post("/kont", do_kont);
          // Note: successful `/backend/<p>` requests automatically `forget` their
          // continuation ID before yielding a "Done" response; likewise with requests
          // to `/kont` due to their relationship with `/backend/<p>`
          app.post("/forget/acc", mkForget(account));
          app.post("/forget/ctc", mkForget(contract));
          app.post("/stop", safely(function(_, res) {
            return __awaiter(void 0, void 0, void 0, function() {
              return __generator(this, function(_a) {
                res.json(true);
                process.exit(0);
                return [2 /*return*/ ];
              });
            });
          }));
          app.post("/health", safely(function(req, res) {
            return __awaiter(void 0, void 0, void 0, function() {
              return __generator(this, function(_a) {
                void(req);
                res.json(true);
                return [2 /*return*/ ];
              });
            });
          }));
          app.disable('x-powered-by');
          fetchOrFail = function(envvar, desc) {
            var f = process.env[envvar];
            if (!f) {
              console.error(["\nPlease populate the `" + envvar + "` environment variable with",
                " the path to your TLS " + desc + ".\n"
              ].join(''));
              process.exit(1);
            }
            var fq = resolve("./tls/" + f);
            if (!existsSync(fq)) {
              console.error("\nPath: " + fq + " does not exist!\n");
              process.exit(1);
            }
            return readFileSync(fq);
          };
          opts = {
            allowHTTP1: true,
            key: fetchOrFail('REACH_RPC_TLS_KEY', 'private key'),
            cert: fetchOrFail('REACH_RPC_TLS_CRT', 'public certificate')
          };
          passphrase = process.env.REACH_RPC_TLS_PASSPHRASE;
          if (passphrase)
            Object.assign(opts, { passphrase: passphrase });
          // @ts-ignore
          createSecureServer(opts, app)
            .listen(process.env.REACH_RPC_PORT, function() {
              return debug("I am alive");
            });
          return [2 /*return*/ ];
      }
    });
  });
};
//# sourceMappingURL=rpc_server.js.map
