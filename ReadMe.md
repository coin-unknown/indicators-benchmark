# JavaScript trading indicators benchmark

A universal set for testing the performance of libraries of technical indicators in JavaScript or TypeScript.

This tool measures the performance of indicators under equal conditions. The result of the execution is a performance table. Used to monitor the performance of debut indicators, identifying opportunities to improve performance.

## Latest Report

| Indicator name | @debut/indicators (ops/sec)|technicalindicators (ops/sec)|indicatorts (ops/sec)|
|:---------------:|:---------------:|:---------------:|:---------------:|
|AwesomeOscillator|318|23|158|
|ADX|358|42|x|
|ATR|613|136|95|
|Bollinger Bands|347|9|219|
|CCI|151|12|158|
|DC|474|x|74|
|PSAR|1,453|278|666|
|EMA|1,720|452|1,537|
|MACD|1,417|90|467|
|ROC|3,625|64|x|
|RSI|1,239|38|315|
|SMA|678|65|645|
|WEMA|1,462|455|x|
|WMA|287|41|x|
|Stochastic|340|25|67|


## Contribute guide

**Step 1:** Add you library to `suter.ts` sources object

**Step 2:** Add you library to `suret.ts` columns list

**Step 3:** Implement benchmark sutes for library indicator

## Report generation

Run command `npm run bench` to generate new report.

Then copy report to main file `ReadMe.md`
