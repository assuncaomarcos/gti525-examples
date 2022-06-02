const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
    console.log(a, b);
    console.dir(this);
});

myEmitter.emit('event', 'a', 'b');