import test from "tape";
import handleSqlIdentifier from "../../src/handle-sql-identifier";

test("handleSqlIdentifier", (t) => {
  t.test("handleSqlIdentifier", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof handleSqlIdentifier;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier without arguments", (assert) => {
    const message = "throws an error complaining that a non-empty array is expected";

    assert.throws(function throwsFn() {
      handleSqlIdentifier();
    }, /(Error: Expected non-empty array)/, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an empty array as the 1st argument", (assert) => {
    const testArray = [];
    const message = "throws an error complaining that a non-empty array is expected";

    assert.throws(function throwsFn() {
      handleSqlIdentifier(testArray);
    }, /(Error: Expected non-empty array)/, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing a single integer as the 1st argument", (assert) => {
    const testArray = [1];
    const message = "throws an error complaining that a string or symbol is expected";

    assert.throws(function throwsFn() {
      handleSqlIdentifier(testArray);
    }, /(Error: Expected string or symbol, received '1')/, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with a single boolean as the 1st argument", (assert) => {
    const boolean = true;
    const message = "throws an error complaining that a string or symbol is expected";

    assert.throws(function throwsFn() {
      handleSqlIdentifier(boolean);
    }, /(Error: Expected non-empty array)/, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing a 1 string as the 1st argument", (assert) => {
    const node = handleSqlIdentifier(["TableName"]);

    const message = "should return single string wrapped in double quotes";
    const expected = '"TableName"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing a 2 strings as the 1st argument", (assert) => {
    const node = handleSqlIdentifier(["SchemaName", "TableName"]);

    const message = "should return single string with each array value provided as the 1st argument wrapped in double quotes, separated by full stops";
    const expected = '"SchemaName"."TableName"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing a 3 strings as the 1st argument", (assert) => {
    const node = handleSqlIdentifier(["SchemaName", "TableName", "ColumnName"]);

    const message = "should return single string with each array value provided as the 1st argument wrapped in double quotes, separated by full stops";
    const expected = '"SchemaName"."TableName"."ColumnName"'; /* eslint-disable-line quotes */
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing a 1 symbol as the 1st argument", (assert) => {
    const ident1 = Symbol("ident");
    const node = handleSqlIdentifier([ident1]);

    const message = "should return a string with 1 aliases: format '__local_<increment>__', separated by full stops";
    const expected = "__local_1__";
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing 2 symbols as the 1st argument", (assert) => {
    const ident1 = Symbol("ident");
    const ident2 = Symbol("ident");
    const node = handleSqlIdentifier([ident1, ident2]);

    const message = "should return a string with 2 aliases: format '__local_<increment>__', separated by full stops";
    const expected = "__local_1__.__local_2__";
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing 2 identical symbols as the 1st argument", (assert) => {
    const ident1 = Symbol.for("ident");
    const ident2 = Symbol.for("ident");
    const node = handleSqlIdentifier([ident1, ident2]);

    const message = "should return a string with 1 alias, repeated twice: format '__local_<increment>__', separated by full stops";
    const expected = "__local_1__.__local_1__";
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing 3 symbols as the 1st argument", (assert) => {
    const ident1 = Symbol("ident");
    const ident2 = Symbol("ident");
    const ident3 = Symbol("ident");
    const node = handleSqlIdentifier([ident1, ident2, ident3]);

    const message = "should return a string with 3 aliases: format '__local_<increment>__', separated by full stops";
    const expected = "__local_1__.__local_2__.__local_3__";
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke handleSqlIdentifier with an array containing 2 identical symbols as the 1st argument", (assert) => {
    const ident1 = Symbol.for("ident");
    const ident2 = Symbol.for("ident");
    const ident3 = Symbol.for("ident");
    const node = handleSqlIdentifier([ident1, ident2, ident3]);

    const message = "should return a string with 1 alias, repeated twice: format '__local_<increment>__', separated by full stops";
    const expected = "__local_1__.__local_1__.__local_1__";
    const actual = node;

    assert.equal(actual, expected, message);

    assert.end();
  });
});

