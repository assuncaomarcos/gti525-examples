const model = require("../models/items");

class Response {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

class ItemController {

    async allItems(req, res) {
        try {
            const result = await model.allItems();
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Il n'y a aucun item!"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }

    async itemById(req, res) {
        const itemId = req.params.id;
        try {
            const result = await model.itemById(itemId);
            if (result.length > 0) {
                res.json(new Response(200, "ok", result));
            } else {
                res.status(404).json(new Response(404, "Item introuvable!"));
            }
        } catch (error) {
            res.status(500).json(new Response(500, error.message));
        }
    }
}

module.exports = new ItemController();

