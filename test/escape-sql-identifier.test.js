import test from "tape";
import escapeSqlIdentifier from "../src/escape-sql-identifier";

test("escapeSqlIdentifier", (t) => {
  t.test("escapeSqlIdentifier", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof escapeSqlIdentifier;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke escapeSqlIdentifier without arguments", (assert) => {
    const message = "throws an error complaining that a string is expected";

    assert.throws(function throwsFn() {
      escapeSqlIdentifier();
    }, /(Error: Expected string, received 'undefined')/, message);

    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with empty string as 1st argument", (assert) => {
    const node = escapeSqlIdentifier("");

    const message = "should return empty string";
    const expected = ""; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with single name as 1st argument", (assert) => {
    const node = escapeSqlIdentifier("TableName");

    const message = "should return 1st argument wrapped in double quotes";
    const expected = '"TableName"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with single name wrapped in single quotes as 1st argument", (assert) => {
    const node = escapeSqlIdentifier("'TableName'");

    const message = "should return 1st argument wrapped in double quotes and wrapped in single quotes";
    const expected = '"\'TableName\'"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with single name wrapped in double quotes as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('"TableName"'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in two sets of double quotes";
    const expected = '"""TableName"""'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with single name including single back slash escaped double quote as 1st argument", (assert) => {
    const node = escapeSqlIdentifier("Table\"Name"); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes and single double quote escaped with another double quote";
    const expected = '"Table""Name"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with single name including single back slash escaped double quote after a space as 1st argument", (assert) => {
    const node = escapeSqlIdentifier("Table \"Name"); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and single double quote escaped with another double quote";
    const expected = '"Table ""Name"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
});
