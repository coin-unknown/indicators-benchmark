import Benchmark from 'benchmark';
import { WEMA as WEMA1 } from 'technicalindicators';
import { WEMA as WEMA2 } from '@debut/indicators';
import { sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite('WEMA');
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const wema1 = new WEMA1({ period: PERIOD, values: [] });
const wema2 = new WEMA2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @debut/indicators SMA x 62,511 ops/sec

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            wema1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            wema2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
