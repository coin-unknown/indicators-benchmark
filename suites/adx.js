import Benchmark from 'benchmark';
import { ADX as ADX1 } from '@debut/indicators';
import { ADX as ADX2 } from 'technicalindicators';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const high = Array.from({ length: DATA_LENGTH }, () => 40 + Math.random() * 40);
const low = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40 - 40);
const close = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const adx1 = new ADX2({ period: PERIOD, high: [], low: [], close: [] });
const adx2 = new ADX1(PERIOD);

suite
    .add('technicalindicators ADX', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            adx1.nextValue({ high: high[i], low: low[i], close: close[i] });
        }
    })
    .add('@debut/indicators ADX', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            adx2.nextValue(high[i], low[i], close[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
