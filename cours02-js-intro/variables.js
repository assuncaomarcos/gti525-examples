let a = 10;
let b = 9.7;
let c = 1.997e8;
let d = 2 + 3;

console.log(`a = ${a}, b = ${b}, c = ${c}, d = ${d}`); // ES6

let myVariable = a + 5.5;   // 15.5
console.log("myVariable = " + myVariable);

let funnyNumber = "a" + a;
console.log(`funnyNumber = ${funnyNumber}`);

let myString = "Une chaine de caracteres";
let badNumber = b / myString; // NaN, pas possible de diviser par une chaine
console.log(`badNumber = ${badNumber}`);

// Les nombres plutot speciaux
console.log("Valeur de Number.MAX_VALUE = " + Number.MAX_VALUE);

let longString = myString + " plus longue";
console.log(longString);

let anotherString = `La moitie de 100 est ${100 / 2}`;
console.log(anotherString);