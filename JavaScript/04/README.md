# 4장

## 원시 값과 참조 값

- 원시 값 - 단순한 데이터 (undefined, null, Boolean, Number, String)
  > 변수에 저장된 실제 값을 조작: 값으로 접근한다 (Call-by-value)
- 참조 값 - 여러 값으로 구성되는 객체
  > 해당 겍체에 대한 참조를 조작: 참조로 접근한다 (Call-by-reference)

```js
const a = 24; // 원시 값
const b = []; // 참조 값
```

![js-memory](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-01.png?raw=true)

## 동적 프로퍼티

참조 값을 다룰 때는 언제든 프로퍼티와 메서드를 추가하거나 바꾸고 삭제 할 수 있습니다.

```js
const person = new Object();
person.name = "Nicholas";
console.log(person.name); // Nicholas

const name = "Nicholas";
name.age = 27;
console.log(name.age); // undefined
```

> 동적으로 프로퍼티를 추가할 수 있는 값은 참조 값 뿐입니다.

## 값 복사

원시 값과 참조 값은 저장되는 방식 외에도 변수에서 다른 변수로 값을 복사할 때도 다르게 동작합니다.

```js
const num1 = 5;
const num2 = num1; // 아무 부작용 없이 두 변수를 사용할 수 있습니다.
```

![js-deep-copy](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-02.png?raw=true)

참조 값을 변수에서 다른 변수로 복사하면 원래 변수에 들어있던 값이 다른 변수에 복사되기는 마찬가지입니다.  
차이는 그 값이 객체 자체가 아니라 힙에 저장된 객체를 가리키는 포인터라는 점입니다.

```js
const obj1 = new Object();
const obj2 = obj1; // shallow copy
obj1.name = "Nicholas";
console.log(obj2.name); // "Nicholas"

// const obj3 = JSON.parse(JSON.stringify(obj1)); // deep copy
```

![js-shallow-copy](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-03.png?raw=true)

## 호이스팅

```js
// Before
a();
function a() {
  console.log(b);
}
var b = 10;

// After
function a() {
  console.log(b);
}
var b;
a();
b = 10;
```

> const, let 은 호이스팅 되지않습니다.

## 매개변수 전달

- ECMAScript의 함수 매개변수는 모두 값으로 전달됩니다.
- 함수 외부에 있는 값은 함수 내부의 매개변수에 복사
- 매개변수는 값 형태로 넘기면 해당 값은 지역 변수에 복사

```js
// https://ui.dev/javascript-visualizer/
// 1:Global
function addTen(num) {
  num += 10; // 4:var
  return num; // 5:return
}

var count = 20; // 2:var
var result = addTen(count); // 3:fn.call, 6:var
console.log(count, result);
```

1. ![js-memory-step1](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-04.png?raw=true)
2. ![js-memory-step2](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-05.png?raw=true)
3. ![js-memory-step3](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-06.png?raw=true)
4. ![js-memory-step4](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-07.png?raw=true)
5. ![js-memory-step5](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-08.png?raw=true)
6. ![js-memory-step6](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-09.png?raw=true)

```js
// https://ui.dev/javascript-visualizer/
// 1:Global
function setName(obj) {
  obj.name = "Nicholas"; // 4:var
  // 5:return
}

var person = new Object(); // 2:var
setName(person); // 3:fn.cell
console.log(person.name); // "Nicholas"
```

1. ![js-memory2-step1](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-10.png?raw=true)
2. ![js-memory2-step2](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-11.png?raw=true)
3. ![js-memory2-step3](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-12.png?raw=true)
4. ![js-memory2-step4](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-13.png?raw=true)
5. ![js-memory2-step5](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-14.png?raw=true)
6. ![js-memory2-step6](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-15.png?raw=true)

## v8 메모리 사용

```js
// https://speakerdeck.com/deepu105/v8-memory-usage-stack-and-heap
// https://ui.dev/javascript-visualizer/
function Employee(name, salary, sales) {
  this.name = name;
  this.salary = salary;
  this.sales = sales;
}

var BONUS_PERCENTAGE = 10;

function getBonusPercentage(salary) {
  var percentage = (salary * BONUS_PERCENTAGE) / 100;
  return percentage;
}

function findEmployeeBonus(salary, noOfSales) {
  var bonusPercentage = getBonusPercentage(salary);
  var bonus = bonusPercentage * noOfSales;
  return bonus;
}

var john = new Employee("John", 5000, 5);
john.bonus = findEmployeeBonus(john.salary, john.sales);
console.log(john.bonus);
```

- 전역 스코프는 스택에서 "전역 프레임"에 보관된다.
- 모든 함수 호출은 프레임 블록으로 스택 메모리에 추가된다.
- 반환 값과 인자를 포함한 모든 지역 변수들은 스택에서 함수 프레임 블록 안에 저장된다.
- int와 string과 같은 모든 원시 타입 값은 스택에 바로 저장된다. 이는 전역 스코프에서도 적용되며, 자바스크립트에서 문자열은 원시 타입에 해당한다.
- Employee와 Function과 같은 객체 타입의 값은 힙에서 생성되고 스택 포인터를 사용해 힙에서 스택을 참조한다. 함수들은 자바스크립트에서 객체이다. 전역 스코프에도 적용된다.
- 현재 함수에서 호출된 함수들은 스택의 최상단에 추가된다.
- 함수 프레임이 반환(역자주: 함수가 종료)될 때 스택에서 제거된다.
- 주요 프로세스가 완료될 때 힙에 있는 객체들은 어떤 포인터도 가지고 있지 않고 혼자 남게 된다.
- 명시적으로 복사하지 않으면, 다른 객체 내의 모든 객체 참조들은 참조 포인터를 사용해 연결된다.

## 타입 판별

```js
person instanceof Object; // person 변수가 Object의 인스턴스인가?
colors instanceof Array; // colors 변수가 Array의 인스턴스인가?
pattern instanceof RegExp; // pattern 변수가 RegExp의 인스턴스인가?
```

- 모든 참조 값은 Object의 인스턴승인 것으로 정의되어 있으므로 참조 값은 항상 true를 반환
- 원시 값은 Object의 인스턴스가 아니므로 항상 false 반환

## 실행 컨텍스트와 스코프

### 컨텍스트

- 변수나 함수의 실행 컨텍스트는 다른 데이터에 접근할 수 있는지, 어떻게 행동하는지를 규정합니다.
- `각 실행 컨텍스트에는 변수 객체(variable object)가 연결되어 있으며 해당 컨텍스트에서 정의된 모든 변수와 함수는 이 객체에 존재합니다.`
- 이 객체를 코드에서 접근할 수는 없지만 이면에서 데이터를 다룰 때 이 객체를 이용합니다.
- 가장 바깥쪽에 존재하는 실행 컨텍스트는 전역 컨텍스트입니다.
- 실행 컨텍스트는 포함된 코드가 모두 실행될 때 파괴되는데, 이때 해당 컨텍스트 내부에서 정의된 변수와 함수도 함께 파괴됩니다.
- 전역 컨텍스트는 애플리케이션이 종료될 때, 예를 들어 웹페이지에서 나가거나 브라우저를 닫을 때까지 계속 유지됩니다.
- 함수를 호출하면 독자적인 실행 컨텍스트가 생성됩니다.
- 코드 실행이 함수로 들어갈 때마다 함수의 컨텍스트가 컨텍스트 스택에 쌓입니다.
- 함수 실행이 끝나면 해당 컨텍스트를 스택에서 꺼내고 컨트롤을 이전 컨텍스트에 반환합니다.

### 스코프 체인(scope chain)

- 컨텍스트에서 코드를 실행하면 변수 객체에 `스코프 체인`이 만들어집니다.
- `스코프 체인의 목적은 실행 컨텍스트가 접근할 수 있는 모든 변수와 함수에 순서를 정의하는 것입니다.`
- 스코프 체인의 앞쪽은 항상 코드가 실행되는 컨텍스트의 변수 객체입니다.
- 변수 객체의 다음 순서는 해당 컨텍스트를 포함하는 컨텍스트(부모 컨텍스트)이며 그 다음에는 다시 부모의 부모 컨텍스트입니다.
- 이런 식으로 계속 진행하여 전역 컨텍스트에 도달할 때까지 계속합니다.
- 전역 컨텍스트의 변수 객체는 항상 스코프 체인의 마지막에 존재합니다.
- `식별자를 찾을 때는 스코프 체인 순서를 따라가면서 해당 식별자 이름을 검색합니다.`

```js
let color = "blue";
function changeColor() {
  let anotherColor = "red";
  function swapColors() {
    const tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    // color, anotherColor, tempColor 모두 접근 가능
  }
  // color, anotherColor 접근 가능, tempColor는 불가능
  swapColors();
}
// color만 접근 가능
changeColor();
```

실행 컨텍스트가 세 개 있습니다.

- 전역 컨텍스트
- changeColor()의 로컬 컨텍스트
- swapColors()의 로컬 컨텍스트

![js-scope-chain](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-16.png?raw=true)

### var에는 블록 레벨 스코프가 없습니다

```js
if (true) {
  var color = "blue";
}
console.log(color); // "blue"

for (var i = 0; i < 10; i++) {
  // logic
}
console.log(i); // 10
```

### const, let은 블록 스코프가 존재합니다

```js
if (true) {
  const color = "blue";
}
console.log(color); // ReferenceError: color is not defined

for (let i = 0; i < 10; i++) {
  // logic
}
console.log(i); // ReferenceError: i is not defined
```

### 식별자 검색

```js
const color = "blue";
function getColor() {
  return color;
}

console.log(getColor()); // "blue"
```

![js-scope-chain2](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-17.png?raw=true)

```js
const color = "blue";
function getColor() {
  const color = "red";
  return color;
}

console.log(getColor()); // "red"
```

> 지역 변수를 참조할 때는 다음 변수 객체를 검색하지 않도록 자동으로 검색이 멈춤니다.  
> 식별자가 로컬 컨텍스트에 정의되어 있으면 부모 컨텍스트에 같은 이름의 식별자가 있다 해도 참조할 수 없습니다.

## 가비지 콜렉션

> 자바스크립트는 필요한 메모리를 할당하고 더 이상 사용하지 않는 메모리는 자동으로 회수  
> `더 이상 사용하지 않을 변수`를 찾아내서 해당 변수가 차지하고 있던 메모리를 회수

### 표시하고 지우기 (mark-and-sweep)

> 자바스크립트에서 가장 널리 쓰이는 가비지 컬렉션 방법입니다.  
> 2단계 가비지 콜렉션 알고리즘입니다.

1. Mark
   - GC 루트 목록을 생성합니다.
   - 자바스크립트의 경우 window객체가 루트로 작동하는데, 루트란 코드에서 참조되는 전역 변수를 뜻합니다.
   - 모든 루트들은 active 혹은 alive(가비지가 아님)로 표시되며, 이들의 자식들 또한 재귀적으로 동일하게 처리됩니다.
   - 즉, 루트에서 접근 가능하다면 가비지가 아니라고 판단됩니다.
1. Sweep
   - `active`로 표기되지 않은 메모리를 모두 가비지로 간주하여 반환 합니다.

![js-mark-and-sweep](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-19.gif?raw=true)

### 참조 카운팅 (reference counting)

- 변수를 선언하고 참조 값이 할당되면 참조 카운트는 1입니다.
- 다른 변수가 같은 값을 참조하면 참조 카운트가 늘어납니다.
- 해당 값을 참조하는 변수에 다른 값을 할당하면 원래 값의 참조 카운트가 줄어듭니다.
- 값의 참조 카운트가 0이 되면 해당 값에 접근할 방법이 없으며 메모리를 회수해도 안전합니다.
- 가비지 컬렉터를 실행할 때 참조 카운트가 0인 값에서 사용하던 메모리를 회수합니다.

#### 순환 참조 (cyclic/circular reference)

![js-circular-reference](https://github.com/dineug/DLA/blob/master/JavaScript/04/js-18.png?raw=true)

```js
function problem() {
  const objectA = new Object();
  const objectB = new Object();
  objectA.someOtherObject = objectB;
  objectB.anotherObject = objectA;
}
```

> objectA와 objectB는 프로퍼티를 통해 서로를 참조하므로 각각의 참조 카운트는 2입니다.  
> 표시하고 지우는 방식에서는 함수 실행이 끝날 때 두 변수가 모두 스코프를 벗어나므로 아무 문제도 없습니다.  
> 참조 카운팅 방식에서는 함수 실행이 끝난 뒤에도 objectA와 objectB의 참조 카운트가 0이 되지않으므로 두 변수는 계속 존재합니다.

## Reference

- [https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239](https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239)
- [https://blog.bitsrc.io/master-javascript-call-by-sharing-parameter-passing-7049d65163ed](https://blog.bitsrc.io/master-javascript-call-by-sharing-parameter-passing-7049d65163ed)
- [https://ui.dev/javascript-visualizer/](https://ui.dev/javascript-visualizer/)
- [https://speakerdeck.com/deepu105/v8-memory-usage-stack-and-heap](https://speakerdeck.com/deepu105/v8-memory-usage-stack-and-heap)
- [https://ui.toast.com/weekly-pick/ko_20200228/](https://ui.toast.com/weekly-pick/ko_20200228/)
- [https://poiemaweb.com/es6-block-scope](https://poiemaweb.com/es6-block-scope)
- [https://medium.com/naver-place-dev/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%99%80-v8-%EC%97%94%EC%A7%84%EC%9D%98-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-f45091e696e1](https://medium.com/naver-place-dev/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%99%80-v8-%EC%97%94%EC%A7%84%EC%9D%98-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-f45091e696e1)
- [https://dev.to/deepu105/visualizing-memory-management-in-v8-engine-javascript-nodejs-deno-webassembly-105p](https://dev.to/deepu105/visualizing-memory-management-in-v8-engine-javascript-nodejs-deno-webassembly-105p)
- [https://en.wikipedia.org/wiki/Circular_reference](https://en.wikipedia.org/wiki/Circular_reference)
