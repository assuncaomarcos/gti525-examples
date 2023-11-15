import express, {response} from 'express';
import qnaController from './controllers/question-answering.mjs';

const app = express();
const PORT = process.env.NODE_PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('static'));

const questionForm = (res) => {
    res.render("pages/question-answering");
}

app.get('/', async(req, res) => {
    questionForm(res);
});

app.get('/question-answering', async(req, res) => {
    questionForm(res);
});

app.post('/api/question-answering', qnaController.questionAnswering);

app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`)
});