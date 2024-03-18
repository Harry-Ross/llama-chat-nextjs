import { type Conversation } from "@/types/chat";
import { useEffect, useState } from "react";

export const useChatHistory = (): { conversations: Conversation[] } => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const conversationsStr = window?.localStorage?.getItem("conversations");
    setConversations(conversationsStr ? JSON.parse(conversationsStr) : []);
  }, [])

  return { conversations }
}