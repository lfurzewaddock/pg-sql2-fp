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
  .then(result => result, (e) => {
    debugLog(e, "test:integration:script:createTestTables", "drop table promise (inner)");
  })
  .catch((e) => {
    debugLog(e, "test:integration:script:createTestTables", "drop table promise (outer)");
  });

dbClientManager.query(sql.compile(sql`
  CREATE TABLE public.users
  (
      pk integer NOT NULL DEFAULT nextval('users_pk_seq'::regclass),
      username text COLLATE pg_catalog."default" NOT NULL,
      password text COLLATE pg_catalog."default" NOT NULL,
      CONSTRAINT users_pkey PRIMARY KEY (pk)
  )
  WITH (
      OIDS = FALSE
  )
  TABLESPACE pg_default;
`).text)
  .then(result => result, (e) => {
    debugLog(e, "test:integration:script:createTestTables", "create table promise (inner)");
  })
  .catch((e) => {
    debugLog(e, "test:integration:script:createTestTables", "create table promise (outer)");
  });

dbClientManager.disconnect()
  .then(result => result, (e) => {
    debugLog(e, "test:integration:script:createTestTables", "disconnect promise (inner)");
  })
  .catch((e) => {
    debugLog(e, "test:integration:script:createTestTables", "disconnect promise (outer)");
  });
