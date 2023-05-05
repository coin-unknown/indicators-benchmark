import Benchmark from 'benchmark';
import { ADX as ADX1 } from 'technicalindicators';
import { ADX as ADX2 } from '@debut/indicators';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';
import { high, low, close } from '../tools/data';

const PERIOD = 12;

const suite = new Benchmark.Suite('ADX');
const adx1 = new ADX1({ period: PERIOD, high: [], low: [], close: [] });
const adx2 = new ADX2(PERIOD);

suite
    .add(sources.ti, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            // @ts-expect-error
            adx1.nextValue({ high: high[i], low: low[i], close: close[i] });
        }
    })
    .add(sources.debut, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            adx2.nextValue(high[i], low[i], close[i]);
        }
    })
    .on('cycle', function (event: Benchmark.Event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
