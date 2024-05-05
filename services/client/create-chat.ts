"use server";

import { redirect } from "next/navigation";
import { createConversation } from "../server/history";

export const createChat = async (): Promise<void> => {
  const id: number = await new Promise((resolve) => {
    createConversation("New Chat", (num) => {
      console.log(`/chat/${num}`);
      resolve(num);
    });
  });

  redirect(`/chat/${id}`);
}