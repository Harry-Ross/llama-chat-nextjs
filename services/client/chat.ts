import type { Message } from "@/types/chat";

export const getChatResponse = async (
  conversationId: number,
  messages: Message[],
): Promise<ReadableStreamDefaultReader<string> | undefined> => {
  const res = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({
      conversationId,
      messages,
    }),
    cache: "no-store",
  });

  if (res.status !== 200) {
    throw new Error("Failed to get chat response");
  }

  return res.body?.pipeThrough(new TextDecoderStream()).getReader();
};
