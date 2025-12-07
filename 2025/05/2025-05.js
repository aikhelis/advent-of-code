const {readFileLines} = require('../lib/readFile');
const testInput     = readFileLines('test.txt');
const puzzleInput   = readFileLines('input.txt');
const puzzleInput2  = readFileLines('input2.txt');

const input = puzzleInput;
const blankLineIndex = input.indexOf('');
const rangeLines = input.slice(0, blankLineIndex);
const availableIDLines = input.slice(blankLineIndex + 1);

const freshRanges = rangeLines.map(line => {
    const [start, end] = line.split('-').map(Number);
    return { start, end };
});

const availableIDs = availableIDLines.map(Number);

function isFresh(id, ranges) {
    return ranges.some(range => id >= range.start && id <= range.end);
}

const freshIDs = availableIDs.filter(id => isFresh(id, freshRanges));
const freshCount = freshIDs.length;

console.log('Fresh ingredient IDs:', freshIDs);
console.log('Total fresh ingredient IDs:', freshCount);

