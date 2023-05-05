import fs from 'fs';
import { tableColums } from "./suter";


const columnSize = `:---------------:`;
const tableHeader = `| Indicator name | ${tableColums.map(item => `${item} (ops/sec)`).join('|')}|\n`;
const tableHeaderSeparator = `|${columnSize}|${tableColums.map(() => columnSize).join('|')}|\n`;

fs.writeFileSync('./report.md', `${tableHeader}${tableHeaderSeparator}`, 'utf8');

