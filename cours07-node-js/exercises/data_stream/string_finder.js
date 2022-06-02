const fs = require('fs');
const filename = __dirname + '/alice_in_wonderland.txt';
const textToFind = "large rose-tree stood";
//const textToFind = "Alice";
const readStream = fs.createReadStream(filename);

let oldBloc = "";
let index = -1;

readStream.on("data", bloc => {
    console.log("# caractères lus: " + bloc.length);
    let newBloc = oldBloc + bloc;
    index = newBloc.indexOf(textToFind);
    if (index >= 0) {
        readStream.emit("end");
    }
    oldBloc = bloc;
});

readStream.on("end", () => {
    if (index >= 0) {
        console.log("Chaine trouvée: " + textToFind);
    } else {
        console.log("Chaine introuvable: " + textToFind);
    }
});

readStream.on("error", () => {
    console.log("Erreur de lecture: " + filename);
});