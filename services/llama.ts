import {
  LLamaChatPromptOptions,
  LlamaChatSession,
  LlamaContext,
  LlamaModel,
} from "node-llama-cpp";

export class LlamaService {
  private static context: LlamaContext;

  public static getContext() {
    if (this.context) {
      const model = new LlamaModel({
        modelPath: "llama/llama-2-7b-chat.Q2_K.gguf",
        gpuLayers: 64,
      });

      this.context = new LlamaContext({ model });
    }

    return this.context;
  }
}
