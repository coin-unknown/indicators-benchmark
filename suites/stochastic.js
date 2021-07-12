import Benchmark from 'benchmark';
import { Stochastic } from 'technicalindicators';
import { Stochastic as Stochastic2 } from '@debut/indicators';

const DATA_LENGTH = 1000;
const PERIOD = 14;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);
const stoch1 = new Stochastic({ period: PERIOD,
    low: [],
    high: [],
    close: [],
    signalPeriod: 3
});
const stoch2 = new Stochastic2(PERIOD);

suite
    .add('technicalindicators Stochastic', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            stoch1.nextValue(dataset[i]);
        }
    })
    .add('@debut/indicators Stochastic', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            stoch2.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
