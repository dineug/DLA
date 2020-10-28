class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  times(multiplier) {
    this.amount *= multiplier;
  }
}

it("testMultiplication", () => {
  const five = new Dollar(5);
  five.times(2);
  expect(10).toBe(five.amount);
});
