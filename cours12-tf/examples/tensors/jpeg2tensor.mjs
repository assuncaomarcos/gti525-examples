import * as tf from "@tensorflow/tfjs-node";
import { readFileSync } from "node:fs";

// Charger l'image de Marseille
const marseilleImage = readFileSync("images/marseille_med.jpg");

// Utiliser tf.tidy pour libérer la mémoire automatiquement
tf.tidy(() => {
    // Créer un tenseur en couleur à partir de l'image
    const marseilleTensor = tf.node.decodeImage(marseilleImage);
    console.log(`Tenseur créé à partir de l'image : ${marseilleTensor.shape}`);

    // Créer un tenseur en niveaux de gris à partir de l'image
    const marseilleBWTensor = tf.node.decodeImage(marseilleImage, 1);
    console.log(`Tenseur créé à partir de l'image en niveaux de gris : ${marseilleBWTensor.shape}`);
});