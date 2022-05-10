console.log(":: fonctions d'ordre supérieur ::");

function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

repeat(4, console.log);

let values = [];
repeat(5, i => {
    values.push(`Valeur: ${i + 1}`);
});
console.log(values);

// ------------

let letters = ["a", "b", "c"];
letters.forEach(v => console.log(v));

// ------------

values = [85, 95, 87, 40, 55, 72, 55];
console.log(values.filter( v => v > 70));

// ------------

function map(array, transform) {
    let result = [];
    for (let element of array) {
        result.push(transform(element));
    }
    return result;
}

let mapped = map( [3, 1, 5, 7, 2], num => num + 10 );
console.log(mapped);

mapped = [3, 1, 5, 7, 2].map(num => num + 10);
console.log(mapped);

// ------------

let reduced = values.reduce((a, b) => a + b);
console.log(reduced);

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

