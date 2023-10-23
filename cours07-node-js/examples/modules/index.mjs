import  * as es from "./es/module.mjs";

// Utilisation d'une fonction exportée
console.log(`La somme est: ${es.sum(10, 20)}`);

// D'une fonction constructeur
const person1 = new es.Person("Élise", "Tremblay", 31, true);
console.log(JSON.stringify(person1));

// D'un object
console.log(JSON.stringify(es.onePerson));

// De la fermeture
const counter = es.counter(0);
counter.increment();
counter.increment();
console.log(`Valeur du compteur: ${counter.get()}`);

// De la classe
const car = new es.Car("Ford", "F-150", 2021);
console.log(JSON.stringify(car));