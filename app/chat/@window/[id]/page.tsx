import { ChatWindow } from "@/components/ChatWindow";
import { getConversation } from "@/services/server/history";
import { type Conversation } from "@/types/chat";

interface WindowProps { 
  params: { 
    id: number 
  }
};

const getConversationAsync = async (id: number): Promise<Conversation> => {
  return await new Promise((resolve, reject) => {
    getConversation(id, (data) => {
      resolve(data);
    });
  });
};

export default async function Window({ params: { id } }: WindowProps): Promise<JSX.Element> {
  const conversation = await getConversationAsync(id);

  return <ChatWindow messages={conversation.messages} />;
}
