import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

class DBConnection {

    constructor() {
        this.mongoURI = process.env.MONGO_URI;
        this.databaseName = process.env.MONGO_DATABASE;
        this.connection = null;
    }

    async connect() {
        const client = new MongoClient(this.mongoURI);
        this.connection = await client.connect();
    }

    getConnection() {
        return this.connection.db(this.databaseName);
    }
}

const instance = new DBConnection();
export default instance;