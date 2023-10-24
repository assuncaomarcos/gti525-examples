const express = require('express');
const userModel = require("./models/users");
const prodModel = require("./models/products");

const port = process.env.NODE_PORT || 3000;

const app = express();
app.use(express.json());

class Response {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    static ok(data) {
        return new Response(200, "OK", data);
    }

    static error(code, message, data) {
        return new Response(code, message, data);
    }
}

app.get('/users', (req, res) => {
    res.json(Response.ok(Object.values(userModel.allUsers())));
});

app.post('/users', (req, res) => {
    const user = userModel.addUser(req.body);
    if (user) {
        res.json(Response.ok(user));
    } else {
        res.status(505);
        res.json(Response.error(505, "Erreur d'ajout d'utilisateur"));
    }
});

app.get('/users/:userId', (req, res) => {
    let user = userModel.find(req.params.userId);
    if (user === undefined) {
        res.status(404);
        res.json(Response.error(404, "Utilisateur pas trouvé."));
    } else {
        res.json(Response.ok(user));
    }
});

app.get('/products', (req, res) => {
    res.json(Object.values(Response.ok(prodModel.allProducts())));
});

app.get('/products/:prodId', (req, res) => {
    let prod = prodModel.find(req.params.prodId);
    if (prod === undefined) {
        res.status(404);
        res.json(Response.error(404, "Produit pas trouvé."));
    } else {
        res.json(Response.ok(prod));
    }
});

app.post('/products', (req, res) => {
    const prod = prodModel.addProduct(req.body);
    if (prod) {
        res.json(Response.ok(prod));
    } else {
        res.status(505);
        res.json(Response.error(505, "Erreur d'ajout de produit"));
    }
});

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`)
});