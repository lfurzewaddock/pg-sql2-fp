"use strict";

import compile from "./compile";
import identifier from "./identifier";
import join from "./join";
import literal from "./literal";
import query from "./query";
import raw from "./raw";
import value from "./value";

export default Object.assign(query, {
  raw, value, literal, ident: identifier, concat: join, compile,
});

