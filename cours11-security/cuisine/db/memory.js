const {MongoMemoryServer} = require("mongodb-memory-server");
const dbClient = require("./client");
const fs = require('fs');

class MemoryServer {
    static server;
    static client;

    static async start() {
        MemoryServer.server = await MongoMemoryServer.create();
        process.env.MONGODB_URI = MemoryServer.server.getUri();
        process.env.MONGODB_DB = 'cuisine';
        // Initialiser mongoose pour rajouter les documents de test
        MemoryServer.client =  await dbClient.connect(process.env.MONGODB_URI, process.env.MONGODB_DB);
    }

    static async stop() {
        await MemoryServer.server.stop();
    }

    static async loadCollection(pathToJson, model) {
        if (MemoryServer.server) {
            const data = fs.readFileSync(pathToJson,{encoding:'utf8', flag:'r'});
            const docs = JSON.parse(data);
            model.create(docs).then(() => {
                console.log(`Fichier ${pathToJson} chargé dans la BD`);
            });
        }
    }
}
module.exports = MemoryServer;