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

```js
function add(a, b) {
  return a + b;
}
const add10 = add.bind(null, 10);
console.log(add10(5));
```

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

```js
const bind = (f, ctx, ...bs) => (...as) => f.apply(ctx, [...bs, ...as]);

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

## 쉽게 조작할 수 없는 객체 (ES5)

> 무엇이든 공유하는 속성  
> 컨텍스트가 같다면 객체를 수정하지 못하게 막을 방법이 없습니다.  
> 객체를 쉽게 조작할 수 없는 객체로 바꾸고 나면 이를 취소할 수 없습니다.

### 확장 불가능한 객체

```js
var person = { name: "Nicholas" };
person.age = 29;
console.log(person);
console.log(`isExtensible: ${Object.isExtensible(person)}`);

var person = { name: "Nicholas" };
Object.preventExtensions(person);

person.age = 29;
console.log(person);
delete person.name;
console.log("delete person.name", person);
console.log(`isExtensible: ${Object.isExtensible(person)}`);
console.log(Object.getOwnPropertyDescriptor(person, "name"));
```

### 봉인된 객체

```js
var person = { name: "Nicholas" };
Object.seal(person);

person.age = 29;
delete person.name;
console.log(person);
console.log(`isSealed: ${Object.isSealed(person)}`);
console.log(`isExtensible: ${Object.isExtensible(person)}`);
console.log(Object.getOwnPropertyDescriptor(person, "name"));
```

### 동결된 객체

```js
var person = { name: "Nicholas" };
Object.freeze(person);

person.age = 29;
delete person.name;
person.name = "123";
console.log(person);
console.log(`isSealed: ${Object.isSealed(person)}`);
console.log(`isExtensible: ${Object.isExtensible(person)}`);
console.log(`isFrozen: ${Object.isFrozen(person)}`);
console.log(Object.getOwnPropertyDescriptor(person, "name"));
```

## 고급 타이머

> setTimeout(), setInterval() 정해진 시간이 지난 후에 큐에 추가 되기때문에 앞에 큐가 자바스크립트 프로세스를 오랜시간 독점하고 있을 수 있기때문에 실행시간을 보장하지 못합니다.  
> 타이머는 큐에 추가될 시점을 지정한다.

### 타이머 반복

> setInterval()  
> 타이머 코드의 실행이 끝나기도 전에 큐에 코드를 다시 추가할 가능성이 있다.  
> 이렇게 되면 타이머 코드가 갭 없이 계속 예약되어서 사용자 인터페이스도 멈춥니다.  
> 자바스크립트 엔진은 이런 문제를 예방하도록 설계되어 있습니다.

```js
performance.clearMarks();
performance.clearMeasures();
const markerStart = "start";
const markerEnd = "end";

function createArr() {
  const l = 10000000;
  const list = [];
  for (let i = 0; i < l; i++) {
    list.push(i);
  }
}

performance.mark(markerStart);
createArr();
performance.mark(markerEnd);
performance.measure("measure start to end", markerStart, markerEnd);
console.log(performance.getEntriesByType("measure"));
```

```js
performance.clearMarks();
performance.clearMeasures();
const markerStart = "start";
const markerEnd = "end";
const markerStartQueue = "queue-start";
const markerEndQueue = "queue-end";

let i = 0;
let timeId = null;

function createArr() {
  const l = 10000000;
  const list = [];
  for (let i = 0; i < l; i++) {
    list.push(i);
  }
}

function start() {
  const markerStartCount = `${i}-${markerStart}`;
  const markerEndCount = `${i}-${markerEnd}`;
  performance.mark(markerStartCount);
  createArr();
  performance.mark(markerEndCount);
  performance.measure("measure start to end", markerStartCount, markerEndCount);
  i++;
  if (i >= 10) {
    clearInterval(timeId);
    performance.mark(markerEndQueue);
    performance.measure(
      "measure queue start to end",
      markerStartQueue,
      markerEndQueue
    );
    console.log(performance.getEntriesByType("measure"));
  }
}

performance.mark(markerStartQueue);
timeId = setInterval(start, 50);
```

```js
performance.clearMarks();
performance.clearMeasures();
const markerStart = "start";
const markerEnd = "end";
const markerStartQueue = "queue-start";
const markerEndQueue = "queue-end";

let i = 0;

function createArr() {
  const l = 10000000;
  const list = [];
  for (let i = 0; i < l; i++) {
    list.push(i);
  }
}

function start() {
  const markerStartCount = `${i}-${markerStart}`;
  const markerEndCount = `${i}-${markerEnd}`;
  performance.mark(markerStartCount);
  createArr();
  performance.mark(markerEndCount);
  performance.measure("measure start to end", markerStartCount, markerEndCount);
  i++;
  if (i >= 10) {
    performance.mark(markerEndQueue);
    performance.measure(
      "measure queue start to end",
      markerStartQueue,
      markerEndQueue
    );
    console.log(performance.getEntriesByType("measure"));
  } else {
    setTimeout(start, 50);
  }
}

performance.mark(markerStartQueue);
setTimeout(start, 50);
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
    <style>
      #myDiv {
        width: 200px;
        height: 200px;
        position: fixed;
        top: 100px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div id="myDiv" style="left: 0"></div>
    <script>
      var div = document.getElementById("myDiv");
      var interval = 10;
      setTimeout(function f() {
        var left = parseInt(div.style.left) + 5;

        div.style.left = `${left}px`;
        if (left < 200) {
          setTimeout(f, interval);
        }
      }, 0);
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
    <style>
      #myDiv {
        width: 200px;
        height: 200px;
        position: fixed;
        top: 100px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div id="myDiv" style="left: 0"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.2/tween.umd.min.js"></script>
    <script>
      var div = document.getElementById("myDiv");

      function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);

      const coords = { left: 0 };
      const tween = new TWEEN.Tween(coords)
        .to({ left: 200 }, 1500)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          div.style.left = `${coords.left}px`;
        })
        .start();
    </script>
  </body>
</html>
```

```js
setInterval(() => {
  console.log("frame");
}, 1000);
setInterval(() => {
  console.log("setInterval");
}, 0);
```

```js
setInterval(() => {
  console.log("frame");
}, 1000);
function animate() {
  console.log("requestAnimationFrame");
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

flip

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>
    <style>
      #draggable {
        width: 200px;
        height: 20px;
        text-align: center;
        background: white;
      }

      .dropzone {
        width: 200px;
        height: 20px;
        background: blueviolet;
        margin-bottom: 10px;
        padding: 10px;
      }

      .dropzone-move {
        transition: transform 0.3s;
      }
    </style>
  </head>
  <body>
    <div class="dropzone">
      <div
        id="draggable"
        draggable="true"
        ondragstart="event.dataTransfer.setData('text/plain',null)"
      >
        This div is draggable
      </div>
    </div>
    <div class="dropzone"></div>
    <div class="dropzone"></div>
    <div class="dropzone"></div>

    <script>
      const flipAnimation = (selector, animationName) => {
        const flipSnapshots = [];
        document.querySelectorAll(selector).forEach((el) => {
          // first
          const { top, left } = el.getBoundingClientRect();
          flipSnapshots.push({ el, top, left });
        });
        return () => {
          flipSnapshots.forEach((snapshot) => {
            // last
            const el = snapshot.el;
            const { top, left } = el.getBoundingClientRect();
            const dx = snapshot.left - left;
            const dy = snapshot.top - top;
            if (dx || dy) {
              // invert
              el.style.transform = `translate(${dx}px,${dy}px)`;
              el.style.transitionDuration = "0s";
              // play
              requestAnimationFrame(() => {
                el.classList.add(animationName);
                el.style.transform = "";
                el.style.transitionDuration = "";
                const onTransitionend = () => {
                  el.classList.remove(animationName);
                  el.removeEventListener("transitionend", onTransitionend);
                };
                el.addEventListener("transitionend", onTransitionend);
              });
            }
          });
        };
      };

      var dragged;
      var play = null;

      document.addEventListener("drag", function (event) {}, false);

      document.addEventListener(
        "dragstart",
        function (event) {
          dragged = event.target;
          event.target.style.opacity = 0.5;
          play = flipAnimation("#draggable", "dropzone-move");
        },
        false
      );

      document.addEventListener(
        "dragend",
        function (event) {
          event.target.style.opacity = "";
          play = null;
        },
        false
      );

      document.addEventListener(
        "dragover",
        function (event) {
          event.preventDefault();
        },
        false
      );

      document.addEventListener(
        "dragenter",
        function (event) {
          if (event.target.className == "dropzone") {
            event.target.style.background = "purple";
          }
        },
        false
      );

      document.addEventListener(
        "dragleave",
        function (event) {
          if (event.target.className == "dropzone") {
            event.target.style.background = "";
          }
        },
        false
      );

      document.addEventListener(
        "drop",
        function (event) {
          event.preventDefault();
          if (event.target.className == "dropzone") {
            event.target.style.background = "";
            event.target.appendChild(dragged);
            if (play) {
              play();
            }
          }
        },
        false
      );
    </script>
  </body>
</html>
```

## 함수 감속

```js
// 감속
function throttle(f, time) {
  if (!f.__throttleTimerId) {
    f.__throttleTimerId = setTimeout(() => {
      f.__throttleTimerId = null;
      f();
    }, time);
  }
}

// 마지막
function debounce(f, time) {
  clearTimeout(f.__debounceTimerId);
  f.__debounceTimerId = setTimeout(() => {
    f();
  }, time);
}

function resize() {
  console.log("throttle");
}
function resize2() {
  console.log("debounce");
}

window.addEventListener("resize", () => {
  throttle(resize, 1000);
  debounce(resize2, 1000);
});
```

## Reference

- [https://github.com/immutable-js/immutable-js](https://github.com/immutable-js/immutable-js)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
- [https://www.typescriptlang.org/docs/handbook/decorators.html](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [https://developer.mozilla.org/ko/docs/Web/API/Document/drag_event](https://developer.mozilla.org/ko/docs/Web/API/Document/drag_event)
- [https://github.com/tweenjs/tween.js](https://github.com/tweenjs/tween.js)
- [https://developer.mozilla.org/en-US/docs/Web/API/Performance/now](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
- [https://kr.vuejs.org/v2/guide/transitions.html](https://kr.vuejs.org/v2/guide/transitions.html)
- [flip](https://aerotwist.com/blog/flip-your-animations/)
- [lerp](https://codepen.io/rachsmith/post/animation-tip-lerp)
