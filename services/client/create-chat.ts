"use server";

import { redirect } from "next/navigation";
import { createConversation } from "../server/history";
import { revalidatePath } from "next/cache";

export const createChat = async (): Promise<void> => {
  const id: number = await new Promise((resolve) => {
    createConversation("New Chat", (num) => {
      resolve(num);
    });
  });

  revalidatePath("/chat", "layout");
  redirect(`/chat/${id}`);
}