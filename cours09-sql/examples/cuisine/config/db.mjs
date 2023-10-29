import mariadb from 'mariadb';
import dotenv from 'dotenv';
dotenv.config();

class MariaDBPool {
    constructor() {
        this.pool = mariadb.createPool({
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASSWORD,
            database: process.env.MARIADB_DATABASE,
            connectionLimit: 5
        });
    }

    async query(sqlStmt, ...values) {
        let connection;
        try {
            connection = await this.pool.getConnection();
            return await connection.query(sqlStmt, values);
        } catch (error) {
            throw error;
        } finally {
            await connection?.end();
        }
    }
}

const instance = new MariaDBPool();
export default instance;