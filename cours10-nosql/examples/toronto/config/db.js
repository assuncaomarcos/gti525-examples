import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

class DBConnection {
    static client = null;
    static uri = null;
    static dbName = null;

    async connect() {
        if (!this.client) {
            try {
                this.uri = process.env.MONGO_URI;
                this.dbName = process.env.MONGO_DATABASE;
                this.client = new MongoClient(this.uri);
                await this.client.connect();
            } catch (error) {
                throw new Error("Erreur de connexion: " + error.message);
            }
        }
    }

    getDatabase() {
        return this.client.db(this.dbName);
    }

    async close() {
        if (this.client) {
            try {
                await this.client.close();
            } catch (error) {
                throw new Error("Erreur pour fermer la connexion: " + error.message);
            }
        }
    }
}

const instance = new DBConnection();
export default instance;