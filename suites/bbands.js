import { BollingerBands } from '@debut/indicators';
import Benchmark from 'benchmark';
import { BollingerBands as BollingerBands2 } from 'technicalindicators';
import { BollingerBands as BollingerBands3 } from 'trading-signals';

const DATA_LENGTH = 100;
const PERIOD = 14;
const ST_DEV = 2;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const bb1 = new BollingerBands(PERIOD, ST_DEV);
const bb2 = new BollingerBands2({ period: PERIOD, stdDev: ST_DEV, values: [] });
const bb3 = new BollingerBands3(PERIOD, ST_DEV);

suite
    .add('technicalindicators Bollinger Bands', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            bb2.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators Bollinger Bands', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            bb1.nextValue(dataset[i]);
        }
    })
    .add('trading-signal Bollinger Bands', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            bb3.update(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
