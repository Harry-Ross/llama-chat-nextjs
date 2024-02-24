import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React from "react";


const mockData = [
  "Conversation here",
  "How great React is",
  "The importance of ethics in AI research",
  "Exploring the future of AI",
  "AI-powered chatbots: Enhancing customer experience",
  "Machine learning algorithms: A deep dive",
  "AI in healthcare: Revolutionizing patient care",
  "The role of AI in autonomous vehicles",
];

export default function Layout({ children, window }: { children: React.ReactNode, window: React.ReactNode }): React.ReactNode {

  return (
    <main className="flex h-screen">
      {/* TODO: change to nav */}
      <div className="w-64 bg-secondary text-secondary-foreground">
        <div className="flex items-center">
          <Button variant="default" className="m-1">
            <Menu />
          </Button>
          <h1 className="inline text-lg font-bold pl-1.5">Chat History</h1>
        </div>
        {mockData.map((data, index) => (
          <div
            className="mx-1 my-2 rounded-lg p-2 hover:bg-neutral-700"
            key={data + index}
          >
            {data}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col px-4 py-2">
        {window}
        {children}
      </div>
    </main>
  );
}