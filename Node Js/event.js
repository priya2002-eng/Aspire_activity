<<<<<<< HEAD
// Title - Implementing Event Emitter module of Node Js
// Author - Priyadharshini S
// Created Date - 28/04/2024

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const myEventHandler = () => {
  console.log('Event occurred!');
};

myEmitter.on('myEvent', myEventHandler);

myEmitter.emit('myEvent');
=======
// Title - Implementing Event Emitter module of Node Js
// Author - Priyadharshini S
// Created Date - 28/04/2024

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const myEventHandler = () => {
  console.log('Event occurred!');
};

myEmitter.on('myEvent', myEventHandler);

myEmitter.emit('myEvent');
>>>>>>> 7e34a59c72ecdf000644485e1406dd9a514fbec4
