const {readFileLines} = require('../lib/readFile');
const testInput     = readFileLines('test.txt');
const puzzleInput   = readFileLines('input.txt');
const puzzleInput2  = readFileLines('input2.txt');

const input = puzzleInput;
// console.log('Input:', input);
const ranges = input[0].split(',').map(r => r.split('-'));
// console.log('Ranges:', ranges);

let invalids = ranges.reduce((invalids, range) => 
    invalids.concat(invalidsInRangePart1(...range)), []);
// console.log('All invalids:', invalids);
let result = invalids.reduce((s, id) => s + id, Number(0));
console.log('Part1 Result:', result);

// invalids = ranges.reduce((invalids, range) => 
//     invalids.concat(invalidsInRangePart2(...range)), []);
// // console.log('All invalids:', invalids);
// result = invalids.reduce((s, id) => s + id, Number(0));
// console.log('Part2 Result:', result);

/* Helper functions */

function invalidsInRangePart1(start, end) {
    let invalids = [];
    let current = start;

    while(Number(current) <= Number(end)) {
        if (current.length % 2 > 0) {
            current = (10**(current.length)).toString();
        }
        const mid = current.length/2 - 1;
        current = current.slice(0, mid+1).repeat(2);
        if (Number(start) <= Number(current) &&  Number(current) <= Number(end)) 
            invalids.push(Number(current));
        current = (Number(current.slice(0, mid+1)) + Number(1)).toString().repeat(2);    
    }

    // console.log('Invalids in range', start + '-' + end + ':', invalids);
    return invalids;
}

// function invalidsInRangePart2(start, end) {
//     let invalids = [];
//     let current = start;

//     while(Number(current) <= Number(end)) {
//         if (current.length % 2 > 0) {
//             current = (10**(current.length)).toString();
//         }
//         const mid = current.length/2 - 1;
//         current = current.slice(0, mid+1).repeat(2);
//         if (Number(start) <= Number(current) &&  Number(current) <= Number(end)) 
//             invalids.push(Number(current));
//         current = (Number(current.slice(0, mid+1)) + Number(1)).toString().repeat(2);    
//     }

//     // console.log('Invalids in range', start + '-' + end + ':', invalids);
//     return invalids;
// }