import { env, pipeline } from '@xenova/transformers';
import Format from 'response-format';
import { body, validationResult } from 'express-validator';

class QnAPipeline {
    static task = 'question-answering';
    static model = 'Xenova/distilbert-base-uncased-distilled-squad';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            env.allowRemoteModels = true;
            env.cacheDir = './.cache';
            this.instance = pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

const questionAnswering = [
    body("context").exists().notEmpty(),
    body("question").exists().notEmpty(),
    async (req, res) => {
        const validation = validationResult(req);
        if (validation.isEmpty()) {
            const {context, question} = req.body;
            const pipeline = await QnAPipeline.getInstance();
            const answer = await pipeline(question, context);
            res.json(Format.success("OK", answer));
        } else {
            res.json(Format.badRequest("Contexte et question obligatoires", { errors: validation.array() }));
        }
    }];

export default { questionAnswering  }

