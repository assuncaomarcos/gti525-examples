import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.NODE_PORT || 3000;

app.use(cors());

app.get('/dishes/:id', function (req, res, next) {
    res.json({msg: 'CORS est activé pour toutes les origines'});
});

app.listen(port, function () {
    console.log(`Serveur compatible CORS écoutant le port ${port}...`);
});