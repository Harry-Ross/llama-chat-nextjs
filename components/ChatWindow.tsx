"use client"

import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import { type Message } from "@/app/page";
import { getChatResponse } from "@/services/client/chat";


// const mockData: Message[] = [
//   {
//     text: "Tell me what's great about React",
//     system: false,
//   },
// ]; 

export const ChatWindow = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [currentMsg, setCurrentMsg] = useState<string>("");

  return (
    <div className="grow-1 flex h-full flex-col">
      <div className="grow-1 mb-auto">
        <ChatMessages messages={messages} currentMsg={currentMsg} />
      </div>
      <div className="mt-auto w-full">
        <ChatInput
          addMessage={(message) => {
            const newMessage = { text: message, system: false };
            setMessages((prev) => [...prev, newMessage]);
            getChatResponse([...messages, newMessage])
              .then(async (response) => {
                if (!response) return; 

                let accumulatedMsg = "";

                while (true) {
                  const { value, done } = await response.read();
                  if (done) {
                    setMessages((prev) => [...prev, { text: accumulatedMsg, system: true }]);
                    setCurrentMsg("");
                    console.log("all done");
                    break;
                  };

                  const trimmedData = value.replace("data: ", "");

                  setCurrentMsg(prev => prev + trimmedData);
                  accumulatedMsg += trimmedData;
                }
              })
              .catch((error) => { console.log(error) }); 
          }}
        />
      </div>
    </div>
  );
}