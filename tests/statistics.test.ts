import { describe, it, expect, beforeEach } from 'vitest';
import { Statistics } from '../src/statistics';

describe('Statistics Class', () => {
  let stats: Statistics;
  const sampleData = [1, 2, 3, 4, 5];
  const decimalsData = [1.5, 2.5, 3.5, 4.5, 5.5];

  beforeEach(() => {
    stats = new Statistics(sampleData);
  });

  describe('Constructor and Basic Methods', () => {
    it('should create a Statistics instance with valid data', () => {
      expect(stats).toBeDefined();
      expect(stats.getData()).toEqual(sampleData);
      expect(stats.getCount()).toBe(5);
    });

    it('should throw error for empty array', () => {
      expect(() => new Statistics([])).toThrow('Array cannot be empty');
    });

    it('should throw error for non-array input', () => {
      expect(() => new Statistics('not an array' as any)).toThrow(
        'Input must be an array of numbers'
      );
    });

    it('should throw error for array with non-numeric values', () => {
      expect(() => new Statistics([1, 2, 'string', 4] as any)).toThrow(
        'All array elements must be valid numbers'
      );
    });

    it('should throw error for array with NaN values', () => {
      expect(() => new Statistics([1, 2, NaN, 4])).toThrow(
        'All array elements must be valid numbers'
      );
    });

    it('should create defensive copy of input data', () => {
      const originalData = [1, 2, 3];
      const stats = new Statistics(originalData);
      originalData.push(4);
      expect(stats.getData()).toEqual([1, 2, 3]);
    });
  });

  describe('Basic Statistical Methods', () => {
    describe('mean()', () => {
      it('should calculate mean correctly', () => {
        expect(stats.mean()).toBe(3);
      });

      it('should calculate mean for decimal numbers', () => {
        const decimalStats = new Statistics(decimalsData);
        expect(decimalStats.mean()).toBe(3.5);
      });

      it('should calculate mean for single element', () => {
        const singleStats = new Statistics([42]);
        expect(singleStats.mean()).toBe(42);
      });

      it('should calculate mean for negative numbers', () => {
        const negativeStats = new Statistics([-1, -2, -3, -4, -5]);
        expect(negativeStats.mean()).toBe(-3);
      });
    });

    describe('median()', () => {
      it('should calculate median for odd number of elements', () => {
        expect(stats.median()).toBe(3);
      });

      it('should calculate median for even number of elements', () => {
        const evenStats = new Statistics([1, 2, 3, 4]);
        expect(evenStats.median()).toBe(2.5);
      });

      it('should calculate median for unsorted data', () => {
        const unsortedStats = new Statistics([5, 1, 3, 2, 4]);
        expect(unsortedStats.median()).toBe(3);
      });

      it('should calculate median for single element', () => {
        const singleStats = new Statistics([42]);
        expect(singleStats.median()).toBe(42);
      });
    });

    describe('mode()', () => {
      it('should return single mode', () => {
        const modeStats = new Statistics([1, 2, 2, 3, 4]);
        expect(modeStats.mode()).toEqual([2]);
      });

      it('should return multiple modes', () => {
        const multiModeStats = new Statistics([1, 1, 2, 2, 3]);
        expect(multiModeStats.mode()).toEqual([1, 2]);
      });

      it('should return all values when no mode exists', () => {
        expect(stats.mode()).toEqual([1, 2, 3, 4, 5]);
      });

      it('should return mode for single element', () => {
        const singleStats = new Statistics([42]);
        expect(singleStats.mode()).toEqual([42]);
      });
    });

    describe('variance()', () => {
      it('should calculate variance correctly', () => {
        expect(stats.variance()).toBe(2);
      });

      it('should calculate variance for decimal numbers', () => {
        const decimalStats = new Statistics(decimalsData);
        expect(decimalStats.variance()).toBe(2);
      });

      it('should return 0 for identical values', () => {
        const identicalStats = new Statistics([5, 5, 5, 5]);
        expect(identicalStats.variance()).toBe(0);
      });
    });

    describe('standardDeviation()', () => {
      it('should calculate standard deviation correctly', () => {
        expect(stats.standardDeviation()).toBeCloseTo(Math.sqrt(2), 10);
      });

      it('should return 0 for identical values', () => {
        const identicalStats = new Statistics([5, 5, 5, 5]);
        expect(identicalStats.standardDeviation()).toBe(0);
      });
    });

    describe('min(), max(), range()', () => {
      it('should calculate min correctly', () => {
        expect(stats.min()).toBe(1);
      });

      it('should calculate max correctly', () => {
        expect(stats.max()).toBe(5);
      });

      it('should calculate range correctly', () => {
        expect(stats.range()).toBe(4);
      });

      it('should handle negative numbers', () => {
        const negativeStats = new Statistics([-5, -1, -3]);
        expect(negativeStats.min()).toBe(-5);
        expect(negativeStats.max()).toBe(-1);
        expect(negativeStats.range()).toBe(4);
      });
    });

    describe('sum()', () => {
      it('should calculate sum correctly', () => {
        expect(stats.sum()).toBe(15);
      });

      it('should calculate sum for negative numbers', () => {
        const negativeStats = new Statistics([-1, -2, -3]);
        expect(negativeStats.sum()).toBe(-6);
      });
    });

    describe('percentile()', () => {
      it('should calculate 50th percentile (median)', () => {
        expect(stats.percentile(50)).toBe(3);
      });

      it('should calculate 25th percentile', () => {
        expect(stats.percentile(25)).toBe(2);
      });

      it('should calculate 75th percentile', () => {
        expect(stats.percentile(75)).toBe(4);
      });

      it('should calculate 0th percentile (min)', () => {
        expect(stats.percentile(0)).toBe(1);
      });

      it('should calculate 100th percentile (max)', () => {
        expect(stats.percentile(100)).toBe(5);
      });

      it('should throw error for invalid percentile values', () => {
        expect(() => stats.percentile(-1)).toThrow(
          'Percentile must be between 0 and 100'
        );
        expect(() => stats.percentile(101)).toThrow(
          'Percentile must be between 0 and 100'
        );
      });

      it('should handle interpolation for non-integer indices', () => {
        const evenStats = new Statistics([1, 2, 3, 4, 5, 6]);
        const result = evenStats.percentile(33.33);
        expect(result).toBeGreaterThan(2);
        expect(result).toBeLessThan(3);
      });
    });

    describe('quartiles()', () => {
      it('should calculate quartiles correctly', () => {
        const quartiles = stats.quartiles();
        expect(quartiles.q1).toBe(2);
        expect(quartiles.q2).toBe(3);
        expect(quartiles.q3).toBe(4);
      });

      it('should match percentile calculations', () => {
        const quartiles = stats.quartiles();
        expect(quartiles.q1).toBe(stats.percentile(25));
        expect(quartiles.q2).toBe(stats.percentile(50));
        expect(quartiles.q3).toBe(stats.percentile(75));
      });
    });
  });

  describe('Advanced Statistical Methods', () => {
    const yData = [2, 4, 6, 8, 10];
    const yDataWithNoise = [2.1, 3.9, 6.1, 7.9, 10.1];

    describe('correlation()', () => {
      it('should calculate perfect positive correlation', () => {
        const correlation = stats.correlation(yData);
        expect(correlation).toBeCloseTo(1, 10);
      });

      it('should calculate perfect negative correlation', () => {
        const yNegative = [10, 8, 6, 4, 2];
        const correlation = stats.correlation(yNegative);
        expect(correlation).toBeCloseTo(-1, 10);
      });

      it('should calculate correlation with noise', () => {
        const correlation = stats.correlation(yDataWithNoise);
        expect(correlation).toBeGreaterThan(0.99);
        expect(correlation).toBeLessThan(1);
      });

      it('should calculate zero correlation for uncorrelated data', () => {
        const yUncorrelated = [1, 5, 2, 4, 3];
        const correlation = stats.correlation(yUncorrelated);
        expect(Math.abs(correlation)).toBeLessThan(0.5);
      });
    });

    describe('covariance()', () => {
      it('should calculate covariance correctly', () => {
        const covariance = stats.covariance(yData);
        expect(covariance).toBe(4);
      });

      it('should calculate negative covariance', () => {
        const yNegative = [10, 8, 6, 4, 2];
        const covariance = stats.covariance(yNegative);
        expect(covariance).toBe(-4);
      });

      it('should calculate zero covariance for independent data', () => {
        const yConstant = [5, 5, 5, 5, 5];
        const covariance = stats.covariance(yConstant);
        expect(covariance).toBe(0);
      });
    });

    describe('linearRegression()', () => {
      it('should calculate linear regression for perfect linear relationship', () => {
        const result = stats.linearRegression(yData);

        expect(result.slope).toBeCloseTo(2, 10);
        expect(result.intercept).toBeCloseTo(0, 10);
        expect(result.rSquared).toBeCloseTo(1, 10);
        expect(result.correlation).toBeCloseTo(1, 10);
        expect(typeof result.predict).toBe('function');
      });

      it('should calculate linear regression with noise', () => {
        const result = stats.linearRegression(yDataWithNoise);

        expect(result.slope).toBeCloseTo(2, 1);
        expect(result.intercept).toBeCloseTo(0, 1);
        expect(result.rSquared).toBeGreaterThan(0.99);
        expect(result.correlation).toBeGreaterThan(0.99);
      });

      it('should handle horizontal line regression', () => {
        const yConstant = [5, 5, 5, 5, 5];
        const result = stats.linearRegression(yConstant);

        expect(result.slope).toBeCloseTo(0, 10);
        expect(result.intercept).toBeCloseTo(5, 10);
        expect(result.rSquared).toBeCloseTo(1, 10);
        // Correlation will be NaN for constant y values, but that's expected
        expect(isNaN(result.correlation) || result.correlation === 0).toBe(
          true
        );
      });

      describe('predict function', () => {
        it('should make accurate predictions', () => {
          const result = stats.linearRegression(yData);

          expect(result.predict(6)).toBeCloseTo(12, 10);
          expect(result.predict(0)).toBeCloseTo(0, 10);
          expect(result.predict(2.5)).toBeCloseTo(5, 10);
        });

        it('should handle negative inputs', () => {
          const result = stats.linearRegression(yData);
          expect(result.predict(-1)).toBeCloseTo(-2, 10);
        });
      });
    });
  });

  describe('Static Methods', () => {
    describe('validateTwoDatasets()', () => {
      it('should pass validation for valid datasets', () => {
        expect(() =>
          Statistics.validateTwoDatasets([1, 2, 3], [4, 5, 6])
        ).not.toThrow();
      });

      it('should throw error for non-array inputs', () => {
        expect(() =>
          Statistics.validateTwoDatasets('not array' as any, [1, 2, 3])
        ).toThrow('Both inputs must be arrays of numbers');
      });

      it('should throw error for empty arrays', () => {
        expect(() => Statistics.validateTwoDatasets([], [1, 2, 3])).toThrow(
          'Arrays cannot be empty'
        );
      });

      it('should throw error for different length arrays', () => {
        expect(() => Statistics.validateTwoDatasets([1, 2], [1, 2, 3])).toThrow(
          'Arrays must have the same length'
        );
      });

      it('should throw error for non-numeric values', () => {
        expect(() =>
          Statistics.validateTwoDatasets([1, 'string', 3] as any, [1, 2, 3])
        ).toThrow('All x-array elements must be valid numbers');

        expect(() =>
          Statistics.validateTwoDatasets([1, 2, 3], [1, 'string', 3] as any)
        ).toThrow('All y-array elements must be valid numbers');
      });
    });

    describe('static mean()', () => {
      it('should calculate mean correctly', () => {
        expect(Statistics.mean([1, 2, 3, 4, 5])).toBe(3);
      });

      it('should return 0 for empty array', () => {
        expect(Statistics.mean([])).toBe(0);
      });
    });

    describe('static standardDeviation()', () => {
      it('should calculate standard deviation correctly', () => {
        expect(Statistics.standardDeviation([1, 2, 3, 4, 5])).toBeCloseTo(
          Math.sqrt(2),
          10
        );
      });
    });

    describe('static covariance()', () => {
      it('should calculate covariance correctly', () => {
        // For x=[1,2,3] and y=[2,4,6], covariance should be 4/3 ≈ 1.333...
        // x_mean = 2, y_mean = 4
        // covariance = ((1-2)*(2-4) + (2-2)*(4-4) + (3-2)*(6-4))/3 = (2 + 0 + 2)/3 = 4/3
        expect(Statistics.covariance([1, 2, 3], [2, 4, 6])).toBeCloseTo(
          4 / 3,
          10
        );
      });
    });

    describe('static correlation()', () => {
      it('should calculate correlation correctly', () => {
        expect(Statistics.correlation([1, 2, 3], [2, 4, 6])).toBeCloseTo(1, 10);
      });

      it('should throw error when standard deviation is zero', () => {
        expect(() => Statistics.correlation([1, 1, 1], [2, 4, 6])).toThrow(
          'Cannot calculate correlation when standard deviation is zero'
        );
      });
    });

    describe('static linearRegression()', () => {
      it('should calculate linear regression correctly', () => {
        const result = Statistics.linearRegression([1, 2, 3], [2, 4, 6]);
        expect(result.slope).toBeCloseTo(2, 10);
        expect(result.intercept).toBeCloseTo(0, 10);
      });

      it('should throw error for constant x values', () => {
        expect(() => Statistics.linearRegression([1, 1, 1], [2, 4, 6])).toThrow(
          'Cannot perform linear regression: all x values are the same'
        );
      });
    });
  });

  describe('Edge Cases and Boundary Tests', () => {
    describe('Single element arrays', () => {
      let singleStats: Statistics;

      beforeEach(() => {
        singleStats = new Statistics([42]);
      });

      it('should handle single element for all basic methods', () => {
        expect(singleStats.mean()).toBe(42);
        expect(singleStats.median()).toBe(42);
        expect(singleStats.mode()).toEqual([42]);
        expect(singleStats.variance()).toBe(0);
        expect(singleStats.standardDeviation()).toBe(0);
        expect(singleStats.min()).toBe(42);
        expect(singleStats.max()).toBe(42);
        expect(singleStats.range()).toBe(0);
        expect(singleStats.sum()).toBe(42);
      });

      it('should handle single element for percentiles', () => {
        expect(singleStats.percentile(0)).toBe(42);
        expect(singleStats.percentile(50)).toBe(42);
        expect(singleStats.percentile(100)).toBe(42);
      });
    });

    describe('Identical values', () => {
      let identicalStats: Statistics;

      beforeEach(() => {
        identicalStats = new Statistics([7, 7, 7, 7, 7]);
      });

      it('should handle identical values correctly', () => {
        expect(identicalStats.mean()).toBe(7);
        expect(identicalStats.median()).toBe(7);
        expect(identicalStats.mode()).toEqual([7]);
        expect(identicalStats.variance()).toBe(0);
        expect(identicalStats.standardDeviation()).toBe(0);
        expect(identicalStats.range()).toBe(0);
      });

      it('should handle correlation with identical values', () => {
        expect(() => identicalStats.correlation([1, 2, 3, 4, 5])).toThrow(
          'Cannot calculate correlation when standard deviation is zero'
        );
      });
    });

    describe('Large numbers', () => {
      it('should handle large numbers correctly', () => {
        const largeStats = new Statistics([1e10, 2e10, 3e10]);
        expect(largeStats.mean()).toBe(2e10);
        expect(largeStats.sum()).toBe(6e10);
      });
    });

    describe('Very small numbers', () => {
      it('should handle very small numbers correctly', () => {
        const smallStats = new Statistics([1e-10, 2e-10, 3e-10]);
        expect(smallStats.mean()).toBeCloseTo(2e-10, 15);
        expect(smallStats.sum()).toBeCloseTo(6e-10, 15);
      });
    });

    describe('Mixed positive and negative numbers', () => {
      it('should handle mixed numbers correctly', () => {
        const mixedStats = new Statistics([-2, -1, 0, 1, 2]);
        expect(mixedStats.mean()).toBe(0);
        expect(mixedStats.median()).toBe(0);
        expect(mixedStats.sum()).toBe(0);
        expect(mixedStats.range()).toBe(4);
      });
    });
  });

  describe('Performance and Memory Tests', () => {
    it('should handle reasonably large datasets', () => {
      const largeData = Array.from({ length: 10000 }, (_, i) => i + 1);
      const largeStats = new Statistics(largeData);

      expect(largeStats.mean()).toBe(5000.5);
      expect(largeStats.median()).toBe(5000.5);
      expect(largeStats.min()).toBe(1);
      expect(largeStats.max()).toBe(10000);
    });

    it('should not modify original data', () => {
      const originalData = [3, 1, 4, 1, 5];
      const stats = new Statistics(originalData);

      // Perform operations that might sort internally
      stats.median();
      stats.percentile(75);

      expect(originalData).toEqual([3, 1, 4, 1, 5]);
    });
  });
});
