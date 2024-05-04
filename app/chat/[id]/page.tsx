import { ChatWindow } from "@/components/ChatWindow";
import { getMessages } from "@/services/server/history";
import { type Message } from "@/types/chat";

interface WindowProps {
  params: {
    id: number;
  };
}

const getMessagesAsync = async (id: number): Promise<Message[]> => {
  return await new Promise((resolve, reject) => {
    getMessages(id, (data) => {
      resolve(data);
    });
  });
};

export default async function Window({
  params: { id },
}: WindowProps): Promise<JSX.Element> {
  console.log("id", id);

  const conversation = await getMessagesAsync(id);
  console.log(conversation);

  return <ChatWindow messages={conversation} />;
}
