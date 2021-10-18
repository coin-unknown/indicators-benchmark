import Benchmark from 'benchmark';
import { Stochastic } from 'technicalindicators';
import { Stochastic as Stochastic2 } from '@debut/indicators';
import { StochasticOscillator as Stochastic3 } from 'trading-signals';

const DATA_LENGTH = 100;
const PERIOD = 14;
const SIGNAL_PERIOD = 3;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => ({
    high: Math.random() * 40,
    low: Math.random() * 40,
    close: Math.random() * 40,
}));
const stoch2 = new Stochastic2(PERIOD, SIGNAL_PERIOD);
const stoch3 = new Stochastic3(PERIOD, SIGNAL_PERIOD);

suite
    .add('technicalindicators Stochastic', function () {
        const lows = dataset.map((data) => data.low);
        const closes = dataset.map((data) => data.close);
        const highs = dataset.map((data) => data.high);
        Stochastic.calculate({
            period: PERIOD,
            low: lows,
            high: highs,
            close: closes,
            signalPeriod: SIGNAL_PERIOD,
        });
    })
    .add('@debut/indicators Stochastic', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            const { high, low, close } = dataset[i];
            stoch2.nextValue(high, low, close);
        }
    })
    .add('trading-signals Stochastic', function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            stoch3.update(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .run({ async: true });
