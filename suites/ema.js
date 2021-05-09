import Benchmark from 'benchmark';
import { EMA as EMA1 } from 'technicalindicators';
import { EMA as EMA2 } from '@follow-traders/indicators';

const DATA_LENGTH = 1000;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const ema1 = new EMA1({ period: PERIOD, values: [] });
const ema2 = new EMA2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @follow-traders/indicators SMA x 62,511 ops/sec

suite
    .add('technicalindicators EMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ema1.nextValue(dataset[i]);
        }
    })
    .add('@follow-traders/indicators EMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ema2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
