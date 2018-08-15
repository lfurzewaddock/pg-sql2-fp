import { Client } from "pg";
import tape from "tape";
import _test from "tape-promise";

import DbClientManager from "./db/";
import debugLog from "../../src/debug-log";
import * as users from "./db/users";
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

test("sqli users (UPDATE)", (t) => {
  t.test(
    "username followed by update query, followed by comment delimiters/double dash (myUser2'; UPDATE users SET password = 'foo'--)",
    async (assert) => {
      const fixtures = setup();

      const usernameBeforeSqli = "myUser2'; UPDATE users SET password = 'foo'--";
      const passwordBeforeSqli = "ignored";
      const usernameAfterSqli = "myUser2";
      const passwordAfterSqli = "myPW2";
      const beforeSqli = users.readOneByUsernamePasswordCombo(
        usernameBeforeSqli,
        passwordBeforeSqli,
      );
      const afterSqli = users.readOneByUsernamePasswordCombo(usernameAfterSqli, passwordAfterSqli);

      debugLog(null, "test:integration:usersSqliUpdateTest:text", beforeSqli.text);
      debugLog(null, "test:integration:usersSqliUpdateTest:values", beforeSqli.values);
      debugLog(null, "test:integration:usersSqliUpdateTest:text", afterSqli.text);
      debugLog(null, "test:integration:usersSqliUpdateTest:values", afterSqli.values);

      assert.equal(
        beforeSqli.text,
        "SELECT * FROM users WHERE username = $1 AND password = 'ignored'",
        "should generate expected SQL",
      );
      assert.deepEqual(
        beforeSqli.values,
        ["myUser2'; UPDATE users SET password = 'foo'--"],
        "should have 1 x string values",
      );
      assert.equal(
        afterSqli.text,
        "SELECT * FROM users WHERE username = 'myUser2' AND password = 'myPW2'",
        "should generate expected SQL",
      );
      assert.deepEqual(afterSqli.values, [], "should have no values");

      const messageBeforeSqli = "should return empty array";
      const expectedBeforeSqli = [];
      const messagefterSqli = "should return array of 1 table row objects";
      const expectedAfterSqli = [
        {
          pk: 2,
          username: "myUser2",
          password: "myPW2",
        },
      ];

      try {
        const actualBeforeSqli = await fixtures.dbClientManager.query(
          beforeSqli.text,
          beforeSqli.values,
        );
        const actualAfterSqli = await fixtures.dbClientManager.query(
          afterSqli.text,
          afterSqli.values,
        );

        assert.equal(actualBeforeSqli.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actualBeforeSqli.rows, expectedBeforeSqli, messageBeforeSqli);
        assert.equal(actualAfterSqli.rowCount, 1, "should find 1 x records");
        assert.deepEqual(actualAfterSqli.rows, expectedAfterSqli, messagefterSqli);
      } catch (e) {
        debugLog(e, "test:integration:usersSqliUpdateTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "username followed by update query, followed by comment delimiters/double dash (myUser2'; UPDATE products SET price - 1--)",
    async (assert) => {
      const fixtures = setup();

      const usernameBeforeSqli = "myUser2'; UPDATE products SET price - 1--";
      const passwordBeforeSqli = "ignored";
      const beforeSqli = users.readOneByUsernamePasswordCombo(
        usernameBeforeSqli,
        passwordBeforeSqli,
      );
      const afterSqli = products.readOne(2);

      debugLog(null, "test:integration:usersSqliUpdateTest:text", beforeSqli.text);
      debugLog(null, "test:integration:usersSqliUpdateTest:values", beforeSqli.values);
      debugLog(null, "test:integration:usersSqliUpdateTest:text", afterSqli.text);
      debugLog(null, "test:integration:usersSqliUpdateTest:values", afterSqli.values);

      assert.equal(
        beforeSqli.text,
        "SELECT * FROM users WHERE username = $1 AND password = 'ignored'",
        "should generate expected SQL",
      );
      assert.deepEqual(
        beforeSqli.values,
        ["myUser2'; UPDATE products SET price - 1--"],
        "should have 1 x string values",
      );
      assert.equal(
        afterSqli.text,
        "SELECT * FROM products WHERE pk = 2", "should generate expected SQL",
        "should generate expected SQL",
      );
      assert.deepEqual(afterSqli.values, [], "should have no values");

      const messageBeforeSqli = "should return empty array";
      const expectedBeforeSqli = [];
      const messagefterSqli = "should return array of 1 table row objects";
      const expectedAfterSqli = [{
        pk: 2,
        name: "Shoe",
        price: 4599,
        category: "shoes",
        active: 0,
        description: null,
        published: true,
        published_date: new Date("Tue Aug 14 2018 00:00:00 GMT+0000 (UTC)"),
        published_time: new Date("Tue Aug 14 2018 14:54:00 GMT+0000 (UTC)"),
      }];

      try {
        const actualBeforeSqli = await fixtures.dbClientManager.query(
          beforeSqli.text,
          beforeSqli.values,
        );
        const actualAfterSqli = await fixtures.dbClientManager.query(
          afterSqli.text,
          afterSqli.values,
        );

        assert.equal(actualBeforeSqli.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actualBeforeSqli.rows, expectedBeforeSqli, messageBeforeSqli);
        assert.equal(actualAfterSqli.rowCount, 1, "should find 1 x records");
        assert.deepEqual(actualAfterSqli.rows, expectedAfterSqli, messagefterSqli);
      } catch (e) {
        debugLog(e, "test:integration:usersSqliUpdateTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.end();
});

after("after", (assert) => {
  assert.pass("Do something after all tests here");
  assert.end();
});
