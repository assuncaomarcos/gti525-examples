# Application Cuisine GTI525

Le but de cette application est de fournir des notions de base sur les bases de données relationnelles, 
les API REST, et Express.js.

Instructions à suivre avant de démarrer cette application:
* Construire l'image utilisée par le conteneur Docker qui hébergera la base de données MongoDB :
```bash
docker build -t gti525/mongodb-cuisine:v1.0 .
``` 

* Créer un fichier `.env`. Vous pouvez utiliser `.env_example`:
```bash
cp .env_example .env
``` 

* Démarrer le conteneur à l'aide de docker-compose :
```bash
docker-compose up
``` 

Les recettes utilisées dans cette application ont été extraites du livre **Le grand livre Marabout 
de la cuisine du monde.** Merci de citer la source des recettes si vous utilisez cet exemple.
