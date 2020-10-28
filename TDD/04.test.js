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
  expect(new Dollar(10).amount).toBe(five.times(2).amount);
  expect(new Dollar(15).amount).toBe(five.times(3).amount);
});

it("testEquality", () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
});
