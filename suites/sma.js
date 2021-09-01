import Benchmark from 'benchmark';
import { SMA as SMA1 } from 'technicalindicators';
import { SMA as SMA2 } from '@debut/indicators';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const sma1 = new SMA1({ period: PERIOD, values: [] });
const sma2 = new SMA2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @debut/indicators SMA x 62,511 ops/sec

suite
    .add('technicalindicators SMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            sma1.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators SMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            sma2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
