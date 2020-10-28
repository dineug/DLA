class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
  equals(obj) {
    return this.amount === obj.amount;
  }
}

it("testMultiplication", () => {
  const five = new Dollar(5);
  let product = five.times(2);
  expect(10).toBe(product.amount);
  product = five.times(3);
  expect(15).toBe(product.amount);
});

it("testEquality", () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
});
