import ensureNonEmptyArray from "./ensure-non-empty-array";
import raw from "./raw";
import enforceValidNode from "./enforce-valid-node";

/**
 * Join some Sql items together seperated by a string. Useful when dealing
 * with lists of Sql items that doesn’t make sense as a Sql query.
 */
export default function join(items, rawSeparator = "") {
  ensureNonEmptyArray(items, true);
  if (typeof rawSeparator !== "string") {
    throw new Error("Invalid separator - must be a string");
  }
  const separator = rawSeparator;
  const currentItems = [];
  const sepNode = raw(separator);
  for (let i = 0, l = items.length; i < l; i += 1) {
    const rawItem = items[i];
    let itemsToAppend;
    if (Array.isArray(rawItem)) {
      itemsToAppend = rawItem.map(enforceValidNode);
    } else {
      itemsToAppend = [enforceValidNode(rawItem)];
    }
    if (i === 0 || !separator) {
      currentItems.push(...itemsToAppend);
    } else {
      currentItems.push(sepNode, ...itemsToAppend);
    }
  }
  return currentItems;
}
