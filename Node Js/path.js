// Title - Implementing Path module of Node Js
// Author - Priyadharshini S
// Created Date - 29/04/2024

const path = require('path');

const fullPath = path.join('/path', 'to', 'file.txt');
console.log('Full Path:', fullPath);

const dirname = path.dirname(fullPath);
console.log('Directory Name:', dirname);

const extname = path.extname(fullPath);
console.log('File Extension:', extname);

const basename = path.basename(fullPath);
console.log('Base Name:', basename);

const resolvedPath = path.resolve('example.txt');
console.log('Resolved Path:', resolvedPath);
