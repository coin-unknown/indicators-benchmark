import Benchmark from 'benchmark';
import { MACD as MACD1 } from 'technicalindicators';
import { MACD as MACD2 } from '@debut/indicators';
import { macd as macd3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 26;
const FAST_PERIOD = 12;
const SIGNAL_PERIOD = 9;

const suite = new Benchmark.Suite("MACD");
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const macd1 = new MACD1({
    values: [],
    SimpleMAOscillator: false,
    SimpleMASignal: false,
    fastPeriod: FAST_PERIOD,
    slowPeriod: PERIOD,
    signalPeriod: SIGNAL_PERIOD,
});
const macd2 = new MACD2(FAST_PERIOD, PERIOD, SIGNAL_PERIOD);


suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            macd1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            macd2.nextValue(dataset[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        macd3(dataset);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
