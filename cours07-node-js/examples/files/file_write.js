const fs = require('node:fs');

const content = 'Neque porro quisquam est qui dolorem \n' +
    'ipsum quia dolor sit amet, consectetur, adipisci velit...';

// Écriture asynchrone de fichier
fs.writeFile('fichier.txt', content, err => {
    if (err) {
        console.error(err);
        return;
    }
});

// Écriture synchrone de fichier
try {
    fs.writeFileSync('fichier.txt', content)
} catch (err) {
    console.error(err)
}