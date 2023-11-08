import model from '../models/users.mjs';
import Format from 'response-format';

class UserController {

    async signUp(req, res) {
        try {
            const {firstname, lastname, email, password} = req.body;

            // Pour vérifier si tous les champs ont été remplis
            if (!(email && password && firstname && lastname)) {
                return res.json(Format.badRequest("Tous les champs doivent être remplis"));
            }

            // Vérifier si l'utilisateur existe dans la base de données
            const oldUser = await model.findOne({email: email});

            if (oldUser) {
                return res.json(Format.badRequest("Utilisateur existant. Veuillez vous connecter."));
            }

            // Créer l'utilisateur dans la base de données
            const user = await model.create({
                firstname,
                lastname,
                email: email.toLowerCase(),
                password
            });

            // retourner le nouvel utilisateur
            res.json(Format.success("OK", {id: user._id}));
        } catch (error) {
            res.json(Format.internalError(error.message));
        }
    }

    async login(req, res) {
        res.json(Format.success("OK", {token: req.user.token}));
    }
}

export default new UserController();