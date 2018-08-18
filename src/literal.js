import raw from "./raw";
import value from "./value";
import escapeSqlLiteral from "./escape-sql-literal";

const trueNode = raw(`TRUE`); /* eslint-disable-line quotes */
const falseNode = raw(`FALSE`); /* eslint-disable-line quotes */
const nullNode = raw(`NULL`); /* eslint-disable-line quotes */

/**
 * If the value is simple will inline it into the query, otherwise will defer
 * to value.
 */
export default function literal(val) {
  // Match alphanumeric string, space and/or -@:.+
  // Block double hyphen -- used for comments
  // Block double at sign @@ used for full text search
  if (typeof val === "string" && val.match(/^((?!-{2})(?!@{2})[-a-zA-Z0-9@:.+ ])*$/gmi)) {
    // ISO 8601 date/datetime (without time, or with time and no timezone, or with time and timezone
    if (val.match(/^(\d{4})-(\d{2})-(\d{2})( \d{2}:\d{2}:\d{2}\.?(\d{0,6})(\-?|\+?)(\d{0,2}))?(Z?)$/gmi)) { /* eslint-disable-line no-useless-escape */
      if (val.match(/(\d{2}:\d{2}:\d{2}.?(\d{0,6})((-|\+)\d{2}))/gmi)) {
        // eg. 2016-08-12 10:22:31.949271-07
        return raw(`TIMESTAMP WITH TIME ZONE ${escapeSqlLiteral(val)}`); // datetime with timezone
      }
      // eg. 2016-08-12 or 2016-08-12 10:22:31.949271
      return raw(`TIMESTAMP ${escapeSqlLiteral(val)}`); // datetime without timezone
    }
    return raw(`${escapeSqlLiteral(val)}`); // string constant
  } else if (typeof val === "number" && Number.isFinite(val)) {
    if (Number.isInteger(val)) {
      return raw(`${String(val)}`); // only digits and hyphen = integer literal
    }
    return raw(`'${0 + val}'`); // only digits and deciamals = float literal
  } else if (typeof val === "boolean") {
    return val ? trueNode : falseNode;
  } else if (val == null) {
    return nullNode;
  }

  return value(val);
}
