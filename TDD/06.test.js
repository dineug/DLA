class Money {
  constructor(amount) {
    this.amount = amount;
  }
  equals(obj) {
    return this.amount === obj.amount;
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

it("testEquality", () => {
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
  expect(new Franc(5).equals(new Franc(5))).toBeTruthy();
  expect(new Franc(5).equals(new Franc(6))).toBeFalsy();
});
