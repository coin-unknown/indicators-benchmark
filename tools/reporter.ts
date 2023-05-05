import fs from 'fs';
import { tableColums } from "./suter";

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

function formatNumber(num: number) {
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function(acc: string, num: string, i: number, ) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "");
}
