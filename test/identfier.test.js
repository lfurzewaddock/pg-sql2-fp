import test from "tape";
import identifier from "../src/identifier";

test("identifier", (t) => {
  t.test("identifier", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof identifier;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke identifier with a string as the 1st argument", (assert) => {
    const node = identifier("foo");

    const message = "should return a SQL node (type 'IDENTIFIER') with 1st parameter (string) added to the names array property";
    const expected = { type: "IDENTIFIER", names: ["foo"] };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke identifier with strings as the 1st, 2nd and 3rd arguments (Note: 3rd argument contains double quote)", (assert) => {
    const node = identifier("foo", "bar", 'b"z'); /* eslint-disable-line quotes */

    const message = "should return a SQL node (type 'IDENTIFIER') with all parameters (strings) added to the names array property";
    const expected = { type: "IDENTIFIER", names: ["foo", "bar", 'b"z'] }; /* eslint-disable-line quotes */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke identifier with strings as the 1st, 2nd and 3rd arguments (Note: 3rd argument contains single quote)", (assert) => {
    const node = identifier("foo", "bar", "b'z");

    const message = "should return a SQL node (type 'IDENTIFIER') with all parameters (strings) added to the names array property (Note: 3rd argument single quote escaped with back slash)";
    const expected = { type: "IDENTIFIER", names: ["foo", "bar", "b\'z"] }; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke identifier with a symbol as the 1st argument", (assert) => {
    const ident = Symbol("ident");
    const node = identifier(ident);

    const message = "should return a SQL node (type 'IDENTIFIER') with symbol argument added to names array property";
    const expected = { type: "IDENTIFIER", names: [ident] };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke identifier with an integer as the 1st argument", (assert) => {
    const int = 1;
    const message = "throws an error complaining that an invalid argument to makeIdentifierNode - array of strings/symbols is expected";

    assert.throws(function throwsFn() {
      identifier(int); /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid argument to makeIdentifierNode - expected array of strings\/symbols)/, message);

    assert.end();
  });
  t.test("invoke identifier with a string as the 1st argument and an integer as the 2nd argument", (assert) => {
    const string = "string";
    const int = 1;
    const message = "throws an error complaining that an invalid argument to makeIdentifierNode - array of strings/symbols is expected";

    assert.throws(function throwsFn() {
      identifier(string, int); /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid argument to makeIdentifierNode - expected array of strings\/symbols)/, message);

    assert.end();
  });
  t.test("invoke identifier with a string as the 1st argument, a symbol as the 2nd argument and an integer as the 3rd argument", (assert) => {
    const string = "string";
    const ident = Symbol("ident");
    const int = 1;
    const message = "throws an error complaining that an invalid argument to makeIdentifierNode - array of strings/symbols is expected";

    assert.throws(function throwsFn() {
      identifier(string, ident, int); /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid argument to makeIdentifierNode - expected array of strings\/symbols)/, message);

    assert.end();
  });
});
