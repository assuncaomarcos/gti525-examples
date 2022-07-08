const http = require('http')
const fs = require('fs')
const port = process.env.NODE_PORT || 3000

const { Transform } = require('stream');
const transformStream = new Transform();

transformStream._transform = (chunk, encoding, callback) => {
    transformStream.push(chunk.toString().toUpperCase());
    callback();
};

const server = http.createServer((req, res) => {
    const stream = fs.createReadStream(__dirname + '/alice_in_wonderland.txt')
    stream.pipe(transformStream).pipe(res)
})

server.listen(port)