const fs = require('fs');
const path = require('path');

function readFile(file) {
    return fs.readFileSync(path.resolve(file), 'utf8');
}

function readFileLines(file) {
    return readFile(file)
        .split(/\r?\n/)
        .filter(line => line.trim() !== '');
}

function readFileLinesWithBlanks(file) {
    const content = fs.readFileSync(path.resolve(file), 'utf8');
    return content.split(/\r?\n/);
}

module.exports = {readFile, readFileLines, readFileLinesWithBlanks};