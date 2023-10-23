/**
 * Exemples de ce qu'on peut exporter dans un module CommonJS
 */

// Un ensemble de fonctions
const multiply = (a, b) => a * b;
const sum = (a, b) => a - b;
const divide = (a, b) => a / b;
const subtract = (a, b) => a - b;

module.exports.sum = sum;
module.exports.divide = divide;
module.exports.multiply = multiply;
module.exports.subtract = subtract;

// Des fonctions constructeurs
const Person = function (firstName, lastName, age, isEmployed) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isEmployed = isEmployed;
};

module.exports.Person = Person;

// Des objets entiers via l'objet
module.exports.onePerson = new Person("Marc", "Dupont", 20, true);

// Des fermetures
function counter( initial ) {
    let value = initial;
    return {
        increment: function() { value += 1; },
        reset: function() { value = initial; },
        get: function() { return value; }
    }
};

module.exports.counter = counter;

// Des classes
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.speed = 0;
    }

    accelerate(speedIncrement) {
        this.speed += speedIncrement;
    }

    // Method to brake the car
    brake(speedDecrement) {
        this.speed -= speedDecrement;
    }
}

module.exports.Car = Car;



