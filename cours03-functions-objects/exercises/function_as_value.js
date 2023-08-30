function add(x, y) {
    return x + y;
}

function multiply(x, y) {
    return x * y;
}

function calculate(x, y, operation) {
    return operation(x, y);
}

console.log(calculate(5, 3, add)); // Affiche : 8
console.log(calculate(5, 3, multiply)); // Affiche : 15
