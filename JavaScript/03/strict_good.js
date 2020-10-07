function foo() {
  "use strict";

  x = 10; // ReferenceError: x is not defined
  console.log("foo");
}
foo();
