const express = require('express');
const dishController = require('../controllers/dishes');
const passport = require("passport");
const Format = require("response-format");
const router = express.Router();
const apiVersion = process.env.CUISINE_API_VERSION || 'v3';

// On va définir une fonction qui ferra l'authentification
// parce que'on veut fournir une réponse customisée
async function doJwtAuth(req, res, next) {
    return passport.authenticate("jwt", {
        session: false // On ne veut pas utiliser des sessions pour l'API REST
    }, (err, user, info) => {
        if (err) {
            return res.status(505).json(Format.internalError(err.message));
        }
        if (!user) {
            return res.status(401).json(Format.unAuthorized("Requête non autorisée: " + info.message));
        }
        next();
    })(req, res, next);
}

router.route(`/${apiVersion}/dishes`)
    .get(doJwtAuth, dishController.allDishes)
    .post(doJwtAuth, dishController.addOrUpdateDish);

router.route(`/${apiVersion}/dishes/:id`)
    .get(doJwtAuth, dishController.dishById)
    .patch(doJwtAuth, dishController.addOrUpdateDish)
    .delete(doJwtAuth, dishController.removeDish);

router.route(`/${apiVersion}/dishes/:id/ingredients`)
    .get(doJwtAuth, dishController.ingredients)
    .post(doJwtAuth, dishController.addIngredient);

router.route(`/${apiVersion}/dishes/:id/directions`)
    .get(doJwtAuth, dishController.directions);

module.exports = router;