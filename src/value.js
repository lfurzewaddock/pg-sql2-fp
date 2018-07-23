import trustedSymbol from "./trusted-symbol";

const $$trusted = trustedSymbol();

function makeValueNode(val) {
  return { type: "VALUE", value: val, [$$trusted]: true };
}

/**
 * Creates a Sql item for a value that will be included in our final query.
 * This value will be added in a way which avoids Sql injection.
 */
export default function value(val) {
  return makeValueNode(val);
}
