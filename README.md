# pg-sql2-fp

[![Build Status](https://travis-ci.com/lfurzewaddock/pg-sql2-fp.svg?branch=master)](https://travis-ci.com/lfurzewaddock/pg-sql2-fp)
[![Coverage Status](https://coveralls.io/repos/github/lfurzewaddock/pg-sql2-fp/badge.svg?branch=master)](https://coveralls.io/github/lfurzewaddock/pg-sql2-fp?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/lfurzewaddock/pg-sql2-fp/badge.svg?targetFile=package.json)](https://snyk.io/test/github/lfurzewaddock/pg-sql2-fp?targetFile=package.json)

Create SQL for PostgreSQL in a safe and composable way with the power of ES6/2015+ template literals.

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

This approach makes it much harder for developers to accidently introduce SQL injection (sqli) vulnerabilities. Raw SQL may only be introduced by a developer with access to the source code, editing the template string directly, or by inappropriately wrapping an untrusted variable with a `sql.raw` or `sql.literal` function. However, although the `sql.literal` function should be considered work in progress and therefore experimental, it is still far safer than using the `sql.raw` function.

### `Credits`

This project is derived from an earlier version of: [graphile/pg-sql2](https://github.com/graphile/pg-sql2)