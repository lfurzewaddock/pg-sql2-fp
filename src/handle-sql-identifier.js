import debugError from "./debug-error";
import escapeSqlIdentifier from "./escape-sql-identifier";

export default function handleSqlIdentifier(names) {
  if (!Array.isArray(names) || names.length < 1) {
    throw debugError(new Error("Expected non-empty array"));
  }
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
