"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = value;

var _trustedSymbol = require("./trusted-symbol");

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $$trusted = (0, _trustedSymbol2.default)(); /* eslint-disable-line prefer-const */

function makeValueNode(val) {
  return { type: "VALUE", value: val, [$$trusted]: true };
}

/**
 * Creates a Sql item for a value that will be included in our final query.
 * This value will be added in a way which avoids Sql injection.
 */
function value(val) {
  return makeValueNode(val);
}
module.exports = exports["default"];