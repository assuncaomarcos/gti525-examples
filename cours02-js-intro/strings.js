console.log(":: strings ::");

console.log("telephone".slice(0, 4));       // tele
console.log("telephone".indexOf("e"));      // 1
console.log("telephone".indexOf("ph"));     // 4
console.log("telephone".lastIndexOf("e"));  // 8

// ----------

let sentence = `Apprendre n'est pas savoir ; il y a les sachant et les savants : 
c'est la mémoire qui fait les uns, c'est le philosophie qui fait les autres.`;

let words = sentence.split(" ");
console.log(words);
console.log(words.join("-"));

// ----------

console.log("ETS".repeat(3)); // ETSETSETS

// ----------

let string = "ETS";
console.log(string.length);   // 3
console.log(string[1]);       // T

