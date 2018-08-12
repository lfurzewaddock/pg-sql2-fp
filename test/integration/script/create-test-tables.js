import { Client } from "pg";

import DbClientManager from "../db/";
import debugLog from "../../../src/debug-log";
import sql from "../../../lib/pg-sql2-fp";

const users = [
  { username: "myUser1", password: "myPW1" },
  { username: "myUser2", password: "myPW2" },
];

const dbClientManager = DbClientManager(Client);
dbSetup(dbClientManager);

async function dbSetup(db) {
  try {
    await dropDatabase(db);
    await createDatabase(db);
    await insertUsers(db, users);
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

    ALTER TABLE public.users OWNER TO postgres;

    CREATE SEQUENCE public.users_pk_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;

    ALTER TABLE public.users_pk_seq OWNER TO postgres;

    ALTER SEQUENCE public.users_pk_seq OWNED BY public.users.pk;

    ALTER TABLE ONLY public.users ALTER COLUMN pk SET DEFAULT nextval('public.users_pk_seq'::regclass);

    ALTER TABLE ONLY public.users
      ADD CONSTRAINT users_pkey PRIMARY KEY (pk);

    GRANT ALL ON TABLE public.users TO ${sql.ident(process.env.DB_USER)};
  `).text);
}

async function insertUsers(db, userCollection) {
  const insertQueries = userCollection.map((user) => {
    const query = sql`INSERT INTO users(username, password) VALUES(${sql.value(user.username)},${sql.value(user.password)})`;
    const { text, values } = sql.compile(query);
    return db.query(text, values);
  });
  return Promise.all(insertQueries)
    .then(() => debugLog("test:integration:script:insertUsers", `Inserted ${userCollection.length} users successfully`));
}

async function disconnectDatabase(db) {
  return db.disconnect();
}
