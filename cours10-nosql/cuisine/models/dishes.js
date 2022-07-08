const dbClient = require("../db/client");

class DishModel {

    async allDishes() {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes').find().project({ingredients: 0, directions: 0}).toArray();
        } catch (error) {
            console.log("Erreur pour récupérer les plats: " + error.message);
        }
    }

    async dishById(dishId) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes').findOne({dish_id : { $eq: dishId}});
        } catch (error) {
            console.log("Erreur pour récupérer le plat: " + error.message);
        }
    }

    async addOrUpdateDish(json) {
        const dishId = json.dish_id;
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes').findOneAndUpdate(
                {dish_id : { $eq: dishId}},
                {
                    $set: json
                    // $setOnInsert: json
                },
                {
                    returnOriginal: false,      // Retourner le document ajouté
                    upsert: true                // inserer le document s'il n'existe pas
                });
        } catch (error) {
            console.log("Erreur pour ajouter le plat: " + error.message);
        }
    }

    async removeDish(dishId) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes').deleteOne({dish_id : { $eq: dishId}});
        } catch (error) {
            console.log("Erreur pour supprimer le plat: " + error.message);
        }
    }

    async ingredients(dishId) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes').aggregate([
                { $match: {dish_id : { $eq: dishId}}},
                { $unwind: "$ingredients" },
                { $replaceRoot: { newRoot: "$ingredients" } }
            ]).toArray();
        } catch (error) {
            console.log("Erreur pour récupérer le plat ou ses ingrédients: " + error.message);
        }
    }

    async removeIngredient(dishId, itemId) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes')
                .updateOne({dish_id : { $eq: dishId}},
                    {$pull : {ingredients : {item_id: itemId}}});
        } catch (error) {
            console.log("Erreur pour supprimer l'ingrédient: " + error.message);
        }
    }

    async addIngredient(dishId, json) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes')
                .updateOne({dish_id : { $eq: dishId}},
                    {$addToSet : {ingredients : json}});
        } catch (error) {
            console.log("Erreur pour ajouter l'ingrédient: " + error.message);
        }
    }

    async directions(dishId) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes').aggregate([
                { $match: {dish_id : { $eq: dishId}}},
                { $unwind: "$directions" },
                { $replaceRoot: { newRoot: "$directions" } }
            ]).toArray();
        } catch (error) {
            console.log("Erreur pour récupérer le plat ou ses pas de préparation: " + error.message);
        }
    }

    async removeDirection(dishId, stepId) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes')
                .updateOne({dish_id : { $eq: dishId}},
                    {$pull : {directions : {step_id: stepId}}});
        } catch (error) {
            console.log("Erreur pour supprimer le pas de préparation: " + error.message);
        }
    }

    async addDirection(dishId, json) {
        const conn = dbClient.getConnection();
        try {
            return await conn.collection('dishes')
                .updateOne({dish_id : { $eq: dishId}},
                    {$addToSet : {directions : json}});
        } catch (error) {
            console.log("Erreur pour ajouter le pas de préparation: " + error.message);
        }
    }
}
module.exports = new DishModel();