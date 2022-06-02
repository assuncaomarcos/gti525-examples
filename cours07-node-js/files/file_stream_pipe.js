const fs = require("fs");

const filename1 = __dirname + "/alice_in_wonderland.txt";
const filename2 = __dirname + "/alice_in_wonderland_pipe.txt";
const readStream = fs.createReadStream(filename1);
const writeStream = fs.createWriteStream(filename2);

readStream.pipe(writeStream);