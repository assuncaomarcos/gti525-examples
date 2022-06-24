const {MongoMemoryServer} = require("mongodb-memory-server");
const {MongoClient} = require("mongodb");
const fs = require('fs');

class MemoryServer {
    static server;

    static async start() {
        MemoryServer.server = await MongoMemoryServer.create();
        process.env.MONGODB_URI = MemoryServer.server.getUri();
        process.env.MONGODB_DB = 'cuisine';
    }

    static async stop() {
        await MemoryServer.server.stop();
    }

    static async loadSampleDB(pathToJson) {
        if (MemoryServer.server) {
            const client = new MongoClient(process.env.MONGODB_URI);
            const conn = await client.connect();
            const db = conn.db(process.env.MONGODB_DB);

            const data = fs.readFileSync(pathToJson,{encoding:'utf8', flag:'r'});
            const docs = JSON.parse(data);
            await db.collection("dishes").insertMany(docs);
        }
    }
}
module.exports = MemoryServer;