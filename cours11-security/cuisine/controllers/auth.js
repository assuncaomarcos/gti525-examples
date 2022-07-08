const Format = require("response-format");
const Auth = require("../models/users");

async function signup(req, res) {
    try {
        const {firstname, lastname, email, password} = req.body;

        // Pour vérifier si tous les champs ont été remplis
        if (!(email && password && firstname && lastname)) {
            return res.status(404).json(Format.badRequest("Tous les champs doivent être remplis"));
        }

        // Vérifier si l'utilisateur existe dans la base de données
        const oldUser = await Auth.findOne({email: email});

        if (oldUser) {
            return res.status(404).json(Format.badRequest("Utilisateur existant. Veuillez vous connecter."));
        }

        // Créer l'utilisateur dans la base de données
        const user = await Auth.create({
            firstname,
            lastname,
            email: email.toLowerCase(),
            password
        });

        // retourner le nouvel utilisateur
        res.json(Format.success("OK", {id: user._id}));
    } catch (error) {
        res.status(505).json(Format.internalError(error.message));
    }
}

async function login(req, res) {
    res.json(Format.success("OK", {token: req.user.token}));
}

module.exports = {
    signup,
    login
}