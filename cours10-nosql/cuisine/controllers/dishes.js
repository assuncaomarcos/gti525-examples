const model = require("../models/dishes");

class Response {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

class DishController {

    async allDishes(req, res) {
        try {
            const result = await model.allDishes();
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Il n'y a aucun plat."));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async dishById(req, res) {
        const dishId = Number(req.params.id);
        try {
            const result = await model.dishById(dishId);
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Plat introuvable."));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async addOrUpdateDish(req, res) {
        const json = req.body;
        if (req.params.id) {
            json.dish_id = Number(req.params.id);
        }
        try {
            const result = await model.addOrUpdateDish(json);
            if (result.ok) {
                res.json(new Response(200, "ok", "Plat ajouté/modifié"));
            } else {
                res.status(500).json(new Response(500, "Plat non ajouté/modifié."));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async removeDish(req, res) {
        const dishId = Number(req.params.id);
        try {
            const result = await model.removeDish(dishId);
            if (result.deletedCount) {
                res.json(new Response(200, "ok", "Plat supprimé."));
            } else {
                res.status(404).json(new Response(404, "Plat ou ingrédient introuvable."));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async ingredients(req, res) {
        const dishId = Number(req.params.id);
        try {
            const result = await model.ingredients(dishId);
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Plat ou ingrédients introuvables."));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async removeIngredient(req, res) {
        const dishId = Number(req.params.id);
        const itemId = Number(req.params.item_id);
        try {
            const result = await model.removeIngredient(dishId, itemId);
            if (result.modifiedCount) {
                res.json(new Response(200, "ok", "Ingrédient supprimé."));
            } else {
                res.status(404).json(new Response(404, "Plat ou ingrédient introuvable."));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async addIngredient(req, res) {
        const dishId = Number(req.params.id);
        const json = req.body;
        try {
            const result = await model.addIngredient(dishId, json);
            if (result.modifiedCount) {
                res.json(new Response(200, "ok", "Ingrédient ajouté."));
            } else {
                res.status(404).json(new Response(404, "Plat introuvable ou ingrédient non ajouté."));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async directions(req, res) {
        const dishId = Number(req.params.id);
        try {
            const result = await model.directions(dishId);
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Préparation du plat introuvable!"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async removeDirection(req, res) {
        const dishId = Number(req.params.id);
        const stepId = Number(req.params.step_id);
        try {
            const result = await model.removeDirection(dishId, stepId);
            if (result.modifiedCount) {
                res.json(new Response(200, "ok", "Pas de préparation supprimé."));
            } else {
                res.status(404).json(new Response(404, "Plat ou pas de préparation introuvable"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async addDirection(req, res) {
        const dishId = Number(req.params.id);
        const json = req.body;
        try {
            const result = await model.addDirection(dishId, json);
            if (result.modifiedCount) {
                res.json(new Response(200, "ok", "Pas de préparation ajouté"));
            } else {
                res.status(404).json(new Response(404,
                    "Plat introuvable ou pas de préparation non ajouté"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }
}
module.exports = new DishController();

