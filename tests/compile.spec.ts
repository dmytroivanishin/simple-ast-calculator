import { setupCalculator } from "./utils";

describe('calculator', () => {
  it('should return correct result for 2 + 3 * 4', () => {
    const calculator = setupCalculator('2 + 3 * 4');

    expect(calculator.compile()).toEqual(14);
  });

  it('should return correct result for 2 * 3 + 4', () => {
    const calculator = setupCalculator('2 * 3 + 4');

    expect(calculator.compile()).toEqual(10);
  });

  it('should return correct result for 2 + 3 + 4 + 5 + 6 * 2', () => {
    const calculator = setupCalculator('2 + 3 + 4 + 5 + 6 * 2');

    expect(calculator.compile()).toEqual(26);
  });

  it('should return correct result for 6 / 3 + 4', () => {
    const calculator = setupCalculator('6 / 3 + 4');

    expect(calculator.compile()).toEqual(6);
  });

  it('should return correct result for 6 - 3 + 4', () => {
    const calculator = setupCalculator('6 - 3 + 4');

    expect(calculator.compile()).toEqual(7);
  });
});