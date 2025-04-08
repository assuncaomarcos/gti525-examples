import { PipelineFactory, pipelineTasks } from './pipeline.js';
import Format from 'response-format';
import { body, validationResult } from 'express-validator';

// Charge le modèle au début, car il peut pendre du temps pour télécharger les fichiers nécessaires.
const translator = await PipelineFactory.getInstance(
  pipelineTasks.TRANSLATION.task,
  pipelineTasks.TRANSLATION.model
);

const translation = [
  body("text").exists().notEmpty(),
  async (req, res) => {
    const validation = validationResult(req);
    if (validation.isEmpty()) {
      const { text } = req.body;
      const answer = await translator(text, {
        src_lang: 'eng_Latn',
        tgt_lang: 'fra_Latn',
      });
      if (answer?.length) {
        return res.json(Format.success("OK", answer.pop()));
      } else {
        return res.json(Format.badRequest("Erreur pour obtenir une réponse: " + answer ));
      }
    } else {
      return res.json(Format.badRequest("Texte obligatoire", { errors: validation.array() }));
    }
  }];

export default { translation  }

