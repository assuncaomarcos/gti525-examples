console.log(":: arrays ::");

let numbers = [1, 2, 3, 5, 7, 10];

console.log(numbers[2]);  // 3
console.log(numbers[0]);  // 1
console.log(numbers[numbers.length - 1]);   // 10

// ---------

let grades = [99, 96, 93, 91, 41];
grades.push(67);  // ajoute 67
grades.push(85);  // ajoute 85

console.log(grades);
// [99,96,93,91,41,67,85]

grades.unshift(99.5);  // ajoute 99.5

console.log(grades.pop());
// 85

console.log(grades);
// [99.5,99,96,93,91,41,67]

// ---------

for (let i = 0; i < grades.length; i++) {
    console.log(grades[i]);
}

for (let grade of grades) {
    console.log(grade);
}

// ---------

console.log([70, 80, 85, 87, 90, 80].indexOf(80));      // 1
console.log([70, 80, 85, 87, 90, 80].lastIndexOf(80));  // 5

// ---------

grades = [70, 80, 85, 87, 90, 80];

console.log(grades.slice(2, 5));  // [85,87,90]
console.log(grades.slice(3));     // [87,90,80]
