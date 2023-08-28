for (let n = 1; n <= 50; n++) {
    let result = "";
    if (n % 3 == 0)
        result += "Fizz";
    if (n % 5 == 0)
        result += "Buzz";
    console.log(result);
}

for (let dashes = "#"; dashes.length < 8; dashes += "#")
    console.log(dashes);