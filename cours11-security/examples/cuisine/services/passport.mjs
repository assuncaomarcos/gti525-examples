import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';
import {default as jwt} from 'jsonwebtoken';
import userModel from '../models/users.mjs';
import Format from 'response-format';

// Pour sérialiser un utilisateur dans la session
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, {id: user._id, firstname: user.firstname});
    });
});

// Pour desérialiser un utilisateur
passport.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});

// Stratégie d'authentification par nom d'utilisateur et mot de passe
passport.use(
    'password',
    new LocalStrategy({usernameField: 'email', passwordField: 'password'},
        async function (email, password, done) {
            try {
                const user = await userModel.findOne({email});
                if (!user) {
                    return done(null, false, {message: 'Utilisateur non trouvé'});
                }

                const validPass = await user.isPasswordValid(password);
                if (!validPass) {
                    return done(null, false, {message: 'Mauvais mot de passe'});
                }

                // Création du jeton JWT d'authentification auprès de l'API REST
                user.token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_KEY, {expiresIn: "4h"}, null);
                user.save();

                return done(null, user, {message: 'Connecté avec succès'});
            } catch (error) {
                return done(error);
            }
        })
);

// Stratégie d'authentification par JWT
passport.use('jwt', new JWTStrategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
            ignoreExpiration: false
        },
        function (token, done) {
            /* On pourrait chercher l'utilisateur dans la base de données à nouveau,
             mais pour notre API, il suffit que le jeton soit valide */
            try {
                return done(null, {id: token.id, email: token.email});
            } catch (error) {
                done(error);
            }
        })
);

async function authenticatePassword(req, res, next) {
    return passport.authenticate(
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
                req.login(user, function (err) {
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

async function authenticateJWT(req, res, next) {
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

export default {
    authenticateJWT,
    authenticatePassword,
    initialize: (...args) => { return passport.initialize(...args) },
    authenticate: (...args) => { return passport.authenticate(...args) }
};