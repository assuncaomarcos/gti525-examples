import express from 'express';
import pagesRouter from './routers/pages.mjs';

const app = express();
const PORT = process.env.NODE_PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use('/', pagesRouter);

app.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));