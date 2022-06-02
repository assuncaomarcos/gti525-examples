const fs = require('fs');

try {
    const data = fs.readFileSync('alice_in_wonderland.txt', 'utf8')
    console.log(data.substring(0, 300));
} catch (err) {
    console.error(err);
}