# Application Cuisine GTI525

Le but de cette application est de fournir quelques notions de base sur les bases de données, les API REST, et Express.js.

Par défaut, l’application fonctionnera avec une base de données SQLite3 fournie dans le dossier `data/`, mais 
il est aussi possible d’utiliser MariaDB ou MySQL. Il suffit de créer la base de données et de changer 
le driver dans le dossier `db/`:

```
// module.exports = new MariaDBDriver();
module.exports = new SQLite3Driver();
``` 
Les scripts pour recréer la base de données se trouvent dans le dossier `sql/`.

Les recettes utilisés dans cette application ont été extraites du **Le grand livre Marabout de la cuisine du monde.** 
Merci de citer la source des recettes si vous utilisez cet exemple.