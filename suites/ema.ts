import Benchmark from 'benchmark';
import { EMA as EMA1 } from 'technicalindicators';
import { EMA as EMA2 } from '@debut/indicators';
import { ema as ema3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 12;

const suite = new Benchmark.Suite('EMA');
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 10 + 40);
const ema1 = new EMA1({ period: PERIOD, values: [] });
const ema2 = new EMA2(PERIOD);

suite
    .add(`${sources.ti}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ema1.nextValue(dataset[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        ema3(PERIOD, dataset);
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            ema2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
