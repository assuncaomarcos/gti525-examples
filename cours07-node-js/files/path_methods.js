const path = require('path');

const filename = '/content/files/alice_in_wonderland.txt';
console.log(path.dirname(filename));
console.log(path.basename(filename));
console.log(path.extname(filename));