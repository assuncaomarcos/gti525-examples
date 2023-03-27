const express = require('express');
const { doubleCsrf } = require("csrf-csrf");
const authController = require("../controllers/auth");
const passport = require("passport");
const Format = require("response-format");
const routes = express.Router();

// Le cookie CSRF aura une durée d'un jour
const oneDay = 1000 * 60 * 60 * 24;

// Ces paramètres sont destinés au développement.
// Assurez-vous d'utiliser cors et helmet en production.
const {
    invalidCsrfTokenError,
    generateToken,
    doubleCsrfProtection } =
    doubleCsrf({
        getSecret: (req) => req.secret,
        secret: process.env.CSRF_SECRET,
        cookieName: process.env.CSRF_COOKIE_NAME,
        cookieOptions: { maxAge: oneDay, sameSite: "Strict", secure: true, signed: true },
        size: 64,
        ignoredMethods: ["GET", "HEAD", "OPTIONS"]
    });

// Traitement des erreurs, interception des erreurs de validation
const csrfErrorHandler = (error, req, res, next) => {
    if (error == invalidCsrfTokenError) {
        res.status(403).json(Format.unAuthorized("Erreur de validation CSRF"));
    } else {
        next();
    }
};

routes.get("/", (req, res) => {
   // S'il n'y a pas req.user configuré par passport, l'utilisateur n'est pas authentifié
    if (req.user) {
        return res.render('home');
    }
    res.redirect("login");
});

routes.get("/signup", (req, res) => {
    res.locals.csrfToken = generateToken(res, req);
    res.render("signup");
});

routes.post("/signup", doubleCsrfProtection, csrfErrorHandler, authController.signup);

routes.get("/login",  (req, res) => {
    res.locals.csrfToken = generateToken(res, req);
    res.render("login");
});

// Si on veut fournir un JSON avec une réponse customisée
// routes.post("/login", csrfProtection, passport.authenticate('password',
//     {
//         failureMessage: "Nom d'utilisateur ou mot de passe invalide",
//     }),
//     authController.login);

routes.post("/login", doubleCsrfProtection, csrfErrorHandler, doPasswordAuth, authController.login);

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