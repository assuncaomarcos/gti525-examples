let arrays = [[1, 2], [3, 4, 5], [6], [7, 8 , 9]];

function mergeArrays(list) {
    let merged = [];
    list.forEach( arr => merged = merged.concat(arr));
    return merged;
}

let merged = mergeArrays(arrays);

console.log(merged);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]