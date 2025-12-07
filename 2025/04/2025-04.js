const {readFileLines} = require('../lib/readFile');
const testInput     = readFileLines('test.txt');
const puzzleInput   = readFileLines('input.txt');
const puzzleInput2  = readFileLines('input2.txt');

const input = testInput;
let matrix = input.map(line => line.split(''));
printGrid(matrix);

const maxAdjacentRolls = 3;
console.log('Accessible rolls:', countAccessibleRolls(matrix));

/* Helper functions */

function printGrid(grid) {
    console.log();
    for (let row of grid) {
        console.log(row.join(''));
    }
    console.log();
}

function isAccessibleRoll(grid, i, j) {
    // console.log(`Checking roll at (${i}, ${j}):`, grid[i][j]);
    if (!grid[i][j] || grid[i][j] !== '@') {
        return false;
    }
    const numRows = grid.length;   
    const numCols = grid[0].length;
    let adjacentRolls = 0;
    const directions = [
        [-1, 0], // up
        [-1, 1], // up-right
        [0, 1],  // right
        [1, 1],  // down-right
        [1, 0],  // down
        [1, -1], // down-left
        [0, -1], // left
        [-1, -1] // up-left        
    ];
    for (let [dr, dc] of directions) {
        const newRow = i + dr;
        const newCol = j + dc;
        
        // Skip if out of bounds
        if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
            // console.log(`Checking adjacent (${newRow}, ${newCol}): out of bounds`);
            continue;
        }
        
        // console.log(`Checking adjacent (${newRow}, ${newCol}):`, grid[newRow][newCol]);

        if (grid[newRow][newCol] === '@') {
            adjacentRolls++;
        }
    }
    return adjacentRolls <= maxAdjacentRolls;
}

function countAccessibleRolls(grid) {
    let countOfAccessibleRolls = 0;
    const numRows = grid.length;
    const numCols = grid[0].length;
    const newGrid = Array.from({ length: numRows }, () => Array(numCols).fill('.'));
    
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === '@') {
                if (isAccessibleRoll(grid, i, j)) {
                    countOfAccessibleRolls++;
                    newGrid[i][j] = 'x';
                } else {
                    newGrid[i][j] = '@';
                }
            }
        }
    }
    // printGrid(newGrid);
    return countOfAccessibleRolls;
}

