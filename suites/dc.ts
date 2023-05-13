import Benchmark from 'benchmark';
import { DC as DC1 } from '@debut/indicators';
import { donchianChannel as dc2 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 12;

const suite = new Benchmark.Suite('DC');
const datasetH = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const datasetL = Array.from({ length: DATA_LENGTH }, () => Math.random() * 30);
const dc1 = new DC1(PERIOD);


suite
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            dc1.nextValue(datasetH[i], datasetL[i]);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        dc2(PERIOD, datasetH);
    })
    .on('cycle', function (event: Benchmark.Event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
