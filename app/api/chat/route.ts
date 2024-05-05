import { z } from "zod";

import { LlamaService } from "@/services/server/llama";
import { type ConversationInteraction, LlamaChatSession } from "node-llama-cpp";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  messages: z.array(
    z.object({
      content: z.string(),
      system: z.union([z.boolean(), z.number().gte(0).lte(1)]),
    }),
  ),
});

export async function POST(req: Request): Promise<Response> {
  if (!LlamaService.getContext()) {
    LlamaService.register();
  }

  const json = await req.json();
  const parsedBody = bodySchema.safeParse(json);

  if (!parsedBody.success) {
    console.log(json);
    console.error(parsedBody.error);
    return new Response("Invalid body", { status: 400 });
  }

  const body = parsedBody.data;

  const conversationHistory: ConversationInteraction[] = [];

  let current: ConversationInteraction = { prompt: "", response: "" };
  body.messages?.forEach((msg) => {
    if (!msg.system) {
      current = {
        prompt: msg.content,
        response: "",
      };
    } else {
      current = {
        prompt: "",
        response: msg.content,
      };
      conversationHistory.push(current);
    }
  });

  if (current.prompt && !current.response) {
    const responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    const encoder = new TextEncoder();

    const session = new LlamaChatSession({
      context: LlamaService.getContext(),
      conversationHistory,
    });

    session
      .prompt(current.prompt, {
        onToken(token) {
          const decoded = session.context.decode(token);
          writer
            .write(encoder.encode("data: " + decoded + "\n\n"))
            .then(() => {
              console.log("Wrote", decoded);
            })
            .catch((err) => {
              console.error(err);
            });
        },
        signal: req.signal,
      })
      .then(async () => {
        await writer.write("[DONE]");
        await writer.close();
      })
      .catch((err) => {
        console.error(err);
      });

    // const text = await session.prompt(current.prompt);

    return new Response(responseStream.readable, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/event-stream; charset=utf-8",
        Connection: "keep-alive",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
        "Content-Encoding": "none",
      },
    });
  } else {
    return new Response("No prompt found", { status: 400 });
  }
}

export const runtime = "nodejs";
