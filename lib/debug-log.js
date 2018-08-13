"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debugLog;

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function debugLog(error, namespace = "", msg = "") {
  let err = error;
  if (err !== null && err.stack && err.message) {
    (0, _debug2.default)(`pg-sql2-fp:${namespace}`)(`${msg} %O`, err);
  } else {
    err = null;
    (0, _debug2.default)(`pg-sql2-fp:${namespace}`)(`${msg}`);
  }
  return err;
}
module.exports = exports["default"];