import Benchmark from 'benchmark';
import { PSAR as PSAR1 } from 'technicalindicators';
import { PSAR as PSAR2 } from '@debut/indicators';
import { parabolicSar as psar3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 12;

const suite = new Benchmark.Suite('PSAR');
const high = Array.from({ length: DATA_LENGTH }, () => 40 + Math.random() * 40);
const low = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40 - 40);
const close = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
// @ts-expect-error
const psar1 = new PSAR1({ period: PERIOD, values: [] });
const psar2 = new PSAR2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @debut/indicators SMA x 62,511 ops/sec

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            // @ts-expect-error
            psar1.nextValue({ high: high[i], low: low[i] });
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            psar2.nextValue(high[i], low[i], close[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        psar3(high, low, close);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
