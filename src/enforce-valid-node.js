
import trustedSymbol from "./trusted-symbol";

const $$trusted = trustedSymbol();

export default function enforceValidNode(node) {
  if (node !== null && typeof node === "object" && node[$$trusted] === true) {
    return node;
  }
  throw new Error(`Expected SQL item, instead received '${String(node)}'.`);
}
