# 3장

## 식별자

변수나 함수, 프로퍼티, 함수 매개변수의 이름

- 첫 번째 문자는 반드시 글자나 밑줄(\_), 달러 기호(\$) 중 하나여야 합니다.
- 다른 문자에는 글자나 밑줄, 달러 기호, 숫자를 자유롭게 쓸 수 있습니다.
- 글자에는 확장 ASCII나 유니코드 문자를 쓸 수 있습니다.

Good

```js
const a = 1;
const a$ = 1;
const _a = 1;
```

Bad

```js
const 1a = 1;
```

유니코드

```js
const 테스트 = 1;
```

한글 식별자는 권장하진 않지만 가독성 측면에서 효과적이라면 사용할때가 있습니다.  
만약 사용한다면 상수에서 사용을 합니다.

- 다국어 key값

```js
// 영어 식별자
t("setting");
t("user_name");

// 한글 식별자
t("환경설정");
t("사용자_이름");
```

- 테스트 코드 상수값

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(movementX, movementY) {
    this.x += movementX;
    this.y += movementY;
  }
}

// 영어 식별자
it("Point move", () => {
  // given
  const x = 1;
  const y = 0;
  const movementX = 2;
  const movementY = 2;
  const targetX = x + movementX;
  const targetY = y + movementY;

  const point = new Point(x, y);

  // when
  point.move(movementX, movementY);

  // then
  expect(point.x).toBe(targetX);
  expect(point.y).toBe(targetY);
});

// 한글 식별자
it("Point move", () => {
  // given
  const 초기값_X = 1;
  const 초기값_Y = 0;
  const 이동_X = 2;
  const 이동_Y = 2;
  const 예상_X = 초기값_X + 이동_X;
  const 예상_Y = 초기값_Y + 이동_Y;

  const point = new Point(초기값_X, 초기값_Y);

  // when
  point.move(이동_X, 이동_Y);

  // then
  expect(point.x).toBe(예상_X);
  expect(point.y).toBe(예상_Y);
});
```

## 스트릭트 모드(ES5 추가)

기존과는 다른 방식으로 자바스크립트를 파싱하고 실행하라고 지시  
ES3의 안전하지 않은 동작에는 에러를 반환하도록 합니다.

사용법

```js
// 전역
"use strict";

// 지역
(function () {
  "use strict";
})();
```

모듈에 strict mode 적용 ES6(ECMAScript 2015)

```js
function foo() {
  // 모듈이기때문에 기본적으로 엄격합니다
}
export default foo;
```

전역 사용시 외부 라이브러리중 non-strict mode 스크립트는 에러를 발생시킬 수 있기때문에 권장하지 않습니다.

Good

```js
function foo() {
  "use strict";

  x = 10; // ReferenceError: x is not defined
  console.log("foo");
}
foo();
```

Bad

```js
function foo() {
  x = 10; // 에러를 발생시키지 않는다.
  console.log("foo");

  "use strict";
}
foo();
```

## 문장

각 문장은 세미콜론으로 종료합니다.

```js
const sum = a + b // 세미콜론이 없어도 유효하지만 권장하지 않습니다.
const diff = a - b; // 이렇게 쓰길 권장합니다.
```

세미콜론을 쓰게되면 문장의 시작 키워드를 비교하지 않아도 되기때문에 파서에 유리합니다.

```js
while (
  current < tokens.length &&
  !isSemicolon(token) &&
  !isNewStatement(token)
) {
  statement.push(token);
  token = tokens[++current];
}
```

전체 코드는 다음과 같습니다.

```js
const keywords = ["var", "const", "let", "class", "function", "for", "if", "return", "continue"];

function getKeywords() {
  return keywords.map(keyword => keyword.toUpperCase());
}

const tokenMatch = {
  whiteSpace: /(?:\s+|#.*|-- +.*|\/\*(?:[\s\S])*?\*\/)+/,
  equal: "=",
  semicolon: ";",
  doubleQuote: `"`,
  singleQuote: `'`,
  backtick: "`",
  keywords: getKeywords(),
  string: /[a-z0-9_]/i,
  unknown: /.+/
};

function tokenizer(input) {
  let current = 0;

  const tokens = [];

  while (current < input.length) {
    let char = input[current];

    if (tokenMatch.whiteSpace.test(char)) {
      current++;
      continue;
    }

    if (char === tokenMatch.equal) {
      tokens.push({
        type: "equal",
        value: "=",
      });
      current++;
      continue;
    }

    if (char === tokenMatch.semicolon) {
      tokens.push({
        type: "semicolon",
        value: ";",
      });
      current++;
      continue;
    }

    if (char === tokenMatch.doubleQuote) {
      let value = "";

      char = input[++current];

      while (char !== tokenMatch.doubleQuote) {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: "doubleQuoteString", value });

      continue;
    }

    if (char === tokenMatch.singleQuote) {
      let value = "";

      char = input[++current];

      while (char !== tokenMatch.singleQuote) {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: "singleQuoteString", value });

      continue;
    }

    if (char === tokenMatch.backtick) {
      let value = "";

      char = input[++current];

      while (char !== tokenMatch.backtick) {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: "backtickString", value });

      continue;
    }

    if (tokenMatch.string.test(char)) {
      let value = "";

      while (tokenMatch.string.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "string", value });

      continue;
    }

    if (tokenMatch.unknown.test(char)) {
      let value = "";

      while (tokenMatch.unknown.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: "unknown", value });

      continue;
    }

    current++;
  }

  tokens.forEach((token) => {
    if (isExtraString(token)) {
      token.type = "string";
    } else if (isStringKeyword(token)) {
      token.type = "keyword";
    }
  });

  return tokens;
}

function isExtraString(token) {
  if (!token) return false;
  return (
    token.type === "doubleQuoteString" ||
    token.type === "singleQuoteString" ||
    token.type === "backtickString"
  );
}

function isStringKeyword(token){
  if (!token) return false;
  const value = token.value.toUpperCase();
  return token.type === "string" && tokenMatch.keywords.includes(value);
}

function isSemicolon(token) {
  if (!token) return false;
  return token.type === "semicolon";
}

function keywordEqual(token, value) {
  return (
    token.type === "keyword" &&
    token.value.toUpperCase() === value.toUpperCase()
  );
}

const newStatementKeywords = ["var", "let", "const", "class", "function", "for", "if", "return"];
function isNewStatement(token) {
  if (!token) return false;
  return newStatementKeywords.some(keyword => keywordEqual(token, keyword));
}

function parser(tokens) {
  let current = 0;

  const tokenStatements = [];

  while (current < tokens.length) {
    let token = tokens[current];

    if (isNewStatement(token)) {
      const statement = [];

      statement.push(token);
      token = tokens[++current];

      while (
        current < tokens.length &&
        !isSemicolon(token) &&
        !isNewStatement(token)
      ) {
        statement.push(token);
        token = tokens[++current];
      }

      tokenStatements.push(statement);
    }

    if (token && isNewStatement(token)) {
      continue;
    }

    current++;
  }

  return tokenStatements;
}

function test() {
  const javaScript = `
    const a = "1"
    var b = '1'
    let c = 1
  `;

  const tokens = tokenizer(javaScript);
  const statements = parser(tokens);

  console.log("tokens", tokens);
  console.log("statements", statements);
}

test();
```

## Reference

- [https://poiemaweb.com/js-strict-mode](https://poiemaweb.com/js-strict-mode)
- [https://github.com/jamiebuilds/the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)