import test from "tape";
import * as sql from "../src";

test("sql", (t) => {
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
