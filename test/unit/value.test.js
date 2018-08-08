import test from "tape";
import value from "../../src/value";

test("value", (t) => {
  t.test("value", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof value;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke value without arguments", (assert) => {
    const node = value();

    const message = "should return a SQL node (type 'VALUE') with 'undefined' added to the value property";
    const expected = { type: "VALUE", value: undefined };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke value with an empty string as the 1st argument", (assert) => {
    const node = value("");

    const message = "should return a SQL node (type 'VALUE') with empty string added to the value property";
    const expected = { type: "VALUE", value: "" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke value with a string as the 1st argument", (assert) => {
    const node = value("string");

    const message = "should return a SQL node (type 'VALUE') with 1st parameter (string) added to the value property";
    const expected = { type: "VALUE", value: "string" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke value with an integer as the 1st argument", (assert) => {
    const node = value(1);

    const message = "should return a SQL node (type 'VALUE') with 1st parameter (integer) added to the value property";
    const expected = { type: "VALUE", value: 1 };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke value with a boolean as the 1st argument", (assert) => {
    const node = value(true);

    const message = "should return a SQL node (type 'VALUE') with 1st parameter (boolean) added to the value property";
    const expected = { type: "VALUE", value: true };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke value with an object which has a single property 'foo' with a value of object which has a property 'bar' and value 1 as the 1st argument", (assert) => {
    const node = value({ foo: { bar: 1 } });

    const message = "should return a SQL node (type 'VALUE') with 1st parameter (object) intact added to the value property";
    const expected = { type: "VALUE", value: { foo: { bar: 1 } } };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
});
