import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.NODE_PORT || 3000;

app.get('/dishes/:id', cors(), function (req, res, next) {
    res.json({msg: 'CORS est activé pour une seule route'});
});

app.listen(port, function () {
    console.log(`Serveur compatible CORS écoutant le port ${port}...`);
});