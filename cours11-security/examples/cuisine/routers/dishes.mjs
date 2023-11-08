import { Router } from "express";
import cors from 'cors';
import dishController from "../controllers/dishes.mjs";
import passport from "../services/passport.mjs";

const router = Router();
router.use(passport.authenticateJWT);

router.route("/")
    .options(cors({methods: ['GET', 'HEAD', 'POST', 'OPTIONS']}))
    .get(dishController.allDishes)
    .post(dishController.addDish);

router.route("/:dishId")
    .options(cors({methods: ['GET', 'HEAD', 'PATCH', 'OPTIONS']}))
    .get(dishController.dishById)
    .patch(dishController.updateDish);

router.route("/:dishId/ingredients")
    .options(cors({methods: ['GET', 'HEAD', 'OPTIONS']}))
    .get(dishController.ingredients);

router.route("/:dishId/directions")
    .options(cors({methods: ['GET', 'HEAD', 'OPTIONS']}))
    .get(dishController.directions);

export default router;