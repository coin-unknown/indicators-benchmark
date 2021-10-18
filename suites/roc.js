import Benchmark from 'benchmark';
import { ROC } from '@debut/indicators';
import { ROC as ROC2 } from 'technicalindicators';
import { ROC as ROC3 } from 'trading-signals';

const DATA_LENGTH = 100;
const PERIOD = 5;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const roc = new ROC(PERIOD);
const roc2 = new ROC2({ period: PERIOD, values: [] });
const roc3 = new ROC3(PERIOD);

suite
    .add('technicalindicators ROC', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            roc2.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators ROC', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            roc.nextValue(dataset[i]);
        }
    })
    .add('trading-signals ROC', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            roc3.update(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
