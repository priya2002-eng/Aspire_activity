// Title - Implementing File System module of Node Js
// Author - Priyadharshini S
// Created Date - 28/04/2024

const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

const contentToWrite = 'Hello, this is some content to write to the file.';
fs.writeFile('example.txt', contentToWrite, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
    return;
  }
  console.log('Content has been written to the file.');
});

fs.unlink('example.txt', (err) => {
  if (err) {
    console.error('Error deleting file:', err);
    return;
  }
  console.log('File has been deleted.');
});
