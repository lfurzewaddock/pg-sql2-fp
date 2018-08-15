import { Client } from "pg";
import tape from "tape";
import _test from "tape-promise";

import DbClientManager from "./db/";
import debugLog from "../../src/debug-log";
import * as users from "./db/users";

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
  t.test("Select all from table users", async (assert) => {
    const fixtures = setup();

    const { text, values } = users.readAll();
    debugLog(null, "test:integration:usersTest:text", text);
    debugLog(null, "test:integration:usersTest:values", values);

    assert.equal(text, "SELECT * FROM users", "should generate expected SQL");
    assert.deepEqual(values, [], "should have no values");

    const message = "should return array of 2 table row objects";
    const expected = [
      {
        pk: 1,
        username: "myUser1",
        password: "myPW1",
      },
      {
        pk: 2,
        username: "myUser2",
        password: "myPW2",
      },
    ];
    try {
      const actual = await fixtures.dbClientManager.query(text, values);

      assert.equal(actual.rowCount, 2, "should find 2 x records");
      assert.deepEqual(actual.rows, expected, message);
    } catch (e) {
      debugLog(e, "test:integration:usersTest");
    } finally {
      teardown(fixtures);
    }

    assert.end();
  });
  t.test("Select 1 user from table user by id", async (assert) => {
    const fixtures = setup();

    const { text, values } = users.readOne(1);
    debugLog(null, "test:integration:usersTest:text", text);
    debugLog(null, "test:integration:usersTest:values", values);

    assert.equal(text, "SELECT * FROM users WHERE pk = 1", "should generate expected SQL");
    assert.deepEqual(values, [], "should have no values");

    const message = "should return array of 1 table row objects";
    const expected = [
      {
        pk: 1,
        username: "myUser1",
        password: "myPW1",
      },
    ];
    try {
      const actual = await fixtures.dbClientManager.query(text, values);

      assert.equal(actual.rowCount, 1, "should find 1 x records");
      assert.deepEqual(actual.rows, expected, message);
    } catch (e) {
      debugLog(e, "test:integration:usersTest");
    } finally {
      teardown(fixtures);
    }

    assert.end();
  });
  t.test("Select 1 user from table user by username and password combination", async (assert) => {
    const fixtures = setup();

    const username = "myUser2";
    const password = "myPW2";
    const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
    debugLog(null, "test:integration:usersTest:text", text);
    debugLog(null, "test:integration:usersTest:values", values);

    assert.equal(
      text,
      "SELECT * FROM users WHERE username = 'myUser2' AND password = 'myPW2'",
      "should generate expected SQL",
    );
    assert.deepEqual(values, [], "should have no values");

    const message = "should return array of 1 table row objects";
    const expected = [
      {
        pk: 2,
        username: "myUser2",
        password: "myPW2",
      },
    ];
    try {
      const actual = await fixtures.dbClientManager.query(text, values);

      assert.equal(actual.rowCount, 1, "should find 1 x records");
      assert.deepEqual(actual.rows, expected, message);
    } catch (e) {
      debugLog(e, "test:integration:usersTest");
    } finally {
      teardown(fixtures);
    }

    assert.end();
  });
  t.test(
    "Select 1 user from table user by username and password combination (query using parentheses)",
    async (assert) => {
      const fixtures = setup();

      const username = "myUser2";
      const password = "myPW2";
      const { text, values } = users.readOneByUsernamePasswordComboParentheses(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE ((username = 'myUser2') AND (password = 'myPW2'))",
        "should generate expected SQL",
      );
      assert.deepEqual(values, [], "should have no values");

      const message = "should return array of 1 table row objects";
      const expected = [
        {
          pk: 2,
          username: "myUser2",
          password: "myPW2",
        },
      ];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 1, "should find 1 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
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
