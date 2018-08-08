import debugLog from "./debug-log";
// Derived from https://github.com/brianc/node-postgres/blob/6c840aabb09f8a2d640800953f6b884b6841384c/lib/client.js#L306
// Which was ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
// Escapes double quote characters in a string
export default function escapeSqlIdentifier(str) {
  // return empty string if empty string received;
  if (typeof str !== "string") {
    throw debugLog(new Error(`Expected string, received '${String(str)}'`), "escapeSqlIdentifier");
  }

  // return empty string if string with length 0 received;
  if (typeof str === "string" && str.length === 0) {
    return "";
  }

  const dblQuoteEscaped = Array.from(str, (char) => {
    if (char === '"') { /* eslint-disable-line quotes */
      return char + char;
    }
    return char;
  });

  return `"${dblQuoteEscaped.join("")}"`;
}
