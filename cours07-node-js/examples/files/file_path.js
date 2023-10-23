const path = require('node:path');
const bookPath = "alice_book.txt";

console.log(path.dirname(bookPath));
console.log(path.basename(bookPath));
console.log(path.extname(bookPath));