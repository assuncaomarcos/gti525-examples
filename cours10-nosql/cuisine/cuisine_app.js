const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const dbClient = require("./db/client");
const cuisineRouter = require("./routers/cuisine");
const isDev = (process.env.NODE_ENV == 'development');

const result = dotenv.config()
if (!isDev && result.error) {
    console.error("Erreur de lecture du fichier .env", result.error);
    process.exit(-1);
}

const PORT = process.env.NODE_PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cuisineRouter);

// Pour servir les pages Web d'exemple
app.use(express.static('pages'));

// On va mettre le démarrage dans une IFFE async car on veut profiter
// du mot clé await pour exécuter les choses dans un certain ordre
(async() => {
    if (isDev) {
        const mongoServer = require("./db/memory");
        await mongoServer.start();
        await mongoServer.loadSampleDB('collections/recipes.json');
        process.on('exit', async() => {await mongoServer.stop()});
    }

    await dbClient.connect(process.env.MONGODB_URI, process.env.MONGODB_DB);
    app.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));
})();