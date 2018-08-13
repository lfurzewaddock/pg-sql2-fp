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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjdlNjI3YzUzN2YxYWY1OTEwNjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlYnVnLWxvZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHJ1c3RlZC1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Jhdy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5mb3JjZS12YWxpZC1ub2RlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vuc3VyZS1ub24tZW1wdHktYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbHVlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hhbmRsZS1zcWwtaWRlbnRpZmllci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZXNjYXBlLXNxbC1pZGVudGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9pZGVudGlmaWVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qb2luLmpzIiwid2VicGFjazovLy8uL3NyYy9saXRlcmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9lc2NhcGUtc3FsLWxpdGVyYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXJ5LmpzIl0sIm5hbWVzIjpbImRlYnVnTG9nIiwiZXJyb3IiLCJuYW1lc3BhY2UiLCJtc2ciLCJlcnIiLCJzdGFjayIsIm1lc3NhZ2UiLCJ0cnVzdGVkU3ltYm9sIiwiJCR0cnVzdGVkIiwicHJvY2VzcyIsImVudiIsIk5PREVfRU5WIiwiU3ltYm9sIiwiZm9yIiwicmF3IiwibWFrZVJhd05vZGUiLCJ0ZXh0Iiwic3ltYm9sIiwidHJ1c3RTeW1ib2wiLCJyYXdUZXh0IiwiRXJyb3IiLCJTdHJpbmciLCJ0eXBlIiwiZW5mb3JjZVZhbGlkTm9kZSIsIm5vZGUiLCJlbnN1cmVOb25FbXB0eUFycmF5IiwiYXJyYXkiLCJhbGxvd1plcm9MZW5ndGgiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJpZHgiLCJsIiwidmFsdWUiLCJtYWtlVmFsdWVOb2RlIiwidmFsIiwiT2JqZWN0IiwiYXNzaWduIiwibGl0ZXJhbCIsImlkZW50IiwiY29uY2F0IiwiY29tcGlsZSIsInNxbCIsInNxbEZyYWdtZW50cyIsInZhbHVlcyIsIml0ZW1zIiwiaSIsInJhd0l0ZW0iLCJpdGVtIiwicHVzaCIsIm5hbWVzIiwiam9pbiIsImhhbmRsZVNxbElkZW50aWZpZXIiLCJuZXh0U3ltYm9sSWQiLCJzeW1ib2xUb0lkZW50aWZpZXIiLCJNYXAiLCJtYXBSZXN1bHQiLCJtYXAiLCJuYW1lIiwiaWRlbnRpZmllclN5bWJvbCIsImdldCIsInNldCIsImVzY2FwZVNxbElkZW50aWZpZXIiLCJzdHIiLCJkYmxRdW90ZUVzY2FwZWQiLCJmcm9tIiwiY2hhciIsImlkZW50aWZpZXIiLCJpc1N0cmluZ09yU3ltYm9sIiwibWFrZUlkZW50aWZpZXJOb2RlIiwiZXZlcnkiLCJyYXdTZXBhcmF0b3IiLCJzZXBhcmF0b3IiLCJjdXJyZW50SXRlbXMiLCJzZXBOb2RlIiwiaXRlbXNUb0FwcGVuZCIsInRydWVOb2RlIiwiZmFsc2VOb2RlIiwibnVsbE5vZGUiLCJtYXRjaCIsIk51bWJlciIsImlzRmluaXRlIiwiaXNJbnRlZ2VyIiwiZXNjYXBlU3FsTGl0ZXJhbCIsImhhc0JhY2tzbGFzaCIsImVzY2FwZWQiLCJjIiwicXVlcnkiLCJzdHJpbmdzIiwibm9kZXMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztrQkMzRHdCQSxROztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsUUFBVCxDQUFrQkMsS0FBbEIsRUFBeUJDLFlBQVksRUFBckMsRUFBeUNDLE1BQU0sRUFBL0MsRUFBbUQ7QUFDaEUsTUFBSUMsTUFBTUgsS0FBVjtBQUNBLE1BQUlHLFFBQVEsSUFBUixJQUFnQkEsSUFBSUMsS0FBcEIsSUFBNkJELElBQUlFLE9BQXJDLEVBQThDO0FBQzVDLHlCQUFPLGNBQWFKLFNBQVUsRUFBOUIsRUFBa0MsR0FBRUMsR0FBSSxLQUF4QyxFQUE4Q0MsR0FBOUM7QUFDRCxHQUZELE1BRU87QUFDTEEsVUFBTSxJQUFOO0FBQ0EseUJBQU8sY0FBYUYsU0FBVSxFQUE5QixFQUFrQyxHQUFFQyxHQUFJLEVBQXhDO0FBQ0Q7QUFDRCxTQUFPQyxHQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7O2tCQ1J1QkcsYTtBQUh4QjtBQUNBLElBQUlDLFlBQVlDLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUF6QixHQUF3Q0MsT0FBTyxTQUFQLENBQXhDLEdBQTREQSxPQUFPQyxHQUFQLENBQVcsYUFBWCxDQUE1RSxDLENBQXVHOztBQUV4RixTQUFTTixhQUFULEdBQXlCO0FBQ3RDLFNBQU9DLFNBQVA7QUFDRCxDOzs7Ozs7Ozs7Ozs7O2tCQ21CdUJNLEc7O0FBeEJ4Qjs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQyxXQUFULENBQXFCQyxPQUFPLEVBQTVCLEVBQWdDQyxNQUFoQyxFQUF3QztBQUN0QyxNQUFJQyxjQUFjRCxNQUFsQjtBQUNBLE1BQUlFLFVBQVVILElBQWQ7O0FBRUEsTUFBSSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLElBQWlDLE9BQU9BLE1BQVAsS0FBa0IsUUFBdkQsRUFBaUU7QUFDL0RDLGtCQUFjLDhCQUFkO0FBQ0QsR0FGRCxNQUVPLElBQUlELFdBQVcsOEJBQWYsRUFBZ0M7QUFDckMsVUFBTSx3QkFBUyxJQUFJRyxLQUFKLENBQVUsK0JBQVYsQ0FBVCxFQUFxRCxhQUFyRCxDQUFOO0FBQ0Q7O0FBRUQsTUFBSSxPQUFPSixJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCRyxjQUFVRSxPQUFPTCxJQUFQLENBQVY7QUFDRDtBQUNELFNBQU8sRUFBRU0sTUFBTSxLQUFSLEVBQWVOLE1BQU1HLE9BQXJCLEVBQThCLENBQUNELFdBQUQsR0FBZSxJQUE3QyxFQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS2UsU0FBU0osR0FBVCxDQUFhRSxJQUFiLEVBQW1CQyxNQUFuQixFQUEyQjtBQUN4QyxTQUFPRixZQUFZQyxJQUFaLEVBQWtCQyxNQUFsQixDQUFQO0FBQ0QsQzs7Ozs7Ozs7Ozs7O2tCQ3JCdUJNLGdCOztBQUp4Qjs7Ozs7O0FBRUEsSUFBSWYsWUFBWSw4QkFBaEIsQyxDQUFpQzs7QUFFbEIsU0FBU2UsZ0JBQVQsQ0FBMEJDLElBQTFCLEVBQWdDO0FBQzdDLE1BQUlBLFNBQVMsSUFBVCxJQUFpQixPQUFPQSxJQUFQLEtBQWdCLFFBQWpDLElBQTZDQSxLQUFLaEIsU0FBTCxNQUFvQixJQUFyRSxFQUEyRTtBQUN6RSxXQUFPZ0IsSUFBUDtBQUNEO0FBQ0QsUUFBTSxJQUFJSixLQUFKLENBQVcsd0NBQXVDQyxPQUFPRyxJQUFQLENBQWEsSUFBL0QsQ0FBTjtBQUNELEM7Ozs7OztBQ1ZEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7a0JDckxkQyxtQjs7QUFGeEI7Ozs7OztBQUVlLFNBQVNBLG1CQUFU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R0FBR3dDLEtBQWQ7QUFDRCxPQUhELE1BR087QUFDTCxjQUFNakUsT0FBTyxnQ0FBaUJTLEtBQWpCLENBQWI7QUFDQVksY0FBTUksSUFBTixDQUFXekIsSUFBWDtBQUNEO0FBQ0Y7QUFDRjtBQUNELFNBQU9xQixLQUFQO0FBQ0QsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDcpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDY3ZTYyN2M1MzdmMWFmNTkxMDY3IiwiaW1wb3J0IGRlYnVnIGZyb20gXCJkZWJ1Z1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJ1Z0xvZyhlcnJvciwgbmFtZXNwYWNlID0gXCJcIiwgbXNnID0gXCJcIikge1xuICBsZXQgZXJyID0gZXJyb3I7XG4gIGlmIChlcnIgIT09IG51bGwgJiYgZXJyLnN0YWNrICYmIGVyci5tZXNzYWdlKSB7XG4gICAgZGVidWcoYHBnLXNxbDItZnA6JHtuYW1lc3BhY2V9YCkoYCR7bXNnfSAlT2AsIGVycik7XG4gIH0gZWxzZSB7XG4gICAgZXJyID0gbnVsbDtcbiAgICBkZWJ1ZyhgcGctc3FsMi1mcDoke25hbWVzcGFjZX1gKShgJHttc2d9YCk7XG4gIH1cbiAgcmV0dXJuIGVycjtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9kZWJ1Zy1sb2cuanMiLCIvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xudmFyICQkdHJ1c3RlZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiA/IFN5bWJvbChcInRydXN0ZWRcIikgOiBTeW1ib2wuZm9yKFwiZGV2ZWxvcG1lbnRcIik7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLWNvbnN0ICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRydXN0ZWRTeW1ib2woKSB7XG4gIHJldHVybiAkJHRydXN0ZWQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHJ1c3RlZC1zeW1ib2wuanMiLCJpbXBvcnQgZGVidWdMb2cgZnJvbSBcIi4vZGVidWctbG9nXCI7XG5pbXBvcnQgdHJ1c3RlZFN5bWJvbCBmcm9tIFwiLi90cnVzdGVkLXN5bWJvbFwiO1xuXG5mdW5jdGlvbiBtYWtlUmF3Tm9kZSh0ZXh0ID0gXCJcIiwgc3ltYm9sKSB7XG4gIHZhciB0cnVzdFN5bWJvbCA9IHN5bWJvbDtcbiAgdmFyIHJhd1RleHQgPSB0ZXh0O1xuXG4gIGlmICh0eXBlb2Ygc3ltYm9sID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBzeW1ib2wgIT09IFwic3ltYm9sXCIpIHtcbiAgICB0cnVzdFN5bWJvbCA9IHRydXN0ZWRTeW1ib2woKTtcbiAgfSBlbHNlIGlmIChzeW1ib2wgIT09IHRydXN0ZWRTeW1ib2woKSkge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIlN5bWJvbCBwcm92aWRlZCBpcyBhIGZvcmdlcnkhXCIpLCBcIm1ha2VSYXdOb2RlXCIpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB0ZXh0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgcmF3VGV4dCA9IFN0cmluZyh0ZXh0KTtcbiAgfVxuICByZXR1cm4geyB0eXBlOiBcIlJBV1wiLCB0ZXh0OiByYXdUZXh0LCBbdHJ1c3RTeW1ib2xdOiB0cnVlIH07XG59XG5cbi8qKlxuICogV0FSTklORyE6IHByb2NlZWQgd2l0aCBjYXV0aW9uIGFzIHRleHQgaXMgbm90IGVzY2FwZWQhXG4gKiBDcmVhdGVzIGEgU3FsIGl0ZW0gZm9yIHJhdyBTUUwgdGV4dC4gSnVzdCBwbGFpbiBvbOKAmCByYXcgU1FMLlxuICogVGhpcyBtZXRob2QgaXMgZGFuZ2Vyb3VzIGJlY2F1c2UgaXQgaW52b2x2ZXMgbm8gZXNjYXBpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhdyh0ZXh0LCBzeW1ib2wpIHtcbiAgcmV0dXJuIG1ha2VSYXdOb2RlKHRleHQsIHN5bWJvbCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmF3LmpzIiwiXG5pbXBvcnQgdHJ1c3RlZFN5bWJvbCBmcm9tIFwiLi90cnVzdGVkLXN5bWJvbFwiO1xuXG52YXIgJCR0cnVzdGVkID0gdHJ1c3RlZFN5bWJvbCgpOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdCAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbmZvcmNlVmFsaWROb2RlKG5vZGUpIHtcbiAgaWYgKG5vZGUgIT09IG51bGwgJiYgdHlwZW9mIG5vZGUgPT09IFwib2JqZWN0XCIgJiYgbm9kZVskJHRydXN0ZWRdID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBTUUwgaXRlbSwgaW5zdGVhZCByZWNlaXZlZCAnJHtTdHJpbmcobm9kZSl9Jy5gKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lbmZvcmNlLXZhbGlkLW5vZGUuanMiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5zdXJlTm9uRW1wdHlBcnJheShhcnJheSwgYWxsb3daZXJvTGVuZ3RoID0gZmFsc2UpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIkV4cGVjdGVkIGFycmF5XCIpLCBcImVuc3VyZU5vbkVtcHR5QXJyYXlcIik7XG4gIH1cbiAgaWYgKCFhbGxvd1plcm9MZW5ndGggJiYgYXJyYXkubGVuZ3RoIDwgMSkge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIkV4cGVjdGVkIG5vbi1lbXB0eSBhcnJheVwiKSwgXCJlbnN1cmVOb25FbXB0eUFycmF5XCIpO1xuICB9XG4gIGZvciAobGV0IGlkeCA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGlkeCA8IGw7IGlkeCArPSAxKSB7XG4gICAgaWYgKGFycmF5W2lkeF0gPT0gbnVsbCkge1xuICAgICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKGBBcnJheSBpbmRleCAke2lkeH0gaXMgJHtTdHJpbmcoYXJyYXlbaWR4XSl9YCksIFwiZW5zdXJlTm9uRW1wdHlBcnJheVwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2Vuc3VyZS1ub24tZW1wdHktYXJyYXkuanMiLCJpbXBvcnQgdHJ1c3RlZFN5bWJvbCBmcm9tIFwiLi90cnVzdGVkLXN5bWJvbFwiO1xuXG52YXIgJCR0cnVzdGVkID0gdHJ1c3RlZFN5bWJvbCgpOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci1jb25zdCAqL1xuXG5mdW5jdGlvbiBtYWtlVmFsdWVOb2RlKHZhbCkge1xuICByZXR1cm4geyB0eXBlOiBcIlZBTFVFXCIsIHZhbHVlOiB2YWwsIFskJHRydXN0ZWRdOiB0cnVlIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFNxbCBpdGVtIGZvciBhIHZhbHVlIHRoYXQgd2lsbCBiZSBpbmNsdWRlZCBpbiBvdXIgZmluYWwgcXVlcnkuXG4gKiBUaGlzIHZhbHVlIHdpbGwgYmUgYWRkZWQgaW4gYSB3YXkgd2hpY2ggYXZvaWRzIFNxbCBpbmplY3Rpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHZhbHVlKHZhbCkge1xuICByZXR1cm4gbWFrZVZhbHVlTm9kZSh2YWwpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZhbHVlLmpzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjb21waWxlIGZyb20gXCIuL2NvbXBpbGVcIjtcbmltcG9ydCBpZGVudGlmaWVyIGZyb20gXCIuL2lkZW50aWZpZXJcIjtcbmltcG9ydCBqb2luIGZyb20gXCIuL2pvaW5cIjtcbmltcG9ydCBsaXRlcmFsIGZyb20gXCIuL2xpdGVyYWxcIjtcbmltcG9ydCBxdWVyeSBmcm9tIFwiLi9xdWVyeVwiO1xuaW1wb3J0IHJhdyBmcm9tIFwiLi9yYXdcIjtcbmltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBPYmplY3QuYXNzaWduKHF1ZXJ5LCB7XG4gIHJhdywgdmFsdWUsIGxpdGVyYWwsIGlkZW50OiBpZGVudGlmaWVyLCBjb25jYXQ6IGpvaW4sIGNvbXBpbGUsXG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiaW1wb3J0IGRlYnVnTG9nIGZyb20gXCIuL2RlYnVnLWxvZ1wiO1xuaW1wb3J0IGVuZm9yY2VWYWxpZE5vZGUgZnJvbSBcIi4vZW5mb3JjZS12YWxpZC1ub2RlXCI7XG5pbXBvcnQgaGFuZGxlU3FsSWRlbnRpZmllciBmcm9tIFwiLi9oYW5kbGUtc3FsLWlkZW50aWZpZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGlsZShzcWwpIHtcbiAgLy8gSm9pbiB0aGlzIHRvIGdlbmVyYXRlIHRoZSBTUUwgcXVlcnlcbiAgY29uc3Qgc3FsRnJhZ21lbnRzID0gW107XG5cbiAgLy8gVmFsdWVzIGhvbGQgdGhlIEphdmFTY3JpcHQgdmFsdWVzIHRoYXQgYXJlIHJlcHJlc2VudGVkIGluIHRoZSBxdWVyeVxuICAvLyBzdHJpbmcgYnkgcGxhY2Vob2xkZXJzLiBUaGV5IGFyZSBlYWdlciBiZWNhdXNlIHRoZXkgd2VyZSBwcm92aWRlZCBiZWZvcmVcbiAgLy8gY29tcGlsZSB0aW1lLlxuICBjb25zdCB2YWx1ZXMgPSBbXTtcblxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkoc3FsKSA/IHNxbCA6IFtzcWxdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgY29uc3QgcmF3SXRlbSA9IGl0ZW1zW2ldO1xuICAgIGNvbnN0IGl0ZW0gPSBlbmZvcmNlVmFsaWROb2RlKHJhd0l0ZW0pO1xuICAgIHN3aXRjaCAoaXRlbS50eXBlKSB7XG4gICAgICBjYXNlIFwiUkFXXCI6XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbS50ZXh0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKFwiUkFXIG5vZGUgZXhwZWN0ZWQgc3RyaW5nXCIpLCBcImNvbXBpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhpcyBpcyBqdXN0IHJhdyB0ZXh0LCB3ZSBhZGQgaXQgZGlyZWN0bHkgdG8gdGhlIHF1ZXJ5IHRleHQuXG4gICAgICAgIHNxbEZyYWdtZW50cy5wdXNoKGl0ZW0udGV4dCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIklERU5USUZJRVJcIjpcbiAgICAgICAgaWYgKGl0ZW0ubmFtZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKFwiSWRlbnRpZmllciBtdXN0IGhhdmUgYSBuYW1lXCIpLCBcImNvbXBpbGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgZ290IGFuIGlkZW50aWZpZXIgdHlwZSwgZXNjYXBlIHRoZSBzdHJpbmdzIGFuZCBnZXQgYSBsb2NhbFxuICAgICAgICAvLyBpZGVudGlmaWVyIGZvciBub24tc3RyaW5nIGlkZW50aWZpZXJzLlxuICAgICAgICBzcWxGcmFnbWVudHMucHVzaChoYW5kbGVTcWxJZGVudGlmaWVyKGl0ZW0ubmFtZXMpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVkFMVUVcIjpcbiAgICAgICAgLy8gSWYgd2UgZ290IGEgdmFsdWUgU1FMIGl0ZW0sIGFkZCBhIHBsYWNlaG9sZGVyIGFuZCBhZGQgdGhlIHZhbHVlIHRvIG91clxuICAgICAgICAvLyBwbGFjZWhvbGRlciB2YWx1ZXMgYXJyYXkuXG4gICAgICAgIHZhbHVlcy5wdXNoKGl0ZW0udmFsdWUpO1xuICAgICAgICBzcWxGcmFnbWVudHMucHVzaChgJCR7dmFsdWVzLmxlbmd0aH1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoXCJTcWwgaXRlbSB0eXBlIG5vdCByZWNvZ25pc2VkIVwiKSwgXCJjb21waWxlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRleHQgPSBzcWxGcmFnbWVudHMuam9pbihcIlwiKTtcbiAgcmV0dXJuIHtcbiAgICB0ZXh0LFxuICAgIHZhbHVlcyxcbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21waWxlLmpzIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbmltcG9ydCBlc2NhcGVTcWxJZGVudGlmaWVyIGZyb20gXCIuL2VzY2FwZS1zcWwtaWRlbnRpZmllclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYW5kbGVTcWxJZGVudGlmaWVyKG5hbWVzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShuYW1lcykgfHwgbmFtZXMubGVuZ3RoIDwgMSkge1xuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihcIkV4cGVjdGVkIG5vbi1lbXB0eSBhcnJheVwiKSwgXCJoYW5kbGVTcWxJZGVudGlmaWVyXCIpO1xuICB9XG4gIC8vIFdoZW4gd2UgY29tZSBhY2Nyb3NzIGEgc3ltYm9sIGluIG91ciBpZGVudGlmaWVyLCB3ZSBjcmVhdGUgYSB1bmlxdWVcbiAgLy8gYWxpYXMgZm9yIGl0IHRoYXQgc2hvdWxkbuKAmXQgYmUgaW4gdGhlIHVzZXJzIHNjaGVtYS4gVGhpcyBoZWxwcyBtYWludGFpblxuICAvLyBzYW5pdHkgd2hlbiBjb25zdHJ1Y3RpbmcgbGFyZ2UgU3FsIHF1ZXJpZXMgd2l0aCBtYW55IGFsaWFzZXMuXG4gIGxldCBuZXh0U3ltYm9sSWQgPSAwO1xuXG4gIGNvbnN0IHN5bWJvbFRvSWRlbnRpZmllciA9IG5ldyBNYXAoKTtcblxuICBjb25zdCBtYXBSZXN1bHQgPSBuYW1lcy5tYXAoKG5hbWUpID0+IHtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiBlc2NhcGVTcWxJZGVudGlmaWVyKG5hbWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgLy8gR2V0IHRoZSBjb3JyZWN0IGlkZW50aWZpZXIgc3RyaW5nIGZvciB0aGlzIHN5bWJvbC5cbiAgICAgIGxldCBpZGVudGlmaWVyU3ltYm9sID0gc3ltYm9sVG9JZGVudGlmaWVyLmdldChuYW1lKTsgLy8gZ2V0IHZhbHVlIGFzc29jaWF0ZWQgdG8gbmFtZVxuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBubyBpZGVudGlmaWVyLCBjcmVhdGUgb25lIGFuZCBzZXQgaXQuXG4gICAgICBpZiAodHlwZW9mIGlkZW50aWZpZXJTeW1ib2wgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWRlbnRpZmllclN5bWJvbCA9IGBfX2xvY2FsXyR7bmV4dFN5bWJvbElkICs9IDF9X19gOyAvLyBNYW51YWx5IGNyZWF0ZSBzeW1ib2wgd2l0aCBtYWdpYyBzdHJpbmcgYW5kIGluY3JlbWVudFxuICAgICAgICBzeW1ib2xUb0lkZW50aWZpZXIuc2V0KG5hbWUsIGlkZW50aWZpZXJTeW1ib2wpOyAvLyBzZXQgdmFsdWUgZm9yIHRoZSBrZXkgaW4gdGhlIE1hcCBvYmplY3QuXG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiB0aGUgaWRlbnRpZmllci4gQXMgd2UgY3JlYXRlZCBpdCwgd2UgZG8gbm90IGhhdmUgdG9cbiAgICAgIC8vIGVzY2FwZSBpdCwgYmVjYXVzZSB3ZSBrbm93IGFsbCBvZiB0aGUgY2hhcmFjdGVycyBhcmUgc2FmZS5cbiAgICAgIHJldHVybiBpZGVudGlmaWVyU3ltYm9sO1xuICAgIH1cblxuICAgIHRocm93IGRlYnVnTG9nKG5ldyBFcnJvcihgRXhwZWN0ZWQgc3RyaW5nIG9yIHN5bWJvbCwgcmVjZWl2ZWQgJyR7U3RyaW5nKG5hbWUpfSdgKSwgXCJoYW5kbGVTcWxJZGVudGlmaWVyXCIpO1xuICB9KS5qb2luKFwiLlwiKTtcblxuICByZXR1cm4gbWFwUmVzdWx0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2hhbmRsZS1zcWwtaWRlbnRpZmllci5qcyIsImltcG9ydCBkZWJ1Z0xvZyBmcm9tIFwiLi9kZWJ1Zy1sb2dcIjtcbi8vIERlcml2ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJpYW5jL25vZGUtcG9zdGdyZXMvYmxvYi82Yzg0MGFhYmIwOWY4YTJkNjQwODAwOTUzZjZiODg0YjY4NDEzODRjL2xpYi9jbGllbnQuanMjTDMwNlxuLy8gV2hpY2ggd2FzIHBvcnRlZCBmcm9tIFBvc3RncmVTUUwgOS4yLjQgc291cmNlIGNvZGUgaW4gc3JjL2ludGVyZmFjZXMvbGlicHEvZmUtZXhlYy5jXG4vLyBFc2NhcGVzIGRvdWJsZSBxdW90ZSBjaGFyYWN0ZXJzIGluIGEgc3RyaW5nXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlc2NhcGVTcWxJZGVudGlmaWVyKHN0cikge1xuICAvLyByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIGVtcHR5IHN0cmluZyByZWNlaXZlZDtcbiAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBkZWJ1Z0xvZyhuZXcgRXJyb3IoYEV4cGVjdGVkIHN0cmluZywgcmVjZWl2ZWQgJyR7U3RyaW5nKHN0cil9J2ApLCBcImVzY2FwZVNxbElkZW50aWZpZXJcIik7XG4gIH1cblxuICAvLyByZXR1cm4gZW1wdHkgc3RyaW5nIGlmIHN0cmluZyB3aXRoIGxlbmd0aCAwIHJlY2VpdmVkO1xuICBpZiAodHlwZW9mIHN0ciA9PT0gXCJzdHJpbmdcIiAmJiBzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCBkYmxRdW90ZUVzY2FwZWQgPSBBcnJheS5mcm9tKHN0ciwgKGNoYXIpID0+IHtcbiAgICBpZiAoY2hhciA9PT0gJ1wiJykgeyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuICAgICAgcmV0dXJuIGNoYXIgKyBjaGFyO1xuICAgIH1cbiAgICByZXR1cm4gY2hhcjtcbiAgfSk7XG5cbiAgcmV0dXJuIGBcIiR7ZGJsUXVvdGVFc2NhcGVkLmpvaW4oXCJcIil9XCJgO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VzY2FwZS1zcWwtaWRlbnRpZmllci5qcyIsImltcG9ydCB0cnVzdGVkU3ltYm9sIGZyb20gXCIuL3RydXN0ZWQtc3ltYm9sXCI7XG5pbXBvcnQgZW5zdXJlTm9uRW1wdHlBcnJheSBmcm9tIFwiLi9lbnN1cmUtbm9uLWVtcHR5LWFycmF5XCI7XG5cbnZhciAkJHRydXN0ZWQgPSB0cnVzdGVkU3ltYm9sKCk7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLWNvbnN0ICovXG5cbmZ1bmN0aW9uIGlzU3RyaW5nT3JTeW1ib2wodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiB2YWwgPT09IFwic3ltYm9sXCI7XG59XG5cbmZ1bmN0aW9uIG1ha2VJZGVudGlmaWVyTm9kZShuYW1lcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkobmFtZXMpIHx8ICFuYW1lcy5ldmVyeShpc1N0cmluZ09yU3ltYm9sKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgYXJndW1lbnQgdG8gbWFrZUlkZW50aWZpZXJOb2RlIC0gZXhwZWN0ZWQgYXJyYXkgb2Ygc3RyaW5ncy9zeW1ib2xzXCIpO1xuICB9XG4gIHJldHVybiB7IHR5cGU6IFwiSURFTlRJRklFUlwiLCBuYW1lcywgWyQkdHJ1c3RlZF06IHRydWUgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgU3FsIGl0ZW0gZm9yIGEgU3FsIGlkZW50aWZpZXIuIEEgU3FsIGlkZW50aWZpZXIgaXMgYW55dGhpbmcgbGlrZVxuICogYSB0YWJsZSwgc2NoZW1hLCBvciBjb2x1bW4gbmFtZS4gQW4gaWRlbnRpZmllciBtYXkgYWxzbyBoYXZlIGEgbmFtZXNwYWNlLFxuICogdGh1cyB3aHkgbWFueSBuYW1lcyBhcmUgYWNjZXB0ZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkZW50aWZpZXIoLi4ubmFtZXMpIHtcbiAgcmV0dXJuIG1ha2VJZGVudGlmaWVyTm9kZShlbnN1cmVOb25FbXB0eUFycmF5KG5hbWVzKSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pZGVudGlmaWVyLmpzIiwiaW1wb3J0IGVuZm9yY2VWYWxpZE5vZGUgZnJvbSBcIi4vZW5mb3JjZS12YWxpZC1ub2RlXCI7XG5pbXBvcnQgZW5zdXJlTm9uRW1wdHlBcnJheSBmcm9tIFwiLi9lbnN1cmUtbm9uLWVtcHR5LWFycmF5XCI7XG5pbXBvcnQgcmF3IGZyb20gXCIuL3Jhd1wiO1xuXG4vKipcbiAqIEpvaW4gc29tZSBTcWwgaXRlbXMgdG9nZXRoZXIgc2VwZXJhdGVkIGJ5IGEgc3RyaW5nLiBVc2VmdWwgd2hlbiBkZWFsaW5nXG4gKiB3aXRoIGxpc3RzIG9mIFNxbCBpdGVtcyB0aGF0IGRvZXNu4oCZdCBtYWtlIHNlbnNlIGFzIGEgU3FsIHF1ZXJ5LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBqb2luKGl0ZW1zLCByYXdTZXBhcmF0b3IgPSBcIlwiKSB7XG4gIGVuc3VyZU5vbkVtcHR5QXJyYXkoaXRlbXMsIHRydWUpO1xuICBpZiAodHlwZW9mIHJhd1NlcGFyYXRvciAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgc2VwYXJhdG9yIC0gbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgfVxuICBjb25zdCBzZXBhcmF0b3IgPSByYXdTZXBhcmF0b3I7XG4gIGNvbnN0IGN1cnJlbnRJdGVtcyA9IFtdO1xuICBjb25zdCBzZXBOb2RlID0gcmF3KHNlcGFyYXRvcik7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSArPSAxKSB7XG4gICAgY29uc3QgcmF3SXRlbSA9IGl0ZW1zW2ldO1xuICAgIGxldCBpdGVtc1RvQXBwZW5kO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJhd0l0ZW0pKSB7XG4gICAgICBpdGVtc1RvQXBwZW5kID0gcmF3SXRlbS5tYXAoZW5mb3JjZVZhbGlkTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zVG9BcHBlbmQgPSBbZW5mb3JjZVZhbGlkTm9kZShyYXdJdGVtKV07XG4gICAgfVxuICAgIGlmIChpID09PSAwIHx8ICFzZXBhcmF0b3IpIHtcbiAgICAgIGN1cnJlbnRJdGVtcy5wdXNoKC4uLml0ZW1zVG9BcHBlbmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50SXRlbXMucHVzaChzZXBOb2RlLCAuLi5pdGVtc1RvQXBwZW5kKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRJdGVtcztcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qb2luLmpzIiwiaW1wb3J0IHJhdyBmcm9tIFwiLi9yYXdcIjtcbmltcG9ydCB2YWx1ZSBmcm9tIFwiLi92YWx1ZVwiO1xuaW1wb3J0IGVzY2FwZVNxbExpdGVyYWwgZnJvbSBcIi4vZXNjYXBlLXNxbC1saXRlcmFsXCI7XG5cbmNvbnN0IHRydWVOb2RlID0gcmF3KGBUUlVFYCk7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgcXVvdGVzICovXG5jb25zdCBmYWxzZU5vZGUgPSByYXcoYEZBTFNFYCk7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgcXVvdGVzICovXG5jb25zdCBudWxsTm9kZSA9IHJhdyhgTlVMTGApOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHF1b3RlcyAqL1xuXG4vKipcbiAqIElmIHRoZSB2YWx1ZSBpcyBzaW1wbGUgd2lsbCBpbmxpbmUgaXQgaW50byB0aGUgcXVlcnksIG90aGVyd2lzZSB3aWxsIGRlZmVyXG4gKiB0byB2YWx1ZS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGl0ZXJhbCh2YWwpIHtcbiAgLy8gTWF0Y2ggYWxwaGFudW1lcmljIHN0cmluZyBhbmQvb3IgLV9AIVxuICAvLyBCbG9jayBkb3VibGUgaHlwaGVuIC0tIHVzZWQgZm9yIGNvbW1lbnRzXG4gIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiICYmIHZhbC5tYXRjaCgvXigoPyEtezJ9KVstYS16QS1aMC05X0AhIF0pKiQvKSkge1xuICAgIHJldHVybiByYXcoYCR7ZXNjYXBlU3FsTGl0ZXJhbCh2YWwpfWApO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHZhbCkpIHtcbiAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih2YWwpKSB7XG4gICAgICByZXR1cm4gcmF3KFN0cmluZyh2YWwpKTsgLy8gb25seSBkaWdpdHMgYW5kIGh5cGhlbiA9IGludGVnZXIgbGl0ZXJhbFxuICAgIH1cbiAgICByZXR1cm4gcmF3KGAnJHswICsgdmFsfSc6OmZsb2F0YCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gdmFsID8gdHJ1ZU5vZGUgOiBmYWxzZU5vZGU7XG4gIH0gZWxzZSBpZiAodmFsID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbE5vZGU7XG4gIH1cblxuICByZXR1cm4gdmFsdWUodmFsKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9saXRlcmFsLmpzIiwiaW1wb3J0IGRlYnVnTG9nIGZyb20gXCIuL2RlYnVnLWxvZ1wiO1xuLy8gRGVyaXZlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9icmlhbmMvbm9kZS1wb3N0Z3Jlcy9ibG9iLzZjODQwYWFiYjA5ZjhhMmQ2NDA4MDA5NTNmNmI4ODRiNjg0MTM4NGMvbGliL2NsaWVudC5qcyNMMzI1XG4vLyBXaGljaCB3YXMgcG9ydGVkIGZyb20gUG9zdGdyZVNRTCA5LjIuNCBzb3VyY2UgY29kZSBpbiBzcmMvaW50ZXJmYWNlcy9saWJwcS9mZS1leGVjLmNcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVzY2FwZVNxbExpdGVyYWwoc3RyKSB7XG4gIHZhciBoYXNCYWNrc2xhc2ggPSBmYWxzZTtcbiAgdmFyIGVzY2FwZWQgPSBcIlxcJ1wiOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZWxlc3MtZXNjYXBlICovXG5cbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBlbXB0eSBzdHJpbmcgcmVjZWl2ZWQ7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgZGVidWdMb2cobmV3IEVycm9yKGBFeHBlY3RlZCBzdHJpbmcsIHJlY2VpdmVkICcke1N0cmluZyhzdHIpfSdgKSwgXCJlc2NhcGVTcWxMaXRlcmFsXCIpO1xuICB9XG5cbiAgLy8gcmV0dXJuIGVtcHR5IHN0cmluZyBpZiBzdHJpbmcgd2l0aCBsZW5ndGggMCByZWNlaXZlZDtcbiAgaWYgKHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgc3RyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBjID0gc3RyW2ldO1xuICAgIGlmIChjID09PSBcIlxcJ1wiKSB7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGUgKi9cbiAgICAgIGVzY2FwZWQgKz0gYyArIGM7XG4gICAgfSBlbHNlIGlmIChjID09PSBcIlxcXFxcIikge1xuICAgICAgZXNjYXBlZCArPSBjICsgYztcbiAgICAgIGhhc0JhY2tzbGFzaCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVzY2FwZWQgKz0gYztcbiAgICB9XG4gIH1cblxuICBlc2NhcGVkICs9IFwiXFwnXCI7IC8qIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlbGVzcy1lc2NhcGUgKi9cblxuICBpZiAoaGFzQmFja3NsYXNoID09PSB0cnVlKSB7XG4gICAgZXNjYXBlZCA9ICcgRScgKyBlc2NhcGVkOyAvKiBlc2xpbnQtZGlzYWJsZS1saW5lIHByZWZlci10ZW1wbGF0ZSAqLy8qIGVzbGludC1kaXNhYmxlLWxpbmUgcXVvdGVzICovXG4gIH1cblxuICByZXR1cm4gZXNjYXBlZDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lc2NhcGUtc3FsLWxpdGVyYWwuanMiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGVuZm9yY2VWYWxpZE5vZGUgZnJvbSBcIi4vZW5mb3JjZS12YWxpZC1ub2RlXCI7XG5pbXBvcnQgcmF3IGZyb20gXCIuL3Jhd1wiO1xuXG4vKipcbiAqIEEgdGVtcGxhdGUgc3RyaW5nIHRhZyB0aGF0IGNyZWF0ZXMgYSBgU3FsYCBxdWVyeSBvdXQgb2Ygc29tZSBzdHJpbmdzIGFuZFxuICogc29tZSB2YWx1ZXMuIFVzZSB0aGlzIHRvIGNvbnN0cnVjdCBhbGwgUG9zdGdyZVNRTCBxdWVyaWVzIHRvIGF2b2lkIFNRTFxuICogaW5qZWN0aW9uLlxuICpcbiAqIE5vdGUgdGhhdCB1c2luZyB0aGlzIGZ1bmN0aW9uLCB0aGUgdXNlciAqbXVzdCogc3BlY2lmeSBpZiB0aGV5IGFyZSBpbmplY3RpbmdcbiAqIHJhdyB0ZXh0LiBUaGlzIG1ha2VzIGEgU1FMIGluamVjdGlvbiB2dWxuZXJhYmlsaXR5IGhhcmRlciB0byBjcmVhdGUuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHF1ZXJ5KHN0cmluZ3MsIC4uLnZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoc3RyaW5ncykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJxdWVyeSBzaG91bGQgYmUgdXNlZCBhcyBhIHRlbXBsYXRlIGxpdGVyYWwsIG5vdCBhIGZ1bmN0aW9uIGNhbGwhXCIpO1xuICB9XG4gIGNvbnN0IGl0ZW1zID0gW107XG4gIGZvciAobGV0IGkgPSAwLCBsID0gc3RyaW5ncy5sZW5ndGg7IGkgPCBsOyBpICs9IDEpIHtcbiAgICBjb25zdCB0ZXh0ID0gc3RyaW5nc1tpXTtcbiAgICBpZiAodGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICBpdGVtcy5wdXNoKHJhdyh0ZXh0KSk7XG4gICAgfVxuICAgIGlmICh2YWx1ZXNbaV0pIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdmFsdWUubWFwKGVuZm9yY2VWYWxpZE5vZGUpO1xuICAgICAgICBpdGVtcy5wdXNoKC4uLm5vZGVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBlbmZvcmNlVmFsaWROb2RlKHZhbHVlKTtcbiAgICAgICAgaXRlbXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGl0ZW1zO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3F1ZXJ5LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==