let arrays = [[1, 2], [3, 4, 5], [6], [7, 8 , 9]];

const mergeArrays = (arrays) => arrays.reduce((prev, cur) => prev.concat(cur), []);

let merged = mergeArrays(arrays);

console.log(merged);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]