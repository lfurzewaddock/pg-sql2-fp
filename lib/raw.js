"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = raw;

var _debugLog = require("./debug-log");

var _debugLog2 = _interopRequireDefault(_debugLog);

var _trustedSymbol = require("./trusted-symbol");

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeRawNode(text = "", symbol) {
  var trustSymbol = symbol;
  var rawText = text;

  if (typeof symbol === "undefined" || typeof symbol !== "symbol") {
    trustSymbol = (0, _trustedSymbol2.default)();
  } else if (symbol !== (0, _trustedSymbol2.default)()) {
    throw (0, _debugLog2.default)(new Error("Symbol provided is a forgery!"), "makeRawNode");
  }

  if (typeof text !== "string") {
    rawText = String(text);
  }
  return { type: "RAW", text: rawText, [trustSymbol]: true };
}

/**
 * WARNING!: proceed with caution as text is not escaped!
 * Creates a Sql item for raw SQL text. Just plain ol‘ raw SQL.
 * This method is dangerous because it involves no escaping.
 */
function raw(text, symbol) {
  return makeRawNode(text, symbol);
}
module.exports = exports["default"];