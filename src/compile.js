import enforceValidNode from "./enforce-valid-node";
import handleSqlIdentifier from "./handle-sql-identifier";

export default function compile(sql) {
  // Join this to generate the SQL query
  const sqlFragments = [];

  // Values hold the JavaScript values that are represented in the query
  // string by placeholders. They are eager because they were provided before
  // compile time.
  const values = [];

  const items = Array.isArray(sql) ? sql : [sql];

  for (let i = 0, l = items.length; i < l; i += 1) {
    const rawItem = items[i];
    const item = enforceValidNode(rawItem);
    switch (item.type) {
      case "RAW":
        if (typeof item.text !== "string") {
          throw new Error("RAW node expected string");
        }
        // If this is just raw text, we add it directly to the query text.
        sqlFragments.push(item.text);
        break;
      case "IDENTIFIER":
        if (item.names.length === 0) {
          throw new Error("Identifier must have a name");
        }
        // If we got an identifier type, escape the strings and get a local
        // identifier for non-string identifiers.
        sqlFragments.push(handleSqlIdentifier(item.names));
        break;
      case "VALUE":
        // If we got a value SQL item, add a placeholder and add the value to our
        // placeholder values array.
        values.push(item.value);
        sqlFragments.push(`$${values.length}`);
        break;
      default:
    }
  }

  const text = sqlFragments.join("");
  return {
    text,
    values,
  };
}
