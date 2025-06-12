# Statistics Class API Reference

Comprehensive API documentation for the Statistics class and its methods.

## Table of Contents

- [Class Constructor](#class-constructor)
- [Basic Information Methods](#basic-information-methods)
- [Basic Statistical Methods](#basic-statistical-methods)
- [Advanced Statistical Methods](#advanced-statistical-methods)
- [Static Methods](#static-methods)
- [Interfaces](#interfaces)
- [Error Conditions](#error-conditions)

## Class Constructor

### `new Statistics(data: number[])`

Creates a new Statistics instance with the provided numerical data.

**Parameters:**

- `data: number[]` - Array of numerical values to analyze

**Throws:**

- `Error: "Input must be an array of numbers"` - When input is not an array
- `Error: "Array cannot be empty"` - When input array is empty
- `Error: "All array elements must be valid numbers"` - When array contains non-numeric values or NaN

**Example:**

```typescript
const stats = new Statistics([1, 2, 3, 4, 5]);
const decimalStats = new Statistics([1.5, 2.7, 3.14, 4.2]);
```

**Algorithm:**

1. Validates input is an array
2. Checks array is not empty
3. Validates all elements are numbers and not NaN
4. Creates a defensive copy of the input data

---

## Basic Information Methods

### `getData(): number[]`

Returns a copy of the original data array.

**Returns:** `number[]` - Copy of the internal data array

**Example:**

```typescript
const data = stats.getData();
// Safe to modify without affecting the Statistics instance
```

**Algorithm:** Returns a shallow copy using spread operator to prevent external modification.

### `getCount(): number`

Returns the number of elements in the dataset.

**Returns:** `number` - Count of data points

**Example:**

```typescript
const count = stats.getCount(); // 5 for [1, 2, 3, 4, 5]
```

---

## Basic Statistical Methods

### `mean(): number`

Calculates the arithmetic mean (average) of the dataset.

**Returns:** `number` - The arithmetic mean

**Example:**

```typescript
const average = stats.mean(); // 3 for [1, 2, 3, 4, 5]
```

**Algorithm:**

- Formula: `μ = (Σx) / n`
- Where μ is the mean, Σx is the sum of all values, n is the count

### `median(): number`

Calculates the median (middle value) of the dataset.

**Returns:** `number` - The median value

**Example:**

```typescript
const median = stats.median(); // 3 for [1, 2, 3, 4, 5]
```

**Algorithm:**

1. Sort the data in ascending order
2. If n is odd: return middle element at index `(n-1)/2`
3. If n is even: return average of two middle elements at indices `n/2-1` and `n/2`

### `mode(): number[]`

Finds the most frequently occurring value(s) in the dataset.

**Returns:** `number[]` - Array of mode values (sorted in ascending order)

**Example:**

```typescript
const modes = stats.mode(); // [1, 2, 3, 4, 5] for [1, 2, 3, 4, 5] (all equally frequent)
const multiModal = new Statistics([1, 1, 2, 2, 3]).mode(); // [1, 2]
```

**Algorithm:**

1. Count frequency of each value using Map
2. Find maximum frequency
3. Return all values with maximum frequency, sorted

### `variance(): number`

Calculates the population variance of the dataset.

**Returns:** `number` - The population variance

**Example:**

```typescript
const variance = stats.variance(); // 2 for [1, 2, 3, 4, 5]
```

**Algorithm:**

- Formula: `σ² = Σ(x - μ)² / n`
- Where σ² is variance, x is each value, μ is the mean, n is the count

### `standardDeviation(): number`

Calculates the population standard deviation of the dataset.

**Returns:** `number` - The population standard deviation

**Example:**

```typescript
const stdDev = stats.standardDeviation(); // √2 ≈ 1.414 for [1, 2, 3, 4, 5]
```

**Algorithm:**

- Formula: `σ = √(variance)`
- Returns the square root of the population variance

### `min(): number`

Finds the minimum value in the dataset.

**Returns:** `number` - The minimum value

**Example:**

```typescript
const minimum = stats.min(); // 1 for [1, 2, 3, 4, 5]
```

**Algorithm:** Uses `Math.min()` with spread operator for optimal performance.

### `max(): number`

Finds the maximum value in the dataset.

**Returns:** `number` - The maximum value

**Example:**

```typescript
const maximum = stats.max(); // 5 for [1, 2, 3, 4, 5]
```

**Algorithm:** Uses `Math.max()` with spread operator for optimal performance.

### `range(): number`

Calculates the range (difference between maximum and minimum values).

**Returns:** `number` - The range of the dataset

**Example:**

```typescript
const range = stats.range(); // 4 for [1, 2, 3, 4, 5]
```

**Algorithm:** `range = max() - min()`

### `sum(): number`

Calculates the sum of all values in the dataset.

**Returns:** `number` - The sum of all values

**Example:**

```typescript
const total = stats.sum(); // 15 for [1, 2, 3, 4, 5]
```

**Algorithm:** Uses `Array.reduce()` to sum all elements.

### `percentile(p: number): number`

Calculates the specified percentile of the dataset.

**Parameters:**

- `p: number` - Percentile value (0-100)

**Returns:** `number` - The percentile value

**Throws:**

- `Error: "Percentile must be between 0 and 100"` - When p < 0 or p > 100

**Example:**

```typescript
const q1 = stats.percentile(25); // First quartile
const median = stats.percentile(50); // Median
const q3 = stats.percentile(75); // Third quartile
```

**Algorithm:**

1. Sort data in ascending order
2. Calculate index: `i = (p/100) * (n-1)`
3. If i is integer: return sorted[i]
4. If i is not integer: interpolate between floor(i) and ceil(i)
   - `result = sorted[lower] * (1-weight) + sorted[upper] * weight`
   - Where weight = i - floor(i)

### `quartiles(): { q1: number; q2: number; q3: number }`

Calculates the first, second, and third quartiles.

**Returns:** `{ q1: number; q2: number; q3: number }` - Object containing quartile values

**Example:**

```typescript
const { q1, q2, q3 } = stats.quartiles();
// q1 = 25th percentile, q2 = 50th percentile (median), q3 = 75th percentile
```

**Algorithm:** Utilizes the `percentile()` method for 25%, 50%, and 75%.

---

## Advanced Statistical Methods

### `correlation(otherData: number[]): number`

Calculates the Pearson correlation coefficient between this dataset and another.

**Parameters:**

- `otherData: number[]` - The second dataset for correlation analysis

**Returns:** `number` - Correlation coefficient (-1 to 1)

**Throws:**

- All validation errors from `Statistics.validateTwoDatasets()`
- `Error: "Cannot calculate correlation when standard deviation is zero"`

**Example:**

```typescript
const correlation = stats.correlation([2, 4, 6, 8, 10]); // 1.0 (perfect positive)
```

**Algorithm:**

- Formula: `r = covariance(X,Y) / (σX * σY)`
- Where r is correlation, σX and σY are standard deviations

### `covariance(otherData: number[]): number`

Calculates the covariance between this dataset and another.

**Parameters:**

- `otherData: number[]` - The second dataset for covariance analysis

**Returns:** `number` - Covariance value

**Throws:**

- All validation errors from `Statistics.validateTwoDatasets()`

**Example:**

```typescript
const cov = stats.covariance([2, 4, 6, 8, 10]); // 4.0
```

**Algorithm:**

- Formula: `cov(X,Y) = Σ((Xi - μX)(Yi - μY)) / n`
- Where μX and μY are the means of X and Y datasets

### `linearRegression(yData: number[]): LinearRegressionResult`

Performs linear regression analysis with this dataset as X values and provided data as Y values.

**Parameters:**

- `yData: number[]` - The dependent variable (Y) values

**Returns:** `LinearRegressionResult` - Object containing regression analysis results

**Throws:**

- All validation errors from `Statistics.validateTwoDatasets()`
- `Error: "Cannot perform linear regression: all x values are the same"`

**Example:**

```typescript
const regression = stats.linearRegression([2, 4, 6, 8, 10]);
console.log(regression.slope); // 2.0
console.log(regression.intercept); // 0.0
console.log(regression.rSquared); // 1.0
```

**Algorithm:**

1. **Slope calculation:** `b1 = Σ((Xi - μX)(Yi - μY)) / Σ(Xi - μX)²`
2. **Intercept calculation:** `b0 = μY - b1 * μX`
3. **R-squared calculation:** `R² = 1 - (SSres / SStot)`
   - Where SSres = Σ(Yi - Ŷi)² and SStot = Σ(Yi - μY)²
4. **Correlation:** Calculated using the correlation method (with error handling)

---

## Static Methods

### `Statistics.validateTwoDatasets(xData: number[], yData: number[]): void`

Validates that two datasets are suitable for statistical analysis.

**Parameters:**

- `xData: number[]` - First dataset
- `yData: number[]` - Second dataset

**Throws:**

- `Error: "Both inputs must be arrays of numbers"` - When inputs are not arrays
- `Error: "Arrays cannot be empty"` - When either array is empty
- `Error: "Arrays must have the same length"` - When arrays have different lengths
- `Error: "All x-array elements must be valid numbers"` - When xData contains invalid values
- `Error: "All y-array elements must be valid numbers"` - When yData contains invalid values

### `Statistics.mean(data: number[]): number`

Static method to calculate mean without creating an instance.

**Parameters:**

- `data: number[]` - Array of numbers

**Returns:** `number` - The arithmetic mean (returns 0 for empty array)

**Example:**

```typescript
const average = Statistics.mean([1, 2, 3, 4, 5]); // 3
```

### `Statistics.standardDeviation(data: number[]): number`

Static method to calculate standard deviation without creating an instance.

**Parameters:**

- `data: number[]` - Array of numbers

**Returns:** `number` - The population standard deviation

**Example:**

```typescript
const stdDev = Statistics.standardDeviation([1, 2, 3, 4, 5]); // √2
```

### `Statistics.covariance(xData: number[], yData: number[]): number`

Static method to calculate covariance between two datasets.

**Parameters:**

- `xData: number[]` - First dataset
- `yData: number[]` - Second dataset

**Returns:** `number` - Covariance value

**Throws:** All validation errors from `validateTwoDatasets()`

**Example:**

```typescript
const cov = Statistics.covariance([1, 2, 3], [2, 4, 6]); // 1.333...
```

### `Statistics.correlation(xData: number[], yData: number[]): number`

Static method to calculate correlation between two datasets.

**Parameters:**

- `xData: number[]` - First dataset
- `yData: number[]` - Second dataset

**Returns:** `number` - Correlation coefficient

**Throws:**

- All validation errors from `validateTwoDatasets()`
- `Error: "Cannot calculate correlation when standard deviation is zero"`

**Example:**

```typescript
const corr = Statistics.correlation([1, 2, 3], [2, 4, 6]); // 1.0
```

### `Statistics.linearRegression(xData: number[], yData: number[]): LinearRegressionResult`

Static method to perform linear regression analysis.

**Parameters:**

- `xData: number[]` - Independent variable values
- `yData: number[]` - Dependent variable values

**Returns:** `LinearRegressionResult` - Regression analysis results

**Throws:**

- All validation errors from `validateTwoDatasets()`
- `Error: "Cannot perform linear regression: all x values are the same"`

**Example:**

```typescript
const regression = Statistics.linearRegression([1, 2, 3], [2, 4, 6]);
```

---

## Interfaces

### `LinearRegressionResult`

Interface representing the results of a linear regression analysis.

```typescript
interface LinearRegressionResult {
  slope: number; // Slope of the regression line (b1)
  intercept: number; // Y-intercept of the regression line (b0)
  rSquared: number; // Coefficient of determination (0-1)
  correlation: number; // Pearson correlation coefficient (-1 to 1, or NaN)
  predict: (xValue: number) => number; // Function to predict Y for given X
}
```

**Properties:**

#### `slope: number`

The slope of the regression line, representing the change in Y for each unit change in X.

#### `intercept: number`

The Y-intercept of the regression line, representing the predicted Y value when X equals zero.

#### `rSquared: number`

The coefficient of determination, indicating the proportion of variance in Y explained by X (0 = no relationship, 1 = perfect relationship).

#### `correlation: number`

The Pearson correlation coefficient between X and Y variables. May be NaN if standard deviation of Y is zero.

#### `predict: (xValue: number) => number`

A function that predicts the Y value for a given X value using the regression equation: `Y = slope * X + intercept`.

**Example Usage:**

```typescript
const regression = stats.linearRegression([1, 2, 3, 4, 5]);

// Access properties
console.log(`Slope: ${regression.slope}`);
console.log(`Intercept: ${regression.intercept}`);
console.log(`R²: ${regression.rSquared}`);

// Make predictions
const prediction = regression.predict(6);
console.log(`Predicted Y for X=6: ${prediction}`);
```

---

## Error Conditions

### Common Validation Errors

1. **Invalid Constructor Input:**

   - Non-array input: `"Input must be an array of numbers"`
   - Empty array: `"Array cannot be empty"`
   - Non-numeric values: `"All array elements must be valid numbers"`

2. **Invalid Percentile:**

   - Out of range: `"Percentile must be between 0 and 100"`

3. **Two-Dataset Validation:**

   - Non-array inputs: `"Both inputs must be arrays of numbers"`
   - Empty arrays: `"Arrays cannot be empty"`
   - Length mismatch: `"Arrays must have the same length"`
   - Invalid X values: `"All x-array elements must be valid numbers"`
   - Invalid Y values: `"All y-array elements must be valid numbers"`

4. **Statistical Calculation Errors:**
   - Zero standard deviation in correlation: `"Cannot calculate correlation when standard deviation is zero"`
   - Constant X values in regression: `"Cannot perform linear regression: all x values are the same"`

### Error Handling Best Practices

```typescript
try {
  const stats = new Statistics([1, 2, 3, 4, 5]);
  const correlation = stats.correlation([1, 1, 1, 1, 1]); // Will throw
} catch (error) {
  console.error('Statistical calculation failed:', error.message);
  // Handle error appropriately
}
```

### Edge Cases

- **Single element arrays:** All methods handle single-element datasets gracefully
- **Identical values:** Standard deviation and variance return 0; correlation may throw errors
- **Large datasets:** Methods are optimized for reasonable performance with large arrays
- **Floating-point precision:** Results may have minor floating-point precision limitations

---

## Performance Notes

- **Time Complexity:** Most methods are O(n) or O(n log n) for sorting-based operations
- **Space Complexity:** Methods create minimal additional arrays; original data is preserved
- **Memory Safety:** All methods return new objects/arrays to prevent external modification
- **Optimization:** Uses native JavaScript methods (`Math.min/max`, `Array.reduce`) for performance

## Version Compatibility

This API is designed for:

- TypeScript 4.0+
- Node.js 16+
- Modern ES6+ environments with support for:
  - Spread operator
  - Array methods (map, reduce, filter)
  - Math object methods
