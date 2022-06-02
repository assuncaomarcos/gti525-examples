// Importer le module calculator
var calculator = require("./calculator");
console.log(`La somme est ${calculator.sum(10, 20)}`);

// Importer le module shapes
var Point = require("./shapes");
var p = new Point(1, 2);
console.log(`Point: ${p}`);

// Importer le module counter
var Counter = require("./counter");
var counter = Counter(5);
counter.increment();  counter.reset(); counter.increment();
console.log(`Valeur du compteur ${counter.get()}`);

// Importer le module square
const Square = require('./square');
const square = new Square(2);
console.log(`L'aire de square est ${square.area()}`);