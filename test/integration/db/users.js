// import sql from "../../../lib";
const sql = require("../../../lib");

export function readAll() {
  return sql.compile(sql`SELECT * FROM users`);
}

export function readOne(id) {
  return sql.compile(sql`SELECT * FROM users WHERE pk = ${sql.literal(id)}`);
}

export function readOneByUsernamePasswordCombo(username, password) {
  return sql.compile(sql`SELECT * FROM users WHERE username = ${sql.literal(username)} AND password = ${sql.literal(password)}`);
}
