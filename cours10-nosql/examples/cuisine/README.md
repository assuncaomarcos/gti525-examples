# Application Cuisine GTI525

Le but de cette application est de fournir des notions de base sur les bases de données relationnelles,
les API REST, et Express.js.

Instructions à suivre avant de démarrer cette application:

* Créer un fichier `.env`. Vous pouvez utiliser `.env_example`:
```bash
cp .env_example .env
``` 

* Construire l'image et démarrer le conteneur Docker qui hébergera la base de données MariaDB:
```bash
docker compose up -d --build
``` 

Les recettes utilisées dans cette application ont été extraites du livre **Le grand livre Marabout
de la cuisine du monde.** Merci de citer la source des recettes si vous utilisez cet exemple.
