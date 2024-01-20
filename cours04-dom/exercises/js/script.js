import { Product } from './product.js';

const products = [
    new Product('Téléphone', 299, 10),
    new Product('Ordinateur portable', 999, 5),
    new Product('Casque audio', 79, 15)
];

const productListDiv = document.getElementById('product-list');
products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.classList.add("flow-text");
    productDiv.textContent = product.showDetails();
    productListDiv.appendChild(productDiv);
});