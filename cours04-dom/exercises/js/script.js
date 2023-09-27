import { Product } from './product.js';

const produits = [
    new Product('Téléphone', 299, 10),
    new Product('Ordinateur portable', 999, 5),
    new Product('Casque audio', 79, 15)
];

const listeProduitsDiv = document.getElementById('liste-produits');
produits.forEach(produit => {
    const produitDiv = document.createElement('div');
    produitDiv.classList.add("flow-text");
    produitDiv.textContent = produit.afficherDetails();
    listeProduitsDiv.appendChild(produitDiv);
});