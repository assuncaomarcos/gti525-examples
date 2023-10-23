const fs = require('node:fs');

const bookPath = "alice_book.txt";

// Lecture de fichier via des flux de données
let length = 0;
const readStream = fs.createReadStream(bookPath);

readStream.on("data", function (blob) {
    console.log("Caractères lus: " + blob.length);
    length += blob.length;
});

readStream.on("end", function () {
    console.log("Nombre total de caractères lus: " + length);
});

readStream.on("error", function () {
    console.log("Une erreur est survenue lors de la lecture du fichier: " + bookPath);
});
// ----------------------------------------------------

// Lecture via async/await
async function readChunks(readable) {
    let length = 0;
    for await (const chunk of readable) {
        console.log("Caractères lus: " + chunk.length);
        length += chunk.length;
    }
    return length;
}

const readStreamAwait = fs.createReadStream(bookPath, {encoding: 'utf8'});
readChunks(readStreamAwait).then(length => {
    console.log("Nombre total de caractères lus: " + length);
});
// ----------------------------------------------------

// Copie de fichier via des flux de données
const bookCopyPath = __dirname + "/copy_alice_book.txt";
const readStreamCopy = fs.createReadStream(bookPath);
const writeStreamCopy = fs.createWriteStream(bookCopyPath);

readStreamCopy.on("data", function (blob) {
    console.log("Caractères lus: " + blob.length);
    writeStreamCopy.write(blob);
});

readStreamCopy.on("end", function () {
    console.log("Fin du flux");
    writeStreamCopy.end();
});
// ----------------------------------------------------

// Copie de fichier via des flux de données et des tuyaux (pipes)
const readStreamPipe = fs.createReadStream(bookPath);
const writeStreamPipe = fs.createWriteStream(bookCopyPath);
readStreamPipe.pipe(writeStreamPipe);


