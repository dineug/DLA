# 22장

## 안전한 타입 탐지

> instanceof의 문제는 이 연산자는 실행 컨텍스트가 하나뿐이라고 가정한다는 점입니다.  
> 웹 페이지에 프레임이 여러 개 있다면 전역 실행 컨텍스트가 두 개 있는 것이고  
> 따라서 Array 생성자도 두 개 있는 것입니다.  
> ES5에서는 이 문제를 우회하기 위해 Array.isArray() 메서드를 제공합니다.

객체가 네이티브 객체인지 개발자가 정의한 객체인지 알기 어려울때 ex) JSON

Object의 네이티브 toString() 메서드는 어떤 값에서도 호출할 수 있으며 `[object NativeConstructorName]`형식의 문자열을 반환합니다.

```js
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(function () {}));
console.log(Object.prototype.toString.call(/[^0-9]/));
console.log(Object.prototype.toString.call(JSON));

function isArray(value) {
  return Object.prototype.toString.call(value) == "[object Array]";
}

function JSON() {}
const json = new JSON();
console.log(Object.prototype.toString.call(JSON));
console.log(Object.prototype.toString.call(json));
```

## 스코프 확인 생성자 (scope-safe constructor)

Bad

```js
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}

console.log(new Person("1", 2, "3"));
console.log(Person("1", 2, "3"), name, age, job);
```

Good

```js
function Person(name, age, job) {
  if (this instanceof Person) {
    this.name = name;
    this.age = age;
    this.job = job;
  } else {
    return new Person(name, age, job);
  }
}

console.log(Person("1", 2, "3"), typeof age, typeof job);
```

Bad

```js
function Polygon(sides) {
  if (this instanceof Polygon) {
    this.sides = sides;
    this.getArea = function () {
      return 0;
    };
  } else {
    return new Polygon(sides);
  }
}

function Rectangle(width, height) {
  Polygon.call(this, 2);
  this.width = width;
  this.height = height;
  this.getArea = function () {
    return this.width * this.height;
  };
}

const rect = new Rectangle(5, 10);
console.log(rect.sides);
```

Good

```js
function Polygon(sides) {
  if (this instanceof Polygon) {
    this.sides = sides;
    this.getArea = function () {
      return 0;
    };
  } else {
    return new Polygon(sides);
  }
}

function Rectangle(width, height) {
  Polygon.call(this, 2);
  this.width = width;
  this.height = height;
  this.getArea = function () {
    return this.width * this.height;
  };
}

Rectangle.prototype = new Polygon();

const rect = new Rectangle(5, 10);
console.log(rect.sides);
```

## 지연 로딩 함수

크로스브라우저 호환성 코드의 if문을 한번만 체크할때

- 자기 자신을 다른 함수로 덮어쓰기

```js
function createHTTP() {
  if (typeof fetch != "undefined") {
    createHTTP = function () {
      return fetch;
    };
  } else if (typeof XMLHttpRequest != "undefined") {
    createHTTP = function () {
      return new XMLHttpRequest();
    };
  } else {
    createHTTP = function () {
      throw new Error("No XHR object available.");
    };
  }

  return createHTTP();
}
```

- 적절한 함수를 선언하는 즉시 다른 함수를 할당

```js
var createHTTP = (function () {
  if (typeof fetch != "undefined") {
    createHTTP = function () {
      return fetch;
    };
  } else if (typeof XMLHttpRequest != "undefined") {
    createHTTP = function () {
      return new XMLHttpRequest();
    };
  } else {
    createHTTP = function () {
      throw new Error("No XHR object available.");
    };
  }
})();
```

## 함수 바인딩

this

```js
var handler = {
  message: "Event handled",
  handleClick: function (event) {
    console.log(this.message);
  },
};

var btn = document.createElement("button");
btn.addEventListener("click", handler.handleClick);
btn.click();
```

클로저

```js
var handler = {
  message: "Event handled",
  handleClick: function (event) {
    console.log(this.message);
  },
};

var btn = document.createElement("button");
btn.addEventListener("click", function () {
  handler.handleClick();
});
btn.click();
```

bind()

```js
function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  };
}

var handler = {
  message: "Event handled",
  handleClick: function (event) {
    console.log(event, this.message);
  },
};

var btn = document.createElement("button");
btn.addEventListener("click", bind(handler.handleClick, handler));
btn.click();
```

네이티브 bind()

```js
var handler = {
  message: "Event handled",
  handleClick: function (event) {
    console.log(event, this.message);
  },
};

var btn = document.createElement("button");
btn.addEventListener("click", handler.handleClick.bind(handler));
btn.click();
```

> 바인드된 함수는 함수를 여러 번 호출해야 하므로 메모리도 많이 사용하고 일반적인 함수에 비해 다소 느리므로 꼭 필요할 때만 쓰길 권장한다.

## 함수 커링

생성된 새 함수를 호출할 때 매개변수 일부가 미리 지정된다는 점입니다.

```js
function add(num1, num2) {
  return num1 + num2;
}
function curriedAdd(num2) {
  return add(5, num2);
}

console.log(add(2, 3));
console.log(curriedAdd(3));
```

커링 범용 함수

```js
// 첫번째 매개변수는 커링할 함수
function curry(fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments),
      finalArgs = args.concat(innerArgs);
    return fn.apply(null, finalArgs);
  };
}

function add(num1, num2) {
  return num1 + num2;
}

console.log(curry(add, 5)(3));
console.log(curry(add, 5, 12)());
```

```js
const curry = (f, ...bs) => (...as) => f(...bs, ...as);
const add = (...as) => as.reduce((acc, cur) => acc + cur);

console.log(curry(add, 10, 10, 10, 10)(10));
console.log(curry(add, 10, 10)(10, 10, 10, 10));
console.log(curry(add)(10, 10, 10));
```

```js
// event객체와 함께 다른 매개변수도 전달
function bind(fn, context) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments),
      finalArgs = args.concat(innerArgs);
    return fn.apply(context, finalArgs);
  };
}

var handler = {
  message: "Event handled",
  handleClick: function (name, event) {
    console.log(event, this.message, name);
  },
};

var btn = document.createElement("button");
btn.addEventListener("click", bind(handler.handleClick, handler, "my-btn"));
btn.click();
```

## Reference
