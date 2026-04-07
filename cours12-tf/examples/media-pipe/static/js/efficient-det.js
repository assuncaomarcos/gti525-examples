// Importation des classes nécessaires depuis le SDK MediaPipe
import { ImageClassifier, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

const statusText = document.getElementById("status");
const mainContent = document.getElementById("main-content");
const preLoader = document.querySelector('.progress');
let imageClassifier;

/**
 * Initialisation du classifieur MediaPipe
 */
async function initializeClassifier() {
    // Charger le résolveur Wasm pour les performances
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    // Créer le classifieur avec EfficientNet-Lite0
    imageClassifier = await ImageClassifier.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite`,
            delegate: "GPU" // Utilise WebGPU ou WebGL selon le matériel
        },
        maxResults: 2,
        runningMode: "IMAGE"
    });

    statusText.innerText = "Modèle EfficientNet prêt ! Cliquez sur une image.";
    preLoader.classList.add('scale-out');
    mainContent.classList.add('scale-in');
}

/**
 * Analyse de l'image lors du clic
 */
async function handleClick(event) {
    if (!imageClassifier) return;

    const imgElement = event.target;
    const resultDiv = imgElement.nextElementSibling;
    resultDiv.innerHTML = "<em>Analyse en cours...</em>";

    const results = imageClassifier.classify(imgElement);

    resultDiv.innerHTML = "";
    results.classifications[0].categories.forEach(category => {
        const p = document.createElement("div");
        const probability = Math.round(category.score * 100);
        p.innerHTML = `<span class="label">${category.categoryName}</span>
                       <span class="score">Confiance : ${probability}%</span>`;
        resultDiv.appendChild(p);
    });
}

initializeClassifier();

document.querySelectorAll(".classify").forEach(img => {
    img.addEventListener("click", handleClick);
});
