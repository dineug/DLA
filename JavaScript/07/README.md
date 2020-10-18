# 7장

## 함수 표현식

- 함수 선언
- 함수 표현식
  - 값처럼 쓰이는 함수

```js
// Before
sayHi();
sayHi2();

function sayHi() {
  console.log("Hi");
}
var sayHi2 = function () {
  console.log("Hi2");
};

// After
function sayHi() {
  console.log("Hi");
}
var sayHi2;

sayHi();
sayHi2(); // TypeError: sayHi2 is not a function

sayHi2 = function () {
  console.log("Hi2");
};
```

## 재귀

`재귀 함수`는 함수가 자기 자신을 호출하는 형태

Bad

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  }
  return num * factorial(num - 1); // TypeError: factorial is not a function
}

var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4));
```

Good

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  }
  return num * arguments.callee(num - 1);
}

var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4));
```

`arguments.callee`는 현재 실행 중인 함수를 가리키는 포인터

> 스트릭트 모드에서는 `arguments.callee`의 값에 접근할 수 없으며 그렇게 하려하면 에러가 발생합니다.  
> `이름 붙은 함수 표현식`

```js
var factorial = function factorial2(num) {
  if (num <= 1) {
    return 1;
  }
  return num * factorial2(num - 1);
};

var anotherFactorial = factorial;
factorial = null;
console.log(anotherFactorial(4));
```

![js-factorial](https://github.com/dineug/DLA/blob/master/JavaScript/07/js-01.png?raw=true)

## 클로저 (Closure)

- Execution context(실행 컨텍스트)
  - Variable object(변수 객체) - Activation object(활성 객체)
    - 변수
    - 매개변수(parameter)와 인수 정보(arguments)
    - 함수 선언(함수 표현식은 제외)
  - Scope chain(스코프 체인) - Scopes
    - 전역 객체(Global Object) 또는 활성 객체(Activation object)의 리스트
  - thisValue(Context object)
    - 함수 호출 방식에 의해 this에 바인딩할 어떤 객체가 동적으로 결정

```js
function createAdd(a) {
  return function (b) {
    return a + b;
  };
}

var add5 = createAdd(5);
add5(10);
```

1. ![js-closure1](https://github.com/dineug/DLA/blob/master/JavaScript/07/js-02.png?raw=true)
1. ![js-closure2](https://github.com/dineug/DLA/blob/master/JavaScript/07/js-03.png?raw=true)
1. ![js-closure3](https://github.com/dineug/DLA/blob/master/JavaScript/07/js-04.png?raw=true)
1. ![js-closure4](https://github.com/dineug/DLA/blob/master/JavaScript/07/js-05.png?raw=true)

## hooks

```js
function useState(initVal) {
  let _val = initVal;
  const state = () => _val;
  const setState = (newVal) => {
    _val = newVal;
  };

  return [state, setState];
}

const [count, setCount] = useState(1);
console.log(count()); // 1

setCount(2);
console.log(count()); // 2
```

```js
const React = (function () {
  let _val;

  function useState(initVal) {
    const state = _val || initVal;
    const setState = (newVal) => {
      _val = newVal;
    };

    return [state, setState];
  }

  function render(Component) {
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);

  return {
    render: () => console.log(count),
    click: () => setCount(count + 1),
  };
}

var App = React.render(Component);
App.click();
var App = React.render(Component);
App.click();
var App = React.render(Component);
App.click();
```

```js
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initVal) {
    const state = hooks[idx] || initVal;
    const setState = (newVal) => {
      hooks[idx] = newVal;
    };
    idx++;
    return [state, setState];
  }

  function render(Component) {
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component);
App.click();
var App = React.render(Component);
App.type("pear");
var App = React.render(Component);
```

```js
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initVal) {
    const state = hooks[idx] || initVal;
    const setState = (newVal) => {
      hooks[idx] = newVal;
    };
    idx++;
    return [state, setState];
  }

  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component);
App.click();
var App = React.render(Component);
App.type("pear");
var App = React.render(Component);
```

```js
const React = (function () {
  let hooks = [];
  let idx = 0;

  function useState(initVal) {
    const _idx = idx;
    const state = hooks[idx] || initVal;
    const setState = (newVal) => {
      hooks[_idx] = newVal;
    };
    idx++;
    return [state, setState];
  }

  function render(Component) {
    idx = 0;
    const C = Component();
    C.render();
    return C;
  }

  return { useState, render };
})();

function Component() {
  const [count, setCount] = React.useState(1);
  const [text, setText] = React.useState("apple");

  return {
    render: () => console.log({ count, text }),
    click: () => setCount(count + 1),
    type: (word) => setText(word),
  };
}

var App = React.render(Component);
App.click();
var App = React.render(Component);
App.type("pear");
var App = React.render(Component);
```

## Reference

- [https://javascript.info/closure](https://javascript.info/closure)
- [https://medium.com/@pravngaur/javascript-underpinnings-execution-context-stack-event-loop-task-queue-runtime-193011c96f97](https://medium.com/@pravngaur/javascript-underpinnings-execution-context-stack-event-loop-task-queue-runtime-193011c96f97)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)
- [https://blog.naver.com/jjoommnn/130149113595](https://blog.naver.com/jjoommnn/130149113595)
- [https://poiemaweb.com/js-execution-context](https://poiemaweb.com/js-execution-context)
- [https://poiemaweb.com/js-this](https://poiemaweb.com/js-this)
- [https://medium.com/humanscape-tech/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80%EB%A1%9C-hooks%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-3ba74e11fda7](https://medium.com/humanscape-tech/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80%EB%A1%9C-hooks%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-3ba74e11fda7)
