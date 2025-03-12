import fs from 'node:fs';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  console.error("Erreur de lecture du fichier .env", result.error);
  process.exit(-1);
}

const geoJSON = await fs.readFileSync('./toronto_crs84.geojson', 'utf8');
const geoObj = JSON.parse(geoJSON);

const dbConnection = await mariadb.createConnection({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  connectionLimit: 5
});

try {
  // Supprimer le contenu actuel de la table
  const results = await dbConnection.query('DELETE FROM neighborhoods');

  for (const feature of geoObj.features) {
    const name = feature.properties.AREA_NAME;
    const area = JSON.stringify(feature.geometry);
    await dbConnection.query('INSERT INTO neighborhoods (name, area) VALUES (?, ST_GeomFromGeoJSON(?))', [name, area]);
  }
} catch (error) {
  console.error(error.message);
} finally {
  dbConnection?.end();
}