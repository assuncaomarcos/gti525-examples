import express from 'express';
import apiRoutes from './routes/api.js';
import viewRoutes from './routes/views.js';

const app = express();
const PORT = process.env.NODE_PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.use('/', viewRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`)
});