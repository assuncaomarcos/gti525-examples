const fs = require('fs');

fs.stat('alice_in_wonderland.txt', (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('isFile: ' + stats.isFile());
    console.log('isDirectory: ' + stats.isDirectory());
    console.log('isSymbolicLink: ' + stats.isSymbolicLink());
    console.log('size: ' + stats.size);
})