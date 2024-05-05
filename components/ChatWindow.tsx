"use client";

import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { getChatResponse } from "@/services/client/chat";
import { type Message } from "@/types/chat";
import { useToast } from "./ui/use-toast";

interface ChatWindowProps {
  messages: Message[];
  conversationId: number;
}

export const ChatWindow = ({
  conversationId,
  messages: messagesProp,
}: ChatWindowProps): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>(messagesProp);

  const [currentMsg, setCurrentMsg] = useState<string>("");

  const { toast } = useToast();

  return (
    <div className="grow-1 flex h-full flex-col">
      <div className="grow-1 mb-auto">
        <ChatMessages messages={messages} currentMsg={currentMsg} />
      </div>
      <div className="mt-auto w-full">
        <ChatInput
          addMessage={(message) => {
            const newMessage: Message = {
              content: message,
              system: false,
              message_id: 3,
              conversation_id: 1,
              timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, newMessage]);
            getChatResponse(conversationId, [...messages, newMessage])
              .then(async (response) => {
                if (!response) return;

                let accumulatedMsg = "";

                while (true) {
                  const { value, done } = await response.read();
                  if (value === "[DONE]" || done) {
                    setMessages((prev) => [
                      ...prev,
                      { content: accumulatedMsg, system: true },
                    ]);
                    setCurrentMsg("");
                    break;
                  }

                  const trimmedData = value
                    .replace("data: ", "")
                    .replace("\n\n", "");

                  setCurrentMsg((prev) => prev + trimmedData);
                  accumulatedMsg += trimmedData;
                }
              })
              .catch((error) => {
                toast({
                  variant: "destructive",
                  title: "Something went wrong!",
                  description: error.message,
                });
                console.error(error);
              });
          }}
        />
      </div>
    </div>
  );
};
