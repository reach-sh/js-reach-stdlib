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
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import readline from 'readline';
var _rl = null;

function getRl() {
  if (!_rl) {
    _rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
  return _rl;
}
var ask_ = function(q) {
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [2 /*return*/ , new Promise(function(resolve) {
        var rl = getRl();
        rl.question(q + '\n', function(ans) {
          resolve(ans);
        });
      })];
    });
  });
};
// The validator arg should:
// * return anything but `undefined` on success.
// * throw an Error on failure
// The validator's output will be returned.
export var ask = function(question, validator) {
  return __awaiter(void 0, void 0, void 0, function() {
    var validator_, result, _a, err_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          validator_ = validator || (function(x) { return x; });
          result = undefined;
          _b.label = 1;
        case 1:
          _b.trys.push([1, 3, , 4]);
          _a = validator_;
          return [4 /*yield*/ , (ask_(question))];
        case 2:
          result = _a.apply(void 0, [_b.sent()]);
          return [3 /*break*/ , 4];
        case 3:
          err_1 = _b.sent();
          console.log(err_1.message);
          // TODO: better re-prompt
          question = "valid answer pls? > ";
          return [3 /*break*/ , 4];
        case 4:
          if (result === undefined) return [3 /*break*/ , 1];
          _b.label = 5;
        case 5:
          return [2 /*return*/ , result];
      }
    });
  });
};
export var done = function() {
  getRl().close();
};
// The answer arg be 'y' (true) or 'n' (false)
export var yesno = function(answer) {
  if (answer === 'y') {
    return true;
  } else if (answer === 'n') {
    return false;
  } else {
    throw Error("Only y/n are acceptable.");
  }
};
//# sourceMappingURL=ask.js.map
