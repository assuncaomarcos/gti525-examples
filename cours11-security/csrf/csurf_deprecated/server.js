const express = require("express");
const session = require("express-session");
const path = require("path");
const csrf = require('csurf');
const bodyParser = require('body-parser');
const PORT = process.env.NODE_PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Le cookie de la session aura une durée d'un jour
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'gti525-secret',
    saveUninitialized: false,
    cookie: {maxAge: oneDay},
    resave: false
}));

// Configuré après le gestionnaire de session
const csrfProtection = csrf();
const parseForm = bodyParser.urlencoded({ extended: false })

app.get("/", csrfProtection, (req, res) => {
    res.locals.csrfToken = req.csrfToken(); // pour rendre le jeton disponible à la view
    res.render("login");
});

app.post("/login", parseForm, csrfProtection, (req, res) => {
    res.json({ error: false, message: "Soumission de formulaire acceptée" } );
});

app.listen(PORT, () => console.log(`Le serveur est démarré`));