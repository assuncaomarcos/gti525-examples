console.log("-------------- arrays --------------");

let emptyArray = [];
let numbers = [1, 2, 3, 5, 7, 10];
let mixed = [1.1, true, "poires"];
let sizeFiveArray = Array(5);
let anotherArray = Array(1, 2, 3);
let yetAnotherArray = Array.of(1, 2, 3, 4);

console.log(numbers[2]);  // 3
console.log(numbers[0]);  // 1
console.log(mixed);       // 1.1,true,poires
console.log(emptyArray.length);             // 0
console.log(numbers[numbers.length - 1]);   // 10
console.log(sizeFiveArray.length);          // 5
console.log(anotherArray);                  // 1, 2, 3
console.log(yetAnotherArray);               // 1, 2, 3, 4

let anArray = [1, 2, 3];
let largerArray = [0, ...anArray, 4, 5];
console.log(largerArray);                   // 0,1,2,3,4,5

let sentence = [..."The secret code they created made no sense"];
// T,h,e, ,s,e,c,r,e,t, ,c,o,d,e, ,t,h,e,y, ,c,r,e,a,t,e,d, ,m,a,d,e, ,n,o, ,s,e,n,s,e
console.log(sentence);

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

grades.forEach(grade => {
    console.log("Grade: " + grade);
});

// ---------

console.log([70, 80, 85, 87, 90, 80].indexOf(80));      // 1
console.log([70, 80, 85, 87, 90, 80].lastIndexOf(80));  // 5

// ---------

grades = [70, 80, 85, 87, 90, 80];

console.log(grades.slice(2, 5));  // [85,87,90]
console.log(grades.slice(3));     // [87,90,80]

// ---------

// opérateur rest ...
function max(...values) {
    let maxvalue = -Infinity;
    for (let value of values) {
        if (value > maxvalue) maxvalue = value;
    }
    return maxvalue;
}

console.log(max(40, 50, 55, 88, 32, 99));

let newGrades = [50, 60, 70, 55, 85];
console.log(max(...newGrades));          // opérateur spread ...