/* istanbul ignore next */
var $$trusted = process.env.NODE_ENV === "production" ? Symbol("trusted") : Symbol.for("development"); /* eslint-disable-line prefer-const */

export default function trustedSymbol() {
  return $$trusted;
}
