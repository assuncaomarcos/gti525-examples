import { env, pipeline } from '@xenova/transformers';
import Format from 'response-format';
import { body, validationResult } from 'express-validator';

class TextGenerationPipeline {
    static task = 'text2text-generation';
    static model = 'Xenova/LaMini-Flan-T5-783M';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            env.allowRemoteModels = true;
            env.allowTokenDownloads = true; // Allowing token downloads
            env.cacheDir = './.cache';

            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// Charge le modèle au début, car il peut pendre du temps pour télécharger les fichiers nécessaires.
const generator = await TextGenerationPipeline.getInstance();

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

