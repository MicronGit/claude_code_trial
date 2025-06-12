# Statistics Library

A comprehensive TypeScript library for statistical analysis, providing both basic and advanced statistical functions with full type safety and extensive test coverage.

## Overview

This library offers a powerful `Statistics` class that can perform a wide range of statistical calculations on numerical datasets. It includes everything from basic descriptive statistics to advanced analysis like linear regression and correlation analysis.

### Key Features

- 📊 **Basic Statistics**: Mean, median, mode, variance, standard deviation, percentiles
- 📈 **Advanced Analytics**: Correlation coefficients, covariance, linear regression analysis
- 🔢 **Comprehensive Coverage**: Min/max, range, quartiles, sum calculations
- 🛡️ **Type Safety**: Full TypeScript support with strict typing
- ⚡ **Performance**: Optimized for both small and large datasets
- 🧪 **Well Tested**: 89 comprehensive test cases with edge case coverage
- 📐 **Mathematical Accuracy**: Precise implementations following statistical standards

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd claude_code_trial
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the project:**

   ```bash
   npm run build
   ```

4. **Run tests to verify installation:**
   ```bash
   npm test
   ```

## Quick Start

### Basic Usage

```typescript
import { Statistics } from './src/statistics';

// Create a Statistics instance with your data
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const stats = new Statistics(data);

// Calculate basic statistics
console.log('Mean:', stats.mean()); // 5.5
console.log('Median:', stats.median()); // 5.5
console.log('Standard Deviation:', stats.standardDeviation()); // ~2.87
console.log('Variance:', stats.variance()); // 8.25
```

### Advanced Analysis

```typescript
// Correlation analysis between two datasets
const xData = [1, 2, 3, 4, 5];
const yData = [2, 4, 6, 8, 10];
const xStats = new Statistics(xData);

const correlation = xStats.correlation(yData);
console.log('Correlation:', correlation); // 1.0 (perfect positive correlation)

// Linear regression analysis
const regression = xStats.linearRegression(yData);
console.log('Slope:', regression.slope); // 2
console.log('Intercept:', regression.intercept); // 0
console.log('R-squared:', regression.rSquared); // 1.0
console.log('Prediction for x=6:', regression.predict(6)); // 12
```

### Using Static Methods

```typescript
// Calculate statistics without creating an instance
const covariance = Statistics.covariance([1, 2, 3], [2, 4, 6]);
const correlation = Statistics.correlation([1, 2, 3], [2, 4, 6]);

// Perform linear regression analysis
const regressionResult = Statistics.linearRegression([1, 2, 3], [2, 4, 6]);
```

## Core Functionality

### Basic Statistical Methods

| Method                | Description                      | Example                     |
| --------------------- | -------------------------------- | --------------------------- |
| `mean()`              | Arithmetic mean                  | `stats.mean()`              |
| `median()`            | Middle value when sorted         | `stats.median()`            |
| `mode()`              | Most frequently occurring values | `stats.mode()`              |
| `variance()`          | Population variance              | `stats.variance()`          |
| `standardDeviation()` | Population standard deviation    | `stats.standardDeviation()` |
| `min()`               | Minimum value                    | `stats.min()`               |
| `max()`               | Maximum value                    | `stats.max()`               |
| `range()`             | Difference between max and min   | `stats.range()`             |
| `sum()`               | Sum of all values                | `stats.sum()`               |

### Percentiles and Quartiles

```typescript
// Calculate specific percentiles
const percentile25 = stats.percentile(25); // First quartile
const percentile50 = stats.percentile(50); // Median
const percentile75 = stats.percentile(75); // Third quartile

// Get all quartiles at once
const { q1, q2, q3 } = stats.quartiles();
```

### Advanced Statistical Analysis

#### Correlation Analysis

```typescript
const data1 = [1, 2, 3, 4, 5];
const data2 = [2, 4, 6, 8, 10];

const stats = new Statistics(data1);
const correlation = stats.correlation(data2);
// Returns: 1.0 (perfect positive correlation)
```

#### Covariance Calculation

```typescript
const covariance = stats.covariance(data2);
// Measures how much two variables change together
```

#### Linear Regression

```typescript
const regression = stats.linearRegression(data2);

console.log(regression.slope); // Slope of the regression line
console.log(regression.intercept); // Y-intercept
console.log(regression.rSquared); // Coefficient of determination
console.log(regression.correlation); // Correlation coefficient

// Make predictions
const prediction = regression.predict(6); // Predict y for x=6
```

## Error Handling

The library includes comprehensive error handling for common edge cases:

```typescript
// These will throw appropriate errors:
new Statistics([]); // Empty array
new Statistics([1, 'invalid']); // Non-numeric values
new Statistics([1, 2, NaN]); // NaN values

// Percentile validation
stats.percentile(-1); // Invalid percentile (< 0)
stats.percentile(101); // Invalid percentile (> 100)

// Correlation with zero standard deviation
Statistics.correlation([1, 1, 1], [2, 4, 6]); // Throws error
```

## Development

### Available Scripts

```bash
# Development and testing
npm run dev          # Run in development mode
npm run build        # Compile TypeScript to JavaScript
npm run test         # Run all tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report

# Code quality
npm run typecheck    # TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run check        # Run all quality checks
```

### Project Structure

```
claude_code_trial/
├── src/
│   ├── calculator.ts    # Basic calculator functionality
│   └── statistics.ts    # Advanced statistics library
├── tests/
│   ├── calculator.test.ts    # Calculator tests
│   └── statistics.test.ts    # Statistics tests (72 test cases)
├── dist/                # Compiled JavaScript output
└── README.md           # This documentation
```

### Testing

The library includes comprehensive test coverage with 89 test cases covering:

- ✅ Basic statistical calculations
- ✅ Advanced statistical methods
- ✅ Error conditions and edge cases
- ✅ Boundary value testing
- ✅ Performance with large datasets
- ✅ Data integrity and immutability

Run tests with:

```bash
npm test
```

### Contributing

1. Ensure all tests pass: `npm test`
2. Run quality checks: `npm run check`
3. Follow the existing code style
4. Add tests for new functionality

## License

This project is licensed under the ISC License.

## Examples and Use Cases

### Real-world Example: Sales Data Analysis

```typescript
import { Statistics } from './src/statistics';

// Monthly sales data
const monthlySales = [
  150000, 165000, 142000, 178000, 195000, 201000, 188000, 172000, 159000,
  183000, 197000, 210000,
];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const salesStats = new Statistics(monthlySales);

// Basic analysis
console.log('Average monthly sales:', salesStats.mean());
console.log('Median sales:', salesStats.median());
console.log('Sales volatility (std dev):', salesStats.standardDeviation());

// Quarterly analysis
const { q1, q2, q3 } = salesStats.quartiles();
console.log('Q1 (25th percentile):', q1);
console.log('Q2 (50th percentile):', q2);
console.log('Q3 (75th percentile):', q3);

// Trend analysis (months as X, sales as Y)
const trendAnalysis = Statistics.linearRegression(months, monthlySales);
console.log('Monthly growth trend:', trendAnalysis.slope);
console.log('Trend strength (R²):', trendAnalysis.rSquared);

// Forecast next month
const nextMonthForecast = trendAnalysis.predict(13);
console.log('Predicted sales for month 13:', nextMonthForecast);
```

This example demonstrates how to use the Statistics library for comprehensive business data analysis, including trend analysis and forecasting.
