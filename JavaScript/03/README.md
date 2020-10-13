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

Error

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

## 키워드와 예약어

키워드는 제어문의 시작과 끝을 나타낸다거나 특정한 조작 목적으로 쓰입니다.  
예약어는 아직은 특별한 쓰임새가 없지만 미래에 키워드로 쓸 가능성이 있으므로 예약해 둔 것입니다.

스트릭트 모드에서는 다음 예약어가 추가됩니다.  
> implements package public interface private static let protected yield

예약어는 식별자로 쓸 수 없지만  
스트릭트 모드에서만 추가되는 예약어는 사용이 가능합니다.  

Good

```js
(function () {
  "use strict";
  var let = 1; // Unexpected strict mode reserved word
})();
```

Bad

```js
var let = 1; // let은 예약어지만 스트릭트 모드에서만 추가되서 가능합니다.
```

## 데이터 타입

ECMAScript에는 다섯 가지 기본적인 데이터 타입이 있습니다.  
이를 원시(primitive) 데이터 타입이라 부르기도 합니다.  
원시 타입으로는
- Undefined
- Null
- Boolean
- Number
- String

객체는 이름-값 쌍의 순서 없는 목록입니다.  

## typeof 연산자

| type | Describe |
|---|---|
| undefined | 정의되지 않은 변수 |
| boolean | 불리언 |
| string | 문자열 |
| number | 숫자 |
| object | 함수를 제외한 객체 또는 null |
| function | 함수 |
| bigint | 정밀한 큰 정수 |

```js
var message = "some string";
console.log(typeof message) // string
console.log(typeof(message)) // string
console.log(typeof 95) // number
```

> 기술적으로 말해 ECMAScript의 함수는 객체로 간주됩니다.  
> 함수에는 다른 객체에 없는 특별한 프로퍼티가 존재하므로 typeof 연산자가 함수를  
> 다른 객체와 구별해 반환하는 것이 합리적입니다.

## undefined 타입

javascript에서 undefined로 값이 없음을 나타내는 특별한 값입니다.  
명시적으로 개발자가 값이 없음을 표현할때는 null을 사용합니다.

```js
const message; // 초기화를 하지않으면 기본값은 undefined 입니다.
console.log(typeof message); // undefined
console.log(typeof age); // undefined
```

## Null 타입

null은 빈 객체를 가리키는 포인터이므로 null에 typeof를 호출하면 object를 반환합니다.

```js
const car = null;
console.log(typeof car); // object
```

두 값을 비교할때 암묵적 형변환에서는 동일한 것으로 간주합니다.

```js
console.log(null == undefined); // true
```

## 불리언 타입

if문 같은 제어문에서 자동 형변환되기 때문에 각 타입별 true, false 인지 해야됩니다.

| 데이터 타입 | true | false |
|---|---|---|
| 문자열 | 비어 있는 않 문자열 모두 | "" |
| 숫자 | 0이 아닌 모든 숫자, 무한대 포함 | 0, NaN |
| 객체 | 모든 객체 | null |
| Undefined | 해당 없음 | undefined |

```js
Array.length && console.log('foo');
```

## 숫자 타입

다양한 숫자 리터럴 형식을 통해 여러 가지 숫자 타입을 나타냅니다.

- 10진법 10
- 8진법 010
- 16진법 0x10
- 부동소수점 0.1
- 지수표기법 1e+21
- bigint 10n

스트릭트 모드에서는 8진법 리터럴을 허용하지 않으며 문법 에러를 반환합니다.
> 부동소주점 숫자를 저장할 때는 정수를 저장할 때에 비해 메모리를 두 배로 소모합니다.

부동소수점 숫자는 소수점 아래 17자리까지 정확하기는 하지만 사칙 연산에 있어서는  
전체 숫자보다 훨씬 부정확합니다.

```js
0.1 + 0.2 // 0.30000000000000004
0.1 + 0.2 == 0.3 // false
```

> IEEE-754에서 정의한 방식대로 부동소수점 숫자를 계산하는 언어에는 모두 나타나는 문제입니다.

숫자 범위

일반적인 숫자타입은 메모리 제한 때문에 표현할 수 있는 범위가 정해져있습니다.  
범위를 벗어나면 Infinity, -Infinity를 반환합니다.

```js
console.log(Number.MAX_VALUE, Number.MIN_VALUE);
const value = Number.MAX_VALUE + Number.MAX_VALUE;
console.log(value);
console.log(isFinite(value));
```

NaN(Not a Number)

이 값은 숫자를 반환할 것으로 의도한 조작이 실패했을 때 반환합니다.  

```js
console.log(NaN == NaN); // false
// NaN 끼리 비교로 알 수 없기때문에 isNaN 함수를 따로 제공합니다.
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false
console.log(isNaN("10")); // false
console.log(isNaN("blue")); // true
console.log(isNaN(true)); // false
```

## 문자열

```js
const a = 'single quote';
const b = "double quote";
const c = `backtick
          ${a} ${b}`;

// tagged templates
function myTag(strings, ...args) {
  console.log(strings, ...args);
  return strings.join(" ");
}
const d = 'template';
console.log(myTag`hello \n ${d} literals! ${a} ${b} ${c}`);
```

ECMAScript에서 문자열은 불변(immutable)입니다.

```js
let lang = "J";
lang = lang + "ava" + "Script";

// J
// ava
// Script
// Java
// JavaScript
```

## 객체 타입

ECMAScript의 Object 타입은 파생하는 모든 객체의 원형입니다.  
Object 타입의 프로퍼티와 메서드를 전부 상속합니다.

| Name | Describe |
| --- | --- |
| constructor | 해당 객체를 만드는데 쓰인 함수 |
| hasOwnProperty(propertyName) | 해당 프로퍼티가 객체 인스턴스에 고유하며 타입에서 상속하지 않았음을 확인 |
| isPrototypeOf(object) | 해당 객체가 다른 객체의 프로토타입인지 확인 |
| propertyIsEnumerable(propertyName) | 해당 프로퍼티를 for-in 문에서 나열할 수 있는지 확인 |
| toLocaleString() | 객체를 지역에 맞게 표현한 문자열을 반환 |
| toString() | 객체를 문자열로 변환해 반환 |
| valueOf() | 객체를 나타내는 문자열이나 숫자 불리언을 반환 |

## 불리언 연산자

### 논리 NOT

NOT 연산자를 연달아 두 개 쓰면 Boolean() 함수를 쓴 것과 마찬가지 효과가 있습니다.

```js
console.log(!!"blue"); // true
console.log(!!0); // false
console.log(!!NaN); // false
console.log(!!""); // false
console.log(!!12345); // true
```

### 논리 AND

단축 연산을 실행하며 첫번째 피연산자가 false로 평가되면  
두번째 피연산자는 평가하지 않습니다.

```js
const a = false && '123'; // false
const b = true && '123';  // '123'
```

### 논리 OR

단축 연산을 실행하며 첫번째 피연산자가 true로 평가되면  
두번째 피연산자는 평가하지 않습니다.

```js
const port = false || '3000'; // '3000'
const port2 = true || '3000'; // true
```

## 곱셈 관련 연산자

```js
const row = 4;
const col = 10;
const arr = [];
for (let i = 0; i < row; i++) {
  if (!Array.isArray(arr[i])) {
    arr[i] = [];
  }

  for (let j = 0; j < col; j++) {
    arr[i][j] = i+j;
  }
}

console.log(arr);

const arr2 = [];
for(let k = 0; k < row * col; k++) {
  const i = Math.floor(k / col);
  const j = k % col;

  if (!Array.isArray(arr2[i])) {
    arr2[i] = [];
  }

  arr2[i][j] = k;
}

console.log(arr2);
```

## 동일 연산자

```js
console.log("55" == 55); // true
console.log("55" === 55); // false
console.log("55" != 55); // false
console.log("55" !== 55); // true
```

## 3항 연산자

```js
typeof a === 'object'
  ? 'object'
  : typeof a === 'undefined'
  ? 'undefined'
  : '?';
```

## 제어문

```js
const obj = { a:0, b:1, c:2 };
for (const name in obj) { // 객체 프로퍼티에 순서가 없음
  console.log(name);
}
Object.keys(obj).forEach(name => console.log(name));

for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

const obj2 = [0, 1, 2];
for (const value of obj2) {
  console.log(value);
}

function* counter(max) {
  let index = 0;
  while (index < max) {
    yield index++;
  }
}

for (const value of counter(20)) {
  console.log(value);
}

const a = [];
typeof a[Symbol.iterator];

const b = { a:0, b:1, c:2, d:3 };
typeof b[Symbol.iterator];

b[Symbol.iterator] = function* () {
  for (const name in this) {
    yield b[name];
  }
}

for (const value of b) {
  console.log(value);
}

function* flat(iter) {
    for (const v of iter) {
        if (v && v[Symbol.iterator]) yield* flat(v);
        else yield v;
    }
}
const deepArray = [1, [2, 3, [4, 5, 6, [7, 8 ,9, 10]], [11, 12, 13], [[[[[[100]]]]]]]];
for (const v of flat(deepArray)) console.log(v);
```

## Task

```js
queueMicrotask(() => {
  console.log('queueMicrotask 토끼1');
});
setTimeout(() => {
  console.log('setTimeout 거북이');
}, 0);
requestAnimationFrame(() => {
  console.log('requestAnimationFrame');
});
queueMicrotask(() => {
  console.log('queueMicrotask 토끼2');
});
queueMicrotask(() => {
  console.log('queueMicrotask 토끼3');
  queueMicrotask(() => {
    console.log('queueMicrotask 토끼4');
    queueMicrotask(() => {
      console.log('queueMicrotask 토끼5');
      queueMicrotask(() => {
        console.log('queueMicrotask 토끼6');
        queueMicrotask(() => {
          console.log('queueMicrotask 토끼7');
        });
      });
    });
  });
});

Promise.resolve().then(() => {
  console.log('Promise 친척 토끼1');
});
Promise.resolve().then(() => {
  console.log('Promise 친척 토끼2');
});
Promise.resolve().then(() => {
  console.log('Promise 친척 토끼3');
  Promise.resolve().then(() => {
    console.log('Promise 친척 토끼4');
    Promise.resolve().then(() => {
      console.log('Promise 친척 토끼5');
      Promise.resolve().then(() => {
        console.log('Promise 친척 토끼6');
        Promise.resolve().then(() => {
          console.log('Promise 친척 토끼7');
        });
      });
    });
  });
});
```

## observable

```js
const rawToTask = new WeakMap();
const rawToObservers = new WeakMap();
const rawToProxy = new WeakMap();
const proxyToRaw = new WeakMap();
let currentObserver = null;

function observer(fn) {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

function setObserver(raw, p) {
  if (isFunction(currentObserver)) {
    const observers = rawToObservers.get(raw);
    if (observers) {
      if (!observers.includes(currentObserver)) {
        observers.push(currentObserver);
      }
    } else {
      rawToObservers.set(raw, [currentObserver]);
    }
  }
}

function observable(raw) {
  const proxy = new Proxy(raw, {
    get(target, p) {
      setObserver(raw, p);
      if (isObject(target[p]) && !proxyToRaw.has(target[p])) {
        if (rawToProxy.has(target[p])) {
          return rawToProxy.get(target[p]);
        }
        return observable(target[p]);
      }
      return target[p];
    },
    set(target, p, value) {
      target[p] = value;
      if (Array.isArray(target)) {
        if (p === "length") {
          effect(target, p);
        }
      } else {
        effect(target, p);
      }
      return true;
    }
  });
  rawToProxy.set(raw, proxy);
  proxyToRaw.set(proxy, raw);
  return proxy;
}

function effect(target, p) {
  const observers = rawToObservers.get(target);
  if (observers) {
    // Promise.resolve().then(() => observers.forEach(observer => observer()));
    Promise.resolve()
      .then(() => {
        const isTask = !rawToTask.has(target);
        if (isTask) {
          rawToTask.set(target, observers);
        }
        return isTask;
      })
      .then((isTask) => {
        if (isTask) {
          rawToTask.get(target).forEach(observer => observer());
        }
      })
      .finally(() => rawToTask.delete(target));
  }
}

function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

function isFunction(fn) {
  return typeof fn === "function";
}


function start() {
  const data = observable({a: 1, b: 2});
  observer(() => {
    console.log(data.a, data.b);
  });

  data.a = '123';
  data.b = '456';
}

start();
```

## Reference

- [https://poiemaweb.com/js-strict-mode](https://poiemaweb.com/js-strict-mode)
- [https://github.com/jamiebuilds/the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)
- [Template_literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)
- [htm](https://github.com/developit/htm)
- [lit-html](https://github.com/Polymer/lit-html)
- [Iteration_protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)
- [queueMicrotask](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/queueMicrotask)