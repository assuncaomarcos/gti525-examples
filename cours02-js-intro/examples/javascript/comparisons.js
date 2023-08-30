console.log("-------------- conditions --------------");

let x = 5;
console.log(`x == 5 :  ${x == 5}`);        // true
console.log(`x != 4 :  ${x != 4}`);        // true
console.log(`x > 5 : ${x > 5}`);           // false
console.log(`x >= 5 : ${x >= 5}`);         // true
console.log(`x < 5 : ${x < 5}`);           // false
console.log(`x <= 5 : ${x <= 5}`);         // true

console.log(`x == 5 : ${x === 5}`);         // true
console.log(`x === "5" : ${x === "5"}`);    // false
console.log(`x !== 5 : ${x !== 5}`);        // false
console.log(`x !== "5" : ${x !== "5"}`);    // true

let foo = "Pommes";
console.log(`foo == "Pommes" ${foo == "Pommes"}`);      // true
console.log(`foo === Pommes :  ${foo === "Pommes"}`);   // true
console.log(`foo != "Oranges" : ${foo != "Oranges"}`);  // true
console.log(`foo !== "42" : ${foo !== "42"}`);          // true

let y = "5";
let z = 5;
console.log(`x == 5 : ${y == 5}`);    // true
console.log(`x === 5 : ${y === 5}`);  // false
console.log(`y === 5 : ${z === 5}`);  // true
