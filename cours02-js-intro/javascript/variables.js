console.log("-------------- variables --------------");

let a = 10;
let b = 9.7;
let c = 1.997e8;
let d = 2 + 3;

console.log(`a = ${a}, b = ${b}, c = ${c}, d = ${d}`);

let myVariable = a + 5.5;
console.log("myVariable: " + myVariable);

let funnyNumber = "a" + a;
console.log(`funnyNumber: ${funnyNumber}`);

let myString = "Bonjour le monde !";
let badNumber = b / myString;           // NaN, pas possible de diviser par une chaine
console.log(`badNumber: ${Number.isNaN(badNumber)}`);

// Les nombres plutot speciaux
console.log("Number.MAX_VALUE: " + Number.isFinite(Number.MAX_VALUE));

let longString = myString + " JavaScript !";
console.log(longString);

let anotherString = `La moitie de 100: ${100 / 2}`;
console.log(anotherString);