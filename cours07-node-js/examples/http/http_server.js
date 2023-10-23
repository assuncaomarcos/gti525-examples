const http = require('node:http');

const hostname = 'localhost';
const port = process.env.NODE_PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Salut tout le monde!\n');
})

server.listen(port, hostname, () => {
    console.log(`Serveur démarré à l'adresse https://${hostname}:${port}/`);
})