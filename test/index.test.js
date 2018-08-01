import test from "tape";
import sql from "../src";

test("sql", (t) => {
  t.test("join sql.value, sql.ident, sql and sql inc. a sql.value and a sql", (assert) => {
    const node = sql`select ${sql.concat(
      [
        sql.value(1),
        sql.ident("foo", "bar"),
        sql`baz.qux(1, 2, 3)`,
        sql`baz.qux(${sql.value(1)}, ${sql`2`}, 3)`,
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
  t.test("compile (simple: template literal with number surrounded by single quotes)", (assert) => {
    const node = sql`\'1\'`;

    const message = "should return an object with two properties: text property: 1 with escaped single quotes and values property: empty array ";
    const expected = { text: "\'1\'", values: [] }; /* eslint-disable-line no-useless-escape */
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (with Symbol identifier)", (assert) => {
    const ident = Symbol("ident");
    const node = sql`${sql.ident(ident)}`;

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
      sql`${sql.ident(1)}`; /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid argument to makeIdentifierNode - expected array of strings\/symbols)/, message);

    assert.end();
  });
  t.test("compile (with values)", (assert) => {
    const node = sql`select ${sql.value(1)}::integer`;

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
    const node = sql`select ${sql`1 ${sql`from ${sql`foo`}`}`}`;

    const message = "should return an object with two properties: text property: paramterized query SQL and values property: array empty";
    const expected = {
      text: "select 1 from foo",
      values: [],
    };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (more complex including multiple sql, a sql.value and a sql.ident)", (assert) => {
    const node = sql`select ${sql`${sql.value(1)} ${sql`from ${sql.ident("foo", 'b"z')}`}`}`; /* eslint-disable-line quotes */

    const message = "should return an object with two properties: text property: paramterized query SQL and values property: array with single value";
    const expected = {
      text: 'select $1 from "foo"."b""z"', /* eslint-disable-line quotes */
      values: [1],
    };
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("compile (more complex including a join, multiple sql, multiple sql.value, and a sql.ident)", (assert) => {
    const node = sql`select ${sql.concat(
      [
        sql.value(1),
        sql.ident("foo", "bar"),
        sql`baz.qux(1, 2, 3)`,
        sql`baz.qux(${sql.value(1)}, ${sql`2`}, 3)`,
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
  t.test("sqli - attempting a join substituting a 'Sql item', type 'VALUE' with a similar shape object", (assert) => {
    const message = "throws an error complaining that an object was received instead of an expected SQL item";

    assert.throws(function throwsFn() {
      /* eslint-disable no-unused-expressions */
      sql`select ${sql.concat(
        [
          { type: "VALUE", value: 1 },
          sql.ident("foo", "bar"),
          sql`baz.qux(1, 2, 3)`,
          sql`baz.qux(${sql.value(1)}, ${sql`2`}, 3)`,
        ],
        ", ",
      )}`;
      /* eslint-enable no-unused-expressions */
    }, /(Error: Expected SQL item, instead received '\[object Object\]')/, message);

    assert.end();
  });
  t.test("sqli - attempting to use a plain template literal placeholder in a sql", (assert) => {
    const message = "throws an error complaining a SQL item was expected";

    assert.throws(function throwsFn() {
      /* eslint-disable no-unused-expressions */
      sql`select ${sql.concat(
        [
          sql.value(1),
          sql.ident("foo", "bar"),
          sql`baz.qux(1, 2, 3)`,
          sql`baz.qux(${sql.value(1)}, ${sql`2`}, 3)`,
        ],
        ", ",
      )}, ${3}`;
      /* eslint-enable no-unused-expressions */
    }, /(Error: Expected SQL item, instead received '3')/, message);

    assert.end();
  });
  t.test("sqli - will escape identifiers", (assert) => {
    const node = sql`${sql.ident('hello', 'world')} ${sql.ident('escape"me')}`; /* eslint-disable-line quotes */

    const message = "should return an object with two properties: text property: paramterized query SQL and values property: array with two values";
    const expected = { text: '"hello"."world" "escape""me"', values: [] }; /* eslint-disable-line quotes */
    const actual = sql.compile(node);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
});
