const fs = require('fs');

fs.readFile('alice_in_wonderland.txt', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return
    }
    console.log(data.substring(0, 300));
})