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
  // Match alphanumeric string and/or -_@!
  // Block double hyphen -- used for comments
  if (typeof val === "string" && val.match(/^((?!-{2})[-a-zA-Z0-9_@! ])*$/)) {
    return raw(`${escapeSqlLiteral(val)}`);
  } else if (typeof val === "number" && Number.isFinite(val)) {
    if (Number.isInteger(val)) {
      return raw(String(val)); // only digits and hyphen = integer literal
    }
    return raw(`'${0 + val}'::float`);
  } else if (typeof val === "boolean") {
    return val ? trueNode : falseNode;
  } else if (val == null) {
    return nullNode;
  }

  return value(val);
}
