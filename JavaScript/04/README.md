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

## Reference

- [https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239](https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239)
- [https://blog.bitsrc.io/master-javascript-call-by-sharing-parameter-passing-7049d65163ed](https://blog.bitsrc.io/master-javascript-call-by-sharing-parameter-passing-7049d65163ed)
- [https://ui.dev/javascript-visualizer/](https://ui.dev/javascript-visualizer/)
- [https://speakerdeck.com/deepu105/v8-memory-usage-stack-and-heap](https://speakerdeck.com/deepu105/v8-memory-usage-stack-and-heap)
- [https://ui.toast.com/weekly-pick/ko_20200228/](https://ui.toast.com/weekly-pick/ko_20200228/)
