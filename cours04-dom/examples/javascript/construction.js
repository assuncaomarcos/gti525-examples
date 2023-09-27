// Construction d'un tableau :
const numbers = [1, 2, 3];
const allNumbers = [...numbers, 4, 5];
console.log(allNumbers); // Affiche [1, 2, 3, 4, 5]

// Combinaison de tableaux :
const firstNumbers = [1, 2, 3];
const otherNumbers = [4, 5, 6];

const firstAndOther = [...firstNumbers, ...otherNumbers];
console.log(firstAndOther); // Affiche [1, 2, 3, 4, 5, 6]

// Copie d'un tableau :
const original = [10, 20, 30];
const copy = [...original];
console.log(copy); // Affiche [10, 20, 30]

// Construction d'objets :
const person = { name: 'Élise Dupont', age: 25 };
const details = { address: '15 Rue de la Liberté, 75001 Paris, France', occupation: 'Développeur' };

const personWithDetails = { ...person, ...details };
console.log(JSON.stringify(personWithDetails));