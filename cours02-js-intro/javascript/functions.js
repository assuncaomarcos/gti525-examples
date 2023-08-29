console.log("-------------- functions --------------");

// ----- Une fonction comme variable/expression
const square = function(x) {
    return x * x;
};

console.log(square(4));

const makeNoise = function() {
    console.log("boo !");
};

makeNoise();

const power = function(base, exponent) {
    let result = 1;

    for (let count = 0; count < exponent; count++) {
        result *= base;
    }

    return result;
};

console.log(power(2, 4));

// ----- Syntaxe de déclaration

function areaOfCircle(radius) {
    return Math.PI * square(radius);
}

let area = areaOfCircle(2);
console.log("Aire d'un cercle de rayon 2: " + area);

// ----- Fonctions fléchées

const arrow_power = (base, exponent) => {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result;
};

console.log(arrow_power(2, 4));

const arrow_square1 = (x) => {return x * x; };
const arrow_square2 = x => x * x;

console.log(arrow_square1(2));
console.log(arrow_square2(4));

// ---------- Fonctions imbriquées

function areaOfCircle2(radius) {

    function square(x) {
        return x * x;
    }

    return Math.PI * square(radius);
}

let areaB = areaOfCircle2(2);
console.log("Aire d'un cercle de rayon 2: " + areaB);

// ----------

function areaOfCircle3(radius) {

    // Ceci est une fonction imbriquée
    function piSquare(x) {
        let sq = x * x;
        return Math.PI * sq;
    }

    return piSquare(radius);
}

let areaC = areaOfCircle3(2);
console.log("Aire d'un cercle de rayon 2: " + areaC);
