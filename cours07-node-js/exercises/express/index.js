const express = require('express')
const fs = require('node:fs');
const port = process.env.NODE_PORT || 3000;
const csvfile = 'video_game_films.csv';

async function loadDataset(readable) {
    let fieldNames = null;
    let database = [];
    for await (const chunk of readable) {
        let lines = chunk.toString().split('\n');
        if (fieldNames == null) {
            fieldNames = lines.shift().trim().split(',');
        }

        lines.forEach(line => {
            let values = line.trim().split(',');
            let obj = {};
            values.forEach((value, index) => {
                obj[fieldNames[index]] = value;
            });
            database.push(obj);
        });
    }
    return database;
}

let movieDataset = {};
const readStream = fs.createReadStream(csvfile, {encoding: 'utf8'});
loadDataset(readStream).then(database => {
    database.forEach(movie => {
        movieDataset[movie.id] = movie;
    })
}).catch(error => {
    console.log("Erreur de lecture du fichier d'entrée");
});

const app = express()

app.get('/movies', (req, res) => {
    res.json(Object.values(movieDataset));
});

app.get('/movies/:movieId', (req, res) => {
    let movie = movieDataset[req.params.movieId];
    if (movie == undefined) {
        res.sendStatus(404);
    } else {
        res.json(movie);
    }
});

app.listen(port, () => {
    console.log(`Serveur écoutant sur le port ${port}`)
})