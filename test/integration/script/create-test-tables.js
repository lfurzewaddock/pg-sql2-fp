import { Client } from "pg";

import DbClientManager from "../db/";
import debugLog from "../../../src/debug-log";
import sql from "../../../src";

// const users = [
//   { username: "myUser1", password: "myPW1" },
//   { username: "myUser2", password: "myPW2" },
// ];

const dbClientManager = DbClientManager(Client);
dbSetup(dbClientManager);

async function dbSetup(db) {
  try {
    await dropDatabase(db);
    await createDatabase(db);
    await disconnectDatabase(db);
  } catch (e) {
    debugLog(e, "test:integration:script:createTestTables", "dbSetup try/catch");
  }
}

async function dropDatabase(db) {
  return db.query(sql.compile(sql`drop table if exists users`).text);
}

async function createDatabase(db) {
  return db.query(sql.compile(sql`
    CREATE TABLE public.users (
      pk integer NOT NULL,
      username text NOT NULL,
      password text NOT NULL
    );
  `).text);
}

async function disconnectDatabase(db) {
  return db.disconnect();
}
