import Benchmark from 'benchmark';
import { WEMA as WEMA1 } from 'technicalindicators';
import { WEMA as WEMA2 } from '@debut/indicators';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const wema1 = new WEMA1({ period: PERIOD, values: [] });
const wema2 = new WEMA2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @debut/indicators SMA x 62,511 ops/sec

suite
    .add('technicalindicators WEMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            wema1.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators WEMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            wema2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
