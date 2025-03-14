import express from 'express';
import db from './config/db.js';
import pagesRouter from './routers/pages.js';
import apiController from './routers/api.js';

const PORT = process.env.NODE_PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static("static"));
app.use('/', pagesRouter);
app.use('/api', apiController);
app.set('view engine', 'ejs');

try {
    await db.connect();
    app.listen(PORT, () => {
        console.log(`Serveur écoutant sur le port ${PORT}`)
    });
} catch (error) {
    console.log("Erreur: " + error.message);
}

