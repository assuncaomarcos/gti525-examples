import model from '../models/dishes.mjs';
import { Response } from './response.mjs';

class DishController {

    async all(req, res) {
        try {
            const results = await model.all();
            if (results.length > 0) {
                res.json(Response.ok(results));
            } else {
                res.status(404).json(Response.notFound("Aucun plat trouvé."));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async dishById(req, res) {
        const dishId = req.params.dishId;
        try {
            const result = await model.dishById(dishId);
            if (result) {
                res.json(Response.ok(result));
            } else {
                res.status(404).json(Response.notFound("Plat introuvable."));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async addOrUpdateDish(req, res) {
        const dishId = req.params.dishId;
        const dish = req.body;
        try {
            const result = await model.addOrUpdateDish(dishId, dish);
            if (result) {
                res.json(Response.ok(result));
            } else {
                res.status(400).json(Response.badRequest("Plat non ajouté/modifié."));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async removeDish(req, res) {
        const dishId = req.params.dishId;
        try {
            const result = await model.removeDish(dishId);
            if (result) {
                res.json(Response.ok(dishId));
            } else {
                res.status(404).json(Response.notFound("Plat ou ingrédient introuvable."));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async ingredients(req, res) {
        const dishId = req.params.dishId;
        try {
            const result = await model.ingredients(dishId);
            if (result.length > 0) {
                res.json(Response.ok(result));
            } else {
                res.status(404).json(Response.notFound("Plat ou ingrédients introuvables."));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async directions(req, res) {
        const dishId = req.params.dishId;
        try {
            const result = await model.directions(dishId);
            if (result.length > 0) {
                res.json(Response.ok(result));
            } else {
                res.status(404).json(Response.notFound("Préparation du plat introuvable!"));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async addIngredient(req, res) {
        const dishId = req.params.dishId;
        const ingredient = req.body;
        try {
            const result = await model.addIngredient(dishId, ingredient);
            if (result) {
                res.json(Response.ok(result));
            } else {
                res.status(404).json(Response.notFound("Plat introuvable ou ingrédient non ajouté."));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async removeIngredient(req, res) {
        const dishId = req.params.dishId;
        const itemId = Number(req.params.itemId);
        try {
            const result = await model.removeIngredient(dishId, itemId);
            if (result.modifiedCount) {
                res.json(new Response(200, `Ingrédient ${itemId} supprimé.`));
            } else {
                res.status(404).json(Response.notFound("Plat ou ingrédient introuvable."));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async addDirection(req, res) {
        const dishId = req.params.dishId;
        const direction = req.body;
        try {
            const result = await model.addDirection(dishId, direction);
            if (result) {
                res.json(Response.ok(result));
            } else {
                res.status(404).json(Response.notFound("Plat introuvable ou pas de préparation non ajouté"));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }

    async removeDirection(req, res) {
        const dishId = req.params.dishId;
        const stepId = Number(req.params.itemId);
        try {
            const result = await model.removeDirection(dishId, stepId);
            if (result.modifiedCount) {
                res.json(new Response(200, `Pas de préparation ${stepId} supprimé.`));
            } else {
                res.status(404).json(Response.notFound("Plat ou pas de préparation introuvable"));
            }
        } catch (error) {
            res.status(500).json(Response.serverError(error.message));
        }
    }
}

export default new DishController();