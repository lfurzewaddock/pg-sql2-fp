import debugError from "./debug-error";
// Derived from https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/lib/client.js#L325
// Which was ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
export default function escapeSqlLiteral(str) {
  var hasBackslash = false;
  var escaped = "\'"; /* eslint-disable-line no-useless-escape */

  // return empty string if empty string received;
  if (typeof str !== "string") {
    throw debugError(new Error(`Expected string, received '${String(str)}'`));
  }

  // return empty string if string with length 0 received;
  if (typeof str === "string" && str.length === 0) {
    return "";
  }

  for (let i = 0; i < str.length; i += 1) {
    const c = str[i];
    if (c === "\'") { /* eslint-disable-line no-useless-escape */
      escaped += c + c;
    } else if (c === "\\") {
      escaped += c + c;
      hasBackslash = true;
    } else {
      escaped += c;
    }
  }

  escaped += "\'"; /* eslint-disable-line no-useless-escape */

  if (hasBackslash === true) {
    escaped = ' E' + escaped; /* eslint-disable-line prefer-template *//* eslint-disable-line quotes */
  }

  return escaped;
}
