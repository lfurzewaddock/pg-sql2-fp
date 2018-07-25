import test from "tape";
import * as sql from "../src";

test("sql", (t) => {
  t.test("value", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof sql.value;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("value", (assert) => {
    const node = sql.value({ foo: { bar: 1 } });

    const message = "should return a SQL node (type 'VALUE') with 1st parameter (object) added to the value property";
    const expected = { type: "VALUE", value: { foo: { bar: 1 } } };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("identifier", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof sql.identifier;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("identifier (one)", (assert) => {
    const node = sql.identifier("foo");

    const message = "should return a SQL node (type 'IDENTIFIER') with 1st parameter (string) added to the names array property";
    const expected = { type: "IDENTIFIER", names: ["foo"] };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("identifier (many)", (assert) => {
    const node = sql.identifier("foo", "bar", 'b"z'); /* eslint-disable-line quotes */

    const message = "should return a SQL node (type 'IDENTIFIER') with all parameters (strings) added to the names array property";
    const expected = { type: "IDENTIFIER", names: ["foo", "bar", 'b"z'] }; /* eslint-disable-line quotes */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("identifier (many inc. unescaped single quote)", (assert) => {
    const node = sql.identifier("foo", "bar", "b'z");

    const message = "should return a SQL node (type 'IDENTIFIER') with all parameters (strings) added to the names array property";
    const expected = { type: "IDENTIFIER", names: ["foo", "bar", "b\'z"] }; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("query", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof sql.query;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("query (simple)", (assert) => {
    const node = sql.query`select 1`;

    const message = "should return a SQL node (type 'RAW') with text property set to template literal value";
    const expected = [{ type: "RAW", text: "select 1" }];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("query (with values)", (assert) => {
    const node = sql.query`select ${sql.value(1)}::integer`;

    const message = "should return array of 3 x SQL nodes, 'RAW', 'VALUE', 'RAW'";
    const expected = [
      { type: "RAW", text: "select " },
      { type: "VALUE", value: 1 },
      { type: "RAW", text: "::integer" },
    ];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("query (with sub-sub-sub query)", (assert) => {
    const node = sql.query`select ${sql.query`1 ${sql.query`from ${sql.query`foo`}`}`}`;

    const message = "should return array of 4 x SQL nodes, type 'RAW', one for each sub query";
    const expected = [
      { type: "RAW", text: "select " },
      { type: "RAW", text: "1 " },
      { type: "RAW", text: "from " },
      { type: "RAW", text: "foo" },
    ];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("query (simple: template literal with Number object)", (assert) => {
    const message = "should throw an error if not past a node (enforceValidNode(node))";

    assert.throws(function throwsFn() {
      sql.query`${new Number(1)}`; /* eslint-disable-line no-unused-expressions */ /* eslint-disable-line no-new-wrappers */
    }, message);
    assert.end();
  });
  t.test("query function invocation", (assert) => {
    const message = "should throw an error";

    assert.throws(function throwsFn() {
      sql.query();
    }, message);
    assert.end();
  });
  t.test("literal", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof sql.literal;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("literal integer", (assert) => {
    const node = sql.literal(1);

    const message = "should return a SQL node (type 'RAW') with 1st parameter (integer) added as a string to the text property";
    const expected = { type: "RAW", text: "1" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("literal characters: 1aA-_@!", (assert) => {
    const node = sql.literal("1aA -_@!");

    const message = "should return a SQL node (type 'RAW') with 1st parameter added as a double quoted string to the text property";
    const expected = { type: "RAW", text: '"1aA -_@!"' }; /* eslint-disable-line quotes */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("literal float", (assert) => {
    const node = sql.literal(0.3);

    const message = "should return a SQL node (type 'RAW') with 1st parameter wraped in escaped single quotes, typed as float added as a string to the text property";
    const expected = { type: "RAW", text: "\'0.3\'::float" }; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("literal boolean false", (assert) => {
    const node = sql.literal(false);

    const message = "should return a SQL node (type 'RAW') with 1st parameter in uppercase added as a string to the text property";
    const expected = { type: "RAW", text: "FALSE" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("literal boolean true", (assert) => {
    const node = sql.literal(true);

    const message = "should return a SQL node (type 'RAW') with 1st parameter in uppercase added as a string to the text property";
    const expected = { type: "RAW", text: "TRUE" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("literal null", (assert) => {
    const node = sql.literal(null);

    const message = "should return a SQL node (type 'RAW') with 1st parameter in uppercase added as a string to the text property";
    const expected = { type: "RAW", text: "NULL" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("literal NO ARGUMENT", (assert) => {
    const node = sql.literal();

    const message = "should return a SQL node (type 'RAW') with 'NULL' added as a string to the text property";
    const expected = { type: "RAW", text: "NULL" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("literal sqli ", (assert) => {
    const node = sql.literal("'; DROP TABLE user;");

    const message = "should return a SQL node (type 'VALUE') with 1st parameter (single quote escaped) added as a string to the text property";
    const expected = { type: "VALUE", value: "\'; DROP TABLE user;" }; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("join", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof sql.join;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("join sql.value, sql.identifier, sql.query and sql.query inc. a sql.value and a sql.query", (assert) => {
    const node = sql.query`select ${sql.join(
      [
        sql.value(1),
        sql.identifier("foo", "bar"),
        sql.query`baz.qux(1, 2, 3)`,
        sql.query`baz.qux(${sql.value(1)}, ${sql.query`2`}, 3)`,
      ],
      ", ",
    )}`;

    const message = "should return array of 12 x SQL nodes";
    const expected = [
      { type: "RAW", text: "select " },
      { type: "VALUE", value: 1 },
      { type: "RAW", text: ", " },
      { type: "IDENTIFIER", names: ["foo", "bar"] },
      { type: "RAW", text: ", " },
      { type: "RAW", text: "baz.qux(1, 2, 3)" },
      { type: "RAW", text: ", " },
      { type: "RAW", text: "baz.qux(" },
      { type: "VALUE", value: 1 },
      { type: "RAW", text: ", " },
      { type: "RAW", text: "2" },
      { type: "RAW", text: ", 3)" },
    ];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("join two simple queries", (assert) => {
    const message = "should throw an error if seperator argument provided is not a string";

    assert.throws(function throwsFn() {
      /* eslint-disable no-unused-expressions */
      sql.query`select ${sql.join(
        [
          sql.query`foo(1)`,
          sql.query`bar(2)`,
        ],
        1,
      )}`;
      /* eslint-enable no-unused-expressions */
    }, message);
    assert.end();
  });
  t.test("join two simple queries", (assert) => {
    const message = "should not throw an error if seperator argument is not provided";

    assert.doesNotThrow(function doesNotThrowFn() {
      /* eslint-disable no-unused-expressions */
      sql.query`select ${sql.join([
        sql.query`foo(1)`,
        sql.query`bar(2)`,
      ])}`;
      /* eslint-enable no-unused-expressions */
    }, message);
    assert.end();
  });
  t.test("compile", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof sql.compile;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("compile (simple)", (assert) => {
    const node = sql.query`select 1`;

    const message = "should return an object with two properties: text property: select 1 and values property: empty array ";
    const expected = { text: "select 1", values: [] };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (simple: template literal with number)", (assert) => {
    const node = sql.query`1`;

    const message = "should return an object with two properties: text property: 1 and values property: empty array ";
    const expected = { text: "1", values: [] };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile NO ARGUMENT", (assert) => {
    const message = "throws an error complaining a node was expected";

    assert.throws(function throwsFn() {
      sql.compile();
    }, /(Error: Expected SQL item, instead received 'undefined')/, message);

    assert.end();
  });
  t.test("compile (simple: template literal with number surrounded by single quotes)", (assert) => {
    const node = sql.query`\'1\'`;

    const message = "should return an object with two properties: text property: 1 with escaped single quotes and values property: empty array ";
    const expected = { text: "\'1\'", values: [] }; /* eslint-disable-line no-useless-escape */
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (with Symbol identifier)", (assert) => {
    const ident = Symbol("ident");
    const node = sql.query`${sql.identifier(ident)}`;

    const message = "should return an object with two properties: text property: SQL query with alias __local_[increment]__ and values property: empty array ";
    const expected = {
      text: "__local_1__",
      values: [],
    };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (with identifier integer)", (assert) => {
    const message = "throws an error complaining that an invalid argument to makeIdentifierNode - array of strings/symbols is expected";

    assert.throws(function throwsFn() {
      sql.query`${sql.identifier(1)}`; /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid argument to makeIdentifierNode - expected array of strings\/symbols)/, message);

    assert.end();
  });
  t.test("compile (with values)", (assert) => {
    const node = sql.query`select ${sql.value(1)}::integer`;

    const message = "should return an object with two properties: text property: paramterized query SQL with single dollar param and values property: array with single value ";
    const expected = {
      text: "select $1::integer",
      values: [1],
    };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (with sub-sub-sub query)", (assert) => {
    const node = sql.query`select ${sql.query`1 ${sql.query`from ${sql.query`foo`}`}`}`;

    const message = "should return an object with two properties: text property: paramterized query SQL and values property: array empty";
    const expected = {
      text: "select 1 from foo",
      values: [],
    };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (more complex including multiple sql.query, a sql.value and a sql.identifier)", (assert) => {
    const node = sql.query`select ${sql.query`${sql.value(1)} ${sql.query`from ${sql.identifier("foo", 'b"z')}`}`}`; /* eslint-disable-line quotes */

    const message = "should return an object with two properties: text property: paramterized query SQL and values property: array with single value";
    const expected = {
      text: 'select $1 from "foo"."b""z"', /* eslint-disable-line quotes */
      values: [1],
    };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (more complex including a join, multiple sql.query, multiple sql.value, and a sql.identifier)", (assert) => {
    const node = sql.query`select ${sql.join(
      [
        sql.value(1),
        sql.identifier("foo", "bar"),
        sql.query`baz.qux(1, 2, 3)`,
        sql.query`baz.qux(${sql.value(1)}, ${sql.query`2`}, 3)`,
      ],
      ", ",
    )}`;

    const message = "should return an object with two properties: text property: paramterized query SQL and values property: array with two values";
    const expected = {
      text: 'select $1, "foo"."bar", baz.qux(1, 2, 3), baz.qux($2, 2, 3)', /* eslint-disable-line quotes */
      values: [1, 1],
    };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("sqli - attempting a join substituting a value node generated by makeValueNode function with an object of a similar shape", (assert) => {
    const message = "throws an error complaining that an object was received instead of an expected value node";

    assert.throws(function throwsFn() {
      /* eslint-disable no-unused-expressions */
      sql.query`select ${sql.join(
        [
          { type: "VALUE", value: 1 },
          sql.identifier("foo", "bar"),
          sql.query`baz.qux(1, 2, 3)`,
          sql.query`baz.qux(${sql.value(1)}, ${sql.query`2`}, 3)`,
        ],
        ", ",
      )}`;
      /* eslint-enable no-unused-expressions */
    }, /(Error: Expected SQL item, instead received '\[object Object\]')/, message);

    assert.end();
  });
  t.test("sqli - attempting to use a plain template literal placeholder in a sql.query", (assert) => {
    const message = "throws an error complaining a node was expected";

    assert.throws(function throwsFn() {
      /* eslint-disable no-unused-expressions */
      sql.query`select ${sql.join(
        [
          sql.value(1),
          sql.identifier("foo", "bar"),
          sql.query`baz.qux(1, 2, 3)`,
          sql.query`baz.qux(${sql.value(1)}, ${sql.query`2`}, 3)`,
        ],
        ", ",
      )}, ${3}`;
      /* eslint-enable no-unused-expressions */
    }, /(Error: Expected SQL item, instead received '3')/, message);

    assert.end();
  });
});
