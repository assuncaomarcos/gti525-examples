const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
});

// Pour chiffrer le mot de passe avant de le stocker dans la base de données
userSchema.pre(
    'save',
    async function(next) {
        const user = this;

        // ne hache le mot de passe que s'il a été modifié (ou est nouveau)
        if (!user.isModified('password')) return next();

        const hash = await bcrypt.hash(user.password, 10); // salt round (ou coût) = 10
        this.password = hash;
        next();
    }
);

// Méthode pour verifier si le mot de passe d'un utilisateur est valide
userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const Users = module.exports = mongoose.model("users", userSchema);