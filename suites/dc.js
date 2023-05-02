import Benchmark from 'benchmark';
import { DC as DC1 } from '@debut/indicators';

const DATA_LENGTH = 100;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const datasetH = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const datasetL = Array.from({ length: DATA_LENGTH }, () => Math.random() * 30);
const dc1 = new DC1(PERIOD);


suite
    .add('@debut/indicators AwesomeOscillator', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            dc1.nextValue(datasetH[i], datasetL[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
