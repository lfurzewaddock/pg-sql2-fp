"use strict";

import enforceValidNode from "./enforce-valid-node";
import raw from "./raw";

/**
 * A template string tag that creates a `Sql` query out of some strings and
 * some values. Use this to construct all PostgreSQL queries to avoid SQL
 * injection.
 *
 * Note that using this function, the user *must* specify if they are injecting
 * raw text. This makes a SQL injection vulnerability harder to create.
 */
export default function query(strings, ...values) {
  if (!Array.isArray(strings)) {
    throw new Error("query should be used as a template literal, not a function call!");
  }
  const items = [];
  for (let i = 0, l = strings.length; i < l; i += 1) {
    const text = strings[i];
    if (text.length > 0) {
      items.push(raw(text));
    }
    if (values[i]) {
      const value = values[i];
      if (Array.isArray(value)) {
        const nodes = value.map(enforceValidNode);
        items.push(...nodes);
      } else {
        const node = enforceValidNode(value);
        items.push(node);
      }
    }
  }
  return items;
}
