const model = require("../models/users");
const { Response } = require("./util");

async function allUsers(req, res){
    res.json(Response.ok(model.allUsers()));
}

async function addUser(req, res){
    const user = model.addUser(req.body);
    if (user) {
        res.json(Response.ok(user));
    } else {
        res.status(505);
        res.json(Response.error(505, "Erreur d'ajout d'utilisateur"));
    }
}

async function findUser(req, res) {
    let user = model.find(req.params.userId);
    if (user === undefined) {
        res.status(404);
        res.json(Response.error(404, "Utilisateur pas trouvé."));
    } else {
        res.json(Response.ok(user));
    }
}

async function updateUser(req, res) {
    const user = req.body;
    const userId = req.params.userId;
    const updated = model.update(userId, user);
    if (updated) {
        res.json(Response.ok(updated));
    } else {
        res.json(Response.error(404, "Utilisateur pas trouvé."));
    }
}

async function deleteUser(req, res) {
    const userId = req.params.userId;
    const deleted = model.delete(userId);
    if (deleted) {
        res.json(Response.ok(deleted));
    } else {
        res.json(Response.error(404, "Utilisateur pas trouvé."));
    }
}

module.exports = { allUsers, addUser, findUser, updateUser, deleteUser };

