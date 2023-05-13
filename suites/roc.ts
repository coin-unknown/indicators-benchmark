import Benchmark from 'benchmark';
import { ROC } from '@debut/indicators';
import { ROC as ROC2 } from 'technicalindicators';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 5;

const suite = new Benchmark.Suite('ROC');
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const roc = new ROC(PERIOD);
const roc2 = new ROC2({ period: PERIOD, values: [] });

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            roc2.nextValue(dataset[i]);
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            roc.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
