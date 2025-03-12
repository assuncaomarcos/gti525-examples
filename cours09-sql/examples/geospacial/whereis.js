import mariadb from 'mariadb';
import dotenv from 'dotenv';
import {PLACES} from './places.js';

dotenv.config();

const dbConnection = await mariadb.createConnection({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  connectionLimit: 10
});

try {
  for (const place of PLACES.features) {
    const location = JSON.stringify(place.geometry);
    const name = place.properties["name"];
    const result = await dbConnection.query('SELECT name FROM neighborhoods WHERE ST_Contains(area, ST_GeomFromGeoJSON(?))', location);
    if (result) {
      console.log(`${name} : ${result.shift()?.name}`);
    }
  }
} catch (error) {
  console.error(error.message);
} finally {
  dbConnection?.end();
}