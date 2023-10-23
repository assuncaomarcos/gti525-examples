// Exécutez ce code pour avant de travailler sur l'activité pour télécharger
// le livre "Alice in Wonderland" depuis le projet Gutenberg
const http = require('node:https');
const fs = require('node:fs');

const bookPath = `${__dirname}/alice_book.txt`;
const bookURL = "https://www.gutenberg.org/files/11/11-0.txt";

async function downloadBook(filePath = bookPath, url = bookURL) {
    try {
        if (!fs.existsSync(filePath)) {
            const file = fs.createWriteStream(filePath);
            const request = http.get(url,
                (response) => {
                    response.pipe(file);
                });
        }
    } catch(err) {
        console.error(err)
    }
};

module.exports.ready = downloadBook();
module.exports = { bookPath, bookURL };

