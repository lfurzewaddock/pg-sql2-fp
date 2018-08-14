import { Client } from "pg";

import DbClientManager from "../db/";
import debugLog from "../../../src/debug-log";
// import sql from "../../../lib";
const sql = require("../../../lib");

const users = [
  { username: "myUser1", password: "myPW1" },
  { username: "myUser2", password: "myPW2" },
];

const products = [
  {
    name: "Bike",
    price: "200",
    category: "bikes",
    active: 1,
    description: null,
    published: true,
    publishedDate: "2009-01-01",
    publishedTime: "2009-01-01 06:30:00",
  },
  {
    name: "Shoe",
    price: "45.99",
    category: "shoes",
    active: 0,
    description: null,
    published: true,
    publishedDate: "2018-08-14",
    publishedTime: "2018-08-14 14:54:00",
  },
  {
    name: "Bike 2",
    price: "150.49",
    category: "bikes",
    active: 1,
    description: null,
    published: false,
    publishedDate: "2018-08-12",
    publishedTime: "2018-08-12 12:00:00",
  },
];

const dbClientManager = DbClientManager(Client);
dbSetup(dbClientManager);

async function dbSetup(db) {
  try {
    await dropTableUsers(db);
    await createTableUsers(db);
    await insertUsers(db, users);
    await dropTableProducts(db);
    await createTableProducts(db);
    await insertProducts(db, products);
    await disconnectDatabase(db);
  } catch (e) {
    debugLog(e, "test:integration:script:createTestTables", "dbSetup try/catch");
  }
}

async function dropTableUsers(db) {
  return db.query(sql.compile(sql`drop table if exists users`).text);
}

async function dropTableProducts(db) {
  return db.query(sql.compile(sql`drop table if exists products`).text);
}

async function createTableUsers(db) {
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

async function createTableProducts(db) {
  return db.query(sql.compile(sql`
    CREATE TABLE public.products (
      pk integer NOT NULL,
      name text NOT NULL,
      price money NOT NULL,
      category text NOT NULL,
      active smallint NOT NULL,
      description text,
      published boolean NOT NULL,
      published_date date NOT NULL,
      published_time timestamp(6) without time zone NOT NULL
  );
  
  ALTER TABLE public.products OWNER TO "pg-sql2-fp-ci";
  
  CREATE SEQUENCE public.products_pk_seq
      AS integer
      START WITH 1
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      CACHE 1;
  
  ALTER TABLE public.products_pk_seq OWNER TO "pg-sql2-fp-ci";
  
  ALTER SEQUENCE public.products_pk_seq OWNED BY public.products.pk;
  
  ALTER TABLE ONLY public.products ALTER COLUMN pk SET DEFAULT nextval('public.products_pk_seq'::regclass);
      
  ALTER TABLE ONLY public.products
      ADD CONSTRAINT products_pkey PRIMARY KEY (pk);
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

async function insertProducts(db, productCollection) {
  const insertQueries = productCollection.map((product) => {
    const query = sql`
      INSERT INTO products(name, price, category, active, description, published, published_date, published_time) 
      VALUES(
        ${sql.value(product.name)},
        ${sql.value(product.price)},
        ${sql.value(product.category)},
        ${sql.value(product.active)},
        ${sql.value(product.description)},
        ${sql.value(product.published)},
        ${sql.value(product.publishedDate)},
        ${sql.value(product.publishedTime)}
      )`;
    const { text, values } = sql.compile(query);
    return db.query(text, values);
  });
  return Promise.all(insertQueries)
    .then(() => debugLog("test:integration:script:insertProducts", `Inserted ${productCollection.length} products successfully`));
}

async function disconnectDatabase(db) {
  return db.disconnect();
}
