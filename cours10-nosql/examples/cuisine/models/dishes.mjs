import db from '../config/db.mjs';
import { ObjectId } from "mongodb";

class DishModel {

    async all() {
        const conn = db.getConnection();
        try {
            return await conn.collection('dishes').find().project({ ingredients: 0, directions: 0 }).toArray();
        } catch (error) {
            console.log("Erreur pour récupérer les plats: " + error.message);
        }
    }

    async dishById(dishId) {
        const conn = db.getConnection();
        try {
            return await conn.collection('dishes').findOne({ _id : { $in: [new ObjectId(dishId)] } });
        } catch (error) {
            console.log("Erreur pour récupérer le plat: " + error.message);
        }
    }

    async ingredients(dishId) {
        const conn = db.getConnection();
        try {
            return await conn.collection('dishes').aggregate([
                { $match: { _id : { $in: [new ObjectId(dishId)] } } },
                { $unwind: "$ingredients" },
                { $replaceRoot: { newRoot: "$ingredients" } }
            ]).toArray();
        } catch (error) {
            console.log("Erreur pour récupérer le plat ou ses ingrédients: " + error.message);
        }
    }

    async directions(dishId) {
        const conn = db.getConnection();
        try {
            return await conn.collection('dishes').aggregate([
                { $match: { _id : { $in: [new ObjectId(dishId)] } } },
                { $unwind: "$directions" },
                { $replaceRoot: { newRoot: "$directions" } }
            ]).toArray();
        } catch (error) {
            console.log("Erreur pour récupérer le plat ou ses pas de préparation: " + error.message);
        }
    }

    async addIngredient(dishId, ingredient) {
        const conn = db.getConnection();
        try {
            const result = await conn.collection('dishes').updateOne(
                {_id : { $in: [new ObjectId(dishId)]}}, {$addToSet : {ingredients : ingredient}}
            );
            return result.modifiedCount ? ingredient : null;
        } catch (error) {
            console.log("Erreur pour ajouter l'ingrédient: " + error.message);
        }
    }

    async removeIngredient(dishId, itemId) {
        const conn = db.getConnection();
        try {
            return await conn.collection('dishes')
                .updateOne({ _id : { $in: [new ObjectId(dishId)] } },
                    { $pull : { ingredients : { item_id: itemId } } });
        } catch (error) {
            console.log("Erreur pour supprimer l'ingrédient: " + error.message);
        }
    }

    async addDirection(dishId, direction) {
        const conn = db.getConnection();
        try {
            const result = await conn.collection('dishes')
                .updateOne({ _id : { $in: [new ObjectId(dishId)] } },
                    { $addToSet : { directions : direction } });
            return result.modifiedCount ? direction : null;
        } catch (error) {
            console.log("Erreur pour ajouter le pas de préparation: " + error.message);
        }
    }

    async removeDirection(dishId, stepId) {
        const conn = db.getConnection();
        try {
            return await conn.collection('dishes')
                .updateOne({ _id : { $in: [new ObjectId(dishId)] } },
                    { $pull : { directions : { step_id: stepId } } });
        } catch (error) {
            console.log("Erreur pour supprimer le pas de préparation: " + error.message);
        }
    }

    async addOrUpdateDish(dishId, dish) {
        const conn = db.getConnection();
        try {
            const result = await conn.collection('dishes').findOneAndUpdate(
                { _id : { $in: [ new ObjectId(dishId) ] } },
                {
                    $set: dish
                    // $setOnInsert: dish
                },
                {
                    returnOriginal: false,       // Retourner le document ajouté
                    upsert: true,                // ajouter le document s'il n'existe pas
                    includeResultMetadata: true
                });
            if (result?.ok) {
                return result?.value?._id || result?.lastErrorObject?.upserted;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Erreur pour ajouter le plat: " + error.message);
        }
    }

    async removeDish(dishId) {
        const conn = db.getConnection();
        try {
            const result = await conn.collection('dishes').deleteOne({ _id : { $in: [new ObjectId(dishId)] } });
            return result?.deletedCount ? dishId : null;
        } catch (error) {
            console.log("Erreur pour supprimer le plat: " + error.message);
        }
    }
}

export default new DishModel();