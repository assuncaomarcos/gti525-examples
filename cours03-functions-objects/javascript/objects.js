console.log("--------------  objets -------------- ");

// Initialisation d'un objet vide
let empty = {};

// Objet avec deux attributs
let objName = {
    firstName: "Véronique",
    lastName: "Janvier"
};

console.log(objName["firstName"]);
console.log(objName.firstName);

console.log(objName["lastName"]);
console.log(objName.lastName);


objName = {
    firstName: "Véronique",
    lastName: "Janvier"
};

objName?.middleName?.slice(2);

objName.lastName = "Leclair";
console.log(objName);

// ------------ Méthodes

// Initialisation d'un objet vide
let kangaroo = {};

// Creation d'une proprieté / méthode
kangaroo.speak = function(line) {
    console.log(`Le kangourou dit: ${line}`);
};

kangaroo.speak("Je suis vivant.");

function speak(line) {
    console.log(`Le ${this.type} a dit: '${line}'`);
}

let wallaby  = {type: "wallaby", speak};
let redKangaroo = {type: "kangourou roux", speak};

wallaby.speak("Je saute!");

redKangaroo.speak("Je saute plus haut!");

function speak2(line) {
    console.log(`Le ${this.type} a dit: '${line}'`);
}

redKangaroo = {type: "kangourou roux"};

speak2.call(redKangaroo, "Je saute plus haut!");