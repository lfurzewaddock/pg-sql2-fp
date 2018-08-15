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

test("sqli users (SELECT)", (t) => {
  t.test(
    "use single quote (') - Select from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "'";
      const password = "'";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(values, ["'", "'"], "should have 2 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use semicolon (;) - Select from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = ";";
      const password = ";";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(values, [";", ";"], "should have 2 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use comment delimiters/double dash (--) - Select from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "--";
      const password = "--";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(values, ["--", "--"], "should have 2 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use username followed by comment delimiters/double dash (myUser2'--) - Select from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "myUser2'--";
      const password = "ignored";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = 'ignored'",
        "should generate expected SQL",
      );
      assert.deepEqual(values, ["myUser2'--"], "should have 1 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use start comment delimiters/slash star (/*) - Select from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "/*";
      const password = "/*";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(values, ["/*", "/*"], "should have 2 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use start and end comment delimiters/slash star, star slash(/* */) - Select from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "/*";
      const password = "*/";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(values, ["/*", "*/"], "should have 2 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test("use Tautology (1 OR 1=1) - Select 1 user from table user by id", async (assert) => {
    const fixtures = setup();

    const { text, values } = users.readOne("1 OR 1=1");
    debugLog(null, "test:integration:usersTest:text", text);
    debugLog(null, "test:integration:usersTest:values", values);

    assert.equal(text, "SELECT * FROM users WHERE pk = $1", "should generate expected SQL");
    assert.deepEqual(values, ["1 OR 1=1"], "should have single string");

    const message = "should throw an error";

    try {
      await fixtures.dbClientManager.query(text, values);
    } catch (e) {
      assert.ok(debugLog(e, "test:integration:usersTest"), message);
      assert.end();
    } finally {
      teardown(fixtures);
    }
  });
  t.test(
    "use Tautology (1' or '1' = '1) - Select 1 user from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "1' or '1' = '1";
      const password = "1' or '1' = '1";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(
        values,
        ["1' or '1' = '1", "1' or '1' = '1"],
        "should have 2 x string values",
      );

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use Tautology (1' or 1 = 1--) - Select 1 user from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "1' or 1 = 1--";
      const password = "1' or 1 = 1--";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(values, ["1' or 1 = 1--", "1' or 1 = 1--"], "should have 2 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use Tautology (1' and 1 = 1--) - Select 1 user from table user by username and password combination",
    async (assert) => {
      const fixtures = setup();

      const username = "1' and 1 = 1--";
      const password = "1' and 1 = 1--";
      const { text, values } = users.readOneByUsernamePasswordCombo(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE username = $1 AND password = $2",
        "should generate expected SQL",
      );
      assert.deepEqual(
        values,
        ["1' and 1 = 1--", "1' and 1 = 1--"],
        "should have 2 x string values",
      );

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
        assert.deepEqual(actual.rows, expected, message);
      } catch (e) {
        debugLog(e, "test:integration:usersTest");
      } finally {
        teardown(fixtures);
      }

      assert.end();
    },
  );
  t.test(
    "use expected integer value not single quote enclosed (UNION ALL SELECT * FROM users) - Select 1 user from table user by id",
    async (assert) => {
      const fixtures = setup();

      const { text, values } = users.readOne("1 UNION ALL SELECT * FROM users");
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(text, "SELECT * FROM users WHERE pk = $1", "should generate expected SQL");
      assert.deepEqual(values, ["1 UNION ALL SELECT * FROM users"], "should have single string");

      const message = "should throw an error";

      try {
        await fixtures.dbClientManager.query(text, values);
      } catch (e) {
        assert.ok(debugLog(e, "test:integration:usersTest"), message);
        assert.end();
      } finally {
        teardown(fixtures);
      }
    },
  );
  t.test(
    "use OR always true and opening comment to skip password check - Select 1 user from table user by username and password combination (query using parentheses)",
    async (assert) => {
      const fixtures = setup();

      const username = "1' or '1' = '1'))/*";
      const password = "foo";
      const { text, values } = users.readOneByUsernamePasswordComboParentheses(username, password);
      debugLog(null, "test:integration:usersTest:text", text);
      debugLog(null, "test:integration:usersTest:values", values);

      assert.equal(
        text,
        "SELECT * FROM users WHERE ((username = $1) AND (password = 'foo'))",
        "should generate expected SQL",
      );
      assert.deepEqual(values, ["1' or '1' = '1'))/*"], "should have 1 x string values");

      const message = "should return empty array";
      const expected = [];
      try {
        const actual = await fixtures.dbClientManager.query(text, values);

        assert.equal(actual.rowCount, 0, "should find 0 x records");
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
