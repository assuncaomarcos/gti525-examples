export class Product {
    constructor(nom, prix, quantite) {
        this.nom = nom;
        this.prix = prix;
        this.quantite = quantite;
    }

    afficherDetails() {
        return `${this.nom} - Prix : ${this.prix} CAD - Quantité : ${this.quantite}`;
    }
}