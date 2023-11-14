/**
 * Code adapté de l'exemple de Jason Mayes
 * https://codepen.io/jasonmayes/pen/Jjompww
 */

const mainSection = document.querySelector('.scale-out');
const preLoader = document.querySelector('.progress');

/*
Nous devons attendre la fin du chargement de MobileNet avant de
pouvoir l'utiliser. Les modèles d'apprentissage automatique peuvent être
volumineux et leur téléchargement peut prendre du temps.
*/
class ImageClassifier {
    static instance = null;

    static async getInstance(callback) {
        if (! this.instance ) {
            this.instance = await mobilenet.load();
            callback();
        }
        return this.instance;
    }
}

const classifier = await ImageClassifier.getInstance(() => {
    // Pour afficher la section main après le chargement du modèle
    preLoader.classList.add('scale-out');
    mainSection.classList.add('scale-in');
});

const handleClick = (event) => {
    const image = event.target;
    classifier.classify(image) .then((predictions) => {
        console.log(JSON.stringify(predictions[0], predictions[1]));
        const {className, probability} = predictions[0];

        const div = image.parentNode;
        div.querySelectorAll('p').forEach(p => p.remove());
        // Pour afficher les prédictions dans un nouvel élément paragraphe
        const p = document.createElement('p');
        p.classList.add("result");
        p.innerText = "Nous croyons que cette image contient un.e: " + className +
            " avec " + Math.round(parseFloat(probability) * 100) + "% certitude.";
        div.appendChild(p);
    });
}

const images = mainSection.querySelectorAll('.classify');
for (const img of images) {
    img.addEventListener("click", handleClick);
}