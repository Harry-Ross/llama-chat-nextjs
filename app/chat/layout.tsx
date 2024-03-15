import { Button } from "@/components/ui/button";
import {  getConversationsWithMessages } from "@/services/server/history";
import { type Conversation } from "@/types/chat";
import { Menu } from "lucide-react";
import Link from "next/link";

const conversationsAsync = async (): Promise<Conversation[]> => {
  return await new Promise((resolve, reject) => {
    getConversationsWithMessages((data) => {
      resolve(data);
    });
  });
};

export default async function Layout({ children, window }: { children: React.ReactNode, window: React.ReactNode }): Promise<JSX.Element> {
  const conversations = await conversationsAsync();

  return (
    <main className="flex h-screen">
      {/* TODO: change to nav */}
      <div className="w-64 bg-secondary text-secondary-foreground">
        <div className="flex items-center">
          <Button variant="default" className="m-1">
            <Menu />
          </Button>
          <h1 className="inline pl-1.5 text-lg font-bold">Chat History</h1>
        </div>
        {conversations.map((conversation, index) => (
          <Link href={`/chat/${conversation.conversation_id}`} key={conversation.title + index}>
            <div className="mx-1 my-2 rounded-lg p-2 hover:bg-neutral-700">
              {conversation.title}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex w-full flex-col px-4 py-2">
        {window}
        {children}
      </div>
    </main>
  );
}