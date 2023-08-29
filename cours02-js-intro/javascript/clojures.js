console.log("-------------- clojures --------------");

function compteur() {
    let compte = 0;

    function increment() {
        compte++;
        console.log(compte);
    }

    return increment;
}

let incrementer = compteur();
incrementer(); // Affiche 1
incrementer(); // Affiche 2


function wrapValue(n) {
    let local = n;
    return () => local;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);

console.log(wrap1());   // 1
console.log(wrap2());   // 2

// ----------

function multiplier(factor) {
    // retourne une fonction flechée
    return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));  // 10

// ----------

function adder(val) {
    let value = val;
    // Retourne une fonction afin d'effectuer son traitement
    return inc => {
        // Peut accéder aux variables locales de la fonction parent
        value += inc;
        return value;
    }
}

let plus5 = adder(5);
console.log(plus5(3)); // 8
console.log(plus5(2)); // 10

// ----------

function counter(initial) {
    let value = initial;

    // Renvoie des fonctions pour obtenir la valeur du compteur, l’incrémenter, et le réinitialiser
    return {
        get: function () { return value; },
        increment: function () { value += 1; },
        reset: function () { value = initial; }
    }
}

let counter1 = counter(5);
let counter2 = counter(10);

counter1.increment(); // 6
counter1.reset();     // 5
counter1.increment(); // 6

counter2.increment(); // 11
counter2.increment(); // 12

console.log(counter1.get(), counter2.get());

