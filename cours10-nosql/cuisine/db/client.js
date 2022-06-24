const { MongoClient } = require('mongodb');

class DBConnection {
    static connection;

    static async connect(url, databaseName) {
        const client = new MongoClient(url);
        const conn = await client.connect();
        DBConnection.connection = conn.db(databaseName);
    }

    static getConnection() {
        return DBConnection.connection;
    }
};
module.exports = DBConnection;