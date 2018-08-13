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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = enforceValidNode;

var _trustedSymbol = require("./trusted-symbol");

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const trusted$$ = (0, _trustedSymbol2.default)();

function enforceValidNode(node) {
  if (node !== null && typeof node === "object" && node[trusted$$] === true) {
    return node;
  }
  throw new Error(`Expected SQL item, instead received '${String(node)}'.`);
}
module.exports = exports["default"];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureNonEmptyArray;

var _debugLog = require("./debug-log");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escapeSqlIdentifier;

var _debugLog = require("./debug-log");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = escapeSqlLiteral;

var _debugLog = require("./debug-log");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleSqlIdentifier;

var _debugLog = require("./debug-log");

var _debugLog2 = _interopRequireDefault(_debugLog);

var _escapeSqlIdentifier = require("./escape-sql-identifier");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identifier;

var _trustedSymbol = require("./trusted-symbol");

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

var _ensureNonEmptyArray = require("./ensure-non-empty-array");

var _ensureNonEmptyArray2 = _interopRequireDefault(_ensureNonEmptyArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const trusted$$ = (0, _trustedSymbol2.default)();

function isStringOrSymbol(val) {
  return typeof val === "string" || typeof val === "symbol";
}

function makeIdentifierNode(names) {
  if (!Array.isArray(names) || !names.every(isStringOrSymbol)) {
    throw new Error("Invalid argument to makeIdentifierNode - expected array of strings/symbols");
  }
  return { type: "IDENTIFIER", names, [trusted$$]: true };
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compile = require("./compile");

var _compile2 = _interopRequireDefault(_compile);

var _identifier = require("./identifier");

var _identifier2 = _interopRequireDefault(_identifier);

var _join = require("./join");

var _join2 = _interopRequireDefault(_join);

var _literal = require("./literal");

var _literal2 = _interopRequireDefault(_literal);

var _query = require("./query");

var _query2 = _interopRequireDefault(_query);

var _raw = require("./raw");

var _raw2 = _interopRequireDefault(_raw);

var _value = require("./value");

var _value2 = _interopRequireDefault(_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.assign(_query2.default, {
  raw: _raw2.default, value: _value2.default, literal: _literal2.default, ident: _identifier2.default, concat: _join2.default, compile: _compile2.default
});
module.exports = exports["default"];
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;

var _enforceValidNode = require("./enforce-valid-node");

var _enforceValidNode2 = _interopRequireDefault(_enforceValidNode);

var _raw = require("./raw");

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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = trustedSymbol;
/* istanbul ignore next */
const trusted$$ = process.env.NODE_ENV === "production" ? Symbol("trusted") : Symbol.for("development");

function trustedSymbol() {
  return trusted$$;
}
module.exports = exports["default"];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = value;

var _trustedSymbol = require("./trusted-symbol");

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const trusted$$ = (0, _trustedSymbol2.default)();

function makeValueNode(val) {
  return { type: "VALUE", value: val, [trusted$$]: true };
}

/**
 * Creates a Sql item for a value that will be included in our final query.
 * This value will be added in a way which avoids Sql injection.
 */
function value(val) {
  return makeValueNode(val);
}
module.exports = exports["default"];
