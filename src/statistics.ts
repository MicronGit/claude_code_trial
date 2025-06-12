export interface LinearRegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
  correlation: number;
  predict: (xValue: number) => number;
}

export class Statistics {
  private data: number[];

  constructor(data: number[]) {
    if (!Array.isArray(data)) {
      throw new Error('Input must be an array of numbers');
    }
    if (data.length === 0) {
      throw new Error('Array cannot be empty');
    }
    if (!data.every(item => typeof item === 'number' && !isNaN(item))) {
      throw new Error('All array elements must be valid numbers');
    }
    this.data = [...data];
  }

  getData(): number[] {
    return [...this.data];
  }

  getCount(): number {
    return this.data.length;
  }

  mean(): number {
    return this.sum() / this.data.length;
  }

  median(): number {
    const sorted = [...this.data].sort((a, b) => a - b);
    const length = sorted.length;

    if (length % 2 === 0) {
      return (sorted[length / 2 - 1] + sorted[length / 2]) / 2;
    } else {
      return sorted[Math.floor(length / 2)];
    }
  }

  mode(): number[] {
    const frequency = new Map<number, number>();

    for (const value of this.data) {
      frequency.set(value, (frequency.get(value) || 0) + 1);
    }

    const maxFrequency = Math.max(...frequency.values());
    const modes = [];

    for (const [value, freq] of frequency.entries()) {
      if (freq === maxFrequency) {
        modes.push(value);
      }
    }

    return modes.sort((a, b) => a - b);
  }

  variance(): number {
    const meanValue = this.mean();
    const squaredDifferences = this.data.map(value =>
      Math.pow(value - meanValue, 2)
    );
    return (
      squaredDifferences.reduce((sum, value) => sum + value, 0) /
      this.data.length
    );
  }

  standardDeviation(): number {
    return Math.sqrt(this.variance());
  }

  min(): number {
    return Math.min(...this.data);
  }

  max(): number {
    return Math.max(...this.data);
  }

  range(): number {
    return this.max() - this.min();
  }

  sum(): number {
    return this.data.reduce((total, value) => total + value, 0);
  }

  percentile(p: number): number {
    if (p < 0 || p > 100) {
      throw new Error('Percentile must be between 0 and 100');
    }

    const sorted = [...this.data].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);

    if (Number.isInteger(index)) {
      return sorted[index];
    } else {
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      const weight = index - lower;
      return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    }
  }

  quartiles(): { q1: number; q2: number; q3: number } {
    return {
      q1: this.percentile(25),
      q2: this.percentile(50), // Same as median
      q3: this.percentile(75),
    };
  }

  // Advanced statistical methods
  correlation(otherData: number[]): number {
    return Statistics.correlation(this.data, otherData);
  }

  covariance(otherData: number[]): number {
    return Statistics.covariance(this.data, otherData);
  }

  linearRegression(yData: number[]): LinearRegressionResult {
    return Statistics.linearRegression(this.data, yData);
  }

  // Static methods for two dataset operations
  static validateTwoDatasets(xData: number[], yData: number[]): void {
    if (!Array.isArray(xData) || !Array.isArray(yData)) {
      throw new Error('Both inputs must be arrays of numbers');
    }
    if (xData.length === 0 || yData.length === 0) {
      throw new Error('Arrays cannot be empty');
    }
    if (xData.length !== yData.length) {
      throw new Error('Arrays must have the same length');
    }
    if (!xData.every(item => typeof item === 'number' && !isNaN(item))) {
      throw new Error('All x-array elements must be valid numbers');
    }
    if (!yData.every(item => typeof item === 'number' && !isNaN(item))) {
      throw new Error('All y-array elements must be valid numbers');
    }
  }

  static mean(data: number[]): number {
    if (data.length === 0) return 0;
    return data.reduce((sum, value) => sum + value, 0) / data.length;
  }

  static covariance(xData: number[], yData: number[]): number {
    Statistics.validateTwoDatasets(xData, yData);

    const xMean = Statistics.mean(xData);
    const yMean = Statistics.mean(yData);
    const n = xData.length;

    let covariance = 0;
    for (let i = 0; i < n; i++) {
      covariance += (xData[i] - xMean) * (yData[i] - yMean);
    }

    return covariance / n;
  }

  static standardDeviation(data: number[]): number {
    const mean = Statistics.mean(data);
    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      data.length;
    return Math.sqrt(variance);
  }

  static correlation(xData: number[], yData: number[]): number {
    Statistics.validateTwoDatasets(xData, yData);

    const covariance = Statistics.covariance(xData, yData);
    const xStdDev = Statistics.standardDeviation(xData);
    const yStdDev = Statistics.standardDeviation(yData);

    if (xStdDev === 0 || yStdDev === 0) {
      throw new Error(
        'Cannot calculate correlation when standard deviation is zero'
      );
    }

    return covariance / (xStdDev * yStdDev);
  }

  static linearRegression(
    xData: number[],
    yData: number[]
  ): LinearRegressionResult {
    Statistics.validateTwoDatasets(xData, yData);

    const n = xData.length;
    const xMean = Statistics.mean(xData);
    const yMean = Statistics.mean(yData);

    // Calculate slope (b1)
    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < n; i++) {
      const xDiff = xData[i] - xMean;
      numerator += xDiff * (yData[i] - yMean);
      denominator += xDiff * xDiff;
    }

    if (denominator === 0) {
      throw new Error(
        'Cannot perform linear regression: all x values are the same'
      );
    }

    const slope = numerator / denominator;
    const intercept = yMean - slope * xMean;

    // Calculate R-squared
    let totalSumSquares = 0;
    let residualSumSquares = 0;

    for (let i = 0; i < n; i++) {
      const predicted = slope * xData[i] + intercept;
      const yDiff = yData[i] - yMean;
      const residual = yData[i] - predicted;

      totalSumSquares += yDiff * yDiff;
      residualSumSquares += residual * residual;
    }

    const rSquared =
      totalSumSquares === 0 ? 1 : 1 - residualSumSquares / totalSumSquares;

    // Calculate correlation safely (handle case where std dev is 0)
    let correlation: number;
    try {
      correlation = Statistics.correlation(xData, yData);
    } catch {
      // If correlation can't be calculated (e.g., std dev is 0), set to NaN or 0
      const yStdDev = Statistics.standardDeviation(yData);
      correlation = yStdDev === 0 ? NaN : 0;
    }

    return {
      slope,
      intercept,
      rSquared,
      correlation,
      predict: (xValue: number) => slope * xValue + intercept,
    };
  }
}
