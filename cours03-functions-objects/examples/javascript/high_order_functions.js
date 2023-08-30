console.log("-------------- fonctions d'ordre supérieur --------------");

function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(4, console.log);

let values = [];
repeat(5, i => values.push(`Valeur: ${i + 1}`));
console.log(values);

// ------------

const fruits = ['pomme', 'banane', 'orange'];
fruits.forEach(fruit => console.log(fruit));

function doSomething(callback) {
    console.warn("En train de faire quelque chose...");
    callback();
}

function onComplete() {
    console.log("Opération finalisée.");
}

doSomething(onComplete);

// ------------

values = [85, 95, 87, 40, 55, 72, 55];
console.log(values.filter( v => v > 70));

// ------------

const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // 2, 4, 6, 8

let mapped = [3, 1, 5, 7, 2].map(n => n + 10);
console.log(mapped);  // 13,11,15,17,12

// ------------

values = [1, 2, 3, 4];
let reduced = values.reduce((a, b) => a + b, 0);

console.log(reduced);  // 10

// ------------

function max(...values) {
    let result = -Infinity;
    for (let value of values) {
        if (value > result) result = value;
    }
    return result;
}

console.log(max(40, 50, 55, 88, 32));
let grades = [50, 60, 70, 55, 85];
console.log(max(...grades));      // spread

console.log([40, 35, ...grades, 90, 95]);

