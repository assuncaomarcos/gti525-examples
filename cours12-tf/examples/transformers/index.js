import express from 'express';
import qnaController from './controllers/question-answering.js';
import textController from './controllers/text-generation.js';
import translationController from './controllers/translation.js';

const app = express();
const PORT = process.env.NODE_PORT || 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.get(['/', '/question-answering'], async(req, res) => {
    res.render("pages/question-answering");
});

app.get('/text-generation', async(req, res) => {
    res.render("pages/text-generation");
});

app.post('/api/question-answering', qnaController.questionAnswering);

app.post('/api/text-generation', textController.textGeneration);

// app.post('/api/translation', translationController.translation);

app.listen(PORT, () => {
    console.log(`Serveur écoutant sur le port ${PORT}`)
});