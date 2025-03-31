import express from 'express';
import db from './config/db.js';
import dishRouter from './routers/dishes.js';
import pagesRouter from './routers/pages.js';
import session from './services/session.js';
import passport from './services/passport.js';

const app = express();
const PORT = process.env.NODE_PORT || 3000;
app.use(express.json());

app.use(session);

// Pour servir les pages Web d'exemple
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use("/api/dishes", dishRouter);
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use("/", pagesRouter);

try {
    await db.connect();

    app.listen(PORT, () => {
        console.log(`Serveur écoutant sur le port ${PORT}`)
    });
} catch (error) {
    console.log("Erreur: " + error.message);
}
