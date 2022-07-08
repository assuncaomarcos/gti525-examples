const express = require('express');
const authController = require("../controllers/auth");
const passport = require("passport");
const Format = require("response-format");
const routes = express.Router();
const csrf = require("csurf");
const csrfProtection = csrf();

routes.get("/", (req, res) => {
   // S'il n'y a pas req.user configuré par passport, l'utilisateur n'est pas authentifié
    if (req.user) {
        return res.render('home');
    }
    res.redirect("login");
});

routes.get("/signup", csrfProtection, (req, res) => {
    res.locals.csrfToken = req.csrfToken();
    res.render("signup");
});

routes.post("/signup", csrfProtection, authController.signup);

routes.get("/login", csrfProtection, (req, res) => {
    res.locals.csrfToken = req.csrfToken();
    res.render("login");
});

routes.post("/login", csrfProtection, passport.authenticate('password',
    {
        failureMessage: "Nom d'utilisateur ou mot de passe invalide",
    }),
    authController.login);

// Si on veut fournir un JSON avec une réponse customisée
// routes.post("/login", doPasswordAuth, authController.login);

async function doPasswordAuth(req, res, next) {
    passport.authenticate(
        'password',
        {failureMessage: true, session: true},
        async (err, user, info) => {
            if (err) {
                return res.json(Format.internalError(err.message));
            }
            if (!user) {
                return res.json(Format.badRequest(info.message));
            }

            try {
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    next();
                });
            } catch (error) {
                return res.json(Format.internalError(error.message));
            }
        }
    )(req, res, next);
}

routes.get('/logout', function(req, res, next) {
    req.session.destroy(function (err) {
        req.logout(function (err) {
            res.redirect('/');
        });
    });
});

module.exports = routes;