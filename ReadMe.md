# JavaScript trading indicators benchmark
## Latest Report

| Indicator name | @debut/indicators (ops/sec)|technicalindicators (ops/sec)|trading-signals (ops/sec)|ta.js (ops/sec)|
|:---------------:|:---------------:|:---------------:|:---------------:|:---------------:|
|AwesomeOscillator|334,729|22,280|x|x|
|ATR|959,853|138,269|2|x|
|Bollinger Bands|416,239|10,864|71|x|
|CCI|408,103|15,101|x|x|
|DC|579,186|x|x|x|
|PSAR|1,448,398|274,614|x|x|
|EMA|1,688,207|437,915|5|1,009,262|
|MACD|1,471,612|89,241|2|x|
|ROC|3,586,280|56,036|550|x|
|RSI|1,238,360|38,179|0|x|
|SMA|1,040,127|70,585|280|x|
|ADX|588,816|42,038|x|x|
|WEMA|1,511,194|435,418|x|x|
|WMA|139,300|40,719|x|x|
|Stochastic|393,242|28,681|313|x|

## Contribute guide

**Step 1:** Add you library to `suter.ts` sources object
**Step 2:** Add you library to `suret.ts` columns list
**Step 3:** Implement benchmark sutes for library indicator

## Report generation

Run command `npm run bench` to generate new report.

Then copy report to main file `ReadMe.md`
