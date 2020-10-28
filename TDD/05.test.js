class Franc {
  constructor(amount) {
    this.amount = amount;
  }
  times(multiplier) {
    return new Franc(this.amount * multiplier);
  }
  equals(obj) {
    return this.amount === obj.amount;
  }
}

it("testFrancMultiplication", () => {
  const five = new Franc(5);
  expect(new Franc(10).amount).toBe(five.times(2).amount);
  expect(new Franc(15).amount).toBe(five.times(3).amount);
});
