const { fakerFR_CA: faker } = require('@faker-js/faker');
const _ = require('lodash');
const fs = require("node:fs");

faker.seed(525);
faker.setDefaultRefDate('2023-09-01T00:00:00.000Z');
const numberUsers = 15;
const numberProducts = 50;
const databaseFile = 'db.json';

const createUser = () => {
    const gender = faker.person.sexType();
    return {
        id: faker.string.uuid(),
        firstName: faker.person.firstName(gender),
        lastName: faker.person.lastName(gender),
        address: faker.location.street(),
        city: faker.location.city(),
        province: faker.location.state({abbreviated: true}),
        birthday: faker.date.birthdate().toISOString().split('T').shift(),
        phone: faker.phone.number()
    }
}

const createProduct = () => {
    return {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({min: 10, max: 200, dec: 2, symbol: 'C$'})
    }
}

try {
    console.log(`En train de créer le fichier ${databaseFile}`);
    const users = _.times(numberUsers, createUser);
    const products = _.times(numberProducts, createProduct);
    fs.writeFileSync(databaseFile, JSON.stringify({ users, products }, null, 2));
    console.log(`Fichier ${databaseFile} crée.`);
} catch(err) {
    console.error(`Erreur dans la création de la BD: ${err.message}`);
}