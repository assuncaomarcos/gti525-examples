console.log(":: functions ::");

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