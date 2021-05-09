import Benchmark from 'benchmark';
import { SMA as SMA1 } from 'technicalindicators';
import { SMA as SMA2 }from '@follow-traders/indicators';

const DATA_LENGTH = 1000;
const PERIOD = 12;

const suite = new Benchmark.Suite();
const dataset = Array.from({ length: DATA_LENGTH }, () => Math.random() * 40);

// add tests
suite.add('technicalindicators SMA', function () {
    const sma = new SMA1(12, []);

    for (let i = 0; i < DATA_LENGTH; i++) {
        sma.nextValue(dataset[i]);
    }
})
    .add('@follow-traders/indicators SMA', function () {
        const sma = SMA2(12);
        for (let i = 0; i < DATA_LENGTH; i++) {
            sma.nextValue(dataset[i]);
        }
    })
    .on('cycle', function (event) {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });
