import { env, pipeline } from '@xenova/transformers';

class PipelineFactory {
  static instance = null;

  /**
   * Creates or returns the existing pipeline instance for the given task and model.
   * @param {string} task - The task for the pipeline (e.g., 'question-answering').
   * @param {string} model - The model name or path (e.g., 'Xenova/distilbert-base-uncased-distilled-squad').
   * @param {Function|null} progress_callback - Optional callback for progress updates.
   * @returns {Promise<Object>} The pipeline instance for the specified task and model.
   */
  static async getInstance(task, model, progress_callback = null) {
    if (!this.instance || this.instance.task !== task || this.instance.model !== model) {
      // Configure the environment
      env.allowRemoteModels = true;
      env.cacheDir = './.cache';
      // Create a new pipeline instance
      const pipelineInstance = await pipeline(task, model, { progress_callback });
      this.instance = { instance: pipelineInstance, task, model };
    }
    return this.instance.instance;
  }
}

// Example tasks and models that can be used
const pipelineTasks = {
  QUESTION_ANSWERING: {
    task: 'question-answering',
    model: 'Xenova/distilbert-base-uncased-distilled-squad',
  },
  TEXT2TEXT_GENERATION: {
    task: 'text2text-generation',
    model: 'Xenova/LaMini-Flan-T5-783M',
  },
  TRANSLATION: {
    task: 'translation',
    model: 'Xenova/nllb-200-distilled-600M',
  },
};

export { PipelineFactory, pipelineTasks };