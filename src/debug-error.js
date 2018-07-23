const debug = require("debug")("pg-sql2-pg");

export default function debugError(err) {
  debug(err);
  return err;
}
