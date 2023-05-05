import Benchmark from 'benchmark';
import { ATR as ATR1 } from 'technicalindicators';
import { ATR as ATR2 } from '@debut/indicators';
import { ATR as ATR3 } from 'trading-signals';
import { sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite('ATR');
const dataset = Array.from({ length: DATA_LENGTH }, () => ({
    high: Math.random() * 40,
    low: Math.random() * 40,
    close: Math.random() * 40,
}));
const atr1 = new ATR1({ period: PERIOD, high: [], low: [], close: [] });
const atr2 = new ATR2(PERIOD);
const atr3 = new ATR3(PERIOD);

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            atr1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            const { high, low, close } = dataset[i];
            atr2.nextValue(high, low, close);
        }
    })
    .add(`${sources.trading_signals}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            atr3.update(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
