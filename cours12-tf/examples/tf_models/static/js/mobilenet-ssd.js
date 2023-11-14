/**
 * Code adapté de l'exemple du chapitre 6 du livre
 * Learning TensorFlow.js : Powerful Machine Learning in JavaScript
 */

import { COCO_LABELS } from "./coco_labels.js";

const mainSection = document.querySelector('.scale-out');
const preLoader = document.querySelector('.progress');

class SSDMobilenetClassifier {
    static instance = null;
    static modelURL = 'https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1';

    static async getInstance(callback) {
        if (! this.instance ) {
            this.instance = await tf.loadGraphModel(this.modelURL, { fromTFHub: true });
            callback();
        }
        return this.instance;
    }
}

const model = await SSDMobilenetClassifier.getInstance(() => {
    // Pour afficher la section main après le chargement du modèle
    preLoader.classList.add('scale-out');
    mainSection.classList.add('scale-in');
});

const handleClick = async (event) => {
    const image = event.target;
    const div = image.parentNode;

    // Création d'un lot (batch) de taille 1
    const imageTensor = tf.browser.fromPixels(image);
    const batch = tf.expandDims(imageTensor, 0);

    // Préparation du canvas pour dessiner les boîtes
    const detection = div.querySelector("canvas");
    const ctx = detection.getContext('2d');

    // La taille du canvas doit être la même taille de l'image
    const imgWidth = image.width;
    const imgHeight = image.height;
    detection.width = imgWidth;
    detection.height = imgHeight;
    ctx.font = "16px sans-serif";
    ctx.textBaseline = "top";

    // Configuration des seuils de détection
    const detectionThreshold = 0.4;  // Ignorer les classes dont les probabilités sont inférieures à cette valeur
    const iouThreshold = 0.5;
    const maxBoxes = 20;

    // Exécution de la détection d'objet
    const results = await model.executeAsync(batch);

    // Récupération des valeurs des detections plus pertinentes
    const prominentDetection = tf.topk(results[0]);
    const justBoxes = results[1].squeeze();
    const justValues = prominentDetection.values.squeeze();

    // Déplacer les résultats vers JavaScript de façon concurrente
    const [maxIndices, scores, boxes] = await Promise.all([
        prominentDetection.indices.data(),
        justValues.array(),
        justBoxes.array(),
    ]);

    // Application de la suppression non maximale (NMS) pour éliminer les duplicatas
    const nmsDetections = await tf.image.nonMaxSuppressionWithScoreAsync(
        justBoxes,  // [numBoxes, 4]
        justValues, // [numBoxes]
        maxBoxes,
        iouThreshold,
        detectionThreshold,
        1 // 0 est normal NMS, 1 est Soft-NMS -- https://arxiv.org/pdf/1704.04503.pdf
    );

    // Récupération des indices sélectionnés après NMS
    const chosen = await nmsDetections.selectedIndices.data();

    // Libération de la mémoire utilisée
    tf.dispose([
        results[0],
        results[1],
        nmsDetections.selectedIndices,
        nmsDetections.selectedScores,
        prominentDetection.indices,
        prominentDetection.values,
        imageTensor,
        batch,
        justBoxes,
        justValues,
    ]);

    // Dessin des rectangles autour des objets détectés
    chosen.forEach((detection) => {
        ctx.strokeStyle = "#db0e0e";
        ctx.lineWidth = 4;
        ctx.globalCompositeOperation = "destination-over";
        const detectedIndex = maxIndices[detection];
        const detectedClass = COCO_LABELS[detectedIndex];
        const detectedScore = scores[detection];
        const dBox = boxes[detection];

        // Aucune valeur négative pour les positions de départ
        const startY = dBox[0] > 0 ? dBox[0] * imgHeight : 0;
        const startX = dBox[1] > 0 ? dBox[1] * imgWidth : 0;
        const height = (dBox[2] - dBox[0]) * imgHeight;
        const width = (dBox[3] - dBox[1]) * imgWidth;
        ctx.strokeRect(startX, startY, width, height);

        // Dessiner le fond de l'étiquette
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#db0e0e";
        const textHeight = 16;
        const textPad = 6;
        const label = `${detectedClass} ${Math.round(detectedScore * 100)}%`;
        const textWidth = ctx.measureText(label).width;
        ctx.fillRect(startX, startY, textWidth + textPad, textHeight + textPad);

        // Dessiner le texte de l'étiquette en dernier pour qu'il est en haut
        ctx.fillStyle = "white";
        ctx.fillText(label, startX + (textPad / 2), startY + (textPad / 2));
    });
}

// Pour rélier le gestionnaire de detection à chaque image
const images = mainSection.querySelectorAll('.classify');
let proportion = undefined;
for (const img of images) {
    img.addEventListener("click", handleClick);
    const div = img.parentNode;

    // Pour placer les remerciements des photos dans la partie inférieure des onglets
    const credits = div.querySelector(".credits");
    if (credits) {
        let imgHeight = img.height;
        if (!proportion) {
            proportion = img.width / img.naturalWidth;
        } else {
            imgHeight *= proportion;
        }
        credits.style.marginTop = `${imgHeight}px`;
    }
}