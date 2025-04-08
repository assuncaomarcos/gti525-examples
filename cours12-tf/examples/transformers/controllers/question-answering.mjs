import { PipelineFactory, pipelineTasks } from './pipeline.mjs';
import Format from 'response-format';
import { body, validationResult } from 'express-validator';

const questionAnswering = [
    body("context").exists().notEmpty(),
    body("question").exists().notEmpty(),
    async (req, res) => {
        const validation = validationResult(req);
        if (validation.isEmpty()) {
            const {context, question} = req.body;
            const pipeline = await PipelineFactory.getInstance(
              pipelineTasks.QUESTION_ANSWERING.task,
              pipelineTasks.QUESTION_ANSWERING.model
            );
            const answer = await pipeline(question, context);
            res.json(Format.success("OK", answer));
        } else {
            res.json(Format.badRequest("Contexte et question obligatoires", { errors: validation.array() }));
        }
    }];

export default { questionAnswering  }

