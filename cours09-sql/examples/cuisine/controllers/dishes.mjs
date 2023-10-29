import model from '../models/dishes.mjs';
import { Response } from '../util/util.mjs';

class DishController {
    async allDishes(req, res){
        try {
            const results = await model.allDishes();
            res.json(Response.ok(results));
        } catch (error) {
            res.status(505).json(Response.error(505, error.message));
        }
    }

    async dishById(req, res) {
        try {
            const dishId = req.params.dishId;
            const results = await model.dishById(dishId);
            if (results.length) {
                res.json(Response.ok(results));
            } else {
                res.status(404).json(Response.error(404, "Plat pas trouvé."));
            }
        } catch (error) {
            res.status(505).json(Response.error(505, error.message));
        }
    }

    async ingredients(req, res) {
        try {
            const dishId = req.params.dishId;
            const results = await model.ingredients(dishId);
            if (results.length) {
                res.json(Response.ok(results));
            } else {
                res.status(404).json(Response.error(404, "Plat pas trouvé."));
            }
        } catch (error) {
            res.status(505).json(Response.error(505, error.message));
        }
    }

    async directions(req, res) {
        try {
            const dishId = req.params.dishId;
            const results = await model.directions(dishId);
            if (results.length) {
                res.json(Response.ok(results));
            } else {
                res.status(404).json(Response.error(404, "Plat pas trouvé."));
            }
        } catch (error) {
            res.status(505).json(Response.error(505, error.message));
        }
    }
}

export default new DishController();