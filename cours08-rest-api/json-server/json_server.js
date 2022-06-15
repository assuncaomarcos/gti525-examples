const jsonServer = require('json-server');
const db = require('./db');

const port = process.env.NODE_PORT || 3000;
const server = jsonServer.create();
const router = jsonServer.router(db.getDBPath());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log('JSON Server écoute le port ' + port);
})