const casual = require('casual').en_CA;
const path = require('path');
const fs = require("fs");

const dbPath = path.join(__dirname, 'db.json');
const numUsers = 10;
const numPosts = 100;
casual.seed(888);

casual.define('user', function(id) {
    return {
        id: id,
        firstname: casual.first_name,
        lastname: casual.last_name,
        address: casual.address1,
        city: casual.city,
        province: casual.province,
        phone: casual.phone
    };
});

casual.define('post', function(id) {
    return {
        id: id,
        user_id: casual.integer(from=1, to=numUsers),
        title: casual.title,
        text: casual.text
    };
});

function createDB() {
    const data = { users: [], posts: [] };

    console.log("En train de créer la base de données...");

    // Remplir la db avec quelques utilisateurs
    for (let i = 0; i < numUsers; i++) {
        data.users.push(casual.user(i + 1));
    }

    for (let i = 0; i < numPosts; i++) {
        data.posts.push(casual.post(i + 1));
    }

    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getDBPath : () => {
        try {
            if (!fs.existsSync(dbPath)) {
                createDB();
            }
        } catch(err) {
            console.error(err);
            return null;
        }
        return dbPath;
    }
}