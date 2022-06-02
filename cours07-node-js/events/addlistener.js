const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.addListener('event', () => {
    console.log('Un événement s\'est produit !');
});

myEmitter.emit('event');