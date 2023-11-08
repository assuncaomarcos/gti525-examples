import model from '../models/dishes.mjs';
import { Response } from './response.mjs';

class IngredientsController {

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
}

export default new IngredientsController();