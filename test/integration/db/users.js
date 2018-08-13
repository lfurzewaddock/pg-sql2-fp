// import sql from "../../../lib";
const sql = require("../../../lib").default;

export function readAll() {
  return sql.compile(sql`SELECT * FROM users`);
}

export function readOne(id) {
  return sql.compile(sql`SELECT * FROM users WHERE pk = ${sql.literal(id)}`);
}
