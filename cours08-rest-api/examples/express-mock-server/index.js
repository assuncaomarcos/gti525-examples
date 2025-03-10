import express from 'express';
import prodRouter from "./routers/products.js";
import userRouter from "./routers/users.js";
import pagesRouter from "./routers/pages.js";

const PORT = process.env.NODE_PORT || 3000;

const app = express();
app.use(express.json());
app.use(prodRouter);
app.use(userRouter);

app.set('view engine', 'ejs');
app.use(express.static('static'));
app.use(pagesRouter);

app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`)
});