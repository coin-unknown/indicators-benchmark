import fs from 'fs';
import { sources } from "./suter.js";

const columnSize = `:---------------:`;
const tableColums = [sources.debut, sources.ti, sources.trading_signals, sources.tajs];
const tableHeader = `| Indicator name | ${tableColums.map(item => `${item} (ops/sec)`).join('|')}|\n`;
const tableHeaderSeparator = `|${columnSize}|${tableColums.map(() => columnSize).join('|')}|\n`;
let tableBody = '';

export function reporter() {
    const tableRow = [this.name];

    for (let i = 0; i < tableColums.length; i++) {
        let { hz = 'x', name, error } = this[i] || {};

        if (!name || !hz || error) {
            continue;
        }

        const insertIdx = tableColums.indexOf(name) + 1;

        if (insertIdx === 0) {
            throw new Error(`Unknown column name ${name}`);
        }

        tableRow[insertIdx] = typeof hz === 'string' ? hz: formatNumber(hz);
    }

    for (let i = 0; i < tableColums.length; i++) {
        if (!tableRow[i + 1]) {
            tableRow[i + 1] = 'x';
        }
    }

    tableBody += `|${tableRow.join('|')}|\n`;


    fs.appendFileSync('./report.md', `${tableBody}`, 'utf8');
}

function formatNumber(num) {
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "");
}
