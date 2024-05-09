import { Sidebar } from "@/components/Sidebar";
import { getConversations } from "@/services/server/history";
import type { BasicConversation } from "@/types/chat";

const conversationsAsync = async (): Promise<BasicConversation[]> => {
  return await new Promise((resolve, reject) => {
    getConversations((data) => {
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
