import Benchmark from 'benchmark';
import { RSI } from 'technicalindicators';
import { RSI as RSI2 } from '@debut/indicators';
import { RSI as RSI3 } from 'trading-signals';

const DATA_LENGTH = 100;
const PERIOD = 14;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const rsi1 = new RSI({ period: PERIOD, values: [] });
const rsi2 = new RSI2(PERIOD);
const rsi3 = new RSI3(PERIOD);

suite
    .add('technicalindicators RSI', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            rsi1.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators RSI', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            rsi2.nextValue(dataset[i]);
        }
    })
    .add('trading-signals RSI', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            rsi3.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
