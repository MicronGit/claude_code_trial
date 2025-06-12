import { describe, it, expect } from 'vitest';
import { Calculator, factorial } from '../src/calculator';

describe('Calculator', () => {
  const calculator = new Calculator();

  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
      expect(calculator.add(5, -3)).toBe(2);
    });
  });

  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    it('should handle negative results', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(calculator.multiply(3, 4)).toBe(12);
    });

    it('should multiply by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    it('should multiply negative numbers', () => {
      expect(calculator.multiply(-3, 4)).toBe(-12);
    });
  });

  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow(
        'Division by zero is not allowed'
      );
    });
  });

  describe('power', () => {
    it('should calculate power correctly', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    it('should handle power of zero', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    it('should handle negative exponents', () => {
      expect(calculator.power(2, -2)).toBe(0.25);
    });
  });
});

describe('factorial', () => {
  it('should calculate factorial of positive numbers', () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(3)).toBe(6);
  });

  it('should return 1 for factorial of 0 and 1', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
  });

  it('should throw error for negative numbers', () => {
    expect(() => factorial(-1)).toThrow(
      'Factorial is not defined for negative numbers'
    );
  });
});
