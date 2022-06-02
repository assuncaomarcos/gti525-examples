const fs = require('fs');
const filename = __dirname + "/alice_in_wonderland.txt";

async function readChunks(readable) {
    let length = 0;
    for await (const chunk of readable) {
        console.log("Caractères lus: " + chunk.length);
        length += chunk.length;
    }
    return length;
}

const readStream = fs.createReadStream(filename, {encoding: 'utf8'});
readChunks(readStream).then(length => {
    console.log("Nombre total de caractères lus: " + length);
});