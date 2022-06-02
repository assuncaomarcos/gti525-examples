const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('Cela se produit de manière asynchrone.');
    });
});

myEmitter.emit('event', 'a', 'b');