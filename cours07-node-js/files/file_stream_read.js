// Compter le nombre total de caractères dans un fichier texte donné
const fs = require('fs');
if (!fs) process.exit(1);

let length = 0;
const filename = __dirname + "/alice_in_wonderland.txt";
const readStream = fs.createReadStream(filename);

readStream.on("data", function (blob) {
    console.log("Caractères lus: " + blob.length);
    length += blob.length;
});

readStream.on("end", function () {
    console.log("Nombre total de caractères lus: " + length);
});

readStream.on("error", function () {
    console.log("Une erreur est survenue lors de la lecture du fichier: " + filename);
});

console.log("Fin du programme");