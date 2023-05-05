import Benchmark from 'benchmark';
import { MACD as MACD1 } from 'technicalindicators';
import { MACD as MACD2 } from '@debut/indicators';
import { EMA, MACD as MACD3 } from 'trading-signals';
import { sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';

const DATA_LENGTH = 100;
const PERIOD = 20;
const FAST_PERIOD = 16;
const SIGNAL_PERIOD = 8;

const suite = new Benchmark.Suite("MACD");
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const macd1 = new MACD1({
    values: [],
    SimpleMAOscillator: false,
    SimpleMASignal: false,
    fastPeriod: FAST_PERIOD,
    slowPeriod: PERIOD,
    signalPeriod: SIGNAL_PERIOD,
});
const macd2 = new MACD2(FAST_PERIOD, PERIOD, SIGNAL_PERIOD);
const macd3 = new MACD3({
    indicator: EMA,
    shortInterval: FAST_PERIOD,
    longInterval: PERIOD,
    signalInterval: SIGNAL_PERIOD,
});

// technicalindicators SMA x 4,721 ops/sec
// @debut/indicators SMA x 62,511 ops/sec

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            macd1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            macd2.nextValue(dataset[i]);
        }
    })
    .add(`${sources.trading_signals}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            macd3.update(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
