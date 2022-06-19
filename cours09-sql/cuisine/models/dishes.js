const db = require("../db/driver");

class DishModel {

    allDishes() {
        return db.query("SELECT * FROM dishes");
    }

    dishById(dishId) {
        return db.query("SELECT * FROM dishes WHERE id = ?", [dishId]);
    }

    ingredients(dishId) {
        const sql = `SELECT quantity, unit, name FROM ingredients 
                INNER JOIN items ON ingredients.item_id = items.id 
                WHERE ingredients.dish_id = ?`;
        return db.query(sql, [dishId]);
    }

    directions(dishId) {
        return db.query("SELECT step_id, description FROM directions WHERE dish_id = ?", [dishId]);
    }
}

module.exports = new DishModel();
