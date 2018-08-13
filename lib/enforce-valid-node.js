"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = enforceValidNode;

var _trustedSymbol = require("./trusted-symbol");

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $$trusted = (0, _trustedSymbol2.default)(); /* eslint-disable-line prefer-const */

function enforceValidNode(node) {
  if (node !== null && typeof node === "object" && node[$$trusted] === true) {
    return node;
  }
  throw new Error(`Expected SQL item, instead received '${String(node)}'.`);
}
module.exports = exports["default"];