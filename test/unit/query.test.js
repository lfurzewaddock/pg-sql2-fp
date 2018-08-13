import test from "tape";
import query from "../../src/query";

test("query", (t) => {
  t.test("query", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof query;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke query with an empty template literal", (assert) => {
    const node = query``;

    const message = "should return an empty array";
    const expected = [];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke query with a template literal containing a single space", (assert) => {
    const node = query` `;

    const message = "should return a SQL node (type 'RAW') with text property set to template literal contents";
    const expected = [{ type: "RAW", text: " " }];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke query with a template literal containing SQL", (assert) => {
    const node = query`select 1`;

    const message = "should return a SQL node (type 'RAW') with text property set to template literal contents";
    const expected = [{ type: "RAW", text: "select 1" }];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke query with a template literal containing SQL and a value SQL item", (assert) => {
    const mock$$trusted = Symbol.for("development");
    const mockValue = { type: "VALUE", value: 1, [mock$$trusted]: true };
    const node = query`select ${mockValue}::integer`;

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
  t.test("invoke query with a template literal containing SQL and 3 x nested sub-queries (sub-sub-sub query)", (assert) => {
    const node = query`select ${query`1 ${query`from ${query`foo`}`}`}`;

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
  t.test("invoke query without arguments", (assert) => {
    const message = "throws an error complaining that query should be used with a template literal, not a function call";

    assert.throws(function throwsFn() {
      query(); /* eslint-disable-line no-unused-expressions */
    }, /(Error: query should be used as a template literal, not a function call!)/, message);

    assert.end();
  });
});
