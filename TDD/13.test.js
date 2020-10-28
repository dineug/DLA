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
    return new Money(this.amount * multiplier.amount, this._currency);
  }
  plus(addend) {
    return new Sum(this, addend);
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
    if (source instanceof Money) return source;
    return source.reduce(to);
  }
}

class Sum extends Expression {
  constructor(augend, addend) {
    super();
    this.augend = augend;
    this.addend = addend;
  }
  reduce(to) {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}

it("testMultiplication", () => {
  const five = Money.dollar(5);
  expect(Money.dollar(10).amount).toBe(five.times(Money.dollar(2)).amount);
  expect(Money.dollar(15).amount).toBe(five.times(Money.dollar(3)).amount);
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

it("testPlusReturnsSum", () => {
  const five = Money.dollar(5);
  const result = five.plus(five);
  const sum = result;
  expect(five.amount).toBe(sum.augend.amount);
  expect(five.amount).toBe(sum.addend.amount);
});

it("testReduceSum", () => {
  const sum = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result = bank.reduce(sum, "USD");
  expect(Money.dollar(7).amount).toBe(result.amount);
});

it("testReduceMoney", () => {
  const bank = new Bank();
  const result = bank.reduce(Money.dollar(1), "USD");
  expect(Money.dollar(1).amount).toBe(result.amount);
});
