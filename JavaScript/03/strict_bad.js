function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  console.log("foo");

  "use strict";
}
foo();
