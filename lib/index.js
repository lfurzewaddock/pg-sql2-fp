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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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

var _debug = __webpack_require__(9);

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
/* WEBPACK VAR INJECTION */(function(process) {

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

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
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compile = __webpack_require__(8);

var _compile2 = _interopRequireDefault(_compile);

var _identifier = __webpack_require__(14);

var _identifier2 = _interopRequireDefault(_identifier);

var _join = __webpack_require__(15);

var _join2 = _interopRequireDefault(_join);

var _literal = __webpack_require__(16);

var _literal2 = _interopRequireDefault(_literal);

var _query = __webpack_require__(18);

var _query2 = _interopRequireDefault(_query);

var _raw = __webpack_require__(2);

var _raw2 = _interopRequireDefault(_raw);

var _value = __webpack_require__(6);

var _value2 = _interopRequireDefault(_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.assign(_query2.default, {
  raw: _raw2.default, value: _value2.default, literal: _literal2.default, ident: _identifier2.default, concat: _join2.default, compile: _compile2.default
});
module.exports = exports["default"];

/***/ }),
/* 8 */
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

var _handleSqlIdentifier = __webpack_require__(12);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(10);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(11);

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleSqlIdentifier;

var _debugLog = __webpack_require__(0);

var _debugLog2 = _interopRequireDefault(_debugLog);

var _escapeSqlIdentifier = __webpack_require__(13);

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
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = identifier;

var _trustedSymbol = __webpack_require__(1);

var _trustedSymbol2 = _interopRequireDefault(_trustedSymbol);

var _ensureNonEmptyArray = __webpack_require__(5);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = join;

var _enforceValidNode = __webpack_require__(3);

var _enforceValidNode2 = _interopRequireDefault(_enforceValidNode);

var _ensureNonEmptyArray = __webpack_require__(5);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = literal;

var _raw = __webpack_require__(2);

var _raw2 = _interopRequireDefault(_raw);

var _value = __webpack_require__(6);

var _value2 = _interopRequireDefault(_value);

var _escapeSqlLiteral = __webpack_require__(17);

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
/* 17 */
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
/* 18 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGY1ZGEwN2RmMTBkYzE0ODkzNzAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlYnVnLWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJ1c3RlZC1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jhdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5mb3JjZS12YWxpZC1ub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vuc3VyZS1ub24tZW1wdHktYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbmRsZS1zcWwtaWRlbnRpZmllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXNjYXBlLXNxbC1pZGVudGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pZGVudGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qb2luLmpzIiwid2VicGFjazovLy8uL3NyYy9saXRlcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9lc2NhcGUtc3FsLWxpdGVyYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXJ5LmpzIl0sIm5hbWVzIjpbImRlYnVnTG9nIiwiZXJyb3IiLCJuYW1lc3BhY2UiLCJtc2ciLCJlcnIiLCJzdGFjayIsIm1lc3NhZ2UiLCJ0cnVzdGVkU3ltYm9sIiwiJCR0cnVzdGVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiU3ltYm9sIiwiZm9yIiwicmF3IiwibWFrZVJhd05vZGUiLCJ0ZXh0Iiwic3ltYm9sIiwidHJ1c3RTeW1ib2wiLCJyYXdUZXh0IiwiRXJyb3IiLCJTdHJpbmciLCJ0eXBlIiwiZW5mb3JjZVZhbGlkTm9kZSIsIm5vZGUiLCJlbnN1cmVOb25FbXB0eUFycmF5IiwiYXJyYXkiLCJhbGxvd1plcm9MZW5ndGgiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJpZHgiLCJsIiwidmFsdWUiLCJtYWtlVmFsdWVOb2RlIiwidmFsIiwiT2JqZWN0IiwiYXNzaWduIiwibGl0ZXJhbCIsImlkZW50IiwiY29uY2F0IiwiY29tcGlsZSIsInNxbCIsInNxbEZyYWdtZW50cyIsInZhbHVlcyIsIml0ZW1zIiwiaSIsInJhd0l0ZW0iLCJpdGVtIiwicHVzaCIsIm5hbWVzIiwiam9pbiIsImhhbmRsZVNxbElkZW50aWZpZXIiLCJuZXh0U3ltYm9sSWQiLCJzeW1ib2xUb0lkZW50aWZpZXIiLCJNYXAiLCJtYXBSZXN1bHQiLCJtYXAiLCJuYW1lIiwiaWRlbnRpZmllclN5bWJvbCIsImdldCIsInNldCIsImVzY2FwZVNxbElkZW50aWZpZXIiLCJzdHIiLCJkYmxRdW90ZUVzY2FwZWQiLCJmcm9tIiwiY2hhciIsImlkZW50aWZpZXIiLCJpc1N0cmluZ09yU3ltYm9sIiwibWFrZUlkZW50aWZpZXJOb2RlIiwiZXZlcnkiLCJyYXdTZXBhcmF0b3IiLCJzZXBhcmF0b3IiLCJjdXJyZW50SXRlbXMiLCJzZXBOb2RlIiwiaXRlbXNUb0FwcGVuZCIsInRydWVOb2RlIiwiZmFsc2VOb2RlIiwibnVsbE5vZGUiLCJtYXRjaCIsIk51bWJlciIsImlzRmluaXRlIiwiaXNJbnRlZ2VyIiwiZXNjYXBlU3FsTGl0ZXJhbCIsImhhc0JhY2tzbGFzaCIsImVzY2FwZWQiLCJjIiwicXVlcnkiLCJzdHJpbmdzIiwibm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztrQkNyTGRDLG1COztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsbUJBQVQsQ0FB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QUFDRCxPQUhELE1BR087QUFDTCxjQUFNakUsT0FBTyxnQ0FBaUJTLEtBQWpCLENBQWI7QUFDQVksY0FBTUksSUFBTixDQUFXekIsSUFBWDtBQUNEO0FBQ0Y7QUFDRjtBQUNELFNBQU9xQixLQUFQO0FBQ0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA0ZjVkYTA3ZGYxMGRjMTQ4OTM3MCIsImltcG9ydCBkZWJ1ZyBmcm9tIFwiZGVidWdcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVidWdMb2coZXJyb3IsIG5hbWVzcGFjZSA9IFwiXCIsIG1zZyA9IFwiXCIpIHtcbiAgbGV0IGVyciA9IGVycm9yO1xuICBpZiAoZXJyICE9PSBudWxsICYmIGVyci5zdGFjayAmJiBlcnIubWVzc2FnZSkge1xuICAgIGRlYnVnKGBwZy1zcWwyLWZwOiR7bmFtZXNwYWNlfWApKGAke21zZ30gJU9gLCBlcnIpO1xuICB9IGVsc2Uge1xuICAgIGVyciA9IG51bGw7XG4gICAgZGVidWcoYHBnLXNxbDItZnA6JHtuYW1lc3BhY2V9YCkoYCR7bXNnfWApO1xuICB9XG4gIHJldHVybiBlcnI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZGVidWctbG9nLmpzIiwiLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnZhciAkJHRydXN0ZWQgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgPyBTeW1ib2woXCJ0cnVzdGVkXCIpIDogU3ltYm9sLmZvcihcImRldmVsb3BtZW50XCIpOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdCAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cnVzdGVkU3ltYm9sKCkge1xuICByZXR1cm4gJCR0cnVzdGVkO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RydXN0ZWQtc3ltYm9sLmpzIiwiaW1wb3J0IGRlYnVnTG9nIGZyb20gXCIuL2RlYnVnLWxvZ1wiO1xuaW1wb3J0IHRydXN0ZWRTeW1ib2wgZnJvbSBcIi4vdHJ1c3RlZC1zeW1ib2xcIjtcblxuZnVuY3Rpb24gbWFrZVJhd05vZGUodGV4dCA9IFwiXCIsIHN5bWJvbCkge1xuICB2YXIgdHJ1c3RTeW1ib2wgPSBzeW1ib2w7XG4gIHZhciByYXdUZXh0ID0gdGV4dDtcblxuICBpZiAodHlwZW9mIHN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2Ygc3ltYm9sICE9PSBcInN5bWJvbFwiKSB7XG4gICAgdHJ1c3RTeW1ib2wgPSB0cnVzdGVkU3ltYm9sKCk7XG4gIH0gZWxzZSBpZiAoc3ltYm9sICE9PSB0cnVzdGVkU3ltYm9sKCkpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJTeW1ib2wgcHJvdmlkZWQgaXMgYSBmb3JnZXJ5IVwiKSwgXCJtYWtlUmF3Tm9kZVwiKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdGV4dCAhPT0gXCJzdHJpbmdcIikge1xuICAgIHJhd1RleHQgPSBTdHJpbmcodGV4dCk7XG4gIH1cbiAgcmV0dXJuIHsgdHlwZTogXCJSQVdcIiwgdGV4dDogcmF3VGV4dCwgW3RydXN0U3ltYm9sXTogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIFdBUk5JTkchOiBwcm9jZWVkIHdpdGggY2F1dGlvbiBhcyB0ZXh0IGlzIG5vdCBlc2NhcGVkIVxuICogQ3JlYXRlcyBhIFNxbCBpdGVtIGZvciByYXcgU1FMIHRleHQuIEp1c3QgcGxhaW4gb2zigJggcmF3IFNRTC5cbiAqIFRoaXMgbWV0aG9kIGlzIGRhbmdlcm91cyBiZWNhdXNlIGl0IGludm9sdmVzIG5vIGVzY2FwaW5nLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYXcodGV4dCwgc3ltYm9sKSB7XG4gIHJldHVybiBtYWtlUmF3Tm9kZSh0ZXh0LCBzeW1ib2wpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3Jhdy5qcyIsIlxuaW1wb3J0IHRydXN0ZWRTeW1ib2wgZnJvbSBcIi4vdHJ1c3RlZC1zeW1ib2xcIjtcblxudmFyICQkdHJ1c3RlZCA9IHRydXN0ZWRTeW1ib2woKTsgLyogZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItY29uc3QgKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5mb3JjZVZhbGlkTm9kZShub2RlKSB7XG4gIGlmIChub2RlICE9PSBudWxsICYmIHR5cGVvZiBub2RlID09PSBcIm9iamVjdFwiICYmIG5vZGVbJCR0cnVzdGVkXSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgU1FMIGl0ZW0sIGluc3RlYWQgcmVjZWl2ZWQgJyR7U3RyaW5nKG5vZGUpfScuYCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW5mb3JjZS12YWxpZC1ub2RlLmpzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuc3VyZU5vbkVtcHR5QXJyYXkoYXJyYXksIGFsbG93WmVyb0xlbmd0aCA9IGZhbHNlKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBhcnJheVwiKSwgXCJlbnN1cmVOb25FbXB0eUFycmF5XCIpO1xuICB9XG4gIGlmICghYWxsb3daZXJvTGVuZ3RoICYmIGFycmF5Lmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBub24tZW1wdHkgYXJyYXlcIiksIFwiZW5zdXJlTm9uRW1wdHlBcnJheVwiKTtcbiAgfVxuICBmb3IgKGxldCBpZHggPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpZHggPCBsOyBpZHggKz0gMSkge1xuICAgIGlmIChhcnJheVtpZHhdID09IG51bGwpIHtcbiAgICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihgQXJyYXkgaW5kZXggJHtpZHh9IGlzICR7U3RyaW5nKGFycmF5W2lkeF0pfWApLCBcImVuc3VyZU5vbkVtcHR5QXJyYXlcIik7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbnN1cmUtbm9uLWVtcHR5LWFycmF5LmpzIiwiaW1wb3J0IHRydXN0ZWRTeW1ib2wgZnJvbSBcIi4vdHJ1c3RlZC1zeW1ib2xcIjtcblxudmFyICQkdHJ1c3RlZCA9IHRydXN0ZWRTeW1ib2woKTsgLyogZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItY29uc3QgKi9cblxuZnVuY3Rpb24gbWFrZVZhbHVlTm9kZSh2YWwpIHtcbiAgcmV0dXJuIHsgdHlwZTogXCJWQUxVRVwiLCB2YWx1ZTogdmFsLCBbJCR0cnVzdGVkXTogdHJ1ZSB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBTcWwgaXRlbSBmb3IgYSB2YWx1ZSB0aGF0IHdpbGwgYmUgaW5jbHVkZWQgaW4gb3VyIGZpbmFsIHF1ZXJ5LlxuICogVGhpcyB2YWx1ZSB3aWxsIGJlIGFkZGVkIGluIGEgd2F5IHdoaWNoIGF2b2lkcyBTcWwgaW5qZWN0aW9uLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWx1ZSh2YWwpIHtcbiAgcmV0dXJuIG1ha2VWYWx1ZU5vZGUodmFsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy92YWx1ZS5qcyIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgY29tcGlsZSBmcm9tIFwiLi9jb21waWxlXCI7XG5pbXBvcnQgaWRlbnRpZmllciBmcm9tIFwiLi9pZGVudGlmaWVyXCI7XG5pbXBvcnQgam9pbiBmcm9tIFwiLi9qb2luXCI7XG5pbXBvcnQgbGl0ZXJhbCBmcm9tIFwiLi9saXRlcmFsXCI7XG5pbXBvcnQgcXVlcnkgZnJvbSBcIi4vcXVlcnlcIjtcbmltcG9ydCByYXcgZnJvbSBcIi4vcmF3XCI7XG5pbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihxdWVyeSwge1xuICByYXcsIHZhbHVlLCBsaXRlcmFsLCBpZGVudDogaWRlbnRpZmllciwgY29uY2F0OiBqb2luLCBjb21waWxlLFxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbmltcG9ydCBlbmZvcmNlVmFsaWROb2RlIGZyb20gXCIuL2VuZm9yY2UtdmFsaWQtbm9kZVwiO1xuaW1wb3J0IGhhbmRsZVNxbElkZW50aWZpZXIgZnJvbSBcIi4vaGFuZGxlLXNxbC1pZGVudGlmaWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBpbGUoc3FsKSB7XG4gIC8vIEpvaW4gdGhpcyB0byBnZW5lcmF0ZSB0aGUgU1FMIHF1ZXJ5XG4gIGNvbnN0IHNxbEZyYWdtZW50cyA9IFtdO1xuXG4gIC8vIFZhbHVlcyBob2xkIHRoZSBKYXZhU2NyaXB0IHZhbHVlcyB0aGF0IGFyZSByZXByZXNlbnRlZCBpbiB0aGUgcXVlcnlcbiAgLy8gc3RyaW5nIGJ5IHBsYWNlaG9sZGVycy4gVGhleSBhcmUgZWFnZXIgYmVjYXVzZSB0aGV5IHdlcmUgcHJvdmlkZWQgYmVmb3JlXG4gIC8vIGNvbXBpbGUgdGltZS5cbiAgY29uc3QgdmFsdWVzID0gW107XG5cbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHNxbCkgPyBzcWwgOiBbc3FsXTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJhd0l0ZW0gPSBpdGVtc1tpXTtcbiAgICBjb25zdCBpdGVtID0gZW5mb3JjZVZhbGlkTm9kZShyYXdJdGVtKTtcbiAgICBzd2l0Y2ggKGl0ZW0udHlwZSkge1xuICAgICAgY2FzZSBcIlJBV1wiOlxuICAgICAgICBpZiAodHlwZW9mIGl0ZW0udGV4dCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIlJBVyBub2RlIGV4cGVjdGVkIHN0cmluZ1wiKSwgXCJjb21waWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoaXMgaXMganVzdCByYXcgdGV4dCwgd2UgYWRkIGl0IGRpcmVjdGx5IHRvIHRoZSBxdWVyeSB0ZXh0LlxuICAgICAgICBzcWxGcmFnbWVudHMucHVzaChpdGVtLnRleHQpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJJREVOVElGSUVSXCI6XG4gICAgICAgIGlmIChpdGVtLm5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIklkZW50aWZpZXIgbXVzdCBoYXZlIGEgbmFtZVwiKSwgXCJjb21waWxlXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGdvdCBhbiBpZGVudGlmaWVyIHR5cGUsIGVzY2FwZSB0aGUgc3RyaW5ncyBhbmQgZ2V0IGEgbG9jYWxcbiAgICAgICAgLy8gaWRlbnRpZmllciBmb3Igbm9uLXN0cmluZyBpZGVudGlmaWVycy5cbiAgICAgICAgc3FsRnJhZ21lbnRzLnB1c2goaGFuZGxlU3FsSWRlbnRpZmllcihpdGVtLm5hbWVzKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlZBTFVFXCI6XG4gICAgICAgIC8vIElmIHdlIGdvdCBhIHZhbHVlIFNRTCBpdGVtLCBhZGQgYSBwbGFjZWhvbGRlciBhbmQgYWRkIHRoZSB2YWx1ZSB0byBvdXJcbiAgICAgICAgLy8gcGxhY2Vob2xkZXIgdmFsdWVzIGFycmF5LlxuICAgICAgICB2YWx1ZXMucHVzaChpdGVtLnZhbHVlKTtcbiAgICAgICAgc3FsRnJhZ21lbnRzLnB1c2goYCQke3ZhbHVlcy5sZW5ndGh9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKFwiU3FsIGl0ZW0gdHlwZSBub3QgcmVjb2duaXNlZCFcIiksIFwiY29tcGlsZVwiKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCB0ZXh0ID0gc3FsRnJhZ21lbnRzLmpvaW4oXCJcIik7XG4gIHJldHVybiB7XG4gICAgdGV4dCxcbiAgICB2YWx1ZXMsXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcGlsZS5qcyIsIi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2RlYnVnJyk7XG5leHBvcnRzLmxvZyA9IGxvZztcbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZVxuICAgICAgICAgICAgICAgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICA/IGNocm9tZS5zdG9yYWdlLmxvY2FsXG4gICAgICAgICAgICAgICAgICA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4vKipcbiAqIENvbG9ycy5cbiAqL1xuXG5leHBvcnRzLmNvbG9ycyA9IFtcbiAgJyMwMDAwQ0MnLCAnIzAwMDBGRicsICcjMDAzM0NDJywgJyMwMDMzRkYnLCAnIzAwNjZDQycsICcjMDA2NkZGJywgJyMwMDk5Q0MnLFxuICAnIzAwOTlGRicsICcjMDBDQzAwJywgJyMwMENDMzMnLCAnIzAwQ0M2NicsICcjMDBDQzk5JywgJyMwMENDQ0MnLCAnIzAwQ0NGRicsXG4gICcjMzMwMENDJywgJyMzMzAwRkYnLCAnIzMzMzNDQycsICcjMzMzM0ZGJywgJyMzMzY2Q0MnLCAnIzMzNjZGRicsICcjMzM5OUNDJyxcbiAgJyMzMzk5RkYnLCAnIzMzQ0MwMCcsICcjMzNDQzMzJywgJyMzM0NDNjYnLCAnIzMzQ0M5OScsICcjMzNDQ0NDJywgJyMzM0NDRkYnLFxuICAnIzY2MDBDQycsICcjNjYwMEZGJywgJyM2NjMzQ0MnLCAnIzY2MzNGRicsICcjNjZDQzAwJywgJyM2NkNDMzMnLCAnIzk5MDBDQycsXG4gICcjOTkwMEZGJywgJyM5OTMzQ0MnLCAnIzk5MzNGRicsICcjOTlDQzAwJywgJyM5OUNDMzMnLCAnI0NDMDAwMCcsICcjQ0MwMDMzJyxcbiAgJyNDQzAwNjYnLCAnI0NDMDA5OScsICcjQ0MwMENDJywgJyNDQzAwRkYnLCAnI0NDMzMwMCcsICcjQ0MzMzMzJywgJyNDQzMzNjYnLFxuICAnI0NDMzM5OScsICcjQ0MzM0NDJywgJyNDQzMzRkYnLCAnI0NDNjYwMCcsICcjQ0M2NjMzJywgJyNDQzk5MDAnLCAnI0NDOTkzMycsXG4gICcjQ0NDQzAwJywgJyNDQ0NDMzMnLCAnI0ZGMDAwMCcsICcjRkYwMDMzJywgJyNGRjAwNjYnLCAnI0ZGMDA5OScsICcjRkYwMENDJyxcbiAgJyNGRjAwRkYnLCAnI0ZGMzMwMCcsICcjRkYzMzMzJywgJyNGRjMzNjYnLCAnI0ZGMzM5OScsICcjRkYzM0NDJywgJyNGRjMzRkYnLFxuICAnI0ZGNjYwMCcsICcjRkY2NjMzJywgJyNGRjk5MDAnLCAnI0ZGOTkzMycsICcjRkZDQzAwJywgJyNGRkNDMzMnXG5dO1xuXG4vKipcbiAqIEN1cnJlbnRseSBvbmx5IFdlYktpdC1iYXNlZCBXZWIgSW5zcGVjdG9ycywgRmlyZWZveCA+PSB2MzEsXG4gKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cbiAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cbiAqXG4gKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xuICovXG5cbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgLy8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuICAvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuICAvLyBleHBsaWNpdGx5XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiB3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gIC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG4gIHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuICAgIC8vIGlzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxKSB8fFxuICAgIC8vIGRvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uKHYpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiAnW1VuZXhwZWN0ZWRKU09OUGFyc2VFcnJvcl06ICcgKyBlcnIubWVzc2FnZTtcbiAgfVxufTtcblxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgYXJnc1swXSA9ICh1c2VDb2xvcnMgPyAnJWMnIDogJycpXG4gICAgKyB0aGlzLm5hbWVzcGFjZVxuICAgICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKVxuICAgICsgYXJnc1swXVxuICAgICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKVxuICAgICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gIGlmICghdXNlQ29sb3JzKSByZXR1cm47XG5cbiAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICBhcmdzLnNwbGljZSgxLCAwLCBjLCAnY29sb3I6IGluaGVyaXQnKVxuXG4gIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgLy8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBsYXN0QyA9IDA7XG4gIGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIGlmICgnJSUnID09PSBtYXRjaCkgcmV0dXJuO1xuICAgIGluZGV4Kys7XG4gICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAvLyB3ZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcbiAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICBsYXN0QyA9IGluZGV4O1xuICAgIH1cbiAgfSk7XG5cbiAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUubG9nKClgIHdoZW4gYXZhaWxhYmxlLlxuICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvZygpIHtcbiAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgcmV0dXJuICdvYmplY3QnID09PSB0eXBlb2YgY29uc29sZVxuICAgICYmIGNvbnNvbGUubG9nXG4gICAgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogU2F2ZSBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICB0cnkge1xuICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgIH1cbiAgfSBjYXRjaChlKSB7fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHZhciByO1xuICB0cnkge1xuICAgIHIgPSBleHBvcnRzLnN0b3JhZ2UuZGVidWc7XG4gIH0gY2F0Y2goZSkge31cblxuICAvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG4gIGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuICAgIHIgPSBwcm9jZXNzLmVudi5ERUJVRztcbiAgfVxuXG4gIHJldHVybiByO1xufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgbG9jYWxTdG9yYWdlLmRlYnVnYCBpbml0aWFsbHkuXG4gKi9cblxuZXhwb3J0cy5lbmFibGUobG9hZCgpKTtcblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBBY3RpdmUgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydHMuaW5zdGFuY2VzID0gW107XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gKi9cblxuZXhwb3J0cy5uYW1lcyA9IFtdO1xuZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4vKipcbiAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAqXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgdmFyIGhhc2ggPSAwLCBpO1xuXG4gIGZvciAoaSBpbiBuYW1lc3BhY2UpIHtcbiAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXG4gIHZhciBwcmV2VGltZTtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcbiAgZGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgZXhwb3J0cy5pbnN0YW5jZXMucHVzaChkZWJ1Zyk7XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG5mdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgdmFyIGluZGV4ID0gZXhwb3J0cy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGV4cG9ydHMuaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIGk7XG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleHBvcnRzLmluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpbnN0YW5jZSA9IGV4cG9ydHMuaW5zdGFuY2VzW2ldO1xuICAgIGluc3RhbmNlLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQoaW5zdGFuY2UubmFtZXNwYWNlKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvZGVidWcuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHxcbiAgICBwbHVyYWwobXMsIGgsICdob3VyJykgfHxcbiAgICBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fFxuICAgIHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8XG4gICAgbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobXMgPCBuICogMS41KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWU7XG4gIH1cbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG5pbXBvcnQgZXNjYXBlU3FsSWRlbnRpZmllciBmcm9tIFwiLi9lc2NhcGUtc3FsLWlkZW50aWZpZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlU3FsSWRlbnRpZmllcihuYW1lcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobmFtZXMpIHx8IG5hbWVzLmxlbmd0aCA8IDEpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJFeHBlY3RlZCBub24tZW1wdHkgYXJyYXlcIiksIFwiaGFuZGxlU3FsSWRlbnRpZmllclwiKTtcbiAgfVxuICAvLyBXaGVuIHdlIGNvbWUgYWNjcm9zcyBhIHN5bWJvbCBpbiBvdXIgaWRlbnRpZmllciwgd2UgY3JlYXRlIGEgdW5pcXVlXG4gIC8vIGFsaWFzIGZvciBpdCB0aGF0IHNob3VsZG7igJl0IGJlIGluIHRoZSB1c2VycyBzY2hlbWEuIFRoaXMgaGVscHMgbWFpbnRhaW5cbiAgLy8gc2FuaXR5IHdoZW4gY29uc3RydWN0aW5nIGxhcmdlIFNxbCBxdWVyaWVzIHdpdGggbWFueSBhbGlhc2VzLlxuICBsZXQgbmV4dFN5bWJvbElkID0gMDtcblxuICBjb25zdCBzeW1ib2xUb0lkZW50aWZpZXIgPSBuZXcgTWFwKCk7XG5cbiAgY29uc3QgbWFwUmVzdWx0ID0gbmFtZXMubWFwKChuYW1lKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gZXNjYXBlU3FsSWRlbnRpZmllcihuYW1lKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgIC8vIEdldCB0aGUgY29ycmVjdCBpZGVudGlmaWVyIHN0cmluZyBmb3IgdGhpcyBzeW1ib2wuXG4gICAgICBsZXQgaWRlbnRpZmllclN5bWJvbCA9IHN5bWJvbFRvSWRlbnRpZmllci5nZXQobmFtZSk7IC8vIGdldCB2YWx1ZSBhc3NvY2lhdGVkIHRvIG5hbWVcblxuICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gaWRlbnRpZmllciwgY3JlYXRlIG9uZSBhbmQgc2V0IGl0LlxuICAgICAgaWYgKHR5cGVvZiBpZGVudGlmaWVyU3ltYm9sID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlkZW50aWZpZXJTeW1ib2wgPSBgX19sb2NhbF8ke25leHRTeW1ib2xJZCArPSAxfV9fYDsgLy8gTWFudWFseSBjcmVhdGUgc3ltYm9sIHdpdGggbWFnaWMgc3RyaW5nIGFuZCBpbmNyZW1lbnRcbiAgICAgICAgc3ltYm9sVG9JZGVudGlmaWVyLnNldChuYW1lLCBpZGVudGlmaWVyU3ltYm9sKTsgLy8gc2V0IHZhbHVlIGZvciB0aGUga2V5IGluIHRoZSBNYXAgb2JqZWN0LlxuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gdGhlIGlkZW50aWZpZXIuIEFzIHdlIGNyZWF0ZWQgaXQsIHdlIGRvIG5vdCBoYXZlIHRvXG4gICAgICAvLyBlc2NhcGUgaXQsIGJlY2F1c2Ugd2Uga25vdyBhbGwgb2YgdGhlIGNoYXJhY3RlcnMgYXJlIHNhZmUuXG4gICAgICByZXR1cm4gaWRlbnRpZmllclN5bWJvbDtcbiAgICB9XG5cbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoYEV4cGVjdGVkIHN0cmluZyBvciBzeW1ib2wsIHJlY2VpdmVkICcke1N0cmluZyhuYW1lKX0nYCksIFwiaGFuZGxlU3FsSWRlbnRpZmllclwiKTtcbiAgfSkuam9pbihcIi5cIik7XG5cbiAgcmV0dXJuIG1hcFJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9oYW5kbGUtc3FsLWlkZW50aWZpZXIuanMiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG4vLyBEZXJpdmVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2JyaWFuYy9ub2RlLXBvc3RncmVzL2Jsb2IvNmM4NDBhYWJiMDlmOGEyZDY0MDgwMDk1M2Y2Yjg4NGI2ODQxMzg0Yy9saWIvY2xpZW50LmpzI0wzMDZcbi8vIFdoaWNoIHdhcyBwb3J0ZWQgZnJvbSBQb3N0Z3JlU1FMIDkuMi40IHNvdXJjZSBjb2RlIGluIHNyYy9pbnRlcmZhY2VzL2xpYnBxL2ZlLWV4ZWMuY1xuLy8gRXNjYXBlcyBkb3VibGUgcXVvdGUgY2hhcmFjdGVycyBpbiBhIHN0cmluZ1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXNjYXBlU3FsSWRlbnRpZmllcihzdHIpIHtcbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBlbXB0eSBzdHJpbmcgcmVjZWl2ZWQ7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKGBFeHBlY3RlZCBzdHJpbmcsIHJlY2VpdmVkICcke1N0cmluZyhzdHIpfSdgKSwgXCJlc2NhcGVTcWxJZGVudGlmaWVyXCIpO1xuICB9XG5cbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBzdHJpbmcgd2l0aCBsZW5ndGggMCByZWNlaXZlZDtcbiAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgY29uc3QgZGJsUXVvdGVFc2NhcGVkID0gQXJyYXkuZnJvbShzdHIsIChjaGFyKSA9PiB7XG4gICAgaWYgKGNoYXIgPT09ICdcIicpIHsgLyogZXNsaW50LWRpc2FibGUtbGluZSBxdW90ZXMgKi9cbiAgICAgIHJldHVybiBjaGFyICsgY2hhcjtcbiAgICB9XG4gICAgcmV0dXJuIGNoYXI7XG4gIH0pO1xuXG4gIHJldHVybiBgXCIke2RibFF1b3RlRXNjYXBlZC5qb2luKFwiXCIpfVwiYDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lc2NhcGUtc3FsLWlkZW50aWZpZXIuanMiLCJpbXBvcnQgdHJ1c3RlZFN5bWJvbCBmcm9tIFwiLi90cnVzdGVkLXN5bWJvbFwiO1xuaW1wb3J0IGVuc3VyZU5vbkVtcHR5QXJyYXkgZnJvbSBcIi4vZW5zdXJlLW5vbi1lbXB0eS1hcnJheVwiO1xuXG52YXIgJCR0cnVzdGVkID0gdHJ1c3RlZFN5bWJvbCgpOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdCAqL1xuXG5mdW5jdGlvbiBpc1N0cmluZ09yU3ltYm9sKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsID09PSBcInN5bWJvbFwiO1xufVxuXG5mdW5jdGlvbiBtYWtlSWRlbnRpZmllck5vZGUobmFtZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KG5hbWVzKSB8fCAhbmFtZXMuZXZlcnkoaXNTdHJpbmdPclN5bWJvbCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50IHRvIG1ha2VJZGVudGlmaWVyTm9kZSAtIGV4cGVjdGVkIGFycmF5IG9mIHN0cmluZ3Mvc3ltYm9sc1wiKTtcbiAgfVxuICByZXR1cm4geyB0eXBlOiBcIklERU5USUZJRVJcIiwgbmFtZXMsIFskJHRydXN0ZWRdOiB0cnVlIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFNxbCBpdGVtIGZvciBhIFNxbCBpZGVudGlmaWVyLiBBIFNxbCBpZGVudGlmaWVyIGlzIGFueXRoaW5nIGxpa2VcbiAqIGEgdGFibGUsIHNjaGVtYSwgb3IgY29sdW1uIG5hbWUuIEFuIGlkZW50aWZpZXIgbWF5IGFsc28gaGF2ZSBhIG5hbWVzcGFjZSxcbiAqIHRodXMgd2h5IG1hbnkgbmFtZXMgYXJlIGFjY2VwdGVkLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpZGVudGlmaWVyKC4uLm5hbWVzKSB7XG4gIHJldHVybiBtYWtlSWRlbnRpZmllck5vZGUoZW5zdXJlTm9uRW1wdHlBcnJheShuYW1lcykpO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaWRlbnRpZmllci5qcyIsImltcG9ydCBlbmZvcmNlVmFsaWROb2RlIGZyb20gXCIuL2VuZm9yY2UtdmFsaWQtbm9kZVwiO1xuaW1wb3J0IGVuc3VyZU5vbkVtcHR5QXJyYXkgZnJvbSBcIi4vZW5zdXJlLW5vbi1lbXB0eS1hcnJheVwiO1xuaW1wb3J0IHJhdyBmcm9tIFwiLi9yYXdcIjtcblxuLyoqXG4gKiBKb2luIHNvbWUgU3FsIGl0ZW1zIHRvZ2V0aGVyIHNlcGVyYXRlZCBieSBhIHN0cmluZy4gVXNlZnVsIHdoZW4gZGVhbGluZ1xuICogd2l0aCBsaXN0cyBvZiBTcWwgaXRlbXMgdGhhdCBkb2VzbuKAmXQgbWFrZSBzZW5zZSBhcyBhIFNxbCBxdWVyeS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gam9pbihpdGVtcywgcmF3U2VwYXJhdG9yID0gXCJcIikge1xuICBlbnN1cmVOb25FbXB0eUFycmF5KGl0ZW1zLCB0cnVlKTtcbiAgaWYgKHR5cGVvZiByYXdTZXBhcmF0b3IgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHNlcGFyYXRvciAtIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gIH1cbiAgY29uc3Qgc2VwYXJhdG9yID0gcmF3U2VwYXJhdG9yO1xuICBjb25zdCBjdXJyZW50SXRlbXMgPSBbXTtcbiAgY29uc3Qgc2VwTm9kZSA9IHJhdyhzZXBhcmF0b3IpO1xuICBmb3IgKGxldCBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkgKz0gMSkge1xuICAgIGNvbnN0IHJhd0l0ZW0gPSBpdGVtc1tpXTtcbiAgICBsZXQgaXRlbXNUb0FwcGVuZDtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShyYXdJdGVtKSkge1xuICAgICAgaXRlbXNUb0FwcGVuZCA9IHJhd0l0ZW0ubWFwKGVuZm9yY2VWYWxpZE5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtc1RvQXBwZW5kID0gW2VuZm9yY2VWYWxpZE5vZGUocmF3SXRlbSldO1xuICAgIH1cbiAgICBpZiAoaSA9PT0gMCB8fCAhc2VwYXJhdG9yKSB7XG4gICAgICBjdXJyZW50SXRlbXMucHVzaCguLi5pdGVtc1RvQXBwZW5kKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VycmVudEl0ZW1zLnB1c2goc2VwTm9kZSwgLi4uaXRlbXNUb0FwcGVuZCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjdXJyZW50SXRlbXM7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvam9pbi5qcyIsImltcG9ydCByYXcgZnJvbSBcIi4vcmF3XCI7XG5pbXBvcnQgdmFsdWUgZnJvbSBcIi4vdmFsdWVcIjtcbmltcG9ydCBlc2NhcGVTcWxMaXRlcmFsIGZyb20gXCIuL2VzY2FwZS1zcWwtbGl0ZXJhbFwiO1xuXG5jb25zdCB0cnVlTm9kZSA9IHJhdyhgVFJVRWApOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuY29uc3QgZmFsc2VOb2RlID0gcmF3KGBGQUxTRWApOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuY29uc3QgbnVsbE5vZGUgPSByYXcoYE5VTExgKTsgLyogZXNsaW50LWRpc2FibGUtbGluZSBxdW90ZXMgKi9cblxuLyoqXG4gKiBJZiB0aGUgdmFsdWUgaXMgc2ltcGxlIHdpbGwgaW5saW5lIGl0IGludG8gdGhlIHF1ZXJ5LCBvdGhlcndpc2Ugd2lsbCBkZWZlclxuICogdG8gdmFsdWUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpdGVyYWwodmFsKSB7XG4gIC8vIE1hdGNoIGFscGhhbnVtZXJpYyBzdHJpbmcgYW5kL29yIC1fQCFcbiAgLy8gQmxvY2sgZG91YmxlIGh5cGhlbiAtLSB1c2VkIGZvciBjb21tZW50c1xuICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIiAmJiB2YWwubWF0Y2goL14oKD8hLXsyfSlbLWEtekEtWjAtOV9AISBdKSokLykpIHtcbiAgICByZXR1cm4gcmF3KGAke2VzY2FwZVNxbExpdGVyYWwodmFsKX1gKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZSh2YWwpKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsKSkge1xuICAgICAgcmV0dXJuIHJhdyhTdHJpbmcodmFsKSk7IC8vIG9ubHkgZGlnaXRzIGFuZCBoeXBoZW4gPSBpbnRlZ2VyIGxpdGVyYWxcbiAgICB9XG4gICAgcmV0dXJuIHJhdyhgJyR7MCArIHZhbH0nOjpmbG9hdGApO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIHZhbCA/IHRydWVOb2RlIDogZmFsc2VOb2RlO1xuICB9IGVsc2UgaWYgKHZhbCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxOb2RlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlKHZhbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbGl0ZXJhbC5qcyIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbi8vIERlcml2ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJpYW5jL25vZGUtcG9zdGdyZXMvYmxvYi82Yzg0MGFhYmIwOWY4YTJkNjQwODAwOTUzZjZiODg0YjY4NDEzODRjL2xpYi9jbGllbnQuanMjTDMyNVxuLy8gV2hpY2ggd2FzIHBvcnRlZCBmcm9tIFBvc3RncmVTUUwgOS4yLjQgc291cmNlIGNvZGUgaW4gc3JjL2ludGVyZmFjZXMvbGlicHEvZmUtZXhlYy5jXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVTcWxMaXRlcmFsKHN0cikge1xuICB2YXIgaGFzQmFja3NsYXNoID0gZmFsc2U7XG4gIHZhciBlc2NhcGVkID0gXCJcXCdcIjsgLyogZXNsaW50LWRpc2FibGUtbGluZSBuby11c2VsZXNzLWVzY2FwZSAqL1xuXG4gIC8vIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgZW1wdHkgc3RyaW5nIHJlY2VpdmVkO1xuICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihgRXhwZWN0ZWQgc3RyaW5nLCByZWNlaXZlZCAnJHtTdHJpbmcoc3RyKX0nYCksIFwiZXNjYXBlU3FsTGl0ZXJhbFwiKTtcbiAgfVxuXG4gIC8vIHJldHVybiBlbXB0eSBzdHJpbmcgaWYgc3RyaW5nIHdpdGggbGVuZ3RoIDAgcmVjZWl2ZWQ7XG4gIGlmICh0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiICYmIHN0ci5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgYyA9IHN0cltpXTtcbiAgICBpZiAoYyA9PT0gXCJcXCdcIikgeyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlICovXG4gICAgICBlc2NhcGVkICs9IGMgKyBjO1xuICAgIH0gZWxzZSBpZiAoYyA9PT0gXCJcXFxcXCIpIHtcbiAgICAgIGVzY2FwZWQgKz0gYyArIGM7XG4gICAgICBoYXNCYWNrc2xhc2ggPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBlc2NhcGVkICs9IGM7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlZCArPSBcIlxcJ1wiOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlICovXG5cbiAgaWYgKGhhc0JhY2tzbGFzaCA9PT0gdHJ1ZSkge1xuICAgIGVzY2FwZWQgPSAnIEUnICsgZXNjYXBlZDsgLyogZXNsaW50LWRpc2FibGUtbGluZSBwcmVmZXItdGVtcGxhdGUgKi8vKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuICB9XG5cbiAgcmV0dXJuIGVzY2FwZWQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXNjYXBlLXNxbC1saXRlcmFsLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBlbmZvcmNlVmFsaWROb2RlIGZyb20gXCIuL2VuZm9yY2UtdmFsaWQtbm9kZVwiO1xuaW1wb3J0IHJhdyBmcm9tIFwiLi9yYXdcIjtcblxuLyoqXG4gKiBBIHRlbXBsYXRlIHN0cmluZyB0YWcgdGhhdCBjcmVhdGVzIGEgYFNxbGAgcXVlcnkgb3V0IG9mIHNvbWUgc3RyaW5ncyBhbmRcbiAqIHNvbWUgdmFsdWVzLiBVc2UgdGhpcyB0byBjb25zdHJ1Y3QgYWxsIFBvc3RncmVTUUwgcXVlcmllcyB0byBhdm9pZCBTUUxcbiAqIGluamVjdGlvbi5cbiAqXG4gKiBOb3RlIHRoYXQgdXNpbmcgdGhpcyBmdW5jdGlvbiwgdGhlIHVzZXIgKm11c3QqIHNwZWNpZnkgaWYgdGhleSBhcmUgaW5qZWN0aW5nXG4gKiByYXcgdGV4dC4gVGhpcyBtYWtlcyBhIFNRTCBpbmplY3Rpb24gdnVsbmVyYWJpbGl0eSBoYXJkZXIgdG8gY3JlYXRlLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWVyeShzdHJpbmdzLCAuLi52YWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHN0cmluZ3MpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwicXVlcnkgc2hvdWxkIGJlIHVzZWQgYXMgYSB0ZW1wbGF0ZSBsaXRlcmFsLCBub3QgYSBmdW5jdGlvbiBjYWxsIVwiKTtcbiAgfVxuICBjb25zdCBpdGVtcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMCwgbCA9IHN0cmluZ3MubGVuZ3RoOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgY29uc3QgdGV4dCA9IHN0cmluZ3NbaV07XG4gICAgaWYgKHRleHQubGVuZ3RoID4gMCkge1xuICAgICAgaXRlbXMucHVzaChyYXcodGV4dCkpO1xuICAgIH1cbiAgICBpZiAodmFsdWVzW2ldKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHZhbHVlc1tpXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBjb25zdCBub2RlcyA9IHZhbHVlLm1hcChlbmZvcmNlVmFsaWROb2RlKTtcbiAgICAgICAgaXRlbXMucHVzaCguLi5ub2Rlcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBub2RlID0gZW5mb3JjZVZhbGlkTm9kZSh2YWx1ZSk7XG4gICAgICAgIGl0ZW1zLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpdGVtcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9xdWVyeS5qcyJdLCJzb3VyY2VSb290IjoiIn0=