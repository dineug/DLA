# Jest

## 라이프 싸이클

```js
beforeAll(() => console.log("1 - beforeAll")); // 실행전 최초한번
afterAll(() => console.log("1 - afterAll")); // 실행후 최초한번

beforeEach(() => console.log("1 - beforeEach")); // 실행전 TC 마다
afterEach(() => console.log("1 - afterEach")); // 실행후 TC 마다

test("", () => console.log("1 - test")); // TC

// 스코프
describe("Scoped / Nested block", () => {
  beforeAll(() => console.log("2 - beforeAll")); // 실행전 스코프 최초한번
  afterAll(() => console.log("2 - afterAll")); // 실행후 스코프 최초한번

  beforeEach(() => console.log("2 - beforeEach")); // 실행전 스코프 TC 마다
  afterEach(() => console.log("2 - afterEach")); // 실행후 스코프 TC 마다

  test("", () => console.log("2 - test")); // TC
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

## Reference

- [jest](https://jestjs.io/)
