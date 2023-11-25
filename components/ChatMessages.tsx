import { type Message } from "@/app/page";
import { cn } from "@/lib/utils";

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps): JSX.Element => {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "my-4 rounded-md p-4",
            message.system ? "bg-blue-200" : "bg-red-200",
          )}
        >
          {message.text}
        </div>
      ))}
    </>
  );
};
