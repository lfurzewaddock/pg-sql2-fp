import sql from "../../../lib/pg-sql2-fp";

export function readAll() {
  return sql.compile(sql`SELECT * FROM users`);
}

export function readOne(id) {
  return sql.compile(sql`SELECT * FROM users WHERE pk = ${sql.literal(id)}`);
}
