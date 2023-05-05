import Benchmark from 'benchmark';
import { AwesomeOscillator as AO1 } from 'technicalindicators';
import { AO as AO2 } from '@debut/indicators';
import { AO as AO3 } from 'trading-signals';
import { sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';

const DATA_LENGTH = 100;
const FAST_PERIOD = 12;
const SLOW_PERIOD = 6;

const suite = new Benchmark.Suite('AwesomeOscillator');
const datasetH = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const datasetL = Array.from({ length: DATA_LENGTH }, () => Math.random() * 30);
const ao1 = new AO1({ high: [], low: [], fastPeriod: FAST_PERIOD, slowPeriod: SLOW_PERIOD });
const ao2 = new AO2(FAST_PERIOD, SLOW_PERIOD);
const ao3 = new AO3(FAST_PERIOD, SLOW_PERIOD);

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ao1.nextValue({ high: datasetH[i], low: datasetL[i] });
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ao2.nextValue(datasetH[i], datasetL[i]);
        }
    })
    .add(`${sources.trading_signals}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ao3.update(datasetL[i], datasetH[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
