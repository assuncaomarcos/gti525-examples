import { Router } from 'express';
import dishModel from '../models/dishes.mjs';

const router = Router();

router.route(["/", "/recipes"]).get(async (req, res) => {
    const dishes = await dishModel.allDishes();
    res.render('pages/index', { dishes: dishes });
});

router.route("/recipe_detail").get(async (req, res) => {
    const dishId = req.query.id;
    const dish = await dishModel.dishById(dishId);
    const ingredients = await dishModel.ingredients(dishId);
    const directions = await dishModel.directions(dishId);
    res.render('pages/detail', {
        dish: dish.pop(),
        ingredients: ingredients,
        directions: directions
    });
});

export default router;