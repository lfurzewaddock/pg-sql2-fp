import test from "tape";
import join from "../src/join";
import trustedSymbol from "../src/trusted-symbol";

test("join", (t) => {
  t.test("join", (assert) => {
    const message = "should be a function";
    const expected = "function";
    const actual = typeof join;

    assert.equal(actual, expected, message);

    assert.end();
  });
  t.test("invoke join without any arguments", (assert) => {
    const message = "throws an error complaining an array is expected";

    assert.throws(function throwsFn() {
      join();
    }, /(Expected array)/, message);

    assert.end();
  });
  t.test("invoke join with an array of 2 x 'Sql items' as the 1st argument and a ',' as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockSqlBar = { type: "RAW", text: "bar(2)", [$$trusted]: true };

    const node = join(
      [
        mockSqlFoo,
        mockSqlBar,
      ],
      ",",
    );

    const message = "should return an array of 3 x 'SQL items', including a raw Sql item between the original 2 provided in the 1st argument with a text property set to the separator specified in the 2nd argument";
    const expected = [
      { type: "RAW", text: "foo(1)" },
      { type: "RAW", text: "," },
      { type: "RAW", text: "bar(2)" },
    ];

    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke join with an array of 2 x 'Sql items' as the 1st argument and a ',' as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockIdentifier = { type: "IDENTIFIER", names: ["foo", "bar"], [$$trusted]: true };

    const node = join(
      [
        mockIdentifier,
        mockSqlFoo,
      ],
      ",",
    );

    const message = "should return an array of 3 x 'SQL items', including a raw Sql item between the original 2 provided in the 1st argument with a text property set to the separator specified in the 2nd argument";
    const expected = [
      { type: "IDENTIFIER", names: ["foo", "bar"] },
      { type: "RAW", text: "," },
      { type: "RAW", text: "foo(1)" },
    ];

    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke join with 'Sql item' (array of sub-queries) as the 1st argument and a ',' as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockNestedQuery = [
      { type: "RAW", text: "baz.qux(1, ", [$$trusted]: true },
      { type: "RAW", text: "2", [$$trusted]: true },
      { type: "RAW", text: ", 3)", [$$trusted]: true },
    ];

    const node = join(
      [
        mockNestedQuery,
      ],
      ",",
    );

    const message = "should return the 'Sql item' (array of sub-queries) provided as the 1st argument and skip adding seperator 'Sql items'";
    const expected = [
      { type: "RAW", text: "baz.qux(1, " },
      { type: "RAW", text: "2" },
      { type: "RAW", text: ", 3)" },
    ];

    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke join with 'Sql item' (array of sub-queries) as the 1st argument and a ',' as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockIdentifier = { type: "IDENTIFIER", names: ["foo", "bar"], [$$trusted]: true };
    const mockNestedQuery = [
      { type: "RAW", text: "baz.qux(1, ", [$$trusted]: true },
      { type: "RAW", text: "2", [$$trusted]: true },
      { type: "RAW", text: ", 3)", [$$trusted]: true },
    ];

    const node = join(
      [
        mockNestedQuery,
        mockIdentifier,
        mockSqlFoo,
      ],
      ",",
    );

    const message = "should return the 'Sql item' (array of sub-queries), plus 2 x 'Sql items', including raw Sql items between the original 3 provided in the 1st argument with a text property set to the separator specified in the 2nd argument";
    const expected = [
      { type: "RAW", text: "baz.qux(1, " },
      { type: "RAW", text: "2" },
      { type: "RAW", text: ", 3)" },
      { type: "RAW", text: "," },
      { type: "IDENTIFIER", names: ["foo", "bar"] },
      { type: "RAW", text: "," },
      { type: "RAW", text: "foo(1)" },

    ];

    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke join with an array of 2 x 'Sql items' as the 1st argument and do not provide a 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockSqlBar = { type: "RAW", text: "bar(2)", [$$trusted]: true };

    const node = join([
      mockSqlFoo,
      mockSqlBar,
    ]);

    const message = "should return the array of 2 x 'SQL items' provided as the 1st argument and skip adding seperator 'Sql items'";
    const expected = [
      { type: "RAW", text: "foo(1)" },
      { type: "RAW", text: "bar(2)" },
    ];

    const actual = node;

    assert.deepEqual(actual, expected, message);

    assert.end();
  });
  t.test("invoke join with an array of 2 x 'Sql items' as the 1st argument and do not provide a 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockSqlBar = { type: "RAW", text: "bar(2)", [$$trusted]: true };

    const message = "should not throw an error when 2nd argument for the seperator is not provided";

    assert.doesNotThrow(function doesNotThrowFn() {
      join([
        mockSqlFoo,
        mockSqlBar,
      ]); /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid separator - must be a string)/, message);

    assert.end();
  });
  t.test("invoke join with an array of 2 x 'Sql items' as the 1st argument and an integer as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockSqlBar = { type: "RAW", text: "bar(2)", [$$trusted]: true };

    const message = "throws an error complaining the separator argument must be string";

    assert.throws(function throwsFn() {
      join(
        [
          mockSqlFoo,
          mockSqlBar,
        ],
        1,
      ); /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid separator - must be a string)/, message);

    assert.end();
  });
  t.test("invoke join with an array of 2 x 'Sql items' as the 1st argument and boolean true as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockSqlBar = { type: "RAW", text: "bar(2)", [$$trusted]: true };

    const message = "throws an error complaining the separator argument must be string";

    assert.throws(function throwsFn() {
      join(
        [
          mockSqlFoo,
          mockSqlBar,
        ],
        true,
      ); /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid separator - must be a string)/, message);

    assert.end();
  });
  t.test("invoke join with an array of 2 x 'Sql items' as the 1st argument and boolean false as the 2nd argument", (assert) => {
    const $$trusted = trustedSymbol();
    const mockSqlFoo = { type: "RAW", text: "foo(1)", [$$trusted]: true };
    const mockSqlBar = { type: "RAW", text: "bar(2)", [$$trusted]: true };

    const message = "throws an error complaining the separator argument must be string";

    assert.throws(function throwsFn() {
      join(
        [
          mockSqlFoo,
          mockSqlBar,
        ],
        false,
      ); /* eslint-disable-line no-unused-expressions */
    }, /(Error: Invalid separator - must be a string)/, message);

    assert.end();
  });
});
