// import sql from "../../../lib";
const sql = require("../../../lib");

console.log("sql:", sql); /* eslint-disable-line no-console */

export function readAll() {
  return sql.compile(sql`SELECT * FROM users`);
}

export function readOne(id) {
  return sql.compile(sql`SELECT * FROM users WHERE pk = ${sql.literal(id)}`);
}
