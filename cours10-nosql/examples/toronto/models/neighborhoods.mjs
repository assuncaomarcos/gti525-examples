import dbConnection from '../config/db.mjs';

class Neighborhoods {

    async all() {
        const db = dbConnection.getDatabase();
        try {
            return await db.collection('neighborhoods').find({}).project({ area: 0 }).toArray();
        } catch (error) {
            throw new Error("Erreur pour récupérer les arrondissements: " + error.message);
        }
    }

    async findById(id) {
        const db = dbConnection.getDatabase();
        try {
            return await db.collection("neighborhoods").findOne({ _id : id });
        } catch (error) {
            throw new Error(`Erreur pour récupérer l'arrondissements ${id}: ${error.message}`);
        }
    }

    async withinArea(searchArea) {
        const db = dbConnection.getDatabase();
        try {
            return await db.collection("neighborhoods").find({
                area: {
                    $geoWithin: {
                        $geometry: searchArea
                    }
                }
            }).toArray();
        } catch (error) {
            throw new Error(`Erreur: ${error.message}`);
        }
    }
}

export default new Neighborhoods();