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
}

export default new DishController();