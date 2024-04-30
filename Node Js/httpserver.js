// Title - Implementing http module of Node Js
// Author - Priyadharshini S
// Created Date - 28/04/2024
// Modified Date - 30/04/2024

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});


