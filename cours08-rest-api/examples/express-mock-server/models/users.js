const { fakerFR_CA: faker } = require('@faker-js/faker');

faker.seed(525);
const numberUsers = 20;

const createUsers = (nUsers) => {
    const users = new Map();
    for (let i =0; i < nUsers; i++) {
        const gender = faker.person.sexType();
        const user = {
            _id: faker.string.uuid(),
            firstName: faker.person.firstName(gender),
            lastName: faker.person.lastName(gender),
            address: faker.location.street(),
            city: faker.location.city(),
            province: faker.location.state({abbreviated: true}),
            birthday: faker.date.birthdate(),
            phone: faker.phone.number()
        }
        users.set(user._id, user);
    }
    return users;
}

class UserModel {
    constructor() {
        this.data = createUsers(numberUsers);
    }

    addUser(user) {
        user._id = faker.string.uuid();
        this.data.set(user._id, user);
        return user;
    }

    find(userId) {
        return this.data.get(userId);
    }

    update(user) {
        this.data.set(user._id, user);
    }

    allUsers() {
        return Object.fromEntries(this.data);
    }
}

module.exports = new UserModel();