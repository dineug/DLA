class Dollar {
  constructor(amount) {
    this.amount = amount;
  }
  times(multiplier) {
    return new Dollar(this.amount * multiplier);
  }
}

it("testMultiplication", () => {
  const five = new Dollar(5);
  let product = five.times(2);
  expect(10).toBe(product.amount);
  product = five.times(3);
  expect(15).toBe(product.amount);
});
