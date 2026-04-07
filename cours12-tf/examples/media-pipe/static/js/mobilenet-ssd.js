
import { ObjectDetector, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

const statusText = document.getElementById("status");
const mainContent = document.getElementById("main-content");
const preLoader = document.querySelector('.progress');

let objectDetector;

async function initializeDetector() {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    objectDetector = await ObjectDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/object_detector/ssd_mobilenet_v2/float16/1/ssd_mobilenet_v2.tflite`,
            delegate: "GPU"
        },
        scoreThreshold: 0.4,
        maxResults: -1,
        runningMode: "IMAGE"
    });

    preLoader.classList.add('scale-out');
    statusText.innerText = "Prêt ! Cliquez sur l'image pour détecter les objets.";
    mainContent.classList.add('scale-in');
}

initializeDetector();

async function handleClick(event) {
    if (!objectDetector) return;

    const imageElement = event.target;
    const divElement = imageElement.parentNode;

    const highlighters = divElement.getElementsByClassName("highlighter");
    while (highlighters[0]) {
        divElement.removeChild(highlighters[0]);
    }

    const infos = divElement.getElementsByClassName("label");
    while (infos[0]) {
        divElement.removeChild(infos[0]);
    }

    // Exécuter la détection
    const detections = objectDetector.detect(imageElement);
    displayImageDetections(detections, imageElement);
}

function buildLabelStyle(box, ratio) {
    const left = box.originX * ratio;
    const top = box.originY * ratio;
    const width = box.width * ratio + 10;

    return `left: ${left}px; top: ${top}px; width: ${width}px;`;
}

function buildHighlighterStyle(box, ratio) {
    const left = box.originX * ratio;
    const top = box.originY * ratio;
    const width = box.width * ratio;
    const height = box.height * ratio;

    return `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px;`;
}


function displayImageDetections(result, resultElement) {
    const ratio = resultElement.height / resultElement.naturalHeight;

    for (let detection of result.detections) {
        const p = document.createElement("p");
        p.setAttribute("class", "label");
        p.innerText =
          detection.categories[0].categoryName +
          " - avec " +
          Math.round(parseFloat(detection.categories[0].score) * 100) +
          "% de confiance.";

        p.style = buildLabelStyle(detection.boundingBox, ratio);

        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style = buildHighlighterStyle(detection.boundingBox, ratio);

        resultElement.parentNode.appendChild(highlighter);
        resultElement.parentNode.appendChild(p);
    }
}

document.querySelectorAll(".classify").forEach(img => {
    img.addEventListener("click", handleClick);
});