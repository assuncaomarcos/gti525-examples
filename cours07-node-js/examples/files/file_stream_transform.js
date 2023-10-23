const http = require('node:http');
const fs = require('node:fs');
const port = process.env.NODE_PORT || 3000;

const bookPath = "alice_book.txt";

const { Transform } = require('stream');
const transformStream = new Transform();

transformStream._transform = (chunk, encoding, callback) => {
    transformStream.push(chunk.toString().toUpperCase());
    callback();
};

const server = http.createServer((req, res) => {
    const stream = fs.createReadStream(bookPath);
    stream.pipe(transformStream).pipe(res);
})

server.listen(port);