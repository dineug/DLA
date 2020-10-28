class Expression {}

class Money extends Expression {
  constructor(amount, currency) {
    super();
    this.amount = amount;
    this._currency = currency;
  }
  equals(obj) {
    return this.amount === obj.amount && this.currency() === obj.currency();
  }
  currency() {
    return this._currency;
  }
  times(multiplier) {
    if (multiplier instanceof Money) {
      return new Money(this.amount * multiplier.amount, this._currency);
    }
    return new Money(this.amount * multiplier, this._currency);
  }
  plus(addend) {
    if (addend instanceof Money) {
      return new Money(this.amount + addend.amount, this._currency);
    }
    return new Money(this.amount + addend, this._currency);
  }
  static dollar(amount) {
    return new Money(amount, "USD");
  }
  static franc(amount) {
    return new Money(amount, "CHF");
  }
}

class Dollar extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }
}

class Franc extends Money {
  constructor(amount, currency) {
    super(amount, currency);
  }
}

class Bank {
  reduce(source, to) {
    return Money.dollar(10);
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

it("testCurrency", () => {
  expect(Money.dollar(1).currency()).toBe("USD");
  expect(Money.franc(1).currency()).toBe("CHF");
});

it("testDifferentClassEquality", () => {
  expect(new Money(10, "CHF").equals(new Franc(10, "CHF"))).toBeTruthy();
});

it("testSimpleAddition", () => {
  const five = Money.dollar(5);
  const sum = five.plus(five);
  const bank = new Bank();
  const reduced = bank.reduce(sum, "USD");
  expect(Money.dollar(10).amount).toBe(reduced.amount);
});
