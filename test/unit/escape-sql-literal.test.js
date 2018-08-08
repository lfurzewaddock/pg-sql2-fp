import test from "tape";
import escapeSqlLiteral from "../../src/escape-sql-literal";

test("escapeSqlLiteral", (t) => {
  t.test("escapeSqlLiteral", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof escapeSqlLiteral;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral without arguments", (assert) => {
    const message = "throws an error complaining that a string is expected";

    assert.throws(function throwsFn() {
      escapeSqlLiteral();
    }, /(Error: Expected string, received 'undefined')/, message);

    assert.end();
  });
  t.test("invoke escapeSqlLiteral with empty string as 1st argument", (assert) => {
    const node = escapeSqlLiteral("");

    const message = "should return empty string";
    const expected = ""; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with single name as 1st argument", (assert) => {
    const node = escapeSqlLiteral("Literal 'Value");

    const message = "should return 1st argument wrapped in double quotes";
    const expected = '\'Literal \'\'Value\''; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with single name as 1st argument", (assert) => {
    const node = escapeSqlLiteral("\\Literal Value");

    const message = "should return 1st argument wrapped in double quotes";
    const expected = ' E\'\\\\Literal Value\''; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with string wrapped in single quotes as 1st argument", (assert) => {
    const node = escapeSqlLiteral("'Literal Value'");

    const message = "should return 1st argument wrapped in double quotes and wrapped in single quotes";
    const expected = "\'\'\'Literal Value\'\'\'"; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with single name wrapped in double quotes as 1st argument", (assert) => {
    const node = escapeSqlLiteral('"Literal Value"'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in two sets of double quotes";
    const expected = '\'"Literal Value"\''; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with string including single back slash escaped double quote as 1st argument", (assert) => {
    const node = escapeSqlLiteral("Literal\"Value");

    const message = "should return 1st argument wrapped in set of double quotes and single double quote escaped with another double quote";
    const expected = '\'Literal"Value\''; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with string including single back slash escaped double quote after a space as 1st argument", (assert) => {
    const node = escapeSqlLiteral("Literal \"Value");

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and single double quote escaped with another double quote";
    const expected = '\'Literal "Value\''; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });

  // Sourced escapeLiteral tests from node-postgres project
  // Source: https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/test/unit/client/escape-tests.js#L27
  // START
  t.test("invoke escapeSqlLiteral with 'no special characters' as 1st argument", (assert) => {
    const node = escapeSqlLiteral('hello world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes with space preserved";
    const expected = "'hello world'";
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with a string which 'contains double quotes only' as 1st argument", (assert) => {
    const node = escapeSqlLiteral('hello " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes with space preserved and double quotes character escaped with backslash";
    const expected = "'hello \" world'";
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with a string which 'contains single quotes only' as 1st argument", (assert) => {
    const node = escapeSqlLiteral('hello \' world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes with space preserved and escaped single quote character with backslash, doubled";
    const expected = "'hello \'\' world'"; /* eslint-disable-line no-useless-escape */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with a string which 'contains backslashes only' as 1st argument", (assert) => {
    const node = escapeSqlLiteral('hello \\ world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes prefixed by E for a C-style 'escape' string constant with space preserved and escaped single backslash character with backslash, doubled";
    const expected = " E'hello \\\\ world'";
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with a string which 'contains single quotes and double quotes' as 1st argument", (assert) => {
    const node = escapeSqlLiteral('hello \' " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes with space preserved and escaped single quote character with backslash, doubled instead and single double quote character, escaped with backslash";
    const expected = "'hello '' \" world'";
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with a string which 'contains double quotes and backslashes' as 1st argument", (assert) => {
    const node = escapeSqlLiteral('hello \\ " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes prefixed by E for a C-style 'escape' string constant with space preserved, escaped single backslash character with backslash, doubled and single double quote character escaped with backslash";
    const expected = " E'hello \\\\ \" world'";
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral with a string which 'contains single quotes and backslashes' as 1st argument", (assert) => {
    const node = escapeSqlLiteral('hello \\ \' world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes prefixed by E for a C-style 'escape' string constant with space preserved, escaped single backslash character with backslash, doubled and single single quote character escaped with backslash doubled instead";
    const expected = " E'hello \\\\ '' world'";
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlLiteral 'contains single quotes, double quotes, and backslashes'", (assert) => {
    const node = escapeSqlLiteral('hello \\ \' " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of single quotes prefixed by E for a C-style 'escape' string constant with space preserved, escaped single backslash character with backslash, doubled, single single quote character escaped with backslash doubled instead, single double quote character escaped with backslash";
    const expected = " E'hello \\\\ '' \" world'";
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  // END
  // Sourced escapeLiteral tests from node-postgres project
  // Source: https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/test/unit/client/escape-tests.js#L27
});
