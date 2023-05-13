import Benchmark from 'benchmark';
import { WMA as WMA1 } from 'technicalindicators';
import { WMA as WMA2 } from '@debut/indicators';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 12;

const suite = new Benchmark.Suite('WMA');
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const wema1 = new WMA1({ period: PERIOD, values: [] });
const wema2 = new WMA2(PERIOD);

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
