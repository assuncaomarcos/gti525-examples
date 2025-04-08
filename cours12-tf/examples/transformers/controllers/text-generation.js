import { PipelineFactory, pipelineTasks } from './pipeline.js';
import Format from 'response-format';
import { body, validationResult } from 'express-validator';

// Charge le modèle au début, car il peut pendre du temps pour télécharger les fichiers nécessaires.
const generator = await PipelineFactory.getInstance(
  pipelineTasks.TEXT2TEXT_GENERATION.task,
  pipelineTasks.TEXT2TEXT_GENERATION.model
);

const textGeneration = [
    body("text").exists().notEmpty(),
    async (req, res) => {
        const validation = validationResult(req);
        if (validation.isEmpty()) {
            const { text } = req.body;
            const answer = await generator(text, {
                max_length: 512,
                repetition_penalty: 1.2,
                do_sample: true
            });
            if (answer?.length) {
                return res.json(Format.success("OK", answer.pop()));
            } else {
                return res.json(Format.badRequest("Erreur pour obtenir une réponse: " + answer ));
            }
        } else {
            return res.json(Format.badRequest("Prompt obligatoire", { errors: validation.array() }));
        }
    }];

export default { textGeneration  }

