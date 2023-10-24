import { LLamaChatPromptOptions, LlamaChatSession, LlamaContext, LlamaModel } from "node-llama-cpp";

export class LlamaService {
    static session: LlamaChatSession;

    static register() {
        const model = new LlamaModel({
            modelPath: "llama/llama-2-7b-chat.Q2_K.gguf",
            gpuLayers: 64
        });

        const context = new LlamaContext({ model });
        this.session = new LlamaChatSession({ context });
    }

    static getSession() {
        return this.session;
    }

    static async prompt(question: string, options?: LLamaChatPromptOptions) {
        return this.session.prompt(question, options);
    }
}

