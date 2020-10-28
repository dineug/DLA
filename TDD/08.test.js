class Money {
  constructor(amount) {
    this.amount = amount;
  }
  equals(obj) {
    return this.amount === obj.amount;
  }
  static dollar(amount) {
    return new Dollar(amount);
  }
  static franc(amount) {
    return new Franc(amount);
  }
}

class Dollar extends Money {
  constructor(amount) {
    super(amount);
  }
  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
}

class Franc extends Money {
  constructor(amount) {
    super(amount);
  }
  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
}

it("testMultiplication", () => {
  const five = Money.dollar(5);
  expect(Money.dollar(10).amount).toBe(five.times(2).amount);
  expect(Money.dollar(15).amount).toBe(five.times(3).amount);
});

it("testEquality", () => {
  expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
  expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
  expect(Money.franc(5).equals(Money.franc(5))).toBeTruthy();
  expect(Money.franc(5).equals(Money.franc(6))).toBeFalsy();
  // expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
});
