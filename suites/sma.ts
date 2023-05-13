import Benchmark from 'benchmark';
import { SMA as SMA1 } from 'technicalindicators';
import { SMA as SMA2 } from '@debut/indicators';
import { sma as sma3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 12;

const suite = new Benchmark.Suite('SMA');
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const sma1 = new SMA1({ period: PERIOD, values: [] });
const sma2 = new SMA2(PERIOD);

// technicalindicators SMA x 4,721 ops/sec
// @debut/indicators SMA x 62,511 ops/sec

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            sma1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            sma2.nextValue(dataset[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        sma3(PERIOD, dataset);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
