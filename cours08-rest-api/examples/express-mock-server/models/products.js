const { fakerFR_CA: faker } = require('@faker-js/faker');

faker.seed(525);
const numberProducts = 50;

const createProducts = (nProducts) => {
    const products = new Map();
    for (let i = 0; i < nProducts; i++) {
        const prod = {
            _id: faker.string.uuid(),
            name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price({min: 10, max: 200, dec: 2, symbol: 'C$'})
        }
        products.set(prod._id, prod);
    }
    return products;
}

class ProductModel {
    constructor() {
        this.data = createProducts(numberProducts);
    }

    addProduct(prod) {
        prod._id = faker.string.uuid();
        this.data.set(prod._id, prod);
        return prod;
    }

    find(prodId) {
        return this.data.get(prodId);
    }

    update(prodId, prod) {
        const toUpdate = this.find(prodId);
        if ( toUpdate ) {
            Object.assign(toUpdate, prod);
            return toUpdate;
        } else {
            return null;
        }
    }

    delete(prodId) {
        const prod = this.data.get(prodId);
        this.data.delete(prodId);
        return prod;
    }
    allProducts() {
        return Object.values(Object.fromEntries(this.data));
    }
}

module.exports = new ProductModel();