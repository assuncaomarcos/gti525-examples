import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

// Pour chiffrer le mot de passe avant de le stocker dans MongoDB
userSchema.pre(
    'save',
    async function(next) {
        const user = this;

        // ne hache le mot de passe sur la collection MongoDB
        // que s'il a été modifié par l'utilisateur,
        // ou s'il s'agit d'un nouvel utilisateur
        if (!user.isModified('password')) return next();

         // salt round (ou coût) = 10
        this.password = await bcrypt.hash(user.password, 10);
        next();
    }
);

// Méthode pour verifier si le mot de passe d'un utilisateur est valide
userSchema.methods.isPasswordValid = async function(password) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("users", userSchema);