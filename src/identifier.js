import trustedSymbol from "./trusted-symbol";
import ensureNonEmptyArray from "./ensure-non-empty-array";

let $$trusted = trustedSymbol(); /* eslint-disable-line prefer-const */

function isStringOrSymbol(val) {
  return typeof val === "string" || typeof val === "symbol";
}

function makeIdentifierNode(names) {
  if (!Array.isArray(names) || !names.every(isStringOrSymbol)) {
    throw new Error("Invalid argument to makeIdentifierNode - expected array of strings/symbols");
  }
  return { type: "IDENTIFIER", names, [$$trusted]: true };
}

/**
 * Creates a Sql item for a Sql identifier. A Sql identifier is anything like
 * a table, schema, or column name. An identifier may also have a namespace,
 * thus why many names are accepted.
 */
export default function identifier(...names) {
  return makeIdentifierNode(ensureNonEmptyArray(names));
}

