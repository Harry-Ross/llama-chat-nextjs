import { type Message } from "@/app/page";

export const getChatResponse = async (messages: Message[]) => {
  console.log(messages);

  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    body: JSON.stringify({
      messages,
    }),
    cache: "no-store",
  });

  return res.body?.pipeThrough(new TextDecoderStream()).getReader();
}