# Mathematical Background and Statistical Theory

This document provides a comprehensive mathematical foundation for the statistical methods implemented in the Statistics library. It covers the theoretical background, mathematical definitions, and statistical interpretations of all functions available in the library.

## Table of Contents

- [Introduction to Statistics](#introduction-to-statistics)
- [Basic Statistical Measures](#basic-statistical-measures)
- [Measures of Central Tendency](#measures-of-central-tendency)
- [Measures of Variability](#measures-of-variability)
- [Percentiles and Quantiles](#percentiles-and-quantiles)
- [Bivariate Statistics](#bivariate-statistics)
- [Linear Regression Analysis](#linear-regression-analysis)
- [Probability Distributions](#probability-distributions)
- [Implementation Notes](#implementation-notes)

## Introduction to Statistics

Statistics is the science of collecting, organizing, analyzing, interpreting, and presenting data. The methods implemented in this library fall into two main categories:

### Descriptive Statistics

Descriptive statistics summarize and describe the characteristics of a dataset without making inferences about a larger population.

### Inferential Statistics

Inferential statistics use sample data to make generalizations about a population from which the sample was drawn.

## Basic Statistical Measures

### Population vs Sample

Throughout this documentation, we use **population formulas** for consistency, where the divisor is `n` (the total number of observations) rather than `n-1` (sample size minus one).

**Population Parameter:** A numerical summary of a population
**Sample Statistic:** A numerical summary of a sample

---

## Measures of Central Tendency

Central tendency describes the center or typical value of a dataset.

### Arithmetic Mean (μ)

**Definition:** The arithmetic mean is the sum of all values divided by the number of observations.

**Mathematical Formula:**

```
μ = (1/n) × Σ(xi) from i=1 to n
```

Where:

- `μ` (mu) = population mean
- `n` = number of observations
- `xi` = individual observation
- `Σ` = summation operator

**Properties:**

- The mean is sensitive to outliers
- It's the point that minimizes the sum of squared deviations
- The sum of deviations from the mean equals zero: `Σ(xi - μ) = 0`

**When to Use:**

- When data is normally distributed
- When you need a measure that uses all data points
- For interval or ratio scale data

### Median

**Definition:** The median is the middle value when data is arranged in ascending order.

**Mathematical Definition:**
For a dataset of size `n` ordered as `x₁ ≤ x₂ ≤ ... ≤ xₙ`:

```
Median = {
  x₍ₙ₊₁₎/₂       if n is odd
  (xₙ/₂ + x₍ₙ/₂₊₁₎)/2   if n is even
}
```

**Properties:**

- Robust to outliers
- Divides the dataset into two equal halves
- Always exists and is unique for numerical data
- The median minimizes the sum of absolute deviations

**When to Use:**

- When data contains outliers
- For skewed distributions
- With ordinal, interval, or ratio data

### Mode

**Definition:** The mode is the value(s) that appear most frequently in the dataset.

**Mathematical Representation:**

```
Mode = {x : f(x) = max(f(xi)) for all i}
```

Where `f(x)` is the frequency of value `x`.

**Types of Distributions by Modality:**

- **Unimodal:** One mode
- **Bimodal:** Two modes
- **Multimodal:** More than two modes
- **Amodal:** No mode (all values appear with equal frequency)

**Properties:**

- Can be used with any level of measurement
- May not exist or may not be unique
- Not affected by extreme values
- Useful for categorical data

---

## Measures of Variability

Variability measures describe how spread out the data points are.

### Variance (σ²)

**Definition:** Variance measures the average squared deviation from the mean.

**Mathematical Formula (Population):**

```
σ² = (1/n) × Σ(xi - μ)² from i=1 to n
```

**Alternative Computational Formula:**

```
σ² = (1/n) × [Σ(xi²) - nμ²]
```

**Properties:**

- Always non-negative
- Units are the square of the original units
- Sensitive to outliers
- Variance of a constant is zero

**Statistical Interpretation:**
Variance quantifies the spread of data around the mean. A larger variance indicates greater variability.

### Standard Deviation (σ)

**Definition:** Standard deviation is the square root of variance.

**Mathematical Formula:**

```
σ = √[σ²] = √[(1/n) × Σ(xi - μ)²]
```

**Properties:**

- Same units as the original data
- Most commonly used measure of spread
- Approximately 68% of data falls within μ ± σ for normal distributions
- Approximately 95% of data falls within μ ± 2σ for normal distributions

**Empirical Rule (68-95-99.7 Rule):**
For approximately normal distributions:

- 68% of values lie within μ ± σ
- 95% of values lie within μ ± 2σ
- 99.7% of values lie within μ ± 3σ

### Range

**Definition:** The range is the difference between the maximum and minimum values.

**Mathematical Formula:**

```
Range = max(xi) - min(xi)
```

**Properties:**

- Simple to calculate and understand
- Highly sensitive to outliers
- Uses only two data points
- Always non-negative

---

## Percentiles and Quantiles

### Percentiles

**Definition:** The pth percentile is the value below which p% of the data falls.

**Mathematical Algorithm:**
For percentile P (where 0 ≤ P ≤ 100):

1. Sort data in ascending order: x₁ ≤ x₂ ≤ ... ≤ xₙ
2. Calculate index: `i = (P/100) × (n-1)`
3. If i is an integer: `Percentile = xi+1`
4. If i is not an integer:
   - `lower = floor(i)`
   - `upper = ceil(i)`
   - `weight = i - lower`
   - `Percentile = x(lower+1) × (1-weight) + x(upper+1) × weight`

**Special Cases:**

- 0th percentile = minimum value
- 50th percentile = median
- 100th percentile = maximum value

### Quartiles

**Definition:** Quartiles divide the dataset into four equal parts.

**Mathematical Definitions:**

- **Q1 (First Quartile):** 25th percentile
- **Q2 (Second Quartile):** 50th percentile (median)
- **Q3 (Third Quartile):** 75th percentile

**Interquartile Range (IQR):**

```
IQR = Q3 - Q1
```

**Outlier Detection:**
Values are considered potential outliers if:

```
x < Q1 - 1.5 × IQR  or  x > Q3 + 1.5 × IQR
```

---

## Bivariate Statistics

Bivariate statistics examine relationships between two variables.

### Covariance

**Definition:** Covariance measures how two variables change together.

**Mathematical Formula (Population):**

```
σxy = Cov(X,Y) = (1/n) × Σ(xi - μx)(yi - μy) from i=1 to n
```

**Alternative Formula:**

```
σxy = (1/n) × [Σ(xiyi) - nμxμy]
```

**Properties:**

- Positive covariance: variables tend to increase together
- Negative covariance: one variable tends to decrease as the other increases
- Zero covariance: no linear relationship
- Units are the product of the units of X and Y
- Range: -∞ to +∞

**Interpretation:**

- Cov(X,Y) > 0: Positive linear relationship
- Cov(X,Y) < 0: Negative linear relationship
- Cov(X,Y) = 0: No linear relationship (but nonlinear relationships may exist)

### Correlation Coefficient (Pearson's r)

**Definition:** Correlation coefficient is the standardized measure of linear relationship between two variables.

**Mathematical Formula:**

```
r = ρxy = Cov(X,Y) / (σx × σy) = Σ(xi - μx)(yi - μy) / √[Σ(xi - μx)² × Σ(yi - μy)²]
```

**Properties:**

- Dimensionless (no units)
- Range: -1 ≤ r ≤ +1
- r = +1: Perfect positive linear relationship
- r = -1: Perfect negative linear relationship
- r = 0: No linear relationship
- |r| indicates strength of linear relationship

**Interpretation Guidelines:**

- |r| = 0.00-0.19: Very weak relationship
- |r| = 0.20-0.39: Weak relationship
- |r| = 0.40-0.59: Moderate relationship
- |r| = 0.60-0.79: Strong relationship
- |r| = 0.80-1.00: Very strong relationship

**Important Notes:**

- Correlation does not imply causation
- Only measures linear relationships
- Sensitive to outliers
- Assumes both variables are approximately normally distributed

---

## Linear Regression Analysis

Linear regression models the relationship between a dependent variable Y and an independent variable X.

### Simple Linear Regression Model

**Mathematical Model:**

```
Y = β₀ + β₁X + ε
```

Where:

- `Y` = dependent variable (response)
- `X` = independent variable (predictor)
- `β₀` = y-intercept (population parameter)
- `β₁` = slope (population parameter)
- `ε` = error term

### Parameter Estimation (Least Squares Method)

**Slope Estimation:**

```
b₁ = Σ(xi - x̄)(yi - ȳ) / Σ(xi - x̄)²
```

**Alternative Formula:**

```
b₁ = Cov(X,Y) / Var(X) = σxy / σx²
```

**Intercept Estimation:**

```
b₀ = ȳ - b₁x̄
```

**Prediction Equation:**

```
ŷ = b₀ + b₁x
```

### Coefficient of Determination (R²)

**Definition:** R² represents the proportion of variance in Y explained by X.

**Mathematical Formula:**

```
R² = 1 - (SSres / SStot)
```

Where:

- `SSres = Σ(yi - ŷi)²` (Sum of Squares Residual)
- `SStot = Σ(yi - ȳ)²` (Total Sum of Squares)

**Alternative Formula:**

```
R² = r² (for simple linear regression)
```

**Properties:**

- Range: 0 ≤ R² ≤ 1
- R² = 0: X explains none of the variance in Y
- R² = 1: X explains all of the variance in Y
- Higher R² indicates better model fit

**Interpretation:**

- R² = 0.25: 25% of variance in Y is explained by X
- R² = 0.75: 75% of variance in Y is explained by X

### Residual Analysis

**Residual Definition:**

```
ei = yi - ŷi
```

**Properties of Residuals:**

- Σei = 0 (sum of residuals equals zero)
- Used for model diagnostics
- Should be randomly distributed if model assumptions are met

---

## Probability Distributions

### Normal Distribution

**Probability Density Function:**

```
f(x) = (1/σ√(2π)) × e^(-½((x-μ)/σ)²)
```

**Properties:**

- Bell-shaped, symmetric curve
- Characterized by mean (μ) and standard deviation (σ)
- 68-95-99.7 rule applies
- Many statistical methods assume normality

**Standard Normal Distribution:**

- Mean = 0, Standard Deviation = 1
- Z-score transformation: `z = (x - μ)/σ`

### Central Limit Theorem

**Statement:** For sufficiently large sample sizes (typically n ≥ 30), the sampling distribution of the sample mean approaches a normal distribution, regardless of the population distribution.

**Mathematical Expression:**

```
X̄ ~ N(μ, σ/√n)
```

**Implications:**

- Justifies use of normal distribution for inference
- Enables confidence interval construction
- Foundation for hypothesis testing

---

## Implementation Notes

### Numerical Precision

**Floating Point Considerations:**

- JavaScript uses IEEE 754 double precision
- Approximately 15-16 decimal digits of precision
- Potential for rounding errors in calculations

**Computational Stability:**

- Our variance calculation uses the direct formula rather than the computational formula to maintain clarity
- For very large datasets, consider numerical stability improvements

### Algorithm Complexity

**Time Complexities:**

- Mean, Sum: O(n)
- Median, Percentiles: O(n log n) due to sorting
- Standard Deviation, Variance: O(n)
- Correlation, Covariance: O(n)
- Mode: O(n) with hash map implementation

**Space Complexities:**

- Most operations: O(1) additional space
- Median, Percentiles: O(n) for sorting
- Mode: O(k) where k is number of unique values

### Statistical Assumptions

**Pearson Correlation Assumptions:**

1. Linear relationship between variables
2. Continuous variables
3. Approximately normal distribution
4. Homoscedasticity (constant variance)
5. Independence of observations

**Linear Regression Assumptions:**

1. Linearity: relationship between X and Y is linear
2. Independence: observations are independent
3. Homoscedasticity: constant variance of residuals
4. Normality: residuals are normally distributed
5. No multicollinearity (for multiple regression)

### Handling Edge Cases

**Division by Zero:**

- Standard deviation when all values are identical
- Correlation when one variable has zero variance
- These cases are handled with appropriate error messages

**Empty Datasets:**

- Constructor validation prevents empty datasets
- All methods assume non-empty input

**Invalid Percentiles:**

- Percentile values must be between 0 and 100
- Input validation prevents invalid requests

---

## Mathematical Notation Reference

### Symbols Used

- `μ` (mu): Population mean
- `σ` (sigma): Population standard deviation
- `σ²`: Population variance
- `x̄` (x-bar): Sample mean
- `s`: Sample standard deviation
- `s²`: Sample variance
- `n`: Number of observations
- `Σ` (capital sigma): Summation
- `√`: Square root
- `ρ` (rho): Population correlation coefficient
- `r`: Sample correlation coefficient
- `β₀, β₁`: Regression coefficients (population)
- `b₀, b₁`: Regression coefficients (sample estimates)
- `ŷ`: Predicted value
- `ε`: Error term
- `e`: Residual

### Common Mathematical Operations

**Summation Notation:**

```
Σ(xi) from i=1 to n = x₁ + x₂ + ... + xₙ
```

**Product Notation:**

```
Π(xi) from i=1 to n = x₁ × x₂ × ... × xₙ
```

**Absolute Value:**

```
|x| = distance from zero
```

**Floor and Ceiling Functions:**

```
floor(x) = largest integer ≤ x
ceil(x) = smallest integer ≥ x
```

---

## Further Reading

### Recommended Textbooks

1. **"Introduction to Mathematical Statistics" by Hogg, McKean, and Craig**

   - Comprehensive mathematical treatment of statistical theory

2. **"Mathematical Statistics with Applications" by Wackerly, Mendenhall, and Scheaffer**

   - Good balance of theory and applications

3. **"The Elements of Statistical Learning" by Hastie, Tibshirani, and Friedman**
   - Advanced statistical learning methods

### Online Resources

1. **Khan Academy Statistics and Probability**

   - Excellent visual explanations of basic concepts

2. **MIT OpenCourseWare - Introduction to Probability and Statistics**

   - University-level mathematical treatment

3. **StatQuest YouTube Channel**
   - Clear explanations of statistical concepts

### Mathematical Foundations

For deeper understanding of the mathematical foundations:

1. **Calculus:** Understanding derivatives and integrals helps with probability density functions
2. **Linear Algebra:** Matrix operations are fundamental to multivariate statistics
3. **Probability Theory:** Foundation for all statistical inference
4. **Real Analysis:** For rigorous treatment of limits and convergence

---

This mathematical background provides the theoretical foundation necessary to understand and properly apply the statistical methods implemented in the Statistics library. Each formula and concept has been carefully explained to enable both practical application and deeper theoretical understanding.
