const {readFileLines} = require('../lib/readFile');
const testInput    = readFileLines('test.txt');
const puzzleInput  = readFileLines('input2.txt');

const input = puzzleInput;
const banks = input;
const maxValue = '9';
const numberOfBatteries = 12;

console.log('banks:', banks);
console.log('Total Output Joltage:', totalOutputJoltage(banks));

/* Helper functions */

function totalOutputJoltage(banks) {
    return banks.reduce((sum, bank) => sum + maxJoltage(bank, numberOfBatteries), 0);
}

function maxJoltage(bank, numberOfBatteries) {
    if (bank.length < numberOfBatteries) {
        throw new Error(`Bank length ${bank.length} is less than the required number of batteries ${numberOfBatteries}`);
    }
    let sum = '';
    let indexPrev = -1;
    for (let i = 1; i <= numberOfBatteries; i++) {
        [digitFound, indexPrev] = maxDigitWithIndex(bank, ++indexPrev, (bank.length-1) - (numberOfBatteries-i));
        sum += digitFound;
    }
    return Number(sum);
}

function maxDigitWithIndex(bank, indexStart, indexEnd) {
    let maxIndex = indexStart;
    let maxDigitFound = bank[indexStart];
    for (let i = indexStart; i <= indexEnd; i++) {
        if (bank[i] > maxDigitFound) {
            maxDigitFound = bank[i];
            maxIndex = i;
        }
        if (maxDigitFound === maxValue) break;
    }
    return [maxDigitFound, maxIndex];
}
