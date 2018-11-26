/* istanbul ignore next */
if (!process.env.NODE_ENV) process.env.NODE_ENV = "production";

const $$trusted = process.env.NODE_ENV === "production" ? Symbol("trusted") : Symbol.for("development");

export default function trustedSymbol() {
  return $$trusted;
}
