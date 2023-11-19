import dbConnection from './config/db.mjs';
import { readFileSync } from 'node:fs';

const neighborhoodsFile = './json/neighbourhoods.geojson';
const siteFiles = './json/sites.geojson';

try {
    await dbConnection.connect();
    await importNeighborhoods();
    await importSites();
} catch (error) {
    console.log("Erreur pour importer les données", error.message);
} finally {
    await dbConnection.close();
}

async function importNeighborhoods() {
    const db = dbConnection.getDatabase();
    const geoJSONData = readFileSync(neighborhoodsFile, 'utf-8');
    const geoCollection = JSON.parse(geoJSONData);
    await db.collection("neighborhoods").deleteMany({});

    for (const {properties, geometry} of geoCollection.features) {
        const name = properties.AREA_NAME;
        const shortCode = properties.AREA_SHORT_CODE;
        const _id = properties._id;
        const area = geometry;

        const neighborhoodDoc = {_id, shortCode, name, area};
        await db.collection("neighborhoods").insertOne(neighborhoodDoc);
    }
    await db.collection("neighborhoods").createIndex({area: "2dsphere"});
}

async function importSites() {
    const db = dbConnection.getDatabase();
    const geoJSONData = readFileSync(siteFiles, 'utf-8');
    const geoCollection = JSON.parse(geoJSONData);
    await db.collection("sites").deleteMany({});

    for (const {properties, geometry} of geoCollection.features) {
        const _id = properties._id;
        const name = properties.NAME;
        const category = properties.CATEGORY;
        const website = properties.WEBSITE;
        const location = geometry;

        const siteDoc = {_id, name, category, website, location};
        await db.collection("sites").insertOne(siteDoc);
    }
    await db.collection("sites").createIndex({location: "2dsphere"});
}