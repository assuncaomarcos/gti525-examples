import db from '../config/db.mjs';

class DishModel {

    async allDishes() {
        return await db.query("SELECT * FROM dishes");
    }

    async dishById(dishId) {
        return await db.query("SELECT * FROM dishes WHERE id = ?", dishId);
    }

    async ingredients(dishId) {
        const sqlStmt = `SELECT item_id, quantity, unit, name FROM ingredients 
                    INNER JOIN items ON ingredients.item_id = items.id 
                    WHERE ingredients.dish_id = ?`;
        return await db.query(sqlStmt, dishId);
    }

    async directions(dishId) {
        const sqlStmt = `SELECT step_id, description 
                FROM directions WHERE dish_id = ? ORDER BY step_id`;
        return await db.query(sqlStmt, dishId);
    }
}

export default new DishModel();