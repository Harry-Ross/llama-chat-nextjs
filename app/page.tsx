import { ChatWindow } from "@/components/ChatWindow";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export default function Home(): JSX.Element {
  return (
    <main className="flex h-screen">
      {/* TODO: change to nav */}
      <div className="w-64 bg-secondary text-secondary-foreground">
        <Button variant="outline">
          <Menu />
        </Button>
        <h1>Chat History</h1>
        {mockData.map((data, index) => (
          <div
            className="mx-1 my-2 rounded-lg border border-foreground p-2"
            key={data + index}
          >
            {data}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col p-2">
        <ChatWindow />
      </div>
    </main>
  );
}
