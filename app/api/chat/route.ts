import { z } from "zod";

import { LlamaService } from "@/services/llama";

const bodySchema = z.object({
  question: z.string(),
});

export async function POST(req: Request) {
  // const body = req.json();
  // const parsedBody = await bodySchema.safeParseAsync(body);
  // if (!parsedBody.success) {
  //   return Response.json({ success: false }, { status: 400 })
  // }
  if (!LlamaService.getSession()) {
    LlamaService.register();
  }

  const q1 = "Generate a basic React component";
  console.log("User: " + q1);

  const a1 = await LlamaService.prompt(q1);
  console.log("AI: " + a1);

  const q2 = "Summarise what you said";
  console.log("User: " + q2);

  const a2 = await LlamaService.prompt(q2);
  console.log("AI: " + a2);

  return Response.json({ hello: "there" });
}

export const runtime = "nodejs";
