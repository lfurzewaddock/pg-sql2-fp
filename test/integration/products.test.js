import { Client } from "pg";
import tape from "tape";
import _test from "tape-promise";

import DbClientManager from "./db/";
import debugLog from "../../src/debug-log";
import * as products from "./db/products";

const test = _test(tape);

const before = test;
const after = test;

before("before", (assert) => {
  assert.pass("Do something before all tests here");
  assert.end();
});

function setup() {
  const dbClientManager = DbClientManager(Client);
  const fixtures = {
    dbClientManager,
  };

  return fixtures;
}

function teardown(fixtures) {
  fixtures.dbClientManager.disconnect();
}

test("sql", (t) => {
  t.test("Select all from table products", async (assert) => {
    const fixtures = setup();

    const { text, values } = products.readAll();
    debugLog(null, "test:integration:productsTest:text", text);
    debugLog(null, "test:integration:productsTest:values", values);

    assert.equal(text, "SELECT * FROM products", "should generate expected SQL");
    assert.deepEqual(values, [], "should have no values");

    const message = "should return array of 3 table row objects";
    const expected = [{
      pk: 1,
      name: "Bike",
      price: "20000",
      category: "bikes",
      active: 1,
      description: null,
      published: true,
      published_date: new Date("Thu Jan 01 2009 00:00:00 GMT+0000 (UTC)"),
      published_time: new Date("Thu Jan 01 2009 06:30:00 GMT+0000 (UTC)"),
    },
    {
      pk: 2,
      name: "Shoe",
      price: "4599",
      category: "shoes",
      active: 0,
      description: null,
      published: true,
      published_date: new Date("Tue Aug 14 2018 00:00:00 GMT+0000 (UTC)"),
      published_time: new Date("Tue Aug 14 2018 14:54:00 GMT+0000 (UTC)"),
    },
    {
      pk: 3,
      name: "Bike 2",
      price: "15049",
      category: "bikes",
      active: 1,
      description: null,
      published: false,
      published_date: new Date("Sun Aug 12 2018 00:00:00 GMT+0000 (UTC)"),
      published_time: new Date("Sun Aug 12 2018 12:00:00 GMT+0000 (UTC)"),
    }];
    try {
      const actual = await fixtures.dbClientManager.query(text, values);

      assert.equal(actual.rowCount, 3, "should find 3 x records");
      assert.deepEqual(actual.rows, expected, message);
    } catch (e) {
      debugLog(e, "test:integration:productsTest");
    } finally {
      teardown(fixtures);
    }

    assert.end();
  });
  t.test("Select 1 product from table products by id", async (assert) => {
    const fixtures = setup();

    const { text, values } = products.readOne(2);
    debugLog(null, "test:integration:productsTest:text", text);
    debugLog(null, "test:integration:productsTest:values", values);

    assert.equal(text, "SELECT * FROM products WHERE pk = 2", "should generate expected SQL");
    assert.deepEqual(values, [], "should have no values");

    const message = "should return array of 1 table row objects";
    const expected = [{
      pk: 2,
      name: "Shoe",
      price: "4599",
      category: "shoes",
      active: 0,
      description: null,
      published: true,
      published_date: new Date("Tue Aug 14 2018 00:00:00 GMT+0000 (UTC)"),
      published_time: new Date("Tue Aug 14 2018 14:54:00 GMT+0000 (UTC)"),
    }];
    try {
      const actual = await fixtures.dbClientManager.query(text, values);

      assert.equal(actual.rowCount, 1, "should find 1 x records");
      assert.deepEqual(actual.rows, expected, message);
    } catch (e) {
      debugLog(e, "test:integration:productsTest");
    } finally {
      teardown(fixtures);
    }

    assert.end();
  });
  t.end();
});

after("after", (assert) => {
  assert.pass("Do something after all tests here");
  assert.end();
});
