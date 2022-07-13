const mariaDB = true;

if (mariaDB) {
    const dotenv = require("dotenv");
    const result = dotenv.config()

    if (result.error) {
        console.error("Erreur de lecture du fichier .env", result.error);
        process.exit(-1);
    }
}

class MariaDBDriver {
    constructor() {
        const mysql = require('mysql2');
        this.pool = mysql.createPool({
            connectionLimit: 5,
            waitForConnections: true,
            queueLimit: 0,
            host     : process.env.MARIADB_HOST,
            user     : process.env.MARIADB_USER,
            password : process.env.MARIADB_PWD,
            database : process.env.MARIADB_DB
        });
    }

    async query(sql, values=[]) {
        const [rows, ] = await this.pool.promise().query(sql, values);
        return rows;
    }
}

class SQLite3Driver {

    constructor() {
        const sqlite3 = require('sqlite3');
        this.db = new sqlite3.Database('data/sqlite3.db', (err) => {
            if (err) {
                console.log('Erreur de connexion', err)
            }
        });
    }

    query(sql, values) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, values, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }
}

module.exports = mariaDB ? new MariaDBDriver() : new SQLite3Driver();