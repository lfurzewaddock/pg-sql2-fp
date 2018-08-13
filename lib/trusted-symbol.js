"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trustedSymbol;
/* istanbul ignore next */
var $$trusted = process.env.NODE_ENV === "production" ? Symbol("trusted") : Symbol.for("development"); /* eslint-disable-line prefer-const */

function trustedSymbol() {
  return $$trusted;
}
module.exports = exports["default"];