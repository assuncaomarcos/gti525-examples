const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require("../models/users");
const jwt = require("jsonwebtoken");

// Nécessaire pour sérialiser un utilisateur dans la session
passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, {id: user._id, firstname: user.firstname});
    });
});

// Nécessaire pour desérialiser un utilisateur
passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
        return done(null, user);
    });
});

// Stratégie d’authentification par nom d’utilisateur et mot de passe
passport.use(
    'password',
    new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (email, password, done) {
        try {
            const user = await Users.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Utilisateur non trouvé' });
            }

            const validPassword = await user.isPasswordValid(password);
            if (!validPassword) {
                return done(null, false, { message: 'Mauvais mot de passe' });
            }

            // Création du jeton JWT d'authentification pour l'API REST
            user.token = jwt.sign(
                {
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_KEY,
                { expiresIn: "4h"},null);
            user.save();

            return done(null, user, { message: 'Connecté avec succès' });
        } catch (error) {
            return done(error);
        }
    })
);

// Stratégie d’authentification par jeton Web JSON
passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
            ignoreExpiration: false
        },
        function(token, done) {
            // On pourrait chercher l’utilisateur dans la base de données,
            // mais pour cet exemple il nous suffit que le jeton soit valide
        try {
            return done(null, {id: token.id, email: token.email});
        } catch (error) {
            done(error);
        }
    })
);

module.exports = passport;