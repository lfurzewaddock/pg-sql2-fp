module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debugLog;

var _debug = __webpack_require__(8);

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = raw;

var _debugLog = __webpack_require__(0);

var _debugLog2 = _interopRequireDefault(_debugLog);

var _trustedSymbol = __webpack_require__(1);

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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = enforceValidNode;

var _trustedSymbol = __webpack_require__(1);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureNonEmptyArray;

var _debugLog = __webpack_require__(0);

var _debugLog2 = _interopRequireDefault(_debugLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureNonEmptyArray(array, allowZeroLength = false) {
  if (!Array.isArray(array)) {
    throw (0, _debugLog2.default)(new Error("Expected array"), "ensureNonEmptyArray");
  }
  if (!allowZeroLength && array.length < 1) {
    throw (0, _debugLog2.default)(new Error("Expected non-empty array"), "ensureNonEmptyArray");
  }
  for (let idx = 0, l = array.length; idx < l; idx += 1) {
    if (array[idx] == null) {
      throw (0, _debugLog2.default)(new Error(`Array index ${idx} is ${String(array[idx])}`), "ensureNonEmptyArray");
    }
  }
  return array;
}
module.exports = exports["default"];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = value;

var _trustedSymbol = __webpack_require__(1);

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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compile = __webpack_require__(7);

var _compile2 = _interopRequireDefault(_compile);

var _identifier = __webpack_require__(11);

var _identifier2 = _interopRequireDefault(_identifier);

var _join = __webpack_require__(12);

var _join2 = _interopRequireDefault(_join);

var _literal = __webpack_require__(13);

var _literal2 = _interopRequireDefault(_literal);

var _query = __webpack_require__(15);

var _query2 = _interopRequireDefault(_query);

var _raw = __webpack_require__(2);

var _raw2 = _interopRequireDefault(_raw);

var _value = __webpack_require__(5);

var _value2 = _interopRequireDefault(_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.assign(_query2.default, {
  raw: _raw2.default, value: _value2.default, literal: _literal2.default, ident: _identifier2.default, concat: _join2.default, compile: _compile2.default
});
module.exports = exports["default"];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compile;

var _debugLog = __webpack_require__(0);

var _debugLog2 = _interopRequireDefault(_debugLog);

var _enforceValidNode = __webpack_require__(3);

var _enforceValidNode2 = _interopRequireDefault(_enforceValidNode);

var _handleSqlIdentifier = __webpack_require__(9);

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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleSqlIdentifier;

var _debugLog = __webpack_require__(0);

var _debugLog2 = _interopRequireDefault(_debugLog);

var _escapeSqlIdentifier = __webpack_require__(10);

var _escapeSqlIdentifier2 = _interopRequireDefault(_escapeSqlIdentifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleSqlIdentifier(names) {
  if (!Array.isArray(names) || names.length < 1) {
    throw (0, _debugLog2.default)(new Error("Expected non-empty array"), "handleSqlIdentifier");
  }
  // When we come accross a symbol in our identifier, we create a unique
  // alias for it that shouldn’t be in the users schema. This helps maintain
  // sanity when constructing large Sql queries with many aliases.
  let nextSymbolId = 0;

  const symbolToIdentifier = new Map();

  const mapResult = names.map(name => {
    if (typeof name === "string") {
      return (0, _escapeSqlIdentifier2.default)(name);
    }

    if (typeof name === "symbol") {
      // Get the correct identifier string for this symbol.
      let identifierSymbol = symbolToIdentifier.get(name); // get value associated to name

      // If there is no identifier, create one and set it.
      if (typeof identifierSymbol === "undefined") {
        identifierSymbol = `__local_${nextSymbolId += 1}__`; // Manualy create symbol with magic string and increment
        symbolToIdentifier.set(name, identifierSymbol); // set value for the key in the Map object.
      }

      // Return the identifier. As we created it, we do not have to
      // escape it, because we know all of the characters are safe.
      return identifierSymbol;
    }

    throw (0, _debugLog2.default)(new Error(`Expected string or symbol, received '${String(name)}'`), "handleSqlIdentifier");
  }).join(".");

  return mapResult;
}
module.exports = exports["default"];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escapeSqlIdentifier;

var _debugLog = __webpack_require__(0);

var _debugLog2 = _interopRequireDefault(_debugLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Derived from https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/lib/client.js#L306
// Which was ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
// Escapes double quote characters in a string
function escapeSqlIdentifier(str) {
  // return empty string if empty string received;
  if (typeof str !== "string") {
    throw (0, _debugLog2.default)(new Error(`Expected string, received '${String(str)}'`), "escapeSqlIdentifier");
  }

  // return empty string if string with length 0 received;
  if (typeof str === "string" && str.length === 0) {
    return "";
  }

  const dblQuoteEscaped = Array.from(str, char => {
    if (char === '"') {
      /* eslint-disable-line quotes */
      return char + char;
    }
    return char;
  });

  return `"${dblQuoteEscaped.join("")}"`;
}
module.exports = exports["default"];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identifier;

var _trustedSymbol = __webpack_require__(1);

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

var _ensureNonEmptyArray = __webpack_require__(4);

var _ensureNonEmptyArray2 = _interopRequireDefault(_ensureNonEmptyArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $$trusted = (0, _trustedSymbol2.default)(); /* eslint-disable-line prefer-const */

function isStringOrSymbol(val) {
  return typeof val === "string" || typeof val === "symbol";
}

function makeIdentifierNode(names) {
  if (!Array.isArray(names) || !names.every(isStringOrSymbol)) {
    throw new Error("Invalid argument to makeIdentifierNode - expected array of strings/symbols");
  }
  return { type: "IDENTIFIER", names, [$$trusted]: true };
}

/**
 * Creates a Sql item for a Sql identifier. A Sql identifier is anything like
 * a table, schema, or column name. An identifier may also have a namespace,
 * thus why many names are accepted.
 */
function identifier(...names) {
  return makeIdentifierNode((0, _ensureNonEmptyArray2.default)(names));
}
module.exports = exports["default"];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = join;

var _enforceValidNode = __webpack_require__(3);

var _enforceValidNode2 = _interopRequireDefault(_enforceValidNode);

var _ensureNonEmptyArray = __webpack_require__(4);

var _ensureNonEmptyArray2 = _interopRequireDefault(_ensureNonEmptyArray);

var _raw = __webpack_require__(2);

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = literal;

var _raw = __webpack_require__(2);

var _raw2 = _interopRequireDefault(_raw);

var _value = __webpack_require__(5);

var _value2 = _interopRequireDefault(_value);

var _escapeSqlLiteral = __webpack_require__(14);

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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escapeSqlLiteral;

var _debugLog = __webpack_require__(0);

var _debugLog2 = _interopRequireDefault(_debugLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Derived from https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/lib/client.js#L325
// Which was ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
function escapeSqlLiteral(str) {
  var hasBackslash = false;
  var escaped = "\'"; /* eslint-disable-line no-useless-escape */

  // return empty string if empty string received;
  if (typeof str !== "string") {
    throw (0, _debugLog2.default)(new Error(`Expected string, received '${String(str)}'`), "escapeSqlLiteral");
  }

  // return empty string if string with length 0 received;
  if (typeof str === "string" && str.length === 0) {
    return "";
  }

  for (let i = 0; i < str.length; i += 1) {
    const c = str[i];
    if (c === "\'") {
      /* eslint-disable-line no-useless-escape */
      escaped += c + c;
    } else if (c === "\\") {
      escaped += c + c;
      hasBackslash = true;
    } else {
      escaped += c;
    }
  }

  escaped += "\'"; /* eslint-disable-line no-useless-escape */

  if (hasBackslash === true) {
    escaped = ' E' + escaped; /* eslint-disable-line prefer-template */ /* eslint-disable-line quotes */
  }

  return escaped;
}
module.exports = exports["default"];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;

var _enforceValidNode = __webpack_require__(3);

var _enforceValidNode2 = _interopRequireDefault(_enforceValidNode);

var _raw = __webpack_require__(2);

var _raw2 = _interopRequireDefault(_raw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A template string tag that creates a `Sql` query out of some strings and
 * some values. Use this to construct all PostgreSQL queries to avoid SQL
 * injection.
 *
 * Note that using this function, the user *must* specify if they are injecting
 * raw text. This makes a SQL injection vulnerability harder to create.
 */
function query(strings, ...values) {
  if (!Array.isArray(strings)) {
    throw new Error("query should be used as a template literal, not a function call!");
  }
  const items = [];
  for (let i = 0, l = strings.length; i < l; i += 1) {
    const text = strings[i];
    if (text.length > 0) {
      items.push((0, _raw2.default)(text));
    }
    if (values[i]) {
      const value = values[i];
      if (Array.isArray(value)) {
        const nodes = value.map(_enforceValidNode2.default);
        items.push(...nodes);
      } else {
        const node = (0, _enforceValidNode2.default)(value);
        items.push(node);
      }
    }
  }
  return items;
}
module.exports = exports["default"];

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjYwMTg0YjdjYmJlOTIzNjZhYzMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlYnVnLWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJ1c3RlZC1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jhdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5mb3JjZS12YWxpZC1ub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnN1cmUtbm9uLWVtcHR5LWFycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVidWdcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGFuZGxlLXNxbC1pZGVudGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9lc2NhcGUtc3FsLWlkZW50aWZpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lkZW50aWZpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pvaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpdGVyYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzY2FwZS1zcWwtbGl0ZXJhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlcnkuanMiXSwibmFtZXMiOlsiZGVidWdMb2ciLCJlcnJvciIsIm5hbWVzcGFjZSIsIm1zZyIsImVyciIsInN0YWNrIiwibWVzc2FnZSIsInRydXN0ZWRTeW1ib2wiLCIkJHRydXN0ZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJTeW1ib2wiLCJmb3IiLCJyYXciLCJtYWtlUmF3Tm9kZSIsInRleHQiLCJzeW1ib2wiLCJ0cnVzdFN5bWJvbCIsInJhd1RleHQiLCJFcnJvciIsIlN0cmluZyIsInR5cGUiLCJlbmZvcmNlVmFsaWROb2RlIiwibm9kZSIsImVuc3VyZU5vbkVtcHR5QXJyYXkiLCJhcnJheSIsImFsbG93WmVyb0xlbmd0aCIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImlkeCIsImwiLCJ2YWx1ZSIsIm1ha2VWYWx1ZU5vZGUiLCJ2YWwiLCJPYmplY3QiLCJhc3NpZ24iLCJxdWVyeSIsImxpdGVyYWwiLCJpZGVudCIsImlkZW50aWZpZXIiLCJjb25jYXQiLCJqb2luIiwiY29tcGlsZSIsInNxbCIsInNxbEZyYWdtZW50cyIsInZhbHVlcyIsIml0ZW1zIiwiaSIsInJhd0l0ZW0iLCJpdGVtIiwicHVzaCIsIm5hbWVzIiwiaGFuZGxlU3FsSWRlbnRpZmllciIsIm5leHRTeW1ib2xJZCIsInN5bWJvbFRvSWRlbnRpZmllciIsIk1hcCIsIm1hcFJlc3VsdCIsIm1hcCIsIm5hbWUiLCJpZGVudGlmaWVyU3ltYm9sIiwiZ2V0Iiwic2V0IiwiZXNjYXBlU3FsSWRlbnRpZmllciIsInN0ciIsImRibFF1b3RlRXNjYXBlZCIsImZyb20iLCJjaGFyIiwiaXNTdHJpbmdPclN5bWJvbCIsIm1ha2VJZGVudGlmaWVyTm9kZSIsImV2ZXJ5IiwicmF3U2VwYXJhdG9yIiwic2VwYXJhdG9yIiwiY3VycmVudEl0ZW1zIiwic2VwTm9kZSIsIml0ZW1zVG9BcHBlbmQiLCJ0cnVlTm9kZSIsImZhbHNlTm9kZSIsIm51bGxOb2RlIiwibWF0Y2giLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImlzSW50ZWdlciIsImVzY2FwZVNxbExpdGVyYWwiLCJoYXNCYWNrc2xhc2giLCJlc2NhcGVkIiwiYyIsInN0cmluZ3MiLCJub2RlcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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Ozs7Ozs7OztBQVFlLFNBQVNBLEtBQVQsQ0FBZWtELE9BQWYsRUFBd0IsR0FBR3pDLE1BQTNCLEVBQW1DO0FBQ2hELE1BQUksQ0FBQ25CLE1BQU1DLE9BQU4sQ0FBYzJELE9BQWQsQ0FBTCxFQUE2QjtBQUMzQixVQUFNLElBQUlwRSxLQUFKLENBQVUsa0VBQVYsQ0FBTjtBQUNEO0FBQ0QsUUFBTTRCLFFBQVEsRUFBZDtBQUNBLE9BQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdqQixJQUFJd0QsUUFBUTFELE1BQTVCLEVBQW9DbUIsSUFBSWpCLENBQXhDLEVBQTJDaUIsS0FBSyxDQUFoRCxFQUFtRDtBQUNqRCxVQUFNakMsT0FBT3dFLFFBQVF2QyxDQUFSLENBQWI7QUFDQSxRQUFJakMsS0FBS2MsTUFBTCxHQUFjLENBQWxCLEVBQXFCO0FBQ25Ca0IsWUFBTUksSUFBTixDQUFXLG1CQUFJcEMsSUFBSixDQUFYO0FBQ0Q7QUFDRCxRQUFJK0IsT0FBT0UsQ0FBUCxDQUFKLEVBQWU7QUFDYixZQUFNaEIsUUFBUWMsT0FBT0UsQ0FBUCxDQUFkO0FBQ0EsVUFBSXJCLE1BQU1DLE9BQU4sQ0FBY0ksS0FBZCxDQUFKLEVBQTBCO0FBQ3hCLGNBQU13RCxRQUFReEQsTUFBTTBCLEdBQU4sQ0FBVXBDLDBCQUFWLENBQWQ7QUFDQXlCLGNBQU1JLElBQU4sQ0FBVyxHQUFHcUMsS0FBZDtBQUNELE9BSEQsTUFHTztBQUNMLGNBQU1qRSxPQUFPLGdDQUFpQlMsS0FBakIsQ0FBYjtBQUNBZSxjQUFNSSxJQUFOLENBQVc1QixJQUFYO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsU0FBT3dCLEtBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDYpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGY2MDE4NGI3Y2JiZTkyMzY2YWMzIiwiaW1wb3J0IGRlYnVnIGZyb20gXCJkZWJ1Z1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJ1Z0xvZyhlcnJvciwgbmFtZXNwYWNlID0gXCJcIiwgbXNnID0gXCJcIikge1xuICBsZXQgZXJyID0gZXJyb3I7XG4gIGlmIChlcnIgIT09IG51bGwgJiYgZXJyLnN0YWNrICYmIGVyci5tZXNzYWdlKSB7XG4gICAgZGVidWcoYHBnLXNxbDItZnA6JHtuYW1lc3BhY2V9YCkoYCR7bXNnfSAlT2AsIGVycik7XG4gIH0gZWxzZSB7XG4gICAgZXJyID0gbnVsbDtcbiAgICBkZWJ1ZyhgcGctc3FsMi1mcDoke25hbWVzcGFjZX1gKShgJHttc2d9YCk7XG4gIH1cbiAgcmV0dXJuIGVycjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWJ1Zy1sb2cuanMiLCIvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyICQkdHJ1c3RlZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IFN5bWJvbChcInRydXN0ZWRcIikgOiBTeW1ib2wuZm9yKFwiZGV2ZWxvcG1lbnRcIik7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLWNvbnN0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRydXN0ZWRTeW1ib2woKSB7XG4gIHJldHVybiAkJHRydXN0ZWQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHJ1c3RlZC1zeW1ib2wuanMiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG5pbXBvcnQgdHJ1c3RlZFN5bWJvbCBmcm9tIFwiLi90cnVzdGVkLXN5bWJvbFwiO1xuXG5mdW5jdGlvbiBtYWtlUmF3Tm9kZSh0ZXh0ID0gXCJcIiwgc3ltYm9sKSB7XG4gIHZhciB0cnVzdFN5bWJvbCA9IHN5bWJvbDtcbiAgdmFyIHJhd1RleHQgPSB0ZXh0O1xuXG4gIGlmICh0eXBlb2Ygc3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBzeW1ib2wgIT09IFwic3ltYm9sXCIpIHtcbiAgICB0cnVzdFN5bWJvbCA9IHRydXN0ZWRTeW1ib2woKTtcbiAgfSBlbHNlIGlmIChzeW1ib2wgIT09IHRydXN0ZWRTeW1ib2woKSkge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIlN5bWJvbCBwcm92aWRlZCBpcyBhIGZvcmdlcnkhXCIpLCBcIm1ha2VSYXdOb2RlXCIpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0ZXh0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmF3VGV4dCA9IFN0cmluZyh0ZXh0KTtcbiAgfVxuICByZXR1cm4geyB0eXBlOiBcIlJBV1wiLCB0ZXh0OiByYXdUZXh0LCBbdHJ1c3RTeW1ib2xdOiB0cnVlIH07XG59XG5cbi8qKlxuICogV0FSTklORyE6IHByb2NlZWQgd2l0aCBjYXV0aW9uIGFzIHRleHQgaXMgbm90IGVzY2FwZWQhXG4gKiBDcmVhdGVzIGEgU3FsIGl0ZW0gZm9yIHJhdyBTUUwgdGV4dC4gSnVzdCBwbGFpbiBvbOKAmCByYXcgU1FMLlxuICogVGhpcyBtZXRob2QgaXMgZGFuZ2Vyb3VzIGJlY2F1c2UgaXQgaW52b2x2ZXMgbm8gZXNjYXBpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhdyh0ZXh0LCBzeW1ib2wpIHtcbiAgcmV0dXJuIG1ha2VSYXdOb2RlKHRleHQsIHN5bWJvbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmF3LmpzIiwiXG5pbXBvcnQgdHJ1c3RlZFN5bWJvbCBmcm9tIFwiLi90cnVzdGVkLXN5bWJvbFwiO1xuXG52YXIgJCR0cnVzdGVkID0gdHJ1c3RlZFN5bWJvbCgpOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdCAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmZvcmNlVmFsaWROb2RlKG5vZGUpIHtcbiAgaWYgKG5vZGUgIT09IG51bGwgJiYgdHlwZW9mIG5vZGUgPT09IFwib2JqZWN0XCIgJiYgbm9kZVskJHRydXN0ZWRdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBTUUwgaXRlbSwgaW5zdGVhZCByZWNlaXZlZCAnJHtTdHJpbmcobm9kZSl9Jy5gKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbmZvcmNlLXZhbGlkLW5vZGUuanMiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuc3VyZU5vbkVtcHR5QXJyYXkoYXJyYXksIGFsbG93WmVyb0xlbmd0aCA9IGZhbHNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBhcnJheVwiKSwgXCJlbnN1cmVOb25FbXB0eUFycmF5XCIpO1xuICB9XG4gIGlmICghYWxsb3daZXJvTGVuZ3RoICYmIGFycmF5Lmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBub24tZW1wdHkgYXJyYXlcIiksIFwiZW5zdXJlTm9uRW1wdHlBcnJheVwiKTtcbiAgfVxuICBmb3IgKGxldCBpZHggPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpZHggPCBsOyBpZHggKz0gMSkge1xuICAgIGlmIChhcnJheVtpZHhdID09IG51bGwpIHtcbiAgICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihgQXJyYXkgaW5kZXggJHtpZHh9IGlzICR7U3RyaW5nKGFycmF5W2lkeF0pfWApLCBcImVuc3VyZU5vbkVtcHR5QXJyYXlcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnN1cmUtbm9uLWVtcHR5LWFycmF5LmpzIiwiaW1wb3J0IHRydXN0ZWRTeW1ib2wgZnJvbSBcIi4vdHJ1c3RlZC1zeW1ib2xcIjtcblxudmFyICQkdHJ1c3RlZCA9IHRydXN0ZWRTeW1ib2woKTsgLyogZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItY29uc3QgKi9cblxuZnVuY3Rpb24gbWFrZVZhbHVlTm9kZSh2YWwpIHtcbiAgcmV0dXJuIHsgdHlwZTogXCJWQUxVRVwiLCB2YWx1ZTogdmFsLCBbJCR0cnVzdGVkXTogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBTcWwgaXRlbSBmb3IgYSB2YWx1ZSB0aGF0IHdpbGwgYmUgaW5jbHVkZWQgaW4gb3VyIGZpbmFsIHF1ZXJ5LlxuICogVGhpcyB2YWx1ZSB3aWxsIGJlIGFkZGVkIGluIGEgd2F5IHdoaWNoIGF2b2lkcyBTcWwgaW5qZWN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWx1ZSh2YWwpIHtcbiAgcmV0dXJuIG1ha2VWYWx1ZU5vZGUodmFsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92YWx1ZS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgY29tcGlsZSBmcm9tIFwiLi9jb21waWxlXCI7XG5pbXBvcnQgaWRlbnRpZmllciBmcm9tIFwiLi9pZGVudGlmaWVyXCI7XG5pbXBvcnQgam9pbiBmcm9tIFwiLi9qb2luXCI7XG5pbXBvcnQgbGl0ZXJhbCBmcm9tIFwiLi9saXRlcmFsXCI7XG5pbXBvcnQgcXVlcnkgZnJvbSBcIi4vcXVlcnlcIjtcbmltcG9ydCByYXcgZnJvbSBcIi4vcmF3XCI7XG5pbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihxdWVyeSwge1xuICByYXcsIHZhbHVlLCBsaXRlcmFsLCBpZGVudDogaWRlbnRpZmllciwgY29uY2F0OiBqb2luLCBjb21waWxlLFxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbmltcG9ydCBlbmZvcmNlVmFsaWROb2RlIGZyb20gXCIuL2VuZm9yY2UtdmFsaWQtbm9kZVwiO1xuaW1wb3J0IGhhbmRsZVNxbElkZW50aWZpZXIgZnJvbSBcIi4vaGFuZGxlLXNxbC1pZGVudGlmaWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBpbGUoc3FsKSB7XG4gIC8vIEpvaW4gdGhpcyB0byBnZW5lcmF0ZSB0aGUgU1FMIHF1ZXJ5XG4gIGNvbnN0IHNxbEZyYWdtZW50cyA9IFtdO1xuXG4gIC8vIFZhbHVlcyBob2xkIHRoZSBKYXZhU2NyaXB0IHZhbHVlcyB0aGF0IGFyZSByZXByZXNlbnRlZCBpbiB0aGUgcXVlcnlcbiAgLy8gc3RyaW5nIGJ5IHBsYWNlaG9sZGVycy4gVGhleSBhcmUgZWFnZXIgYmVjYXVzZSB0aGV5IHdlcmUgcHJvdmlkZWQgYmVmb3JlXG4gIC8vIGNvbXBpbGUgdGltZS5cbiAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHNxbCkgPyBzcWwgOiBbc3FsXTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJhd0l0ZW0gPSBpdGVtc1tpXTtcbiAgICBjb25zdCBpdGVtID0gZW5mb3JjZVZhbGlkTm9kZShyYXdJdGVtKTtcbiAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgY2FzZSBcIlJBV1wiOlxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0udGV4dCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIlJBVyBub2RlIGV4cGVjdGVkIHN0cmluZ1wiKSwgXCJjb21waWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoaXMgaXMganVzdCByYXcgdGV4dCwgd2UgYWRkIGl0IGRpcmVjdGx5IHRvIHRoZSBxdWVyeSB0ZXh0LlxuICAgICAgICBzcWxGcmFnbWVudHMucHVzaChpdGVtLnRleHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJJREVOVElGSUVSXCI6XG4gICAgICAgIGlmIChpdGVtLm5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIklkZW50aWZpZXIgbXVzdCBoYXZlIGEgbmFtZVwiKSwgXCJjb21waWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGdvdCBhbiBpZGVudGlmaWVyIHR5cGUsIGVzY2FwZSB0aGUgc3RyaW5ncyBhbmQgZ2V0IGEgbG9jYWxcbiAgICAgICAgLy8gaWRlbnRpZmllciBmb3Igbm9uLXN0cmluZyBpZGVudGlmaWVycy5cbiAgICAgICAgc3FsRnJhZ21lbnRzLnB1c2goaGFuZGxlU3FsSWRlbnRpZmllcihpdGVtLm5hbWVzKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlZBTFVFXCI6XG4gICAgICAgIC8vIElmIHdlIGdvdCBhIHZhbHVlIFNRTCBpdGVtLCBhZGQgYSBwbGFjZWhvbGRlciBhbmQgYWRkIHRoZSB2YWx1ZSB0byBvdXJcbiAgICAgICAgLy8gcGxhY2Vob2xkZXIgdmFsdWVzIGFycmF5LlxuICAgICAgICB2YWx1ZXMucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgICAgc3FsRnJhZ21lbnRzLnB1c2goYCQke3ZhbHVlcy5sZW5ndGh9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKFwiU3FsIGl0ZW0gdHlwZSBub3QgcmVjb2duaXNlZCFcIiksIFwiY29tcGlsZVwiKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCB0ZXh0ID0gc3FsRnJhZ21lbnRzLmpvaW4oXCJcIik7XG4gIHJldHVybiB7XG4gICAgdGV4dCxcbiAgICB2YWx1ZXMsXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcGlsZS5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiZGVidWdcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG5pbXBvcnQgZXNjYXBlU3FsSWRlbnRpZmllciBmcm9tIFwiLi9lc2NhcGUtc3FsLWlkZW50aWZpZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlU3FsSWRlbnRpZmllcihuYW1lcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobmFtZXMpIHx8IG5hbWVzLmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBub24tZW1wdHkgYXJyYXlcIiksIFwiaGFuZGxlU3FsSWRlbnRpZmllclwiKTtcbiAgfVxuICAvLyBXaGVuIHdlIGNvbWUgYWNjcm9zcyBhIHN5bWJvbCBpbiBvdXIgaWRlbnRpZmllciwgd2UgY3JlYXRlIGEgdW5pcXVlXG4gIC8vIGFsaWFzIGZvciBpdCB0aGF0IHNob3VsZG7igJl0IGJlIGluIHRoZSB1c2VycyBzY2hlbWEuIFRoaXMgaGVscHMgbWFpbnRhaW5cbiAgLy8gc2FuaXR5IHdoZW4gY29uc3RydWN0aW5nIGxhcmdlIFNxbCBxdWVyaWVzIHdpdGggbWFueSBhbGlhc2VzLlxuICBsZXQgbmV4dFN5bWJvbElkID0gMDtcblxuICBjb25zdCBzeW1ib2xUb0lkZW50aWZpZXIgPSBuZXcgTWFwKCk7XG5cbiAgY29uc3QgbWFwUmVzdWx0ID0gbmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gZXNjYXBlU3FsSWRlbnRpZmllcihuYW1lKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgIC8vIEdldCB0aGUgY29ycmVjdCBpZGVudGlmaWVyIHN0cmluZyBmb3IgdGhpcyBzeW1ib2wuXG4gICAgICBsZXQgaWRlbnRpZmllclN5bWJvbCA9IHN5bWJvbFRvSWRlbnRpZmllci5nZXQobmFtZSk7IC8vIGdldCB2YWx1ZSBhc3NvY2lhdGVkIHRvIG5hbWVcblxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gaWRlbnRpZmllciwgY3JlYXRlIG9uZSBhbmQgc2V0IGl0LlxuICAgICAgaWYgKHR5cGVvZiBpZGVudGlmaWVyU3ltYm9sID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlkZW50aWZpZXJTeW1ib2wgPSBgX19sb2NhbF8ke25leHRTeW1ib2xJZCArPSAxfV9fYDsgLy8gTWFudWFseSBjcmVhdGUgc3ltYm9sIHdpdGggbWFnaWMgc3RyaW5nIGFuZCBpbmNyZW1lbnRcbiAgICAgICAgc3ltYm9sVG9JZGVudGlmaWVyLnNldChuYW1lLCBpZGVudGlmaWVyU3ltYm9sKTsgLy8gc2V0IHZhbHVlIGZvciB0aGUga2V5IGluIHRoZSBNYXAgb2JqZWN0LlxuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gdGhlIGlkZW50aWZpZXIuIEFzIHdlIGNyZWF0ZWQgaXQsIHdlIGRvIG5vdCBoYXZlIHRvXG4gICAgICAvLyBlc2NhcGUgaXQsIGJlY2F1c2Ugd2Uga25vdyBhbGwgb2YgdGhlIGNoYXJhY3RlcnMgYXJlIHNhZmUuXG4gICAgICByZXR1cm4gaWRlbnRpZmllclN5bWJvbDtcbiAgICB9XG5cbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoYEV4cGVjdGVkIHN0cmluZyBvciBzeW1ib2wsIHJlY2VpdmVkICcke1N0cmluZyhuYW1lKX0nYCksIFwiaGFuZGxlU3FsSWRlbnRpZmllclwiKTtcbiAgfSkuam9pbihcIi5cIik7XG5cbiAgcmV0dXJuIG1hcFJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oYW5kbGUtc3FsLWlkZW50aWZpZXIuanMiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG4vLyBEZXJpdmVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2JyaWFuYy9ub2RlLXBvc3RncmVzL2Jsb2IvNmM4NDBhYWJiMDlmOGEyZDY0MDgwMDk1M2Y2Yjg4NGI2ODQxMzg0Yy9saWIvY2xpZW50LmpzI0wzMDZcbi8vIFdoaWNoIHdhcyBwb3J0ZWQgZnJvbSBQb3N0Z3JlU1FMIDkuMi40IHNvdXJjZSBjb2RlIGluIHNyYy9pbnRlcmZhY2VzL2xpYnBxL2ZlLWV4ZWMuY1xuLy8gRXNjYXBlcyBkb3VibGUgcXVvdGUgY2hhcmFjdGVycyBpbiBhIHN0cmluZ1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlU3FsSWRlbnRpZmllcihzdHIpIHtcbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBlbXB0eSBzdHJpbmcgcmVjZWl2ZWQ7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKGBFeHBlY3RlZCBzdHJpbmcsIHJlY2VpdmVkICcke1N0cmluZyhzdHIpfSdgKSwgXCJlc2NhcGVTcWxJZGVudGlmaWVyXCIpO1xuICB9XG5cbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBzdHJpbmcgd2l0aCBsZW5ndGggMCByZWNlaXZlZDtcbiAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgZGJsUXVvdGVFc2NhcGVkID0gQXJyYXkuZnJvbShzdHIsIChjaGFyKSA9PiB7XG4gICAgaWYgKGNoYXIgPT09ICdcIicpIHsgLyogZXNsaW50LWRpc2FibGUtbGluZSBxdW90ZXMgKi9cbiAgICAgIHJldHVybiBjaGFyICsgY2hhcjtcbiAgICB9XG4gICAgcmV0dXJuIGNoYXI7XG4gIH0pO1xuXG4gIHJldHVybiBgXCIke2RibFF1b3RlRXNjYXBlZC5qb2luKFwiXCIpfVwiYDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lc2NhcGUtc3FsLWlkZW50aWZpZXIuanMiLCJpbXBvcnQgdHJ1c3RlZFN5bWJvbCBmcm9tIFwiLi90cnVzdGVkLXN5bWJvbFwiO1xuaW1wb3J0IGVuc3VyZU5vbkVtcHR5QXJyYXkgZnJvbSBcIi4vZW5zdXJlLW5vbi1lbXB0eS1hcnJheVwiO1xuXG52YXIgJCR0cnVzdGVkID0gdHJ1c3RlZFN5bWJvbCgpOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdCAqL1xuXG5mdW5jdGlvbiBpc1N0cmluZ09yU3ltYm9sKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsID09PSBcInN5bWJvbFwiO1xufVxuXG5mdW5jdGlvbiBtYWtlSWRlbnRpZmllck5vZGUobmFtZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG5hbWVzKSB8fCAhbmFtZXMuZXZlcnkoaXNTdHJpbmdPclN5bWJvbCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50IHRvIG1ha2VJZGVudGlmaWVyTm9kZSAtIGV4cGVjdGVkIGFycmF5IG9mIHN0cmluZ3Mvc3ltYm9sc1wiKTtcbiAgfVxuICByZXR1cm4geyB0eXBlOiBcIklERU5USUZJRVJcIiwgbmFtZXMsIFskJHRydXN0ZWRdOiB0cnVlIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFNxbCBpdGVtIGZvciBhIFNxbCBpZGVudGlmaWVyLiBBIFNxbCBpZGVudGlmaWVyIGlzIGFueXRoaW5nIGxpa2VcbiAqIGEgdGFibGUsIHNjaGVtYSwgb3IgY29sdW1uIG5hbWUuIEFuIGlkZW50aWZpZXIgbWF5IGFsc28gaGF2ZSBhIG5hbWVzcGFjZSxcbiAqIHRodXMgd2h5IG1hbnkgbmFtZXMgYXJlIGFjY2VwdGVkLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGVudGlmaWVyKC4uLm5hbWVzKSB7XG4gIHJldHVybiBtYWtlSWRlbnRpZmllck5vZGUoZW5zdXJlTm9uRW1wdHlBcnJheShuYW1lcykpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaWRlbnRpZmllci5qcyIsImltcG9ydCBlbmZvcmNlVmFsaWROb2RlIGZyb20gXCIuL2VuZm9yY2UtdmFsaWQtbm9kZVwiO1xuaW1wb3J0IGVuc3VyZU5vbkVtcHR5QXJyYXkgZnJvbSBcIi4vZW5zdXJlLW5vbi1lbXB0eS1hcnJheVwiO1xuaW1wb3J0IHJhdyBmcm9tIFwiLi9yYXdcIjtcblxuLyoqXG4gKiBKb2luIHNvbWUgU3FsIGl0ZW1zIHRvZ2V0aGVyIHNlcGVyYXRlZCBieSBhIHN0cmluZy4gVXNlZnVsIHdoZW4gZGVhbGluZ1xuICogd2l0aCBsaXN0cyBvZiBTcWwgaXRlbXMgdGhhdCBkb2VzbuKAmXQgbWFrZSBzZW5zZSBhcyBhIFNxbCBxdWVyeS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gam9pbihpdGVtcywgcmF3U2VwYXJhdG9yID0gXCJcIikge1xuICBlbnN1cmVOb25FbXB0eUFycmF5KGl0ZW1zLCB0cnVlKTtcbiAgaWYgKHR5cGVvZiByYXdTZXBhcmF0b3IgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNlcGFyYXRvciAtIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gIH1cbiAgY29uc3Qgc2VwYXJhdG9yID0gcmF3U2VwYXJhdG9yO1xuICBjb25zdCBjdXJyZW50SXRlbXMgPSBbXTtcbiAgY29uc3Qgc2VwTm9kZSA9IHJhdyhzZXBhcmF0b3IpO1xuICBmb3IgKGxldCBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJhd0l0ZW0gPSBpdGVtc1tpXTtcbiAgICBsZXQgaXRlbXNUb0FwcGVuZDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyYXdJdGVtKSkge1xuICAgICAgaXRlbXNUb0FwcGVuZCA9IHJhd0l0ZW0ubWFwKGVuZm9yY2VWYWxpZE5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtc1RvQXBwZW5kID0gW2VuZm9yY2VWYWxpZE5vZGUocmF3SXRlbSldO1xuICAgIH1cbiAgICBpZiAoaSA9PT0gMCB8fCAhc2VwYXJhdG9yKSB7XG4gICAgICBjdXJyZW50SXRlbXMucHVzaCguLi5pdGVtc1RvQXBwZW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudEl0ZW1zLnB1c2goc2VwTm9kZSwgLi4uaXRlbXNUb0FwcGVuZCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50SXRlbXM7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvam9pbi5qcyIsImltcG9ydCByYXcgZnJvbSBcIi4vcmF3XCI7XG5pbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWVcIjtcbmltcG9ydCBlc2NhcGVTcWxMaXRlcmFsIGZyb20gXCIuL2VzY2FwZS1zcWwtbGl0ZXJhbFwiO1xuXG5jb25zdCB0cnVlTm9kZSA9IHJhdyhgVFJVRWApOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuY29uc3QgZmFsc2VOb2RlID0gcmF3KGBGQUxTRWApOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuY29uc3QgbnVsbE5vZGUgPSByYXcoYE5VTExgKTsgLyogZXNsaW50LWRpc2FibGUtbGluZSBxdW90ZXMgKi9cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgaXMgc2ltcGxlIHdpbGwgaW5saW5lIGl0IGludG8gdGhlIHF1ZXJ5LCBvdGhlcndpc2Ugd2lsbCBkZWZlclxuICogdG8gdmFsdWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpdGVyYWwodmFsKSB7XG4gIC8vIE1hdGNoIGFscGhhbnVtZXJpYyBzdHJpbmcgYW5kL29yIC1fQCFcbiAgLy8gQmxvY2sgZG91YmxlIGh5cGhlbiAtLSB1c2VkIGZvciBjb21tZW50c1xuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiAmJiB2YWwubWF0Y2goL14oKD8hLXsyfSlbLWEtekEtWjAtOV9AISBdKSokLykpIHtcbiAgICByZXR1cm4gcmF3KGAke2VzY2FwZVNxbExpdGVyYWwodmFsKX1gKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWwpKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsKSkge1xuICAgICAgcmV0dXJuIHJhdyhTdHJpbmcodmFsKSk7IC8vIG9ubHkgZGlnaXRzIGFuZCBoeXBoZW4gPSBpbnRlZ2VyIGxpdGVyYWxcbiAgICB9XG4gICAgcmV0dXJuIHJhdyhgJyR7MCArIHZhbH0nOjpmbG9hdGApO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIHZhbCA/IHRydWVOb2RlIDogZmFsc2VOb2RlO1xuICB9IGVsc2UgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxOb2RlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlKHZhbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGl0ZXJhbC5qcyIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbi8vIERlcml2ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJpYW5jL25vZGUtcG9zdGdyZXMvYmxvYi82Yzg0MGFhYmIwOWY4YTJkNjQwODAwOTUzZjZiODg0YjY4NDEzODRjL2xpYi9jbGllbnQuanMjTDMyNVxuLy8gV2hpY2ggd2FzIHBvcnRlZCBmcm9tIFBvc3RncmVTUUwgOS4yLjQgc291cmNlIGNvZGUgaW4gc3JjL2ludGVyZmFjZXMvbGlicHEvZmUtZXhlYy5jXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVTcWxMaXRlcmFsKHN0cikge1xuICB2YXIgaGFzQmFja3NsYXNoID0gZmFsc2U7XG4gIHZhciBlc2NhcGVkID0gXCJcXCdcIjsgLyogZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZSAqL1xuXG4gIC8vIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgZW1wdHkgc3RyaW5nIHJlY2VpdmVkO1xuICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihgRXhwZWN0ZWQgc3RyaW5nLCByZWNlaXZlZCAnJHtTdHJpbmcoc3RyKX0nYCksIFwiZXNjYXBlU3FsTGl0ZXJhbFwiKTtcbiAgfVxuXG4gIC8vIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgc3RyaW5nIHdpdGggbGVuZ3RoIDAgcmVjZWl2ZWQ7XG4gIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiICYmIHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgYyA9IHN0cltpXTtcbiAgICBpZiAoYyA9PT0gXCJcXCdcIikgeyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlICovXG4gICAgICBlc2NhcGVkICs9IGMgKyBjO1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gXCJcXFxcXCIpIHtcbiAgICAgIGVzY2FwZWQgKz0gYyArIGM7XG4gICAgICBoYXNCYWNrc2xhc2ggPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlc2NhcGVkICs9IGM7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlZCArPSBcIlxcJ1wiOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlICovXG5cbiAgaWYgKGhhc0JhY2tzbGFzaCA9PT0gdHJ1ZSkge1xuICAgIGVzY2FwZWQgPSAnIEUnICsgZXNjYXBlZDsgLyogZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItdGVtcGxhdGUgKi8vKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuICB9XG5cbiAgcmV0dXJuIGVzY2FwZWQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXNjYXBlLXNxbC1saXRlcmFsLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBlbmZvcmNlVmFsaWROb2RlIGZyb20gXCIuL2VuZm9yY2UtdmFsaWQtbm9kZVwiO1xuaW1wb3J0IHJhdyBmcm9tIFwiLi9yYXdcIjtcblxuLyoqXG4gKiBBIHRlbXBsYXRlIHN0cmluZyB0YWcgdGhhdCBjcmVhdGVzIGEgYFNxbGAgcXVlcnkgb3V0IG9mIHNvbWUgc3RyaW5ncyBhbmRcbiAqIHNvbWUgdmFsdWVzLiBVc2UgdGhpcyB0byBjb25zdHJ1Y3QgYWxsIFBvc3RncmVTUUwgcXVlcmllcyB0byBhdm9pZCBTUUxcbiAqIGluamVjdGlvbi5cbiAqXG4gKiBOb3RlIHRoYXQgdXNpbmcgdGhpcyBmdW5jdGlvbiwgdGhlIHVzZXIgKm11c3QqIHNwZWNpZnkgaWYgdGhleSBhcmUgaW5qZWN0aW5nXG4gKiByYXcgdGV4dC4gVGhpcyBtYWtlcyBhIFNRTCBpbmplY3Rpb24gdnVsbmVyYWJpbGl0eSBoYXJkZXIgdG8gY3JlYXRlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWVyeShzdHJpbmdzLCAuLi52YWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHN0cmluZ3MpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicXVlcnkgc2hvdWxkIGJlIHVzZWQgYXMgYSB0ZW1wbGF0ZSBsaXRlcmFsLCBub3QgYSBmdW5jdGlvbiBjYWxsIVwiKTtcbiAgfVxuICBjb25zdCBpdGVtcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgbCA9IHN0cmluZ3MubGVuZ3RoOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgY29uc3QgdGV4dCA9IHN0cmluZ3NbaV07XG4gICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgaXRlbXMucHVzaChyYXcodGV4dCkpO1xuICAgIH1cbiAgICBpZiAodmFsdWVzW2ldKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCBub2RlcyA9IHZhbHVlLm1hcChlbmZvcmNlVmFsaWROb2RlKTtcbiAgICAgICAgaXRlbXMucHVzaCguLi5ub2Rlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBub2RlID0gZW5mb3JjZVZhbGlkTm9kZSh2YWx1ZSk7XG4gICAgICAgIGl0ZW1zLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpdGVtcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9xdWVyeS5qcyJdLCJzb3VyY2VSb290IjoiIn0=