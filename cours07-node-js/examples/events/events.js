const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

/* La méthode eventEmitter.on() est utilisée pour enregistrer les écouteurs */
myEmitter.on('event', () => {
    console.log('Gestionnaire 1 : Un événement s\'est produit !');
});

/* Ou via la méthode addListener() */
myEmitter.addListener('event', () => {
    console.log('Gestionnaire 2 : Un événement s\'est produit !');
});

/*
    La méthode eventEmitter.emit() est utilisée pour
    déclencher l'événement.
*/

myEmitter.emit('event');

/*
    La méthode eventEmitter.emit() permet de transmettre un ensemble
    arbitraire d'arguments aux fonctions d'écoute. La liaison 'this'
    fait référence à l'instance d'EventEmitter
* */
myEmitter.on('event_with_params', function(a, b) {
    console.log(a, b, this === myEmitter, this);
});

myEmitter.emit('event_with_params', 'a', 'b');

/*
    Il est possible d'utiliser des fonctions fléchées
    comme des écouteurs
* */
myEmitter.on('event_arrow', (a, b) => {
    console.log(a, b);
    console.dir(this);
});

myEmitter.emit('event_arrow', 'a', 'b');

/*
    La méthode eventEmitter.once() permet d'enregistrer
    une fonction d'écoute appelée au plus une fois
 */
let m = 0;
myEmitter.once('event_once', () => {
    console.log(`Appelée ${++m} fois`);
});
myEmitter.emit('event_once');
myEmitter.emit('event_once'); // pas traité

/*
    Les fonctions d'écoute peuvent basculer vers un mode de
    fonctionnement asynchrone à l'aide des méthodes setImmediate()
    ou process.nextTick()
 */
myEmitter.on('event_async', (a, b) => {
    setImmediate(() => {
        console.log('Cela se produit de manière asynchrone.');
    });
});

myEmitter.emit('event_async', 'a', 'b');