import { PipelineFactory, pipelineTasks } from './pipeline.js';
import Format from 'response-format';
import { body, validationResult } from 'express-validator';

/**
 * Validates the request body for text generation.
 */
const validateTextGeneration = [
    body('text')
        .exists().withMessage('Le champ text est obligatoire')
        .notEmpty().withMessage('Le champ text ne peut pas être vide'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(Format.badRequest('Validation échouée', { errors: errors.array() }));
        }
        next();
    }
];

/**
 * Handles text generation requests.
 */
const handleTextGeneration = async (req, res) => {
    try {
        const { text } = req.body;
        
        // Charger le générateur de manière différée ou utiliser l'instance mise en cache
        const generator = await PipelineFactory.getInstance(
            pipelineTasks.TEXT_GENERATION.task,
            pipelineTasks.TEXT_GENERATION.model
        );

        const messages = [
            { role: "system", content: "You are a helpful assistant. Be concise in your responses. Provide answers in French." },
            { role: "user", content: text },
        ];

        const results = await generator(messages, {
            max_length: 512,
            temperature: 1.0,
            top_p: 0.95,
            top_k: 64,
            do_sample: true
        });

        if (results && results.length > 0) {
            // La bibliothèque Transformers renvoie un tableau d'éléments générés
            const generatedText = results[0].generated_text;

            // Récupérez le contenu du dernier message, qui est la réponse de l'assistant
            const responseContent = generatedText[generatedText.length - 1].content;
            return res.json(Format.success("Succès", responseContent));
        } else {
            return res.status(500).json(Format.error("Impossible d'obtenir une réponse du modèle"));
        }
    } catch (error) {
        console.error('Error in text generation:', error);
        return res.status(500).json(Format.error("Une erreur interne est survenue lors de la génération du texte"));
    }
};

export default {
    textGeneration: [...validateTextGeneration, handleTextGeneration]
};
