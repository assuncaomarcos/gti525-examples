import { Router } from 'express';
import controller from '../controllers/dishes.mjs';

const router = Router();

router.route("/")
    .get(controller.allDishes);

router.route("/:dishId")
    .get(controller.dishById);

router.route("/:dishId/ingredients")
    .get(controller.ingredients);

router.route("/:dishId/directions")
    .get(controller.directions);

export default router;