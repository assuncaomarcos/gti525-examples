const fs = require('node:fs');

const bookPath = "alice_book.txt";

// Lecture asynchrone de fichier
fs.readFile(bookPath, 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data.substring(0, 300));
});

// Lecture synchrone de fichier
try {
    const data = fs.readFileSync(bookPath, 'utf8')
    console.log(data.substring(0, 300));
} catch (err) {
    console.error(err);
}