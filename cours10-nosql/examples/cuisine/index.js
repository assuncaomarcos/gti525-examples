import express from 'express';
import db from './config/db.js';
import dishRouter from './routers/dishes.js';

const PORT = process.env.NODE_PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/dishes", dishRouter);

try {
    await db.connect();

    app.listen(PORT, () => {
        console.log(`Serveur écoutant sur le port ${PORT}`)
    });
} catch (error) {
    console.log("Erreur: " + error.message);
}

