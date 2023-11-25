"use client"

import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { type Message } from "@/app/page";
import { getChatResponse } from "@/services/client/chat";


const mockData: Message[] = [
  {
    text: "Tell me what's great about React",
    system: false,
  },
]; 

export const ChatWindow = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>(mockData);

  return (
    <div className="grow-1 flex h-full flex-col">
      <div className="grow-1 mb-auto">
        <ChatMessages messages={messages} />
      </div>
      <div className="mt-auto w-full">
        <ChatInput
          addMessage={(message) => {
            setMessages((prev) => [...prev, { text: message, system: false }]);
            getChatResponse(messages)
              .then((response) => {
                if (!response) return; 
                while (true) {
                  const { value, done } = response.read();
                  if (done) break;
                  console.log("received", value);
                }
              })
              .catch((error) => { console.log(error) }); 
          }}
        />
      </div>
    </div>
  );
}