import Benchmark from 'benchmark';
import { AwesomeOscillator as AO1 } from 'technicalindicators';
import { AO as AO2 } from '@debut/indicators';
import { awesomeOscillator as ao3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';
import { high, low } from '../tools/data';

const FAST_PERIOD = 5;
const SLOW_PERIOD = 34;

const suite = new Benchmark.Suite('AwesomeOscillator');
const ao1 = new AO1({ high: [], low: [], fastPeriod: FAST_PERIOD, slowPeriod: SLOW_PERIOD });
const ao2 = new AO2(FAST_PERIOD, SLOW_PERIOD);

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ao1.nextValue({ high: high[i], low: low[i] });
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ao2.nextValue(high[i], low[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        ao3(high, low);
    })
    .on('cycle', function (event: Benchmark.Event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
