import express from 'express';
import dishRouter from './routers/dishes.mjs';
import itemRouter from './routers/items.mjs';
import pagesRouter from './routers/pages.mjs';

const app = express();
const PORT = process.env.NODE_PORT || 3000;

// Pour servir les pages Web d'exemple
app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use("/api/dishes", dishRouter);
app.use("/api/items", itemRouter);
app.use(pagesRouter);

app.listen(PORT, () => console.log(`Le serveur écoute sur le port ${PORT}`));