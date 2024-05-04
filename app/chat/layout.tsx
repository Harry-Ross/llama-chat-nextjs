import { Sidebar } from "@/components/Sidebar";
import { getConversationsWithMessages } from "@/services/server/history";
import { type Conversation } from "@/types/chat";

const conversationsAsync = async (): Promise<Conversation[]> => {
  return await new Promise((resolve, reject) => {
    getConversationsWithMessages((data) => {
      resolve(data);
    });
  });
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  window: React.ReactNode;
}): Promise<JSX.Element> {
  const conversations = await conversationsAsync();

  return (
    <main className="flex h-screen">
      <Sidebar conversations={conversations} />
      <div className="flex w-full flex-col px-4 py-2">{children}</div>
    </main>
  );
}
