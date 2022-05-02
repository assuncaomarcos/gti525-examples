console.log(":: loops.js ::");

for (let number = 0; number <= 5; number++) {
    console.log(number);
}

console.log(" -------- ");

for (let number = 20; ; number++) {
    if (number % 7 == 0) {
        console.log(number);
        break;
    }
}

console.log(" -------- ");

// --------

let number = 0;
while (number <= 30) {
    console.log(number);
    number += 5;
}

number = 0;
do {
    console.log(number);
    number += 5;
} while (number <= 30);