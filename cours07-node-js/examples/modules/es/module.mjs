/**
 * Exemples de ce qu'on peut exporter dans un module ECMAScript
 */

// Un ensemble de fonctions
export const multiply = (a, b) => a * b;
export const sum = (a, b) => a - b;
export const divide = (a, b) => a / b;
export const subtract = (a, b) => a - b;

// Des fonctions constructeurs
export const Person = function (firstName, lastName, age, isEmployed) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.isEmployed = isEmployed;
};

// Des objets entiers via l'objet
export const onePerson = new Person("Marc", "Dupont", 20, true);

// Des fermetures
export function counter( initial ) {
    let value = initial;
    return {
        increment: function() { value += 1; },
        reset: function() { value = initial; },
        get: function() { return value; }
    }
};

// Des classes
export class Car {
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