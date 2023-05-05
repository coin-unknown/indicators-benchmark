import Benchmark from 'benchmark';
import { EMA as EMA1 } from 'technicalindicators';
import { EMA as EMA2 } from '@debut/indicators';
import { EMA as EMA3 } from 'trading-signals';
import ta from 'ta.js';
import { sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite('EMA');
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 10 + 40);
const ema1 = new EMA1({ period: PERIOD, values: [] });
const ema2 = new EMA2(PERIOD);
const ema3 = new EMA3(PERIOD);

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ema1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.tajs}`, function () {
        ta.ema(dataset, PERIOD);
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ema2.nextValue(dataset[i]);
        }
    })
    .add(`${sources.trading_signals}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ema3.update(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
