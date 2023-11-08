import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.NODE_PORT || 3000;

const corsOptions = {
    origin: 'https://exemple.com',
    methods: ['GET', 'PUT', 'DELETE', 'OPTIONS']
}

app.options('/dishes/:id', cors(corsOptions)); // activer la requête de pré-vol pour DELETE

app.delete('/dishes/:id', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'CORS est activé pour toutes les origines'});
});

app.listen(port, function () {
    console.log(`Serveur compatible CORS écoutant le port ${port}...`);
});