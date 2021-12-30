import Benchmark from 'benchmark';
import { WMA as WMA1 } from 'technicalindicators';
import { WMA as WMA2 } from '@debut/indicators';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const wema1 = new WMA1({ period: PERIOD, values: [] });
const wema2 = new WMA2(PERIOD);

suite
    .add('technicalindicators WMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            wema1.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators WMA', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            wema2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
