const express = require("express");
const dishController = require("./controllers/dishes");
const itemController = require("./controllers/items");

const app = express();
const PORT = process.env.NODE_PORT || 3000;
const apiVersion = 'v1';

// Pour servir les pages Web d'exemple
app.use(express.static('pages'));

// --------- Routes -----------

// lister les plats
app.get(`/${apiVersion}/dishes`, dishController.allDishes);

// obtenir les info d'un plat
app.get(`/${apiVersion}/dishes/:id`, dishController.dishById);

// obtenir les ingrédients d'un plat
app.get(`/${apiVersion}/dishes/:id/ingredients`, dishController.ingredients);

// obtenir les info de comment préparer un plat
app.get(`/${apiVersion}/dishes/:id/directions`, dishController.directions);

// --- routes ajoutées pour la solution de l'exercice en classe
app.get(`/${apiVersion}/items`, itemController.allItems);

// obtenir les info d'un item
app.get(`/${apiVersion}/items/:id`, itemController.itemById);

app.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));
