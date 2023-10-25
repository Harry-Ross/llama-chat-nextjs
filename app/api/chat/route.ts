import { z } from "zod";

import { LlamaService } from "@/services/llama";
import { ConversationInteraction, LlamaChatSession } from "node-llama-cpp";

const bodySchema = z.object({
  messages: z.array(
    z.object({ 
      text: z.string(), 
      system: z.boolean() 
    })
  ),
});

export async function POST(req: Request) {
  // const parsedBody = await bodySchema.safeParseAsync(body);
  // if (!parsedBody.success) {
  //   return Response.json({ success: false }, { status: 400 })
  // }
  if (!LlamaService.getContext()) {
    LlamaService.register();
  }

  type BodyType = z.infer<typeof bodySchema>;

  const body: BodyType = await req.json();
  
  const conversationHistory: ConversationInteraction[] = [];
  
  
  let current: ConversationInteraction = { prompt: "", response: "" };
  body.messages?.forEach((msg)  => {
    if (!msg.system) {
      current = {
        prompt: msg.text,
        response: "",
      };
    } else {
      current.response = msg.text;
      conversationHistory.push(current);
    }
  });

  const session = new LlamaChatSession({
    context: LlamaService.getContext(),
    conversationHistory,
  });

  if (current.prompt && !current.response) {
    const response = await session.prompt(current.prompt, { 
      onToken(token) {
        console.log("Token: " + session.context.decode(token));
      }
    });
    return new Response(response, { status: 200 });
  } else {
    return new Response("No prompt found", { status: 400 });
  }
}

function iteratorToStream(iterator: AsyncIterableIterator<string>) {
  const reader = {
    async read() {
      const { done, value } = await iterator.next();
      return { done, value: value ? new TextEncoder().encode(value) : undefined };
    },
  };

  return new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          break;
        }
        controller.enqueue(value);
      }
    },
  });
}

export const runtime = "nodejs";
