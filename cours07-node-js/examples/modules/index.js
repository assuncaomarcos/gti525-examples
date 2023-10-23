/**
 * Utilisation des modules CommonJS
 */
const cjs = require("./common");

// Utilisation d'une fonction exportée
console.log(`La somme est: ${cjs.sum(10, 20)}`);

// D'une fonction constructeur
const person1 = new cjs.Person("Élise", "Tremblay", 31, true);
console.log(JSON.stringify(person1));

// D'un object
console.log(JSON.stringify(cjs.onePerson));

// De la fermeture
const counter = cjs.counter(0);
counter.increment();
counter.increment();
console.log(`Valeur du compteur: ${counter.get()}`);

// De la classe
const car = new cjs.Car("Ford", "F-150", 2021);
console.log(JSON.stringify(car));