const mainSection = document.querySelector('.scale-out');
const preLoader = document.querySelector('.progress');

class CocoSSDClassifier {
    static instance = null;

    static async getInstance(callback) {
        if (! this.instance ) {
            this.instance = await cocoSsd.load({ base: "mobilenet_v2"});
            callback();
        }
        return this.instance;
    }
}

const model = await CocoSSDClassifier.getInstance(() => {
    // Pour afficher la section main après le chargement du modèle
    preLoader.classList.add('scale-out');
    mainSection.classList.add('scale-in');
});

const handleClick = async (event) => {
    const image = event.target;
    const div = image.parentNode;

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

    const detectionThreshold = 0.4;  // Ignorer les classes dont les probabilités sont inférieures à cette valeur
    const maxBoxes = 20;
    const detections = await model.detect(image, maxBoxes, detectionThreshold);

    // Dessin des rectangles autour des objets détectés
    detections.forEach(detection => {
        ctx.strokeStyle = "#db0e0e";
        ctx.lineWidth = 4;
        ctx.globalCompositeOperation = "destination-over";

        const [startX, startY, width, height ] = detection.bbox;
        ctx.strokeRect(startX, startY, width, height);

        // Dessiner le fond de l'étiquette
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#db0e0e";
        const textHeight = 16;
        const textPad = 6;
        const label = `${detection.class} ${Math.round(detection.score * 100)}%`;
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