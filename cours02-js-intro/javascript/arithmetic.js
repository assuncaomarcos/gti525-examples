console.log("-------------- arithmetic --------------");

let foo = 5;
foo = foo + 1 - 2 * (4 - 1);
console.log("foo = " + foo); // 0

let bar = 4;
bar += bar++;
console.log("bar = " + bar);  // 8

let baz = 4;
baz += ++baz;
console.log("baz = " + baz);  // 9