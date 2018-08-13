"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = literal;

var _raw = require("./raw");

var _raw2 = _interopRequireDefault(_raw);

var _value = require("./value");

var _value2 = _interopRequireDefault(_value);

var _escapeSqlLiteral = require("./escape-sql-literal");

var _escapeSqlLiteral2 = _interopRequireDefault(_escapeSqlLiteral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const trueNode = (0, _raw2.default)(`TRUE`); /* eslint-disable-line quotes */
const falseNode = (0, _raw2.default)(`FALSE`); /* eslint-disable-line quotes */
const nullNode = (0, _raw2.default)(`NULL`); /* eslint-disable-line quotes */

/**
 * If the value is simple will inline it into the query, otherwise will defer
 * to value.
 */
function literal(val) {
  // Match alphanumeric string and/or -_@!
  // Block double hyphen -- used for comments
  if (typeof val === "string" && val.match(/^((?!-{2})[-a-zA-Z0-9_@! ])*$/)) {
    return (0, _raw2.default)(`${(0, _escapeSqlLiteral2.default)(val)}`);
  } else if (typeof val === "number" && Number.isFinite(val)) {
    if (Number.isInteger(val)) {
      return (0, _raw2.default)(String(val)); // only digits and hyphen = integer literal
    }
    return (0, _raw2.default)(`'${0 + val}'::float`);
  } else if (typeof val === "boolean") {
    return val ? trueNode : falseNode;
  } else if (val == null) {
    return nullNode;
  }

  return (0, _value2.default)(val);
}
module.exports = exports["default"];