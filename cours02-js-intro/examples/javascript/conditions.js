console.log("-------------- structures conditionnelles --------------");

let condition = true;

if (condition) {
    console.log("Instructions à exécuter si la condition est vraie");
} else {
    console.log("Instructions à exécuter si la condition est fausse");
}

if (condition)
    console.log("Cette ligne s'exécute si la condition est vraie");
console.log("Cette ligne va toujours s'exécuter");

// Retourne vrai si value >= min et value <= max
function isBetween(value, min, max) {
    return ( (value >= min) && (value <= max) );
}

function isBetweenShort(value, min, max) {
    return (max >= value >= min);
}

// La structure suivante
if ( isBetween(15, 10, 20) ) {
    console.log("Nombre dans la plage!");
} else {
    console.log("Nombre hors plage!");
}

// est equivalent à
if ( (15 >= 10) && (15 <= 20) ) {
    console.log("Nombre dans la plage!");
} else {
    console.log("Nombre hors plage!");
}

// Les énoncés if peuvent être imbriqués
if ( isBetween(15, 10, 20) ) {
    if ( isBetween(15, 14, 16) ) {
        console.log("Excellent!");
    } else {
        console.log("Bien.");
    }
} else {
    console.log("Mauvais!");
}

console.log("2 entre 10 et 15: " + isBetweenShort(2,10, 15))
console.log("10 entre 5 et 15: " + isBetween( 10, 5, 15) ); // true
console.log("10 entre 5 et 8: " + isBetween( 10, 5, 8 ) ); // false


if ( isBetween(15, 10, 20) ) {
    if ( isBetween(15, 14, 16) ) {	
	console.log("Excellent!");
    } else {
	console.log("Bien.");
    }
} else {
    console.log("Mauvais!");
}

console.log(" --- Structures if elseif else ---");
let score = 75;
let grade;

if ( score >= 80 ) {
    grade = "A";
} else if (score >= 70) {
    grade = "B";
} else if (score >= 60) {
    grade = "C";
} else if (score >= 50) {
    grade = "D";
} else {
    grade = "F";
}
console.log("Votre résultat est " + grade);

console.log(" --- Exemples de switch/case ---");

let expr = "Oranges";
switch (expr) {
    case "Oranges":
        console.log("Oranges : 0.59 $ le kilo.");
        break;
    case "Pommes":
        console.log("Pommes : 0.32 $ le kilo.");
        break;
    case "Bananes":
        console.log("Bananes : 0.48 $ le kilo.");
        break;
    case "Cerises":
        console.log("Cerises : 3.00 $ le kilo.");
        break;
    case "Mangues":
    case "Papayes":
        console.log("Mangues et papayes : 2.79 $ le kilo.");
        break;
    default:
        console.log("Désolé, nous n'avons plus de " + expr + ".");
}

console.log("Autre chose ?");

let day = 2;
switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        console.log("J'attends le week-end avec impatience");
        break;
    case 6:
        console.log("Samedi");
        break;
    case 7:
        console.log("Dimanche");
        break;
    default:
        console.log("Jour invalide");
}
