/* istanbul ignore next */
const trusted$$ = process.env.NODE_ENV === "production" ? Symbol("trusted") : Symbol.for("development");

export default function trustedSymbol() {
  return trusted$$;
}
