console.log(":: functions ::");

const square = function(x) {
    return x * x;
};

console.log(square(4));

// ----------

const makeNoise = function() {
    console.log("bang !");
};

makeNoise();

const power = function(base, exponent) {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};

// ----------

console.log(power(2, 4));

function areaOfCircle(radius) {
    const PI = 3.1416;
    return PI * square(radius);
}

function square(x) {
    return x * x;
}

let areaA = areaOfCircle(2);
console.log("Aire d'un cercle de rayon 2: " + areaA);

// ----------

function areaOfCircle2(radius) {
    const PI = 3.1416;

    function square(x) {
        return x * x;
    }

    return PI * square(radius);
}

let areaB = areaOfCircle2(2);
console.log("Aire d'un cercle de rayon 2: " + areaB);

// ----------

function areaOfCircle3(radius) {
    const PI = 3.1416;

    // Ceci est une fonction imbriquée
    function piSquare(x) {
        let sq = x * x;
        return PI * sq;
    }

    return piSquare(radius);
}

let areaC = areaOfCircle3(2);
console.log("Aire d'un cercle de rayon 2: " + areaC);

// ----------

const power2 = (base, exponent) => {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};

console.log(power2(2, 4));

// ----------

const square1 = (x) => {return x * x; };
const square2 = x => x * x;

console.log(square1(2));
console.log(square2(4));
