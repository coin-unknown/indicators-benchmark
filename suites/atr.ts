import Benchmark from 'benchmark';
import { ATR as ATR1 } from 'technicalindicators';
import { ATR as ATR2 } from '@debut/indicators';
import { atr as atr3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';
import { high, low, close } from '../tools/data';

const PERIOD = 12;

const suite = new Benchmark.Suite('ATR');

const atr1 = new ATR1({ period: PERIOD, high: [], low: [], close: [] });
const atr2 = new ATR2(PERIOD);

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            atr1.nextValue({ high: high[i], low: low[i], close: close[i] });
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            atr2.nextValue(high[i], low[i], close[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        atr3(PERIOD, high, low, close);
    })
    .on('cycle', function (event: Benchmark.Event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
