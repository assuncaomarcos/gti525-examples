const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.NODE_PORT || 3000

const corsOptions = {
    origin: 'https://exemple.com'
}

app.get('/dishes/:id', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'CORS est activé seulement pour exemple.com'});
});

app.listen(port, function () {
    console.log(`Serveur compatible CORS écoutant sur le port ${port}...`);
});