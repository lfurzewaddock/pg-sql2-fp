import test from "tape";
import debugLog from "../../src/debug-log";

test("debugLog", (t) => {
  t.test("debugLog", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof debugLog;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke debugLog without arguments", (assert) => {
    const message = "does not throw an error";

    assert.doesNotThrow(function throwsFn() {
      debugLog();
    }, message);

    assert.end();
  });
  t.test("invoke debugLog without arguments", (assert) => {
    const testSubj = debugLog();

    const message = "should return null";
    const expected = null;
    const actual = testSubj;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke debugLog with an error object as 1st argument", (assert) => {
    const err = new Error("test error");
    const testSubj = debugLog(err);

    const message = "should return the error object passed in as 1st argument";
    const expected = err;
    const actual = testSubj;

    assert.equal(actual, expected, message);

    assert.end();
  });
});
