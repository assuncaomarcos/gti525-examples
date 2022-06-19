const db = require("../db/driver");

class ItemModel {

    allItems() {
        return db.query("SELECT * FROM items");
    }

    itemById(itemId) {
        return db.query("SELECT * FROM items WHERE id = ?", [itemId]);
    }
}

module.exports = new ItemModel();
