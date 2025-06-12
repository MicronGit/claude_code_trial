# Statistics Library - Examples and Use Cases

This document provides comprehensive examples and real-world use cases for the Statistics library, demonstrating practical applications across various domains including data analysis, business analytics, academic research, and more.

## Table of Contents

- [Getting Started](#getting-started)
- [Data Analysis Examples](#data-analysis-examples)
- [Business Analytics](#business-analytics)
- [Academic Research](#academic-research)
- [Financial Analysis](#financial-analysis)
- [Quality Control & Performance Monitoring](#quality-control-performance-monitoring)
- [Advanced Use Cases](#advanced-use-cases)
- [Performance Tips](#performance-tips)

## Getting Started

### Basic Setup

```typescript
import { Statistics } from '../src/statistics';

// Sample dataset for demonstrations
const sampleData = [23, 45, 56, 78, 32, 67, 89, 12, 34, 56];
const stats = new Statistics(sampleData);

// Quick overview of your data
console.log('Dataset Overview:');
console.log('Count:', stats.getCount());
console.log('Mean:', stats.mean().toFixed(2));
console.log('Median:', stats.median());
console.log('Standard Deviation:', stats.standardDeviation().toFixed(2));
console.log('Range:', stats.range());
```

---

## Data Analysis Examples

### 1. Survey Response Analysis

Analyzing customer satisfaction survey responses on a 1-10 scale.

```typescript
// Customer satisfaction scores (1-10 scale)
const satisfactionScores = [
  8, 7, 9, 6, 8, 7, 9, 8, 6, 7, 9, 8, 7, 6, 9, 8, 7, 8, 9, 6,
];
const satisfaction = new Statistics(satisfactionScores);

console.log('=== Customer Satisfaction Analysis ===');
console.log(`Sample size: ${satisfaction.getCount()} responses`);
console.log(`Average satisfaction: ${satisfaction.mean().toFixed(2)}/10`);
console.log(`Median satisfaction: ${satisfaction.median()}/10`);
console.log(`Most common rating(s): ${satisfaction.mode().join(', ')}`);

// Analyze distribution
const { q1, q2, q3 } = satisfaction.quartiles();
console.log('\nDistribution Analysis:');
console.log(`25% of customers rated: ≤${q1}`);
console.log(`50% of customers rated: ≤${q2} (median)`);
console.log(`75% of customers rated: ≤${q3}`);

// Identify outliers (scores below Q1 - 1.5*IQR or above Q3 + 1.5*IQR)
const iqr = q3 - q1;
const lowerBound = q1 - 1.5 * iqr;
const upperBound = q3 + 1.5 * iqr;

const outliers = satisfactionScores.filter(
  score => score < lowerBound || score > upperBound
);
console.log(
  `\nPotential outliers: ${outliers.length > 0 ? outliers.join(', ') : 'None detected'}`
);

// Calculate percentage in each satisfaction category
const lowSatisfaction = satisfactionScores.filter(score => score <= 5).length;
const mediumSatisfaction = satisfactionScores.filter(
  score => score > 5 && score <= 7
).length;
const highSatisfaction = satisfactionScores.filter(score => score > 7).length;

console.log('\nSatisfaction Categories:');
console.log(
  `Low (1-5): ${((lowSatisfaction / satisfaction.getCount()) * 100).toFixed(1)}%`
);
console.log(
  `Medium (6-7): ${((mediumSatisfaction / satisfaction.getCount()) * 100).toFixed(1)}%`
);
console.log(
  `High (8-10): ${((highSatisfaction / satisfaction.getCount()) * 100).toFixed(1)}%`
);
```

### 2. Website Performance Analysis

Analyzing website load times and identifying performance patterns.

```typescript
// Website load times in seconds
const loadTimes = [
  1.2, 0.8, 2.1, 1.5, 0.9, 3.2, 1.1, 1.8, 0.7, 2.5, 1.3, 1.6, 0.8, 2.0, 1.4,
];
const performance = new Statistics(loadTimes);

console.log('=== Website Performance Analysis ===');
console.log(`Average load time: ${performance.mean().toFixed(2)} seconds`);
console.log(`Median load time: ${performance.median().toFixed(2)} seconds`);
console.log(`Fastest load time: ${performance.min().toFixed(2)} seconds`);
console.log(`Slowest load time: ${performance.max().toFixed(2)} seconds`);
console.log(
  `Performance variability (std dev): ${performance.standardDeviation().toFixed(2)} seconds`
);

// Performance benchmarks
const p95 = performance.percentile(95);
const p99 = performance.percentile(99);

console.log('\nPerformance Benchmarks:');
console.log(`95% of pages load within: ${p95.toFixed(2)} seconds`);
console.log(`99% of pages load within: ${p99.toFixed(2)} seconds`);

// Identify slow pages (above 95th percentile)
const slowPages = loadTimes.filter(time => time > p95);
console.log(
  `\nSlow loading instances: ${slowPages.length} (${((slowPages.length / performance.getCount()) * 100).toFixed(1)}%)`
);

// Performance targets
const targetTime = 2.0; // seconds
const meetingTarget = loadTimes.filter(time => time <= targetTime).length;
console.log(
  `\nPages meeting 2-second target: ${meetingTarget}/${performance.getCount()} (${((meetingTarget / performance.getCount()) * 100).toFixed(1)}%)`
);
```

---

## Business Analytics

### 1. Sales Performance Analysis

Comprehensive analysis of monthly sales data with trend identification.

```typescript
// Monthly sales data for the year (in thousands)
const monthlySales = [
  145, 167, 134, 189, 201, 188, 176, 198, 165, 189, 204, 220,
];
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const salesStats = new Statistics(monthlySales);

console.log('=== Annual Sales Performance Analysis ===');
console.log(`Total annual sales: $${salesStats.sum()}K`);
console.log(`Average monthly sales: $${salesStats.mean().toFixed(1)}K`);
console.log(`Best month: $${salesStats.max()}K`);
console.log(`Worst month: $${salesStats.min()}K`);
console.log(
  `Sales volatility: $${salesStats.standardDeviation().toFixed(1)}K (std dev)`
);

// Quarterly analysis
const q1Sales = monthlySales.slice(0, 3);
const q2Sales = monthlySales.slice(3, 6);
const q3Sales = monthlySales.slice(6, 9);
const q4Sales = monthlySales.slice(9, 12);

console.log('\nQuarterly Performance:');
console.log(`Q1: $${Statistics.mean(q1Sales).toFixed(1)}K avg`);
console.log(`Q2: $${Statistics.mean(q2Sales).toFixed(1)}K avg`);
console.log(`Q3: $${Statistics.mean(q3Sales).toFixed(1)}K avg`);
console.log(`Q4: $${Statistics.mean(q4Sales).toFixed(1)}K avg`);

// Trend analysis using linear regression
const trendAnalysis = salesStats.linearRegression(months);

console.log('\nTrend Analysis:');
console.log(
  `Monthly growth trend: $${trendAnalysis.slope.toFixed(2)}K per month`
);
console.log(
  `Annual growth rate: $${(trendAnalysis.slope * 12).toFixed(1)}K per year`
);
console.log(
  `Trend strength (R²): ${(trendAnalysis.rSquared * 100).toFixed(1)}%`
);
console.log(`Correlation with time: ${trendAnalysis.correlation.toFixed(3)}`);

// Sales forecasting
console.log('\nSales Forecast:');
for (let month = 13; month <= 15; month++) {
  const forecast = trendAnalysis.predict(month);
  console.log(`Month ${month}: $${forecast.toFixed(1)}K (projected)`);
}

// Performance categorization
const { q1, q2, q3 } = salesStats.quartiles();
console.log('\nPerformance Categories:');
console.log(
  `Low performance months (≤$${q1}K): ${monthlySales.filter(s => s <= q1).length}`
);
console.log(
  `Medium performance months ($${q1}K-$${q3}K): ${monthlySales.filter(s => s > q1 && s <= q3).length}`
);
console.log(
  `High performance months (>$${q3}K): ${monthlySales.filter(s => s > q3).length}`
);
```

### 2. Employee Performance Evaluation

Analyzing employee performance scores and identifying patterns.

```typescript
// Performance scores for a team (0-100 scale)
const performanceScores = [
  78, 85, 92, 67, 88, 91, 73, 89, 95, 82, 77, 90, 86, 74, 93,
];
const experience = [2, 5, 8, 1, 6, 7, 3, 6, 9, 4, 2, 7, 5, 2, 8]; // Years of experience

const performance = new Statistics(performanceScores);
const expStats = new Statistics(experience);

console.log('=== Team Performance Analysis ===');
console.log(`Team size: ${performance.getCount()} employees`);
console.log(`Average performance: ${performance.mean().toFixed(1)}/100`);
console.log(`Performance range: ${performance.min()}-${performance.max()}`);
console.log(
  `Performance consistency (std dev): ${performance.standardDeviation().toFixed(1)}`
);

// Performance distribution
const { q1, q2, q3 } = performance.quartiles();
console.log('\nPerformance Distribution:');
console.log(
  `Top performers (>${q3}): ${performanceScores.filter(s => s > q3).length} employees`
);
console.log(
  `Average performers (${q1}-${q3}): ${performanceScores.filter(s => s >= q1 && s <= q3).length} employees`
);
console.log(
  `Needs improvement (<${q1}): ${performanceScores.filter(s => s < q1).length} employees`
);

// Correlation between experience and performance
const correlation = performance.correlation(experience);
console.log(
  `\nExperience vs Performance correlation: ${correlation.toFixed(3)}`
);

if (Math.abs(correlation) > 0.5) {
  console.log(
    `${correlation > 0 ? 'Strong positive' : 'Strong negative'} correlation detected`
  );
} else if (Math.abs(correlation) > 0.3) {
  console.log(
    `${correlation > 0 ? 'Moderate positive' : 'Moderate negative'} correlation detected`
  );
} else {
  console.log('Weak correlation between experience and performance');
}

// Regression analysis for performance prediction
const regression = Statistics.linearRegression(experience, performanceScores);
console.log('\nPerformance Prediction Model:');
console.log(`Base performance: ${regression.intercept.toFixed(1)}`);
console.log(
  `Performance increase per year: ${regression.slope.toFixed(2)} points`
);
console.log(`Model accuracy (R²): ${(regression.rSquared * 100).toFixed(1)}%`);

// Predict performance for new hires
console.log('\nPredicted performance for new hires:');
[1, 3, 5, 10].forEach(years => {
  const predicted = regression.predict(years);
  console.log(`${years} years experience: ${predicted.toFixed(1)}/100`);
});
```

---

## Academic Research

### 1. Educational Assessment Analysis

Analyzing student test scores and identifying learning patterns.

```typescript
// Student test scores and study hours
const testScores = [72, 85, 91, 68, 79, 88, 95, 76, 82, 89, 73, 87, 92, 78, 84];
const studyHours = [8, 15, 20, 5, 12, 18, 22, 10, 14, 19, 9, 16, 21, 11, 15];

const scores = new Statistics(testScores);
const study = new Statistics(studyHours);

console.log('=== Educational Assessment Analysis ===');
console.log(`Class size: ${scores.getCount()} students`);
console.log(`Average test score: ${scores.mean().toFixed(1)}%`);
console.log(`Median test score: ${scores.median()}%`);
console.log(`Score range: ${scores.min()}% - ${scores.max()}%`);
console.log(
  `Score distribution (std dev): ${scores.standardDeviation().toFixed(1)}`
);

// Grade distribution
const gradeA = testScores.filter(score => score >= 90).length;
const gradeB = testScores.filter(score => score >= 80 && score < 90).length;
const gradeC = testScores.filter(score => score >= 70 && score < 80).length;
const gradeD = testScores.filter(score => score >= 60 && score < 70).length;
const gradeF = testScores.filter(score => score < 60).length;

console.log('\nGrade Distribution:');
console.log(
  `A (90-100): ${gradeA} students (${((gradeA / scores.getCount()) * 100).toFixed(1)}%)`
);
console.log(
  `B (80-89): ${gradeB} students (${((gradeB / scores.getCount()) * 100).toFixed(1)}%)`
);
console.log(
  `C (70-79): ${gradeC} students (${((gradeC / scores.getCount()) * 100).toFixed(1)}%)`
);
console.log(
  `D (60-69): ${gradeD} students (${((gradeD / scores.getCount()) * 100).toFixed(1)}%)`
);
console.log(
  `F (<60): ${gradeF} students (${((gradeF / scores.getCount()) * 100).toFixed(1)}%)`
);

// Study effectiveness analysis
const correlation = scores.correlation(studyHours);
console.log(
  `\nStudy Hours vs Test Score correlation: ${correlation.toFixed(3)}`
);

const regression = Statistics.linearRegression(studyHours, testScores);
console.log('\nStudy Effectiveness Model:');
console.log(`Base score (0 study hours): ${regression.intercept.toFixed(1)}%`);
console.log(
  `Score improvement per study hour: ${regression.slope.toFixed(2)} points`
);
console.log(
  `Study effectiveness (R²): ${(regression.rSquared * 100).toFixed(1)}%`
);

// Identify students who may need help
const { q1 } = scores.quartiles();
const strugglingStudents = testScores.filter(score => score <= q1);
console.log(
  `\nStudents who may need additional support: ${strugglingStudents.length} (scores ≤${q1}%)`
);

// Optimal study hours recommendation
console.log('\nRecommended study hours for target scores:');
[70, 80, 90].forEach(targetScore => {
  const recommendedHours =
    (targetScore - regression.intercept) / regression.slope;
  console.log(
    `For ${targetScore}%: ${Math.max(0, recommendedHours).toFixed(1)} hours`
  );
});
```

### 2. Research Data Analysis

Analyzing experimental data with statistical significance testing.

```typescript
// Experimental results: before and after treatment
const beforeTreatment = [
  34, 37, 39, 35, 38, 36, 40, 33, 37, 38, 35, 39, 36, 34, 40,
];
const afterTreatment = [
  45, 48, 52, 44, 49, 47, 53, 42, 48, 50, 46, 52, 47, 45, 53,
];

const before = new Statistics(beforeTreatment);
const after = new Statistics(afterTreatment);

console.log('=== Research Data Analysis ===');
console.log(`Sample size: ${before.getCount()} participants`);

console.log('\nBefore Treatment:');
console.log(`Mean: ${before.mean().toFixed(2)}`);
console.log(`Std Dev: ${before.standardDeviation().toFixed(2)}`);
console.log(`Range: ${before.min()} - ${before.max()}`);

console.log('\nAfter Treatment:');
console.log(`Mean: ${after.mean().toFixed(2)}`);
console.log(`Std Dev: ${after.standardDeviation().toFixed(2)}`);
console.log(`Range: ${after.min()} - ${after.max()}`);

// Effect size calculation
const meanDifference = after.mean() - before.mean();
const pooledStdDev = Math.sqrt(
  (Math.pow(before.standardDeviation(), 2) +
    Math.pow(after.standardDeviation(), 2)) /
    2
);
const cohensD = meanDifference / pooledStdDev;

console.log('\nTreatment Effect Analysis:');
console.log(`Mean improvement: ${meanDifference.toFixed(2)} points`);
console.log(`Effect size (Cohen's d): ${cohensD.toFixed(3)}`);

if (Math.abs(cohensD) >= 0.8) {
  console.log('Large effect size detected');
} else if (Math.abs(cohensD) >= 0.5) {
  console.log('Medium effect size detected');
} else if (Math.abs(cohensD) >= 0.2) {
  console.log('Small effect size detected');
} else {
  console.log('Negligible effect size');
}

// Individual participant analysis
const improvements = afterTreatment.map(
  (after, i) => after - beforeTreatment[i]
);
const improvementStats = new Statistics(improvements);

console.log('\nIndividual Improvements:');
console.log(`Average improvement: ${improvementStats.mean().toFixed(2)}`);
console.log(
  `Improvement std dev: ${improvementStats.standardDeviation().toFixed(2)}`
);
console.log(
  `Participants who improved: ${improvements.filter(imp => imp > 0).length}/${improvements.length}`
);
console.log(`Maximum improvement: ${improvementStats.max()}`);
console.log(`Minimum change: ${improvementStats.min()}`);

// Correlation between before and after scores
const correlation = before.correlation(afterTreatment);
console.log(`\nBefore/After correlation: ${correlation.toFixed(3)}`);
```

---

## Financial Analysis

### 1. Investment Portfolio Analysis

Analyzing investment returns and risk assessment.

```typescript
// Monthly returns for different assets (as percentages)
const stockReturns = [
  2.5, -1.2, 4.1, 0.8, -2.1, 3.7, 1.9, -0.5, 2.8, 1.4, -1.8, 3.2,
];
const bondReturns = [
  0.8, 1.1, 0.9, 1.2, 0.7, 1.0, 1.3, 0.6, 0.9, 1.1, 0.8, 1.2,
];
const cryptoReturns = [
  15.2, -8.7, 22.1, -12.4, 18.9, -15.2, 25.8, -18.1, 12.7, -9.3, 20.4, -11.8,
];

const stocks = new Statistics(stockReturns);
const bonds = new Statistics(bondReturns);
const crypto = new Statistics(cryptoReturns);

console.log('=== Investment Portfolio Analysis ===');

// Risk-Return Analysis
console.log('Asset Performance Summary:');
console.log(
  `Stocks - Return: ${stocks.mean().toFixed(2)}%, Risk: ${stocks.standardDeviation().toFixed(2)}%`
);
console.log(
  `Bonds - Return: ${bonds.mean().toFixed(2)}%, Risk: ${bonds.standardDeviation().toFixed(2)}%`
);
console.log(
  `Crypto - Return: ${crypto.mean().toFixed(2)}%, Risk: ${crypto.standardDeviation().toFixed(2)}%`
);

// Sharpe Ratio calculation (assuming risk-free rate of 1%)
const riskFreeRate = 1.0;
const stockSharpe = (stocks.mean() - riskFreeRate) / stocks.standardDeviation();
const bondSharpe = (bonds.mean() - riskFreeRate) / bonds.standardDeviation();
const cryptoSharpe =
  (crypto.mean() - riskFreeRate) / crypto.standardDeviation();

console.log('\nRisk-Adjusted Returns (Sharpe Ratio):');
console.log(`Stocks: ${stockSharpe.toFixed(3)}`);
console.log(`Bonds: ${bondSharpe.toFixed(3)}`);
console.log(`Crypto: ${cryptoSharpe.toFixed(3)}`);

// Value at Risk (VaR) calculation at 5% confidence level
const stockVaR = stocks.percentile(5);
const bondVaR = bonds.percentile(5);
const cryptoVaR = crypto.percentile(5);

console.log('\nValue at Risk (5% confidence):');
console.log(`Stocks: ${stockVaR.toFixed(2)}% (worst monthly loss)`);
console.log(`Bonds: ${bondVaR.toFixed(2)}% (worst monthly loss)`);
console.log(`Crypto: ${cryptoVaR.toFixed(2)}% (worst monthly loss)`);

// Portfolio optimization (equal weight)
const portfolioReturns = stockReturns.map(
  (stock, i) => (stock + bondReturns[i] + cryptoReturns[i]) / 3
);
const portfolio = new Statistics(portfolioReturns);

console.log('\nDiversified Portfolio (Equal Weight):');
console.log(`Average return: ${portfolio.mean().toFixed(2)}%`);
console.log(`Portfolio risk: ${portfolio.standardDeviation().toFixed(2)}%`);
console.log(
  `Portfolio Sharpe: ${((portfolio.mean() - riskFreeRate) / portfolio.standardDeviation()).toFixed(3)}`
);
console.log(`Portfolio VaR: ${portfolio.percentile(5).toFixed(2)}%`);

// Correlation analysis
console.log('\nAsset Correlations:');
console.log(`Stocks-Bonds: ${stocks.correlation(bondReturns).toFixed(3)}`);
console.log(`Stocks-Crypto: ${stocks.correlation(cryptoReturns).toFixed(3)}`);
console.log(`Bonds-Crypto: ${bonds.correlation(cryptoReturns).toFixed(3)}`);
```

### 2. Market Analysis and Forecasting

Analyzing market trends and creating price forecasts.

```typescript
// Stock price data over 24 months
const stockPrices = [
  150, 155, 148, 162, 159, 167, 172, 168, 175, 171, 180, 177, 185, 192, 188,
  195, 201, 198, 205, 212, 208, 218, 215, 225,
];

const timeperiods = Array.from({ length: 24 }, (_, i) => i + 1);
const priceStats = new Statistics(stockPrices);

console.log('=== Market Analysis and Forecasting ===');
console.log(`Analysis period: ${stockPrices.length} months`);
console.log(`Starting price: $${stockPrices[0]}`);
console.log(`Ending price: $${stockPrices[stockPrices.length - 1]}`);
console.log(`Average price: $${priceStats.mean().toFixed(2)}`);

// Calculate monthly returns
const monthlyReturns = stockPrices
  .slice(1)
  .map((price, i) => ((price - stockPrices[i]) / stockPrices[i]) * 100);
const returns = new Statistics(monthlyReturns);

console.log('\nReturn Analysis:');
console.log(`Average monthly return: ${returns.mean().toFixed(2)}%`);
console.log(`Return volatility: ${returns.standardDeviation().toFixed(2)}%`);
console.log(`Best month: +${returns.max().toFixed(2)}%`);
console.log(`Worst month: ${returns.min().toFixed(2)}%`);

// Trend analysis
const trendAnalysis = Statistics.linearRegression(timeperiods, stockPrices);
console.log('\nTrend Analysis:');
console.log(
  `Monthly price trend: $${trendAnalysis.slope.toFixed(2)} per month`
);
console.log(`Annual trend: $${(trendAnalysis.slope * 12).toFixed(2)} per year`);
console.log(`Trend strength: ${(trendAnalysis.rSquared * 100).toFixed(1)}%`);

// Price forecasting
console.log('\nPrice Forecasts:');
for (let month = 25; month <= 27; month++) {
  const forecast = trendAnalysis.predict(month);
  const confidence = trendAnalysis.rSquared;
  console.log(
    `Month ${month}: $${forecast.toFixed(2)} (confidence: ${(confidence * 100).toFixed(1)}%)`
  );
}

// Support and resistance levels
const { q1, q2, q3 } = priceStats.quartiles();
console.log('\nTechnical Levels:');
console.log(`Support level (Q1): $${q1.toFixed(2)}`);
console.log(`Fair value (Median): $${q2.toFixed(2)}`);
console.log(`Resistance level (Q3): $${q3.toFixed(2)}`);

// Risk assessment
const currentPrice = stockPrices[stockPrices.length - 1];
const priceVolatility = priceStats.standardDeviation();
console.log('\nRisk Assessment:');
console.log(`Current price: $${currentPrice}`);
console.log(`Price volatility: $${priceVolatility.toFixed(2)}`);
console.log(
  `68% confidence range: $${(currentPrice - priceVolatility).toFixed(2)} - $${(currentPrice + priceVolatility).toFixed(2)}`
);
console.log(
  `95% confidence range: $${(currentPrice - 2 * priceVolatility).toFixed(2)} - $${(currentPrice + 2 * priceVolatility).toFixed(2)}`
);
```

---

## Quality Control & Performance Monitoring

### 1. Manufacturing Quality Control

Monitoring product quality and identifying defects.

```typescript
// Product measurements (target: 100mm, tolerance: ±2mm)
const measurements = [
  99.8, 100.2, 99.9, 100.1, 99.7, 100.3, 99.8, 100.0, 99.9, 100.2, 99.6, 100.4,
  99.8, 100.1, 99.9, 100.0, 99.7, 100.2, 99.8, 100.1, 100.5, 99.5, 100.0, 99.9,
  100.2, 99.8, 100.1, 99.9, 100.0, 100.3,
];

const target = 100.0;
const upperLimit = 102.0;
const lowerLimit = 98.0;

const quality = new Statistics(measurements);

console.log('=== Manufacturing Quality Control Analysis ===');
console.log(`Sample size: ${quality.getCount()} units`);
console.log(`Target value: ${target}mm`);
console.log(`Specification limits: ${lowerLimit}mm - ${upperLimit}mm`);

// Process capability analysis
console.log('\nProcess Performance:');
console.log(`Process mean: ${quality.mean().toFixed(3)}mm`);
console.log(`Process std dev: ${quality.standardDeviation().toFixed(3)}mm`);
console.log(`Process range: ${quality.min()}mm - ${quality.max()}mm`);

// Calculate process capability indices
const processStdDev = quality.standardDeviation();
const cp = (upperLimit - lowerLimit) / (6 * processStdDev);
const cpk = Math.min(
  (upperLimit - quality.mean()) / (3 * processStdDev),
  (quality.mean() - lowerLimit) / (3 * processStdDev)
);

console.log('\nProcess Capability:');
console.log(`Cp (potential capability): ${cp.toFixed(3)}`);
console.log(`Cpk (actual capability): ${cpk.toFixed(3)}`);

if (cpk >= 1.33) {
  console.log('Process capability: Excellent');
} else if (cpk >= 1.0) {
  console.log('Process capability: Adequate');
} else {
  console.log('Process capability: Poor - improvement needed');
}

// Defect analysis
const defects = measurements.filter(m => m < lowerLimit || m > upperLimit);
const defectRate = (defects.length / measurements.length) * 100;

console.log('\nDefect Analysis:');
console.log(`Out-of-spec units: ${defects.length}/${measurements.length}`);
console.log(`Defect rate: ${defectRate.toFixed(2)}%`);
console.log(`Yield: ${(100 - defectRate).toFixed(2)}%`);

if (defects.length > 0) {
  console.log(`Defective measurements: ${defects.join(', ')}mm`);
}

// Process control limits (3-sigma)
const ucl = quality.mean() + 3 * processStdDev;
const lcl = quality.mean() - 3 * processStdDev;

console.log('\nControl Limits (3-sigma):');
console.log(`Upper Control Limit: ${ucl.toFixed(3)}mm`);
console.log(`Lower Control Limit: ${lcl.toFixed(3)}mm`);

// Identify measurements outside control limits
const outOfControl = measurements.filter(m => m > ucl || m < lcl);
if (outOfControl.length > 0) {
  console.log(`Out-of-control points: ${outOfControl.length}`);
} else {
  console.log('Process is in statistical control');
}
```

### 2. System Performance Monitoring

Monitoring server response times and system health.

```typescript
// Server response times in milliseconds over 24 hours
const responseTimes = [
  45, 52, 48, 65, 43, 58, 61, 47, 72, 55, 49, 68, 78, 82, 91, 76, 88, 95, 102,
  87, 93, 89, 85, 79, 67, 71, 63, 59, 66, 74, 69, 62, 57, 73, 68, 64, 58, 61,
  55, 49, 53, 47, 44, 51, 46, 42, 48, 45,
];

const performance = new Statistics(responseTimes);

console.log('=== System Performance Monitoring ===');
console.log(
  `Monitoring period: 24 hours (${performance.getCount()} measurements)`
);

// Performance metrics
console.log('\nPerformance Metrics:');
console.log(`Average response time: ${performance.mean().toFixed(1)}ms`);
console.log(`Median response time: ${performance.median()}ms`);
console.log(`Fastest response: ${performance.min()}ms`);
console.log(`Slowest response: ${performance.max()}ms`);
console.log(
  `Performance variability: ${performance.standardDeviation().toFixed(1)}ms`
);

// SLA compliance analysis (target: 95% under 80ms)
const slaThreshold = 80;
const withinSLA = responseTimes.filter(time => time <= slaThreshold).length;
const slaCompliance = (withinSLA / responseTimes.length) * 100;

console.log('\nSLA Compliance:');
console.log(`Target: 95% of requests under ${slaThreshold}ms`);
console.log(`Actual: ${slaCompliance.toFixed(1)}% under ${slaThreshold}ms`);
console.log(
  `SLA Status: ${slaCompliance >= 95 ? 'MEETING' : 'FAILING'} target`
);

// Percentile analysis
console.log('\nPercentile Analysis:');
console.log(`50th percentile (median): ${performance.percentile(50)}ms`);
console.log(`90th percentile: ${performance.percentile(90)}ms`);
console.log(`95th percentile: ${performance.percentile(95)}ms`);
console.log(`99th percentile: ${performance.percentile(99)}ms`);

// Performance alerting thresholds
const { q1, q2, q3 } = performance.quartiles();
const iqr = q3 - q1;
const alertThreshold = q3 + 1.5 * iqr; // Outlier detection

console.log('\nAlert Thresholds:');
console.log(`Warning threshold (Q3): ${q3}ms`);
console.log(`Critical threshold (outlier): ${alertThreshold.toFixed(1)}ms`);

const criticalResponses = responseTimes.filter(time => time > alertThreshold);
if (criticalResponses.length > 0) {
  console.log(`Critical responses detected: ${criticalResponses.length}`);
  console.log(`Critical response times: ${criticalResponses.join(', ')}ms`);
} else {
  console.log('No critical response times detected');
}

// Trend analysis for performance degradation
const timePoints = Array.from(
  { length: responseTimes.length },
  (_, i) => i + 1
);
const trendAnalysis = Statistics.linearRegression(timePoints, responseTimes);

console.log('\nTrend Analysis:');
console.log(
  `Performance trend: ${trendAnalysis.slope > 0 ? 'degrading' : 'improving'}`
);
console.log(
  `Rate of change: ${Math.abs(trendAnalysis.slope).toFixed(3)}ms per hour`
);
console.log(
  `Trend significance: ${(trendAnalysis.rSquared * 100).toFixed(1)}%`
);

if (trendAnalysis.slope > 0.5) {
  console.log('WARNING: Significant performance degradation detected');
} else if (trendAnalysis.slope < -0.5) {
  console.log('GOOD: Performance improvement trend detected');
} else {
  console.log('INFO: Performance appears stable');
}
```

---

## Advanced Use Cases

### 1. A/B Testing Analysis

Comparing performance between two versions of a product feature.

```typescript
// A/B test results: conversion rates (%)
const controlGroup = [
  2.3, 2.8, 2.1, 2.9, 2.4, 2.7, 2.2, 2.6, 2.5, 2.8, 2.3, 2.7, 2.4, 2.9, 2.2,
];
const testGroup = [
  3.1, 3.4, 2.9, 3.6, 3.2, 3.5, 3.0, 3.3, 3.4, 3.7, 3.1, 3.5, 3.2, 3.8, 3.0,
];

const control = new Statistics(controlGroup);
const test = new Statistics(testGroup);

console.log('=== A/B Testing Analysis ===');
console.log(
  `Sample sizes: Control = ${control.getCount()}, Test = ${test.getCount()}`
);

// Basic statistics
console.log('\nControl Group (A):');
console.log(`Average conversion: ${control.mean().toFixed(2)}%`);
console.log(`Std deviation: ${control.standardDeviation().toFixed(2)}%`);
console.log(`Range: ${control.min()}% - ${control.max()}%`);

console.log('\nTest Group (B):');
console.log(`Average conversion: ${test.mean().toFixed(2)}%`);
console.log(`Std deviation: ${test.standardDeviation().toFixed(2)}%`);
console.log(`Range: ${test.min()}% - ${test.max()}%`);

// Effect analysis
const absoluteLift = test.mean() - control.mean();
const relativeLift = (absoluteLift / control.mean()) * 100;

console.log('\nTest Results:');
console.log(`Absolute lift: ${absoluteLift.toFixed(2)} percentage points`);
console.log(`Relative lift: ${relativeLift.toFixed(1)}%`);

// Statistical significance indicators
const pooledStdDev = Math.sqrt(
  (Math.pow(control.standardDeviation(), 2) +
    Math.pow(test.standardDeviation(), 2)) /
    2
);
const effectSize = absoluteLift / pooledStdDev;

console.log(`Effect size (Cohen's d): ${effectSize.toFixed(3)}`);

if (Math.abs(effectSize) >= 0.8) {
  console.log('Large effect detected');
} else if (Math.abs(effectSize) >= 0.5) {
  console.log('Medium effect detected');
} else if (Math.abs(effectSize) >= 0.2) {
  console.log('Small effect detected');
} else {
  console.log('Minimal effect detected');
}

// Confidence intervals (approximate)
const controlSE = control.standardDeviation() / Math.sqrt(control.getCount());
const testSE = test.standardDeviation() / Math.sqrt(test.getCount());
const confidenceLevel = 1.96; // 95% confidence

console.log('\nConfidence Intervals (95%):');
console.log(
  `Control: ${(control.mean() - confidenceLevel * controlSE).toFixed(2)}% - ${(control.mean() + confidenceLevel * controlSE).toFixed(2)}%`
);
console.log(
  `Test: ${(test.mean() - confidenceLevel * testSE).toFixed(2)}% - ${(test.mean() + confidenceLevel * testSE).toFixed(2)}%`
);

// Business impact estimation
const dailyUsers = 10000;
const currentRevenue = 50; // dollars per conversion

console.log('\nBusiness Impact Estimation:');
console.log(`Daily users: ${dailyUsers.toLocaleString()}`);
console.log(`Revenue per conversion: $${currentRevenue}`);

const currentConversions = dailyUsers * (control.mean() / 100);
const newConversions = dailyUsers * (test.mean() / 100);
const additionalConversions = newConversions - currentConversions;
const additionalRevenue = additionalConversions * currentRevenue;

console.log(`Current daily conversions: ${currentConversions.toFixed(0)}`);
console.log(`Projected daily conversions: ${newConversions.toFixed(0)}`);
console.log(
  `Additional daily conversions: ${additionalConversions.toFixed(0)}`
);
console.log(`Additional daily revenue: $${additionalRevenue.toFixed(0)}`);
console.log(
  `Additional annual revenue: $${(additionalRevenue * 365).toLocaleString()}`
);
```

### 2. Multi-Variable Regression Analysis

Analyzing relationships between multiple variables.

```typescript
// House price analysis: size (sqft), age (years), price ($1000s)
const houseSizes = [1200, 1500, 1800, 2200, 2500, 1900, 1600, 2100, 1400, 2300];
const houseAges = [5, 12, 8, 3, 15, 7, 20, 4, 18, 6];
const housePrices = [280, 320, 380, 450, 480, 400, 300, 440, 250, 470];

const sizes = new Statistics(houseSizes);
const ages = new Statistics(houseAges);
const prices = new Statistics(housePrices);

console.log('=== Multi-Variable Real Estate Analysis ===');
console.log(`Sample size: ${sizes.getCount()} properties`);

// Basic statistics for each variable
console.log('\nProperty Characteristics:');
console.log(`Average size: ${sizes.mean().toFixed(0)} sqft`);
console.log(`Average age: ${ages.mean().toFixed(1)} years`);
console.log(`Average price: $${prices.mean().toFixed(0)}K`);

// Correlation analysis
const sizePrice = sizes.correlation(housePrices);
const agePrice = ages.correlation(housePrices);
const sizeAge = sizes.correlation(houseAges);

console.log('\nCorrelation Analysis:');
console.log(`Size vs Price: ${sizePrice.toFixed(3)}`);
console.log(`Age vs Price: ${agePrice.toFixed(3)}`);
console.log(`Size vs Age: ${sizeAge.toFixed(3)}`);

// Individual regression analyses
const sizeRegression = sizes.linearRegression(housePrices);
const ageRegression = ages.linearRegression(housePrices);

console.log('\nSize-Price Relationship:');
console.log(`Base price: $${sizeRegression.intercept.toFixed(0)}K`);
console.log(`Price per sqft: $${sizeRegression.slope.toFixed(0)}`);
console.log(`R-squared: ${(sizeRegression.rSquared * 100).toFixed(1)}%`);

console.log('\nAge-Price Relationship:');
console.log(`New house price: $${ageRegression.intercept.toFixed(0)}K`);
console.log(
  `Depreciation per year: $${Math.abs(ageRegression.slope).toFixed(1)}K`
);
console.log(`R-squared: ${(ageRegression.rSquared * 100).toFixed(1)}%`);

// Price predictions
console.log('\nPrice Predictions:');
const testSizes = [1600, 2000, 2400];
testSizes.forEach(size => {
  const predictedPrice = sizeRegression.predict(size);
  console.log(`${size} sqft house: $${predictedPrice.toFixed(0)}K`);
});

console.log('\nAge Impact on 2000 sqft house:');
const houseSize = 2000;
const basePriceForSize = sizeRegression.predict(houseSize);
[0, 5, 10, 15, 20].forEach(age => {
  const ageAdjustment = ageRegression.slope * age;
  const adjustedPrice = basePriceForSize + ageAdjustment;
  console.log(`${age} years old: $${adjustedPrice.toFixed(0)}K`);
});

// Market analysis
const { q1, q2, q3 } = prices.quartiles();
console.log('\nMarket Segments:');
console.log(
  `Budget homes (<$${q1}K): ${housePrices.filter(p => p < q1).length} properties`
);
console.log(
  `Mid-market ($${q1}K-$${q3}K): ${housePrices.filter(p => p >= q1 && p <= q3).length} properties`
);
console.log(
  `Premium homes (>$${q3}K): ${housePrices.filter(p => p > q3).length} properties`
);

// Value assessment
console.log('\nValue Assessment:');
housePrices.forEach((price, i) => {
  const expectedPrice = sizeRegression.predict(houseSizes[i]);
  const valueRatio = price / expectedPrice;
  const status =
    valueRatio < 0.9
      ? 'Undervalued'
      : valueRatio > 1.1
        ? 'Overvalued'
        : 'Fair Value';
  console.log(
    `Property ${i + 1}: ${status} (${(valueRatio * 100).toFixed(0)}% of expected)`
  );
});
```

---

## Performance Tips

### Working with Large Datasets

```typescript
// Efficient processing of large datasets
function analyzeLargeDataset(data: number[]) {
  console.log('=== Large Dataset Analysis Tips ===');

  // Create Statistics instance once
  const stats = new Statistics(data);

  // Batch multiple calculations
  const basicStats = {
    count: stats.getCount(),
    mean: stats.mean(),
    median: stats.median(),
    stdDev: stats.standardDeviation(),
    min: stats.min(),
    max: stats.max(),
  };

  console.log('Basic Statistics:', basicStats);

  // Use static methods for one-time calculations
  const correlation = Statistics.correlation(
    data.slice(0, 100),
    data.slice(100, 200)
  );

  // For repeated analysis, cache intermediate results
  const quartiles = stats.quartiles();

  return { basicStats, quartiles, correlation };
}

// Memory-efficient data processing
function processDataInChunks(largeDataset: number[], chunkSize: number = 1000) {
  const results: number[] = [];

  for (let i = 0; i < largeDataset.length; i += chunkSize) {
    const chunk = largeDataset.slice(i, i + chunkSize);
    const chunkStats = new Statistics(chunk);
    results.push(chunkStats.mean());
  }

  return new Statistics(results);
}

// Example with simulated large dataset
const largeData = Array.from({ length: 10000 }, () => Math.random() * 100);
const chunkAnalysis = processDataInChunks(largeData);
console.log('Chunk analysis mean:', chunkAnalysis.mean().toFixed(2));
```

### Best Practices

```typescript
// Error handling best practices
function robustAnalysis(data: number[]) {
  try {
    // Validate data before analysis
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid or empty dataset');
    }

    // Check for outliers that might affect analysis
    const stats = new Statistics(data);
    const { q1, q3 } = stats.quartiles();
    const iqr = q3 - q1;
    const outlierBounds = {
      lower: q1 - 1.5 * iqr,
      upper: q3 + 1.5 * iqr,
    };

    const outliers = data.filter(
      x => x < outlierBounds.lower || x > outlierBounds.upper
    );

    if (outliers.length > data.length * 0.1) {
      console.warn(
        `Warning: ${outliers.length} outliers detected (${((outliers.length / data.length) * 100).toFixed(1)}%)`
      );
    }

    return {
      stats,
      outliers,
      isReliable: outliers.length < data.length * 0.05,
    };
  } catch (error) {
    console.error('Analysis failed:', error.message);
    return null;
  }
}

// Performance monitoring
function timedAnalysis(data: number[]) {
  const start = performance.now();

  const stats = new Statistics(data);
  const results = {
    mean: stats.mean(),
    median: stats.median(),
    stdDev: stats.standardDeviation(),
    quartiles: stats.quartiles(),
  };

  const end = performance.now();
  console.log(`Analysis completed in ${(end - start).toFixed(2)}ms`);

  return results;
}
```

This comprehensive examples document demonstrates the versatility and power of the Statistics library across various real-world applications. Each example includes detailed explanations, practical insights, and actionable recommendations that users can adapt to their specific needs.
