import trustedSymbol from "./trusted-symbol";

function makeRawNode(text = "", symbol) {
  var rawText = text;
  if (typeof text !== "string") {
    rawText = String(text);
  }
  return { type: "RAW", text: rawText, [symbol]: true };
}

/**
 * WARNING!: proceed with caution as text is not escaped!
 * Creates a Sql item for raw SQL text. Just plain ol‘ raw SQL.
 * This method is dangerous because it involves no escaping.
 */
export default function raw(text, symbol) {
  var trustSymbol = symbol;
  if (typeof symbol === "undefined" || typeof symbol !== "symbol") {
    trustSymbol = trustedSymbol();
  }
  return makeRawNode(text, trustSymbol);
}
