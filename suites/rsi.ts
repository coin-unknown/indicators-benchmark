import Benchmark from 'benchmark';
import { RSI } from 'technicalindicators';
import { RSI as RSI2 } from '@debut/indicators';
import { customRsi as rsi3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 14;

const suite = new Benchmark.Suite('RSI');
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const rsi1 = new RSI({ period: PERIOD, values: [] });
const rsi2 = new RSI2(PERIOD);

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            rsi1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            rsi2.nextValue(dataset[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        rsi3(PERIOD, dataset);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
