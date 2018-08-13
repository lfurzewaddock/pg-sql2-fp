"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compile;

var _debugLog = require("./debug-log");

var _debugLog2 = _interopRequireDefault(_debugLog);

var _enforceValidNode = require("./enforce-valid-node");

var _enforceValidNode2 = _interopRequireDefault(_enforceValidNode);

var _handleSqlIdentifier = require("./handle-sql-identifier");

var _handleSqlIdentifier2 = _interopRequireDefault(_handleSqlIdentifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compile(sql) {
  // Join this to generate the SQL query
  const sqlFragments = [];

  // Values hold the JavaScript values that are represented in the query
  // string by placeholders. They are eager because they were provided before
  // compile time.
  const values = [];

  const items = Array.isArray(sql) ? sql : [sql];

  for (let i = 0, l = items.length; i < l; i += 1) {
    const rawItem = items[i];
    const item = (0, _enforceValidNode2.default)(rawItem);
    switch (item.type) {
      case "RAW":
        if (typeof item.text !== "string") {
          throw (0, _debugLog2.default)(new Error("RAW node expected string"), "compile");
        }
        // If this is just raw text, we add it directly to the query text.
        sqlFragments.push(item.text);
        break;
      case "IDENTIFIER":
        if (item.names.length === 0) {
          throw (0, _debugLog2.default)(new Error("Identifier must have a name"), "compile");
        }
        // If we got an identifier type, escape the strings and get a local
        // identifier for non-string identifiers.
        sqlFragments.push((0, _handleSqlIdentifier2.default)(item.names));
        break;
      case "VALUE":
        // If we got a value SQL item, add a placeholder and add the value to our
        // placeholder values array.
        values.push(item.value);
        sqlFragments.push(`$${values.length}`);
        break;
      default:
        throw (0, _debugLog2.default)(new Error("Sql item type not recognised!"), "compile");
    }
  }

  const text = sqlFragments.join("");
  return {
    text,
    values
  };
}
module.exports = exports["default"];