
import trustedSymbol from "./trusted-symbol";

let $$trusted = trustedSymbol(); /* eslint-disable-line prefer-const */

export default function enforceValidNode(node) {
  if (node !== null && typeof node === "object" && node[$$trusted] === true) {
    return node;
  }
  throw new Error(`Expected SQL item, instead received '${String(node)}'.`);
}
