const {readFileLines} = require('../lib/readFile');
const testInput     = readFileLines('test.txt');
const puzzleInput   = readFileLines('input.txt');
const puzzleInput2  = readFileLines('input2.txt');

const input = puzzleInput;
let matrix = input.map(line => line.split(''));
// printGrid(matrix);

const maxAdjacentRolls = 3;
console.log('Part 1 - Initially accessible rolls:', countAccessibleRolls(matrix));
console.log('Part 2 - Total rolls removed:', removeAllAccessibleRolls(matrix));

/* Helper functions */

function printGrid(grid) {
    console.log();
    for (let row of grid) {
        console.log(row.join(''));
    }
    console.log();
}

function isAccessibleRoll(grid, i, j) {
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
            continue;
        }

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
    
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (grid[i][j] === '@' && isAccessibleRoll(grid, i, j)) {
                countOfAccessibleRolls++;
            }
        }
    }
    return countOfAccessibleRolls;
}

function removeAllAccessibleRolls(grid) {
    let totalRemoved = 0;
    let removed = true;
    
    while (removed) {
        removed = false;
        const numRows = grid.length;
        const numCols = grid[0].length;
        const toRemove = [];
        
        // Find all accessible rolls in current state
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (grid[i][j] === '@' && isAccessibleRoll(grid, i, j)) {
                    toRemove.push([i, j]);
                }
            }
        }
        
        // Remove them all at once
        for (let [i, j] of toRemove) {
            grid[i][j] = '.';
            totalRemoved++;
            removed = true;
        }
        
        // if (removed) {
        //     console.log(`Removed ${toRemove.length} rolls, total so far: ${totalRemoved}`);
        // }
    }
    
    return totalRemoved;
}

