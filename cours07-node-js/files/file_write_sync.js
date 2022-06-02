const fs = require('fs');

const content = 'Neque porro quisquam est qui dolorem ' +
    'ipsum quia dolor sit amet, consectetur, adipisci velit...';

try {
    fs.writeFileSync('fichier.txt', content)
} catch (err) {
    console.error(err)
}