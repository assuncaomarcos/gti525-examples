import model from '../models/dishes.mjs';
import { Response } from './response.mjs';

class DirectionsController {

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

export default new DirectionsController();