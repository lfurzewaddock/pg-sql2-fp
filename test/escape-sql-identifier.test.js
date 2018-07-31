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
  // Sourced escapeIdentifier tests from node-postgres project
  // Source: https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/test/unit/client/escape-tests.js#L51
  // START

  t.test("invoke escapeSqlIdentifier with 'no special characters' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved";
    const expected = '"hello world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with 'contains double quotes only' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and single double quote character, escaped with double quote";
    const expected = '"hello "" world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with 'contains single quotes only' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello \' world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and escaped single single quote character preserved";
    const expected = '"hello \' world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with 'contains backslashes only' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello \\ world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and escaped backslash character preserved";
    const expected = '"hello \\ world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with 'contains single quotes and double quotes' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello \' " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and escaped single quote character preserved, single double quote character, escaped with double quote character";
    const expected = '"hello \' "" world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with 'contains double quotes and backslashes' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello \\ " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and escaped single backslash character preserved, single double quote character, escaped with double quote character";
    const expected = '"hello \\ "" world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with 'contains single quotes and backslashes' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello \\ \' world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and escaped single backslash character preserved, escaped single single quote character preserved";
    const expected = '"hello \\ \' world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });
  t.test("invoke escapeSqlIdentifier with 'contains single quotes, double quotes, and backslashes' as 1st argument", (assert) => {
    const node = escapeSqlIdentifier('hello \\ \' " world'); /* eslint-disable-line quotes */

    const message = "should return 1st argument wrapped in set of double quotes with space preserved and escaped single backslash character preserved, escaped single single quote character preserved and single double quote character, escaped with double quote character";
    const expected = '"hello \\ \' "" world"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);
    assert.end();
  });

  // END
  // Sourced escapeIdentifier tests from node-postgres project
  // Source: https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/test/unit/client/escape-tests.js#L51
});
