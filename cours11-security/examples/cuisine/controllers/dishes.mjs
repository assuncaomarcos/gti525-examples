import model from '../models/dishes.mjs';
import Format from 'response-format';

class DishController {
    async allDishes(req, res) {
        try {
            const result = await model.find().select({ingredients: 0, directions: 0});
            if (result) {
                res.json(Format.success("OK", result));
            } else {
                res.status(404).json(Format.notFound("Il n'y a aucun plat."));
            }
        } catch (error) {
            res.status(505).json(Format.internalError(error.message));
        }
    }

    async dishById(req, res) {
        const dishId = req.params.dishId;
        try {
            const result = await model.findById(dishId);
            if (result) {
                res.json(Format.success("OK", result));
            } else {
                res.status(404).json(Format.notFound("Plat introuvable."));
            }
        } catch (error) {
            res.status(505).json(Format.internalError(error.message));
        }
    }

    async ingredients(req, res) {
        const dishId = req.params.dishId;
        try {
            const result = await model.getIngredients(dishId);
            if (result) {
                res.json(Format.success("OK", result));
            } else {
                res.status(404).json(Format.notFound("Plat ou ingrédients introuvables."));
            }
        } catch (error) {
            res.status(505).json(Format.internalError(error.message));
        }
    }

    async directions(req, res) {
        const dishId = req.params.dishId;
        try {
            const result = await model.getDirections(dishId);
            if (result) {
                res.json(Format.success("OK", result));
            } else {
                res.status(404).json(Format.notFound("Plat ou instructions introuvables."));
            }
        } catch (error) {
            res.status(505).json(Format.internalError(error.message));
        }
    }

    async addDish(req, res) {
        const dish = req.body;
        try {
            const result = await model.create(dish);
            if (result?._id) {
                res.json(Format.success("Plat ajouté/modifié", result?._id));
            } else {
                res.status(505).json(Format.internalError("Plat non ajouté/modifié."));
            }

        } catch (error) {
            res.status(505).json(Format.internalError(error.message));
        }
    }

    async updateDish(req, res) {
        const dish = req.body;
        const dishId = req?.params?.dishId;
        try {
            const result = await model.findByIdAndUpdate(dishId,{ $set : dish });
            if (result) {
                res.json(Format.success("Plat ajouté/modifié"));
            } else {
                res.status(505).json(Format.internalError("Plat non ajouté/modifié."));
            }
        } catch (error) {
            res.status(505).json(Format.internalError(error.message));
        }
    }
}

export default new DishController();

