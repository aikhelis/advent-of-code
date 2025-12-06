const {readFileLines} = require('../../lib/readFile');
const testInput    = readFileLines('test.txt');
const puzzleInput  = readFileLines('input2.txt');

const input = puzzleInput;
const rotations = input.map(line => Number( (line[0] === 'L' ? '-' : '+') + line.slice(1) ));
const initialValue = 50;

console.log('Input:', input);
console.log('Rotations:', rotations);
console.log('Zero Crossings:', countZeroCrossingsInRotations(rotations, initialValue));

/* Helper functions */

function countZeroCrossingsInRotations(rotations, initialValue) {
    let count = 0;
    rotations.reduce(
        (sum, currentValue) => {
            const newSum = sum + currentValue;
            count += countZeroCrossings(sum, newSum);
            return newSum;
        }
        , initialValue,
    );
    return count;
}

function countZeroCrossings(before, after) {
    if (before === after) return 0;

    let count = 0;
    if (after > before) {
        const firstK = Math.floor(before / 100) + 1;
        const lastK  = Math.floor(after  / 100);
        count = Math.max(0, lastK - firstK + 1);
    } else {
        const firstK = Math.ceil(after  / 100);
        const lastK  = Math.ceil(before / 100) - 1;
        count = Math.max(0, lastK - firstK + 1);
    }

    return count;
}