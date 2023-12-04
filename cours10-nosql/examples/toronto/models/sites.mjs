import dbConnection from '../config/db.mjs';

class Sites {

    async all(withCoordinates=false) {
        const db = dbConnection.getDatabase();
        try {
            const filter = withCoordinates ? {} : {location: 0};
            return await db.collection('sites').find({}).project(filter).toArray();
        } catch (error) {
            throw new Error("Erreur pour récupérer les sites: " + error.message);
        }
    }

    async findById(id) {
        const db = dbConnection.getDatabase();
        try {
            return await db.collection("sites").findOne({ _id : id });
        } catch (error) {
            throw new Error(`Erreur pour récupérer le site ${id}: ${error.message}`);
        }
    }

    async withinArea(longitude, latitude, maxDistance) {
        const db = dbConnection.getDatabase();
        try {
            return await db.collection("sites").find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type : "Point",
                            coordinates : [ longitude, latitude ]
                        },
                        $maxDistance: maxDistance
                    }
                }
            }).toArray();
        } catch (error) {
            throw new Error("Erreur pour récupérer les sites: " + error.message);
        }
    }

    async withinPolygon(searchArea) {
        const db = dbConnection.getDatabase();
        try {
            return await db.collection("sites").find({
                location: {
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

export default new Sites();