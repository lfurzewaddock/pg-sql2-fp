import test from "tape";
import ensureNonEmptyArray from "../src/ensure-non-empty-array";

test("ensureNonEmptyArray", (t) => {
  t.test("ensureNonEmptyArray", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof ensureNonEmptyArray;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray without arguments", (assert) => {
    const message = "throws an error complaining that an array is expected";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray();
    }, /(Error: Expected array)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with a string as the 1st argument", (assert) => {
    const message = "throws an error complaining an array is expected";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray("val");
    }, /(Error: Expected array)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with a boolean as the 1st argument", (assert) => {
    const message = "throws an error complaining an array is expected";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray(true);
    }, /(Error: Expected array)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with a number as the 1st argument", (assert) => {
    const message = "throws an error complaining an array is expected";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray(1);
    }, /(Error: Expected array)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with an empty array as the 1st argument", (assert) => {
    const testArray = [];
    const message = "throws an error complaining that a non-empty array is expected";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray(testArray);
    }, /(Error: Expected non-empty array)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with an empty array as the 1st argument AND true as the 2nd argument", (assert) => {
    const testArray = [];
    const allowZeroLength = true;
    const message = "does not throw an error complaining that a non-empty array is expected";

    assert.doesNotThrow(function doesNotThrowFn() {
      ensureNonEmptyArray(testArray, allowZeroLength);
    }, /(Error: Expected non-empty array)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with an array containing null as the 1st argument", (assert) => {
    const testArrayIdx2Null = [0, 1, null];
    const message = "throws an error complaining 'null' was found at stated index";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray(testArrayIdx2Null);
    }, /(Error: Array index 2 is null)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with an array containing null as the 1st argument", (assert) => {
    const testArrayIdx0Null = [null, 0, 1];
    const message = "throws an error complaining 'null' was found at stated index";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray(testArrayIdx0Null);
    }, /(Error: Array index 0 is null)/, message);

    assert.end();
  });
  t.test("invoke ensureNonEmptyArray with an array containing null as the 1st argument", (assert) => {
    const testArrayIdx1Null = [0, null, 1];
    const message = "throws an error complaining 'null' was found at stated index";

    assert.throws(function throwsFn() {
      ensureNonEmptyArray(testArrayIdx1Null);
    }, /(Error: Array index 1 is null)/, message);

    assert.end();
  });
});
