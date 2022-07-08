const config = require("./config");
const express = require("express");
const cors = require("cors");
const db = require("./db/client");
const cuisineRouter = require("./routers/api");
const webRouter = require("./routers/site");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const passport = require("./middleware/passport");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(cuisineRouter);

async function configDB() {
    if (config.isDev()) {
        // Démarrer le serveur MongoDB en mémoire
        const mongoServer = require("./db/memory");
        await mongoServer.start();
        // Populer la base de données avec quelques exemples
        const Dishes = require("./models/dishes");
        const Users = require("./models/users");
        await mongoServer.loadCollection('collections/recipes.json', Dishes);
        await mongoServer.loadCollection('collections/users.json', Users);
        process.on('exit', async () => {
            await mongoServer.stop()
        });
    }
    // Nous avons besoin du client pour configurer le gestionnaire de session
    await db.connect(process.env.MONGODB_URI, process.env.MONGODB_DB);
}

function configSessionManager() {
    const oneDay = 1000 * 60 * 60 * 24; // Le cookie de la session aura une durée d'un jour
    app.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        cookie: {maxAge: oneDay},
        resave: false,
        store: MongoStore.create({
            client: db.getClient(),
            collectionName: "sessions",
            stringify: false,
            autoRemove: "interval",
            autoRemoveInterval: 1
        })
    }));
}

function configPassport() {
    app.use(passport.authenticate('session'));
    app.use(passport.initialize({}));
}

// On va mettre le démarrage dans une IFFE async car on veut profiter
// du mot clé await pour exécuter les choses dans un certain ordre
(async() => {
    try {
        await configDB();
        await configSessionManager();
        await configPassport();
    } catch (error) {
        console.log("Erreur lors du démarrage du serveur: " + error.message);
        process.exit(-1);
    }
    app.use(webRouter);
    app.listen(process.env.NODE_PORT, () => console.log(`Le serveur est démarré`));
})();