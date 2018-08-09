import { Client } from "pg";

import DbClientManager from "../db/";
import debugLog from "../../../src/debug-log";
import sql from "../../../src";

// const users = [
//   { username: "myUser1", password: "myPW1" },
//   { username: "myUser2", password: "myPW2" },
// ];

const dbClientManager = DbClientManager(Client);
dbClientManager.query(sql.compile(sql`drop table if exists users`).text)
  .then((result) => {
    console.log("Dropped table users");
    console.log("Result: %O: ", result);
    debugLog("test:integration:script:createTestTables", ("result: %o", result));
  }, (e) => {
    debugLog(e, "test:integration:script:createTestTables", "drop table promise (inner)");
  })
  .catch((e) => {
    debugLog(e, "test:integration:script:createTestTables", "drop table promise (outer)");
  });

dbClientManager.query(sql.compile(sql`
  CREATE TABLE public.users (
    pk integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
  );
`).text)
  .then((result) => {
    console.log("Created table users");
    console.log("Result: %O: ", result);
    debugLog("test:integration:script:createTestTables", ("result: %o", result));
  }, (e) => {
    debugLog(e, "test:integration:script:createTestTables", "create table promise (inner)");
  })
  .catch((e) => {
    debugLog(e, "test:integration:script:createTestTables", "create table promise (outer)");
  });

dbClientManager.disconnect()
  .then((result) => {
    console.log("Disconnected");
    console.log("Result: %O: ", result);
    debugLog("test:integration:script:createTestTables", ("result: %o", result));
  }, (e) => {
    debugLog(e, "test:integration:script:createTestTables", "disconnect promise (inner)");
  })
  .catch((e) => {
    debugLog(e, "test:integration:script:createTestTables", "disconnect promise (outer)");
  });
