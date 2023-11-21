import mongoose from 'mongoose';
import { readFileSync } from 'node:fs';
import neighborhoodModel from "./models/neighborhoods.mjs";
import sitesModel from "./models/sites.mjs";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

const neighborhoodsFile = '../toronto/json/neighbourhoods.geojson';
const siteFiles = '../toronto/json/sites.geojson';

try {
    await mongoose.connect(process.env.MONGO_URI);
    await importNeighborhoods();
    await importSites();
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

async function importSites() {
    const geoJSONData = readFileSync(siteFiles, 'utf-8');
    const geoCollection = JSON.parse(geoJSONData);
    await sitesModel.deleteMany({});

    for (const {properties, geometry} of geoCollection.features) {
        const _id = properties._id;
        const name = properties.NAME;
        const category = properties.CATEGORY;
        const website = properties.WEBSITE;
        const location = geometry;

        const siteDoc = {_id, name, category, website, location};
        await sitesModel.create(siteDoc);
    }
}