// Déconstruction d'un objet:

const person1 = { name: 'Léa Dubois', age: 30 };
const { name, age } = person1;
console.log(name); // Affiche 'Léa Dubois'
console.log(age);  // Affiche 30

// Déconstruction dans une fonction :
function printPerson({ name, age }) {
    console.log(`Nom : ${name}, age : ${age}`);
}

const person2 = { name: 'Émilie Martin', age: 25 };
printPerson(person2); // Affiche 'Nom : Émilie Martin, age : 25'

// Déconstruction avec des valeurs par défaut :
const options = { color: 'rouge', size: 'moyenne' };
const { color = 'bleu', size = 'petite', shape = 'ronde' } = options;

console.log(color);   // Affiche 'rouge'
console.log(size);    // Affiche 'moyenne'
console.log(shape);   // Affiche 'ronde'

// Déconstruction de tableaux :
const fruits = ['pomme', 'banane', 'fraise'];
const [first, second, third] = fruits;
console.log(first);   // Affiche 'pomme'
console.log(second);  // Affiche 'banane'
console.log(third);   // Affiche 'fraise'
