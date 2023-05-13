import Benchmark from 'benchmark';
import { CCI as CCI1 } from 'technicalindicators';
import { CCI as CCI2 } from '@debut/indicators';
import { communityChannelIndex as cci3 } from 'indicatorts';
import { DATA_LENGTH, sources } from '../tools/suter.js';
import { reporter } from '../tools/reporter.js';
import { open, high, low, close } from '../tools/data.js';

const PERIOD = 12;

const suite = new Benchmark.Suite('CCI');
const cci1 = new CCI1({ period: PERIOD, high: [], low: [], close: [] });
const cci2 = new CCI2(PERIOD);

suite
    .add(sources.ti, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            cci1.nextValue({ open: open[i], high: high[i], low: low[i], close: close[i] });
        }
    })
    .add(sources.debut, function () {
        for (let i = 0; i < DATA_LENGTH; i++) {
            cci2.nextValue(high[i], low[i], close[i]);
        }
    })
    .add(sources.indicatorts, function () {
        cci3(PERIOD, high, low, close);
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', reporter)
    .run({ async: true });
