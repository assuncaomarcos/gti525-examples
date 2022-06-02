const fs = require("fs");
if (!fs) process.exit(1);

const filename1 = __dirname + "/alice_in_wonderland.txt";
const filename2 = __dirname + "/alice_in_wonderland_copy.txt";
const readStream = fs.createReadStream(filename1);
const writeStream = fs.createWriteStream(filename2);

readStream.on("data", function (blob) {
    console.log("Caractères lus: " + blob.length);
    writeStream.write(blob);
});

readStream.on("end", function () {
    console.log("Fin du flux");
    writeStream.end();
});