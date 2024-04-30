// Title - Implementing Event Emitter module of Node Js
// Author - Priyadharshini S
// Created Date - 28/04/2024
// Modified Date - 30/04/2024

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const myEventHandler = () => {
  console.log('Event occurred!');
};

myEmitter.on('myEvent', myEventHandler);

myEmitter.emit('myEvent');
