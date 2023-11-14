import {INCEPTION_LABELS} from "./inception_labels.js";
const mainSection = document.querySelector('.scale-out');
const preLoader = document.querySelector('.progress');

class InceptionClassifier {
    static instance = null;
    static modelURL = 'https://tfhub.dev/google/tfjs-model/imagenet/inception_v3/classification/3/default/1';

    static async getInstance(callback) {
        if (! this.instance ) {
            this.instance = await tf.loadGraphModel(this.modelURL, { fromTFHub: true });
            callback();
        }
        return this.instance;
    }
}

const classifier = await InceptionClassifier.getInstance(() => {
    // Pour afficher la section main après le chargement du modèle
    preLoader.classList.add('scale-out');
    mainSection.classList.add('scale-in');
});

const handleClick = (event) => {
    const image = event.target;
    tf.tidy(() => {
        const myTensor = tf.browser.fromPixels(image);

        // Inception v3 attend une image de taille 299x299
        const resizedImage = tf.image
            .resizeBilinear(myTensor, [299, 299], true)
            .div(255)
            .reshape([1, 299, 299, 3]);

        const result = classifier.predict(resizedImage);

        // On ne considère que les trois premiers résultats
        const { indices } = tf.topk(result, 3);
        const winners = indices.dataSync();

        const div = image.parentNode;
        div.querySelectorAll('p').forEach(p => p.remove());
        // Pour afficher les prédictions dans un nouvel élément paragraphe
        const p = document.createElement('p');
        p.classList.add("result");
        p.innerText = `Première place: ${INCEPTION_LABELS[winners[0]]},
                Second place: ${INCEPTION_LABELS[winners[1]]},
                Troisième place: ${INCEPTION_LABELS[winners[2]]}`;
        div.appendChild(p);
    });
}

const images = mainSection.querySelectorAll('.classify');
for (const img of images) {
    img.addEventListener("click", handleClick);
}