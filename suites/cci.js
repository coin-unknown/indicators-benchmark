import Benchmark from 'benchmark';
import { CCI as CCI1 } from 'technicalindicators';
import { CCI as CCI2 } from '@debut/indicators';
import { sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite('CCI');
const open = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const high = Array.from({ length: DATA_LENGTH }, () => 40 + Math.random() * 40);
const low = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40 - 40);
const close = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);

const cci1 = new CCI1({ period: PERIOD, high: [], low: [], close: [] });
const cci2 = new CCI2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @debut/indicators SMA x 62,511 ops/sec

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            cci1.nextValue({ open: open[i], high: high[i], low: low[i], close: close[i] });
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            cci2.nextValue(high[i], low[i], close[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
