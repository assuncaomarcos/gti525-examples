import db from '../config/db.mjs';

class ItemsModel {

    async allItems() {
        return await db.query("SELECT * FROM items");
    }

    async itemById(itemId) {
        return await db.query("SELECT * FROM items WHERE id = ?", itemId);
    }
}

export default new ItemsModel();