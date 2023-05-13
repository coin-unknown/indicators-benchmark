import { BollingerBands } from '@debut/indicators';
import Benchmark from 'benchmark';
import { BollingerBands as BollingerBands2 } from 'technicalindicators';
import { bollingerBands as bb3 } from 'indicatorts';

import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';
import { close } from '../tools/data';

const PERIOD = 20;
const ST_DEV = 20;

const suite = new Benchmark.Suite('Bollinger Bands');

const bb1 = new BollingerBands(PERIOD, ST_DEV);
const bb2 = new BollingerBands2({ period: PERIOD, stdDev: ST_DEV, values: [] });

suite
    .add(sources.debut, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            bb1.nextValue(close[i]);
        }
    })
    .add(sources.ti, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            bb2.nextValue(close[i]);
        }
    })
    .add(sources.indicatorts, function () {
       bb3(close)
    })
    .on('cycle', function (event: Benchmark.Event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
