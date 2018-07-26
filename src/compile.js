import debugError from "./debug-error";
import enforceValidNode from "./enforce-valid-node";
import escapeSqlIdentifier from "./escape-sql-identifier";

function handleIdentifier(names) {
  // When we come accross a symbol in our identifier, we create a unique
  // alias for it that shouldn’t be in the users schema. This helps maintain
  // sanity when constructing large Sql queries with many aliases.
  let nextSymbolId = 0;

  const symbolToIdentifier = new Map();

  const mapResult = names.map((name) => {
    if (typeof name === "string") {
      return escapeSqlIdentifier(name);
    }

    if (typeof name === "symbol") {
      // Get the correct identifier string for this symbol.
      let identifierSymbol = symbolToIdentifier.get(name); // get value associated to name

      // If there is no identifier, create one and set it.
      if (typeof identifierSymbol === "undefined") {
        identifierSymbol = `__local_${nextSymbolId += 1}__`; // Manualy create symbol with magic string and increment
        symbolToIdentifier.set(name, identifierSymbol); // set value for the key in the Map object.
      }

      // Return the identifier. As we created it, we do not have to
      // escape it, because we know all of the characters are safe.
      return identifierSymbol;
    }

    throw debugError(new Error(`Expected string or symbol, received '${String(name)}'`));
  }).join(".");

  return mapResult;
}

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
        sqlFragments.push(handleIdentifier(item.names));
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
