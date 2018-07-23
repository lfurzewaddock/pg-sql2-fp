import test from "tape";
// import * as sql from "../src";

import raw from "../src/raw";

test("sql", (t) => {
  t.test("raw", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof raw;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("raw (integer argument)", (assert) => {
    const node = `${raw(1)}`;

    const message = "should return a SQL node (type 'RAW') with text property set to first argument";
    const expected = [{ type: "RAW", text: "1" }];
    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  // t.test("raw (NO ARGUMENT)", (assert) => {
  //   const node = sql.query`${raw()}`;

  //   const message = "should return a SQL node (type 'RAW') with empty text property";
  //   const expected = [{ type: "RAW", text: "" }];
  //   const actual = node;

  //   assert.deepEqual(actual, expected, message);

  //   assert.end();
  // });
});
