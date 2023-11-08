# Application Cuisine GTI525

Cette application est une version améliorée de celle du cours précédent. Le but est de fournir quelques 
notions de base sur [Mogoose](https://mongoosejs.com/), l'authentification par mot de passe et via jetons JSON.

À l'aide de [Passport](https://www.passportjs.org/) l'application fournit deux modes d'authentification :

* Utilisateur et mot de passe : utilisé par l'application frontale.
* Jetons JSON : utilisé par l'API qui fournit des informations sur les plats disponibles.

Lors de l'authentification par nom d'utilisateur et mot de passe, l'application crée un jeton qui est estoqué 
par l'application frontale et utilisé pour accéder à l'API qui fournit les informations des plats.

Instructions à suivre avant de démarrer cette application :

* Construire l'image utilisée par le conteneur Docker qui hébergera la base de données MongoDB :
```bash
docker build -t gti525/mongodb-cuisine-security:v1.0 .
``` 

* Créer un fichier `.env`. Vous pouvez utiliser `.env_example`:
```bash
cp .env_example .env
``` 

* Démarrer le conteneur à l'aide de docker-compose :
```bash
docker-compose up
```

Les recettes utilisées dans cette application ont été extraites du livre **Le grand livre Marabout de la 
cuisine du monde.** Merci de citer la source des recettes si vous utilisez cet exemple.
