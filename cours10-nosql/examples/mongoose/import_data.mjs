import mongoose from 'mongoose';
import { readFileSync } from 'node:fs';
import neighborhoodModel from "./models/neighborhoods.mjs";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const neighborhoodsFile = '../toronto/json/neighbourhoods.geojson';

try {
    await mongoose.connect(process.env.MONGO_URI);
    await importNeighborhoods();
} catch (error) {
    console.log("Erreur pour importer les données", error.message);
} finally {
    mongoose?.connection.close();
}

async function importNeighborhoods() {
    const geoJSONData = readFileSync(neighborhoodsFile, 'utf-8');
    const geoCollection = JSON.parse(geoJSONData);
    await neighborhoodModel.deleteMany({});

    for (const {properties, geometry} of geoCollection.features) {
        const name = properties.AREA_NAME;
        const shortCode = parseInt(properties.AREA_SHORT_CODE);
        const _id = parseInt(properties._id);
        const area = geometry;

        const neighborhoodDoc = {_id, shortCode, name, area};
        await neighborhoodModel.create(neighborhoodDoc);
    }
}