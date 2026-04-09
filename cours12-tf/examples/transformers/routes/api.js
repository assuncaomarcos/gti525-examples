import express from 'express';
import textController from '../controllers/text-generation.js';

const router = express.Router();

router.post('/text-generation', textController.textGeneration);

export default router;
