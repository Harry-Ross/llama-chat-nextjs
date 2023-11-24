import {
  LLamaChatPromptOptions,
  LlamaChatSession,
  LlamaContext,
  LlamaModel,
} from "node-llama-cpp";

export class LlamaService {
  private static context: LlamaContext;

  public static getContext() {
    return this.context;
  }

  public static register() {
    const model = new LlamaModel({
      modelPath: "llama/llama-2-7b-chat.Q2_K.gguf",
      gpuLayers: 64,
    });

    this.context = new LlamaContext({ model });
  }
}
