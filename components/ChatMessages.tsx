import type { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  messages: Message[];
  currentMsg: string;
}

export const ChatMessages = ({
  messages,
  currentMsg,
}: ChatMessagesProps): JSX.Element => {
  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage message={message} key={index} />
      ))}
      {currentMsg && (
        <ChatMessage message={{ text: currentMsg, system: true }} />
      )}
    </>
  );
};

const ChatMessage = ({ message }: { message: Message }): JSX.Element => {
  return (
    <div
      className={cn(
        "my-4 rounded-md p-4",
        message.system ? "bg-blue-200" : "bg-red-200",
      )}
    >
      {message.text}
    </div>
  );
};
