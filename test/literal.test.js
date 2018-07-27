import test from "tape";
import literal from "../src/literal";

test("literal", (t) => {
  t.test("literal", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof literal;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal without arguments", (assert) => {
    const node = literal();

    const message = "should return a SQL node (type 'RAW') with 'NULL' added as a string to the text property";
    const expected = { type: "RAW", text: "NULL" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with empty string as 1st argument", (assert) => {
    const node = literal("");

    const message = "should return a SQL node (type 'RAW') with doube quotes x 2 added to the text property";
    const expected = { type: "RAW", text: '""' }; /* eslint-disable-line quotes */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with an integer as 1st argument", (assert) => {
    const node = literal(1);

    const message = "should return a SQL node (type 'RAW') with 1st parameter (integer), converted to a string, added to the text property";
    const expected = { type: "RAW", text: "1" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with string containing whitelisted characters:  1aA-_@!  as 1st argument", (assert) => {
    const node = literal("1aA -_@!");

    const message = "should return a SQL node (type 'RAW') with 1st parameter (string) added as a double quoted string to the text property";
    const expected = { type: "RAW", text: '"1aA -_@!"' }; /* eslint-disable-line quotes */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with a floating point/decimal as 1st argument", (assert) => {
    const node = literal(0.3);

    const message = "should return a SQL node (type 'RAW') with 1st parameter converted to a string, wrapped in escaped single quotes, typed as float added to the text property";
    const expected = { type: "RAW", text: "\'0.3\'::float" }; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with a boolean 'false' as 1st argument", (assert) => {
    const node = literal(false);

    const message = "should return a SQL node (type 'RAW') with 1st parameter converted to an uppercase string, added to the text property";
    const expected = { type: "RAW", text: "FALSE" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with a boolean 'true' as 1st argument", (assert) => {
    const node = literal(true);

    const message = "should return a SQL node (type 'RAW') with 1st parameter converted to an uppercase string, added to the text property";
    const expected = { type: "RAW", text: "TRUE" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with a 'null' as 1st argument", (assert) => {
    const node = literal(null);

    const message = "should return a SQL node (type 'RAW') with 1st parameter converted to an uppercase string, added to the text property";
    const expected = { type: "RAW", text: "NULL" };
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke literal with a sample sqli attempt as 1st argument", (assert) => {
    const node = literal("'; DROP TABLE user;");

    const message = "should return a SQL node (type 'VALUE') with 1st parameter (single quote escaped) added to the text property - IMPORTANT: not type RAW!";
    const expected = { type: "VALUE", value: "\'; DROP TABLE user;" }; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
});
