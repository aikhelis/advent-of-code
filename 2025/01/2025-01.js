const {readFileLines} = require('../lib/readFile');
const testInput    = readFileLines('test.txt');
const puzzleInput  = readFileLines('input2.txt');

const input = puzzleInput;
const steps = input.map(line => Number( (line[0] === 'L' ? '-' : '+') + line.slice(1) ));
const dialLength = 100;
const initialValue = 50;

console.log('Input:', input);
console.log('Steps:', steps);
console.log('Zero Crossings count:', countTotalZeroCrossings(steps, initialValue));

/* Helper functions */

function countTotalZeroCrossings(steps, initialValue) {
    let count = 0;
    steps.reduce(
        (sum, currentValue) => {
            const newSum = sum + currentValue;
            count += countMultiplesCrossed(sum, newSum, dialLength);
            return newSum;
        }
        , initialValue,
    );
    return count;
}

// Counts how many `base`-sized boundaries (multiples of `base` value) are crossed when moving from `startValue` to `endValue`. 
// The start value's boundary is excluded, the end value's boundary is included.
function countMultiplesCrossed(startValue, endValue, base = 100) {
    if (startValue === endValue) return 0;

    let count = 0;
    if (endValue > startValue) {
        const firstK = Math.floor(startValue / base) + 1; // the index of the first multiple of `base` strictly greater than startValue.
        const lastK  = Math.floor(endValue   / base);     // the index of the last multiple of `base` that is ≤ endValue.
        count = Math.max(0, lastK - firstK + 1);
    } else {
        // for the decreasing case (endValue < startValue) it mirrors the logic but uses ceilings to handle negative and fractional values correctly:
        const firstK = Math.ceil(endValue   / base);      // the index of the first multiple of `base` greater than or equal to endValue when moving downward.
        const lastK  = Math.ceil(startValue / base) - 1;  // the index just below any multiple at the startValue end, so the start boundary is excluded.
        count = Math.max(0, lastK - firstK + 1);
    }

    return count;
}