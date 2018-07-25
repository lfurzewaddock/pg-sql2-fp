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
  t.test("invoke raw with a string as the 1st argument and a valid symbol from /src/trusted-symbol.js as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const node = raw("string", $$trusted);

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
  t.test("invoke raw with an integer as the 1st argument and a valid symbol from /src/trusted-symbol.js as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const node = raw(1, $$trusted);

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument converted to a string";
    const expected = { type: "RAW", text: "1" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with a boolean as the 1st argument", (assert) => {
    const node = raw(true);

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument converted to a string";
    const expected = { type: "RAW", text: "true" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with a boolean as the 1st argument and a valid symbol from /src/trusted-symbol.js as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const node = raw(true, $$trusted);

    const message = "should return a SQL node (type 'RAW') with text property set to the 1st argument converted to a string";
    const expected = { type: "RAW", text: "true" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke raw with a string as the 1st argument and a new symbol with name 'trusted' as the 2nd argument", (assert) => {
    const $$trusted = Symbol("trusted");

    const message = "throws an error complaining the Symbol provided is a forgery!";

    assert.throws(function throwsFn() {
      raw("string", $$trusted);
    }, /(Error: Symbol provided is a forgery!)/, message);

    assert.end();
  });
  t.test("invoke raw with a string as the 1st argument and a valid symbol from /src/trusted-symbol.js as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();

    const message = "dose not throw an error complaining the Symbol provided is a forgery!";

    assert.doesNotThrow(function doesNotThrowFn() {
      raw("string", $$trusted);
    }, /(Error: Symbol provided is a forgery!)/, message);

    assert.end();
  });
});
