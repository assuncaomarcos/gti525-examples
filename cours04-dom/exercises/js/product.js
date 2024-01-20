export class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    showDetails() {
        return `${this.name} - Prix : ${this.price} CAD - Quantité : ${this.quantity}`;
    }
}