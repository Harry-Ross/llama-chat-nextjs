import {
  LlamaContext,
  LlamaModel,
} from "node-llama-cpp";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class LlamaService {
  private static context: LlamaContext;

  public static getContext(): LlamaContext {
    return this.context;
  }

  public static register(): void {
    const model = new LlamaModel({
      modelPath: process.env.LLAMA_MODEL_PATH || "llama/llama-2-7b-chat.Q2_K.gguf",
      gpuLayers: 64,
    });

    this.context = new LlamaContext({ model });
  }
}
