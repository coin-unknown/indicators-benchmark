import Benchmark from 'benchmark';
import { DC as DC1 } from '@debut/indicators';
import { sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite('DC');
const datasetH = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const datasetL = Array.from({ length: DATA_LENGTH }, () => Math.random() * 30);
const dc1 = new DC1(PERIOD);


suite
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            dc1.nextValue(datasetH[i], datasetL[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
