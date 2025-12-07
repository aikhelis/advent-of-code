const {readFileLines} = require('../lib/readFile');
const testInput    = readFileLines('test.txt');
const puzzleInput  = readFileLines('input.txt');
const puzzleInput2  = readFileLines('input2.txt');

const input = testInput;
console.log('Input:', input);

function solve_part1(input) {
    const lines = input.map(line => line.trim().split(/\s+/));
    const operators = lines.pop();
    let problems = transpose(lines);

    console.log('Part1 Problems:', problems);
    console.log('Part1 Operators:', operators);

    const expression = problems.reduce( (finalExpression, problem, i) => 
        finalExpression += "+" + problem.join(operators[i]),
        '');

    console.log('Part1 Expression:', expression);
    console.log('PART1 RESULT:', eval(expression));
}

function solve_part2(input) {
    const lines = input.map(line => line.split(''));
    const operators = lines.pop();
    // operators.fill
    let problems = transpose(lines).map(num => num.join(''));
    // problems = problems.map(problem => {
    //     problem = problem.map(num => num.split(''));
    //     problem = transpose(problem).flatMap(num => num.join(''))
    //     return problem;
    // });
    console.log('Part2 Lines:', lines);
    console.log('Part2 Problems:', problems);
    console.log('Part2 Operators:', operators);

    // const expression = problems.reduce( (finalExpression, problem, i) => 
    //     finalExpression += "+" + problem.join(operators[i]),
    //     '');

    // console.log('Part2 Expression:', expression);

    // console.log('PART2 RESULT:', eval(expression));
}

solve_part2(input);
/* Helper functions */

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}