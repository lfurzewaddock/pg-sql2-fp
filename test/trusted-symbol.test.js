import test from "tape";
import trustedSymbol from "../src/trusted-symbol";

test("trustedSymbol", (t) => {
  t.test("trustedSymbol", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof trustedSymbol;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke trustedSymbol without arguments equality to itself", (assert) => {
    const trustSymbol = trustedSymbol();

    const message = "should return a symbol, equality evaluates to true when assigned to a local var compared with another invocation assigned to another local var";
    const expected = trustedSymbol();
    const actual = trustSymbol;

    assert.strictEqual(actual, expected, message);
    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke trustedSymbol without arguments equality to itself", (assert) => {
    const message = "should return a symbol, equality evaluates to true when compared with another invocation";

    assert.strictEqual(trustedSymbol(), trustedSymbol(), message);
    assert.equal(trustedSymbol(), trustedSymbol(), message);

    assert.end();
  });
  t.test("invoke trustedSymbol without arguments equality", (assert) => {
    const message = "should not evaluate to true when compared to other symbols created with the same name";

    assert.notStrictEqual(Symbol("trusted"), trustedSymbol(), message);
    assert.notEqual(Symbol("trusted"), trustedSymbol(), message);
    assert.notStrictEqual(Symbol.for("trusted"), trustedSymbol(), message);
    assert.notEqual(Symbol.for("trusted"), trustedSymbol(), message);

    assert.end();
  });
});
