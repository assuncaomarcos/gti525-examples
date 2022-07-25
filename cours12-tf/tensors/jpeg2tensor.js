const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");

const marseilleImage = fs.readFileSync("marseille_med.jpg");

tf.tidy( () => {
    // Crée un tenseur en couleur
    const marseilleTensor = tf.node.decodeImage(marseilleImage);
    console.log(`Tenseur créer à partir de l'image du DOM: ${marseilleTensor.shape}`);

    // Crée un tenseur en niveaux de gris
    const marseilleBWTensor = tf.node.decodeImage(marseilleImage, 1);
    console.log(`Tenseur créer à partir de l'image du DOM: ${marseilleBWTensor.shape}`);
});