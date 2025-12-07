const { parse } = require('path');
const {readFileLines} = require('../lib/readFile');
const testInput     = readFileLines('test.txt');
const puzzleInput   = readFileLines('input.txt');
const puzzleInput2  = readFileLines('input2.txt');

const input = puzzleInput2;
console.log('Input:', input);

console.log("PART 1");
let [problems, operators] = parseProblemsPart1(input);
console.log('Problems:', problems);
console.log('Operators:', operators);
console.log('Result:', evalProblems(problems, operators));

console.log();
console.log("PART 2");
[problems, operators] = parseProblemsPart2(input);
console.log('Problems:', problems);
console.log('Operators:', operators);
console.log('Result:', evalProblems(problems, operators));

/* Helper functions */
function parseProblemsPart1(input) {
    const lines = input.map(line => line.trim().split(/\s+/));
    const operators = lines.pop();
    let problems = transpose(lines);
    console.log('Lines:', lines);
    return [problems, operators];
}

function parseProblemsPart2(input) {
    const lines = input.map(line => line.split(''));
    const operators = lines.pop().map(o => o.trim()).filter(o => o);
    let numbers = transpose(lines).map(num => num.join('').trim()).concat('');
    let problems = [], problem = [], index = 0;
    numbers.forEach(num => {
        if (num === '') {
            problems[index] = problem;
            problem = [];
            index++;
        } else 
            problem.push(num);
    });
    console.log('Lines:', lines);
    console.log('Numbers:', numbers);
    return [problems, operators];
}

function evalProblems(problems, operators) {
    const expression = problems.reduce( (finalExpression, problem, i) => 
        finalExpression += "+" + problem.join(operators[i]),
        '');
    console.log('Expression:', expression);
    return eval(expression);
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}