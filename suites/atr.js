import Benchmark from 'benchmark';
import { ATR as ATR1 } from 'technicalindicators';
import { ATR as ATR2 } from '@debut/indicators';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const atr1 = new ATR1({ period: PERIOD, high: [], low: [], close: [] });
const atr2 = new ATR2(PERIOD);

suite
    .add('technicalindicators ATR', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            atr1.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators ATR', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            atr2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
