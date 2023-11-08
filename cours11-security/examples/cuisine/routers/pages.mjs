import {Router} from 'express';
import dishModel from '../models/dishes.mjs';
import userController from '../controllers/users.mjs';
import passport from '../services/passport.mjs';

const router = Router();

const checkIfLogged = async(req, res, next) => {
    // Si req.user n'est pas configuré par passport, l'utilisateur n'est pas connecté
    if ( !req?.user ) {
        return res.redirect("/login");
    }
    next();
}

router.route("/")
    .get(checkIfLogged, async (req, res) => {
        res.redirect("/recipes");
    });

router.route("/recipes")
    .get(checkIfLogged, async (req, res) => {
        const dishes = await dishModel.find().select({ingredients: 0, directions: 0});
        return res.render('pages/recipes', {dishes: dishes});
    });

router.route("/recipe_detail")
    .get(checkIfLogged, async (req, res) => {
        const dishId = req.query.id;
        const dish = await dishModel.findById(dishId);
        res.render('pages/detail', {dish: dish});
    });

router.route("/login")
    .get(async (req, res) => {
        res.render("pages/login", { csrfToken: null });
    })
    .post(passport.authenticatePassword, userController.login);

router.route("/signup")
    .get(async (req, res) => {
        res.render("pages/signup", { csrfToken: null });
    })
    .post(userController.signUp);

router.route('/logout')
    .get(checkIfLogged, async (req, res) => {
        req.session.destroy(() => {
            req.logout(() => {
                res.redirect('/login');
            });
        });
    });

export default router;