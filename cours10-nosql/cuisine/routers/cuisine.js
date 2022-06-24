const express = require('express');
const dishController = require('../controllers/dishes');
const router = express.Router();
const apiVersion = 'v2';

// lister les plats
router.get(`/${apiVersion}/dishes`, dishController.allDishes);

// ajouter un nouveau plat
router.post(`/${apiVersion}/dishes`, dishController.addOrUpdateDish);

// obtenir les info d'un plat
router.get(`/${apiVersion}/dishes/:id`, dishController.dishById);

// modifier un plat
router.patch(`/${apiVersion}/dishes/:id`, dishController.addOrUpdateDish);

// supprimer un plat
router.delete(`/${apiVersion}/dishes/:id`, dishController.removeDish);

// obtenir les ingrédients d'un plat
router.get(`/${apiVersion}/dishes/:id/ingredients`, dishController.ingredients);

// Ajouter un ingredient à un plat
router.post(`/${apiVersion}/dishes/:id/ingredients`, dishController.addIngredient);

// Supprimer un ingredient d'un plat
router.delete(`/${apiVersion}/dishes/:id/ingredients/:item_id`, dishController.removeIngredient);

// obtenir les info de comment préparer un plat
router.get(`/${apiVersion}/dishes/:id/directions`, dishController.directions);

// ajouter un pas de preparation
router.post(`/${apiVersion}/dishes/:id/directions`, dishController.addDirection);

// Supprimer un pas de preparation
router.delete(`/${apiVersion}/dishes/:id/directions/:step_id`, dishController.removeDirection);

module.exports = router;