console.log("-------------- conversion --------------");

console.log(8 * null)     // 0
console.log("5" - 1)      // 4
console.log("5" + 1)      // 51
console.log("five" * 2)   // NaN
console.log(false == 0)   // true

let texte = "123";
let nombre = Number(texte); // Convertit en nombre
let valeur = 456;
let chaine = String(valeur); // Convertit en chaîne de caractères
let zero = 0;
let estVrai = Boolean(zero); // Convertit en booléen

console.log(`nombre: ${nombre}, chaine: ${chaine}, estVrai: ${estVrai}`);

let n = 18;
let binaire = "0b" + n.toString(2);     // 0b10010
let octal = "0o" + n.toString(8);       // 0o22
let hex = "0x" + n.toString(16);        // 0x12

console.log(`binaire: ${binaire}, octal: ${octal}, hex: ${hex}`);

let m = 123456.789;
console.log(m.toFixed(0));              // 123457
console.log(m.toFixed(2));              // 123456.79
console.log(m.toFixed(6));              // 123456.789000
console.log(m.toExponential(3));        // 1.235e+5
console.log(m.toPrecision(1));             // 1e+5
console.log(m.toPrecision(10));            // 123456.7890

console.log(parseInt("3 oranges"));                 // 3
console.log(parseInt("3.53 kilos d'oranges"));      // 3
console.log(parseInt("-34.67"));                    // -34
console.log(parseFloat("0.3"));                     // 0.3