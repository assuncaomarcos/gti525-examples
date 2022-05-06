function isBetween(value, min, max) {
    return min <= value && value <= max;
}

function countChar(string, ch) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == ch) {
            count += 1;
        }
    }
    return count;
}

function countCs(string) {
    return countChar(string, "C");
}