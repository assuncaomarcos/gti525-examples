import express from 'express';
import dotenv from 'dotenv';
import { default as jwt } from 'jsonwebtoken';
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.NODE_PORT || 3000;
app.use(express.json());

dotenv.config();
const secretKey = process.env.JWT_KEY;

/*
Quelques données d'utilisateurs.
Dans un vrai système, les informations sont stockées par une base
de données ou par un système d'authentification. Nous allons quand
même chiffrer les mots de passe et utiliser leur hash pour démontrer
l'utilisation de bcrypt
*/
const users = new Map();
users.set("gti525", await bcrypt.hash('passw0rd', 10));
users.set("jwt", await bcrypt.hash('gti525', 10));

/*
Intergiciel/gestionnaire Express pour verifier le jeton JWT
et qu'il n'a pas été modifié.
 */
const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(401).json({ message: "Erreur d'authentification" });
    }

    try {
        req.user = await jwt.verify(token, secretKey);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Interdit' });
    }
};

/*
Point de terminaison de l'API pour 'loguer' un utilisateur
et créer un jeton JWT à partir de son nom d'utilisateur
 */
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const hash = users.get(username);
    const validPass = await bcrypt.compare(password, hash);

    if (!hash || !validPass) {
        return res.status(401).json({ message: "Erreur d'authentification" });
    }

    const accessToken = jwt.sign({ username: username }, secretKey);
    res.json({ accessToken });
});

// Exemple d'une route protégée
app.get('/api/secure', authenticateJWT, (req, res) => {
    res.json({ message: 'Cette route est sécuritaire !', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`)
});

