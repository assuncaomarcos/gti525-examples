import mongoose from "mongoose";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const dotEnv = dotenv.config();
dotenvExpand.expand(dotEnv);

class DBConnection {
    constructor() {
        this.mongoURI = process.env.MONGO_URI;
    }

    async connect() {
        return await mongoose.connect(this.mongoURI);
    }
}

const instance = new DBConnection();
export default instance;