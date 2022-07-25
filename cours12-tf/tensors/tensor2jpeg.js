const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

// Créer une image avec un contenu aléatoire
const tensor = tf.randomUniform([400, 400, 3], 0, 255);

tf.node.encodeJpeg(
    tensor,
    "rgb",    // format
    90,       // quality
    true,     // progressive
    true,     // optimizeSize
    true,     // chromaDownsampling
    "cm",     // densityUnit
    250,      // xDensity
    250,      // yDensity
    "Crée par TFJS Node"
).then( f => {
    fs.writeFileSync("tensor.jpg", f);
    console.log("Fichier sauvergadé");
});

tensor.dispose();