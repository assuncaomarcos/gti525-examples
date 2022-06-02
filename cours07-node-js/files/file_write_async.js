const fs = require('fs');

const content = 'Neque porro quisquam est qui dolorem \n' +
    'ipsum quia dolor sit amet, consectetur, adipisci velit...';

fs.writeFile('fichier.txt', content, err => {
    if (err) {
        console.error(err);
        return;
    }
})