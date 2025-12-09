const {readFileLines} = require('../lib/readFile');
const testInput     = readFileLines('test.txt');
const puzzleInput   = readFileLines('input.txt');
const puzzleInput2  = readFileLines('input2.txt');

const input = puzzleInput;
const ranges = input[0].split(',').map(r => r.split('-'));

// Part 1
console.log('Part1 Result:', solve(ranges, isInvalidPart1).toString());

// Part 2
console.log('Part2 Result:', solve(ranges, isInvalidPart2).toString());

/* Helper functions */

function solve(ranges, isInvalidFn) {
    let sum = 0n;
    for (const [startStr, endStr] of ranges) {
        let current = BigInt(startStr);
        const end = BigInt(endStr);
        while (current <= end) {
            if (isInvalidFn(current.toString())) {
                sum += current;
            }
            current++;
        }
    }
    return sum;
}

function isInvalidPart1(s) {
    if (s.length % 2 !== 0) return false;
    const mid = s.length / 2;
    return s.substring(0, mid) === s.substring(mid);
}

function isInvalidPart2(s) {
    const len = s.length;
    for (let k = 2; k <= len; k++) {
        if (len % k === 0) {
            const d = len / k;
            const sub = s.substring(0, d);
            if (sub.repeat(k) === s) return true;
        }
    }
    return false;
}
