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
    return new Money(this.amount * multiplier, this._currency);
  }
  plus(addend) {
    return new Sum(this, addend);
  }
  reduce(bank, to) {
    const rate = bank.rate(this._currency, to);
    return new Money(this.amount / rate, to);
  }
  toString() {
    return `${this._currency}_${this.amount}`;
  }

  static dollar(amount) {
    return new Money(amount, "USD");
  }
  static franc(amount) {
    return new Money(amount, "CHF");
  }
}

class Bank {
  constructor() {
    this.rates = {};
  }

  reduce(source, to) {
    return source.reduce(this, to);
  }
  rate(from, to) {
    if (from === to) return 1;
    return this.rates[new Pair(from, to).hashCode()];
  }
  addRate(from, to, rate) {
    this.rates[new Pair(from, to).hashCode()] = rate;
  }
}

class Sum extends Expression {
  constructor(augend, addend) {
    super();
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank, to) {
    const amount =
      this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }
  plus(addend) {
    return new Sum(this, addend);
  }
  times(multiplier) {
    return new Sum(
      this.augend.times(multiplier),
      this.addend.times(multiplier)
    );
  }
}

class Pair {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  hashCode() {
    return `${this.from}_${this.to}`;
  }
}

it("testMultiplication", () => {
  const five = Money.dollar(5);
  expect(Money.dollar(10)).toStrictEqual(five.times(2));
  expect(Money.dollar(15)).toStrictEqual(five.times(3));
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

// it("testDifferentClassEquality", () => {
//   expect(new Money(10, "CHF").equals(new Franc(10, "CHF"))).toBeTruthy();
// });

it("testSimpleAddition", () => {
  const five = Money.dollar(5);
  const sum = five.plus(five);
  const bank = new Bank();
  const reduced = bank.reduce(sum, "USD");
  expect(Money.dollar(10)).toStrictEqual(reduced);
});

it("testPlusReturnsSum", () => {
  const five = Money.dollar(5);
  const result = five.plus(five);
  const sum = result;
  expect(five).toStrictEqual(sum.augend);
  expect(five).toStrictEqual(sum.addend);
});

it("testReduceSum", () => {
  const sum = new Sum(Money.dollar(3), Money.dollar(4));
  const bank = new Bank();
  const result = bank.reduce(sum, "USD");
  expect(Money.dollar(7)).toStrictEqual(result);
});

it("testReduceMoney", () => {
  const bank = new Bank();
  const result = bank.reduce(Money.dollar(1), "USD");
  expect(Money.dollar(1)).toStrictEqual(result);
});

it("testReduceMoneyDifferentCurrency", () => {
  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);
  const result = bank.reduce(Money.franc(2), "USD");
  expect(Money.dollar(1)).toStrictEqual(result);
});

it("testIdentityRate", () => {
  expect(new Bank().rate("USD", "USD")).toBe(1);
});

it("testMixedAddition", () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);
  const result = bank.reduce(fiveBucks.plus(tenFrancs), "USD");
  expect(Money.dollar(10)).toStrictEqual(result);
});

it("testSumPlusMoney", () => {
  const fiveBucks = Money.dollar(5);
  const tenFrance = Money.franc(10);
  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);
  const sum = new Sum(fiveBucks, tenFrance).plus(fiveBucks);
  const result = bank.reduce(sum, "USD");
  expect(Money.dollar(15)).toStrictEqual(result);
});

it("testSumTimes", () => {
  const fiveBucks = Money.dollar(5);
  const tenFrancs = Money.franc(10);
  const bank = new Bank();
  bank.addRate("CHF", "USD", 2);
  const sum = new Sum(fiveBucks, tenFrancs).times(2);
  const result = bank.reduce(sum, "USD");
  expect(Money.dollar(20)).toStrictEqual(result);
});

// it("testPlusSameCurrencyReturnsMoney", () => {
//   const sum = Money.dollar(1).plus(Money.dollar(1));
//   expect(sum instanceof Money).toBeTruthy();
// });
