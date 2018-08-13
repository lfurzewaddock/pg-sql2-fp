import debug from "debug";

export default function debugLog(error, namespace = "", msg = "") {
  if (error && error.stack && error.message) {
    debug(`pg-sql2-fp:${namespace}`)(`${msg} %O`, error);
    return error;
  }
  debug(`pg-sql2-fp:${namespace}`)(`${msg}`);
  return null;
}
