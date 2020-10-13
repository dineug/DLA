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

## Reference

- [https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239](https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239)
- [https://blog.bitsrc.io/master-javascript-call-by-sharing-parameter-passing-7049d65163ed](https://blog.bitsrc.io/master-javascript-call-by-sharing-parameter-passing-7049d65163ed)
