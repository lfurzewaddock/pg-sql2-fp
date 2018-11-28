# pg-sql2-fp

[![Build Status](https://travis-ci.com/lfurzewaddock/pg-sql2-fp.svg?branch=master)](https://travis-ci.com/lfurzewaddock/pg-sql2-fp)
[![Coverage Status](https://coveralls.io/repos/github/lfurzewaddock/pg-sql2-fp/badge.svg?branch=master)](https://coveralls.io/github/lfurzewaddock/pg-sql2-fp?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/lfurzewaddock/pg-sql2-fp/badge.svg?targetFile=package.json)](https://snyk.io/test/github/lfurzewaddock/pg-sql2-fp?targetFile=package.json)
<span class="badge-npmversion"><a href="https://npmjs.org/package/pg-sql2-fp" title="View this project on NPM"><img src="https://img.shields.io/npm/v/pg-sql2-fp.svg" alt="NPM version" /></a></span>
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Write [parameterised SQL queries for PostgreSQL](https://node-postgres.com/features/queries#parameterized-query) safely and flexibly with ES6/2015+ template literals. The primary objective is to support writing PostgreSQL queries in a flexible and safe way, avoiding the introduction of SQL injection (sqli) vulnerabilities.

## Install

```sh
$ npm install pg-sql2-fp
```

## Usage

```js
const sql = require('pg-sql2-fp');
// or
// import sql from 'pg-sql2-fp';

const tableName = 'user';
const id = 10;
const query = sql.compile(sql`select column1 from ${sql.ident(tableName)} where id = ${sql.value(id)}`);

console.log(query);

// -> { text: 'select column1 from "user" where id = $1', values: [ 10 ] }
```

This approach makes it much harder for developers to accidently introduce SQL injection (sqli) vulnerabilities. SQL may only be introduced by a developer with access to the source code editing template literals directly, or by inappropriately wrapping an untrusted variable with a `sql.raw` or `sql.literal` function. Note: although the `sql.literal` function should be considered work in progress and therefore experimental, it is still far safer to use than the `sql.raw` function.

## API

The API is simple, but powerful.

### ``sql`query` ``

It's necessary to use the `sql` tagged template to prepare the entire query before passing the result to `sql.compile`. Each section will be validated, rejecting variables which are not wrapped in a `pg-sql2-fp` function and converted into a 'SQL item' fragment. An array of 'SQL items' will be generated, one for each `pg-sql2-fp` function and each template literal section in between.

Below, is an example of preparing a query in its simplest form, using just a single tagged template literal, without `pg-sql2-fp` functions. The 'SQL item' fragment is an object with `type`, `text` and `symbol` properties. The `type` property relates to a `pg-sql2-fp` function, which for a template literal section is `sql.raw` as the developer may enter anything. `text` is the result of the function and `symbol` is used to prevent tampering.

```js
const sqlItem = sql`select column1 from "user" where id = 10`;
console.log(sqlItem); // -> 
// [ 
//   { type: 'RAW', text: 'select column1 from "user" where id = 10', [Symbol(trusted)]: true } 
// ]
```

### `sql.compile([SQL items])`
Compiles the 'SQL items' array into a [parametrised SQL query](https://node-postgres.com/features/queries#parameterized-query) and an array of parameter values in the correct order, ready to be executed.

```js
const query = sql`select column1 from ${sql.ident('schema', 'table', 'column')} where id = ${sql.value(10)}`;
const { text, values } = sql.compile(query);

console.log(text) //-> select column1 from "schema"."table"."column" where id = $1
console.log(values) //-> [10] 

// // Example usage with node-postgres pool query (async/await)
//  const rows = await pool.query(text, values);
```

### `sql.ident('name'|symbol <, 'name'|symbol>)`

Creates an identifier compatible with PostgreSQL suitable for schema, table and column names. A qualified identifier will be created if more than one argument is passed. Also, if a symbol is included, it will be replaced automatically with a local unique identifier.

```js
const query = sql.compile(sql`select * from ${sql.ident('user')}`);
console.log(query); // -> { text: 'select * from "user"', values: [] }

const query = sql.compile(sql`select * from ${sql.ident('schema', 'user')}`);
console.log(sqlItems); // -> { text: 'select * from "schema"."user"', values: [] }

const fromIdent = Symbol();
const query = sql.compile(sql`select * from user as ${sql.ident(fromIdent)}`);
console.log(query); // -> { text: 'select * from user as __local_1__', values: [] }
```

### `sql.value('text'|integer|boolean|object)`

The value will be replaced by an indexed placeholder (parameter), in the same position within the resulting SQL query and the value itself will be added to the values array. This is the recommended way to insert variables which may contain user submitted data or data from other untrusted sources.

```js
const query = sql.compile(sql`select * from user where id = ${sql.value(999)}`);
console.log(query); // -> { text: 'select * from user where id = $1', values: [ 999 ] }

const query = sql.compile(sql`select * from user where name = ${sql.value('foo')}`);
console.log(query); // -> { text: 'select * from user where name = $1', values: [ 'foo' ] }

const query = sql.compile(sql`select * from user where active = ${sql.value(true)}`);
console.log(query); // -> { text: 'select * from user where active = $1', values: [ true ] }

const query = sql.compile(sql`select * from user where metadata @> ${sql.value({ foo: { bar: 1 } })}`);
console.log(query); // -> { text: 'select * from user where metadata @> $1', values: [ { foo: [Object] } ] }
```

### `sql.raw('text')`

> **Warning:** Do not pass `sql.raw` text which includes anywhere, user submitted data, or data from untrusted sources. Doing so will introduce a SQL injection (sqli) vulnerability.

Insert arbitrary string of text directly into the SQL generated by `sql.compile`. Helpful during development or as an escape hatch for trusted variables to workaround the constraints of this library, but should be avoided.

```js
const query = sql.compile(sql`select * from user where id ${sql.raw('=')} 5`);
console.log(query); // -> { text: 'select * from user where id = 5', values: [] }
```

### `sql.literal('text'|boolean|'datetime'|integer|decimal)` 

> **Warning:** This feature is work in progress (WIP), therefore experimental. Similar to `sql.raw`, it will insert a string of text directly into SQL. However, it will attempt to mitigate SQL injection (sqli) vulnerabilities, employing measures such as whitelist characters and where appropriate PostgreSQL value type assignment.

```js
const query = sql.compile(sql`select * from user where date_registered < ${sql.literal("2016-08-12")}`);
console.log(query); // -> { text: 'select * from user where date_registered < TIMESTAMP \'2016-08-12\'', values: [] }

const query = sql.compile(sql`select * from user where id = ${sql.literal("1'; DROP TABLE user;")}`);
console.log(query); // -> { text: 'select * from user where id = $1', values: [ '1\'; DROP TABLE user;' ] }

const query = sql.compile(sql`select * from user where value = ${sql.literal("0.3")}`);
console.log(sqlItems); // -> { text: 'select * from user where value = \'0.3\'', values: [] }
```

### `sql.concat([SQL items]<, 'separator'>)`

Joins an array of SQL item fragments together with an optional separator.

```js
const fields = ["a", "b", "c", "d"].map(n => sql.ident(n));
const conditions = [sql`a = 1`, sql`b = 2`, sql`c = 3`];

const sqlItemFields = sql`select ${sql.concat(fields, ", ")}`;
const sqlItemsFrom = sql`from ${sql.ident('schema', 'table')}`;
const sqlItemConditions = sql`where (${sql.concat(conditions, ") and (")})`;
const query = sql.compile(sql.concat([sqlItemFields, sqlItemsFrom, sqlItemConditions], ' '));
console.log(query); // -> { text: 'select "a", "b", "c", "d" from "schema"."table" where (a = 1) and (b = 2) and (c = 3)', values: [] }
```

## Credits

This project is derived from an earlier version of: [graphile/pg-sql2](https://github.com/graphile/pg-sql2)