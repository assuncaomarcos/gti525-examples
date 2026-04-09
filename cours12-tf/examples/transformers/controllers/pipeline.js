import { env, pipeline } from '@huggingface/transformers';

// Configure the environment
env.allowRemoteModels = true;
env.cacheDir = './.cache';

class PipelineFactory {
  static instance = null;

  /**
   * Creates or returns the existing pipeline instance for the given task and model.
   * @param {string} task - The task for the pipeline (e.g., 'question-answering').
   * @param {string} model - The model name or path (e.g., 'onnx-community/gemma-4-E4B-it-ONNX').
   * @param {Function|null} progress_callback - Optional callback for progress updates.
   * @returns {Promise<Object>} The pipeline instance for the specified task and model.
   */
  static async getInstance(task, model, progress_callback = null) {
    if (!this.instance || this.instance.task !== task || this.instance.model !== model) {
      // Create a new pipeline instance
      const pipelineInstance = await pipeline(
        task,
        model,
        { progress_callback, device: 'cuda', dtype: 'q4' }
      );
      this.instance = { instance: pipelineInstance, task, model };
    }
    return this.instance.instance;
  }
}

// Example tasks and models that can be used
const pipelineTasks = {
  TEXT_GENERATION: {
    task: 'text-generation',
    model: 'onnx-community/gemma-4-E4B-it-ONNX',
  }
};

export { PipelineFactory, pipelineTasks };