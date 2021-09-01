import Benchmark from 'benchmark';
import { AwesomeOscillator as AO1 } from 'technicalindicators';
import { AO as AO2 } from '@debut/indicators';

const DATA_LENGTH = 100;
const FAST_PERIOD = 12;
const SLOW_PERIOD = 6;

const suite = new Benchmark.Suite();
const datasetH = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const datasetL = Array.from({ length: DATA_LENGTH }, () => Math.random() * 30);
const ao1 = new AO1({ high: [], low: [], fastPeriod: FAST_PERIOD, slowPeriod: SLOW_PERIOD });
const ao2 = new AO2(FAST_PERIOD, SLOW_PERIOD);

suite
    .add('technicalindicators AwesomeOscillator', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ao1.nextValue({ high: datasetH[i], low: datasetL[i] });
        }
    })
    .add('@debut/indicators AwesomeOscillator', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ao2.nextValue(datasetH[i], datasetL[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
