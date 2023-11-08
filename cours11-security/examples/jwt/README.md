## Exemple d'utilisation de JWT sur Express

Cet exemple, qui utilise Express et JWT, illustre un mécanisme de base pour 
authentifier les utilisateurs et sécuriser des routes dans une application 
Express. Nous utilisons la bibliothèque `jsonwebtoken` pour générer et vérifier 
des tokens JWT, permettant ainsi l'authentification. Les données de l'utilisateur, 
qui seraient normalement stockées dans une base de données, sont simulées ici 
avec des mots de passe hashés à l'aide de `bcrypt`. L'utilisation de `bcrypt` 
garantit que les mots de passe restent sécurisés.

L'application Express contient deux routes principales.

* **`api/login`** permet aux utilisateurs de se connecter en fournissant 
 un nom d'utilisateur et un mot de passe. Si les informations de connexion sont 
 correctes, un token JWT est généré et renvoyé à l'utilisateur.

* **`api/secure`** est protégée par le gestionnaire (ou *middleware*) `authenticateJWT`, 
 qui vérifie la validité du token JWT inclus dans l'en-tête de la requête. Si le 
 token est valide, l'utilisateur est autorisé à accéder à cette route.