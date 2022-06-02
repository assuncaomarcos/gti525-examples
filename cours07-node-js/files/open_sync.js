const fs = require('fs');

try {
    const fd = fs.openSync('alice_in_wonderland.txt', 'r')
} catch (err) {
    console.error(err);
}