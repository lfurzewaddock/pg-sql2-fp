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
  if (error && error.stack && error.message) {
    (0, _debug2.default)(`pg-sql2-fp:${namespace}`)(`${msg} %O`, error);
    return error;
  }
  (0, _debug2.default)(`pg-sql2-fp:${namespace}`)(`${msg}`);
  return null;
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
const $$trusted = process.env.NODE_ENV === "production" ? Symbol("trusted") : Symbol.for("development");

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

const $$trusted = (0, _trustedSymbol2.default)();

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

const $$trusted = (0, _trustedSymbol2.default)();

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

const $$trusted = (0, _trustedSymbol2.default)();

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
  // Match alphanumeric string, space and/or -@:.+
  // Block double hyphen -- used for comments
  // Block double at sign @@ used for full text search
  if (typeof val === "string" && val.match(/^((?!-{2})(?!@{2})[-a-zA-Z0-9@:.+ ])*$/gmi)) {
    // ISO 8601 date/datetime (without time, or with time and no timezone, or with time and timezone
    if (val.match(/^(\d{4})-(\d{2})-(\d{2})( \d{2}:\d{2}:\d{2}\.?(\d{0,6})(\-?|\+?)(\d{0,2}))?(Z?)$/gmi)) {
      /* eslint-disable-line no-useless-escape */
      if (val.match(/(\d{2}:\d{2}:\d{2}.?(\d{0,6})((-|\+)\d{2}))/gmi)) {
        // eg. 2016-08-12 10:22:31.949271-07
        return (0, _raw2.default)(`TIMESTAMP WITH TIME ZONE ${(0, _escapeSqlLiteral2.default)(val)}`); // datetime with timezone
      }
      // eg. 2016-08-12 or 2016-08-12 10:22:31.949271
      return (0, _raw2.default)(`TIMESTAMP ${(0, _escapeSqlLiteral2.default)(val)}`); // datetime without timezone
    }
    return (0, _raw2.default)(`${(0, _escapeSqlLiteral2.default)(val)}`); // string constant
  } else if (typeof val === "number" && Number.isFinite(val)) {
    if (Number.isInteger(val)) {
      return (0, _raw2.default)(`${String(val)}`); // only digits and hyphen = integer literal
    }
    return (0, _raw2.default)(`'${0 + val}'`); // only digits and deciamals = float literal
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Y5NDhiMDI4ZTJkZDM2MzcwZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlYnVnLWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJ1c3RlZC1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jhdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5mb3JjZS12YWxpZC1ub2RlLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnN1cmUtbm9uLWVtcHR5LWFycmF5LmpzIiwid2VicGFjazovLy8uL3NyYy92YWx1ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVidWdcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGFuZGxlLXNxbC1pZGVudGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9lc2NhcGUtc3FsLWlkZW50aWZpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2lkZW50aWZpZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pvaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xpdGVyYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VzY2FwZS1zcWwtbGl0ZXJhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlcnkuanMiXSwibmFtZXMiOlsiZGVidWdMb2ciLCJlcnJvciIsIm5hbWVzcGFjZSIsIm1zZyIsInN0YWNrIiwibWVzc2FnZSIsInRydXN0ZWRTeW1ib2wiLCIkJHRydXN0ZWQiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJTeW1ib2wiLCJmb3IiLCJyYXciLCJtYWtlUmF3Tm9kZSIsInRleHQiLCJzeW1ib2wiLCJ0cnVzdFN5bWJvbCIsInJhd1RleHQiLCJFcnJvciIsIlN0cmluZyIsInR5cGUiLCJlbmZvcmNlVmFsaWROb2RlIiwibm9kZSIsImVuc3VyZU5vbkVtcHR5QXJyYXkiLCJhcnJheSIsImFsbG93WmVyb0xlbmd0aCIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImlkeCIsImwiLCJ2YWx1ZSIsIm1ha2VWYWx1ZU5vZGUiLCJ2YWwiLCJPYmplY3QiLCJhc3NpZ24iLCJxdWVyeSIsImxpdGVyYWwiLCJpZGVudCIsImlkZW50aWZpZXIiLCJjb25jYXQiLCJqb2luIiwiY29tcGlsZSIsInNxbCIsInNxbEZyYWdtZW50cyIsInZhbHVlcyIsIml0ZW1zIiwiaSIsInJhd0l0ZW0iLCJpdGVtIiwicHVzaCIsIm5hbWVzIiwiaGFuZGxlU3FsSWRlbnRpZmllciIsIm5leHRTeW1ib2xJZCIsInN5bWJvbFRvSWRlbnRpZmllciIsIk1hcCIsIm1hcFJlc3VsdCIsIm1hcCIsIm5hbWUiLCJpZGVudGlmaWVyU3ltYm9sIiwiZ2V0Iiwic2V0IiwiZXNjYXBlU3FsSWRlbnRpZmllciIsInN0ciIsImRibFF1b3RlRXNjYXBlZCIsImZyb20iLCJjaGFyIiwiaXNTdHJpbmdPclN5bWJvbCIsIm1ha2VJZGVudGlmaWVyTm9kZSIsImV2ZXJ5IiwicmF3U2VwYXJhdG9yIiwic2VwYXJhdG9yIiwiY3VycmVudEl0ZW1zIiwic2VwTm9kZSIsIml0ZW1zVG9BcHBlbmQiLCJ0cnVlTm9kZSIsImZhbHNlTm9kZSIsIm51bGxOb2RlIiwibWF0Y2giLCJOdW1iZXIiLCJpc0Zpbml0ZSIsImlzSW50ZWdlciIsImVzY2FwZVNxbExpdGVyYWwiLCJoYXNCYWNrc2xhc2giLCJlc2NhcGVkIiwiYyIsInN0cmluZ3MiLCJub2RlcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Es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QUNELFNBQU93QixLQUFQO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAzZjk0OGIwMjhlMmRkMzYzNzBmMiIsImltcG9ydCBkZWJ1ZyBmcm9tIFwiZGVidWdcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVidWdMb2coZXJyb3IsIG5hbWVzcGFjZSA9IFwiXCIsIG1zZyA9IFwiXCIpIHtcbiAgaWYgKGVycm9yICYmIGVycm9yLnN0YWNrICYmIGVycm9yLm1lc3NhZ2UpIHtcbiAgICBkZWJ1ZyhgcGctc3FsMi1mcDoke25hbWVzcGFjZX1gKShgJHttc2d9ICVPYCwgZXJyb3IpO1xuICAgIHJldHVybiBlcnJvcjtcbiAgfVxuICBkZWJ1ZyhgcGctc3FsMi1mcDoke25hbWVzcGFjZX1gKShgJHttc2d9YCk7XG4gIHJldHVybiBudWxsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2RlYnVnLWxvZy5qcyIsIi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5jb25zdCAkJHRydXN0ZWQgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBTeW1ib2woXCJ0cnVzdGVkXCIpIDogU3ltYm9sLmZvcihcImRldmVsb3BtZW50XCIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cnVzdGVkU3ltYm9sKCkge1xuICByZXR1cm4gJCR0cnVzdGVkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RydXN0ZWQtc3ltYm9sLmpzIiwiaW1wb3J0IGRlYnVnTG9nIGZyb20gXCIuL2RlYnVnLWxvZ1wiO1xuaW1wb3J0IHRydXN0ZWRTeW1ib2wgZnJvbSBcIi4vdHJ1c3RlZC1zeW1ib2xcIjtcblxuZnVuY3Rpb24gbWFrZVJhd05vZGUodGV4dCA9IFwiXCIsIHN5bWJvbCkge1xuICB2YXIgdHJ1c3RTeW1ib2wgPSBzeW1ib2w7XG4gIHZhciByYXdUZXh0ID0gdGV4dDtcblxuICBpZiAodHlwZW9mIHN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2Ygc3ltYm9sICE9PSBcInN5bWJvbFwiKSB7XG4gICAgdHJ1c3RTeW1ib2wgPSB0cnVzdGVkU3ltYm9sKCk7XG4gIH0gZWxzZSBpZiAoc3ltYm9sICE9PSB0cnVzdGVkU3ltYm9sKCkpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJTeW1ib2wgcHJvdmlkZWQgaXMgYSBmb3JnZXJ5IVwiKSwgXCJtYWtlUmF3Tm9kZVwiKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdGV4dCAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJhd1RleHQgPSBTdHJpbmcodGV4dCk7XG4gIH1cbiAgcmV0dXJuIHsgdHlwZTogXCJSQVdcIiwgdGV4dDogcmF3VGV4dCwgW3RydXN0U3ltYm9sXTogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIFdBUk5JTkchOiBwcm9jZWVkIHdpdGggY2F1dGlvbiBhcyB0ZXh0IGlzIG5vdCBlc2NhcGVkIVxuICogQ3JlYXRlcyBhIFNxbCBpdGVtIGZvciByYXcgU1FMIHRleHQuIEp1c3QgcGxhaW4gb2zigJggcmF3IFNRTC5cbiAqIFRoaXMgbWV0aG9kIGlzIGRhbmdlcm91cyBiZWNhdXNlIGl0IGludm9sdmVzIG5vIGVzY2FwaW5nLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYXcodGV4dCwgc3ltYm9sKSB7XG4gIHJldHVybiBtYWtlUmF3Tm9kZSh0ZXh0LCBzeW1ib2wpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Jhdy5qcyIsIlxuaW1wb3J0IHRydXN0ZWRTeW1ib2wgZnJvbSBcIi4vdHJ1c3RlZC1zeW1ib2xcIjtcblxuY29uc3QgJCR0cnVzdGVkID0gdHJ1c3RlZFN5bWJvbCgpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmZvcmNlVmFsaWROb2RlKG5vZGUpIHtcbiAgaWYgKG5vZGUgIT09IG51bGwgJiYgdHlwZW9mIG5vZGUgPT09IFwib2JqZWN0XCIgJiYgbm9kZVskJHRydXN0ZWRdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBTUUwgaXRlbSwgaW5zdGVhZCByZWNlaXZlZCAnJHtTdHJpbmcobm9kZSl9Jy5gKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbmZvcmNlLXZhbGlkLW5vZGUuanMiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuc3VyZU5vbkVtcHR5QXJyYXkoYXJyYXksIGFsbG93WmVyb0xlbmd0aCA9IGZhbHNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBhcnJheVwiKSwgXCJlbnN1cmVOb25FbXB0eUFycmF5XCIpO1xuICB9XG4gIGlmICghYWxsb3daZXJvTGVuZ3RoICYmIGFycmF5Lmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBub24tZW1wdHkgYXJyYXlcIiksIFwiZW5zdXJlTm9uRW1wdHlBcnJheVwiKTtcbiAgfVxuICBmb3IgKGxldCBpZHggPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpZHggPCBsOyBpZHggKz0gMSkge1xuICAgIGlmIChhcnJheVtpZHhdID09IG51bGwpIHtcbiAgICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihgQXJyYXkgaW5kZXggJHtpZHh9IGlzICR7U3RyaW5nKGFycmF5W2lkeF0pfWApLCBcImVuc3VyZU5vbkVtcHR5QXJyYXlcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnN1cmUtbm9uLWVtcHR5LWFycmF5LmpzIiwiaW1wb3J0IHRydXN0ZWRTeW1ib2wgZnJvbSBcIi4vdHJ1c3RlZC1zeW1ib2xcIjtcblxuY29uc3QgJCR0cnVzdGVkID0gdHJ1c3RlZFN5bWJvbCgpO1xuXG5mdW5jdGlvbiBtYWtlVmFsdWVOb2RlKHZhbCkge1xuICByZXR1cm4geyB0eXBlOiBcIlZBTFVFXCIsIHZhbHVlOiB2YWwsIFskJHRydXN0ZWRdOiB0cnVlIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFNxbCBpdGVtIGZvciBhIHZhbHVlIHRoYXQgd2lsbCBiZSBpbmNsdWRlZCBpbiBvdXIgZmluYWwgcXVlcnkuXG4gKiBUaGlzIHZhbHVlIHdpbGwgYmUgYWRkZWQgaW4gYSB3YXkgd2hpY2ggYXZvaWRzIFNxbCBpbmplY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbHVlKHZhbCkge1xuICByZXR1cm4gbWFrZVZhbHVlTm9kZSh2YWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbHVlLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjb21waWxlIGZyb20gXCIuL2NvbXBpbGVcIjtcbmltcG9ydCBpZGVudGlmaWVyIGZyb20gXCIuL2lkZW50aWZpZXJcIjtcbmltcG9ydCBqb2luIGZyb20gXCIuL2pvaW5cIjtcbmltcG9ydCBsaXRlcmFsIGZyb20gXCIuL2xpdGVyYWxcIjtcbmltcG9ydCBxdWVyeSBmcm9tIFwiLi9xdWVyeVwiO1xuaW1wb3J0IHJhdyBmcm9tIFwiLi9yYXdcIjtcbmltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKHF1ZXJ5LCB7XG4gIHJhdywgdmFsdWUsIGxpdGVyYWwsIGlkZW50OiBpZGVudGlmaWVyLCBjb25jYXQ6IGpvaW4sIGNvbXBpbGUsXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IGRlYnVnTG9nIGZyb20gXCIuL2RlYnVnLWxvZ1wiO1xuaW1wb3J0IGVuZm9yY2VWYWxpZE5vZGUgZnJvbSBcIi4vZW5mb3JjZS12YWxpZC1ub2RlXCI7XG5pbXBvcnQgaGFuZGxlU3FsSWRlbnRpZmllciBmcm9tIFwiLi9oYW5kbGUtc3FsLWlkZW50aWZpZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGlsZShzcWwpIHtcbiAgLy8gSm9pbiB0aGlzIHRvIGdlbmVyYXRlIHRoZSBTUUwgcXVlcnlcbiAgY29uc3Qgc3FsRnJhZ21lbnRzID0gW107XG5cbiAgLy8gVmFsdWVzIGhvbGQgdGhlIEphdmFTY3JpcHQgdmFsdWVzIHRoYXQgYXJlIHJlcHJlc2VudGVkIGluIHRoZSBxdWVyeVxuICAvLyBzdHJpbmcgYnkgcGxhY2Vob2xkZXJzLiBUaGV5IGFyZSBlYWdlciBiZWNhdXNlIHRoZXkgd2VyZSBwcm92aWRlZCBiZWZvcmVcbiAgLy8gY29tcGlsZSB0aW1lLlxuICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkoc3FsKSA/IHNxbCA6IFtzcWxdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgY29uc3QgcmF3SXRlbSA9IGl0ZW1zW2ldO1xuICAgIGNvbnN0IGl0ZW0gPSBlbmZvcmNlVmFsaWROb2RlKHJhd0l0ZW0pO1xuICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG4gICAgICBjYXNlIFwiUkFXXCI6XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS50ZXh0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKFwiUkFXIG5vZGUgZXhwZWN0ZWQgc3RyaW5nXCIpLCBcImNvbXBpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhpcyBpcyBqdXN0IHJhdyB0ZXh0LCB3ZSBhZGQgaXQgZGlyZWN0bHkgdG8gdGhlIHF1ZXJ5IHRleHQuXG4gICAgICAgIHNxbEZyYWdtZW50cy5wdXNoKGl0ZW0udGV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIklERU5USUZJRVJcIjpcbiAgICAgICAgaWYgKGl0ZW0ubmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKFwiSWRlbnRpZmllciBtdXN0IGhhdmUgYSBuYW1lXCIpLCBcImNvbXBpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgZ290IGFuIGlkZW50aWZpZXIgdHlwZSwgZXNjYXBlIHRoZSBzdHJpbmdzIGFuZCBnZXQgYSBsb2NhbFxuICAgICAgICAvLyBpZGVudGlmaWVyIGZvciBub24tc3RyaW5nIGlkZW50aWZpZXJzLlxuICAgICAgICBzcWxGcmFnbWVudHMucHVzaChoYW5kbGVTcWxJZGVudGlmaWVyKGl0ZW0ubmFtZXMpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVkFMVUVcIjpcbiAgICAgICAgLy8gSWYgd2UgZ290IGEgdmFsdWUgU1FMIGl0ZW0sIGFkZCBhIHBsYWNlaG9sZGVyIGFuZCBhZGQgdGhlIHZhbHVlIHRvIG91clxuICAgICAgICAvLyBwbGFjZWhvbGRlciB2YWx1ZXMgYXJyYXkuXG4gICAgICAgIHZhbHVlcy5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgICBzcWxGcmFnbWVudHMucHVzaChgJCR7dmFsdWVzLmxlbmd0aH1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJTcWwgaXRlbSB0eXBlIG5vdCByZWNvZ25pc2VkIVwiKSwgXCJjb21waWxlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRleHQgPSBzcWxGcmFnbWVudHMuam9pbihcIlwiKTtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0LFxuICAgIHZhbHVlcyxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21waWxlLmpzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbmltcG9ydCBlc2NhcGVTcWxJZGVudGlmaWVyIGZyb20gXCIuL2VzY2FwZS1zcWwtaWRlbnRpZmllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGVTcWxJZGVudGlmaWVyKG5hbWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShuYW1lcykgfHwgbmFtZXMubGVuZ3RoIDwgMSkge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIkV4cGVjdGVkIG5vbi1lbXB0eSBhcnJheVwiKSwgXCJoYW5kbGVTcWxJZGVudGlmaWVyXCIpO1xuICB9XG4gIC8vIFdoZW4gd2UgY29tZSBhY2Nyb3NzIGEgc3ltYm9sIGluIG91ciBpZGVudGlmaWVyLCB3ZSBjcmVhdGUgYSB1bmlxdWVcbiAgLy8gYWxpYXMgZm9yIGl0IHRoYXQgc2hvdWxkbuKAmXQgYmUgaW4gdGhlIHVzZXJzIHNjaGVtYS4gVGhpcyBoZWxwcyBtYWludGFpblxuICAvLyBzYW5pdHkgd2hlbiBjb25zdHJ1Y3RpbmcgbGFyZ2UgU3FsIHF1ZXJpZXMgd2l0aCBtYW55IGFsaWFzZXMuXG4gIGxldCBuZXh0U3ltYm9sSWQgPSAwO1xuXG4gIGNvbnN0IHN5bWJvbFRvSWRlbnRpZmllciA9IG5ldyBNYXAoKTtcblxuICBjb25zdCBtYXBSZXN1bHQgPSBuYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBlc2NhcGVTcWxJZGVudGlmaWVyKG5hbWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgLy8gR2V0IHRoZSBjb3JyZWN0IGlkZW50aWZpZXIgc3RyaW5nIGZvciB0aGlzIHN5bWJvbC5cbiAgICAgIGxldCBpZGVudGlmaWVyU3ltYm9sID0gc3ltYm9sVG9JZGVudGlmaWVyLmdldChuYW1lKTsgLy8gZ2V0IHZhbHVlIGFzc29jaWF0ZWQgdG8gbmFtZVxuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBubyBpZGVudGlmaWVyLCBjcmVhdGUgb25lIGFuZCBzZXQgaXQuXG4gICAgICBpZiAodHlwZW9mIGlkZW50aWZpZXJTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWRlbnRpZmllclN5bWJvbCA9IGBfX2xvY2FsXyR7bmV4dFN5bWJvbElkICs9IDF9X19gOyAvLyBNYW51YWx5IGNyZWF0ZSBzeW1ib2wgd2l0aCBtYWdpYyBzdHJpbmcgYW5kIGluY3JlbWVudFxuICAgICAgICBzeW1ib2xUb0lkZW50aWZpZXIuc2V0KG5hbWUsIGlkZW50aWZpZXJTeW1ib2wpOyAvLyBzZXQgdmFsdWUgZm9yIHRoZSBrZXkgaW4gdGhlIE1hcCBvYmplY3QuXG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiB0aGUgaWRlbnRpZmllci4gQXMgd2UgY3JlYXRlZCBpdCwgd2UgZG8gbm90IGhhdmUgdG9cbiAgICAgIC8vIGVzY2FwZSBpdCwgYmVjYXVzZSB3ZSBrbm93IGFsbCBvZiB0aGUgY2hhcmFjdGVycyBhcmUgc2FmZS5cbiAgICAgIHJldHVybiBpZGVudGlmaWVyU3ltYm9sO1xuICAgIH1cblxuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihgRXhwZWN0ZWQgc3RyaW5nIG9yIHN5bWJvbCwgcmVjZWl2ZWQgJyR7U3RyaW5nKG5hbWUpfSdgKSwgXCJoYW5kbGVTcWxJZGVudGlmaWVyXCIpO1xuICB9KS5qb2luKFwiLlwiKTtcblxuICByZXR1cm4gbWFwUmVzdWx0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hhbmRsZS1zcWwtaWRlbnRpZmllci5qcyIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbi8vIERlcml2ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJpYW5jL25vZGUtcG9zdGdyZXMvYmxvYi82Yzg0MGFhYmIwOWY4YTJkNjQwODAwOTUzZjZiODg0YjY4NDEzODRjL2xpYi9jbGllbnQuanMjTDMwNlxuLy8gV2hpY2ggd2FzIHBvcnRlZCBmcm9tIFBvc3RncmVTUUwgOS4yLjQgc291cmNlIGNvZGUgaW4gc3JjL2ludGVyZmFjZXMvbGlicHEvZmUtZXhlYy5jXG4vLyBFc2NhcGVzIGRvdWJsZSBxdW90ZSBjaGFyYWN0ZXJzIGluIGEgc3RyaW5nXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVTcWxJZGVudGlmaWVyKHN0cikge1xuICAvLyByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIGVtcHR5IHN0cmluZyByZWNlaXZlZDtcbiAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoYEV4cGVjdGVkIHN0cmluZywgcmVjZWl2ZWQgJyR7U3RyaW5nKHN0cil9J2ApLCBcImVzY2FwZVNxbElkZW50aWZpZXJcIik7XG4gIH1cblxuICAvLyByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIHN0cmluZyB3aXRoIGxlbmd0aCAwIHJlY2VpdmVkO1xuICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIiAmJiBzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBkYmxRdW90ZUVzY2FwZWQgPSBBcnJheS5mcm9tKHN0ciwgKGNoYXIpID0+IHtcbiAgICBpZiAoY2hhciA9PT0gJ1wiJykgeyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuICAgICAgcmV0dXJuIGNoYXIgKyBjaGFyO1xuICAgIH1cbiAgICByZXR1cm4gY2hhcjtcbiAgfSk7XG5cbiAgcmV0dXJuIGBcIiR7ZGJsUXVvdGVFc2NhcGVkLmpvaW4oXCJcIil9XCJgO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VzY2FwZS1zcWwtaWRlbnRpZmllci5qcyIsImltcG9ydCB0cnVzdGVkU3ltYm9sIGZyb20gXCIuL3RydXN0ZWQtc3ltYm9sXCI7XG5pbXBvcnQgZW5zdXJlTm9uRW1wdHlBcnJheSBmcm9tIFwiLi9lbnN1cmUtbm9uLWVtcHR5LWFycmF5XCI7XG5cbmNvbnN0ICQkdHJ1c3RlZCA9IHRydXN0ZWRTeW1ib2woKTtcblxuZnVuY3Rpb24gaXNTdHJpbmdPclN5bWJvbCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHZhbCA9PT0gXCJzeW1ib2xcIjtcbn1cblxuZnVuY3Rpb24gbWFrZUlkZW50aWZpZXJOb2RlKG5hbWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShuYW1lcykgfHwgIW5hbWVzLmV2ZXJ5KGlzU3RyaW5nT3JTeW1ib2wpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBhcmd1bWVudCB0byBtYWtlSWRlbnRpZmllck5vZGUgLSBleHBlY3RlZCBhcnJheSBvZiBzdHJpbmdzL3N5bWJvbHNcIik7XG4gIH1cbiAgcmV0dXJuIHsgdHlwZTogXCJJREVOVElGSUVSXCIsIG5hbWVzLCBbJCR0cnVzdGVkXTogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBTcWwgaXRlbSBmb3IgYSBTcWwgaWRlbnRpZmllci4gQSBTcWwgaWRlbnRpZmllciBpcyBhbnl0aGluZyBsaWtlXG4gKiBhIHRhYmxlLCBzY2hlbWEsIG9yIGNvbHVtbiBuYW1lLiBBbiBpZGVudGlmaWVyIG1heSBhbHNvIGhhdmUgYSBuYW1lc3BhY2UsXG4gKiB0aHVzIHdoeSBtYW55IG5hbWVzIGFyZSBhY2NlcHRlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaWRlbnRpZmllciguLi5uYW1lcykge1xuICByZXR1cm4gbWFrZUlkZW50aWZpZXJOb2RlKGVuc3VyZU5vbkVtcHR5QXJyYXkobmFtZXMpKTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2lkZW50aWZpZXIuanMiLCJpbXBvcnQgZW5mb3JjZVZhbGlkTm9kZSBmcm9tIFwiLi9lbmZvcmNlLXZhbGlkLW5vZGVcIjtcbmltcG9ydCBlbnN1cmVOb25FbXB0eUFycmF5IGZyb20gXCIuL2Vuc3VyZS1ub24tZW1wdHktYXJyYXlcIjtcbmltcG9ydCByYXcgZnJvbSBcIi4vcmF3XCI7XG5cbi8qKlxuICogSm9pbiBzb21lIFNxbCBpdGVtcyB0b2dldGhlciBzZXBlcmF0ZWQgYnkgYSBzdHJpbmcuIFVzZWZ1bCB3aGVuIGRlYWxpbmdcbiAqIHdpdGggbGlzdHMgb2YgU3FsIGl0ZW1zIHRoYXQgZG9lc27igJl0IG1ha2Ugc2Vuc2UgYXMgYSBTcWwgcXVlcnkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGpvaW4oaXRlbXMsIHJhd1NlcGFyYXRvciA9IFwiXCIpIHtcbiAgZW5zdXJlTm9uRW1wdHlBcnJheShpdGVtcywgdHJ1ZSk7XG4gIGlmICh0eXBlb2YgcmF3U2VwYXJhdG9yICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBzZXBhcmF0b3IgLSBtdXN0IGJlIGEgc3RyaW5nXCIpO1xuICB9XG4gIGNvbnN0IHNlcGFyYXRvciA9IHJhd1NlcGFyYXRvcjtcbiAgY29uc3QgY3VycmVudEl0ZW1zID0gW107XG4gIGNvbnN0IHNlcE5vZGUgPSByYXcoc2VwYXJhdG9yKTtcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpICs9IDEpIHtcbiAgICBjb25zdCByYXdJdGVtID0gaXRlbXNbaV07XG4gICAgbGV0IGl0ZW1zVG9BcHBlbmQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmF3SXRlbSkpIHtcbiAgICAgIGl0ZW1zVG9BcHBlbmQgPSByYXdJdGVtLm1hcChlbmZvcmNlVmFsaWROb2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbXNUb0FwcGVuZCA9IFtlbmZvcmNlVmFsaWROb2RlKHJhd0l0ZW0pXTtcbiAgICB9XG4gICAgaWYgKGkgPT09IDAgfHwgIXNlcGFyYXRvcikge1xuICAgICAgY3VycmVudEl0ZW1zLnB1c2goLi4uaXRlbXNUb0FwcGVuZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnRJdGVtcy5wdXNoKHNlcE5vZGUsIC4uLml0ZW1zVG9BcHBlbmQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY3VycmVudEl0ZW1zO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pvaW4uanMiLCJpbXBvcnQgcmF3IGZyb20gXCIuL3Jhd1wiO1xuaW1wb3J0IHZhbHVlIGZyb20gXCIuL3ZhbHVlXCI7XG5pbXBvcnQgZXNjYXBlU3FsTGl0ZXJhbCBmcm9tIFwiLi9lc2NhcGUtc3FsLWxpdGVyYWxcIjtcblxuY29uc3QgdHJ1ZU5vZGUgPSByYXcoYFRSVUVgKTsgLyogZXNsaW50LWRpc2FibGUtbGluZSBxdW90ZXMgKi9cbmNvbnN0IGZhbHNlTm9kZSA9IHJhdyhgRkFMU0VgKTsgLyogZXNsaW50LWRpc2FibGUtbGluZSBxdW90ZXMgKi9cbmNvbnN0IG51bGxOb2RlID0gcmF3KGBOVUxMYCk7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgcXVvdGVzICovXG5cbi8qKlxuICogSWYgdGhlIHZhbHVlIGlzIHNpbXBsZSB3aWxsIGlubGluZSBpdCBpbnRvIHRoZSBxdWVyeSwgb3RoZXJ3aXNlIHdpbGwgZGVmZXJcbiAqIHRvIHZhbHVlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaXRlcmFsKHZhbCkge1xuICAvLyBNYXRjaCBhbHBoYW51bWVyaWMgc3RyaW5nLCBzcGFjZSBhbmQvb3IgLUA6LitcbiAgLy8gQmxvY2sgZG91YmxlIGh5cGhlbiAtLSB1c2VkIGZvciBjb21tZW50c1xuICAvLyBCbG9jayBkb3VibGUgYXQgc2lnbiBAQCB1c2VkIGZvciBmdWxsIHRleHQgc2VhcmNoXG4gIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiICYmIHZhbC5tYXRjaCgvXigoPyEtezJ9KSg/IUB7Mn0pWy1hLXpBLVowLTlAOi4rIF0pKiQvZ21pKSkge1xuICAgIC8vIElTTyA4NjAxIGRhdGUvZGF0ZXRpbWUgKHdpdGhvdXQgdGltZSwgb3Igd2l0aCB0aW1lIGFuZCBubyB0aW1lem9uZSwgb3Igd2l0aCB0aW1lIGFuZCB0aW1lem9uZVxuICAgIGlmICh2YWwubWF0Y2goL14oXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KSggXFxkezJ9OlxcZHsyfTpcXGR7Mn1cXC4/KFxcZHswLDZ9KShcXC0/fFxcKz8pKFxcZHswLDJ9KSk/KFo/KSQvZ21pKSkgeyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlICovXG4gICAgICBpZiAodmFsLm1hdGNoKC8oXFxkezJ9OlxcZHsyfTpcXGR7Mn0uPyhcXGR7MCw2fSkoKC18XFwrKVxcZHsyfSkpL2dtaSkpIHtcbiAgICAgICAgLy8gZWcuIDIwMTYtMDgtMTIgMTA6MjI6MzEuOTQ5MjcxLTA3XG4gICAgICAgIHJldHVybiByYXcoYFRJTUVTVEFNUCBXSVRIIFRJTUUgWk9ORSAke2VzY2FwZVNxbExpdGVyYWwodmFsKX1gKTsgLy8gZGF0ZXRpbWUgd2l0aCB0aW1lem9uZVxuICAgICAgfVxuICAgICAgLy8gZWcuIDIwMTYtMDgtMTIgb3IgMjAxNi0wOC0xMiAxMDoyMjozMS45NDkyNzFcbiAgICAgIHJldHVybiByYXcoYFRJTUVTVEFNUCAke2VzY2FwZVNxbExpdGVyYWwodmFsKX1gKTsgLy8gZGF0ZXRpbWUgd2l0aG91dCB0aW1lem9uZVxuICAgIH1cbiAgICByZXR1cm4gcmF3KGAke2VzY2FwZVNxbExpdGVyYWwodmFsKX1gKTsgLy8gc3RyaW5nIGNvbnN0YW50XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUodmFsKSkge1xuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHZhbCkpIHtcbiAgICAgIHJldHVybiByYXcoYCR7U3RyaW5nKHZhbCl9YCk7IC8vIG9ubHkgZGlnaXRzIGFuZCBoeXBoZW4gPSBpbnRlZ2VyIGxpdGVyYWxcbiAgICB9XG4gICAgcmV0dXJuIHJhdyhgJyR7MCArIHZhbH0nYCk7IC8vIG9ubHkgZGlnaXRzIGFuZCBkZWNpYW1hbHMgPSBmbG9hdCBsaXRlcmFsXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gdmFsID8gdHJ1ZU5vZGUgOiBmYWxzZU5vZGU7XG4gIH0gZWxzZSBpZiAodmFsID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbE5vZGU7XG4gIH1cblxuICByZXR1cm4gdmFsdWUodmFsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saXRlcmFsLmpzIiwiaW1wb3J0IGRlYnVnTG9nIGZyb20gXCIuL2RlYnVnLWxvZ1wiO1xuLy8gRGVyaXZlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9icmlhbmMvbm9kZS1wb3N0Z3Jlcy9ibG9iLzZjODQwYWFiYjA5ZjhhMmQ2NDA4MDA5NTNmNmI4ODRiNjg0MTM4NGMvbGliL2NsaWVudC5qcyNMMzI1XG4vLyBXaGljaCB3YXMgcG9ydGVkIGZyb20gUG9zdGdyZVNRTCA5LjIuNCBzb3VyY2UgY29kZSBpbiBzcmMvaW50ZXJmYWNlcy9saWJwcS9mZS1leGVjLmNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZVNxbExpdGVyYWwoc3RyKSB7XG4gIHZhciBoYXNCYWNrc2xhc2ggPSBmYWxzZTtcbiAgdmFyIGVzY2FwZWQgPSBcIlxcJ1wiOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlICovXG5cbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBlbXB0eSBzdHJpbmcgcmVjZWl2ZWQ7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKGBFeHBlY3RlZCBzdHJpbmcsIHJlY2VpdmVkICcke1N0cmluZyhzdHIpfSdgKSwgXCJlc2NhcGVTcWxMaXRlcmFsXCIpO1xuICB9XG5cbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBzdHJpbmcgd2l0aCBsZW5ndGggMCByZWNlaXZlZDtcbiAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBjID0gc3RyW2ldO1xuICAgIGlmIChjID09PSBcIlxcJ1wiKSB7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGUgKi9cbiAgICAgIGVzY2FwZWQgKz0gYyArIGM7XG4gICAgfSBlbHNlIGlmIChjID09PSBcIlxcXFxcIikge1xuICAgICAgZXNjYXBlZCArPSBjICsgYztcbiAgICAgIGhhc0JhY2tzbGFzaCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVzY2FwZWQgKz0gYztcbiAgICB9XG4gIH1cblxuICBlc2NhcGVkICs9IFwiXFwnXCI7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGUgKi9cblxuICBpZiAoaGFzQmFja3NsYXNoID09PSB0cnVlKSB7XG4gICAgZXNjYXBlZCA9ICcgRScgKyBlc2NhcGVkOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci10ZW1wbGF0ZSAqLy8qIGVzbGludC1kaXNhYmxlLWxpbmUgcXVvdGVzICovXG4gIH1cblxuICByZXR1cm4gZXNjYXBlZDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lc2NhcGUtc3FsLWxpdGVyYWwuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGVuZm9yY2VWYWxpZE5vZGUgZnJvbSBcIi4vZW5mb3JjZS12YWxpZC1ub2RlXCI7XG5pbXBvcnQgcmF3IGZyb20gXCIuL3Jhd1wiO1xuXG4vKipcbiAqIEEgdGVtcGxhdGUgc3RyaW5nIHRhZyB0aGF0IGNyZWF0ZXMgYSBgU3FsYCBxdWVyeSBvdXQgb2Ygc29tZSBzdHJpbmdzIGFuZFxuICogc29tZSB2YWx1ZXMuIFVzZSB0aGlzIHRvIGNvbnN0cnVjdCBhbGwgUG9zdGdyZVNRTCBxdWVyaWVzIHRvIGF2b2lkIFNRTFxuICogaW5qZWN0aW9uLlxuICpcbiAqIE5vdGUgdGhhdCB1c2luZyB0aGlzIGZ1bmN0aW9uLCB0aGUgdXNlciAqbXVzdCogc3BlY2lmeSBpZiB0aGV5IGFyZSBpbmplY3RpbmdcbiAqIHJhdyB0ZXh0LiBUaGlzIG1ha2VzIGEgU1FMIGluamVjdGlvbiB2dWxuZXJhYmlsaXR5IGhhcmRlciB0byBjcmVhdGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHF1ZXJ5KHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoc3RyaW5ncykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJxdWVyeSBzaG91bGQgYmUgdXNlZCBhcyBhIHRlbXBsYXRlIGxpdGVyYWwsIG5vdCBhIGZ1bmN0aW9uIGNhbGwhXCIpO1xuICB9XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBsID0gc3RyaW5ncy5sZW5ndGg7IGkgPCBsOyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gc3RyaW5nc1tpXTtcbiAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICBpdGVtcy5wdXNoKHJhdyh0ZXh0KSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZXNbaV0pIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdmFsdWUubWFwKGVuZm9yY2VWYWxpZE5vZGUpO1xuICAgICAgICBpdGVtcy5wdXNoKC4uLm5vZGVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBlbmZvcmNlVmFsaWROb2RlKHZhbHVlKTtcbiAgICAgICAgaXRlbXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGl0ZW1zO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3F1ZXJ5LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==