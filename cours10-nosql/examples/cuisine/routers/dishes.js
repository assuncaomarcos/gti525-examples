import { Router } from "express";
import dishController from "../controllers/dishes.js";
import ingredientController from "../controllers/ingredients.js";
import directionController from "../controllers/directions.js";

const router = Router();

router.route("/")
    .get(dishController.all)
    .post(dishController.addOrUpdateDish);

router.route("/:dishId")
    .get(dishController.dishById)
    .delete(dishController.removeDish)
    .put(dishController.addOrUpdateDish);

router.route("/:dishId/ingredients")
    .get(ingredientController.ingredients)
    .post(ingredientController.addIngredient);

router.route("/:dishId/ingredients/:itemId")
    .delete(ingredientController.removeIngredient);

router.route("/:dishId/directions")
    .get(directionController.directions)
    .post(directionController.addDirection);

router.route("/:dishId/directions/:itemId")
    .delete(directionController.removeDirection);

export default router;