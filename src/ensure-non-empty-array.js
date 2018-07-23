import debugError from "./debug-error";

export default function ensureNonEmptyArray(array, allowZeroLength = false) {
  if (!Array.isArray(array)) {
    throw debugError(new Error("Expected array"));
  }
  if (!allowZeroLength && array.length < 1) {
    throw debugError(new Error("Expected non-empty array"));
  }
  for (let idx = 0, l = array.length; idx < l; idx += 1) {
    if (array[idx] == null) {
      throw debugError(new Error(`Array index ${idx} is ${String(array[idx])}`));
    }
  }
  return array;
}
