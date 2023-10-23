const fs = require('node:fs');

const bookPath = "alice_book.txt";

// Overture de fichier de facon synchrone
try {
    const fd = fs.openSync(bookPath, 'r')
} catch (err) {
    console.error(err);
}

// Overture de fichier de facon asynchrone
fs.open(bookPath, 'r', (err, fd) => {
    // fd est le descripteur de fichier
});

// Statistiques d'un fichier
fs.stat(bookPath, (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('isFile: ' + stats.isFile());
    console.log('isDirectory: ' + stats.isDirectory());
    console.log('isSymbolicLink: ' + stats.isSymbolicLink());
    console.log('size: ' + stats.size);
});

