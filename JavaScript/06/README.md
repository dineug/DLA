# 6장

## 프로퍼티 타입

| Name               | API                                      |
| ------------------ | ---------------------------------------- |
| 프로퍼티 속성 변경 | Object.defineProperty(options)           |
| 다중 프로퍼티 정의 | Object.defineProperties(options)         |
| 프로퍼티 속성 읽기 | Object.getOwnPropertyDescriptor(options) |

### 데이터 프로퍼티

데이터 프로퍼티는 데이터 값에 대한 단 하나의 위치를 포함하여 이 위치에서 값을 읽고 씁니다.  
데이터 프로퍼티에는 그 행동을 설명하는 네 가지 속성이 있습니다.

- Configurable: 해당 프로퍼티가 delete를 통해 삭제하거나, 프로퍼티의 속성을 바꾸거나, 접근자 프로퍼티로 변환할 수 있음을 나타냅니다.
- Enumerable: for-in 루프에서 해당 프로퍼티를 반환함을 나타냅니다.
- Writable: 프로퍼티의 값을 바꿀 수 있음을 나타냅니다.
- Value: 프로퍼티의 실제 데이터 값을 포함합니다.

### 접근자 프로퍼티

접근자 프로퍼티에는 데이터 값이 들어 있지 않고 대신 getter 함수와 setter 함수로 구성됩니다.  
getter 함수가 호출되며 유효한 값을 반환할 책임은 이 함수에 있습니다.

- Configurable: 해당 프로퍼티가 delete를 통해 삭제하거나, 프로퍼티의 속성을 바꾸거나, 접근자 프로퍼티로 변환할 수 있음을 나타냅니다.
- Enumerable: for-in 루프에서 해당 프로퍼티를 반환함을 나타냅니다.
- Get: 프로퍼티를 읽을 때 호출할 함수입니다.
- Set: 프로퍼티를 바꿀 때 호출할 함수입니다.

```js
const book = {
  _year: 2004,
  edition: 1,
};

// 구식 접근자 지원
book.__defineGetter__("year", function () {
  return this._year;
});

book.__defineSetter__("year", function (newValue) {
  if (newValue > 2004) {
    this._year = newValue;
    this.edition += newValue - 2004;
  }
});

book.year = 2005;
console.log(book.edition); // 2
```

## 프로토타입

- Prototype Object
- Prototype Link

```js
function Person() {}

Person.prototype; // Prototype Object
Person.__proto__; // Prototype Link -> Function Prototype Object
Person.prototype.constructor; // Person.prototype.constructor -> Person
```

## 프로토타입 상속

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType) {
  const prototype = object(superType.prototype); // 객체 생성
  prototype.constructor = subType; // 객체 확장
  subType.prototype = prototype; // 객체 할당
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};
```

## Reference

- [https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67](https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67)
