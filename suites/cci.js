import Benchmark from 'benchmark';
import { CCI as CCI1 } from 'technicalindicators';
import { CCI as CCI2 } from '@follow-traders/indicators';

const DATA_LENGTH = 1000;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const open = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const high = Array.from({ length: DATA_LENGTH }, () => 40 + Math.random() * 40);
const low = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40 - 40);
const close = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);

const cci1 = new CCI1({ period: PERIOD, high: [], low: [], close: [] });
const cci2 = new CCI2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @follow-traders/indicators SMA x 62,511 ops/sec

suite
    .add('technicalindicators CCI', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            cci1.nextValue({ open: open[i], high: high[i], low: low[i], close: close[i] });
        }
    })
    .add('@follow-traders/indicators CCI', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            cci2.nextValue(high[i], low[i], close[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
