import test from "tape";
import compile from "../src/compile";
import trustedSymbol from "../src/trusted-symbol";

test("compile", (t) => {
  t.test("compile", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof compile;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke compile without arguments", (assert) => {
    const message = "throws an error complaining that a 'SQL item' is expected";

    assert.throws(function throwsFn() {
      compile();
    }, /(Error: Expected SQL item, instead received 'undefined')/, message);

    assert.end();
  });
  t.test("invoke compile with an array of 1 SQL item, type 'RAW', text 'select 1'", (assert) => {
    const $$trusted = trustedSymbol();
    const mockQuery = [
      { type: "RAW", text: "select 1", [$$trusted]: true },
    ];

    const message = "should return an object with two properties: text property: 'select 1' and values property: empty array ";
    const expected = { text: "select 1", values: [] };
    const actual = compile(mockQuery);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke compile with an array of 1 SQL item, type 'RAW', text '1'", (assert) => {
    const $$trusted = trustedSymbol();
    const mockQuery = [
      { type: "RAW", text: "1", [$$trusted]: true },
    ];

    const message = "should return an object with two properties: text property: '1' and values property: empty array ";
    const expected = { text: "1", values: [] };
    const actual = compile(mockQuery);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke compile with an array of 1 'Sql item', type 'RAW' and text property: 1 (integer)", (assert) => {
    const $$trusted = trustedSymbol();
    const mockQuery = [
      { type: "RAW", text: 1, [$$trusted]: true },
    ];
    const message = "throws an error complaining that a 'SQL item' is expected";

    assert.throws(function throwsFn() {
      compile(mockQuery);
    }, /(Error: RAW node expected string)/, message);

    assert.end();
  });
  t.test("invoke compile with an array of 1 SQL item, type 'IDENTIFIER', names ['foo', 'bar']", (assert) => {
    const $$trusted = trustedSymbol();
    const mockQuery = [
      { type: "IDENTIFIER", names: ["foo", "bar"], [$$trusted]: true },
    ];

    const message = "should return an object with two properties: text property: '\"foo\".\"bar\"' and values property: empty array ";
    const expected = { text: '"foo"."bar"', values: [] }; /* eslint-disable-line quotes */
    const actual = compile(mockQuery);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke compile with an array of 1 SQL item, type 'IDENTIFIER', names property: empty text string", (assert) => {
    const $$trusted = trustedSymbol();
    const mockQuery = [
      { type: "IDENTIFIER", names: "", [$$trusted]: true },
    ];
    const message = "throws an error complaining that an Identifier must have a name";

    assert.throws(function throwsFn() {
      compile(mockQuery);
    }, /(Error: Identifier must have a name)/, message);

    assert.end();
  });
  t.test("invoke compile with an array of 1 'Sql item', type 'VALUE' and value property: 1 (integer)", (assert) => {
    const $$trusted = trustedSymbol();
    const mockQuery = [
      { type: "VALUE", value: 1, [$$trusted]: true },
    ];

    const message = "should return an object with two properties: text property: $1 and values property: [1] ";
    const expected = { text: "$1", values: [1] }; /* eslint-disable-line quotes */
    const actual = compile(mockQuery);

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke compile with an array of 1 'Sql item', type 'UNKNOWN' and text property: empty text string", (assert) => {
    const $$trusted = trustedSymbol();
    const mockQuery = [
      { type: "UNKNOWN", text: "", [$$trusted]: true },
    ];
    const message = "throws an error complaining the type of 'Sql item' provided is not recognised!";

    assert.throws(function throwsFn() {
      compile(mockQuery);
    }, /(Error: Sql item type not recognised!)/, message);

    assert.end();
  });
});
