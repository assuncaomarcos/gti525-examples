import express from 'express';
import helmet from "helmet";

const app = express();
const port = process.env.NODE_PORT || 3000;

// Directive 'script-src' pour désactiver 'unsafe-inline'.
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],     // La source par défaut pour les autres directives.
            scriptSrc: ["'self'"],      // Pour éviter les scripts en ligne.
        },
    })
);

app.get('/page', function (req, res, next) {
    res.send("Pas possible d'exécuter des scripts externes...");
});

app.listen(port, function () {
    console.log(`Serveur écoutant le port ${port}...`);
});