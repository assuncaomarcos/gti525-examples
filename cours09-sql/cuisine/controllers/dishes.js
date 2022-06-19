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
                res.status(404).json(new Response(404, "Il n'y a aucun plat!"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async dishById(req, res) {
        const dishId = req.params.id;
        try {
            const result = await model.dishById(dishId);
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Plat introuvable!"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async ingredients(req, res) {
        const dishId = req.params.id;
        try {
            const result = await model.ingredients(dishId);
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Plat ou ingrédients introuvables!"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async directions(req, res) {
        const dishId = req.params.id;
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
}

module.exports = new DishController();

