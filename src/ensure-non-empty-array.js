import debugLog from "./debug-log";

export default function ensureNonEmptyArray(array, allowZeroLength = false) {
  if (!Array.isArray(array)) {
    throw debugLog(new Error("Expected array"), "ensureNonEmptyArray");
  }
  if (!allowZeroLength && array.length < 1) {
    throw debugLog(new Error("Expected non-empty array"), "ensureNonEmptyArray");
  }
  for (let idx = 0, l = array.length; idx < l; idx += 1) {
    if (array[idx] == null) {
      throw debugLog(new Error(`Array index ${idx} is ${String(array[idx])}`), "ensureNonEmptyArray");
    }
  }
  return array;
}
