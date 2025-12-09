const fs = require('fs');
const path = require('path');

function readFileWithBlanks(file) {
    const content = fs.readFileSync(path.resolve(file), 'utf8');
    return content.split(/\r?\n/);
}

const testInput     = readFileWithBlanks('test.txt');
const puzzleInput   = readFileWithBlanks('input.txt');
const puzzleInput2  = readFileWithBlanks('input2.txt');

const input = puzzleInput2;
const blankLineIndex = input.indexOf('');
const rangeLines = input.slice(0, blankLineIndex);
const availableIDLines = input.slice(blankLineIndex + 1).filter(line => line.trim() !== '');

const freshRanges = rangeLines.map(line => {
    const parts = line.split('-');
    if (parts.length < 2) return null;
    const [start, end] = [parts[0], parts[parts.length - 1]].map(s => {
        const num = Number(s);
        return num > 9007199254740991 ? BigInt(s) : num;
    });
    return { start, end };
}).filter(r => r !== null);

const availableIDs = availableIDLines.map(Number);

function isFresh(id, ranges) {
    return ranges.some(range => id >= range.start && id <= range.end);
}

// Part 1: Check which available IDs are fresh
const freshIDs = availableIDs.filter(id => isFresh(id, freshRanges));
const freshCount = freshIDs.length;

console.log('Part 1 - Fresh from available IDs:', freshCount);

// Part 2: Count all unique IDs considered fresh by the ranges
const sortedRanges = [...freshRanges].sort((a, b) => {
    if (a.start < b.start) return -1;
    if (a.start > b.start) return 1;
    return 0;
});

let totalFreshIDs = 0n;
let currentStart = null;
let currentEnd = null;

for (const range of sortedRanges) {
    const rStart = typeof range.start === 'bigint' ? range.start : BigInt(range.start);
    const rEnd = typeof range.end === 'bigint' ? range.end : BigInt(range.end);
    
    if (currentStart === null) {
        currentStart = rStart;
        currentEnd = rEnd;
    } else if (rStart <= currentEnd + 1n) {
        // Overlapping or adjacent, merge
        if (rEnd > currentEnd) {
            currentEnd = rEnd;
        }
    } else {
        // Non-overlapping, count the previous range and start new
        totalFreshIDs += currentEnd - currentStart + 1n;
        currentStart = rStart;
        currentEnd = rEnd;
    }
}

// Don't forget the last range
if (currentStart !== null) {
    totalFreshIDs += currentEnd - currentStart + 1n;
}

console.log('Part 2 - Total IDs considered fresh by ranges:', totalFreshIDs.toString());

