// import sql from "../../../lib";
const sql = require("../../../lib");

export function readAll() {
  return sql.compile(sql`SELECT * FROM products`);
}

export function readOne(id) {
  return sql.compile(sql`SELECT * FROM products WHERE pk = ${sql.literal(id)}`);
}
