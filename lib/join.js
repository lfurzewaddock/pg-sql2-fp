"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = join;

var _enforceValidNode = require("./enforce-valid-node");

var _enforceValidNode2 = _interopRequireDefault(_enforceValidNode);

var _ensureNonEmptyArray = require("./ensure-non-empty-array");

var _ensureNonEmptyArray2 = _interopRequireDefault(_ensureNonEmptyArray);

var _raw = require("./raw");

var _raw2 = _interopRequireDefault(_raw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Join some Sql items together seperated by a string. Useful when dealing
 * with lists of Sql items that doesn’t make sense as a Sql query.
 */
function join(items, rawSeparator = "") {
  (0, _ensureNonEmptyArray2.default)(items, true);
  if (typeof rawSeparator !== "string") {
    throw new Error("Invalid separator - must be a string");
  }
  const separator = rawSeparator;
  const currentItems = [];
  const sepNode = (0, _raw2.default)(separator);
  for (let i = 0, l = items.length; i < l; i += 1) {
    const rawItem = items[i];
    let itemsToAppend;
    if (Array.isArray(rawItem)) {
      itemsToAppend = rawItem.map(_enforceValidNode2.default);
    } else {
      itemsToAppend = [(0, _enforceValidNode2.default)(rawItem)];
    }
    if (i === 0 || !separator) {
      currentItems.push(...itemsToAppend);
    } else {
      currentItems.push(sepNode, ...itemsToAppend);
    }
  }
  return currentItems;
}
module.exports = exports["default"];