const http = require('http');
const fs = require('fs');
const { Transform } = require('stream');

const hostname = 'localhost';
const port = process.env.NODE_PORT || 3000;
const dataset = 'video_game_films.csv';

class ToJson extends Transform {
    constructor() {
        super();
        this.firstChunk = true;
        this.fieldNames = null;
    }

    _transform(chunk, encoding, callback) {
        let lines = chunk.toString().split('\n');
        if (this.firstChunk) {
            this.fieldNames = lines.shift().trim().split(',');
            this.firstChunk = false;
        }

        let objs = [];
        lines.forEach(line => {
            let values = line.trim().split(',');
            let obj = {};
            values.forEach((value, index) => {
                obj[this.fieldNames[index]] = value;
            });
            objs.push(obj);
        });

        callback(null, JSON.stringify(objs));
    }
}

const server = http.createServer((req, res) => {
    if (req.url.startsWith("/movies")) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        const stream = fs.createReadStream(dataset);
        stream.pipe(new ToJson()).pipe(res);
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Introuvable");
    }
})

server.listen(port, hostname, () => {
    console.log(`Serveur démarré à l'adresse http://${hostname}:${port}/`);
})