const Dishes = require("../models/dishes");
const Format = require("response-format");

async function allDishes(req, res) {
    try {
        const result = await Dishes.find().select({ingredients: 0, directions: 0});
        if (result) {
            res.json(Format.success("OK", result));
        } else {
            res.status(404).json(Format.notFound("Il n'y a aucun plat."));
        }
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

async function dishById(req, res) {
    const dishId = Number(req.params.id);
    try {
        const result = await Dishes.findByDishId(dishId);   // 'static' déclaré dans le modèle
        if (result) {
            res.json(Format.success("OK", result));
        } else {
            res.status(404).json(Format.notFound("Plat introuvable."));
        }
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

async function addOrUpdateDish(req, res) {
    const json = req.body;
    if (req.params.id) {
        json.dish_id = Number(req.params.id);
    }
    try {
        const result = await Dishes.findOneAndUpdate(
            {dish_id: json.dish_id},
            {
                $set: json
            },
            {
                returnOriginal: false,      // Retourner le document ajouté
                upsert: true                // inserer le document s'il n'existe pas
            });
        if (result.ok) {
            res.json(Format.success("Plat ajouté/modifié"));
        } else {
            res.status(505).json(Format.internalError("Plat non ajouté/modifié."));
        }
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

async function removeDish(req, res) {
    const dishId = Number(req.params.id);
    try {
        const result = await Dishes.deleteOne({dish_id: dishId});
        if (result && result.deletedCount) {
            res.json(Format.success("OK", "Plat supprimé."));
        } else {
            res.status(404).json(Format.notFound("Plat ou ingrédient introuvable."));
        }
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

/*
   Les méthodes ci-dessous ne sont pas vraiment nécessaires vu que dans cette version les
   méthodes ci-dessus suffisent pour récuperer les informations d’un plat ou pour le mettre à jour.
   Ils sont implémentées là à titre d'exemple
*/
async function ingredients(req, res) {
    const dishId = Number(req.params.id);
    try {
        const result = await Dishes.findOne({dish_id: dishId});
        if (result && result.ingredients) {
            res.json(Format.success("OK", result.ingredients));
        } else {
            res.status(404).json(Format.notFound("Plat ou ingrédients introuvables."));
        }
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

async function addIngredient(req, res) {
    const dishId = Number(req.params.id);
    const json = req.body;
    try {
        const doc = await Dishes.findOne({dish_id: dishId});
        doc.ingredients.push(json);     // ajouter l'ingredient
        const newDoc = await doc.save();
        if (newDoc) {
            res.json(Format.success("OK", "Ingrédient ajouté."));
        } else {
            res.status(404).json(Format.notFound("Plat introuvable ou ingrédient non ajouté."));
        }
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

async function directions(req, res) {
    const dishId = Number(req.params.id);
    try {
        const result = await Dishes.findOne({dish_id: dishId});
        if (result && result.directions) {
            res.json(Format.success("OK", result.directions));
        } else {
            res.status(404).json(Format.notFound("Préparation du plat introuvable!"));
        }
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

module.exports = {
    allDishes,
    dishById,
    addOrUpdateDish,
    removeDish,
    ingredients,
    addIngredient,
    directions
};

