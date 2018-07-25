import test from "tape";
import raw from "../src/raw";
import trustedSymbol from "../src/trusted-symbol";

test("raw", (t) => {
  t.test("raw", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof raw;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw without arguments", (assert) => {
    const node = raw();

    const message = "should return a SQL node (type 'RAW') with an empty text property";
    const expected = { type: "RAW", text: "" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with a string as the 1st argument", (assert) => {
    const node = raw("string");

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument";
    const expected = { type: "RAW", text: "string" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with a string as the 1st argument and 'undefined' as the 2nd argument", (assert) => {
    const node = raw("string", undefined);

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument";
    const expected = { type: "RAW", text: "string" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with a string as the 1st argument and a string as the 2nd argument", (assert) => {
    const node = raw("string", "string");

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument";
    const expected = { type: "RAW", text: "string" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with an integer as the 1st argument", (assert) => {
    const node = raw(1);

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument converted to a string";
    const expected = { type: "RAW", text: "1" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with an integer as the 1st argument and 'undefined' as the 2nd argument", (assert) => {
    const node = raw(1, undefined);

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument converted to a string";
    const expected = { type: "RAW", text: "1" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with an integer as the 1st argument and a 'string' as the 2nd argument", (assert) => {
    const node = raw(1, "string");

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument converted to a string";
    const expected = { type: "RAW", text: "1" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with an integer as the 1st argument and a 'number object' as the 2nd argument", (assert) => {
    const node = raw(1, new Number(1)); /* eslint-disable-line no-new-wrappers */

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument converted to a string";
    const expected = { type: "RAW", text: "1" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with a string as the 1st argument and a 'Symbol' as the 2nd argument", (assert) => {
    const ident = Symbol.for("trusted");
    const node = raw("string", ident);

    const message = "should return an object with two properties: text property: SQL query with alias __local_[increment]__ and values property: empty array ";
    const expected = { type: "RAW", text: "string" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
});
