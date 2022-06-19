const mysql = require('mysql2');
const dotenv = require("dotenv");

// dotenv essayera de charger un fichier appelé .env
const result = dotenv.config()
if (result.error) {
    console.error("Erreur de lecture du fichier .env", result.error);
    process.exit(-1);
}

/*  dotenv créé des variables d'environnement
    selon les valeurs spécifiés dans le fichier .env */
const connection = mysql.createConnection({
    host     : process.env.MARIADB_HOST,
    user     : process.env.MARIADB_USER,
    password : process.env.MARIADB_PWD,
    database : process.env.MARIADB_DB
});

// Pour établir une connexion
connection.connect(function(err) {
    if (err) {
        console.error('Erreur lors de la connexion: ' + err.stack);
        return;
    }
    console.log('Id. de connexion: ' + connection.threadId);
});

// Pour consulter la base de données
connection.query('SELECT * FROM dishes',
    function (error, results, fields) {
        if (error) throw error;

        console.log(results);
        // console.log(fields);
    }
);

connection.end();