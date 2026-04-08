import * as tf from "@tensorflow/tfjs-node";
import fs from "node:fs/promises";

// Création d'un tenseur avec du contenu aléatoire (Bruit)
// Les encodeurs Node.js travaillent sur des valeurs de pixels entières (0-255)
const tensor = tf.randomUniform([400, 400, 3], 0, 255, 'int32');

try {
    // Encodage du tenseur au format JPEG
    const encodedImage = await tf.node.encodeJpeg(
      tensor,
      "rgb",   // Format de couleur (3 canaux)
      90,      // Qualité de compression (1-100)
      true,    // Progressif : affichage graduel sur le web
      true,    // OptimizeSize : réduit le poids du fichier
      true,    // ChromaDownsampling : standard pour le web
      "cm",    // Unité de densité (centimètres)
      250,     // Résolution horizontale (X)
      250,     // Résolution verticale (Y)
      "Cours GTI525 - IA Web 2026" // Commentaire intégré (Metadata)
    );

    await fs.writeFile("tensor.jpg", encodedImage);
    console.log("Image générée et fichier 'tensor.jpg' sauvegardé avec succès.");

} catch (error) {
    console.error("Erreur lors de la génération de l'image :", error);
} finally {
    tensor.dispose();
}