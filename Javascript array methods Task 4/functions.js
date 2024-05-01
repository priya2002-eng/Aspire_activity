// Title: Implementing various functions of Javascript
// Author: Priyadharshini S
// Created date: 01/05/2024

console.log("-------------Higher-Order Function-------------");

function higherOrderFunction(callback, num) {
  console.log("Inside Higher-Order Function");
  callback(num);
}

function callbackExample(num) {
  console.log("Callback function executed with:", num);
}

higherOrderFunction(callbackExample, 5);

console.log("-------------Anonymous Function-------------");

var anonymousFunction = function() {
  console.log("This is an anonymous function");
};

anonymousFunction();

console.log("-------------Arrow Function-------------");

const arrowFunction = () => {
  console.log("This is an arrow function");
};

arrowFunction();
