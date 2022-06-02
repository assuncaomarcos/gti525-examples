// Exécutez ce code pour avant de travailler sur l'activité pour télécharger
// le livre "Alice in Wonderland" depuis le projet Gutenberg
const http = require('https');
const fs = require('fs');

const file = fs.createWriteStream("alice_in_wonderland.txt");
const request = http.get("https://www.gutenberg.org/files/11/11-0.txt",
    (response) => {
        response.pipe(file);
    });