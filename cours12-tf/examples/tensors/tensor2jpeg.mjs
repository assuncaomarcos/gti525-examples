import * as tf from "@tensorflow/tfjs-node";
import fs from "node:fs/promises";

// Créer une image aléatoire
const tensor = tf.randomUniform([400, 400, 3], 0, 255);

try {
    // Encodage du tenseur au format JPEG
    const encodedImage = await tf.node.encodeJpeg(
        tensor,
        "rgb",              // format
        90,                 // quality
        true,            // progressive
        true,           // optimizeSize
        true,    // chromaDownsampling
        "cm",            // densityUnit
        250,               // xDensity
        250,               // yDensity
        "Créé par TFJS Node"
    );

    await fs.writeFile("tensor.jpg", encodedImage);
    console.log("Fichier sauvegardé");
} catch (error) {
    console.error("Une erreur s'est produite :", error);
} finally {
    tensor.dispose();
}
