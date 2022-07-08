const mongoose = require('mongoose');

class DBConnection {
    static connected = false;

    static async connect(url, databaseName) {
        if (!DBConnection.connected) {
            if (!url.endsWith('/')) url += '/';
            await mongoose.connect(url + databaseName);
            DBConnection.connected = true;
        }
    }

    static async getClient() {
        return mongoose.connection.getClient();
    }
}

module.exports = DBConnection;