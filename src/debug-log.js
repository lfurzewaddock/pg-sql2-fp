import debug from "debug";

export default function debugLog(error, namespace = "", msg = "") {
  let err = error;
  if (err !== null && err.stack && err.message) {
    debug(`pg-sql2-fp:${namespace}`)(`${msg} %O`, err);
  } else {
    err = null;
    debug(`pg-sql2-fp:${namespace}`)(`${msg}`);
  }
  return err;
}
