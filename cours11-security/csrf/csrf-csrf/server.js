/**
 * Exemple avec la bibliothèque csrf-csrf qui utilise le
 * patron "Double Submit Cookie"
 * https://www.npmjs.com/package/csrf-csrf#configuration
 *
 * Exemple basé sur le code disponible sur:
 * https://github.com/Psifi-Solutions/csrf-csrf/tree/main/example/complete
 */
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { doubleCsrf } = require("csrf-csrf");
const Format = require('response-format');
const PORT = process.env.NODE_PORT || 3000;

const result = dotenv.config()
if (result.error) {
    console.error("Erreur de lecture du fichier .env", result.error);
    process.exit(-1);
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Le cookie de la session aura une durée d'un jour
const oneDay = 1000 * 60 * 60 * 24;

// Ces paramètres sont destinés au développement.
// Assurez-vous d'utiliser cors et helmet en production.
const {
    invalidCsrfTokenError,
    generateToken,
    doubleCsrfProtection } =
    doubleCsrf({
        getSecret: (req) => req.secret,
        secret: process.env.CSRF_SECRET,
        cookieName: process.env.CSRF_COOKIE_NAME,
        cookieOptions: { maxAge: oneDay, sameSite: "Strict", secure: true, signed: true },
        size: 64,
        ignoredMethods: ["GET", "HEAD", "OPTIONS"],
    });

app.use(cookieParser(process.env.COOKIES_SECRET));

// Error handling, validation error interception
const csrfErrorHandler = (error, req, res, next) => {
    if (error == invalidCsrfTokenError) {
        res.status(403).json(Format.unAuthorized("Erreur de validation CSRF"));
    } else {
        next();
    }
};

app.get("/csrf-token", (req, res) => {
    return res.json(Format.success("ok", {token: generateToken(res, req)}));
});

app.post(
    "/login",
    doubleCsrfProtection,
    csrfErrorHandler,
    (req, res) => {
        console.log(req.body);
        res.json(Format.success("Formulaire soumis avec succès"));
    }
);

app.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));