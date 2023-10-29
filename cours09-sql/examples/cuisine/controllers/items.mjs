import model from '../models/items.mjs';
import { Response } from '../util/util.mjs';

class ItemController {
    async allItems(req, res) {
        try {
            const results = await model.allItems();
            res.json(Response.ok(results));
        } catch (error) {
            res.status(505).json(Response.error(505, error.message));
        }
    }

    async itemById(req, res) {
        try {
            const itemId = req.params.itemId;
            const results = await model.itemById(itemId);
            if (results.length) {
                res.json(Response.ok(results));
            } else {
                res.status(404).json(Response.error(404, "Item pas trouvé."));
            }
        } catch (error) {
            res.status(505).json(Response.error(505, error.message));
        }
    }
}

export default new ItemController();