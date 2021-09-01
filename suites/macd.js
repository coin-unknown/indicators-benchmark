import { MACD } from '@debut/indicators';
import Benchmark from 'benchmark';
import { MACD as MACD2 } from 'technicalindicators';

const DATA_LENGTH = 100;
const PERIOD1 = 12;
const PERIOD2 = 26;
const PERIOD3 = 9;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const macd = new MACD(PERIOD1, PERIOD2, PERIOD3);
const macd2 = new MACD2({
    values: [],
    SimpleMAOscillator: false,
    SimpleMASignal: false,
    fastPeriod: PERIOD1,
    slowPeriod: PERIOD2,
    signalPeriod: PERIOD3,
});

suite
    .add('technicalindicators MACD', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            macd2.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators MACD', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            macd.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
