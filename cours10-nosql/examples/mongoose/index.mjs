import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import nController from './controllers/neighborhoods.mjs';
import sitesController from './controllers/sites.mjs';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const PORT = process.env.NODE_PORT || 3000;
const app = express();
app.use(express.json());

app.get("/api/neighborhoods", nController.all);
app.get("/api/neighborhoods/:id", nController.byId);
app.post("/api/neighborhoods/search", nController.withinArea);

app.get("/api/sites", sitesController.search);
app.get("/api/sites/:id", sitesController.byId);

try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Serveur écoutant sur le port ${PORT}`)
    });
} catch (error) {
    console.log("Erreur: " + error.message);
}

