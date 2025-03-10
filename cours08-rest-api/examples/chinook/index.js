import express from 'express';
import artistsRouter from './routers/artists.js';

const PORT = process.env.NODE_PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/artists", artistsRouter);

app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`)
});