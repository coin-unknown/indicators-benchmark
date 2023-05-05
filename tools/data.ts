import { DATA_LENGTH } from "./suter";

export const high: number[] = [];
export const low: number[] = [];
export const close: number[] = [];
export const open: number[] = [];

Array.from({ length: DATA_LENGTH }, () => 30 + Math.random() * 10).forEach(value => {
    const h = value + Math.random() * 10;
    const o = h - Math.random() * 5;
    const l = value - Math.random() * 10;
    const c = l + Math.random() * 5;

    open.push(o);
    high.push(h);
    low.push(l);
    close.push(c);
});
