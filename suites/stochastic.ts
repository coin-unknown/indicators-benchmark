import Benchmark from 'benchmark';
import { Stochastic } from 'technicalindicators';
import { Stochastic as Stochastic2 } from '@debut/indicators';
import { stochasticOscillator as stoch3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter';
import { reporter } from '../tools/reporter';

const PERIOD = 14;
const SIGNAL_PERIOD = 3;

const suite = new Benchmark.Suite('Stochastic');
const dataset = Array.from({ length: DATA_LENGTH }, () => ({
    high: Math.random() * 40,
    low: Math.random() * 40,
    close: Math.random() * 40,
}));
const stoch2 = new Stochastic2(PERIOD, SIGNAL_PERIOD);
const lows = dataset.map((data) => data.low);
const closes = dataset.map((data) => data.close);
const highs = dataset.map((data) => data.high);


suite
    .add(`${sources.ti}`, function () {

        Stochastic.calculate({
            period: PERIOD,
            low: lows,
            high: highs,
            close: closes,
            signalPeriod: SIGNAL_PERIOD,
        });
    })
    .add(`${sources.debut}`, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            const { high, low, close } = dataset[i];
            stoch2.nextValue(high, low, close);
        }
    })
    .add(`${sources.indicatorts}`, function () {
        stoch3(highs, lows, closes);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
