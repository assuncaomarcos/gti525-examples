import * as tf from "@tensorflow/tfjs-node";
import { readFileSync } from "node:fs";

// Charger l'image
const imageBuffer = readFileSync("opera_house.jpg");

// Utiliser tf.tidy pour libérer de la mémoire
tf.tidy(() => {
    // Créer un tenseur en couleur à partir de l'image
    const imageTensor = tf.node.decodeImage(imageBuffer);
    console.log(`Tenseur couleur créé : ${imageTensor.shape}`); // [Hauteur, Largeur, 3]

    // Décodage en niveaux de gris (Force 1 seul canal)
    const imageBWTensor = tf.node.decodeImage(imageBuffer, 1);
    console.log(`Tenseur noir et blanc créé : ${imageBWTensor.shape}`); // [Hauteur, Largeur, 1]
});